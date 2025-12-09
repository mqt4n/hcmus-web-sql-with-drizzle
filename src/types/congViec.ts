import type z from 'zod';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import * as schema from '../db/schema';

export const congViecSelectSchema = createSelectSchema(schema.congViec);
export const congViecInsertSchema = createInsertSchema(schema.congViec);
export const congViecUpdateSchema = createUpdateSchema(schema.congViec);

export type CongViec = z.infer<typeof congViecSelectSchema>;
export type CongViecInsert = z.infer<typeof congViecInsertSchema>;
export type CongViecUpdate = z.infer<typeof congViecUpdateSchema>;
