"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Trophy,
  Medal,
  Award,
  Star,
  TrendingUp,
  Search,
  Filter,
  Crown,
  Zap,
  Target,
  BookOpen,
} from "lucide-react";

interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  totalPoints: number;
  weeklyPoints: number;
  monthlyPoints: number;
  rank: number;
  weeklyRank: number;
  monthlyRank: number;
  level: number;
  completedQuizzes: number;
  averageScore: number;
  streak: number;
  badges: string[];
  department: string;
  joinDate: string;
  lastActive: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  pointsRequired: number;
}

const achievements: Achievement[] = [
  {
    id: "1",
    name: "Quiz Master",
    description: "Complete 50 quizzes",
    icon: "🎯",
    rarity: "epic",
    pointsRequired: 5000,
  },
  {
    id: "2",
    name: "Perfect Score",
    description: "Get 100% on 10 quizzes",
    icon: "⭐",
    rarity: "rare",
    pointsRequired: 2000,
  },
  {
    id: "3",
    name: "Speed Demon",
    description: "Complete quiz in under 5 minutes",
    icon: "⚡",
    rarity: "common",
    pointsRequired: 500,
  },
  {
    id: "4",
    name: "Consistency King",
    description: "30-day streak",
    icon: "🔥",
    rarity: "legendary",
    pointsRequired: 10000,
  },
];

const mockUsers: LeaderboardUser[] = [
  {
    id: "1",
    name: "Gilbert",
    avatar: "/placeholder.svg?height=40&width=40",
    totalPoints: 15420,
    weeklyPoints: 1250,
    monthlyPoints: 4800,
    rank: 1,
    weeklyRank: 1,
    monthlyRank: 1,
    level: 28,
    completedQuizzes: 156,
    averageScore: 94.5,
    streak: 45,
    badges: ["Quiz Master", "Perfect Score", "Consistency King"],
    department: "Teknik Informatika",
    joinDate: "2024-01-15",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Felix",
    avatar: "/placeholder.svg?height=40&width=40",
    totalPoints: 14890,
    weeklyPoints: 980,
    monthlyPoints: 4200,
    rank: 2,
    weeklyRank: 3,
    monthlyRank: 2,
    level: 26,
    completedQuizzes: 142,
    averageScore: 91.2,
    streak: 23,
    badges: ["Quiz Master", "Speed Demon"],
    department: "Teknik Informatika",
    joinDate: "2024-02-01",
    lastActive: "1 hour ago",
  },
  {
    id: "3",
    name: "Calvin",
    avatar: "/placeholder.svg?height=40&width=40",
    totalPoints: 13750,
    weeklyPoints: 1180,
    monthlyPoints: 3900,
    rank: 3,
    weeklyRank: 2,
    monthlyRank: 3,
    level: 24,
    completedQuizzes: 128,
    averageScore: 89.8,
    streak: 18,
    badges: ["Perfect Score", "Speed Demon"],
    department: "Teknik Informatika",
    joinDate: "2024-01-20",
    lastActive: "30 minutes ago",
  },
  {
    id: "4",
    name: "Egip",
    avatar: "/placeholder.svg?height=40&width=40",
    totalPoints: 12980,
    weeklyPoints: 850,
    monthlyPoints: 3600,
    rank: 4,
    weeklyRank: 5,
    monthlyRank: 4,
    level: 22,
    completedQuizzes: 115,
    averageScore: 87.3,
    streak: 12,
    badges: ["Quiz Master"],
    department: "Teknik Informatika",
    joinDate: "2024-02-10",
    lastActive: "4 hours ago",
  },
  {
    id: "5",
    name: "John",
    avatar: "/placeholder.svg?height=40&width=40",
    totalPoints: 11650,
    weeklyPoints: 1050,
    monthlyPoints: 3200,
    rank: 5,
    weeklyRank: 4,
    monthlyRank: 5,
    level: 20,
    completedQuizzes: 98,
    averageScore: 92.1,
    streak: 8,
    badges: ["Perfect Score"],
    department: "Teknik Informatika",
    joinDate: "2024-03-01",
    lastActive: "1 day ago",
  },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="h-6 w-6 text-yellow-500" />;
    case 2:
      return <Medal className="h-6 w-6 text-gray-400" />;
    case 3:
      return <Award className="h-6 w-6 text-amber-600" />;
    default:
      return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
  }
};

const getBadgeColor = (badge: string) => {
  switch (badge) {
    case "Quiz Master":
      return "bg-purple-100 text-purple-800";
    case "Perfect Score":
      return "bg-green-100 text-green-800";
    case "Speed Demon":
      return "bg-blue-100 text-blue-800";
    case "Consistency King":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "border-gray-300 bg-gray-50";
    case "rare":
      return "border-blue-300 bg-blue-50";
    case "epic":
      return "border-purple-300 bg-purple-50";
    case "legendary":
      return "border-yellow-300 bg-yellow-50";
    default:
      return "border-gray-300 bg-gray-50";
  }
};

export default function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("overall");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDepartment =
      departmentFilter === "all" || user.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const departments = Array.from(
    new Set(mockUsers.map((user) => user.department))
  );

  const getCurrentRanking = (user: LeaderboardUser) => {
    switch (activeTab) {
      case "weekly":
        return user.weeklyRank;
      case "monthly":
        return user.monthlyRank;
      default:
        return user.rank;
    }
  };

  const getCurrentPoints = (user: LeaderboardUser) => {
    switch (activeTab) {
      case "weekly":
        return user.weeklyPoints;
      case "monthly":
        return user.monthlyPoints;
      default:
        return user.totalPoints;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <h1 className="text-4xl font-bold text-gray-900">Leaderboard</h1>
          <Trophy className="h-8 w-8 text-yellow-500" />
        </div>
        <p className="text-gray-600 text-lg">
          Compete with your peers and climb to the top!
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-8 w-8 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">1,247</div>
            <div className="text-sm text-gray-600">Total Participants</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="h-8 w-8 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">3,456</div>
            <div className="text-sm text-gray-600">Quizzes Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Zap className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">89.2%</div>
            <div className="text-sm text-gray-600">Average Score</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">45</div>
            <div className="text-sm text-gray-600">Days Avg Streak</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Jurusan</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Leaderboard */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overall">Overall</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-6">
                  <div className="space-y-4">
                    {filteredUsers.map((user, index) => (
                      <Card
                        key={user.id}
                        className={`transition-all hover:shadow-md ${index < 3 ? "ring-2 ring-yellow-200" : ""}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center w-12 h-12">
                                {getRankIcon(getCurrentRanking(user))}
                              </div>
                              <Avatar className="h-12 w-12">
                                <AvatarImage
                                  src={user.avatar ?? "/placeholder.svg"}
                                  alt={user.name}
                                />
                                <AvatarFallback>
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-gray-900">
                                    {user.name}
                                  </h3>
                                </div>
                                <p className="text-sm text-gray-600">
                                  {user.department}
                                </p>
                                <div className="flex gap-1 mt-1">
                                  {user.badges.slice(0, 2).map((badge) => (
                                    <Badge
                                      key={badge}
                                      className={`text-xs ${getBadgeColor(badge)}`}
                                    >
                                      {badge}
                                    </Badge>
                                  ))}
                                  {user.badges.length > 2 && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      +{user.badges.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-blue-600">
                                {getCurrentPoints(user).toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-600">
                                points
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm">
                                  {user.averageScore}% avg
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Progress to next level</span>
                              <span>
                                {user.level * 500}/{(user.level + 1) * 500}
                              </span>
                            </div>
                            <Progress
                              value={
                                ((user.level * 500) /
                                  ((user.level + 1) * 500)) *
                                100
                              }
                              className="h-2"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                Hall of Fame
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockUsers.slice(0, 3).map((user, index) => (
                <div key={user.id} className="flex items-center gap-3">
                  <div className="flex-shrink-0">{getRankIcon(index + 1)}</div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.avatar ?? "/placeholder.svg"}
                      alt={user.name}
                    />
                    <AvatarFallback className="text-xs">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {user.totalPoints.toLocaleString()} pts
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-500" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-lg border-2 ${getRarityColor(achievement.rarity)}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">
                        {achievement.name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {achievement.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs capitalize">
                          {achievement.rarity}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {achievement.pointsRequired.toLocaleString()} pts
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
