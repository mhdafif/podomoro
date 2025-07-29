import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateTaskDto,
  UpdateTaskDto,
  CompleteTaskDto,
  TaskStatus,
} from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  // Create a new task
  async createTask(userId: string, createTaskDto: CreateTaskDto) {
    const existingTask = await this.prisma.task.findFirst({
      where: {
        name: createTaskDto.name,
        userId,
      },
    });

    if (existingTask) {
      // throw new ConflictException(
      //   'Task with this name already exists for the user',
      // );
      throw new ConflictException({
        code: 409,
        message: 'Task with this name already exists for the user',
      });
    }
    const task = await this.prisma.task.create({
      data: {
        ...createTaskDto,
        userId,
      },
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
      // throw new NotFoundException('Task not found');
      throw new NotFoundException({
        code: 404,
        message: 'Task not found',
      });
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
      throw new NotFoundException({
        code: 404,
        message: 'Task not found',
      });
    }

    const task = await this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: updateTaskDto,
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
      throw new NotFoundException({
        code: 404,
        message: 'Task not found',
      });
    }

    // so when deleting a task, reports is deleted automatically due to ON DELETE CASCADE
    await this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    return { message: 'Task deleted successfully' };
  }

  // Complete a task - adds completed minutes and creates a report
  async completeTask(
    taskId: string,
    userId: string,
    completeTaskDto: CompleteTaskDto,
  ) {
    // First verify the task exists and belongs to the user
    const task = await this.prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!task) {
      throw new NotFoundException({
        code: 404,
        message: 'Task not found',
      });
    }

    // Use a transaction to update task and create report atomically
    const result = await this.prisma.$transaction(async (prisma) => {
      // Update task with new completed minutes
      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
          // name: {
          //   set: task.name, // Keep the existing name
          // },
          completeMinutes: {
            increment: completeTaskDto.completeMinutes,
          },
        },
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
        //     orderBy: {
        //       date: 'desc',
        //     },
        //     take: 5, // Get latest 5 reports
        //   },
        //   _count: {
        //     select: {
        //       reports: true,
        //     },
        //   },
        // },
      });

      // Create a report for this completion
      const report = await prisma.report.create({
        data: {
          completeMinutes: completeTaskDto.completeMinutes,
          date: completeTaskDto.date || new Date(),
          taskId,
          userId,
        },
        // include: {
        //   task: true,
        //   // task: {
        //   //   select: { id: true, name: true },
        //   // },
        // },
      });

      return { task: updatedTask, report };
    });

    return result;
  }
}
