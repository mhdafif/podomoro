import { Expose, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from './task.dto';

@Exclude()
export class TaskResponseDto {
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
}
