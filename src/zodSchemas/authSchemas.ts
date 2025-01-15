import { z } from "zod";

export const sendCodeSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email address." }),
});

export const verifyCodeSchema = z
  .object({
    code: z
      .string()
      .min(6, { message: "Code must be exactly 6 characters" })
      .max(6, { message: "Code must be exactly 6 characters" }),

    email: z
      .string()
      .email({ message: "Please provide a valid email address." }),
  })
  .strict();

export const loginSchema = [sendCodeSchema, verifyCodeSchema];

export type LoginSchemaT = z.infer<
  typeof sendCodeSchema & typeof verifyCodeSchema
>;
