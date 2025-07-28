import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  IsDate,
  IsNotEmpty,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum TaskStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class CreateTaskDto {
  @ApiProperty({ description: 'Task name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    enum: TaskStatus,
    description: 'Task status',
    default: TaskStatus.ACTIVE,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus = TaskStatus.ACTIVE;
}

export class UpdateTaskDto {
  @ApiPropertyOptional({ description: 'Task name' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({
    enum: TaskStatus,
    description: 'Task status',
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}

export class CreateReportDto {
  @ApiPropertyOptional({
    description: 'Report date',
    type: 'string',
    format: 'date',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date = new Date();

  @ApiProperty({
    description: 'Completed minutes',
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  completeMinutes: number;
}

export class TaskQueryDto {
  @ApiPropertyOptional({
    enum: TaskStatus,
    description: 'Filter by task status',
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({
    description: 'Page number',
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Items per page',
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}

export class ReportQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by task ID',
  })
  @IsOptional()
  @IsString()
  taskId?: string;

  @ApiPropertyOptional({
    description: 'Start date filter',
    type: 'string',
    format: 'date',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'End date filter',
    type: 'string',
    format: 'date',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;

  @ApiPropertyOptional({
    description: 'Page number',
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Items per page',
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
