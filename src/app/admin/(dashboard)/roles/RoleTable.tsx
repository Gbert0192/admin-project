"use client";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pen, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Role, RoleData } from "./page";
import CreateDialog from "./CreateRoleDialog";
import EditDialog from "./EditRoleDialog";
import { DeleteWrapper } from "@/components/delete-wrapper/delete-wrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import { errorHandler } from "@/lib/handler/errorHandler";
import { useRouter } from "next/navigation";
import DetailDialog from "./DetailRoleDialog";
interface RolesProps {
  searchParams: Record<string, string | undefined>;
  data: RoleData;
}

const RoleTable: React.FC<RolesProps> = ({ data }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [editDialog, setEditDialog] = useState<{
    data: Role | null;
    isOpen: boolean;
  }>({ data: null, isOpen: false });

  const [detailDialog, setDetailDialog] = useState<{
    data: Role | null;
    isOpen: boolean;
  }>({ data: null, isOpen: false });

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
  const columns = useMemo<ColumnDef<Role>[]>(
    () => [
      {
        accessorKey: "index",
        header: "No",
        cell: ({ row }) => {
          return <div>{row.index + 1}</div>;
        },
      },
      {
        accessorKey: "role_name",
        header: "Role Name",
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => {
          const date = new Date(row.getValue("created_at"));
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        },
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
                  setEditDialog({ data: row.original, isOpen: true });
                }}
              >
                <Pen className="h-4 w-4 text-white" />
              </Button>
              <Button
                variant={"warning"}
                size={"icon"}
                onClick={() => {
                  setDetailDialog({ data: row.original, isOpen: true });
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
        tableActionsButton={<CreateDialog />}
      />
      <EditDialog
        isOpen={editDialog.isOpen}
        setIsOpen={() => setEditDialog({ ...editDialog, isOpen: false })}
        data={editDialog.data}
      />

      <DetailDialog
        isOpen={detailDialog.isOpen}
        setIsOpen={() => setDetailDialog({ ...detailDialog, isOpen: false })}
        data={detailDialog.data}
      />
    </>
  );
};
export default RoleTable;
