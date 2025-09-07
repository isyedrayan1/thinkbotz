import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Users, 
  Image, 
  Bell, 
  TrendingUp, 
  Eye, 
  Plus,
  ArrowUpRight,
  Clock,
  Star
} from "lucide-react";

const dashboardStats = [
  {
    title: "Total Events",
    value: "24",
    change: "+12%",
    changeType: "positive" as const,
    icon: Calendar,
    description: "Events this year"
  },
  {
    title: "Active Members",
    value: "156",
    change: "+8%",
    changeType: "positive" as const,
    icon: Users,
    description: "Registered members"
  },
  {
    title: "Gallery Photos",
    value: "342",
    change: "+25%",
    changeType: "positive" as const,
    icon: Image,
    description: "Photos uploaded"
  },
  {
    title: "Announcements",
    value: "18",
    change: "+3",
    changeType: "positive" as const,
    icon: Bell,
    description: "This month"
  }
];

const recentEvents = [
  {
    id: 1,
    title: "Tech Fest 2024",
    date: "March 15, 2024",
    registrations: 156,
    status: "Active",
    type: "Technical"
  },
  {
    id: 2,
    title: "Coding Competition",
    date: "March 20, 2024",
    registrations: 89,
    status: "Active",
    type: "Technical"
  },
  {
    id: 3,
    title: "Cultural Night",
    date: "March 25, 2024",
    registrations: 234,
    status: "Active",
    type: "Cultural"
  }
];

const recentActivities = [
  {
    id: 1,
    type: "event",
    message: "New registration for Tech Fest 2024",
    time: "2 minutes ago",
    user: "John Doe"
  },
  {
    id: 2,
    type: "gallery",
    message: "Photos uploaded to Cultural Night gallery",
    time: "15 minutes ago",
    user: "Admin"
  },
  {
    id: 3,
    type: "announcement",
    message: "New announcement published",
    time: "1 hour ago",
    user: "Sarah Johnson"
  },
  {
    id: 4,
    type: "event",
    message: "Event 'Workshop: AI Basics' created",
    time: "2 hours ago",
    user: "Michael Brown"
  }
];

const quickActions = [
  {
    title: "Create Event",
    description: "Add a new event",
    href: "/admin/events/new",
    icon: Calendar,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Upload Photos",
    description: "Add to gallery",
    href: "/admin/gallery/upload",
    icon: Image,
    color: "from-green-500 to-green-600"
  },
  {
    title: "New Announcement",
    description: "Publish announcement",
    href: "/admin/announcements/new",
    icon: Bell,
    color: "from-purple-500 to-purple-600"
  }
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with CDSA.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="w-8 h-8 bg-brand-lavender rounded-lg flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-brand-brinjal" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs">
                <span className={`flex items-center ${
                  stat.changeType === 'positive' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </span>
                <span className="text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                asChild
                variant="outline"
                className="h-auto p-4 justify-start hover:shadow-md transition-all"
              >
                <Link to={action.href}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-sm text-muted-foreground">{action.description}</div>
                    </div>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Events</CardTitle>
              <CardDescription>Latest events and their status</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to="/admin/events">
                View All
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-brand-lavender/30 rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{event.date}</span>
                    <span>•</span>
                    <Users className="w-3 h-3" />
                    <span>{event.registrations} registered</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Badge variant="secondary">{event.type}</Badge>
                  <Badge className="text-xs" variant="outline">{event.status}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-brand-purple rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{activity.user}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}