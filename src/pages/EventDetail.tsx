import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

// Updated hackathons data: one-day events, simple prizes, only name/role for coordinators, gallery only if completed
export const hackathons = [
  {
    id: 1,
    title: "LensCraft",
    description: "A thrilling hackathon where students collaborate, innovate, and code to solve real-world problems. Prizes, certificates, and networking opportunities included!",
    longDescription: "LensCraft is a one-day hackathon that challenges participants to develop innovative solutions to real-world problems. Teams will brainstorm, design, and code their projects, with mentorship from industry experts. The event includes workshops, networking sessions, and fun activities. Top teams will win mementos and certificates.",
    date: "2025-10-10",
    time: "09:00",
    endTime: "18:00",
    location: "AITK - Kadapa",
    coordinators: [
      { name: "Priya Sharma", role: "Lead Coordinator" },
      { name: "Rohan Mehta", role: "Tech Mentor" }
    ],
    category: "Technical",
    status: "Upcoming",
    registrationLink: "https://forms.gle/lenscraft2025",
    featured: true,
    schedule: [
      { day: "Event Day", date: "Oct 10", events: ["Opening Ceremony", "Problem Statement Release", "Coding", "Project Demos", "Award Ceremony"] }
    ],
    prizes: [
      { position: "1st Prize" },
      { position: "2nd Prize" },
      { position: "3rd Prize" }
    ],
    requirements: [
      "Valid college ID",
      "Teams of 2-5 members",
      "Laptop with required software"
    ],
    gallery: [
      { id: 1, url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80", caption: "Team brainstorming" }
    ]
  },
  {
    id: 2,
    title: "Logic League",
    description: "A hands-on AI & ML workshop for beginners and enthusiasts. Learn neural networks, Python coding for AI, and build real-time projects guided by mentors.",
    longDescription: "Logic League is a one-day workshop designed to introduce students to the world of Artificial Intelligence and Machine Learning. Participants will learn the basics of neural networks, Python programming for AI, and work on real-time projects. The workshop includes interactive sessions, coding labs, and mentorship from experienced AI professionals.",
    date: "2025-11-05",
    time: "10:00",
    endTime: "17:00",
    location: "AITK - Kadapa",
    coordinators: [
      { name: "Anjali Verma", role: "Workshop Lead" }
    ],
    category: "Workshop",
    status: "Upcoming",
    registrationLink: "https://forms.gle/logicleague2025",
    featured: false,
    schedule: [
      { day: "Event Day", date: "Nov 5", events: ["Introduction to AI & ML", "Python for AI", "Neural Networks Basics", "Hands-on Lab", "Project Presentations"] }
    ],
    prizes: [
      { position: "Best Project" }
    ],
    requirements: [
      "Laptop with Python installed",
      "Basic programming knowledge",
      "Interest in AI/ML"
    ],
    gallery: [
      { id: 1, url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&q=80", caption: "AI workshop session" }
    ]
  },
  {
    id: 3,
    title: "MindSpark",
    description: "A 24-hour ideathon to spark creativity and innovation. Pitch your ideas, form teams, and build prototypes with expert guidance.",
    longDescription: "MindSpark is an ideathon where students pitch creative solutions to pressing challenges. Teams will brainstorm, validate, and prototype their ideas within a day, with guidance from mentors. The event culminates in a pitch session to a panel of judges.",
    date: "2025-12-01",
    time: "08:00",
    endTime: "20:00",
    location: "AITK - Kadapa",
    coordinators: [
      { name: "Siddharth Rao", role: "Event Manager" }
    ],
    category: "Technical",
    status: "Upcoming",
    registrationLink: "https://forms.gle/mindspark2025",
    featured: false,
    schedule: [
      { day: "Event Day", date: "Dec 1", events: ["Opening & Theme Reveal", "Team Formation", "Ideation", "Prototype Building", "Final Presentations", "Awards"] }
    ],
    prizes: [
      { position: "Winner" },
      { position: "Runner Up" }
    ],
    requirements: [
      "Teams of 2-4 members",
      "Laptop",
      "Creative mindset"
    ],
    gallery: [
      { id: 1, url: "https://images.unsplash.com/photo-1503676382389-4809596d5290?w=400&q=80", caption: "Team ideation" }
    ]
  },
  {
    id: 4,
    title: "Poster Vision",
    description: "A poster design competition to showcase your creativity and design skills on tech and innovation themes.",
    longDescription: "Poster Vision is a design competition where participants create posters on themes related to technology and innovation. The event encourages creativity, visual storytelling, and effective communication through design.",
    date: "2025-12-10",
    time: "11:00",
    endTime: "15:00",
    location: "AITK - Kadapa",
    coordinators: [
      { name: "Meera Nair", role: "Design Lead" }
    ],
    category: "Cultural",
    status: "Upcoming",
    registrationLink: "https://forms.gle/postervision2025",
    featured: false,
    schedule: [
      { day: "Event Day", date: "Dec 10", events: ["Briefing", "Poster Design", "Submission", "Judging & Awards"] }
    ],
    prizes: [
      { position: "Best Poster" },
      { position: "Runner Up" }
    ],
    requirements: [
      "Individual participation",
      "Bring your own art supplies",
      "Poster size: A2"
    ],
    gallery: [
      { id: 1, url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&q=80", caption: "Poster design in progress" }
    ]
  },
  {
    id: 5,
    title: "Prompt Fusion",
    description: "A prompt engineering challenge for AI enthusiasts. Tackle real-world tasks by crafting effective prompts for language models.",
    longDescription: "Prompt Fusion is a unique competition where participants solve tasks by designing prompts for AI language models. The event tests creativity, logic, and understanding of AI capabilities. Top performers will be recognized for their innovative prompt engineering.",
    date: "2025-12-18",
    time: "13:00",
    endTime: "18:00",
    location: "AITK - Kadapa",
    coordinators: [
      { name: "Arjun Patel", role: "AI Lead" }
    ],
    category: "Technical",
    status: "Upcoming",
    registrationLink: "https://forms.gle/promptfusion2025",
    featured: false,
    schedule: [
      { day: "Event Day", date: "Dec 18", events: ["Introduction", "Prompt Challenges", "Evaluation", "Awards"] }
    ],
    prizes: [
      { position: "Winner" }
    ],
    requirements: [
      "Individual or team (max 2)",
      "Laptop required",
      "Basic knowledge of AI/ML"
    ],
    gallery: [
      { id: 1, url: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=400&q=80", caption: "Prompt engineering session" }
    ]
  },
  {
    id: 6,
    title: "SmartStacks",
    description: "A full-stack development hackathon. Build scalable web apps and compete for top honors.",
    longDescription: "SmartStacks is a hackathon focused on full-stack web development. Participants will design, build, and deploy scalable web applications using modern frameworks. The event includes mentorship, workshops, and a final demo session.",
    date: "2026-01-15",
    time: "09:00",
    endTime: "20:00",
    location: "AITK - Kadapa",
    coordinators: [
      { name: "Sneha Gupta", role: "Full Stack Mentor" }
    ],
    category: "Technical",
    status: "Upcoming",
    registrationLink: "https://forms.gle/smartstacks2026",
    featured: false,
    schedule: [
      { day: "Event Day", date: "Jan 15", events: ["Kickoff", "Team Coding", "Mentor Check-ins", "Project Submission", "Demo & Awards"] }
    ],
    prizes: [
      { position: "1st Prize" },
      { position: "2nd Prize" }
    ],
    requirements: [
      "Teams of 2-4",
      "Laptop with Node.js & Git",
      "Basic web development skills"
    ],
    gallery: [
      { id: 1, url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80", caption: "Web app demo" }
    ]
  },
  {
    id: 7,
    title: "AI Builders Arena",
    description: "A competitive hackathon for AI builders. Solve real-world challenges using machine learning and data science.",
    longDescription: "AI Builders Arena is a hackathon where participants tackle real-world problems using AI and data science. Teams will have access to datasets, cloud resources, and mentorship. The event concludes with project demos and awards for the best solutions.",
    date: "2026-02-10",
    time: "10:00",
    endTime: "19:00",
    location: "AITK - Kadapa",
    coordinators: [
      { name: "Vikas Singh", role: "AI Mentor" }
    ],
    category: "Technical",
    status: "Upcoming",
    registrationLink: "https://forms.gle/aibuilders2026",
    featured: false,
    schedule: [
      { day: "Event Day", date: "Feb 10", events: ["Problem Statement Release", "Team Coding", "Mentor Sessions", "Project Demos", "Awards"] }
    ],
    prizes: [
      { position: "Winner" },
      { position: "Runner Up" }
    ],
    requirements: [
      "Teams of 2-4",
      "Laptop with Python & ML libraries",
      "Basic ML knowledge"
    ],
    gallery: [
      { id: 1, url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80", caption: "AI hackathon" }
    ]
  }
];

export default function EventDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const event = hackathons.find(e => String(e.id) === id);

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
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Event link has been copied to clipboard.",
      });
    });
  };

  // Only show gallery if event is completed
  const showGallery = event.status === "Completed";

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button and Apply Now */}
        <div className="mb-6 flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/events">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            onClick={handleRegister}
            className="bg-gradient-to-r from-brand-purple to-brand-brinjal text-white font-bold rounded-2xl ml-auto"
            disabled={isRegistered}
          >
            {isRegistered ? "Applied ✓" : "Apply Now"}
            {event.registrationLink && <ExternalLink className="w-4 h-4 ml-2" />}
          </Button>
        </div>

        {/* Main Event Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-100 text-blue-800">{event.category}</Badge>
                  {event.featured && <Badge variant="outline">Featured</Badge>}
                  <Badge className="bg-green-100 text-green-800">{event.status}</Badge>
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
        <Card className="mb-6">
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
            </div>
          </CardContent>
        </Card>

        {/* Long Description */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>About This Event</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{event.longDescription}</p>
          </CardContent>
        </Card>

        {/* Schedule */}
        {event.schedule && (
          <Card className="mb-6">
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
          <Card className="mb-6">
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

        {/* Gallery (only after event is completed) */}
        {event.status === "Completed" && event.gallery && event.gallery.length > 0 && (
          <Card className="mb-6">
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

        {/* Coordinators */}
        <Card className="mb-6">
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
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Prizes */}
        {event.prizes && (
          <Card className="mb-6">
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
                  <span className="text-sm text-muted-foreground">Memento</span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}