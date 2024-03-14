import { z } from "zod";

export const SignUpValidationformSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z
    .string()
    .min(2, { message: "Password must be at least 2 characters" }),
});

export const SignInValidationformSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(2, { message: "Password must be at least 2 characters" }),
});

export const CreatePostValidationformSchema = z.object({
  caption: z.string(),
  file: z.string(),
  location: z.string(),
  tags: z.string(),
});
