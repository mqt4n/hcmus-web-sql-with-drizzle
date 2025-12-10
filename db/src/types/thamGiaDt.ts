import type z from 'zod';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import * as schema from '../db/schema';

export const thamGiaDtSelectSchema = createSelectSchema(schema.thamGiaDt);
export const thamGiaDtInsertSchema = createInsertSchema(schema.thamGiaDt);
export const thamGiaDtUpdateSchema = createUpdateSchema(schema.thamGiaDt);

export type ThamGiaDt = z.infer<typeof thamGiaDtSelectSchema>;
export type ThamGiaDtInsert = z.infer<typeof thamGiaDtInsertSchema>;
export type ThamGiaDtUpdate = z.infer<typeof thamGiaDtUpdateSchema>;
