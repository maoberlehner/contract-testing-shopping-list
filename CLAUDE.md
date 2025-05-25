# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Docs

Use context7 to lookup documentation.

## Architecture

This is a contract-first microservices monorepo using **Specmatic** for API contract testing and validation. Services automatically generate TypeScript types from OpenAPI contracts.

**Services:**

- `service-product` (port 3200): Product CRUD operations
- `service-shopping-list` (port 3100): Shopping list management, consumes product service
- `app`: Next.js frontend
- `utils`: Contract management utilities

## Development Commands

Important: This is a monorepo with multiple projects! always navigate into the directory for the service or app for which you want to run those commands.

**Start services:**

```bash
npm run dev    # Auto-generates schemas + file watching
npm run start  # Production mode
```

**Contract workflow:**

```bash
npm run contract:pull    # Pull latest contracts
npm run contract:test    # Test against running service
npm run contract:push    # Test + push contracts
npm run contract:schema  # Generate TypeScript types
```

**Frontend (app/):**

```bash
npm run dev     # Next.js dev server with Turbopack
npm run build   # Production build
npm run lint    # ESLint
```

## Contract System

- Contracts are OpenAPI 3.0 specs in `/contract/` directories
- TypeScript types auto-generated to `src/*.d.ts` files
- Service dependencies managed through contract consumption
- Specmatic provides stub services for testing via Docker Compose

## Key Development Notes

- Always run `npm run contract:schema` after pulling contract changes
- `shopping-list` service depends on `product` service contract
- Use Docker Compose with Specmatic stubs for integration testing
