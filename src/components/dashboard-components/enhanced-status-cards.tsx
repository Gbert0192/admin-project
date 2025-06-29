"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileText, Target, TrendingUp, Users } from "lucide-react";
import { BasicStatistics } from "@/lib/types/dashboard";

interface EnhancedStatusCardsProps {
  data: BasicStatistics;
}

const EnhancedStatusCards: React.FC<EnhancedStatusCardsProps> = ({ data }) => {
  const cardData = [
    {
      title: "Total Huawei Forms",
      value: data.total_huawei_forms,
      change: "Assignment & Quiz Forms",
      icon: FileText,
      gradient: "from-blue-500 to-blue-600",
      iconColor: "text-blue-200",
      textColor: "text-blue-100",
    },
    {
      title: "Total Kahoot Forms",
      value: data.total_kahoot_forms,
      change: "Interactive Quiz Forms",
      icon: TrendingUp,
      gradient: "from-emerald-500 to-emerald-600",
      iconColor: "text-emerald-200",
      textColor: "text-emerald-100",
    },
    {
      title: "Total Users",
      value: data.total_users,
      change: "Registered Students",
      icon: Users,
      gradient: "from-purple-500 to-purple-600",
      iconColor: "text-purple-200",
      textColor: "text-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cardData.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card
            key={index}
            className={`relative overflow-hidden border-0 shadow-lg bg-gradient-to-br ${card.gradient} text-white transform hover:scale-105 transition-all duration-300`}
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`${card.textColor} text-xs sm:text-sm font-medium`}
                  >
                    {card.title}
                  </p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                    {card.value}
                  </p>
                  <p className={`${card.textColor} text-xs mt-1`}>
                    {card.change}
                  </p>
                </div>
                <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${card.iconColor}`} />
              </div>
              <div className="absolute -right-4 -bottom-4 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full"></div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default EnhancedStatusCards;
