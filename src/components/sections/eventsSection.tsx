import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calendar, ExternalLink } from "lucide-react";
import { hackathons } from "@/pages/EventDetail"; // Use the real event data

export default function AnnouncementSec() {
  // Get only upcoming events, sorted by date ascending
  const upcomingEvents = hackathons
    .filter(event => event.status === "Upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Upcoming Events</h2>
            <p className="text-muted-foreground">Don't miss out on these exciting events</p>
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
                (idx === 0 && event.featured
                  ? " border-l-4 border-l-brand-purple"
                  : "")
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Calendar className="w-5 h-5 text-brand-purple" />
                  {event.featured && idx === 0 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-brand-purple text-white font-semibold ml-2">
                      Featured
                    </span>
                  )}
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
                        className="text-xs bg-brand-lavender text-brand-brinjal px-2 py-1 rounded-full"
                      >
                        {coordinator.name}
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