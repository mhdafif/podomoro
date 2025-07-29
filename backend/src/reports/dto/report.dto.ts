import { IsOptional, IsDate } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Exclude, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TaskDto } from 'src/tasks/dto/task.dto';

// @Exclude()
export class ReportDto {
  @ApiProperty({ description: 'Report ID' })
  @Expose()
  id: string;

  @ApiProperty({ description: 'Report date' })
  @Expose()
  date: Date;

  @ApiProperty({ description: 'Completed minutes' })
  @Expose()
  completeMinutes: number;

  @ApiProperty({ description: 'Associated task', type: TaskDto })
  @Expose()
  @Type(() => TaskDto)
  task: TaskDto;
}

export class ReportQueryDto {
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
}

export class ReportStatisticsDto {
  @ApiProperty({ description: 'Total number of tasks' })
  @Expose()
  totalTasks: number;

  @ApiProperty({ description: 'Number of active tasks' })
  @Expose()
  activeTasks: number;

  @ApiProperty({ description: 'Number of inactive tasks' })
  @Expose()
  inactiveTasks: number;

  @ApiProperty({ description: 'Total completed minutes' })
  @Expose()
  totalMinutes: number;

  @ApiProperty({ description: 'Number of tasks with reports' })
  @Expose()
  tasksWithReports: number;
}
