import { Controller, Post, Body, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto/auth.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { plainToClass } from 'class-transformer';

export interface RequestWithUser extends Request {
  user: UserDto;
}

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: UserDto,
    example: {
      data: {
        id: 'string',
        email: 'string',
        firstName: 'string',
        lastName: 'string',
      },
      message: 'User created successfully',
    },
  })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async signUp(@Body() signUpDto: SignUpDto): Promise<ResponseDto<UserDto>> {
    const response = await this.authService.signUp(signUpDto);
    const transformedUser = plainToClass(UserDto, response, {
      excludeExtraneousValues: true,
    });
    return {
      data: transformedUser,
      message: 'User created successfully',
    };
  }

  @Post('signin')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: UserDto,
    example: {
      user: {
        id: 'string',
        email: 'string',
        firstName: 'string',
        lastName: 'string',
      },
      accessToken: 'string',
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async signIn(
    @Body() signInDto: SignInDto,
  ): Promise<{ user: UserDto; accessToken: string }> {
    const { user, accessToken } = await this.authService.signIn(signInDto);
    const transformedUser = plainToClass(UserDto, user, {
      excludeExtraneousValues: true,
    });
    return {
      user: transformedUser,
      accessToken,
    };
  }
}
