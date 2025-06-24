"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import RadioCardsDemo from "@/components/radio-button-comp/radio-button-modified";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import { errorHandler } from "@/lib/handler/errorHandler";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { QuestionKahoot } from "./page";
import {
  createKahootQuestionPayload,
  CreateKahootQuestionPayload,
} from "@/lib/schema/FormKahootSchema";

const CreateQuestionKahoot = ({ uuid }: { uuid: string }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<CreateKahootQuestionPayload>({
    resolver: zodResolver(createKahootQuestionPayload),
    defaultValues: {
      question_text: "",
      question_type: "single_choice",
      options: [{ option_text: "", is_correct: false }],
    },
  });

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const questionType = form.watch("question_type");

  const { mutate: createFormQuestionKahoot, isPending } = useMutation<
    QuestionKahoot,
    Error,
    CreateKahootQuestionPayload
  >({
    mutationFn: async (data: CreateKahootQuestionPayload) => {
      const res = await api.post(`/form-kahoot/question/${uuid}`, data);
      return res.data as QuestionKahoot;
    },
    onError: (err) => {
      errorHandler(err);
    },
    onSuccess: async () => {
      setOpen(false);
      form.reset({
        question_text: "",
        question_type: "single_choice",
        options: [{ option_text: "", is_correct: false }],
      });
      await queryClient.invalidateQueries({ queryKey: ["formKahoot"] });
      router.refresh();
      toast.success("Add Form Successfully!");
    },
  });

  const questionTypes = [
    { value: "single_choice", label: "Single Choice" },
    { value: "multiple_choice", label: "Multiple Choice" },
    { value: "true_false", label: "True/False" },
  ];

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "question_type" && value.question_type) {
        const currentType = value.question_type;
        if (
          currentType === "single_choice" ||
          currentType === "multiple_choice"
        ) {
          form.setValue("options", [{ option_text: "", is_correct: false }]);
        } else if (currentType === "true_false") {
          form.setValue("options", [
            { option_text: "True", is_correct: false },
            { option_text: "False", is_correct: false },
          ]);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const renderOptionsField = () => {
    if (
      questionType === "single_choice" ||
      questionType === "multiple_choice"
    ) {
      return (
        <div>
          <FormLabel>Options</FormLabel>
          <div className="space-y-4 mt-2">
            {optionFields.map((item: { id: string }, index) => (
              <div key={item.id} className="flex items-center space-x-3">
                <FormField
                  control={form.control}
                  name={`options.${index}.option_text`}
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input placeholder={`Option ${index + 1}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`options.${index}.is_correct`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0 rounded-md border p-3">
                      <FormControl>
                        {questionType === "single_choice" ? (
                          <input
                            type="radio"
                            checked={field.value}
                            onChange={() => {
                              optionFields.forEach((_, i) => {
                                if (i === index) {
                                  form.setValue(
                                    `options.${i}.is_correct`,
                                    true,
                                    { shouldValidate: true }
                                  );
                                } else {
                                  form.setValue(
                                    `options.${i}.is_correct`,
                                    false,
                                    { shouldValidate: true }
                                  );
                                }
                              });
                            }}
                          />
                        ) : (
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      </FormControl>
                      <div className="flex items-center justify-center">
                        <FormLabel>Correct</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                {optionFields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(index)}
                    aria-label={`Remove Option ${index + 1}`}
                  >
                    <XCircle className="h-5 w-5 text-red-500" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={() => appendOption({ option_text: "", is_correct: false })}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Option
          </Button>
          {form.formState.errors.options?.root?.message && (
            <p className="text-sm font-medium text-destructive mt-2">
              {form.formState.errors.options.root.message}
            </p>
          )}
        </div>
      );
    }

    if (questionType === "true_false") {
      return (
        <div>
          <FormLabel>True/False Options</FormLabel>
          <div className="space-y-4 mt-2">
            <FormField
              control={form.control}
              name="options.0.is_correct"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0 rounded-md border p-3">
                  <FormControl>
                    <input
                      type="radio"
                      checked={field.value}
                      onChange={() => {
                        form.setValue("options.0.is_correct", true, {
                          shouldValidate: true,
                        });
                        form.setValue("options.1.is_correct", false, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </FormControl>
                  <div className="leading-none">
                    <FormLabel>True is correct</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="options.1.is_correct"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0 rounded-md border p-3">
                  <FormControl>
                    <input
                      type="radio"
                      checked={field.value}
                      onChange={() => {
                        form.setValue("options.0.is_correct", false, {
                          shouldValidate: true,
                        });
                        form.setValue("options.1.is_correct", true, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </FormControl>
                  <div className="leading-none">
                    <FormLabel>False is correct</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
          {form.formState.errors.options?.root?.message && (
            <p className="text-sm font-medium text-destructive mt-2">
              {form.formState.errors.options.root.message}
            </p>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpenState) => {
        setOpen(newOpenState);
        if (!newOpenState) {
          form.reset({
            question_text: "",
            question_type: "single_choice",
            options: [{ option_text: "", is_correct: false }],
          } as CreateKahootQuestionPayload);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="text-white">
          <Plus className="mr-2 h-4 w-4" />
          Create New Questions
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[70dvw] flex flex-col max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Form Questions
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new form questions.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-4 -mx-4 -mt-4">
          {" "}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) =>
                createFormQuestionKahoot(data)
              )}
              className="space-y-6"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="question_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Questions Type</FormLabel>
                      <FormControl>
                        <RadioCardsDemo
                          options={questionTypes}
                          defaultValue="single_choice"
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="question_text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your question"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {renderOptionsField()}
              </div>

              <DialogFooter className="pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="m-2"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="text-white m-2"
                  disabled={isPending}
                >
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isPending ? "Creating..." : "Create Question"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuestionKahoot;
