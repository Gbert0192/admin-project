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
import { QuestionKahoot, QuestionKahootData } from "./page";
import CreateQuestionKahoot from "./CreateQuestionKahoot";
import EditQuestionKahoot from "./EditQuestionKahoot";
import DetailQuestionKahoot from "./DetailQuestionKahoot";

interface FormsKahootProps {
  data: QuestionKahootData;
  accessPermission: ISessionPermission[];
  formUuid: string;
}

const KahootFormQuestionTable: React.FC<FormsKahootProps> = ({
  data,
  formUuid,
}) => {
  const router = useRouter();

  const [editDialog, setEditDialog] = useState<{
    data: QuestionKahoot | null;
    isOpen: boolean;
  }>({ data: null, isOpen: false });

  const [detailDialog, setDetailDialog] = useState<{
    data: QuestionKahoot | null;
    isOpen: boolean;
  }>({ data: null, isOpen: false });

  const { mutate: deleteForm, isPending } = useMutation({
    mutationFn: async (uuid: string) => {
      await api.delete(`/form-kahoot/question/${uuid}`);
    },
    onSuccess: () => {
      toast.success("Form Question deleted successfully.");
      router.refresh();
    },
    onError: (error) => {
      errorHandler(error);
      toast.error("Failed to delete Form Question.");
    },
  });
  const columns = useMemo<ColumnDef<QuestionKahoot>[]>(
    () => [
      {
        accessorKey: "index",
        header: "No",
        cell: ({ row }) => {
          return <div>{row.index + 1}</div>;
        },
      },
      {
        accessorKey: "question_text",
        header: "Questions",
      },
      {
        accessorKey: "question_type",
        header: "Type",
        cell: ({ row }) => {
          const type = row.original.question_type;

          const typeMap: Record<
            string,
            {
              label: string;
              color: "default" | "secondary" | "outline" | "success";
            }
          > = {
            single_choice: { label: "Single Choice", color: "default" },
            multiple_choice: { label: "Multiple Choice", color: "secondary" },
            true_false: { label: "True / False", color: "success" },
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
                  setDetailDialog({ data: row.original, isOpen: true });
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
        filterColumnId="question_text"
        filterPlaceholder="Form Questions"
        tableActionsButton={<CreateQuestionKahoot uuid={formUuid} />}
      />

      <EditQuestionKahoot
        isOpen={editDialog.isOpen}
        setIsOpen={() => setEditDialog({ ...editDialog, isOpen: false })}
        data={editDialog.data}
      />

      <DetailQuestionKahoot
        isOpen={detailDialog.isOpen}
        setIsOpen={() => setDetailDialog({ ...detailDialog, isOpen: false })}
        data={detailDialog.data}
      />
    </>
  );
};
export default KahootFormQuestionTable;
