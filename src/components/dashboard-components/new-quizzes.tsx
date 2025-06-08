import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NewQuizItem = ({
  title,
  category,
}: {
  title: string;
  category: string;
}) => (
  <div className="flex items-center justify-between hover:bg-muted/50 p-2 rounded-md">
    <div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-muted-foreground">{category}</p>
    </div>
    <Button variant="outline" size="sm">
      Mulai
    </Button>
  </div>
);

export const NewQuizzes = () => (
  <Card>
    <CardHeader>
      <CardTitle>Kuis & Form Baru</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-4">
      <NewQuizItem
        title="Kuis Pengetahuan Umum #5"
        category="Pengetahuan Umum"
      />
      <NewQuizItem title="Feedback Pengalaman Pengguna" category="Survey" />
      <NewQuizItem
        title="Tes Psikologi: Tipe Kepribadian"
        category="Psikotes"
      />
    </CardContent>
  </Card>
);
