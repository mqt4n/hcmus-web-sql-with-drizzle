# HCMUS Web SQL with Drizzle

A full-stack TypeScript project using Drizzle ORM with SQLite database for managing university data (teachers, departments, projects, etc.).

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Project Structure

```
.
├── db/                    # Database package
│   ├── src/
│   │   ├── db/
│   │   │   ├── schema.ts  # Database schema
│   │   │   ├── seed.ts    # Seed data
│   │   │   └── sqlite.db  # SQLite database
│   │   └── types/         # Zod schemas & types
│   └── package.json
│
├── backend/               # REST API server
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── services/      # Business logic
│   │   ├── routes/        # API routes
│   │   ├── middlewares/   # Error handling
│   │   ├── db/           # Database connection
│   │   └── app.ts        # Express app
│   └── package.json
│
└── test/                 # HTTP test files
    └── teacher.http      # REST Client tests
```

## Installation

### 1. Install Database Dependencies

```bash
cd db
npm install
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

## Database Setup

Navigate to the `db` folder:

```bash
cd db
```

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

### 3. View Database (Optional)

Open Drizzle Studio to view and manage data:

```bash
npm run studio
```

## Backend API Server

Navigate to the `backend` folder:

```bash
cd backend
```

### Development Mode

Run the server with hot reload:

```bash
npm run dev
```

The server will start at `http://localhost:4000`

### Production Build

Build the TypeScript code:

```bash
npm run build
```

Run the built server:

```bash
npm start
```

### Type Checking

Check TypeScript types without building:

```bash
npm run typecheck
```

## API Endpoints

All endpoints are prefixed with `/api`

### Teachers API

- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/:id` - Get teacher by ID
- `POST /api/teachers` - Create new teacher
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher
- `GET /api/teachers/department/:departmentId` - Get teachers by department

## Testing with HTTP Files

The project includes HTTP test files for manual API testing using VS Code REST Client extension.

### 1. Install REST Client Extension

Install the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension in VS Code.

### 2. Start the Backend Server

```bash
cd backend
npm run dev
```

### 3. Run HTTP Tests

Open `test/teacher.http` and click "Send Request" above any request to test the API.

Available test cases:

- Get all teachers
- Get teacher by ID (success & not found)
- Create new teacher
- Update teacher (success & not found)
- Delete teacher (success & not found)
- Get teachers by department

## Database Scripts (in `db` folder)

- `npm run dev` - Run TypeScript compiler in watch mode
- `npm run build` - Build the project
- `npm run typecheck` - Run TypeScript type checking
- `npm run push` - Push schema changes to the database
- `npm run pull` - Pull schema from existing database
- `npm run gen` - Generate migration files
- `npm run mi` - Run migrations
- `npm run studio` - Open Drizzle Studio (database GUI)
- `npm run seed` - Seed database with initial data
- `npm run check` - Check for schema issues

## Backend Scripts (in `backend` folder)

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production server
- `npm run typecheck` - Type check without building

## Type Definitions

The project includes Zod schemas and TypeScript types for all tables:

- `giaoVien.ts` - Teacher types (Select, Insert, Update)
- `khoa.ts` - Faculty types
- `boMon.ts` - Department types
- `chuDe.ts` - Topic types
- `deTai.ts` - Project types
- `congViec.ts` - Task types
- `thamGiaDt.ts` - Project participation types
- `nguoiThan.ts` - Relative types
- `gvDt.ts` - Teacher phone types

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

## Quick Start Guide

### 1. Setup Database

```bash
# Navigate to db folder
cd db

# Install dependencies
npm install

# Create database and push schema
npm run push

# Seed with initial data
npm run seed
```

### 2. Start Backend Server

```bash
# Navigate to backend folder (from project root)
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
```

The API server will be running at `http://localhost:4000`

### 3. Test the API

Option A: Use HTTP files (recommended)

1. Install REST Client extension in VS Code
2. Open `test/teacher.http`
3. Click "Send Request" to test endpoints

Option B: Use curl

```bash
# Get all teachers
curl http://localhost:4000/api/teachers

# Get teacher by ID
curl http://localhost:4000/api/teachers/001
```

## Technologies

### Database Layer

- **Drizzle ORM** - TypeScript ORM
- **better-sqlite3** - SQLite database driver
- **Zod** - Runtime schema validation
- **drizzle-zod** - Generate Zod schemas from Drizzle

### Backend Layer

- **Express.js** - Web framework
- **TypeScript** - Type safety
- **tsup** - TypeScript bundler
- **tsx** - TypeScript execution

## Development Workflow

1. **Make Schema Changes**: Edit `db/src/db/schema.ts`
2. **Push to Database**: Run `npm run push` in `db` folder
3. **Update Types**: Types are auto-generated from schema
4. **Develop API**: Add/modify endpoints in `backend/src`
5. **Test**: Use HTTP files in `test/teacher.http`
6. **Build**: Run `npm run build` before deployment

## Troubleshooting

### Database not found

Make sure you've run `npm run push` and `npm run seed` in the `db` folder.

### Port already in use

Change the PORT in `backend/.env` file:

```env
PORT=4000
```

### Tests failing

Ensure the database is seeded with initial data:

```bash
cd db
npm run seed
```
