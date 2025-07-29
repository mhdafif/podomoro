import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskStatus } from 'src/tasks/dto/task.dto';
import { ReportQueryDto } from './dto/report.dto';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  // Get all reports for a user (across all tasks)
  async getUserReports(userId: string, options: ReportQueryDto) {
    const { startDate, endDate } = options;
    // const skip = (page - 1) * limit;

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
        // in case you want to select specific fields, used below this. but since we implemented serialization, we can just ignore this
        // select: {
        //   id: true,
        //   date: true,
        //   completeMinutes: true,
        //   task: {
        //     select: {
        //       id: true,
        //       name: true,
        //       status: true,
        //       completeMinutes: true,
        //     },
        //   },
        // },
        include: {
          task: {
            // select: {
            //   id: true,
            //   name: true,
            //   status: true,
            //   completeMinutes: true,
            // },
          },
        },
        orderBy: {
          date: 'desc',
        },
        // skip,
        // take: limit,
      }),
      this.prisma.report.count({ where }),
    ]);

    return {
      reports,
      totalCount,
      // totalPages: Math.ceil(totalCount / limit),
      // currentPage: page,
    };
  }

  // Get task statistics
  async getTaskStatistics(userId: string, options: ReportQueryDto) {
    const { startDate, endDate } = options;

    const dateFilter: Record<string, Date> = {};
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
}
