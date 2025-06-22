import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserAdmin } from "./page";

interface DetailRoleDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: UserAdmin | null;
}

const DetailDialog = ({ isOpen, setIsOpen, data }: DetailRoleDialogProps) => {
  const formatDate = (dateString: Date) => {
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
            {data?.name}&apos;s Details
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-1">
            Detail informasi Of Users
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <span className="text-sm font-medium text-gray-600">
                User Admin Full Name
              </span>
              <span className="text-sm text-gray-900 font-medium">
                {data?.name}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <span className="text-sm font-medium text-gray-600">
                User Student Id
              </span>
              <span className="text-sm text-gray-900 font-medium">
                {data?.student_id}
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
