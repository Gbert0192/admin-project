import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { Permission } from "./page";

interface RoleData {
  uuid: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  permissions: Permission[];
  role_name: string;
}

interface DetailRoleDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: RoleData | null;
}

const DetailDialog = ({ isOpen, setIsOpen, data }: DetailRoleDialogProps) => {
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
            {data?.role_name}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-1">
            Detail informasi role dan permissions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <span className="text-sm font-medium text-gray-600">
                Role Name
              </span>
              <span className="text-sm text-gray-900 font-medium">
                {data?.role_name}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <span className="text-sm font-medium text-gray-600">Created</span>
              <span className="text-sm text-gray-900">
                {data?.created_at ? formatDate(data.created_at) : "-"}
              </span>
            </div>
          </div>

          {/* Permissions Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900">Permissions</h4>
              <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                {data?.permissions?.length ?? 0} permissions
              </span>
            </div>

            <div className="max-h-40 overflow-y-auto">
              {data?.permissions && data.permissions.length > 0 ? (
                <div className="space-y-2">
                  {data.permissions.map((permission) => (
                    <div
                      key={permission.uuid}
                      className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <div className="flex flex-row justify-between w-full">
                        <span className="text-sm text-gray-900 font-medium ">
                          {permission.permission_name}
                        </span>
                        <span className="text-sm text-gray-900 font-medium ">
                          {permission.route}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m0 0v2m0-2h2m-2 0H10m9-9a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm">No permissions assigned</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailDialog;
