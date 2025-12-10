import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/db/schema.ts', // Đổi từ .js sang .ts
  out: './src/db/migrations',
  dbCredentials: {
    url: './src/db/sqlite.db', // Đường dẫn file DB
  },
});
