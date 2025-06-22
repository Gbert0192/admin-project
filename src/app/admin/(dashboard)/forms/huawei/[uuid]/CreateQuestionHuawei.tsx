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

const CreateDialog = ({ uuid }: { uuid: string }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<CreateHuaweiQuestionPayload>({
    resolver: zodResolver(createHuaweiQuestionPayload),
    defaultValues: {
      question: "",
      type: "SINGLE_CHOICE",
      point: 1,
      difficulty: "EASY",
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

  const questionType = form.watch("type");

  const { mutate: createFormQuestionHuawei, isPending } = useMutation<
    QuestionHuawei,
    Error,
    CreateHuaweiQuestionPayload
  >({
    mutationFn: async (data: CreateHuaweiQuestionPayload) => {
      const res = await api.post(`/form-huawei/question/${uuid}`, data);
      return res.data as QuestionHuawei;
    },
    onError: (err) => {
      errorHandler(err);
    },
    onSuccess: async () => {
      setOpen(false);
      form.reset({
        question: "",
        type: "SINGLE_CHOICE",
        point: 1,
        difficulty: "EASY",
        options: [{ option_text: "", is_correct: false }],
      });
      await queryClient.invalidateQueries({ queryKey: ["formHuawei"] });
      router.refresh();
      toast.success("Add Form Successfully!");
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
            { text: "True", is_correct: false },
            { text: "False", is_correct: false },
          ]);
        } else if (currentType === "ESSAY") {
          form.setValue("options", [{ option_text: "", is_correct: true }]);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const renderOptionsField = () => {
    if (
      questionType === "SINGLE_CHOICE" ||
      questionType === "MULTIPLE_CHOICE"
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
                        {questionType === "SINGLE_CHOICE" ? (
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
    <Dialog
      open={open}
      onOpenChange={(newOpenState) => {
        setOpen(newOpenState);
        if (!newOpenState) {
          form.reset({
            question: "",
            type: "SINGLE_CHOICE",
            point: 1,
            difficulty: "EASY",
            options: [{ option_text: "", is_correct: false }],
          } as CreateHuaweiQuestionPayload);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="text-white">
          <Plus className="mr-2 h-4 w-4" />
          Create New Questions
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:min-w-[65rem] sm:min-h-[50dvh] rounded-xl overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Form Questions
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new form questions.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              createFormQuestionHuawei(data)
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
                        defaultValue="SINGLE_CHOICE"
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
                        defaultValue="EASY"
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
                render={({ field: { value, onChange, ...restField } }) => (
                  <FormItem>
                    <FormLabel>Point: {value}</FormLabel>
                    <FormControl>
                      <Slider
                        className="max-w-[60%] bg-gray-200 rounded-xl"
                        min={1}
                        max={100}
                        step={1}
                        value={[value]}
                        onValueChange={(val) => onChange(val[0])}
                        {...restField}
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
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Creating..." : "Create Question"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
