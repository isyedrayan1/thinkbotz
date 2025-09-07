import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "Coding Competition",
    date: "March 20, 2024",
    coordinators: ["John Doe", "Jane Smith"],
    registrations: 45
  },
  {
    id: 2,
    title: "Cultural Night",
    date: "March 25, 2024",
    coordinators: ["Alex Johnson", "Sarah Wilson"],
    registrations: 78
  },
  {
    id: 3,
    title: "Research Symposium",
    date: "April 2, 2024",
    coordinators: ["Dr. Brown", "Prof. Davis"],
    registrations: 32
  }
];
export default function AnnouncementSec() {
  return (
  <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Upcoming Events</h2>
              <p className="text-muted-foreground">Don't miss out on these exciting events</p>
            </div>
            <Button asChild variant="outline" className="hidden md:inline-flex rounded-2xl">
              <Link to="/events">View All Events</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Calendar className="w-5 h-5 text-brand-purple" />
                    <span className="text-sm font-medium text-brand-brinjal">
                      {event.registrations} registered
                    </span>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription>{event.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Coordinators:</p>
                    <div className="flex flex-wrap gap-2">
                      {event.coordinators.map((coordinator, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-brand-lavender text-brand-brinjal px-2 py-1 rounded-full"
                        >
                          {coordinator}
                        </span>
                      ))}
                    </div>
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