# Hướng Dẫn Tạo Dự Án Từ Đầu

Tài liệu này hướng dẫn cách tạo một dự án tương tự từ con số 0, giúp bạn hiểu cách thiết lập Drizzle ORM với TypeScript và Express.

## Mục Lục

- [Phần 1: Thiết Lập Database Package](#phần-1-thiết-lập-database-package)
- [Phần 2: Thiết Lập Backend API](#phần-2-thiết-lập-backend-api)
- [Phần 3: Tích Hợp Database và Backend](#phần-3-tích-hợp-database-và-backend)
- [Phần 4: Tạo API Endpoints](#phần-4-tạo-api-endpoints)
- [Phần 5: Testing](#phần-5-testing)

---

## Phần 1: Thiết Lập Database Package

### Bước 1.1: Tạo Cấu Trúc Thư Mục

```bash
# Tạo thư mục gốc
mkdir my-drizzle-project
cd my-drizzle-project

# Tạo cấu trúc thư mục
mkdir -p db/src/db
mkdir -p db/src/types
mkdir backend
mkdir test
```

### Bước 1.2: Khởi Tạo Database Package

```bash
cd db
npm init -y
```

### Bước 1.3: Cài Đặt Dependencies Cho Database

```bash
# Core dependencies
npm install drizzle-orm better-sqlite3

# Development dependencies
npm install -D drizzle-kit @types/better-sqlite3 typescript tsx zod drizzle-zod
```

### Bước 1.4: Tạo TypeScript Config

Tạo file `db/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Bước 1.5: Tạo Drizzle Config

Tạo file `db/drizzle.config.ts`:

```typescript
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: './src/db/sqlite.db',
  },
  verbose: true,
  strict: true,
});
```

### Bước 1.6: Định Nghĩa Schema

Tạo file `db/src/db/schema.ts`:

```typescript
import { sqliteTable, text, real, integer, primaryKey, check, AnySQLiteColumn } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';

// Ví dụ: Bảng Giảng Viên
export const giaoVien = sqliteTable(
  'GIAOVIEN',
  {
    magv: text('MAGV', { length: 10 }).notNull().primaryKey(),
    hoTen: text('HOTEN', { length: 50 }).notNull(),
    luong: real('LUONG').default(1000),
    phai: text('PHAI', { length: 3 }).notNull(),
    ngSinh: text('NGSINH'),
    diaChi: text('DIACHI', { length: 50 }),
    gvqlcm: text('GVQLCM', { length: 10 }).references((): AnySQLiteColumn => giaoVien.magv, {
      onDelete: 'set null',
    }),
    mabm: text('MABM', { length: 10 }),
  },
  (table) => [check('check_phai_giaovien', sql`${table.phai} IN ('Nam', 'Nữ')`)]
);

// Ví dụ: Bảng Chủ Đề
export const chuDe = sqliteTable('CHUDE', {
  macd: text('MACD', { length: 10 }).notNull().primaryKey(),
  tenCd: text('TENCD', { length: 50 }),
});

// Định nghĩa Relations
export const giaoVienRelations = relations(giaoVien, ({ one, many }) => ({
  gvQuanLy: one(giaoVien, {
    fields: [giaoVien.gvqlcm],
    references: [giaoVien.magv],
    relationName: 'QuanLyCM',
  }),
  gvDuocQL: many(giaoVien, { relationName: 'QuanLyCM' }),
}));

// Export types
export type GiaoVienSelect = typeof giaoVien.$inferSelect;
export type GiaoVienInsert = typeof giaoVien.$inferInsert;
```

### Bước 1.7: Tạo Database Connection

Tạo file `db/src/db/index.ts`:

```typescript
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import path from 'path';

const dbPath = path.join(__dirname, 'sqlite.db');
const sqlite = new Database(dbPath);
sqlite.pragma('foreign_keys = ON');

export const db = drizzle(sqlite, { schema });
export { schema };
```

### Bước 1.8: Tạo Seed Script

Tạo file `db/src/db/seed.ts`:

```typescript
import { db, schema } from './index';

async function seed() {
  console.log('🌱 Seeding database...');

  // Seed Chủ đề
  await db.insert(schema.chuDe).values([
    { macd: '001', tenCd: 'Trí tuệ nhân tạo' },
    { macd: '002', tenCd: 'Khoa học dữ liệu' },
  ]);

  // Seed Giảng viên
  await db.insert(schema.giaoVien).values([
    {
      magv: '001',
      hoTen: 'Nguyễn Văn A',
      luong: 5000,
      phai: 'Nam',
      ngSinh: '1980-01-01',
      diaChi: 'TPHCM',
    },
  ]);

  console.log('✅ Database seeded successfully!');
}

seed().catch(console.error);
```

### Bước 1.9: Cấu Hình Scripts

Cập nhật `db/package.json`:

```json
{
  "name": "db",
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc",
    "typecheck": "tsc --noEmit",
    "push": "drizzle-kit push",
    "pull": "drizzle-kit pull",
    "gen": "drizzle-kit generate",
    "mi": "drizzle-kit migrate",
    "studio": "drizzle-kit studio",
    "seed": "tsx src/db/seed.ts",
    "check": "drizzle-kit check"
  }
}
```

### Bước 1.10: Push Schema và Seed

```bash
# Push schema lên database
npm run push

# Seed dữ liệu
npm run seed

# Xem database (optional)
npm run studio
```

---

## Phần 2: Thiết Lập Backend API

### Bước 2.1: Khởi Tạo Backend Package

```bash
cd ../backend
npm init -y
```

### Bước 2.2: Cài Đặt Dependencies

```bash
# Core dependencies
npm install express cors

# Development dependencies
npm install -D typescript tsx tsup @types/node @types/express @types/cors
```

### Bước 2.3: Tạo TypeScript Config

Tạo file `backend/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*", "server.ts"],
  "exclude": ["node_modules", "dist"]
}
```

### Bước 2.4: Tạo Build Config

Tạo file `backend/tsup.config.ts`:

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['server.ts'],
  format: ['cjs'],
  target: 'node18',
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  dts: false,
});
```

### Bước 2.5: Tạo Cấu Trúc Thư Mục

```bash
mkdir -p src/controllers
mkdir -p src/services
mkdir -p src/routes
mkdir -p src/middlewares
mkdir -p src/db
```

---

## Phần 3: Tích Hợp Database và Backend

### Bước 3.1: Tạo Database Connection Trong Backend

Tạo file `backend/src/db/index.ts`:

```typescript
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from '../../../db/src/db/schema';
import path from 'path';

const dbPath = path.join(__dirname, '../../../db/src/db/sqlite.db');
const sqlite = new Database(dbPath);
sqlite.pragma('foreign_keys = ON');

export const db = drizzle(sqlite, { schema });
export { schema };
```

### Bước 3.2: Tạo Error Middleware

Tạo file `backend/src/middlewares/error.middleware.ts`:

```typescript
import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};
```

---

## Phần 4: Tạo API Endpoints

### Bước 4.1: Tạo Service Layer

Tạo file `backend/src/services/teacher.service.ts`:

```typescript
import { db, schema } from '../db';
import { eq } from 'drizzle-orm';

export class TeacherService {
  async getAllTeachers() {
    return await db.select().from(schema.giaoVien);
  }

  async getTeacherById(id: string) {
    const result = await db.select().from(schema.giaoVien).where(eq(schema.giaoVien.magv, id)).limit(1);
    return result[0] || null;
  }

  async createTeacher(data: typeof schema.giaoVien.$inferInsert) {
    const result = await db.insert(schema.giaoVien).values(data).returning();
    return result[0];
  }

  async updateTeacher(id: string, data: Partial<typeof schema.giaoVien.$inferInsert>) {
    const result = await db.update(schema.giaoVien).set(data).where(eq(schema.giaoVien.magv, id)).returning();
    return result[0] || null;
  }

  async deleteTeacher(id: string) {
    const result = await db.delete(schema.giaoVien).where(eq(schema.giaoVien.magv, id)).returning();
    return result[0] || null;
  }
}

export const teacherService = new TeacherService();
```

### Bước 4.2: Tạo Controller

Tạo file `backend/src/controllers/teacher.controller.ts`:

```typescript
import { Request, Response } from 'express';
import { teacherService } from '../services/teacher.service';

export class TeacherController {
  async getAllTeachers(req: Request, res: Response) {
    try {
      const teachers = await teacherService.getAllTeachers();
      res.json({ success: true, data: teachers });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getTeacherById(req: Request, res: Response) {
    try {
      const teacher = await teacherService.getTeacherById(req.params.id);
      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: 'Teacher not found',
        });
      }
      res.json({ success: true, data: teacher });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async createTeacher(req: Request, res: Response) {
    try {
      const teacher = await teacherService.createTeacher(req.body);
      res.status(201).json({ success: true, data: teacher });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async updateTeacher(req: Request, res: Response) {
    try {
      const teacher = await teacherService.updateTeacher(req.params.id, req.body);
      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: 'Teacher not found',
        });
      }
      res.json({ success: true, data: teacher });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async deleteTeacher(req: Request, res: Response) {
    try {
      const teacher = await teacherService.deleteTeacher(req.params.id);
      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: 'Teacher not found',
        });
      }
      res.json({ success: true, data: teacher });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

export const teacherController = new TeacherController();
```

### Bước 4.3: Tạo Routes

Tạo file `backend/src/routes/teacher.routes.ts`:

```typescript
import { Router } from 'express';
import { teacherController } from '../controllers/teacher.controller';

const router = Router();

router.get('/', teacherController.getAllTeachers.bind(teacherController));
router.get('/:id', teacherController.getTeacherById.bind(teacherController));
router.post('/', teacherController.createTeacher.bind(teacherController));
router.put('/:id', teacherController.updateTeacher.bind(teacherController));
router.delete('/:id', teacherController.deleteTeacher.bind(teacherController));

export default router;
```

### Bước 4.4: Tạo Express App

Tạo file `backend/src/app.ts`:

```typescript
import express, { Application } from 'express';
import cors from 'cors';
import teacherRoutes from './routes/teacher.routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

export const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/teachers', teacherRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);
```

### Bước 4.5: Tạo Server Entry Point

Tạo file `backend/server.ts`:

```typescript
import { app } from './src/app';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Database connected successfully`);
});
```

### Bước 4.6: Cấu Hình Scripts

Cập nhật `backend/package.json`:

```json
{
  "name": "backend",
  "scripts": {
    "dev": "tsx watch server.ts",
    "build": "tsup",
    "start": "node dist/server.js",
    "typecheck": "tsc --noEmit"
  }
}
```

---

## Phần 5: Testing

### Bước 5.1: Tạo HTTP Test File

Tạo file `test/teacher.http`:

```http
@baseUrl = http://localhost:4000/api

### Get all teachers
GET {{baseUrl}}/teachers

### Get teacher by ID
GET {{baseUrl}}/teachers/001

### Create new teacher
POST {{baseUrl}}/teachers
Content-Type: application/json

{
  "magv": "002",
  "hoTen": "Trần Thị B",
  "luong": 6000,
  "phai": "Nữ",
  "ngSinh": "1985-05-15",
  "diaChi": "Hà Nội"
}

### Update teacher
PUT {{baseUrl}}/teachers/002
Content-Type: application/json

{
  "luong": 7000,
  "diaChi": "Đà Nẵng"
}

### Delete teacher
DELETE {{baseUrl}}/teachers/002
```

### Bước 5.2: Test API

1. Khởi động backend server:

   ```bash
   cd backend
   npm run dev
   ```

2. Mở VS Code và file `test/teacher.http`

3. Click "Send Request" để test từng endpoint

---

## Tổng Kết Các Bước

### Checklist Tạo Dự Án

- [ ] **Database Setup**

  - [ ] Tạo thư mục và structure
  - [ ] Cài đặt dependencies (drizzle-orm, better-sqlite3)
  - [ ] Tạo tsconfig.json và drizzle.config.ts
  - [ ] Định nghĩa schema với tables và relations
  - [ ] Tạo database connection
  - [ ] Viết seed script
  - [ ] Push schema và seed data

- [ ] **Backend Setup**

  - [ ] Khởi tạo backend package
  - [ ] Cài đặt dependencies (express, cors)
  - [ ] Tạo tsconfig.json và tsup.config.ts
  - [ ] Tạo database connection trong backend
  - [ ] Tạo error middleware

- [ ] **API Development**

  - [ ] Tạo Service layer (business logic)
  - [ ] Tạo Controller layer (HTTP handlers)
  - [ ] Tạo Routes
  - [ ] Tạo Express app
  - [ ] Tạo server entry point

- [ ] **Testing**
  - [ ] Tạo HTTP test files
  - [ ] Test tất cả endpoints
  - [ ] Kiểm tra error handling

---

## Các Pattern Quan Trọng

### 1. Schema Definition Pattern

```typescript
// Bảng đơn giản
export const tableName = sqliteTable('TABLE_NAME', {
  id: text('ID').notNull().primaryKey(),
  name: text('NAME'),
});

// Bảng với constraints
export const tableName = sqliteTable(
  'TABLE_NAME',
  {
    // columns...
  },
  (table) => [
    check('constraint_name', sql`condition`),
    // hoặc return object cho primaryKey
  ]
);

// Foreign key với circular reference
column: text('COLUMN').references((): AnySQLiteColumn => otherTable.column);
```

### 2. Service Layer Pattern

```typescript
export class EntityService {
  async getAll() {
    return await db.select().from(schema.entity);
  }

  async getById(id: string) {
    const result = await db.select().from(schema.entity).where(eq(schema.entity.id, id)).limit(1);
    return result[0] || null;
  }

  async create(data: InsertType) {
    const result = await db.insert(schema.entity).values(data).returning();
    return result[0];
  }
}
```

### 3. Controller Pattern

```typescript
export class EntityController {
  async getAll(req: Request, res: Response) {
    try {
      const data = await entityService.getAll();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
```

---

## Mở Rộng Dự Án

### Thêm Entity Mới

1. **Thêm vào Schema** (`db/src/db/schema.ts`)
2. **Push Schema** (`npm run push` trong db/)
3. **Tạo Service** (`backend/src/services/entity.service.ts`)
4. **Tạo Controller** (`backend/src/controllers/entity.controller.ts`)
5. **Tạo Routes** (`backend/src/routes/entity.routes.ts`)
6. **Register Routes** trong `app.ts`
7. **Tạo HTTP Tests** (`test/entity.http`)

### Thêm Tính Năng Mới

- **Filtering**: Thêm query params và `where` conditions
- **Sorting**: Sử dụng `orderBy` từ drizzle-orm
- **Pagination**: Thêm `limit` và `offset`
- **Aggregations**: Sử dụng `count`, `sum`, `avg` từ drizzle-orm
- **Relations**: Sử dụng `.with()` để join tables

---

## Tips & Best Practices

### Database

- ✅ Luôn enable foreign keys: `sqlite.pragma('foreign_keys = ON')`
- ✅ Sử dụng relations cho type-safe joins
- ✅ Dùng CHECK constraints cho validation ở DB level
- ✅ Export types từ schema: `$inferSelect`, `$inferInsert`

### Backend

- ✅ Tách biệt Service và Controller layers
- ✅ Luôn có error handling trong controllers
- ✅ Sử dụng `.bind(controller)` trong routes
- ✅ Trả về result[0] cho single record queries

### TypeScript

- ✅ Enable `strict: true`
- ✅ Sử dụng inferred types từ Drizzle
- ✅ Dùng `AnySQLiteColumn` cho circular references
- ✅ Chạy `typecheck` trước khi commit

---

## Resources

- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [SQLite Documentation](https://www.sqlite.org/docs.html)

---

**Chúc bạn xây dựng dự án thành công!** 🎉
