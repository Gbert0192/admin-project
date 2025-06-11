import { object, string } from "zod";

export const signInSchema = object({
  student_id: string({ required_error: "Student Id Is Required" }).min(
    1,
    "Student Nim is required"
  ),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const signUpSchema = object({
  name: string().min(2, { message: "Name must be at least 2 characters." }),
  student_id: string().min(5, { message: "Student ID must be valid." }),
  password: string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});
