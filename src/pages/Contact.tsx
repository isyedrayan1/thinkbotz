import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send, User, GraduationCap } from "lucide-react";

const facultyContacts = [
  {
    name: "Dr. Sarah Johnson",
    role: "Head of Department",
    email: "sarah.johnson@college.edu",
    phone: "+1 (555) 123-4567",
    department: "Computer Science",
    officeHours: "Mon-Fri, 2PM-4PM"
  },
  {
    name: "Prof. Michael Brown",
    role: "Associate Professor",
    email: "michael.brown@college.edu",
    phone: "+1 (555) 234-5678",
    department: "Software Engineering",
    officeHours: "Tue-Thu, 10AM-12PM"
  },
  {
    name: "Dr. Emily Chen",
    role: "Assistant Professor",
    email: "emily.chen@college.edu",
    phone: "+1 (555) 345-6789",
    department: "Data Science",
    officeHours: "Mon-Wed-Fri, 1PM-3PM"
  }
];

const coreTeamContacts = [
  {
    name: "Alex Martinez",
    role: "President",
    email: "alex.martinez@student.college.edu",
    phone: "+1 (555) 456-7890",
    year: "4th Year",
    availability: "Available daily"
  },
  {
    name: "Jessica Davis",
    role: "Events Coordinator",
    email: "jessica.davis@student.college.edu",
    phone: "+1 (555) 567-8901",
    year: "3rd Year",
    availability: "Mon-Fri evenings"
  },
  {
    name: "David Wilson",
    role: "Technical Lead",
    email: "david.wilson@student.college.edu",
    phone: "+1 (555) 678-9012",
    year: "4th Year",
    availability: "Weekends"
  },
  {
    name: "Lisa Thompson",
    role: "Cultural Coordinator",
    email: "lisa.thompson@student.college.edu",
    phone: "+1 (555) 789-0123",
    year: "3rd Year",
    availability: "Tue-Thu afternoons"
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our team. We're here to help and answer any questions you may have.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-brand-purple to-brand-brinjal rounded-lg flex items-center justify-center">
                    <Send className="w-4 h-4 text-white" />
                  </div>
                  <span>Send us a Message</span>
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll respond within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please describe your inquiry or message in detail..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-brand-purple to-brand-brinjal text-white rounded-2xl"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Quick Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Get in Touch</CardTitle>
                <CardDescription>Multiple ways to reach us</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-lavender rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-brand-brinjal" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">info@cdsa.college.edu</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-lavender rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-brand-brinjal" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-CDSA</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-lavender rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brand-brinjal" />
                  </div>
                  <div>
                    <p className="font-medium">Office Location</p>
                    <p className="text-sm text-muted-foreground">Room 301, Department Building</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-lavender rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-brand-brinjal" />
                  </div>
                  <div>
                    <p className="font-medium">Office Hours</p>
                    <p className="text-sm text-muted-foreground">Monday-Friday, 9AM-5PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Faculty Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5" />
                  <span>Faculty Contacts</span>
                </CardTitle>
                <CardDescription>Reach out to our faculty members</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {facultyContacts.map((faculty, index) => (
                  <div key={index} className="p-4 bg-brand-lavender/30 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{faculty.name}</h4>
                      <Badge variant="secondary">{faculty.department}</Badge>
                    </div>
                    <p className="text-sm text-brand-brinjal font-medium">{faculty.role}</p>
                    <div className="grid grid-cols-1 gap-1 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-3 h-3" />
                        <span>{faculty.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-3 h-3" />
                        <span>{faculty.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3" />
                        <span>{faculty.officeHours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Core Team Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Core Team</span>
                </CardTitle>
                <CardDescription>Connect with our student leaders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {coreTeamContacts.map((member, index) => (
                  <div key={index} className="p-4 bg-white border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{member.name}</h4>
                      <Badge className="bg-brand-purple text-white">{member.year}</Badge>
                    </div>
                    <p className="text-sm text-brand-brinjal font-medium">{member.role}</p>
                    <div className="grid grid-cols-1 gap-1 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-3 h-3" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-3 h-3" />
                        <span>{member.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3" />
                        <span>{member.availability}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}