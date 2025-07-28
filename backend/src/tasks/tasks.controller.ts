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
  ): Promise<ResponseDto<any>> {
    const task = await this.tasksService.createTask(req.user.id, createTaskDto);
    return { data: task, message: 'Task created successfully' };
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
  ) {
    const response = await this.tasksService.getUserTasks(req.user.id, query);
    return {
      data: plainToInstance(TaskResponseDto, response),
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
  ) {
    return this.tasksService.getUserReports(req.user.id, query);
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
  ) {
    return this.tasksService.getTaskById(taskId, req.user.id);
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
  ) {
    return this.tasksService.updateTask(taskId, req.user.id, updateTaskDto);
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
  ) {
    return this.tasksService.deleteTask(taskId, req.user.id);
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
  ) {
    return this.tasksService.addTaskReport(
      taskId,
      req.user.id,
      createReportDto,
    );
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
  ) {
    return this.tasksService.getTaskReports(taskId, req.user.id, query);
  }
}
