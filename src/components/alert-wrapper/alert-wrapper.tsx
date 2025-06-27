"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface AlertWrapperProps {
  children: React.ReactNode;
  onAction: () => void;
  isPending?: boolean;
  title: string;
  description: string;
  cancelText?: string;
  actionText?: string;
  actionPendingText?: string;
  actionClassName?: string;
}

export function AlertWrapper({
  children,
  onAction,
  isPending = false,
  title = "Are You Sure ?",
  description = "This Action cannot be undone. After ..., the data will be permanently removed.",
  cancelText = "Batal",
  actionText = "Next",
  actionPendingText = "Processing...",
  actionClassName,
}: AlertWrapperProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="rounded-lg max-w-md w-[90%]">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={onAction}
            className={cn("text-white", actionClassName)}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? actionPendingText : actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
