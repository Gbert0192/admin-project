"use client";

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
  updateUserSchema,
  UpdateUserSchemaType,
} from "@/lib/schema/UserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { UserAdmin } from "./page";

interface EditDialogUserProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: UserAdmin | null;
}

const EditDialog = ({ isOpen, setIsOpen, data }: EditDialogUserProps) => {
  const router = useRouter();

  const form = useForm<UpdateUserSchemaType>({
    resolver: zodResolver(updateUserSchema),

    defaultValues: {
      name: "",
      student_id: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        student_id: data.student_id,
      });
    }
  }, [data, form]);

  const { mutate: updateRole, isPending } = useMutation({
    mutationFn: async (payload: UpdateUserSchemaType) => {
      const filteredPayload = {
        uuid: data?.uuid,
        ...payload,
      };

      const res = await api.put<UserAdmin>(`/user/admin`, filteredPayload);
      return res.data;
    },
    onError: (err) => {
      errorHandler(err);
    },
    onSuccess: () => {
      toast.success("Role Updated successfully!");
      setIsOpen(false);
      router.refresh();
    },
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit User Admin
          </DialogTitle>
          <DialogDescription>
            Update the details for the selected user admin.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((payload) => updateRole(payload))}
            className="space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Admin Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jessica" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="student_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Admin ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 231110xxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} className="text-white">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
