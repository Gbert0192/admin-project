"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, PieChart, BarChart3 } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { OverviewChart } from "@/components/ui/overview-chart";
import { Rangking } from "@/components/ui/rangking-stats";
import { RecentActivity } from "@/components/ui/recent-activity";
import { TopTerbaik } from "@/components/ui/top-terbaik";
import { CreateForm } from '@/components/ui/CreateForm';

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
  <h2 className="text-2xl font-bold">Admin Dashboard</h2>
  <CreateForm />
</div>


      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Forms" value="124" icon="form" />
        <StatCard title="Total Responsens" value="2,493" icon="response" />
        <StatCard title="Total User" value="200" icon="response" />
        <StatCard title="Avg Completion Task" value="78%" icon="rate" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              Response view
            </CardTitle>
          </CardHeader>
          <CardContent>
            <OverviewChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Rangking Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Rangking />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Top Performing Forms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TopTerbaik />
          </CardContent>
        </Card>

        <RecentActivity />
      </div>
    </div>
  );
}
