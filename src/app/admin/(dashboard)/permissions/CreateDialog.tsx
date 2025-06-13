"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
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
import { CreatePermissionSchema } from "@/lib/schema/PermissionSchema";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import api from "@/lib/api";
import { errorHandler } from "@/lib/handler/errorHandler";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface CreatePermissionPayloadReturn {
  uuid: string;
  route: string;
  permission_name: string;
  created_at: string;
}

type CreatePermissionPayload = z.infer<typeof CreatePermissionSchema>;

const CreatePermissionDialog = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(CreatePermissionSchema),
    defaultValues: {
      permission_name: "",
      route: "/",
    },
  });

  const { mutate: createPermission, isPending } = useMutation<
    CreatePermissionPayloadReturn,
    Error,
    CreatePermissionPayload
  >({
    mutationFn: async (data: CreatePermissionPayload) => {
      const res = await api.post("/permission", data);
      return res.data as CreatePermissionPayloadReturn;
    },
    onError: (err) => {
      errorHandler(err);
    },
    onSuccess: () => {
      setOpen(false);
      form.reset();
      router.refresh();
      toast.success("Add Permission Successfully!");
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
        <Button className="bg-blue-500 text-white hover:bg-blue-600">
          Create New Route
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold">Create New Route</DialogTitle>
          <DialogDescription>
            Click Create to add a new route. You can edit the details later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            // onSubmit={form.handleSubmit((data) => createPermission(data))}
            className="space-y-6"
          >
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
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="text-white"
            onClick={form.handleSubmit((data) => createPermission(data))}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Creating..." : "Create Route"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePermissionDialog;
