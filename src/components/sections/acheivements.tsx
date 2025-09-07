import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Calendar, Users, BookOpen, Trophy, ArrowRight, Bell, Target, Eye, 
  Award, TrendingUp, Camera, Mail, Phone, MapPin, Star, Code, 
  Palette, Zap, Globe, Heart, CheckCircle, Image
} from "lucide-react";

const achievements = [
  {
    number: "150+",
    label: "Active Members",
    icon: Users,
    color: "from-blue-500 to-blue-600"
  },
  {
    number: "25+",
    label: "Events Organized",
    icon: Calendar,
    color: "from-green-500 to-green-600"
  },
  {
    number: "50+",
    label: "Awards Won",
    icon: Trophy,
    color: "from-yellow-500 to-yellow-600"
  }
];
export default function Achievements() {
    return (
            <section className="py-16 bg-gradient-to-r from-brand-lavender/50 to-brand-lavender/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-foreground mb-4">Our Achievements</h2>
                    <p className="text-muted-foreground">Numbers that speak for our impact and growth</p>
                  </div>
        
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {achievements.map((achievement, index) => (
                      <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="pt-6 pb-6">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${achievement.color} mx-auto flex items-center justify-center mb-4`}>
                            <achievement.icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-foreground mb-1">{achievement.number}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.label}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
    );
}
