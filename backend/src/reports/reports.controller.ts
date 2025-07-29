import {
  Controller,
  Get,
  Query,
  UseGuards,
  Request,
  // ClassSerializerInterceptor,
  // UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import {
  ReportDto,
  ReportQueryDto,
  ReportStatisticsDto,
} from './dto/report.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseDto } from 'src/dto/response.dto';
import { plainToInstance } from 'class-transformer';
import { RequestWithUser } from 'src/users/users.controller';

@ApiTags('Reports')
@Controller({ path: 'reports', version: '1' })
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
// @UseInterceptors(ClassSerializerInterceptor)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all reports for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Reports retrieved successfully',
    type: ReportDto,
    isArray: true,
    example: {
      data: [
        {
          id: 'string',
          date: new Date(),
          completeMinutes: 10,
          task: {
            id: 'string',
            name: 'string',
            status: 'ACTIVE',
            completeMinutes: 10,
          },
        },
      ],
      meta: {
        totalCount: 1,
      },
      message: 'Reports retrieved successfully',
    },
  })
  async getUserReports(
    @Request() req: RequestWithUser,
    @Query() query: ReportQueryDto,
  ): Promise<ResponseDto<ReportDto[]>> {
    const response = await this.reportsService.getUserReports(
      req.user.id,
      query,
    );

    // Transform the reports data to exclude unwanted fields
    const transformedReports = plainToInstance(ReportDto, response.reports, {
      excludeExtraneousValues: true,
    });

    return {
      data: transformedReports,
      meta: {
        totalCount: response.totalCount,
      },
      message: 'Reports retrieved successfully',
    };
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get report statistics for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Report statistics retrieved successfully',
    type: ReportStatisticsDto,
    example: {
      data: {
        totalTasks: 10,
        activeTasks: 5,
        inactiveTasks: 3,
        totalMinutes: 120,
        tasksWithReports: 7,
      },
      message: 'Report statistics retrieved successfully',
    },
  })
  async getReportStatistics(
    @Request() req: RequestWithUser,
    @Query() query: ReportQueryDto,
  ): Promise<ResponseDto<ReportStatisticsDto>> {
    const response = await this.reportsService.getTaskStatistics(req.user.id, {
      startDate: query.startDate,
      endDate: query.endDate,
    });
    const transformedStatistics = plainToInstance(
      ReportStatisticsDto,
      response,
      {
        excludeExtraneousValues: true,
      },
    );
    return {
      data: transformedStatistics,
      message: 'Report statistics retrieved successfully',
    };
  }
}
