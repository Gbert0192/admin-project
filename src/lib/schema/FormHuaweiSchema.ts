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
  .superRefine((data, ctx) => {
    const correctOptionsCount = data.options.filter(
      (opt) => opt.is_correct
    ).length;

    switch (data.type) {
      case "SINGLE_CHOICE":
        if (data.options.length < 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Single Choice questions must have at least 2 options.",
            path: ["options"],
          });
        }
        if (correctOptionsCount !== 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "Single Choice questions must have exactly one correct answer.",
            path: ["options"],
          });
        }
        break;

      case "MULTIPLE_CHOICE":
        if (data.options.length < 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Multiple Choice questions must have at least 2 options.",
            path: ["options"],
          });
        }
        if (correctOptionsCount < 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "Multiple Choice questions must have at least 2 correct answers.",
            path: ["options"],
          });
        }
        break;

      case "TRUE_FALSE":
        if (data.options.length !== 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "True/False questions must have exactly 2 options.",
            path: ["options"],
          });
        }
        if (correctOptionsCount !== 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "True/False questions must have exactly one correct answer.",
            path: ["options"],
          });
        }
        break;

      case "ESSAY":
        if (data.options.length !== 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Essay questions must have exactly one option.",
            path: ["options"],
          });
        }
        break;
    }

    if (data.type === "SINGLE_CHOICE" || data.type === "MULTIPLE_CHOICE") {
      const optionTexts = data.options.map((opt) => opt.option_text);
      const uniqueOptionTexts = new Set(optionTexts);
      if (uniqueOptionTexts.size !== optionTexts.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Options must not have duplicate text.",
          path: ["options"],
        });
      }
    }
  });

export const publishFormPayload = z.object({
  is_published: z.boolean().default(true).optional(),
  essay_question: z.string().min(1, { message: "Essay Question is required." }),
  multiple_choice_question: z
    .string()
    .min(1, { message: "Multiple Choice Question is required." }),
  single_choice_question: z.string().min(1, {
    message: "Single Choice Question is required.",
  }),
  true_false_question: z
    .string()
    .min(1, { message: "True/False Question is required." }),
  durations: z.string(),
  trial_limit: z.string().min(1, { message: "Trial Limit is required." }),
});

export type PublishFormBody = z.infer<typeof publishFormPayload>;
export type CreateFormHuaweiPayload = z.infer<typeof createFormHuaweiPayload>;
export type CreateHuaweiQuestionPayload = z.infer<
  typeof createHuaweiQuestionPayload
>;

export type QuestionHuaweiOption = z.infer<typeof optionSchema>;
