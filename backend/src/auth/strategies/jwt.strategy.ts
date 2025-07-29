import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
// import { UserDto } from 'src/users/dto/user.dto';
// import { plainToInstance } from 'class-transformer';

export interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET') || 'fallback-secret',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    // if you can check on users controller, the get profile method
    // it get the user from request instead of calling the database again
    // it comes from here, because this run before the controller method
    // and the user is attached to the request object

    // how it runs:
    // Request → JwtAuthGuard → JwtStrategy.validate() → PrismaService.user.findUnique() → req.user populated → Controller

    // console.log('user', user);
    // const transformedUser = plainToInstance(UserDto, user, {
    //   excludeExtraneousValues: true,
    // });
    // console.log('transformedUser', transformedUser);
    return user;
  }
}
