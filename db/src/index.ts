import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './db/schema';

const db = drizzle({ client: new Database('./src/db/sqlite.db'), schema });

export { db, schema };
