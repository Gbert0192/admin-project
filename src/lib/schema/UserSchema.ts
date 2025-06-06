import { object, string, z } from "zod";

export const CreateUserSchema = object({
  name: string().min(2, { message: "Name must be at least 2 characters." }),
  student_id: string().min(5, { message: "Student ID must be valid." }),
  password: string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
