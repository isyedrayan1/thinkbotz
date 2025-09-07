import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Calendar, Users, BookOpen, Trophy, ArrowRight, Bell, Target, Eye, 
  Award, TrendingUp, Camera, Mail, Phone, MapPin, Star, Code, 
  Palette, Zap, Globe, Heart, CheckCircle, Image
} from "lucide-react";

import HeroSection from "../components/sections/herosection";
import AnnouncementSec from "../components/sections/anouncementsec";
import AboutSection from "../components/sections/aboutsection";
import EventsSection from "../components/sections/eventsSection";
import GallerySec from "../components/sections/gallerysec";
import Achievements from "../components/sections/acheivements";






export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      {/* Latest Announcements */}
    <AnnouncementSec />
      {/* Upcoming Events Preview */}
    <EventsSection />
      {/* Brief About Section */}
      <AboutSection />

      {/* Achievements & Stats */}
      <Achievements />

      {/* Gallery Highlights */}
      <GallerySec />  


      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-brand-purple to-brand-brinjal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Become part of something bigger. Connect, learn, grow, and make lasting memories with CDSA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-brand-brinjal hover:bg-white/90 rounded-2xl">
              <Link to="/events">Join Our Events</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white text-brand-brinjal hover:bg-white/90 rounded-2xl">
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}