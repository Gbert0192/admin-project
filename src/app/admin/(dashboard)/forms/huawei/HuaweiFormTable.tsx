"use client";
import { DataTable } from "@/components/data-table/data-table";
import { DeleteWrapper } from "@/components/delete-wrapper/delete-wrapper";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { errorHandler } from "@/lib/handler/errorHandler";
import { checkPermission } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";
import { FormHuawei, FormHuaweiData } from "./page";
import { ISessionPermission } from "@/app/types/next.auth";

interface FormsHuaweiProps {
  searchParams: Record<string, string | undefined>;
  data: FormHuaweiData;
  accessPermission: ISessionPermission[];
}

const FormHuaweiTable: React.FC<FormsHuaweiProps> = ({
  data,
  accessPermission,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: deleteRole, isPending } = useMutation({
    mutationFn: async (uuid: string) => {
      await api.delete(`/role/${uuid}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["permissions"] });
      toast.success("Role deleted successfully.");
      router.refresh();
    },
    onError: (error) => {
      errorHandler(error);
      toast.error("Failed to delete role.");
    },
  });
  const columns = useMemo<ColumnDef<FormHuawei>[]>(
    () => [
      {
        accessorKey: "index",
        header: "No",
        cell: ({ row }) => {
          return <div>{row.index + 1}</div>;
        },
      },
      {
        accessorKey: "form_title",
        header: "Form Title",
      },
      {
        accessorKey: "form_description",
        header: "Form Description",
      },
      {
        header: "Actions",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <Button
                variant={"default"}
                size={"icon"}
                onClick={() => {
                  //   setEditDialog({ data: row.original, isOpen: true });
                }}
              >
                <Pen className="h-4 w-4 text-white" />
              </Button>
              <Button
                variant={"warning"}
                size={"icon"}
                onClick={() => {
                  //   setDetailDialog({ data: row.original, isOpen: true });
                }}
              >
                <Eye className="h-4 w-4 text-white" />
              </Button>
              <DeleteWrapper
                onConfirm={() => deleteRole(row.original.uuid)}
                isPending={isPending}
              >
                <Button variant={"destructive"} size={"icon"}>
                  <Trash2 className="h-4 w-4 text-white" />
                </Button>
              </DeleteWrapper>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={data.data ?? []}
        pageCount={data?.totalPages ?? 0}
        filterColumnId="role_name"
        filterPlaceholder="Role Name"
        tableActionsButton={
          checkPermission(accessPermission, "/role", "POST") && <CreateDialog />
        }
      />
    </>
  );
};
export default FormHuaweiTable;
