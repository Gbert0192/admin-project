"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MultiSelectForm } from "@/components/Select/multi-select-form";
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
import { createRoleSchema } from "@/lib/schema/RoleSchema";
import { toast } from "sonner";
import { errorHandler } from "@/lib/handler/errorHandler";
import { useRouter } from "next/navigation";

interface Permission {
  uuid: string;
  route: string;
  permission_name: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

interface CreateRolePayloadReturn {
  uuid: string;
  role_name: string;
  permission_id: number[];
  created_at: string;
}

type CreateRolePayload = z.infer<typeof createRoleSchema>;

const CreateRoleDialog = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<CreateRolePayload>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      role_name: "",
      permissions: [],
    },
  });

  const { data: permissions, isLoading: isLoadingPermissions } = useQuery({
    queryKey: ["permissions"],
    queryFn: async () => {
      const { data } = await api.get<{ data: Permission[] }>("/permission");
      return data.data;
    },
  });

  const { mutate: createRole, isPending } = useMutation<
    CreateRolePayloadReturn,
    Error,
    CreateRolePayload
  >({
    mutationFn: async (data: CreateRolePayload) => {
      const res = await api.post("/role", data);
      return res.data as CreateRolePayloadReturn;
    },
    onError: (err) => {
      errorHandler(err);
    },
    onSuccess: () => {
      setOpen(false);
      form.reset();
      router.refresh();
      toast.success("Add Role Successfully!");
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
          Create New Role
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Role
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new user role.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => createRole(data))}
            className="space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="role_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Administrator" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="permissions"
                render={() => (
                  <FormItem>
                    <FormLabel>Permissions</FormLabel>
                    <FormControl>
                      <MultiSelectForm
                        placeholder="Select permissions"
                        control={form.control}
                        formName="permissions"
                        valueKey="uuid"
                        labelKey="permission_name"
                        options={permissions ?? []}
                      />
                    </FormControl>
                    {isLoadingPermissions && (
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading permissions...
                      </p>
                    )}
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
                {isPending ? "Creating..." : "Create Role"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoleDialog;
