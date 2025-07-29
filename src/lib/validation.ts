// src/lib/validation.ts
import { z } from 'zod';

// Schema for the login form using Zod
export const authSchema = z.object({
  // We only have one field for now: phone
  phone: z
    .string()
    .min(1, 'شماره تلفن رو یادت رفت وارد کنی!') // Custom error message
    .regex(/^09\d{9}$/, 'این شماره موبایل شبیه شماره‌های ایران نیست!'), // Regex for validation
});

// This is a cool trick: we can infer the TypeScript type directly from the schema
// so we don't have to write it manually.
export type AuthFormValues = z.infer<typeof authSchema>;