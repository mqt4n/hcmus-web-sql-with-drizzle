import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',

  // Sửa đường dẫn schema: THÊM PHẦN MỞ RỘNG FILE (.js)
  schema: './src/db/schema.js',

  out: './src/db/migrations',

  dbCredentials: {
    url: './src/db/sqlite.db',
  },
});
