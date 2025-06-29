import { z } from "zod";

export const createFormKahootPayload = z.object({
  form_title: z.string().min(1, { message: "Form Title is required." }),
  form_description: z
    .string()
    .min(1, { message: "Form Description is required." }),
  // is_published: z.boolean().default(false),
  duration: z.number().min(5),
});

const optionKahootSchema = z.object({
  option_text: z.string().min(1, { message: "Option text is required." }),
  is_correct: z.boolean(),
});

export const createKahootQuestionPayload = z
  .object({
    question_type: z.enum(["single_choice", "multiple_choice", "true_false"]),
    question_text: z.string().min(1, { message: "Question is required." }),
    options: z.array(optionKahootSchema),
  })
  .refine(
    (data) =>
      (data.question_type !== "single_choice" &&
        data.question_type !== "multiple_choice") ||
      data.options.length > 1,
    {
      message:
        "Options must have more than 1 item for Single Choice or Multiple Choice",
      path: ["options"],
    }
  )
  .refine(
    (data) => data.question_type !== "true_false" || data.options.length === 2,
    {
      message: "True/False must have exactly 2 options.",
      path: ["options"],
    }
  )
  .refine(
    (data) => {
      if (data.question_type === "multiple_choice") {
        const correctOptions = data.options.filter(
          (option) => option.is_correct
        ).length;
        return correctOptions >= 2;
      }
      return true;
    },
    {
      message:
        "Multiple Choice questions must have at least 2 correct answers.",
      path: ["options"],
    }
  );

export const publishFormKahootPayload = z.object({
  is_published: z.boolean().default(true).optional(),
  multiple_choice_question: z.string(),
  single_choice_question: z.string(),
  true_false_question: z.string(),
  duration: z.number().min(5).max(120),
});

export type CreateFormKahootPayload = z.infer<typeof createFormKahootPayload>;
export type CreateKahootQuestionPayload = z.infer<
  typeof createKahootQuestionPayload
>;

export type QuestionKahootSchema = z.infer<typeof optionKahootSchema>;

export type PublishFormKahootPayload = z.infer<typeof publishFormKahootPayload>;
