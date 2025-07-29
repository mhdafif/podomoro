import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John', required: false })
  @IsString()
  @Expose()
  firstName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsString()
  @Expose()
  lastName?: string;
}

export class SignInDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
