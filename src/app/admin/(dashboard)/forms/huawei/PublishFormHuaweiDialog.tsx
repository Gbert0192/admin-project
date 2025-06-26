"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { errorHandler } from "@/lib/handler/errorHandler";
import {
  PublishFormBody,
  publishFormPayload,
} from "@/lib/schema/FormHuaweiSchema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormHuawei } from "./page";
import { cn } from "@/lib/utils";
import { AlertWrapper } from "@/components/alert-wrapper/alert-wrapper";
import { useRef } from "react";

interface PublishFormHuaweiDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: FormHuawei | null;
}

const PublishFormHuaweiDialog: React.FC<PublishFormHuaweiDialogProps> = ({
  data,
  isOpen,
  setIsOpen,
}) => {
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm({
    resolver: zodResolver(publishFormPayload),
    defaultValues: {
      essay_question: "",
      is_published: true,
      multiple_choice_question: "",
      single_choice_question: "",
      true_false_question: "",
    },
  });

  const onSubmit = (payload: PublishFormBody) => {
    PublishForm(payload);
  };

  const { mutate: PublishForm, isPending } = useMutation<
    FormHuawei,
    Error,
    PublishFormBody
  >({
    mutationFn: async (payload: PublishFormBody) => {
      const filteredPayload = {
        ...payload,
        uuid: data?.uuid,
      };
      const res = await api.post("/form-huawei/publish", filteredPayload);
      return res.data as FormHuawei;
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
            Publish Form Huawei
          </DialogTitle>
          <DialogDescription>
            This is for count the number of questions in the form.
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
                name="essay_question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Essay Questions</FormLabel>
                    <FormControl>
                      <InputWithOutNumber field={field} placeholder="5" />
                    </FormControl>
                    <span
                      className={cn(
                        Number(form.watch("essay_question")) >
                          (data?.essay_count ?? 0)
                          ? "text-xs text-red-500"
                          : "text-xs text-gray-300"
                      )}
                    >
                      Max Essay Questions are {data?.essay_count ?? 0}
                    </span>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="single_choice_question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Single Choice</FormLabel>
                    <FormControl>
                      <InputWithOutNumber field={field} placeholder="5" />
                    </FormControl>
                    <FormMessage />
                    <span
                      className={cn(
                        Number(form.watch("single_choice_question")) >
                          (data?.single_choice_count ?? 0)
                          ? "text-xs text-red-500"
                          : "text-xs text-gray-300"
                      )}
                    >
                      Max Single Choice Questions are{" "}
                      {data?.single_choice_count}
                    </span>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="multiple_choice_question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Multiple Choice Question</FormLabel>
                    <FormControl>
                      <InputWithOutNumber field={field} placeholder="5" />
                    </FormControl>
                    <span
                      className={cn(
                        Number(form.watch("multiple_choice_question")) >
                          (data?.multiple_choice_count ?? 0)
                          ? "text-xs text-red-500"
                          : "text-xs text-gray-300"
                      )}
                    >
                      Max Multiples Choice Questions are{" "}
                      {data?.multiple_choice_count}
                    </span>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="true_false_question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>True False Questions</FormLabel>
                    <FormControl>
                      <InputWithOutNumber field={field} placeholder="5" />
                    </FormControl>
                    <span
                      className={cn(
                        Number(form.watch("true_false_question")) >
                          (data?.true_false_count ?? 0)
                          ? "text-xs text-red-500"
                          : "text-xs text-gray-300"
                      )}
                    >
                      Max True False Questions are {data?.true_false_count ?? 0}
                    </span>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <AlertWrapper
                onAction={() => {
                  // This log confirms AlertWrapper's onAction fires
                  console.log(
                    "AlertWrapper confirmed. Attempting form submit."
                  );
                  formRef.current?.requestSubmit();
                }}
                title="Publish?"
                description="Setelah tindakan ini, form ini akan dipublikasikan dan Anda tidak dapat mengeditnya lagi."
                actionText="Publish"
                cancelText="Batal"
                actionClassName="bg-orange-500"
              >
                <Button
                  type="button"
                  className="text-white"
                  disabled={isPending}
                >
                  <span>
                    {isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isPending ? "Mempublikasikan..." : "Publikasikan?"}
                  </span>
                </Button>
              </AlertWrapper>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PublishFormHuaweiDialog;

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
