"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { errorHandler } from "@/lib/handler/errorHandler";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormKahoot } from "./page";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import {
  PublishFormKahootPayload,
  publishFormKahootPayload,
} from "@/lib/schema/FormKahootSchema";
import { Progress } from "@radix-ui/react-progress";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

interface PublishFormKahootDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: FormKahoot | null;
}

const PublishFormKahootDialog: React.FC<PublishFormKahootDialogProps> = ({
  data,
  isOpen,
  setIsOpen,
}) => {
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm({
    resolver: zodResolver(publishFormKahootPayload),
    defaultValues: {
      is_published: true,
      multiple_choice_question: "",
      single_choice_question: "",
      true_false_question: "",
      duration: 20,
    },
    mode: "onChange",
  });

  const onSubmit = (payload: PublishFormKahootPayload) => {
    PublishForm(payload);
  };

  const { mutate: PublishForm, isPending } = useMutation<
    FormKahoot,
    Error,
    PublishFormKahootPayload
  >({
    mutationFn: async (payload: PublishFormKahootPayload) => {
      const filteredPayload = {
        ...payload,
        uuid: data?.uuid,
      };
      const res = await api.post("/form-kahoot/publish", filteredPayload);
      return res.data as FormKahoot;
    },
    onError: (err) => {
      errorHandler(err);
    },
    onSuccess: () => {
      setIsOpen(false);
      form.reset();
      router.refresh();
      toast.success("Publish Successfully!");
    },
  });

  const onError = () => {
    toast.error("Please fill in all required fields correctly.");
  };

  const { isValid } = form.formState;

  const singleChoiceCount = Number(form.watch("single_choice_question"));
  const multipleChoiceCount = Number(form.watch("multiple_choice_question"));
  const trueFalseCount = Number(form.watch("true_false_question"));

  const isOverLimit =
    singleChoiceCount > (data?.single_choice_count ?? 0) ||
    multipleChoiceCount > (data?.multiple_choice_count ?? 0) ||
    trueFalseCount > (data?.true_false_count ?? 0);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(false);
        form.reset();
      }}
    >
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Publish Form Kahoot
          </DialogTitle>
          <DialogDescription>
            Configure the test by selecting the number of questions.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="single_choice_question"
                render={({ field }) => (
                  <FormItem>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Single Choice</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormControl>
                          <InputWithOutNumber field={field} placeholder="0" />
                        </FormControl>
                        <div className="space-y-2">
                          <Progress
                            value={Math.min(
                              (singleChoiceCount /
                                (data?.single_choice_count ?? 1)) *
                                100,
                              100
                            )}
                            className={cn(
                              singleChoiceCount >
                                (data?.single_choice_count ?? 0) &&
                                "[&>div]:bg-red-500"
                            )}
                          />
                          <p className="text-xs text-muted-foreground text-right">
                            {singleChoiceCount} /{" "}
                            {data?.single_choice_count ?? 0} Questions
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <FormMessage className="pl-2" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="multiple_choice_question"
                render={({ field }) => (
                  <FormItem>
                    <FormItem>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Multiple Choice
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <FormControl>
                            <InputWithOutNumber field={field} placeholder="0" />
                          </FormControl>
                          <div className="space-y-2">
                            <Progress
                              value={Math.min(
                                (multipleChoiceCount /
                                  (data?.multiple_choice_count ?? 1)) *
                                  100,
                                100
                              )}
                              className={cn(
                                multipleChoiceCount >
                                  (data?.multiple_choice_count ?? 0) &&
                                  "[&>div]:bg-red-500"
                              )}
                            />
                            <p className="text-xs text-muted-foreground text-right">
                              {multipleChoiceCount} /{" "}
                              {data?.multiple_choice_count ?? 0} Questions
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      <FormMessage className="pl-2" />
                    </FormItem>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="true_false_question"
                render={({ field }) => (
                  <FormItem>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">True/False</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormControl>
                          <InputWithOutNumber field={field} placeholder="0" />
                        </FormControl>
                        <div className="space-y-2">
                          <Progress
                            value={Math.min(
                              (trueFalseCount / (data?.true_false_count ?? 1)) *
                                100,
                              100
                            )}
                            className={cn(
                              trueFalseCount > (data?.true_false_count ?? 0) &&
                                "[&>div]:bg-red-500"
                            )}
                          />
                          <p className="text-xs text-muted-foreground text-right">
                            {trueFalseCount} / {data?.true_false_count ?? 0}{" "}
                            Questions
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <FormMessage className="pl-2" />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-2">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <label className="font-medium">Durations (minute)</label>
                    <FormControl className="mt-2">
                      <InputWithOutNumber
                        field={{
                          ...field,
                          value: field.value.toString(),
                          onChange: (value: string) =>
                            field.onChange(parseInt(value) || 0),
                        }}
                        placeholder="e.g., 60"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="text-white"
                disabled={!isValid || isPending || isOverLimit}
              >
                <span>{isPending ? "Publishing..." : "Publish"}</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PublishFormKahootDialog;

interface InputWithOutNumberProps {
  placeholder: string;
  field: {
    value: string;
    onChange: (value: string) => void;
    [key: string]: unknown;
  };
}

const InputWithOutNumber = ({
  placeholder,
  field,
}: InputWithOutNumberProps) => {
  const { onChange, ...restField } = field;
  return (
    <Input
      type="text"
      placeholder={placeholder}
      onChange={(e) => {
        const onlyNums = e.target.value.replace(/\D/g, "");
        onChange(onlyNums);
      }}
      {...restField}
    />
  );
};
