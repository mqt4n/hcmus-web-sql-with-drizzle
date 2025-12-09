import type z from 'zod';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import * as schema from '../db/schema';

export const boMonSelectSchema = createSelectSchema(schema.boMon);
export const boMonInsertSchema = createInsertSchema(schema.boMon);
export const boMonUpdateSchema = createUpdateSchema(schema.boMon);

export type BoMon = z.infer<typeof boMonSelectSchema>;
export type BoMonInsert = z.infer<typeof boMonInsertSchema>;
export type BoMonUpdate = z.infer<typeof boMonUpdateSchema>;
