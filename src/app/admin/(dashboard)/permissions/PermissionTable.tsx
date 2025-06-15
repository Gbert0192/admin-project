"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DeleteWrapper } from "@/components/delete-wrapper/delete-wrapper";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { errorHandler } from "@/lib/handler/errorHandler";
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import CreatePermissionDialog from "./CreatePermissionDialog";
import DetailDialog from "./DetailPermissionDialog";
import EditPermissionDialog from "./EditPermissionDialog";
import { Permission, PermissionData } from "./page";
import { Badge } from "@/components/ui/badge";

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

  const [detailDialog, setDetailDialog] = useState<{
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

  const getMethodColor = (method: string) => {
    switch (method?.toUpperCase()) {
      case "GET":
        return "bg-green-500";
      case "POST":
        return "bg-blue-500";
      case "PUT":
        return "bg-yellow-500";
      case "DELETE":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  const columns = useMemo<ColumnDef<Permission>[]>(
    () => [
      {
        accessorKey: "index",
        header: "No",
        cell: ({ row }) => {
          return <div>{row.index + 1}</div>;
        },
      },
      {
        accessorKey: "permission_name",
        header: "Permission Name",
      },
      {
        accessorKey: "route",
        header: "Route",
      },
      {
        accessorKey: "is_menu",
        header: "Is Menu",
        cell: ({ row }) => {
          return (
            <>
              <div>
                {row.getValue("is_menu") ? (
                  <Badge className="text-white" variant={"success"}>
                    True
                  </Badge>
                ) : (
                  <Badge className="text-white" variant={"destructive"}>
                    False
                  </Badge>
                )}
              </div>
            </>
          );
        },
      },
      {
        accessorKey: "method",
        header: "Method",
        cell: ({ row }) => {
          const methods = row.original.method;
          if (!Array.isArray(methods)) {
            return null;
          }
          return (
            <div className="flex items-center flex-wrap gap-2">
              {methods?.length > 0
                ? methods.map((method) => (
                    <span
                      key={method}
                      className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${getMethodColor(method)}`}
                    >
                      {method}
                    </span>
                  ))
                : "-"}
            </div>
          );
        },
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

      <DetailDialog
        isOpen={detailDialog.isOpen}
        setIsOpen={() => setDetailDialog({ ...detailDialog, isOpen: false })}
        data={detailDialog.data}
      />
    </>
  );
};

export default PermissionTable;
