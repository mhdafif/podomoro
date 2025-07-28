import { IsString, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';
import { TaskStatus } from './task.dto';

export class TaskResponseDto {
  // @ApiProperty({ description: 'Task name' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  status: TaskStatus;

  @Exclude()
  userId: string;

  @Exclude()
  createdAt: string;

  @Exclude()
  updatedAt: string;
}
