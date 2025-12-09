# HCMUS Web SQL with Drizzle

A TypeScript project using Drizzle ORM with SQLite database for managing university data (teachers, departments, projects, etc.).

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

Install dependencies:

```bash
npm install
```

## Database Setup

### 1. Push Schema to Database

Create/update the database schema:

```bash
npm run push
```

### 2. Seed Database

Populate the database with initial data:

```bash
npm run seed
```

## Available Scripts

### Development

- `npm run dev` - Run TypeScript compiler in watch mode
- `npm run build` - Build the project
- `npm run typecheck` - Run TypeScript type checking

### Database Management

- `npm run push` - Push schema changes to the database
- `npm run pull` - Pull schema from existing database
- `npm run gen` - Generate migration files
- `npm run mi` - Run migrations
- `npm run studio` - Open Drizzle Studio (database GUI)
- `npm run seed` - Seed database with initial data
- `npm run check` - Check for schema issues

### Testing

- `npm run test` - Run test file

## Project Structure

```
src/
├── db/
│   ├── index.ts       # Database connection
│   ├── schema.ts      # Database schema definitions
│   └── seed.ts        # Seed data
└── types/
    ├── giaoVien.ts    # Teacher types
    ├── khoa.ts        # Faculty types
    ├── boMon.ts       # Department types
    ├── chuDe.ts       # Topic types
    ├── deTai.ts       # Project types
    ├── congViec.ts    # Task types
    ├── thamGiaDt.ts   # Project participation types
    ├── nguoiThan.ts   # Relative types
    └── gvDt.ts        # Teacher phone types
```

## Database Schema

The project includes the following tables:

- **GIAOVIEN** - Teachers
- **KHOA** - Faculties
- **BOMON** - Departments
- **CHUDE** - Topics
- **DETAI** - Projects
- **CONGVIEC** - Tasks
- **THAMGIADT** - Project Participation
- **NGUOITHAN** - Relatives
- **GV_DT** - Teacher Phone Numbers

## Quick Start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Setup database:

   ```bash
   npm run push
   ```

3. Seed data:

   ```bash
   npm run seed
   ```

4. View database in Drizzle Studio:
   ```bash
   npm run studio
   ```

## Technologies

- **Drizzle ORM** - TypeScript ORM
- **better-sqlite3** - SQLite database driver
- **Zod** - Schema validation
- **TypeScript** - Type safety
- **tsup** - TypeScript bundler
