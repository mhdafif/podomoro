import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

export class UserDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty()
  @Expose()
  firstName?: string | null;

  @ApiProperty()
  @Expose()
  lastName?: string | null;

  // @ApiProperty()
  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  // @ApiProperty()
  @Transform(({ value }: { value: Date }) => value.toISOString())
  updatedAt: Date;
}
