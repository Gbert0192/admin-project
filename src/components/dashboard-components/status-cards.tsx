import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Target, Send } from "lucide-react";

export const StatusCards = () => (
  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
    <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white transform hover:scale-105 transition-all duration-300">
      <CheckCircle2 className="absolute -right-4 -bottom-4 h-28 w-28 text-white/10" />
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Kuis Selesai</CardTitle>
        <CheckCircle2 className="h-5 w-5 text-white" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">12</div>
        <p className="text-xs text-white/80">dari 50 kuis tersedia</p>
      </CardContent>
    </Card>

    <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white transform hover:scale-105 transition-all duration-300">
      <Target className="absolute -right-4 -bottom-4 h-28 w-28 text-white/10" />
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Rata-Rata Skor</CardTitle>
        <Target className="h-5 w-5 text-white" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">85%</div>
        <p className="text-xs text-white/80">dari semua kuis yang dinilai</p>
      </CardContent>
    </Card>

    <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white transform hover:scale-105 transition-all duration-300">
      <Send className="absolute -right-4 -bottom-4 h-28 w-28 text-white/10" />
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Form Terkirim</CardTitle>
        <Send className="h-5 w-5 text-white" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">3</div>
        <p className="text-xs text-white/80">menunggu untuk direview</p>
      </CardContent>
    </Card>
  </div>
);
