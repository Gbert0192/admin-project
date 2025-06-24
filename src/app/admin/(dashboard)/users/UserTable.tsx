"use client";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Medal, Pen } from "lucide-react";
import { useMemo, useState } from "react";
import { User, UserData } from "./page";
import DetailDialog from "./DetailDialog";
import EditDialog from "./EditUserDialog";
import { AlertWrapper } from "@/components/alert-wrapper/alert-wrapper";
import { useMutation } from "@tanstack/react-query";
import { errorHandler } from "@/lib/handler/errorHandler";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface UserProps {
  searchParams: Record<string, string | undefined>;
  data: UserData;
}

const UserTable: React.FC<UserProps> = ({ data }) => {
  const [detailDialog, setDetailDialog] = useState<{
    data: User | null;
    isOpen: boolean;
  }>({ data: null, isOpen: false });

  const [editDialog, setEditDialog] = useState<{
    data: User | null;
    isOpen: boolean;
  }>({ data: null, isOpen: false });

  const router = useRouter();

  const { mutate: promoteUser } = useMutation({
    mutationFn: async (payload: { uuid: string; role_name: string }) => {
      const res = await api.put<User>(`/user/promote`, payload);
      return res.data;
    },
    onError: (err) => {
      errorHandler(err);
    },
    onSuccess: () => {
      toast.success("Role Updated successfully!");
      router.refresh();
    },
  });

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "index",
        header: "No",
        cell: ({ row }) => {
          return <div>{row.index + 1}</div>;
        },
      },
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
              <AlertWrapper
                onAction={() => {
                  const promoteData = {
                    uuid: row.original.uuid,
                    role_name: "Admin",
                  };
                  promoteUser(promoteData);
                }}
                title="Confirm promoting this user to admin?"
                description="After Click Ok, This User Will Be A Admin"
                actionText="Ok"
                cancelText="Cancel"
                actionClassName="bg-green-500"
              >
                <Button variant={"florest"} size={"icon"}>
                  <Medal className="h-4 w-4 text-white" />
                </Button>
              </AlertWrapper>
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
      />
      <DetailDialog
        isOpen={detailDialog.isOpen}
        setIsOpen={() => setDetailDialog({ ...detailDialog, isOpen: false })}
        data={detailDialog.data}
      />
      <EditDialog
        isOpen={editDialog.isOpen}
        setIsOpen={() => setEditDialog({ ...editDialog, isOpen: false })}
        data={editDialog.data}
      />
    </>
  );
};
export default UserTable;
