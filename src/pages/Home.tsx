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
    
      {/* Brief About Section */}
      <AboutSection />

      {/* Achievements & Stats */}
      <Achievements />

      {/* Gallery Highlights */}
      <GallerySec />  


      {/* Call to Action */}
      <section className="py-20  flex justify-center items-center">
        <div className="w-full max-w-xl mx-auto bg-white/90 rounded-3xl  px-8 py-12 flex flex-col items-center gap-6 border border-brand-lavender">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-brinjal text-center">
            Ready to Join Our Community?
          </h2>
          <p className="text-lg md:text-xl text-brand-brinjal/80 text-center max-w-lg">
            Become part of something bigger. Connect, learn, grow, and make lasting memories with CDSA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-brand-purple to-brand-brinjal text-white font-bold rounded-2xl w-full sm:w-auto shadow-md hover:opacity-90">
              <Link to="/events">Join Our Events</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-brand-brinjal text-brand-brinjal font-bold rounded-2xl w-full sm:w-auto shadow-md hover:bg-brand-lavender/20">
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}