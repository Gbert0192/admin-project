"use client";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pen, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { Role, RoleData } from "./page";
interface RolesProps {
  searchParams: Record<string, string | undefined>;
  data: RoleData;
}

const RoleTable: React.FC<RolesProps> = ({ data }) => {
  const columns = useMemo<ColumnDef<Role>[]>(
    () => [
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
        data={data.data ?? []}
        filterColumnId="role_name"
        filterPlaceholder="Role Name"
      />
    </>
  );
};
export default RoleTable;
