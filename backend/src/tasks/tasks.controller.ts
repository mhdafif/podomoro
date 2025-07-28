import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  // ApiQuery,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import {
  CreateTaskDto,
  UpdateTaskDto,
  CreateReportDto,
  TaskQueryDto,
  ReportQueryDto,
  // TaskStatus,
} from './dto/task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseDto } from 'src/dto/response.dto';
import { plainToInstance } from 'class-transformer';
import { TaskResponseDto } from './dto/task-response.dto';
import { ReportResponseDto } from './dto/report-response.dto';

interface RequestWithUser extends Request {
  user: { id: string; email: string };
}

@ApiTags('Tasks')
@Controller({ path: 'tasks', version: '1' })
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'Task successfully created',
  })
  async createTask(
    @Request() req: RequestWithUser,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<ResponseDto<TaskResponseDto>> {
    const task = await this.tasksService.createTask(req.user.id, createTaskDto);
    const transformedTask = plainToInstance(TaskResponseDto, task, {
      excludeExtraneousValues: true,
    });
    return {
      data: transformedTask,
      message: 'Task created successfully',
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Tasks retrieved successfully',
  })
  async getUserTasks(
    @Request() req: RequestWithUser,
    @Query() query: TaskQueryDto,
  ): Promise<ResponseDto<any>> {
    const response = await this.tasksService.getUserTasks(req.user.id, query);

    // Transform the tasks data to only include id, name, and status
    const transformedTasks = plainToInstance(TaskResponseDto, response.tasks, {
      excludeExtraneousValues: true,
    });

    return {
      data: {
        ...response,
        tasks: transformedTasks,
      },
      message: 'Tasks retrieved successfully',
    };
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get task statistics for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Task statistics retrieved successfully',
  })
  async getTaskStatistics(
    @Request() req: RequestWithUser,
    @Query() query: ReportQueryDto,
  ) {
    return this.tasksService.getTaskStatistics(req.user.id, {
      startDate: query.startDate,
      endDate: query.endDate,
    });
  }

  @Get('reports')
  @ApiOperation({ summary: 'Get all reports for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Reports retrieved successfully',
  })
  async getUserReports(
    @Request() req: RequestWithUser,
    @Query() query: ReportQueryDto,
  ): Promise<ResponseDto<any>> {
    const response = await this.tasksService.getUserReports(req.user.id, query);

    // Transform the reports data to exclude unwanted fields
    const transformedReports = plainToInstance(
      ReportResponseDto,
      response.reports,
      {
        excludeExtraneousValues: true,
      },
    );

    return {
      data: {
        ...response,
        reports: transformedReports,
      },
      message: 'Reports retrieved successfully',
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: 200,
    description: 'Task retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async getTaskById(
    @Request() req: RequestWithUser,
    @Param('id') taskId: string,
  ): Promise<ResponseDto<TaskResponseDto>> {
    const task = await this.tasksService.getTaskById(taskId, req.user.id);
    const transformedTask = plainToInstance(TaskResponseDto, task, {
      excludeExtraneousValues: true,
    });
    return {
      data: transformedTask,
      message: 'Task retrieved successfully',
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a specific task' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async updateTask(
    @Request() req: RequestWithUser,
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<ResponseDto<TaskResponseDto>> {
    const task = await this.tasksService.updateTask(
      taskId,
      req.user.id,
      updateTaskDto,
    );
    const transformedTask = plainToInstance(TaskResponseDto, task, {
      excludeExtraneousValues: true,
    });
    return {
      data: transformedTask,
      message: 'Task updated successfully',
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific task' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: 200,
    description: 'Task deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async deleteTask(
    @Request() req: RequestWithUser,
    @Param('id') taskId: string,
  ): Promise<ResponseDto<{ success: boolean }>> {
    await this.tasksService.deleteTask(taskId, req.user.id);
    return {
      data: { success: true },
      message: 'Task deleted successfully',
    };
  }

  @Post(':id/reports')
  @ApiOperation({ summary: 'Add a report to a specific task' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: 201,
    description: 'Report added successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async addTaskReport(
    @Request() req: RequestWithUser,
    @Param('id') taskId: string,
    @Body() createReportDto: CreateReportDto,
  ): Promise<ResponseDto<ReportResponseDto>> {
    const report = await this.tasksService.addTaskReport(
      taskId,
      req.user.id,
      createReportDto,
    );

    const transformedReport = plainToInstance(ReportResponseDto, report, {
      excludeExtraneousValues: true,
    });

    return {
      data: transformedReport,
      message: 'Report added successfully',
    };
  }

  @Get(':id/reports')
  @ApiOperation({ summary: 'Get reports for a specific task' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: 200,
    description: 'Task reports retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async getTaskReports(
    @Request() req: RequestWithUser,
    @Param('id') taskId: string,
    @Query() query: ReportQueryDto,
  ): Promise<ResponseDto<any>> {
    const response = await this.tasksService.getTaskReports(
      taskId,
      req.user.id,
      query,
    );

    const transformedReports = plainToInstance(
      ReportResponseDto,
      response.reports,
      {
        excludeExtraneousValues: true,
      },
    );

    return {
      data: {
        ...response,
        reports: transformedReports,
      },
      message: 'Task reports retrieved successfully',
    };
  }
}
