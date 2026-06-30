## Project Structure

KineSoin is organized as a pnpm monorepo.

The repository contains:

- kineSoin-back_end:
  - Express backend application
  - Database management
  - API endpoints

- kineSoin-front:
  - Current React frontend application

- kineSoin-front_end:
  - Previous frontend version kept as a reference during refactoring and evolution of the application

- docs:
  - Project documentation
  - Development notes
  - Interview preparation material

## Development workflow

The root package.json acts as an orchestrator.

Examples:

- `pnpm dev1` starts backend and current frontend simultaneously.
- `pnpm lint_both` runs linting across applications.
- `pnpm db:reset` delegates database reset commands to the backend workspace.

The applications remain independent while sharing a common development workflow.

## Repository organization

KineSoin uses a pnpm monorepo.

Active workspace packages:

- kineSoin-backend
- kineSoin-frontend

The repository also contains:

- docs/
- archive/kineSoin-frontend-v1/

The archived frontend is kept as a reference to compare the evolution of the application, but is not part of the active workspace.

kineSoin-backend
|
|-database
|
|-docs
|-node_modules
|-src
|-.env

## Backend Architecture

The backend is organized around several responsibilities:

- database management
- authentication and security
- middleware
- data models
- routing/controllers
- business logic utilities
- validation

The objective is to separate HTTP handling, business logic, and data access.

## Known architectural improvements

- Some services currently handle HTTP concerns (req/res).
- Future refactor: make services framework-independent and let controllers manage responses.
