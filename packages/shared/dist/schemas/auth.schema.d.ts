import { z } from "zod";
export declare const emailSchema: z.ZodString;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    userAgent: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    userAgent?: string | undefined;
}, {
    email: string;
    password: string;
    userAgent?: string | undefined;
}>;
export type LoginRequest = z.infer<typeof loginSchema>;
//# sourceMappingURL=auth.schema.d.ts.map