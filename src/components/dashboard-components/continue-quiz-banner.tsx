import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlayCircle } from "lucide-react";

export const ContinueQuizBanner = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-4">
      <div>
        <CardDescription>Belum selesai?</CardDescription>
        <CardTitle className="text-xl">Kuis Logika Dasar - Draft</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <Button>
        <PlayCircle className="mr-2 h-4 w-4" /> Lanjutkan Mengerjakan
      </Button>
    </CardContent>
  </Card>
);
