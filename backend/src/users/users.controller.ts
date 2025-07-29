import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';

export interface RequestWithUser extends Request {
  user: UserDto;
}

@ApiTags('users')
@Controller({ path: 'users', version: '1' })
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    type: UserDto,
    example: {
      id: 'string',
      email: 'string',
      firstName: 'string',
      lastName: 'string',
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(@Request() req: RequestWithUser) {
    const response = req.user;
    const transformedUser = plainToInstance(UserDto, response, {
      excludeExtraneousValues: true,
    });
    return transformedUser;
  }
}
