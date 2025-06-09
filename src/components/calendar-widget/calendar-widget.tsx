"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

const events = [
  {
    date: new Date("2025-06-10"),
    title: "Final Project Presentation",
  },
  {
    date: new Date("2025-06-10"),
    title: "Meeting with Client",
  },
  {
    date: new Date("2025-06-22"),
    title: "Form Submission Deadline",
  },
];

export const CalendarWidget = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date("2025-06-08")
  );

  const selectedDayEvents = events.filter(
    (event) =>
      selectedDate &&
      format(event.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
  );

  return (
    <Card className="shadow-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">
          {selectedDate
            ? format(selectedDate, "d MMM", { locale: enUS }).toUpperCase()
            : ""}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="p-0"
              classNames={{
                head_cell: "w-9 text-muted-foreground rounded-md",
                cell: "h-9 w-9 text-center text-sm p-0 relative",
              }}
              modifiers={{
                weekend: (day) => day.getDay() === 0 || day.getDay() === 6,
              }}
              modifiersClassNames={{
                weekend: "text-red-500",
              }}
            />
          </div>
          <Separator />
          <div className="min-h-[100px] flex flex-col justify-center">
            {selectedDayEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDayEvents.map((event, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 mt-2 rounded-full bg-primary"></div>
                    <p className="font-semibold">{event.title}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="font-semibold">No events</p>
                <p className="text-sm text-muted-foreground">Enjoy your day!</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
