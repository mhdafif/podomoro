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
import { Expose } from 'class-transformer';

export enum TaskStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

// @Exclude()
export class TaskDto {
  @ApiProperty({ description: 'Task ID' })
  @Expose()
  id: string;

  @ApiProperty({ description: 'Task name' })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Task status',
    enum: TaskStatus,
  })
  @Expose()
  status: TaskStatus;

  @ApiProperty({ description: 'Total completed minutes' })
  @Expose()
  completeMinutes: number;
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
  name?: string;

  @ApiPropertyOptional({
    enum: TaskStatus,
    description: 'Task status',
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}

export class CompleteTaskDto {
  @ApiProperty({
    description: 'Completed minutes for this session',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  completeMinutes: number;

  @ApiPropertyOptional({
    description: 'Report date',
    type: 'string',
    format: 'date',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date = new Date();
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
