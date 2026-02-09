import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Calendar, Search, Filter, ExternalLink } from "lucide-react";
import { hackathons } from "../data/eventsdetailed";

const statuses = ["All", "Upcoming", "Completed"];

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Use isUpcoming boolean for status filtering
  const filteredEvents = hackathons.filter(event => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesStatus = true;
    if (selectedStatus === "Upcoming") matchesStatus = event.isUpcoming;
    else if (selectedStatus === "Completed") matchesStatus = !event.isUpcoming;
    return matchesSearch && matchesStatus;
  });

  // Featured and regular events
  const featuredEvents = filteredEvents.filter(event => event.featured);
  const regularEvents = filteredEvents.filter(event => !event.featured);

  // Status badge helper
  const getStatusBadge = (isUpcoming: boolean) => (
    <Badge className={isUpcoming ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"}>
      {isUpcoming ? "Upcoming" : "Completed"}
    </Badge>
  );

  return (
    <div className="min-h-screen py-12 md:py-16 pt-20 md:pt-28 pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Events</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover exciting hackathons, workshops, and competitions organized by our association
          </p>
        </div>

        {/* Search and Status Filter */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8 mb-10 md:mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <div className="mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 flex items-center">
              <span className="w-2 h-8 bg-gradient-to-b from-brand-purple to-brand-brinjal rounded-full mr-3"></span>
              Featured Events
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8\">
              {featuredEvents.map(event => (
                <Card key={event.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-brand-purple">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                        <CardDescription className="text-sm leading-relaxed">
                          {event.description}
                        </CardDescription>
                      </div>
                      <div>
                        {getStatusBadge(event.isUpcoming)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button asChild className="flex-1 bg-gradient-to-r from-brand-purple to-brand-brinjal text-white rounded-2xl">
                        <Link to={`/events/${event.id}`}>View Details</Link>
                      </Button>
                      {event.isUpcoming && event.registrationLink && (
                        <Button asChild variant="outline" size="sm" className="rounded-2xl">
                          <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 flex items-center\">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8\">
              {regularEvents.concat(featuredEvents).map(event => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription className="text-sm line-clamp-2">
                        {event.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      {getStatusBadge(event.isUpcoming)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(event.date).toLocaleDateString()}
                        </span>
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