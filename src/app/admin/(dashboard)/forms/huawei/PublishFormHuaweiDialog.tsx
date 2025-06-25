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

  const form = useForm({
    resolver: zodResolver(publishFormPayload),
    defaultValues: {
      essay_question: undefined,
      is_published: true,
      multiple_choise_question: undefined,
      single_choise_question: undefined,
      true_false_question: undefined,
    },
  });

  const { mutate: PublishForm, isPending } = useMutation<
    FormHuawei,
    Error,
    PublishFormBody
  >({
    mutationFn: async (payload: PublishFormBody) => {
      const res = await api.post("/role", payload);
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Publish Form Huawei
          </DialogTitle>
          <DialogDescription>
            This is for count the number of questions in the form.s
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => PublishForm(data))}
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
                      <Input placeholder="10" {...field} />
                    </FormControl>
                    <span className="text-xs text-gray-300">
                      Max Essay Questions are {data?.essay_count}
                    </span>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="single_choise_question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Single Choice</FormLabel>
                    <FormControl>
                      <Input placeholder="5" {...field} />
                    </FormControl>
                    <FormMessage />
                    <span className="text-xs text-gray-300">
                      Max Single Choice Questions are{" "}
                      {data?.single_choice_count}
                    </span>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="multiple_choise_question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Menus</FormLabel>
                    <FormControl>
                      <Input placeholder="5" {...field} />
                    </FormControl>
                    <span className="text-xs text-gray-300">
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
                    <FormLabel>Menus</FormLabel>
                    <FormControl>
                      <Input placeholder="5" {...field} />
                    </FormControl>
                    <span className="text-xs text-gray-300">
                      Max True False Questions are {data?.true_false_count}
                    </span>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="text-white">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Creating..." : "Create Role"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PublishFormHuaweiDialog;
