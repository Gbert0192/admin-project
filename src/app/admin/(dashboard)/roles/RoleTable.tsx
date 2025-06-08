"use client";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pen, Trash2 } from "lucide-react";
import { useMemo } from "react";

export interface User {
  uuid: string;
  student_id: string;
  name: string;
  role_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

const UserTable = () => {
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "student_id",
        header: "Student ID",
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
  const { data: usersData, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await api.get<{ data: User[] }>("/user");
      return data.data;
    },
  });
  if (isLoading) {
    return <div>Loading data...</div>;
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={usersData ?? []}
        filterColumnId=""
        filterPlaceholder=""
      />
    </>
  );
};
export default UserTable;
