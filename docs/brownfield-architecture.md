# Penground Brownfield Architecture Document

## Introduction

This document captures the CURRENT STATE of the Penground codebase, a learning playground project. It is designed as a technical reference for senior developers and AI agents to understand the project's structure, conventions, and real-world patterns to facilitate future development.

### Document Scope

This is a comprehensive documentation of the entire system as of its last analysis.

### Change Log

| Date           | Version | Description                 | Author    |
|----------------|---------|-----------------------------|-----------|
| August 6, 2025 | 1.0     | Initial brownfield analysis | Winston (Architect) |

## Quick Reference - Key Files and Entry Points

### Critical Files for Understanding the System

- **Backend Main Entry**: `backend/src/main/kotlin/penguin/penground/PengroundApplication.kt`
- **Frontend Main Entry**: `frontend/src/App.tsx` (Routing) and `frontend/src/index.tsx` (Rendering)
- **API Contract**: `openapi/api_description.yaml` (CRITICAL: This file drives API code generation)
- **Frontend Dependencies**: `frontend/package.json`
- **Backend Dependencies**: `backend/build.gradle.kts`
- **Project Build Definition**: `build.gradle.kts` and `settings.gradle.kts`
- **Deployment & Setup**: `README.md` and `Dockerfile`

## High Level Architecture

This is a full-stack application composed of a React frontend and a Kotlin/Spring Boot backend. It is structured as a Gradle multi-project monorepo.

A key architectural feature is the use of **OpenAPI-driven development**. The `openapi/api_description.yaml` file serves as the single source of truth for the API contract. During the build process, this file is used to automatically generate both the backend Spring Boot controller interfaces (via `org.openapi.generator`) and the frontend TypeScript Axios client (via `openapi-generator-cli`). This ensures the frontend and backend are always in sync.

### Actual Tech Stack

| Category | Technology | Version | Notes |
|---|---|---|---|
| **Backend** | | | |
| Runtime | JDK | 17 | As defined in `backend/build.gradle.kts` |
| Framework | Spring Boot | 3.1.0 | |
| Language | Kotlin | 1.8.22 | |
| Database | PostgreSQL | | Driver is included; uses embedded PG for tests. |
| Build Tool | Gradle | | Wrapper defined in project root. |
| **Frontend** | | | |
| Framework | React | 18.2.0 | |
| Language | TypeScript | 4.9.5 | |
| UI Library | Material-UI (MUI) | 5.14.11 | |
| Package Manager | Yarn | | `yarn.lock` is present. |
| Build Tool | react-scripts | 5.0.1 | (Create React App) |
| **Containerization** | | | |
| | Docker | | `Dockerfile` and `docker-compose.yml` present. |

### Repository Structure Reality Check

- **Type**: Monorepo
- **Package Manager**: Gradle (root), Yarn (frontend)
- **Notable**: The project is configured to be deployed in two ways:
    1.  **Development**: Two separate servers (React dev server on port 3000, Spring Boot on 8080) with a proxy from frontend to backend.
    2.  **Production**: The React frontend is built and bundled as static resources into the backend Spring Boot JAR, served on a single port (8080). This is controlled by the `-Pbundle` Gradle property.

## Source Tree and Module Organization

### Project Structure (Actual)

```text
penground/
├── backend/
│   └── src/main/kotlin/penguin/penground/ # Main application source
│       ├── config/                       # Spring Boot configuration
│       ├── cryptography/                 # Business logic for cryptography feature
│       ├── frontend/                     # Controller for serving bundled frontend
│       ├── model/                        # Data models (likely JPA entities)
│       ├── ping-pong/                    # Business logic for ping-pong feature
│       ├── repository/                   # Data access layer (Spring Data repositories)
│       └── PengroundApplication.kt       # Main application entry point
├── frontend/
│   └── src/
│       ├── openapi/                      # Generated TypeScript Axios client
│       ├── theme/                        # Material-UI theme definitions
│       ├── ui_component/                 # React components, organized by feature
│       │   ├── global/                   # Shared components (e.g., drawers)
│       │   └── ...
│       ├── App.tsx                       # Root component with routing
│       └── index.tsx                     # Main React render entry point
├── openapi/
│   └── api_description.yaml              # API contract (source of truth)
└── build.gradle.kts                      # Root Gradle build script
```

### Key Modules and Their Purpose

- **`backend/cryptography`**: Implements the core business logic for encryption and decryption as defined in the OpenAPI spec.
- **`backend/ping-pong`**: A simple health-check or test endpoint.
- **`frontend/ui_component/*`**: Feature-based React components. For example, `CryptographyPage.tsx` likely consumes the generated `cryptography` API client.
- **`frontend/openapi`**: **CRITICAL**: This directory contains code generated by `openapi-generator-cli`. It should not be manually edited. It provides typed functions for making API calls to the backend.

## Data Models and APIs

### Data Models

Data models are defined implicitly by the schemas in `openapi/api_description.yaml`. These schemas are then used to generate the corresponding models in the backend (likely as Kotlin data classes) and types in the frontend (TypeScript interfaces).

- **CryptographyRequest**: See `components/schemas/CryptographyRequest` in the OpenAPI file.
- **CryptographyResponse**: See `components/schemas/CryptographyResponse` in the OpenAPI file.

### API Specifications

The single source of truth is **`openapi/api_description.yaml`**.

- **Endpoints**: `/cryptography/encrypt`, `/cryptography/decrypt`, `/ping`
- **Code Generation**:
    - **Backend**: The `openApiGenerate` task in `backend/build.gradle.kts` generates Spring Boot interfaces into `$buildDir/generated`. These interfaces are then implemented by the service classes (e.g., in the `cryptography` package).
    - **Frontend**: The `yarn openapi` script in `frontend/package.json` generates a TypeScript Axios client into `frontend/src/openapi/generated`.

## Technical Debt and Known Issues

- As a learning project, there is no formal tracking of technical debt.
- The primary "gotcha" for new developers is the code generation step. If the API contract in `openapi/api_description.yaml` is changed, both the backend and frontend must be rebuilt (`./gradlew build` and `cd frontend && yarn openapi`) to reflect those changes. Failure to do so will result in compilation errors or runtime mismatches.

## Development and Deployment

### Local Development Setup

As per `README.md`:

1.  **Backend**: Run `./gradlew :backend:bootRun` from the root directory.
2.  **Frontend**: Run `cd frontend && yarn install && yarn start`.
3.  The frontend will proxy API requests from `localhost:3000` to the backend at `http://localhost:8080`.

### Build and Deployment Process

- **Bundled Build**: `gradle clean build -Pbundle` creates a single executable JAR containing both backend and frontend.
- **Run Bundled App**: `java -jar backend/build/libs/backend-0.0.1-SNAPSHOT.jar --bundle=true`
- **Docker**: A `Dockerfile` is provided for building and running the application as a container.

## Testing Reality

### Current Test Coverage

- **Backend**: The `backend/build.gradle.kts` file includes dependencies for `spring-boot-starter-test`, `mockito-kotlin`, and `embedded-postgres`. Test files are expected to be under `backend/src/test/kotlin`.
- **Frontend**: The project is set up with `react-scripts`, which includes Jest and React Testing Library. Test files are co-located with source files (e.g., `App.test.tsx`).

### Running Tests

- **Backend**: `./gradlew :backend:test`
- **Frontend**: `cd frontend && yarn test`

## Appendix - Useful Commands and Scripts

### Frequently Used Commands

```bash
# Run backend and frontend separately for development
./gradlew :backend:bootRun
cd frontend && yarn start

# Build the bundled production artifact
./gradlew clean build -Pbundle

# Run all backend tests
./gradlew :backend:test

# Run all frontend tests
cd frontend && yarn test

# Regenerate frontend API client after changing openapi/api_description.yaml
cd frontend && yarn openapi
```
