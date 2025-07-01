import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/api";
import { toTitleCase } from "@/lib/utils";

interface HistoryData {
  id: number;
  uuid: string;
  user_id: string;
  form_huawei_id: string;
  score: number | null;
  duration_seconds: number;
  submitted_at: string | null;
  max_score: string;
  source: string;
}

type Status = "Graded" | "Submitted" | "Draft";

const HistoryItem = ({
  title,
  status,
  detail,
}: {
  title: string;
  status: Status;
  detail: string;
}) => (
  <div className="flex items-center gap-4 hover:bg-muted/50 p-2 rounded-md transition-colors">
    <div className="h-10 w-10 bg-secondary rounded-md flex items-center justify-center flex-shrink-0">
      <FileText className="h-5 w-5 text-muted-foreground" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium truncate">{title}</p>
      <p className="text-sm text-muted-foreground">{detail}</p>
    </div>
    <Badge
      variant={
        status === "Graded"
          ? "default"
          : status === "Submitted"
            ? "outline"
            : "secondary"
      }
      className="flex-shrink-0"
    >
      {status}
    </Badge>
  </div>
);

export const QuizHistory = () => {
  const { data: history, isLoading: isLoadingHistory } = useQuery<
    HistoryData[]
  >({
    queryKey: ["history"],
    queryFn: async () => {
      const res: any = await api.get("/dashboard-user/history");
      return res.data.data;
    },
    refetchOnWindowFocus: false,
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderContent = () => {
    if (isLoadingHistory) {
      return (
        <div className="flex items-center justify-center mt-8 gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span>Loading history...</span>
        </div>
      );
    }

    if (!history || history.length === 0) {
      return (
        <p className="text-center text-muted-foreground mt-8">
          No submission history found.
        </p>
      );
    }

    return history.map((item) => {
      const status: Status =
        item.score !== null
          ? "Graded"
          : item.submitted_at
            ? "Submitted"
            : "Draft";

      let detail = "";
      if (status === "Graded") {
        detail = `Score: ${item.score}${item.source === "huawei" ? `/${item.max_score}` : ""}`;
      } else if (status === "Submitted") {
        detail = `Submitted on ${formatDate(item.submitted_at)}`;
      } else if (status === "Draft") {
        detail = `Saved but not submitted`;
      }

      const title = toTitleCase(item.source);

      console.log(title);
      return (
        <HistoryItem
          key={item.id}
          title={`Form : ${title}`}
          status={status}
          detail={detail}
        />
      );
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submission History</CardTitle>
        <CardDescription>
          Review the quizzes and forms you have completed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {renderContent()}
        </div>
      </CardContent>
    </Card>
  );
};
