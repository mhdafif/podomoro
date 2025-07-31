import { NestFactory } from '@nestjs/core';
import {
  // ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: '*', // Adjust this to your needs, e.g., specify allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  // Set global prefix for API routes
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // app.useGlobalInterceptors(
  //   // ResolvePromisesInterceptor is used to resolve promises in responses because class-transformer can't do it
  //   // https://github.com/typestack/class-transformer/issues/549
  //   // new ResolvePromisesInterceptor(),
  //   new ClassSerializerInterceptor(app.get(Reflector)),
  // );

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Pomodoro API')
    .setDescription('The Pomodoro API description')
    .setVersion('1.0')
    // .setTermsOfService('https://example.com/terms')
    // .setContact('Pomodoro Team', 'https://example.com', 'support@example.com')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Setup traditional Swagger UI
  SwaggerModule.setup('swagger', app, document);

  // Setup Scalar API Reference (modern alternative)
  app.use(
    '/scalar',
    apiReference({
      spec: {
        content: document,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  if (process.env.NODE_ENV !== 'production') {
    console.log(
      `Application is running on: http://localhost:${process.env.PORT ?? 3000}`,
    );
    console.log(
      `Swagger documentation: http://localhost:${process.env.PORT ?? 3000}/swagger`,
    );
    console.log(
      `Scalar documentation: http://localhost:${process.env.PORT ?? 3000}/scalar`,
    );
  }
}

void bootstrap();
