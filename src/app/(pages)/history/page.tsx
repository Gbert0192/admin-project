"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Calendar,
  User,
} from "lucide-react";

interface FormItem {
  id: string;
  title: string;
  status: "filled" | "pending" | "reviewed" | "draft";
  submittedDate?: string;
  submittedTime?: string;
  responses?: number;
  author?: string;
  points?: string;
  questions?: Question[];
  backgroundColor: string;
}

interface Question {
  id: number;
  text: string;
  type: "multiple-choice" | "essay" | "file-upload";
  status: "correct" | "incorrect" | "pending" | "reviewed";
  points: number;
  maxPoints: number;
  options?: string[];
  selectedAnswer?: string;
  correctAnswer?: string;
  userAnswer?: string;
  attachments?: string[];
}

const mockData: FormItem[] = [
  {
    id: "2",
    title: "Huawei forms",
    status: "filled",
    submittedDate: "5/27/2025",
    submittedTime: "6:41:00 PM",
    backgroundColor: "bg-gradient-to-br from-teal-500 to-teal-600",
  },
  {
    id: "3",
    title: "UTS-Pengembangan Aplikasi Mobile Frontend",
    status: "filled",
    submittedDate: "5/9/2025",
    submittedTime: "6:52:30 PM",
    backgroundColor: "bg-gradient-to-br from-orange-100 to-red-100",
  },
  {
    id: "4",
    title: "PERTEMUAN-7 IF A-SORE ORKOM",
    status: "filled",
    submittedDate: "4/29/2025",
    submittedTime: "7:02:54 PM",
    points: "20/100",
    backgroundColor: "bg-gradient-to-br from-teal-500 to-green-500",
    questions: [
      {
        id: 1,
        text: "Pemetaan pada cache adalah :",
        type: "multiple-choice",
        status: "correct",
        points: 20,
        maxPoints: 20,
        options: [
          "Direct, Associative, Random",
          "Direct, Associative, Set Associative",
          "Direct, Set Associative, Sequential",
          "Direct, Associative, Sequential",
        ],
        selectedAnswer: "Direct, Associative, Set Associative",
        correctAnswer: "Direct, Associative, Set Associative",
      },
      {
        id: 2,
        text: "[FFE94]16 = [BDC89]16 = [..........]6 = [..........]8 = [..........]2 (Non-anonymous question)",
        type: "essay",
        status: "reviewed",
        points: 0,
        maxPoints: 20,
        userAnswer: "User's calculation response",
        attachments: ["Tugas1.jpg"],
      },
      {
        id: 3,
        text: "Terdapat tiga metode pemetaan. Sebutkan dan Jelaskan (Non-anonymous question)",
        type: "essay",
        status: "reviewed",
        points: 0,
        maxPoints: 20,
        userAnswer: "User's explanation about mapping methods",
        attachments: ["tugas.png"],
      },
    ],
  },
  {
    id: "5",
    title: "QUIZ-6 IF  A-SORE",
    status: "filled",
    submittedDate: "4/22/2025",
    submittedTime: "7:15:59 PM",
    backgroundColor: "bg-gradient-to-br from-teal-500 to-teal-600",
  },
  {
    id: "6",
    title: "Materi-4 Latihan Orkom IF A-Sore",
    status: "filled",
    submittedDate: "3/25/2025",
    submittedTime: "6:14:05 PM",
    backgroundColor: "bg-gradient-to-br from-teal-500 to-teal-600",
  },
  {
    id: "7",
    title: "POSTTEST MATERI-2 IF A-SORE",
    status: "filled",
    submittedDate: "3/11/2025",
    submittedTime: "7:12:22 PM",
    backgroundColor: "bg-gradient-to-br from-teal-500 to-teal-600",
  },
  {
    id: "8",
    title: "PRETEST MATERI-2 IF A-SORE",
    status: "filled",
    submittedDate: "3/11/2025",
    submittedTime: "6:44:54 PM",
    backgroundColor: "bg-gradient-to-br from-teal-500 to-teal-600",
  },
  {
    id: "9",
    title: "ISO-Pert-01] - Pengenalan SO dan Struktur SK (I)",
    status: "filled",
    submittedDate: "3/7/2025",
    submittedTime: "8:42:17 AM",
    backgroundColor: "bg-gradient-to-br from-blue-500 to-purple-600",
  },
  {
    id: "10",
    title: "UAS-Perancangan dan Pemrograman Berorientasi Objek | IF-C Pagi",
    status: "filled",
    submittedDate: "1/23/2025",
    submittedTime: "2:33:06 PM",
    backgroundColor: "bg-gradient-to-br from-amber-100 to-orange-200",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "filled":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case "reviewed":
      return <AlertCircle className="h-4 w-4 text-blue-600" />;
    case "draft":
      return <FileText className="h-4 w-4 text-gray-600" />;
    default:
      return <FileText className="h-4 w-4 text-gray-600" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "filled":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "reviewed":
      return "bg-blue-100 text-blue-800";
    case "draft":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getQuestionStatusIcon = (status: string) => {
  switch (status) {
    case "correct":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "incorrect":
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    case "reviewed":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case "pending":
      return <Clock className="h-4 w-4 text-gray-600" />;
    default:
      return <FileText className="h-4 w-4 text-gray-600" />;
  }
};

export default function FormHistory() {
  const [selectedForm, setSelectedForm] = useState<FormItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = (form: FormItem) => {
    setSelectedForm(form);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Form History</h1>
        <p className="text-gray-600">
          View and manage your submitted forms and quizzes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockData.map((form) => (
          <Card
            key={form.id}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            onClick={() => handleCardClick(form)}
          >
            <div className={`h-32 ${form.backgroundColor} relative`}>
              <div className="absolute top-3 right-3">
                {getStatusIcon(form.status)}
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold line-clamp-2 min-h-[2.5rem]">
                {form.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <Badge className={`text-xs ${getStatusColor(form.status)}`}>
                  {form.status === "filled"
                    ? "Filled form"
                    : form.status === "draft"
                      ? "Draft"
                      : form.status === "pending"
                        ? "Pending"
                        : "Reviewed"}
                </Badge>

                {form.submittedDate && (
                  <div className="flex items-center text-xs text-gray-600">
                    <Calendar className="h-3 w-3 mr-1" />
                    Submitted {form.submittedDate}, {form.submittedTime}
                  </div>
                )}

                {form.author && (
                  <div className="flex items-center text-xs text-gray-600">
                    <User className="h-3 w-3 mr-1" />
                    {form.author}
                  </div>
                )}

                {form.responses !== undefined && (
                  <div className="text-xs text-gray-600">
                    {form.responses} responses
                  </div>
                )}

                {form.points && (
                  <div className="text-xs font-medium text-blue-600">
                    Points: {form.points}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {selectedForm?.title}
            </DialogTitle>
          </DialogHeader>

          {selectedForm && (
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="space-y-6">
                {/* Form Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Status: </span>
                      <Badge
                        className={`ml-2 ${getStatusColor(selectedForm.status)}`}
                      >
                        {selectedForm.status === "filled"
                          ? "Filled form"
                          : selectedForm.status === "draft"
                            ? "Draft"
                            : selectedForm.status === "pending"
                              ? "Pending"
                              : "Reviewed"}
                      </Badge>
                    </div>
                    {selectedForm.submittedDate && (
                      <div>
                        <span className="font-medium">Submitted: </span>
                        {selectedForm.submittedDate},{" "}
                        {selectedForm.submittedTime}
                      </div>
                    )}
                    {selectedForm.points && (
                      <div>
                        <span className="font-medium">Points: </span>
                        <span className="text-blue-600 font-semibold">
                          {selectedForm.points}
                        </span>
                      </div>
                    )}
                    {selectedForm.author && (
                      <div>
                        <span className="font-medium">Author: </span>
                        {selectedForm.author}
                      </div>
                    )}
                  </div>
                </div>

                {/* Questions */}
                {selectedForm.questions && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Questions & Answers
                    </h3>
                    {selectedForm.questions.map((question, index) => (
                      <Card key={question.id} className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {getQuestionStatusIcon(question.status)}
                                <span className="text-sm font-medium capitalize">
                                  {question.status === "correct"
                                    ? "Correct"
                                    : question.status === "incorrect"
                                      ? "Incorrect"
                                      : question.status === "reviewed"
                                        ? "Will be reviewed"
                                        : "Pending"}
                                </span>
                                <span className="text-sm text-gray-600">
                                  {question.points}/{question.maxPoints} Points
                                </span>
                              </div>
                              <p className="font-medium text-gray-900 mb-3">
                                {index + 1}. {question.text}
                              </p>
                            </div>
                          </div>

                          {question.type === "multiple-choice" &&
                            question.options && (
                              <div className="space-y-2">
                                {question.options.map((option, optionIndex) => (
                                  <div
                                    key={optionIndex}
                                    className={`p-2 rounded border text-sm ${
                                      option === question.selectedAnswer
                                        ? option === question.correctAnswer
                                          ? "bg-green-50 border-green-200 text-green-800"
                                          : "bg-red-50 border-red-200 text-red-800"
                                        : "bg-gray-50 border-gray-200"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <div
                                        className={`w-4 h-4 rounded-full border-2 ${
                                          option === question.selectedAnswer
                                            ? "bg-current"
                                            : ""
                                        }`}
                                      />
                                      {option}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                          {question.type === "essay" && question.userAnswer && (
                            <div className="bg-gray-50 p-3 rounded border">
                              <p className="text-sm text-gray-700">
                                {question.userAnswer}
                              </p>
                            </div>
                          )}

                          {question.attachments &&
                            question.attachments.length > 0 && (
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-700">
                                  Attachments:
                                </p>
                                {question.attachments.map(
                                  (attachment, attachIndex) => (
                                    <div
                                      key={attachIndex}
                                      className="flex items-center gap-2 text-sm text-blue-600"
                                    >
                                      <FileText className="h-4 w-4" />
                                      {attachment}
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {!selectedForm.questions && selectedForm.status === "draft" && (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>This is a draft form with no submitted responses yet.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}

          <div className="flex justify-end pt-4 border-t">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
