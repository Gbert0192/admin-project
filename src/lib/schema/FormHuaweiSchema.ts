import { z } from "zod";

export const createFormHuaweiPayload = z.object({
  form_title: z.string().min(1, { message: "Form Title is required." }),
  form_description: z
    .string()
    .min(1, { message: "Form Description is required." }),
});

const optionSchema = z.object({
  option_text: z.string().min(1, { message: "Option text is required." }),
  is_correct: z.boolean(),
});

export const createHuaweiQuestionPayload = z
  .object({
    type: z.enum(["SINGLE_CHOICE", "MULTIPLE_CHOICE", "TRUE_FALSE", "ESSAY"]),
    point: z.number().int().positive().min(1, "Point must be greater than 0"),
    difficulty: z.enum(["EASY", "MEDIUM", "HOT"]),
    question: z.string().min(1, { message: "Question is required." }),
    options: z.array(optionSchema),
  })
  .refine(
    (data) =>
      (data.type !== "SINGLE_CHOICE" && data.type !== "MULTIPLE_CHOICE") ||
      data.options.length > 1,
    {
      message:
        "Options must have more than 1 item for Single Choice or Multiple Choice",
      path: ["options"],
    }
  )
  .refine((data) => data.type !== "TRUE_FALSE" || data.options.length === 2, {
    message: "True/False must have exactly 2 options.",
    path: ["options"],
  })
  .refine((data) => data.type !== "ESSAY" || data.options.length === 1, {
    message: "Essay must only have 1 option.",
    path: ["options"],
  })
  .refine(
    (data) =>
      data.type === "ESSAY" ||
      data.options.some((opt) => opt.is_correct === true),
    {
      message: "At least one option must be marked as correct.",
      path: ["options"],
    }
  );

export type CreateFormHuaweiPayload = z.infer<typeof createFormHuaweiPayload>;
export type CreateHuaweiQuestionPayload = z.infer<
  typeof createHuaweiQuestionPayload
>;

export type QuestionHuaweiOption = z.infer<typeof optionSchema>;
