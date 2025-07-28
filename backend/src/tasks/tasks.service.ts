import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateTaskDto,
  UpdateTaskDto,
  CreateReportDto,
  TaskStatus,
} from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  // Create a new task
  async createTask(userId: string, createTaskDto: CreateTaskDto) {
    const task = await this.prisma.task.create({
      data: {
        ...createTaskDto,
        userId,
      },
      include: {
        // user: {
        //   select: {
        //     id: true,
        //     firstName: true,
        //     lastName: true,
        //     email: true,
        //   },
        // },
        // reports: {
        //   orderBy: {
        //     date: 'desc',
        //   },
        // },
        // _count: {
        //   select: {
        //     reports: true,
        //   },
        // },
      },
    });

    return task;
  }

  // Get all tasks for a user
  async getUserTasks(
    userId: string,
    options: {
      status?: TaskStatus;
      page?: number;
      limit?: number;
    } = {},
  ) {
    const { status, page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const where: { userId: string; status?: TaskStatus } = { userId };
    if (status) {
      where.status = status;
    }

    const [tasks, totalCount] = await Promise.all([
      this.prisma.task.findMany({
        where,
        // include: {
        //   user: {
        //     select: {
        //       id: true,
        //       firstName: true,
        //       lastName: true,
        //       email: true,
        //     },
        //   },
        //   reports: {
        //     select: {
        //       id: true,
        //       date: true,
        //       completeMinutes: true,
        //     },
        //     orderBy: {
        //       date: 'desc',
        //     },
        //   },
        //   _count: {
        //     select: {
        //       reports: true,
        //     },
        //   },
        // },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.task.count({ where }),
    ]);

    return {
      tasks,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  }

  // Get task by ID
  async getTaskById(taskId: string, userId: string) {
    const task = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        reports: {
          orderBy: {
            date: 'desc',
          },
        },
        _count: {
          select: {
            reports: true,
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  // Update task
  async updateTask(
    taskId: string,
    userId: string,
    updateTaskDto: UpdateTaskDto,
  ) {
    // First check if task exists and belongs to user
    const existingTask = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    });

    if (!existingTask) {
      throw new NotFoundException('Task not found');
    }

    const task = await this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: updateTaskDto,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        reports: {
          orderBy: {
            date: 'desc',
          },
        },
        _count: {
          select: {
            reports: true,
          },
        },
      },
    });

    return task;
  }

  // Delete task
  async deleteTask(taskId: string, userId: string) {
    // First check if task exists and belongs to user
    const existingTask = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    });

    if (!existingTask) {
      throw new NotFoundException('Task not found');
    }

    await this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    return { message: 'Task deleted successfully' };
  }

  // Get task statistics
  async getTaskStatistics(
    userId: string,
    options: {
      startDate?: Date;
      endDate?: Date;
    } = {},
  ) {
    const { startDate, endDate } = options;

    const dateFilter: Record<string, unknown> = {};
    if (startDate) dateFilter.gte = startDate;
    if (endDate) dateFilter.lte = endDate;

    const tasks = await this.prisma.task.findMany({
      where: { userId },
      include: {
        reports: {
          where:
            Object.keys(dateFilter).length > 0
              ? { date: dateFilter }
              : undefined,
          select: {
            completeMinutes: true,
            date: true,
          },
        },
      },
    });

    const statistics = {
      totalTasks: tasks.length,
      activeTasks: tasks.filter((t) => t.status === TaskStatus.ACTIVE).length,
      inactiveTasks: tasks.filter((t) => t.status === TaskStatus.INACTIVE)
        .length,
      totalMinutes: 0,
      tasksWithReports: 0,
    };

    tasks.forEach((task) => {
      const taskMinutes = task.reports.reduce(
        (sum, report) => sum + report.completeMinutes,
        0,
      );
      statistics.totalMinutes += taskMinutes;
      if (task.reports.length > 0) {
        statistics.tasksWithReports++;
      }
    });

    return statistics;
  }

  // Add report to task
  async addTaskReport(
    taskId: string,
    userId: string,
    createReportDto: CreateReportDto,
  ) {
    // First verify the task exists and belongs to the user
    const task = await this.prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return this.prisma.report.create({
      data: {
        ...createReportDto,
        taskId,
        userId, // Add userId for direct relation
      },
      include: {
        task: {
          select: { id: true, name: true },
        },
      },
    });
  }

  // Get reports for a task
  async getTaskReports(
    taskId: string,
    userId: string,
    options: {
      startDate?: Date;
      endDate?: Date;
      page?: number;
      limit?: number;
    } = {},
  ) {
    // Verify task belongs to user
    const task = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const { startDate, endDate, page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const dateFilter: Record<string, Date> = {};
    if (startDate) dateFilter.gte = startDate;
    if (endDate) dateFilter.lte = endDate;

    const where: { taskId: string; date?: Record<string, Date> } = { taskId };
    if (Object.keys(dateFilter).length > 0) {
      where.date = dateFilter;
    }

    const [reports, totalCount] = await Promise.all([
      this.prisma.report.findMany({
        where,
        include: {
          task: {
            select: {
              id: true,
              name: true,
              status: true,
            },
          },
        },
        orderBy: {
          date: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.report.count({ where }),
    ]);

    return {
      reports,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  }

  // Get all reports for a user (across all tasks)
  async getUserReports(
    userId: string,
    options: {
      startDate?: Date;
      endDate?: Date;
      page?: number;
      limit?: number;
    } = {},
  ) {
    const { startDate, endDate, page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const dateFilter: Record<string, Date> = {};
    if (startDate) dateFilter.gte = startDate;
    if (endDate) dateFilter.lte = endDate;

    const where: { userId: string; date?: Record<string, Date> } = { userId };
    if (Object.keys(dateFilter).length > 0) {
      where.date = dateFilter;
    }

    const [reports, totalCount] = await Promise.all([
      this.prisma.report.findMany({
        where,
        include: {
          task: {
            select: {
              id: true,
              name: true,
              status: true,
            },
          },
        },
        orderBy: {
          date: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.report.count({ where }),
    ]);

    return {
      reports,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  }
}
