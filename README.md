# Hệ Thống Quản Lý Đề Tài - HCMUS
Dự án **hướng dẫn sử dụng Drizzle ORM** thông qua ví dụ thực tế về hệ thống quản lý đề tài nghiên cứu của giảng viên, sử dụng **SQLite database** và **TypeScript**.

> 📚 **Mục đích**: Repository này được thiết kế như một **tutorial toàn diện** về Drizzle ORM, từ định nghĩa schema, migrations, relations, đến tích hợp với REST API.

> 📄 **Lược đồ cơ sở dữ liệu**: Xem file [`Quan ly DE TAI - Mo ta du lieu.pdf`](./Quan%20ly%20DE%20TAI%20-%20Mo%20ta%20du%20lieu.pdf) để biết chi tiết về schema, quan hệ giữa các bảng và mô tả đầy đủ về cấu trúc database.

## Bạn Sẽ Học Được Gì

✅ **Drizzle ORM Fundamentals**

- Định nghĩa schema với type-safe
- Foreign keys và CHECK constraints
- Self-references và circular dependencies
- Relations one-to-one, one-to-many, many-to-many

✅ **Database Management**

- Push schema và migrations
- Seeding data với TypeScript
- Drizzle Studio để quản lý database

✅ **TypeScript Integration**

- Auto-generated types từ schema
- Zod validation schemas
- Type-safe queries và mutations

✅ **REST API với Express**

- CRUD operations với Drizzle
- Service layer pattern
- Error handling và validation

✅ **Advanced Features**

- Aggregations và statistics
- Filtering và joins
- Transaction handling

## Yêu Cầu Hệ Thống

- Node.js phiên bản 18 trở lên
- npm hoặc yarn

## Cấu Trúc Dự Án

```
.
├── db/                      # Package quản lý database
│   ├── src/
│   │   ├── db/
│   │   │   ├── schema.ts    # Định nghĩa schema database
│   │   │   ├── seed.ts      # Dữ liệu mẫu
│   │   │   └── sqlite.db    # File database SQLite
│   │   └── types/           # Type definitions & Zod schemas
│   ├── drizzle.config.ts    # Config cho Drizzle Kit
│   └── package.json
│
├── backend/                 # REST API server
│   ├── src/
│   │   ├── controllers/     # Xử lý HTTP requests
│   │   ├── services/        # Business logic
│   │   ├── routes/          # Định nghĩa routes
│   │   ├── middlewares/     # Error handling, validation
│   │   ├── db/              # Kết nối database
│   │   └── app.ts           # Express application
│   ├── server.ts            # Entry point
│   ├── tsup.config.ts       # Build configuration
│   └── package.json
│
└── test/                    # Test files với REST Client
    ├── teacher.http         # Test API giảng viên
    ├── topic.http           # Test API chủ đề
    ├── projects.http        # Test API đề tài
    └── stats.http           # Test API thống kê
```

## Hướng Dẫn Cài Đặt

### Bước 1: Cài Đặt Dependencies Cho Database

```bash
cd db
npm install
```

### Bước 2: Cài Đặt Dependencies Cho Backend

```bash
cd backend
npm install
```

## Thiết Lập Database

Di chuyển vào thư mục `db`:

```bash
cd db
```

### 1. Tạo Database và Push Schema

Tạo hoặc cập nhật cấu trúc database:

```bash
npm run push
```

### 2. Thêm Dữ Liệu Mẫu

Chạy script để thêm dữ liệu mẫu vào database:

```bash
npm run seed
```

### 3. Xem Database (Tùy Chọn)

Mở Drizzle Studio để xem và quản lý dữ liệu trực quan:

```bash
npm run studio
```

Drizzle Studio sẽ mở tại `https://local.drizzle.studio`

## Chạy Backend API Server

Di chuyển vào thư mục `backend`:

```bash
cd backend
```

### Chế Độ Development (Khuyến Nghị)

Chạy server với hot reload (tự động restart khi có thay đổi):

```bash
npm run dev
```

Server sẽ chạy tại `http://localhost:4000`

### Build Production

Build TypeScript thành JavaScript:

```bash
npm run build
```

Chạy server production:

```bash
npm start
```

### Kiểm Tra Type

Kiểm tra TypeScript types mà không build:

```bash
npm run typecheck
```

## API Endpoints

Tất cả endpoints đều có prefix `/api`

### API Giảng Viên (Teachers)

- `GET /api/teachers` - Lấy danh sách tất cả giảng viên
- `GET /api/teachers/:id` - Lấy thông tin giảng viên theo mã
- `POST /api/teachers` - Tạo giảng viên mới
- `PUT /api/teachers/:id` - Cập nhật thông tin giảng viên
- `DELETE /api/teachers/:id` - Xóa giảng viên
- `GET /api/teachers/department/:departmentId` - Lấy giảng viên theo bộ môn

### API Chủ Đề (Topics)

- `GET /api/topics` - Lấy danh sách tất cả chủ đề
- `GET /api/topics/:id` - Lấy thông tin chủ đề theo mã
- `POST /api/topics` - Tạo chủ đề mới
- `PUT /api/topics/:id` - Cập nhật thông tin chủ đề
- `DELETE /api/topics/:id` - Xóa chủ đề

### API Đề Tài (Projects)

- `GET /api/projects` - Lấy danh sách tất cả đề tài
- `GET /api/projects/:id` - Lấy thông tin đề tài theo mã
- `GET /api/projects/topic/:topicId` - Lấy đề tài theo chủ đề
- `POST /api/projects` - Tạo đề tài mới
- `PUT /api/projects/:id` - Cập nhật thông tin đề tài
- `DELETE /api/projects/:id` - Xóa đề tài

### API Thống Kê (Statistics)

- `GET /api/stats/teacher-projects` - Thống kê số đề tài của từng giảng viên
- `GET /api/stats/department-budgets` - Thống kê tổng kinh phí theo bộ môn
- `GET /api/stats/topic-projects` - Thống kê số đề tài theo chủ đề

## Test API Với HTTP Files

Dự án có sẵn các file HTTP để test API thủ công với VS Code REST Client extension.

### 1. Cài Đặt REST Client Extension

Cài đặt extension [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) trong VS Code.

### 2. Khởi Động Backend Server

```bash
cd backend
npm run dev
```

### 3. Chạy HTTP Tests

Mở các file trong thư mục `test/` và click "Send Request" phía trên mỗi request để test API:

- **`teacher.http`** - Test CRUD giảng viên và lọc theo bộ môn
- **`topic.http`** - Test CRUD chủ đề
- **`projects.http`** - Test CRUD đề tài và lọc theo chủ đề
- **`stats.http`** - Test các API thống kê

## Các Lệnh Npm (Scripts)

### Scripts cho Database (trong thư mục `db`)

- `npm run dev` - Chạy TypeScript compiler ở chế độ watch
- `npm run build` - Build project
- `npm run typecheck` - Kiểm tra TypeScript types
- `npm run push` - Đẩy schema lên database (tạo/cập nhật bảng)
- `npm run pull` - Kéo schema từ database hiện có
- `npm run gen` - Tạo file migration
- `npm run mi` - Chạy migrations
- `npm run studio` - Mở Drizzle Studio (GUI quản lý database)
- `npm run seed` - Thêm dữ liệu mẫu vào database
- `npm run check` - Kiểm tra lỗi schema

### Scripts cho Backend (trong thư mục `backend`)

- `npm run dev` - Chạy development server với hot reload
- `npm run build` - Build TypeScript sang JavaScript
- `npm start` - Chạy production server
- `npm run typecheck` - Kiểm tra types mà không build

## Type Definitions

Dự án có đầy đủ Zod schemas và TypeScript types cho tất cả các bảng:

- `giaoVien.ts` - Types cho Giảng viên (Select, Insert, Update)
- `khoa.ts` - Types cho Khoa
- `boMon.ts` - Types cho Bộ môn
- `chuDe.ts` - Types cho Chủ đề
- `deTai.ts` - Types cho Đề tài
- `congViec.ts` - Types cho Công việc
- `thamGiaDt.ts` - Types cho Tham gia đề tài
- `nguoiThan.ts` - Types cho Người thân
- `gvDt.ts` - Types cho Điện thoại giảng viên

## Cấu Trúc Database

Dự án bao gồm các bảng sau:

### Bảng Chính

- **GIAOVIEN** - Giảng viên (có CHECK constraint cho trường `phai` và FK self-reference)
- **KHOA** - Khoa
- **BOMON** - Bộ môn (có FK đến KHOA và GIAOVIEN)
- **CHUDE** - Chủ đề nghiên cứu
- **DETAI** - Đề tài (có FK đến CHUDE và GIAOVIEN)
- **CONGVIEC** - Công việc trong đề tài (có FK đến DETAI)
- **THAMGIADT** - Tham gia đề tài (có FK đến GIAOVIEN và DETAI)

### Bảng Phụ

- **NGUOITHAN** - Người thân của giảng viên (có CHECK constraint cho `phai`)
- **GV_DT** - Số điện thoại giảng viên

### Các Ràng Buộc Đặc Biệt

- **CHECK Constraints**: Trường `phai` chỉ nhận giá trị 'Nam' hoặc 'Nữ'
- **Foreign Keys**: Đầy đủ FK constraints bao gồm cả circular references
- **Cascading Deletes**: Tự động xóa dữ liệu liên quan khi xóa bản ghi chính

## Hướng Dẫn Nhanh

### 1. Thiết Lập Database

```bash
# Di chuyển vào thư mục db
cd db

# Cài đặt dependencies
npm install

# Tạo database và push schema
npm run push

# Thêm dữ liệu mẫu
npm run seed
```

### 2. Khởi Động Backend Server

```bash
# Di chuyển vào thư mục backend (từ thư mục gốc)
cd backend

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

API server sẽ chạy tại `http://localhost:4000`

### 3. Test API

**Cách 1: Dùng HTTP files (Khuyến nghị)**

1. Cài đặt REST Client extension trong VS Code
2. Mở file trong thư mục `test/` (VD: `test/teacher.http`)
3. Click "Send Request" phía trên mỗi request

**Cách 2: Dùng curl hoặc Postman**

```bash
# Lấy danh sách giảng viên
curl http://localhost:4000/api/teachers

# Lấy giảng viên theo mã
curl http://localhost:4000/api/teachers/001

# Lấy thống kê đề tài theo giảng viên
curl http://localhost:4000/api/stats/teacher-projects
```

## Công Nghệ Sử Dụng

### Database Layer

- **Drizzle ORM** - TypeScript ORM hiện đại, type-safe
- **better-sqlite3** - SQLite database driver cho Node.js
- **Zod** - Validation schema và runtime type checking
- **drizzle-zod** - Tự động generate Zod schemas từ Drizzle schema

### Backend Layer

- **Express.js 5** - Web framework
- **TypeScript** - Type safety và IntelliSense
- **tsup** - TypeScript bundler nhanh
- **tsx** - Chạy TypeScript trực tiếp

## Quy Trình Phát Triển

1. **Thay Đổi Schema**: Chỉnh sửa `db/src/db/schema.ts`
2. **Push Schema**: Chạy `npm run push` trong thư mục `db`
3. **Types Tự Động**: Types được tự động generate từ schema
4. **Phát Triển API**: Thêm/sửa endpoints trong `backend/src`
5. **Test**: Dùng HTTP files trong thư mục `test/`
6. **Build**: Chạy `npm run build` trước khi deploy

## Xử Lý Lỗi Thường Gặp

### Lỗi "Database not found"

Đảm bảo bạn đã chạy `npm run push` và `npm run seed` trong thư mục `db`:

```bash
cd db
npm run push
npm run seed
```

### Lỗi "Port already in use"

Thay đổi PORT trong file `backend/.env` (nếu chưa có thì tạo file):

```env
PORT=4000
```

Hoặc thay đổi trong file `backend/server.ts`

### Test API không hoạt động

Kiểm tra:

1. Database đã được seed chưa: `cd db && npm run seed`
2. Backend server đã chạy chưa: `cd backend && npm run dev`
3. REST Client extension đã cài trong VS Code chưa

### Lỗi TypeScript

Chạy typecheck để xem lỗi chi tiết:

```bash
# Check database types
cd db && npm run typecheck

# Check backend types
cd backend && npm run typecheck
```

## Tính Năng Nổi Bật

✅ **Type-safe toàn bộ**: Từ database đến API đều có types đầy đủ  
✅ **Foreign Key Constraints**: Đầy đủ FK kể cả circular references  
✅ **CHECK Constraints**: Validation ở database level  
✅ **CRUD đầy đủ**: Cho Giảng viên, Chủ đề, Đề tài  
✅ **API Thống kê**: Thống kê đề tài, kinh phí theo nhiều tiêu chí  
✅ **Hot Reload**: Backend tự động restart khi có thay đổi  
✅ **HTTP Tests**: Test files sẵn có cho tất cả endpoints  
✅ **Drizzle Studio**: GUI trực quan để quản lý database

## Về Dự Án

Dự án được phát triển cho môn học **Phát Triển Ứng Dụng Web** - Trường Đại học Khoa học Tự nhiên TPHCM

🔗 **GitHub**: [mqt4n/hcmus-web-sql-with-drizzle](https://github.com/mqt4n/hcmus-web-sql-with-drizzle)

## Tham Khảo

- [Drizzle ORM Documentation](https://orm.drizzle.team/)
