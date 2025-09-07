import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  User, 
  ExternalLink, 
  ArrowLeft,
  Trophy,
  Image,
  Download,
  Share2,
  Heart,
  HeartIcon
} from "lucide-react";

// Mock event data - in real app, this would be fetched based on ID
const mockEvents = {
  "1": {
    id: 1,
    title: "Annual Tech Fest 2024",
    description: "Join us for the biggest tech event of the year featuring cutting-edge technology demonstrations, coding competitions, startup showcases, and networking opportunities with industry leaders. This three-day extravaganza will feature workshops on AI/ML, blockchain, web development, and mobile app development. Participants will have the chance to work on real-world projects, compete for cash prizes worth ₹50,000+, and connect with potential employers.",
    longDescription: "The Annual Tech Fest 2024 is our flagship event that brings together students, faculty, and industry professionals for an immersive technology experience. The fest includes multiple tracks: competitive programming, hackathons, technical workshops, startup pitch competitions, and expert keynote sessions. Special highlights include a drone competition, robotics showcase, and an AI innovation challenge. The event also features a job fair with top tech companies actively recruiting.",
    date: "2024-03-15",
    endDate: "2024-03-17",
    time: "09:00",
    endTime: "18:00",
    location: "Main Auditorium & Tech Labs",
    coordinators: [
      { name: "John Doe", role: "Lead Coordinator", email: "john.doe@college.edu", phone: "+1 (555) 123-4567" },
      { name: "Jane Smith", role: "Technical Coordinator", email: "jane.smith@college.edu", phone: "+1 (555) 234-5678" },
      { name: "Alex Johnson", role: "Logistics Coordinator", email: "alex.johnson@college.edu", phone: "+1 (555) 345-6789" }
    ],
    maxRegistrations: 200,
    currentRegistrations: 156,
    category: "Technical",
    status: "Active",
    registrationLink: "https://forms.google.com/tech-fest-2024",
    featured: true,
    schedule: [
      { day: "Day 1", date: "March 15", events: ["Opening Ceremony", "Keynote Speech", "Workshop: AI Fundamentals", "Hackathon Begins"] },
      { day: "Day 2", date: "March 16", events: ["Coding Competition", "Startup Pitches", "Industry Panel", "Hackathon Continues"] },
      { day: "Day 3", date: "March 17", events: ["Project Presentations", "Award Ceremony", "Networking Session", "Closing"] }
    ],
    prizes: [
      { position: "1st Place", reward: "₹25,000 + Certificate" },
      { position: "2nd Place", reward: "₹15,000 + Certificate" },
      { position: "3rd Place", reward: "₹10,000 + Certificate" },
      { position: "Best Innovation", reward: "₹5,000 + Internship Opportunity" }
    ],
    requirements: [
      "Valid student ID required",
      "Laptop mandatory for competitions",
      "Form teams of 2-4 members",
      "Basic programming knowledge recommended"
    ],
    gallery: [
      { id: 1, url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80", caption: "Opening ceremony" },
      { id: 2, url: "https://images.unsplash.com/photo-1551818255-e6e10975cd17?w=400&q=80", caption: "Coding competition" },
      { id: 3, url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", caption: "Workshop session" }
    ],
    results: {
      available: true,
      winners: [
        { team: "Code Warriors", members: ["Alice Johnson", "Bob Smith"], prize: "1st Place" },
        { team: "Tech Innovators", members: ["Charlie Brown", "Diana Prince"], prize: "2nd Place" },
        { team: "Algorithm Masters", members: ["Eve Adams", "Frank Miller"], prize: "3rd Place" }
      ]
    }
  }
};

export default function EventDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // In real app, fetch event data based on ID
  const event = mockEvents[id as keyof typeof mockEvents];

  if (!event) {
    return (
      <div className="min-h-screen py-12">
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
    if (event.registrationLink) {
      window.open(event.registrationLink, '_blank');
    } else {
      setIsRegistered(true);
      toast({
        title: "Registration Successful!",
        description: "You have been registered for the event. Check your email for confirmation.",
      });
    }
  };

  const handleShare = () => {
    navigator.share({
      title: event.title,
      text: event.description,
      url: window.location.href,
    }).catch(() => {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Event link has been copied to clipboard.",
      });
    });
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="outline">
            <Link to="/events">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Badge className={getCategoryColor(event.category)}>{event.category}</Badge>
                      {event.featured && <Badge variant="outline">Featured</Badge>}
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <CardTitle className="text-3xl">{event.title}</CardTitle>
                    <CardDescription className="text-lg">
                      {event.description}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
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
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-lavender rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-brand-brinjal" />
                    </div>
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString()} 
                        {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-lavender rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-brand-brinjal" />
                    </div>
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-sm text-muted-foreground">{event.time} - {event.endTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-lavender rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-brand-brinjal" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-lavender rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-brand-brinjal" />
                    </div>
                    <div>
                      <p className="font-medium">Registrations</p>
                      <p className="text-sm text-muted-foreground">
                        {event.currentRegistrations} / {event.maxRegistrations} registered
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Long Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{event.longDescription}</p>
              </CardContent>
            </Card>

            {/* Schedule */}
            {event.schedule && (
              <Card>
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
              <Card>
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

            {/* Gallery */}
            {event.gallery && event.gallery.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Event Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {event.gallery.map((photo) => (
                      <div key={photo.id} className="group cursor-pointer">
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-24 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                        />
                        <p className="text-xs text-muted-foreground mt-1">{photo.caption}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Results */}
            {event.results?.available && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5" />
                    <span>Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {event.results.winners.map((winner, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-brand-lavender/30 rounded-lg">
                        <div>
                          <p className="font-semibold">{winner.team}</p>
                          <p className="text-sm text-muted-foreground">
                            {winner.members.join(", ")}
                          </p>
                        </div>
                        <Badge variant="outline">{winner.prize}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <Card>
              <CardHeader>
                <CardTitle>Registration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {event.currentRegistrations}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    of {event.maxRegistrations} registered
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-brand-purple to-brand-brinjal h-2 rounded-full"
                      style={{ width: `${(event.currentRegistrations / event.maxRegistrations) * 100}%` }}
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleRegister}
                  disabled={isRegistered || event.currentRegistrations >= event.maxRegistrations}
                  className="w-full bg-gradient-to-r from-brand-purple to-brand-brinjal text-white"
                >
                  {isRegistered ? "Registered ✓" : 
                   event.currentRegistrations >= event.maxRegistrations ? "Registration Full" :
                   "Register Now"}
                  {event.registrationLink && <ExternalLink className="w-4 h-4 ml-2" />}
                </Button>
                
                {event.status === "Active" && (
                  <p className="text-xs text-muted-foreground text-center">
                    Registration closes 24 hours before the event
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Coordinators */}
            <Card>
              <CardHeader>
                <CardTitle>Event Coordinators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {event.coordinators.map((coordinator, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-brand-purple to-brand-brinjal rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{coordinator.name}</p>
                      <p className="text-xs text-muted-foreground">{coordinator.role}</p>
                      <p className="text-xs text-brand-brinjal">{coordinator.email}</p>
                      {coordinator.phone && (
                        <p className="text-xs text-muted-foreground">{coordinator.phone}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Prizes */}
            {event.prizes && (
              <Card>
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
                      <span className="text-sm text-muted-foreground">{prize.reward}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}