"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import api from "@/lib/api";
import { errorHandler } from "@/lib/handler/errorHandler";
import {
  CreateFormHuaweiPayload,
  createFormHuaweiPayload,
} from "@/lib/schema/FormHuaweiSchema";
import { toast } from "sonner";
import { GetFormHuaweiResponse } from "./page";
import { useRouter } from "next/navigation";

const CreateDialog = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<CreateFormHuaweiPayload>({
    resolver: zodResolver(createFormHuaweiPayload),
    defaultValues: {
      form_title: "",
      form_description: "",
    },
  });

  const { mutate: createFormHuawei, isPending } = useMutation<
    GetFormHuaweiResponse,
    Error,
    CreateFormHuaweiPayload
  >({
    mutationFn: async (data: CreateFormHuaweiPayload) => {
      const res = await api.post("/form-huawei", data);
      return res.data as GetFormHuaweiResponse;
    },
    onError: (err) => {
      errorHandler(err);
    },
    onSuccess: async () => {
      setOpen(false);
      form.reset();
      await queryClient.invalidateQueries({ queryKey: ["formHuawei"] });
      router.refresh();
      toast.success("Add Form Successfully!");
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="text-white">
          <Plus className="mr-2 h-4 w-4" />
          Create New Form
        </Button>
      </DialogTrigger>

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
            onSubmit={form.handleSubmit((data) => createFormHuawei(data))}
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
                onClick={() => setOpen(false)}
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

export default CreateDialog;
