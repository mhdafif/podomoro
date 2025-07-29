import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { PrismaService } from './prisma/prisma.service';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    TasksModule,
    ReportsModule,
  ],
  // controllers: [AppController],
  // providers: [AppService, PrismaService],
  providers: [PrismaService],
})
export class AppModule {}
