# Pomodoro API

A NestJS-based REST API for a Pomodoro timer application with user authentication and PostgreSQL database.

## Features

- 🔐 **JWT Authentication** - Secure user authentication with JSON Web Tokens
- 📝 **User Management** - User registration, login, and profile management
- 🗄️ **PostgreSQL Database** - Robust database with Prisma ORM
- 📚 **Swagger Documentation** - Interactive API documentation
- ✅ **Input Validation** - Request validation with class-validator
- 🎨 **Code Quality** - ESLint and Prettier configured
- 🛡️ **Type Safety** - Full TypeScript support

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT with Passport.js
- **Documentation**: Swagger/OpenAPI
- **Validation**: class-validator & class-transformer
- **Package Manager**: pnpm

## API Endpoints

### Authentication

- `POST /users/signup` - User registration
- `POST /users/signin` - User login
- `GET /users/profile` - Get user profile (protected)

## Project setup

```bash
# Install dependencies
$ pnpm install

# Set up environment variables
$ cp .env.example .env
# Update DATABASE_URL and JWT_SECRET in .env

# Run database migrations
$ npx prisma migrate dev

# Generate Prisma client
$ npx prisma generate
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/podomoro?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"
```

## Running the app

```bash
# development mode with hot reload
$ pnpm run start:dev

# production mode
$ pnpm run start:prod

# build the application
$ pnpm run build
```

## Testing

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## API Documentation

Once the application is running, visit:

- **Swagger UI**: http://localhost:3000/api
- **Application**: http://localhost:3000

## Code Quality

```bash
# run linter
$ pnpm run lint

# format code
$ pnpm run format
```

## Database Management

```bash
# view data in Prisma Studio
$ npx prisma studio

# reset database
$ npx prisma migrate reset

# deploy migrations to production
$ npx prisma migrate deploy
```

# test coverage

$ pnpm run test:cov

````

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
````

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
