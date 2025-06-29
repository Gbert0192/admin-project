"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Target } from "lucide-react";
import { FormAttemptStatsResponse } from "@/lib/types/dashboard";

interface FormAttemptStatsProps {
  data: FormAttemptStatsResponse;
}

const FormAttemptStats: React.FC<FormAttemptStatsProps> = ({ data }) => {
  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <span className="text-slate-800 dark:text-slate-200">
              Form Attempts
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
              User attempts per form
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 flex-1 flex flex-col">
        <div className="space-y-4 flex-1 overflow-y-auto">
          {data.huawei_forms.length === 0 && data.kahoot_forms.length === 0 ? (
            /* No Data State */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                  No Form Data Available
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Create some Huawei or Kahoot forms to see user attempt
                  statistics here.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Huawei Forms Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Huawei Forms
                  </h3>
                </div>
                {data.huawei_forms.length === 0 ? (
                  <div className="text-center py-4 text-slate-500 dark:text-slate-400 text-sm">
                    No Huawei forms available yet
                  </div>
                ) : (
                  <div className="space-y-2">
                    {data.huawei_forms.map((form) => (
                      <div
                        key={form.form_id}
                        className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div
                            className="font-medium text-sm text-slate-900 dark:text-slate-100 line-clamp-2"
                            title={form.form_title}
                          >
                            {form.form_title}
                          </div>
                        </div>
                        <div className="ml-3 flex-shrink-0">
                          <span className="inline-flex items-center justify-center w-7 h-7 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                            {form.total_user_attempts}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Kahoot Forms Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Kahoot Forms
                  </h3>
                </div>
                {data.kahoot_forms.length === 0 ? (
                  <div className="text-center py-4 text-slate-500 dark:text-slate-400 text-sm">
                    No Kahoot forms available yet
                  </div>
                ) : (
                  <div className="space-y-2">
                    {data.kahoot_forms.map((form) => (
                      <div
                        key={form.form_id}
                        className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div
                            className="font-medium text-sm text-slate-900 dark:text-slate-100 line-clamp-2"
                            title={form.form_title}
                          >
                            {form.form_title}
                          </div>
                        </div>
                        <div className="ml-3 flex-shrink-0">
                          <span className="inline-flex items-center justify-center w-7 h-7 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">
                            {form.total_user_attempts}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FormAttemptStats;
