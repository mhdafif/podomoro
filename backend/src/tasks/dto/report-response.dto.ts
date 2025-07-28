import { Expose, Exclude, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TaskResponseDto } from './task-response.dto';

@Exclude()
export class ReportResponseDto {
  @ApiProperty({ description: 'Report ID' })
  @Expose()
  id: string;

  @ApiProperty({ description: 'Report date' })
  @Expose()
  date: Date;

  @ApiProperty({ description: 'Completed minutes' })
  @Expose()
  completeMinutes: number;

  @ApiProperty({ description: 'Associated task', type: TaskResponseDto })
  @Expose()
  @Type(() => TaskResponseDto)
  task: TaskResponseDto;
}
