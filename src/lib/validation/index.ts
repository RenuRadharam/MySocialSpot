import { z } from "zod"

export const SignupValidation = z.object({
    name: z.string().min(2, { message: 'Plese enter a valid name'}),
    username: z.string().min(2,{ message: 'Please enter a valid username'}),
    email: z.string().email(),
    password: z.string().min(8, { message: 'Please enter a strong password'}),
  })

export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: 'Please enter a strong password'}),
  })

export const PostValidation = z.object({
    caption: z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(1).max(1000),
    tags: z.string(),
});