# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Docs

Use context7 to lookup documentation for frameworks and libraries.

## Code Style Guidelines:

- Use Tailwind CSS.
- Write idiomatic Next.js 15 and React 19 code.
- Always prefer arrow functions: `const myFunction = () => {}`.
- Never use function declarations: `function myFunction() {}` (Exception: Only use function declarations when hoisting is specifically needed).
- Use shadcn/ui for common UI components.

## Architecture

This is a contract-first microservices monorepo using **Specmatic** for API contract testing and validation. Services and apps automatically generate TypeScript types from OpenAPI contracts.

**Services & apps:**

- `app`: (port 3000): Next.js frontend
- `service-shopping-list` (port 3100): Shopping list management, consumes product service
- `service-product` (port 3200): Product CRUD operations
- `service-rating` (port 3300): Product ratings
- `utils`: Contract management utilities

## Development Commands

Important: This is a monorepo with multiple projects! always navigate into the directory for the service or app for which you want to run those commands.

```bash
# Examples
cd app && npm run test
cd service-shopping-list && npm run contract:test
```

**Start services:**

```bash
cd SERVICE_NAME && npm run dev    # Auto-generates schemas + file watching
cd SERVICE_NAME && npm run start  # Production mode
```

**Contract workflow:**

```bash
cd SERVICE_NAME && npm run contract:pull    # Pull latest contracts
cd SERVICE_NAME && npm run contract:test    # Test against running service
cd SERVICE_NAME && npm run contract:push    # Test + push contracts
cd SERVICE_NAME && npm run contract:schema  # Generate TypeScript types
```

**Frontend (app/):**

```bash
cd SERVICE_NAME && npm run dev     # (consider it already running!)
cd SERVICE_NAME && npm run build   # Production build
cd SERVICE_NAME && npm run lint    # ESLint
```

## Contract System

- Contracts are OpenAPI 3.0 specs in `/contract/` directories
- TypeScript types auto-generated to `src/*.d.ts` files
- Service dependencies managed through contract consumption
- Specmatic provides stub services for testing via Docker Compose

## Key Development Notes

- Always run `cd SERVICE_NAME && npm run contract:schema` after pulling contract changes!
- Use `cd SERVICE_NAME && npm run contract:test` to test if a service matches its OpenAPI specification!
- Use `cd app && npm run test` to run application tests for the app with Playwright!
- When making changes to the app, allways add a new test for new features or adapt existing tests if a feature changes!
- Run relevant tests when finishing a task!
