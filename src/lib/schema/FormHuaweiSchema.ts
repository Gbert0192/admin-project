import { z } from "zod";

export const createFormHuaweiPayload = z.object({
  form_title: z.string().min(1, { message: "Form Title is required." }),
  form_description: z
    .string()
    .min(1, { message: "Form Description is required." }),
});

export type CreateFormHuaweiPayload = z.infer<typeof createFormHuaweiPayload>;
