"use client";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pen, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import CreateDialog from "./CreateDialog";
import { User, UserData } from "./page";
import DetailDialog from "./DetailDialog";

interface UserProps {
  searchParams: Record<string, string | undefined>;
  data: UserData;
}

const UserTable: React.FC<UserProps> = ({ data }) => {
  const [detailDialog, setDetailDialog] = useState<{
    data: User | null;
    isOpen: boolean;
  }>({ data: null, isOpen: false });
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
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <Button variant={"default"} size={"icon"}>
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
        filterColumnId="student_id"
        filterPlaceholder="Search by Student ID..."
        tableActionsButton={<CreateDialog />}
      />
      <DetailDialog
        isOpen={detailDialog.isOpen}
        setIsOpen={() => setDetailDialog({ ...detailDialog, isOpen: false })}
        data={detailDialog.data}
      />
    </>
  );
};
export default UserTable;
