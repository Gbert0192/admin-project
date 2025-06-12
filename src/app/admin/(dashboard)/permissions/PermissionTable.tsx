"use client";

import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pen, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { Permission, PermissionData } from "./page";
import CreateDialog from "./CreateDialog";

interface PermissionProps {
  searchParams: Record<string, string | undefined>;
  data: PermissionData;
}

const PermissionTable: React.FC<PermissionProps> = ({ data }) => {
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
        cell: () => {
          return (
            <div className="flex items-center gap-2">
              <Button variant={"default"} size={"icon"}>
                <Pen className="h-4 w-4 text-white" />
              </Button>
              <Button variant={"warning"} size={"icon"}>
                <Eye className="h-4 w-4 text-white" />
              </Button>
              <Button variant={"destructive"} size={"icon"}>
                <Trash2 className="h-4 w-4 text-white" />
              </Button>
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
        tableActionsButton={<CreateDialog />}
      />
    </>
  );
};

export default PermissionTable;
