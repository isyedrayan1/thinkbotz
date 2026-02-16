import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  ExternalLink,
  ArrowLeft,
  Trophy,
  Share2,
  Heart
} from "lucide-react";
import { hackathons } from "../data/eventsdetailed";

// Sorted by id ascending, removed gallery, added class for coordinators, category removed, status isUpcoming boolean


function formatTime12Hour(time: string) {
  if (!time) return "";
  const [hour, minute] = time.split(":").map(Number);
  let h = hour % 12 || 12;
  const ampm = hour < 12 ? "AM" : "PM";
  return `${h}:${minute.toString().padStart(2, "0")} ${ampm}`;
}

export default function EventDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Ensure events are sorted by id ascending
  const sortedEvents = [...hackathons].sort((a, b) => a.id - b.id);
  const event = sortedEvents.find(e => String(e.id) === id);

  if (!event) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist.</p>
          <Button asChild variant="outline">
            <Link to="/events">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleRegister = () => {
    setShowForm(true);
  };

  const handleShare = () => {
    navigator.share?.({
      title: event.title,
      text: event.description,
      url: window.location.href,
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Event link has been copied to clipboard.",
      });
    });
  };

  // Responsive badge for status
  const statusBadge = (
    <Badge className={event.isUpcoming ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"}>
      {event.isUpcoming ? "Upcoming" : "Completed"}
    </Badge>
  );

  // Responsive iframe height based on screen size
  const getIframeHeight = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 500) return 540; // Mobile
      if (window.innerWidth < 900) return 700; // Tablet
    }
    return 800; // Desktop
  };

  return (
    <div className="min-h-screen py-8 md:py-12 pt-20 md:pt-28 pb-16 md:pb-20">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Back Button and Apply Now / Event Report */}
        <div className="mb-4 flex flex-col sm:flex-row items-center gap-2">
          <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
            <Link to="/events">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          {event.isUpcoming ? (
            <Button
              onClick={handleRegister}
              className="bg-gradient-to-r from-brand-purple to-brand-brinjal text-white font-bold rounded-2xl w-full sm:w-auto ml-0 sm:ml-auto"
              disabled={isRegistered}
            >
              {isRegistered ? "Applied ✓" : "Apply Now"}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full sm:w-auto ml-0 sm:ml-auto"
              disabled
            >
              Event Completed
            </Button>
          )}
        </div>

        {/* Google Form Popup Dialog */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent
            className="w-full max-w-lg p-0 overflow-hidden flex flex-col items-center justify-center rounded-2xl"
            style={{
              minHeight: 0,
              width: "100%",
              maxWidth: "95vw",
              background: "#fff",
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)"
            }}
          >
            <div className="w-full flex flex-col items-center">
              <div className="w-full flex justify-end p-2">
                <button
                  aria-label="Close"
                  className="text-gray-500 hover:text-brand-brinjal text-xl font-bold"
                  onClick={() => setShowForm(false)}
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  ×
                </button>
              </div>
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSdyykizoZ7W3UWYWAfnM7FzwGQNlgCralxDgEkXKstbbyPIbg/viewform?embedded=true"
                width="100%"
                height={getIframeHeight()}
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Event Registration"
                style={{
                  border: "none",
                  minHeight: 400,
                  maxHeight: "90vh",
                  width: "100%",
                  borderRadius: "0 0 1rem 1rem",
                  background: "#fff"
                }}
                allowFullScreen
              >
                Loading…
              </iframe>
            </div>
          </DialogContent>
        </Dialog>

        {/* Main Event Card */}
        <Card className="mb-4">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  {event.featured && <Badge variant="outline">Featured</Badge>}
                  {statusBadge}
                </div>
                <CardTitle className="text-2xl sm:text-3xl">{event.title}</CardTitle>
                <CardDescription className="text-base sm:text-lg">
                  {event.description}
                </CardDescription>
              </div>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className={isLiked ? "text-red-500" : ""}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Event Details */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-lavender rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-brand-brinjal" />
                </div>
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-lavender rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-brand-brinjal" />
                </div>
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-sm text-muted-foreground">
                    {formatTime12Hour(event.time)} - {formatTime12Hour(event.endTime)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 sm:col-span-2">
                <div className="w-10 h-10 bg-brand-lavender rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-brand-brinjal" />
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{event.location}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Long Description */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>About This Event</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{event.longDescription}</p>
          </CardContent>
        </Card>

        {/* Schedule */}
        {event.schedule && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Event Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {event.schedule.map((day, index) => (
                  <div key={index} className="border-l-4 border-l-brand-purple pl-4">
                    <h4 className="font-semibold text-lg">{day.day} - {day.date}</h4>
                    <ul className="mt-2 space-y-1">
                      {day.events.map((eventItem, eventIndex) => (
                        <li key={eventIndex} className="text-sm text-muted-foreground">
                          • {eventItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Requirements */}
        {event.requirements && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {event.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <span className="w-2 h-2 bg-brand-purple rounded-full mt-2 flex-shrink-0" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Coordinators */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Event Coordinators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3">
              {event.coordinators.map((coordinator, index) => (
                <div key={index} className="flex items-center gap-3 flex-wrap">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center
                      ${coordinator.role === "faculty"
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                        : "bg-gradient-to-r from-pink-500 to-fuchsia-500"
                      }`}>
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-sm">
                    {coordinator.name}
                    {coordinator.role === "Student" && (
                      <span className="ml-2 text-xs text-muted-foreground">{coordinator.class}</span>
                    )}
                  </span>
                  {coordinator.role === "faculty" ? (
                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">Faculty</Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs bg-pink-100 text-pink-800">Student</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Prizes */}
        {event.prizes && event.prizes.length > 0 && event.prizes[0].participants && event.prizes[0].participants.length > 0 && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Winners & Runner-Ups</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {event.prizes.map((prize, index) => (
                <div key={index} className="border-l-4 border-l-brand-purple p-4 bg-brand-lavender/10 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-4 h-4 text-brand-brinjal" />
                    <span className="font-bold text-brand-brinjal">{prize.position}</span>
                  </div>
                  {prize.teamName && prize.teamName !== "Individual" && (
                    <p className="text-sm font-semibold text-foreground mb-1">Team: {prize.teamName}</p>
                  )}
                  <div className="space-y-1">
                    {prize.participants && prize.participants.length > 0 ? (
                      prize.participants.map((participant, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground ml-2">
                          • {participant}
                        </p>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground italic">Not Announced</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ) || (event.prizes && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Prizes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {event.prizes.map((prize, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-brand-lavender/20 rounded">
                  <span className="font-medium text-sm">{prize.position}</span>
                  <span className="text-sm text-muted-foreground">Trophy</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}