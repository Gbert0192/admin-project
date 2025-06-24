import { object, string, z } from "zod";

export const updateUserSchema = object({
  name: string().min(2, { message: "Name must be at least 2 characters." }),
  student_id: string().regex(
    /^[0-9]+$/,
    "Student ID harus berupa angka positif"
  ),
});

export const changePasswordSchema = object({
  currentPassword: string().min(1, "Current Password is required"),
  newPassword: string().min(1, "New Password is required"),
  confirmPassword: string().min(1, "Confirm Password is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "New password and confirm password do not match",
});

export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;
export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
