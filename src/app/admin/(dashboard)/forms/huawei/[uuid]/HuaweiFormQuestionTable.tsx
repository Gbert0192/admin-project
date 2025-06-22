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
import { Eye, Pen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import CreateDialog from "./CreateQuestionHuawei";
import EditDialog from "./EditQuestionHuawei";
import { QuestionHuawei, QuestionHuaweiData } from "./page";

interface FormsHuaweiProps {
  searchParams: Record<string, string | undefined>;
  data: QuestionHuaweiData;
  accessPermission: ISessionPermission[];
  formUuid: string;
}

const HuaweiFormQuestionTable: React.FC<FormsHuaweiProps> = ({
  data,
  formUuid,
}) => {
  const router = useRouter();

  const [editDialog, setEditDialog] = useState<{
    data: QuestionHuawei | null;
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
  const columns = useMemo<ColumnDef<QuestionHuawei>[]>(
    () => [
      {
        accessorKey: "index",
        header: "No",
        cell: ({ row }) => {
          return <div>{row.index + 1}</div>;
        },
      },
      {
        accessorKey: "question",
        header: "Questions",
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
          const type = row.original.type;

          const typeMap: Record<
            string,
            {
              label: string;
              color:
                | "default"
                | "secondary"
                | "destructive"
                | "outline"
                | "success";
            }
          > = {
            SINGLE_CHOICE: { label: "Single Choice", color: "default" },
            MULTIPLE_CHOICE: { label: "Multiple Choice", color: "secondary" },
            TRUE_FALSE: { label: "True / False", color: "success" },
            ESSAY: { label: "Essay", color: "destructive" },
          };

          const badge = typeMap[type] || { label: type, color: "outline" };

          return (
            <Badge variant={badge.color} className="text-white">
              {badge.label}
            </Badge>
          );
        },
      },
      {
        accessorKey: "difficulty",
        header: "Difficulty",
        cell: ({ row }) => {
          const difficulty = row.original.difficulty as string;

          const difficultyMap: Record<
            string,
            {
              label: string;
              color:
                | "default"
                | "secondary"
                | "destructive"
                | "outline"
                | "success";
            }
          > = {
            EASY: { label: "Easy", color: "secondary" },
            MEDIUM: { label: "Medium", color: "success" },
            HOT: { label: "Hot", color: "destructive" },
          };

          const badge = difficultyMap[difficulty] || {
            label: difficulty,
            color: "outline",
          };

          return (
            <Badge variant={badge.color} className="text-white">
              {badge.label}
            </Badge>
          );
        },
      },
      {
        accessorKey: "point",
        header: "Point",
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => {
          const date = new Date(row.getValue("created_at"));
          return format(date, "dd/MM/yyyy, HH:mm:ss", { locale: id });
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
                  //   setDetailDialog({ data: row.original, isOpen: true });
                }}
              >
                <Eye className="h-4 w-4 text-white" />
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
        filterColumnId="question"
        filterPlaceholder="Form Questions"
        tableActionsButton={<CreateDialog uuid={formUuid} />}
      />

      <EditDialog
        isOpen={editDialog.isOpen}
        setIsOpen={() => setEditDialog({ ...editDialog, isOpen: false })}
        data={editDialog.data}
      />
    </>
  );
};
export default HuaweiFormQuestionTable;
