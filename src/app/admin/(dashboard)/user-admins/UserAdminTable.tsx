"use client";
import { ISessionPermission } from "@/app/types/next.auth";
import { AlertWrapper } from "@/components/alert-wrapper/alert-wrapper";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { errorHandler } from "@/lib/handler/errorHandler";
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Medal, Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import DetailDialog from "./DetailUserAdminDialog";
import EditDialog from "./EditUserAdminDialog";
import { UserAdmin, UserAdminData } from "./page";
import { checkPermission } from "@/lib/utils";

interface UserAdminProps {
  searchParams: Record<string, string | undefined>;
  data: UserAdminData;
  accessPermission: ISessionPermission[];
}

const UserAdminTable: React.FC<UserAdminProps> = ({
  data,
  accessPermission,
}) => {
  const [detailDialog, setDetailDialog] = useState<{
    data: UserAdmin | null;
    isOpen: boolean;
  }>({ data: null, isOpen: false });

  const [editDialog, setEditDialog] = useState<{
    data: UserAdmin | null;
    isOpen: boolean;
  }>({ data: null, isOpen: false });

  const router = useRouter();

  const { mutate: demotingUser } = useMutation({
    mutationFn: async (payload: { uuid: string; role_name: string }) => {
      const res = await api.put<UserAdmin>(`/user/promote`, payload);
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

  const columns = useMemo<ColumnDef<UserAdmin>[]>(
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
              {checkPermission(accessPermission, "/user/admin", "PUT") && (
                <Button
                  variant={"default"}
                  size={"icon"}
                  onClick={() => {
                    setEditDialog({ data: row.original, isOpen: true });
                  }}
                >
                  <Pen className="h-4 w-4 text-white" />
                </Button>
              )}
              <Button
                variant={"warning"}
                size={"icon"}
                onClick={() => {
                  setDetailDialog({ data: row.original, isOpen: true });
                }}
              >
                <Eye className="h-4 w-4 text-white" />
              </Button>
              {checkPermission(accessPermission, "/promote", "PUT") && (
                <AlertWrapper
                  onAction={() => {
                    const promoteData = {
                      uuid: row.original.uuid,
                      role_name: "User",
                    };
                    demotingUser(promoteData);
                  }}
                  title="Confirm demoting this user to regular user?"
                  description="After clicking OK, this user will no longer have admin access."
                  actionText="Ok"
                  cancelText="Cancel"
                  actionClassName="bg-green-500"
                >
                  <Button variant={"destructive"} size={"icon"}>
                    <Medal className="h-4 w-4 text-white" />
                  </Button>
                </AlertWrapper>
              )}
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <div className="text-gray-500 p-3">
        *You Can Add Admin By Update Users To Be A Admin
      </div>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        pageCount={data?.totalPages ?? 0}
        filterColumnId="student_id"
        filterPlaceholder="Search by Student ID..."
        // tableActionsButton={<CreateDialog />}
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
export default UserAdminTable;
