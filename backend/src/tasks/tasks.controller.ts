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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import {
  CreateTaskDto,
  UpdateTaskDto,
  CompleteTaskDto,
  TaskQueryDto,
  TaskDto,
} from './dto/task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseDto } from 'src/dto/response.dto';
import { plainToInstance } from 'class-transformer';
import { RequestWithUser } from 'src/users/users.controller';
import { ReportDto } from 'src/reports/dto/report.dto';

@ApiTags('Tasks')
@Controller({ path: 'tasks', version: '1' })
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
// @UseInterceptors(ClassSerializerInterceptor)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'Task successfully created',
    type: TaskDto,
    example: {
      data: {
        id: 'string',
        name: 'string',
        status: 'ACTIVE',
        completeMinutes: 0,
      },
      message: 'Task created successfully',
    },
  })
  async createTask(
    @Request() req: RequestWithUser,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<ResponseDto<TaskDto>> {
    const task = await this.tasksService.createTask(req.user.id, createTaskDto);
    const transformedTask = plainToInstance(TaskDto, task, {
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
    type: TaskDto,
    isArray: true,
    example: {
      data: [
        {
          id: 'string',
          name: 'string',
          status: 'ACTIVE',
          completeMinutes: 0,
        },
      ],
      meta: {
        totalCount: 1,
        totalPages: 1,
        currentPage: 1,
      },
      message: 'Tasks retrieved successfully',
    },
  })
  async getUserTasks(
    @Query() query: TaskQueryDto,
    @Request() req: RequestWithUser,
  ): Promise<ResponseDto<TaskDto[]>> {
    const response = await this.tasksService.getUserTasks(req.user.id, query);

    // Transform the tasks data to only include id, name, and status
    const transformedTasks = plainToInstance(TaskDto, response.tasks, {
      excludeExtraneousValues: true,
    });

    return {
      data: transformedTasks,
      meta: {
        totalCount: response.totalCount,
        totalPages: response.totalPages,
        currentPage: response.currentPage,
      },
      message: 'Tasks retrieved successfully',
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: 200,
    description: 'Task retrieved successfully',
    type: TaskDto,
    example: {
      data: {
        id: 'string',
        name: 'string',
        status: 'ACTIVE',
        completeMinutes: 0,
      },
      message: 'Task retrieved successfully',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async getTaskById(
    @Request() req: RequestWithUser,
    @Param('id') taskId: string,
  ): Promise<ResponseDto<TaskDto>> {
    const task = await this.tasksService.getTaskById(taskId, req.user.id);
    const transformedTask = plainToInstance(TaskDto, task, {
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
    type: TaskDto,
    example: {
      data: {
        id: 'string',
        name: 'string',
        status: 'ACTIVE',
        completeMinutes: 0,
      },
      message: 'Task updated successfully',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async updateTask(
    @Request() req: RequestWithUser,
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<ResponseDto<TaskDto>> {
    const task = await this.tasksService.updateTask(
      taskId,
      req.user.id,
      updateTaskDto,
    );
    const transformedTask = plainToInstance(TaskDto, task, {
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
    example: {
      data: {},
      message: 'Task deleted successfully',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async deleteTask(
    @Request() req: RequestWithUser,
    @Param('id') taskId: string,
  ): Promise<{ message: string }> {
    return await this.tasksService.deleteTask(taskId, req.user.id);
  }

  @Post(':id/complete')
  @ApiOperation({
    summary: 'Complete a task - adds completed minutes and creates a report',
  })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: 200,
    description: 'Task completed successfully',
    type: TaskDto,
    example: {
      data: {
        task: {
          id: 'string',
          name: 'string',
          status: 'ACTIVE',
          completeMinutes: 10,
        },
        report: {
          id: 'string',
          date: new Date(),
          completeMinutes: 10,
        },
      },
      message: 'Task completed successfully',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async completeTask(
    @Request() req: RequestWithUser,
    @Param('id') taskId: string,
    @Body() completeTaskDto: CompleteTaskDto,
  ): Promise<ResponseDto<{ task: TaskDto; report: ReportDto }>> {
    const result = await this.tasksService.completeTask(
      taskId,
      req.user.id,
      completeTaskDto,
    );

    const transformedTask = plainToInstance(TaskDto, result.task, {
      excludeExtraneousValues: true,
    });

    const transformedReport = plainToInstance(ReportDto, result.report, {
      excludeExtraneousValues: true,
    });

    return {
      data: {
        task: transformedTask,
        report: transformedReport,
      },
      message: 'Task completed successfully',
    };
  }
}
