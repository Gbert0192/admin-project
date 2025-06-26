"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { CircleDotDashed, ListChecks, CheckSquare } from "lucide-react";
import { FormKahoot } from "./page";

interface DetailFormKahootProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: FormKahoot | null;
}

const DetailFormKahootDialog = ({
  isOpen,
  setIsOpen,
  data,
}: DetailFormKahootProps) => {
  if (!data) return null;

  const totalQuestions =
    Number(data.single_choice_count) +
    Number(data.multiple_choice_count) +
    Number(data.true_false_count);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[520px] bg-white border border-gray-200 shadow-lg p-6 md:p-8 rounded-lg flex flex-col max-h-[90vh]">
        <DialogHeader className="border-b border-gray-100 pb-4 mb-4 flex-shrink-0">
          <DialogTitle className="text-2xl text-gray-900 tracking-tight font-bold">
            {data.form_title}&apos;s Form Details
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-1">
            Detail information of {data.form_title} form.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 overflow-y-auto pr-2 -mr-2 flex-grow">
          <div className="space-y-2">
            <DetailRow label="Form Title" value={data.form_title} />
            <DetailRow label="Form Description" value={data.form_description} />
            <DetailRow
              label="Created Date"
              value={format(
                new Date(data.created_at),
                "dd/MM/yyyy, hh:mm:ss aa",
                { locale: id }
              )}
            />
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <span className="text-sm font-medium text-gray-600">Status</span>
              <span className="text-sm text-gray-900 font-medium">
                {data.is_published ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    Published
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                    Draft
                  </Badge>
                )}
              </span>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md shadow-inner">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Question Breakdown
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <QuestionCountItem
                icon={<CircleDotDashed className="w-5 h-5 text-gray-600" />}
                label="Single Choice"
                count={data.single_choice_count}
              />
              <QuestionCountItem
                icon={<ListChecks className="w-5 h-5 text-gray-600" />}
                label="Multiple Choice"
                count={data.multiple_choice_count}
              />
              <QuestionCountItem
                icon={<CheckSquare className="w-5 h-5 text-gray-600" />}
                label="True/False"
                count={data.true_false_count}
              />
            </div>
            <div className="text-center mt-4 pt-4 border-t border-gray-200">
              <span className="text-base font-semibold text-gray-700">
                Total Questions:
              </span>{" "}
              <span className="text-lg font-bold text-blue-600">
                {totalQuestions}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | React.ReactNode;
}) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-b-0">
    <span className="text-sm font-medium text-gray-600">{label}</span>
    <span className="text-sm text-gray-900 font-medium">{value}</span>
  </div>
);

const QuestionCountItem = ({
  icon,
  label,
  count,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
}) => (
  <div className="flex flex-col items-center p-2 rounded-md bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    {icon}
    <span className="text-xs text-gray-500 mt-1">{label}</span>
    <span className="text-lg font-bold text-gray-800 mt-0.5">{count}</span>
  </div>
);
export default DetailFormKahootDialog;
