"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { MultiSelectForm } from "@/components/Select/multi-select-form";
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
  UpdateRolePermissionPayload,
  updateRolePermissionPayloadSchema,
} from "@/lib/schema/RoleSchema";
import { GetPermissionsResponse, Permission, Role } from "./page";

interface RoleData {
  uuid: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  permissions: Permission[];
  role_name: string;
}

interface EditDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: RoleData | null;
}

const EditDialog = ({ isOpen, setIsOpen, data }: EditDialogProps) => {
  const router = useRouter();

  const form = useForm<UpdateRolePermissionPayload>({
    resolver: zodResolver(updateRolePermissionPayloadSchema),

    defaultValues: {
      role_name: "",
      permissions: [],
      menus: [],
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        role_name: data.role_name,
        permissions: data.permissions
          .filter((p) => !p.is_menu)
          .map((p) => p.uuid),
        menus: data.permissions.filter((p) => p.is_menu).map((p) => p.uuid),
      });
    }
  }, [data, form]);

  const { data: permissions } = useQuery({
    queryKey: ["permissions"],
    queryFn: async () => {
      const { data: res } = await api.get<{ data: GetPermissionsResponse[] }>(
        "/permission/no-menu"
      );
      return res.data;
    },
  });

  const { data: permissionsMenu } = useQuery({
    queryKey: ["permissionsMenu"],
    queryFn: async () => {
      const { data: res } = await api.get<{ data: GetPermissionsResponse[] }>(
        "/permission/menu"
      );
      return res.data;
    },
  });

  const { mutate: updateRole, isPending } = useMutation({
    mutationFn: async (payload: UpdateRolePermissionPayload) => {
      const filteredPayload = {
        uuid: data?.uuid,
        ...payload,
        permissions: [...payload?.permissions, ...payload.menus],
      };

      const res = await api.put<Role>(`/role`, filteredPayload);
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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] ">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Role</DialogTitle>
          <DialogDescription>
            Update the details for the selected role below.
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

              <MultiSelectForm
                placeholder="Select permissions"
                control={form.control}
                formName="permissions"
                valueKey="uuid"
                labelKey="permission_name"
                options={permissions ?? []}
              />

              <MultiSelectForm
                placeholder="Select permissions"
                control={form.control}
                formName="menus"
                valueKey="uuid"
                labelKey="permission_name"
                options={permissionsMenu ?? []}
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
