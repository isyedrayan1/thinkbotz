import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Calendar, Clock, Users, MapPin, Search, Filter, ExternalLink } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Annual Tech Fest 2024",
    description: "Join us for the biggest tech event of the year with coding competitions, workshops, and networking opportunities.",
    date: "March 15-17, 2024",
    time: "9:00 AM - 6:00 PM",
    location: "Main Auditorium",
    coordinators: ["John Doe", "Jane Smith", "Alex Johnson"],
    registrations: 156,
    maxRegistrations: 200,
    category: "Technical",
    status: "Upcoming",
    featured: true
  },
  {
    id: 2,
    title: "Coding Competition",
    description: "Test your programming skills in this exciting coding challenge with cash prizes and internship opportunities.",
    date: "March 20, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Computer Lab A",
    coordinators: ["Michael Brown", "Sarah Wilson"],
    registrations: 89,
    maxRegistrations: 100,
    category: "Technical",
    status: "Upcoming",
    featured: false
  },
  {
    id: 3,
    title: "Cultural Night",
    description: "Celebrate diversity and talent with performances, music, dance, and cultural exhibitions from around the world.",
    date: "March 25, 2024",
    time: "6:00 PM - 10:00 PM",
    location: "Outdoor Amphitheater",
    coordinators: ["Emily Chen", "David Garcia"],
    registrations: 234,
    maxRegistrations: 300,
    category: "Cultural",
    status: "Upcoming",
    featured: true
  },
  {
    id: 4,
    title: "Research Symposium",
    description: "Present your research projects and learn from peers in this academic showcase of innovation and discovery.",
    date: "April 2, 2024",
    time: "1:00 PM - 5:00 PM",
    location: "Conference Hall",
    coordinators: ["Dr. Brown", "Prof. Davis", "Lisa Thompson"],
    registrations: 67,
    maxRegistrations: 150,
    category: "Academic",
    status: "Upcoming",
    featured: false
  },
  {
    id: 5,
    title: "Sports Tournament",
    description: "Inter-department sports competition featuring cricket, basketball, football, and more exciting games.",
    date: "February 28, 2024",
    time: "8:00 AM - 6:00 PM",
    location: "Sports Complex",
    coordinators: ["Ryan Wilson", "Amanda Johnson"],
    registrations: 180,
    maxRegistrations: 200,
    category: "Sports",
    status: "Completed",
    featured: false
  },
  {
    id: 6,
    title: "Workshop: AI & Machine Learning",
    description: "Hands-on workshop covering the fundamentals of AI and ML with practical projects and industry insights.",
    date: "April 10, 2024",
    time: "2:00 PM - 6:00 PM",
    location: "Lab B-102",
    coordinators: ["Dr. AI Expert", "Tech Lead"],
    registrations: 45,
    maxRegistrations: 60,
    category: "Workshop",
    status: "Upcoming",
    featured: false
  }
];

const categories = ["All", "Technical", "Cultural", "Academic", "Sports", "Workshop"];
const statuses = ["All", "Upcoming", "Completed", "Cancelled"];

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || event.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const featuredEvents = filteredEvents.filter(event => event.featured);
  const regularEvents = filteredEvents.filter(event => !event.featured);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Upcoming":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Upcoming</Badge>;
      case "Completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "Cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Technical":
        return "bg-blue-100 text-blue-800";
      case "Cultural":
        return "bg-purple-100 text-purple-800";
      case "Academic":
        return "bg-green-100 text-green-800";
      case "Sports":
        return "bg-orange-100 text-orange-800";
      case "Workshop":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Events</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover exciting events, workshops, and competitions organized by our association
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <span className="w-2 h-8 bg-gradient-to-b from-brand-purple to-brand-brinjal rounded-full mr-3"></span>
              Featured Events
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredEvents.map(event => (
                <Card key={event.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-brand-purple">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getCategoryColor(event.category)}>{event.category}</Badge>
                          {getStatusBadge(event.status)}
                        </div>
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{event.registrations}/{event.maxRegistrations} registered</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Coordinators:</p>
                      <div className="flex flex-wrap gap-2">
                        {event.coordinators.map((coordinator, index) => (
                          <span key={index} className="text-xs bg-brand-lavender text-brand-brinjal px-2 py-1 rounded-full">
                            {coordinator}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button asChild className="flex-1 bg-gradient-to-r from-brand-purple to-brand-brinjal text-white rounded-2xl">
                        <Link to={`/events/${event.id}`}>View Details</Link>
                      </Button>
                      {event.status === "Upcoming" && (
                        <Button variant="outline" size="sm" className="rounded-2xl">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Events */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <span className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mr-3"></span>
            All Events ({filteredEvents.length})
          </h2>
          
          {filteredEvents.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="space-y-4">
                <Filter className="w-12 h-12 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-semibold">No events found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularEvents.concat(featuredEvents).map(event => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge className={getCategoryColor(event.category)}>{event.category}</Badge>
                        {getStatusBadge(event.status)}
                      </div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription className="text-sm line-clamp-2">
                        {event.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{event.registrations}/{event.maxRegistrations}</span>
                      </div>
                    </div>
                    
                    <Button asChild variant="outline" className="w-full rounded-2xl">
                      <Link to={`/events/${event.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}