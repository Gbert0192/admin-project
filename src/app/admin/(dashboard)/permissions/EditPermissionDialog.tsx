"use client";

import { MultiSelectForm } from "@/components/Select/multi-select-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
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
  UpdatePermissionSchema,
  UpdatePermissionSchemaType,
} from "@/lib/schema/PermissionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Permission } from "./page";
import { Switch } from "@/components/ui/switch";

interface EditDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: Permission | null;
}

const EditPermissionDialog = ({ isOpen, setIsOpen, data }: EditDialogProps) => {
  const router = useRouter();

  const form = useForm<UpdatePermissionSchemaType>({
    resolver: zodResolver(UpdatePermissionSchema),
    defaultValues: {
      permission_name: "",
      route: "/",
      method: [],
      is_menu: data?.is_menu,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        permission_name: data.permission_name,
        route: data.route,
        method: data.method,
        is_menu: data.is_menu,
      });
    }
  }, [data, form]);

  const { mutate: updatePermission, isPending } = useMutation({
    mutationFn: async (payload: UpdatePermissionSchemaType) => {
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
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="font-bold">Edit Route</DialogTitle>
          <DialogDescription>
            Update the details of the permission route.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="grid grid-cols-2 gap-4">
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

            <FormField
              control={form.control}
              name="is_menu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Route</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);

                          if (checked) {
                            form.setValue("method", []);
                          }
                        }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {field.value ? "Is Menu" : "Is Not Menu"}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!form.watch("is_menu") && (
              <FormField
                control={form.control}
                name="method"
                render={() => (
                  <FormItem>
                    <FormLabel>Method</FormLabel>
                    <FormControl>
                      <MultiSelectForm
                        placeholder="Select Method"
                        control={form.control}
                        formName="method"
                        valueKey="value"
                        labelKey="name"
                        options={[
                          {
                            name: "GET",
                            value: "GET",
                          },
                          {
                            name: "POST",
                            value: "POST",
                          },
                          {
                            name: "PUT",
                            value: "PUT",
                          },
                          {
                            name: "DELETE",
                            value: "DELETE",
                          },
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>

        <DialogFooter>
          <Button className="text-white">Cancel</Button>
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
