"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
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
  CreateFormHuaweiPayload,
  createFormHuaweiPayload,
} from "@/lib/schema/FormHuaweiSchema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormHuawei, GetFormHuaweiResponse } from "./page";

interface EditFormHuaweiDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: FormHuawei | null;
}

const EditDialog: React.FC<EditFormHuaweiDialogProps> = ({
  data,
  isOpen,
  setIsOpen,
}) => {
  const router = useRouter();
  const form = useForm<CreateFormHuaweiPayload>({
    resolver: zodResolver(createFormHuaweiPayload),
    defaultValues: {
      form_title: "",
      form_description: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        form_title: data.form_title,
        form_description: data.form_description,
      });
    }
  }, [data, form]);

  const { mutate: editFormHuawei, isPending } = useMutation<
    GetFormHuaweiResponse,
    Error,
    CreateFormHuaweiPayload
  >({
    mutationFn: async (payload: CreateFormHuaweiPayload) => {
      const filteredPayload = {
        uuid: data?.uuid,
        ...payload,
      };
      const res = await api.put("/form-huawei", filteredPayload);
      return res.data as GetFormHuaweiResponse;
    },
    onError: (err) => {
      errorHandler(err);
    },
    onSuccess: () => {
      toast.success("Form Updated successfully!");
      setIsOpen(false);
      router.refresh();
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Form
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new user Form.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((payload) => editFormHuawei(payload))}
            className="space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="form_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Form Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Mock Test 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="form_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Form Description</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., First Mock Test" {...field} />
                    </FormControl>
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
                {isPending ? "Creating..." : "Create Form"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
