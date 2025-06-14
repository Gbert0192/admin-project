"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { UpdatePermissionSchema } from "@/lib/schema/PermissionSchema";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import api from "@/lib/api";
import { errorHandler } from "@/lib/handler/errorHandler";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Permission } from "./page";

interface PermissionData {
  uuid: string;
  route: string;
  permission_name: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

interface EditDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: PermissionData | null;
}

type UpdatePermissionPayload = z.infer<typeof UpdatePermissionSchema>;

const EditPermissionDialog = ({ isOpen, setIsOpen, data }: EditDialogProps) => {
  const router = useRouter();

  const form = useForm<UpdatePermissionPayload>({
    resolver: zodResolver(UpdatePermissionSchema),
    defaultValues: {
      permission_name: "",
      route: "/",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        permission_name: data.permission_name,
        route: data.route,
      });
    }
  }, [data, form]);

  const { mutate: updatePermission, isPending } = useMutation({
    mutationFn: async (payload: UpdatePermissionPayload) => {
      const filteredPayload = { uuid: data?.uuid, ...payload };
      const res = await api.put<Permission>(
        `/permission/${data?.uuid}`,
        filteredPayload
      );
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold">Edit Route</DialogTitle>
          <DialogDescription>
            Update the details of the permission route.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="permission_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permission Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter permission name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="route"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Route</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter route name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button>Cancel</Button>
          <Button
            type="submit"
            className="text-white"
            disabled={isPending}
            onClick={form.handleSubmit((payload) => updatePermission(payload))}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPermissionDialog;
