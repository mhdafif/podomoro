<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Pomodoro NestJS API Project

This is a NestJS API project with the following key features:

## Architecture

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based authentication with Passport.js
- **Documentation**: Swagger/OpenAPI integration
- **Validation**: class-validator and class-transformer for DTOs
- **Code Quality**: ESLint and Prettier configured

## Key Components

- **User Authentication**: Signup, signin, and profile endpoints
- **Database Models**: User model with Prisma
- **Security**: JWT tokens, password hashing with bcryptjs
- **API Documentation**: Swagger UI available at `/api`

## Development Guidelines

- Use DTOs for request/response validation
- Apply class-transformer serialization for responses
- Follow NestJS module structure (controller, service, module)
- Use Prisma for database operations
- Implement proper error handling and HTTP status codes
- Add Swagger decorators for API documentation

## Available Scripts

- `pnpm run start:dev` - Development mode with hot reload
- `pnpm run build` - Build the application
- `pnpm run lint` - Run ESLint
- `pnpm run format` - Format code with Prettier
