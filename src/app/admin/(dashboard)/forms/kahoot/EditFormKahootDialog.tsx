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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormKahoot, GetFormKahootResponse } from "./page";
import {
  createFormKahootPayload,
  CreateFormKahootPayload,
} from "@/lib/schema/FormKahootSchema";

interface EditFormKahootDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: FormKahoot | null;
}

const EditFormKahootDialog: React.FC<EditFormKahootDialogProps> = ({
  isOpen,
  setIsOpen,
  data,
}) => {
  const router = useRouter();

  const form = useForm<CreateFormKahootPayload>({
    resolver: zodResolver(createFormKahootPayload),
    defaultValues: {
      form_title: "",
      form_description: "",
      duration: 20,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        form_title: data.form_title,
        form_description: data.form_description,
        duration: data.duration,
      });
    }
  }, [data, form]);

  const { mutate: editFormKahoot, isPending } = useMutation<
    GetFormKahootResponse,
    Error,
    CreateFormKahootPayload
  >({
    mutationFn: async (payload: CreateFormKahootPayload) => {
      const filteredPayload = {
        uuid: data?.uuid,
        ...payload,
      };
      const res = await api.put("/form-kahoot", filteredPayload);
      return res.data as GetFormKahootResponse;
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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold">Edit Form Kahoot</DialogTitle>
          <DialogDescription>Update the form details below.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((payload) => editFormKahoot(payload))}
            className="space-y-6"
          >
            <div>
              <FormField
                control={form.control}
                name="form_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Form Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter form title" {...field} />
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
                      <Input placeholder="e.g., First Quick Test" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (seconds) </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={5}
                        max={120}
                        placeholder="e.g., 20"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
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
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Updating..." : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditFormKahootDialog;
