import { object, string } from "zod"
 
export const signInSchema = object({
  name: string({ required_error: "Pseudo is required" })
    .min(1, "Pseudo is required"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(3, "Password must be more than 3 characters")
    .max(32, "Password must be less than 32 characters"),
})