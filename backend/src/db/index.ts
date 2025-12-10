import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import path from 'path';

// Import schema from parent db folder
import * as schema from '../../../db/src/db/schema';

// Connect to the database in the parent db folder
// Handle both dev (tsx from backend/src/db/) and prod (built to backend/dist)
const isDev = __dirname.includes('src');
const dbPath = isDev
  ? path.resolve(__dirname, '../../..', 'db', 'src', 'db', 'sqlite.db') // dev: from backend/src/db -> up 3 to project root
  : path.resolve(__dirname, '../..', 'db', 'src', 'db', 'sqlite.db'); // prod: from backend/dist -> up 2 to project root

const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });

// Re-export schema
export { schema };
