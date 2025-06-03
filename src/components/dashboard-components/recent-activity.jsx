"use client";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const formData = [
  { form: "Tugas 1", response: 8 },
  { form: "Tugas 2", response: 15 },
  { form: "Tugas 3", response: 5 },
  { form: "Tugas 4", response: 11 },
  { form: "Tugas 5", response: 5 },
  { form: "Tugas 6", response: 9 },
  { form: "Tugas 7", response: 35 },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Form Responses</CardTitle>
      </CardHeader>
      <CardContent>
        {formData.map((item, index) => {
          const percentage = Math.min((item.response / 20) * 100, 100);
          return (
            <div className="mb-4" key={index}>
              <div className="flex justify-between mb-1">
                <span className="font-medium">{item.form}</span>
                <span className="text-sm text-gray-500">
                  {item.response} responses
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
