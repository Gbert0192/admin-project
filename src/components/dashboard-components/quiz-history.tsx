import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

const HistoryItem = ({
  title,
  status,
  detail,
}: {
  title: string;
  status: "Dinilai" | "Terkirim" | "Draft";
  detail: string;
}) => (
  <div className="flex items-center gap-4 hover:bg-muted/50 p-2 rounded-md">
    <div className="h-10 w-10 bg-secondary rounded-md flex items-center justify-center">
      <FileText className="h-5 w-5 text-muted-foreground" />
    </div>
    <div className="flex-1">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">{detail}</p>
    </div>
    <Badge variant={status === "Dinilai" ? "default" : "secondary"}>
      {status}
    </Badge>
  </div>
);

export const QuizHistory = () => (
  <Card>
    <CardHeader>
      <CardTitle>Riwayat Pengerjaan</CardTitle>
      <CardDescription>
        Lihat kembali kuis dan form yang telah Anda isi.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="all"
            className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Semua
          </TabsTrigger>
          <TabsTrigger
            value="graded"
            className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Sudah Dinilai
          </TabsTrigger>
          <TabsTrigger
            value="draft"
            className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Draft
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="space-y-4 mt-4">
            <HistoryItem
              title="Tes Kemampuan Verbal"
              status="Dinilai"
              detail="Skor: 95/100"
            />
            <HistoryItem
              title="Survey Kepuasan Pengguna"
              status="Terkirim"
              detail="Terkirim pada 5 Juni 2025"
            />
            <HistoryItem
              title="Kuis Logika Dasar"
              status="Draft"
              detail="Disimpan pada 7 Juni 2025"
            />
          </div>
        </TabsContent>
        <TabsContent value="graded">
          <div className="space-y-4 mt-4">
            <HistoryItem
              title="Tes Kemampuan Verbal"
              status="Dinilai"
              detail="Skor: 95/100"
            />
          </div>
        </TabsContent>
        <TabsContent value="draft">
          <div className="space-y-4 mt-4">
            <HistoryItem
              title="Kuis Logika Dasar"
              status="Draft"
              detail="Disimpan pada 7 Juni 2025"
            />
          </div>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
);