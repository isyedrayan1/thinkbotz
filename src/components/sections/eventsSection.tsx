import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calendar, ExternalLink } from "lucide-react";
import { hackathons } from "../../data/eventsdetailed";
import { Badge } from "@/components/ui/badge";

// Use isUpcoming boolean for status, sort by date descending, show only completed
const upcomingEvents = hackathons
  .filter(event => !event.isUpcoming)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

export default function AnnouncementSec() {
  // Status badge helper
  const getStatusBadge = (isUpcoming: boolean) => (
    <Badge className={isUpcoming ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"}>
      {isUpcoming ? "Upcoming" : "Completed"}
    </Badge>
  );

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Past Events</h2>
            <p className="text-muted-foreground">Explore our recently concluded events</p>
          </div>
          <Button
            asChild
            className="hidden md:inline-flex rounded-2xl bg-gradient-to-r from-brand-purple to-brand-brinjal text-white font-semibold hover:from-brand-brinjal hover:to-brand-purple"
          >
            <Link to="/events">View All Events</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {upcomingEvents.map((event, idx) => (
            <Card
              key={event.id}
              className={
                "hover:shadow-md transition-shadow bg-white" +
                (event.featured ? " border-l-4 border-l-brand-purple" : "")
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Calendar className="w-5 h-5 text-brand-purple" />
                  {event.featured && (
                    <span className="text-xs px-2 py-1 rounded-full bg-brand-purple text-white font-semibold ml-2">
                      Featured
                    </span>
                  )}
                  {getStatusBadge(event.isUpcoming)}
                </div>
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription>
                  {new Date(event.date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {event.coordinators.map((coordinator, index) => (
                      <span
                        key={index}
                        className={
                          "text-xs px-2 py-1 rounded-full " +
                          (coordinator.role === "faculty"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-pink-100 text-pink-800")
                        }
                      >
                        {coordinator.name}
                        {coordinator.role === "Student" && (
                          <span className="ml-1 text-[10px] text-muted-foreground">{coordinator.class}</span>
                        )}
                        <span className="ml-1">
                          {coordinator.role === "faculty" ? (
                            <Badge variant="secondary" className="text-[10px] bg-blue-100 text-blue-800 ml-1">Faculty</Badge>
                          ) : (
                            <Badge variant="secondary" className="text-[10px] bg-pink-100 text-pink-800 ml-1">Student</Badge>
                          )}
                        </span>
                      </span>
                    ))}
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full mt-4 rounded-2xl"
                  >
                    <Link to={`/events/${event.id}`}>
                      View Details
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center md:hidden">
          <Button asChild className="bg-gradient-to-r from-brand-purple to-brand-brinjal text-white rounded-2xl">
            <Link to="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}