"use client";

import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pen, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Permission, PermissionData } from "./page";
import { useRouter } from "next/navigation";
import EditPermissionDialog from "./EditPermissionDialog";
import { DeleteWrapper } from "@/components/delete-wrapper/delete-wrapper";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import { errorHandler } from "@/lib/handler/errorHandler";
import CreatePermissionDialog from "./CreatePermissionDialog";

interface PermissionProps {
  searchParams: Record<string, string | undefined>;
  data: PermissionData;
}

const PermissionTable: React.FC<PermissionProps> = ({ data }) => {
  const router = useRouter();

  const [editDialog, setEditDialog] = useState<{
    data: Permission | null;
    isOpen: boolean;
  }>({ data: null, isOpen: false });

  const { mutate: deletePermission, isPending } = useMutation({
    mutationFn: async (uuid: string) => {
      await api.delete(`/permission/${uuid}`);
    },
    onSuccess: () => {
      toast.success("Permission deleted successfully.");
      router.refresh();
    },
    onError: (error) => {
      errorHandler(error);
      toast.error("Failed to delete permission.");
    },
  });
  const columns = useMemo<ColumnDef<Permission>[]>(
    () => [
      {
        accessorKey: "permission_name",
        header: "Permission Name",
      },
      {
        accessorKey: "route",
        header: "Route",
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
              <Button variant={"warning"} size={"icon"}>
                <Eye className="h-4 w-4 text-white" />
              </Button>
              <DeleteWrapper
                onConfirm={() => deletePermission(row.original.uuid)}
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
        data={data?.data ?? []}
        pageCount={data?.totalPages ?? 0}
        filterColumnId="permission_name"
        filterPlaceholder="Search by Permission Name"
        tableActionsButton={<CreatePermissionDialog />}
      />
      <EditPermissionDialog
        isOpen={editDialog.isOpen}
        setIsOpen={() => setEditDialog({ ...editDialog, isOpen: false })}
        data={editDialog.data}
      />
    </>
  );
};

export default PermissionTable;
