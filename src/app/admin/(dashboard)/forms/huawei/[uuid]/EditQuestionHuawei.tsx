"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pen, XCircle } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

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
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import { errorHandler } from "@/lib/handler/errorHandler";
import {
  createHuaweiQuestionPayload,
  CreateHuaweiQuestionPayload,
} from "@/lib/schema/FormHuaweiSchema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { QuestionHuawei } from "./page";

interface EditFormHuaweiQuestionDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: QuestionHuawei | null;
  uuid: string;
}

const EditDialog = ({
  data,
  setIsOpen,
  isOpen,
  uuid,
}: EditFormHuaweiQuestionDialogProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<CreateHuaweiQuestionPayload>({
    resolver: zodResolver(createHuaweiQuestionPayload),
    defaultValues: {
      question: "",
      type: "SINGLE_CHOICE",
      point: 0,
      difficulty: "EASY",
      options: [],
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

  const questionType = form.watch("type");

  const { mutate: updateFormQuestionHuawei, isPending } = useMutation<
    QuestionHuawei,
    Error,
    CreateHuaweiQuestionPayload
  >({
    mutationFn: async (payload: CreateHuaweiQuestionPayload) => {
      const filterPayload = {
        ...payload,
        uuid: data?.uuid,
        formUuid: uuid,
      };
      const res = await api.put(`/form-huawei/question`, filterPayload);
      return res.data as QuestionHuawei;
    },
    onError: (err) => {
      errorHandler(err);
    },
    onSuccess: async () => {
      setIsOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["formHuawei"] });
      router.refresh();
      toast.success("Question updated successfully!");
    },
  });

  const questionTypes = [
    { value: "SINGLE_CHOICE", label: "Single Choice" },
    { value: "MULTIPLE_CHOICE", label: "Multiple Choice" },
    { value: "TRUE_FALSE", label: "True/False" },
    { value: "ESSAY", label: "Essay" },
  ];

  const difficultyLevels = [
    { value: "EASY", label: "Easy" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HOT", label: "HOT(High Order Thinking)" },
  ];

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "type" && value.type) {
        const currentType = value.type;
        if (
          currentType === "SINGLE_CHOICE" ||
          currentType === "MULTIPLE_CHOICE"
        ) {
          form.setValue("options", [{ option_text: "", is_correct: false }]);
        } else if (currentType === "TRUE_FALSE") {
          form.setValue("options", [
            { option_text: "True", is_correct: false },
            { option_text: "False", is_correct: false },
          ]);
        } else if (currentType === "ESSAY") {
          form.setValue("options", [{ option_text: "", is_correct: true }]);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    if (data) {
      form.reset({
        difficulty: data.difficulty,
        point: data.point,
        question: data.question,
        type: data.type,
        options: data.options.map((option) => ({
          option_text: option.option_text ?? "",
          is_correct: option.is_correct ?? false,
        })),
      });
    }
  }, [data, form]);

  const renderOptionsField = () => {
    if (
      questionType === "SINGLE_CHOICE" ||
      questionType === "MULTIPLE_CHOICE"
    ) {
      return (
        <div>
          <FormLabel>Options</FormLabel>
          <div className="space-y-4 mt-2">
            {optionFields.map((item, index) => (
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
                        {questionType === "SINGLE_CHOICE" ? (
                          <input
                            type="radio"
                            checked={field.value}
                            onChange={() => {
                              optionFields.forEach((_, i: number) => {
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
                            className="text-white font-semibold"
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
            <Pen className="mr-2 h-4 w-4" /> Add Option
          </Button>
          {form.formState.errors.options && (
            <p className="text-sm font-medium text-destructive mt-2">
              {typeof form.formState.errors.options.message === "string"
                ? form.formState.errors.options.message
                : "Invalid options"}
            </p>
          )}
        </div>
      );
    }

    if (questionType === "TRUE_FALSE") {
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

    if (questionType === "ESSAY") {
      return (
        <>
          <FormField
            control={form.control}
            name="options.0.option_text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expected Answer</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the expected answer for this essay question"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    }

    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:min-w-[65rem] sm:min-h-[50dvh] rounded-xl overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Form Question
          </DialogTitle>
          <DialogDescription>
            Update the details below to modify the form question.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((payload) =>
              updateFormQuestionHuawei(payload)
            )}
            className="space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Questions Type</FormLabel>
                    <FormControl>
                      <RadioCardsDemo
                        options={questionTypes}
                        defaultValue={field.value}
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
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <FormControl>
                      <RadioCardsDemo
                        options={difficultyLevels}
                        defaultValue={field.value}
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
                name="point"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Point: {field.value}</FormLabel>
                    <FormControl>
                      <Slider
                        className="max-w-[60%] bg-gray-200 rounded-xl"
                        min={1}
                        max={100}
                        step={1}
                        value={[field.value]}
                        onValueChange={(val) => field.onChange(val[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your question" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {renderOptionsField()}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="m-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="text-white m-2"
                disabled={isPending}
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Updating..." : "Update Question"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
