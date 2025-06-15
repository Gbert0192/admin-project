import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { Permission } from "./page";

interface DetailPermissionProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: Permission | null;
}

const DetailDialog = ({ isOpen, setIsOpen, data }: DetailPermissionProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[520px] bg-white border border-gray-200 shadow-lg">
        <DialogHeader className="border-b border-gray-100 pb-4">
          <DialogTitle className="text-2xl text-gray-900 tracking-tight font-bold">
            {data?.permission_name}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-1">
            Detail Information of Permission
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <span className="text-sm font-medium text-gray-600">
                Permission Name
              </span>
              <span className="text-sm text-gray-900 font-medium">
                {data?.permission_name}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <span className="text-sm font-medium text-gray-600">Route</span>
              <span className="text-sm text-gray-900">{data?.route}</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <span className="text-sm font-medium text-gray-600">Method</span>
              <span className="text-sm text-gray-900">
                {data?.method.join(", ")}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <span className="text-sm font-medium text-gray-600">Created</span>
              <span className="text-sm text-gray-900">
                {data?.created_at ? formatDate(data.created_at) : "-"}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailDialog;
