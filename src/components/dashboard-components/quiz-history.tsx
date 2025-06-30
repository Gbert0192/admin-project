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

// const mockHistoryData = [
//   {
//     id: 1,
//     uuid: "d17f1373-3a0c-4fb2-ad93-811cf943a881",
//     user_id: "68",
//     form_huawei_id: "26",
//     score: 95,
//     duration_seconds: 900,
//     submitted_at: "2025-06-29T14:11:24.119Z",
//     max_score: "100",
//     form_huawei: {
//       title: "Verbal Ability Test",
//     },
//   },
//   {
//     id: 2,
//     uuid: "a28g2484-4b1d-5gc3-be04-922dg054b992",
//     user_id: "68",
//     form_huawei_id: "31",
//     score: null,
//     duration_seconds: 300,
//     submitted_at: "2025-06-30T10:00:00.000Z",
//     max_score: "N/A",
//     form_huawei: {
//       title: "User Satisfaction Survey",
//     },
//   },
//   {
//     id: 4,
//     uuid: "c40i4606-6d3f-7ie5-dg26-144fi276d114",
//     user_id: "68",
//     form_huawei_id: "50",
//     score: 80,
//     duration_seconds: 1800,
//     submitted_at: "2025-06-28T11:00:00.000Z",
//     max_score: "100",
//     form_huawei: {
//       title: "Logical Reasoning Quiz",
//     },
//   },
//   {
//     id: 4,
//     uuid: "c40i4606-6d3f-7ie5-dg26-144fi276d114",
//     user_id: "68",
//     form_huawei_id: "50",
//     score: 80,
//     duration_seconds: 1800,
//     submitted_at: "2025-06-28T11:00:00.000Z",
//     max_score: "100",
//     form_huawei: {
//       title: "Logical Reasoning Quiz",
//     },
//   },
//   {
//     id: 4,
//     uuid: "c40i4606-6d3f-7ie5-dg26-144fi276d114",
//     user_id: "68",
//     form_huawei_id: "50",
//     score: 80,
//     duration_seconds: 1800,
//     submitted_at: "2025-06-28T11:00:00.000Z",
//     max_score: "100",
//     form_huawei: {
//       title: "Logical Reasoning Quiz",
//     },
//   },
//   {
//     id: 4,
//     uuid: "c40i4606-6d3f-7ie5-dg26-144fi276d114",
//     user_id: "68",
//     form_huawei_id: "50",
//     score: 80,
//     duration_seconds: 1800,
//     submitted_at: "2025-06-28T11:00:00.000Z",
//     max_score: "100",
//     form_huawei: {
//       title: "Logical Reasoning Quiz",
//     },
//   },
//   {
//     id: 4,
//     uuid: "c40i4606-6d3f-7ie5-dg26-144fi276d114",
//     user_id: "68",
//     form_huawei_id: "50",
//     score: 80,
//     duration_seconds: 1800,
//     submitted_at: "2025-06-28T11:00:00.000Z",
//     max_score: "100",
//     form_huawei: {
//       title: "Logical Reasoning Quiz",
//     },
//   },
//   {
//     id: 4,
//     uuid: "c40i4606-6d3f-7ie5-dg26-144fi276d114",
//     user_id: "68",
//     form_huawei_id: "50",
//     score: 80,
//     duration_seconds: 1800,
//     submitted_at: "2025-06-28T11:00:00.000Z",
//     max_score: "100",
//     form_huawei: {
//       title: "Logical Reasoning Quiz",
//     },
//   },
//   {
//     id: 4,
//     uuid: "c40i4606-6d3f-7ie5-dg26-144fi276d114",
//     user_id: "68",
//     form_huawei_id: "50",
//     score: 80,
//     duration_seconds: 1800,
//     submitted_at: "2025-06-28T11:00:00.000Z",
//     max_score: "100",
//     form_huawei: {
//       title: "Logical Reasoning Quiz",
//     },
//   },
//   {
//     id: 4,
//     uuid: "c40i4606-6d3f-7ie5-dg26-144fi276d114",
//     user_id: "68",
//     form_huawei_id: "50",
//     score: 80,
//     duration_seconds: 1800,
//     submitted_at: "2025-06-28T11:00:00.000Z",
//     max_score: "100",
//     form_huawei: {
//       title: "Logical Reasoning Quiz",
//     },
//   },

//   {
//     id: 3,
//     uuid: "b39h3595-5c2e-6hd4-cf15-033eh165c003",
//     user_id: "68",
//     form_huawei_id: "45",
//     score: null,
//     duration_seconds: 120,
//     submitted_at: null,
//     max_score: "50",
//     form_huawei: {
//       title: "Basic Logic Quiz",
//     },
//   },
//   {
//     id: 5,
//     uuid: "e51k5717-7e4g-8jf6-eh37-255gj387e225",
//     user_id: "68",
//     form_huawei_id: "52",
//     score: null,
//     duration_seconds: 600,
//     submitted_at: "2025-06-27T09:30:00.000Z",
//     max_score: "N/A",
//     form_huawei: {
//       title: "Product Feedback Form",
//     },
//   },
// ];

// const mockApi = {
//   get: (url: string) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         if (url === "/dashboard-user/history") {
//           resolve({
//             data: {
//               data: mockHistoryData,
//             },
//           });
//         }
//       }, 500);
//     });
//   },
// };

interface HistoryData {
  id: number;
  uuid: string;
  user_id: string;
  form_huawei_id: string;
  score: number | null;
  duration_seconds: number;
  submitted_at: string | null;
  max_score: string;
  form_huawei: {
    title: string;
  };
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
        detail = `Score: ${item.score}/${item.max_score}`;
      } else if (status === "Submitted") {
        detail = `Submitted on ${formatDate(item.submitted_at)}`;
      } else if (status === "Draft") {
        detail = `Saved but not submitted`;
      }

      return (
        <HistoryItem
          key={item.id}
          title={item.form_huawei?.title || `Quiz ID: ${item.form_huawei_id}`}
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
