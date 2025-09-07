import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Calendar, Users, BookOpen, Trophy, ArrowRight, Bell, Target, Eye, 
  Award, TrendingUp, Camera, Mail, Phone, MapPin, Star, Code, 
  Palette, Zap, Globe, Heart, CheckCircle, Image
} from "lucide-react";

const whyJoinReasons = [
  {
    icon: Code,
    title: "Technical Excellence",
    description: "Enhance your technical skills through workshops, hackathons, and coding competitions."
  },
  {
    icon: Users,
    title: "Network & Connect",
    description: "Build lasting relationships with peers, faculty, and industry professionals."
  },
  {
    icon: Trophy,
    title: "Recognition & Awards",
    description: "Showcase your talents and get recognized for your achievements and contributions."
  },
  {
    icon: Globe,
    title: "Leadership Opportunities",
    description: "Take on leadership roles and develop essential management and organizational skills."
  }
];
export default function AboutSection() {
  return (
<section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">About Our Association</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn what drives us and what we stand for
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-brand-purple">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-brand-purple to-brand-brinjal rounded-2xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To create a vibrant, inclusive community that fosters academic excellence, 
                  personal growth, and professional development for all students in our department.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To be the leading student association that empowers future leaders and innovators 
                  through meaningful experiences and cutting-edge learning opportunities.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button asChild variant="outline" className="rounded-2xl">
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
         <div className="max-w-7xl mx-auto px-4 pt-8 sm:px-6 lg:px-8">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-foreground mb-4">Why Join CDSA?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Discover the opportunities and benefits of being part of our association
                    </p>
                  </div>
        
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {whyJoinReasons.map((reason, index) => (
                      <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardHeader>
                          <div className="w-12 h-12 bg-gradient-to-r from-brand-purple to-brand-brinjal rounded-2xl mx-auto flex items-center justify-center mb-4">
                            <reason.icon className="w-6 h-6 text-white" />
                          </div>
                          <CardTitle className="text-lg">{reason.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-sm leading-relaxed">
                            {reason.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
      </section>
  );
}