"use client";

import { ISessionPermission } from "@/app/types/next.auth";
import { DataTable } from "@/components/data-table/data-table";
import { DeleteWrapper } from "@/components/delete-wrapper/delete-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { errorHandler } from "@/lib/handler/errorHandler";
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { BookA, Eye, Pen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import CreateDialog from "./CreateFormHuaweiDialog";
import { FormHuawei, FormHuaweiData } from "./page";
import EditDialog from "./EditFormHuaweiDialog";
import DetailDialog from "./DetailFormHuaweiDialog";

interface FormsHuaweiProps {
  searchParams: Record<string, string | undefined>;
  data: FormHuaweiData;
  accessPermission: ISessionPermission[];
}

const FormHuaweiTable: React.FC<FormsHuaweiProps> = ({ data }) => {
  const router = useRouter();

  const [editDialog, setEditDialog] = useState<{
    data: FormHuawei | null;
    isOpen: boolean;
  }>({ data: null, isOpen: false });
  const [detailDialog, setDetailDialog] = useState<{
    data: FormHuawei | null;
    isOpen: boolean;
  }>({ data: null, isOpen: false });

  const { mutate: deleteForm, isPending } = useMutation({
    mutationFn: async (uuid: string) => {
      await api.delete(`/form-huawei/${uuid}`);
    },
    onSuccess: () => {
      toast.success("Form deleted successfully.");
      router.refresh();
    },
    onError: (error) => {
      errorHandler(error);
      toast.error("Failed to delete Form.");
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
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => {
          const date = new Date(row.getValue("created_at"));
          return format(date, "dd/MM/yyyy", { locale: id });
        },
      },
      {
        accessorKey: "is_published",
        header: "Published",
        cell: ({ row }) => {
          return (
            <div>
              {row.original.is_published ? (
                <Badge variant={"success"}>True</Badge>
              ) : (
                <Badge variant={"destructive"}>False</Badge>
              )}
            </div>
          );
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
              <Button
                variant={"florest"}
                size={"icon"}
                onClick={() => {
                  router.push(`/admin/forms/huawei/${row.original.uuid}`);
                }}
              >
                <BookA className="h-4 w-4 text-white" />
              </Button>
              <DeleteWrapper
                onConfirm={() => deleteForm(row.original.uuid)}
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
        filterColumnId="form_title"
        filterPlaceholder="Form Title"
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
export default FormHuaweiTable;
