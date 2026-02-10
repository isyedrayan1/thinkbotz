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
import AboutSection from "../components/sections/aboutsection";
import GallerySec from "../components/sections/gallerysec";
import Achievements from "../components/sections/acheivements";






export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Achievements & Stats */}
      <Achievements />

      {/* Gallery Highlights */}
      <GallerySec />

      {/* Info Section: What We Offer */}
      <section className="py-16 px-4 bg-gradient-to-b from-brand-lavender/40 to-transparent">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <Card className="rounded-2xl shadow-md border-brand-lavender/60 hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center gap-3 pb-4">
              <Award className="w-8 h-8 text-brand-purple" />
              <CardTitle className="text-xl font-bold text-brand-brinjal">Skill Development</CardTitle>
            </CardHeader>
            <CardContent className="text-brand-brinjal/80 text-base">
              Workshops, seminars, and hands-on sessions to boost your technical and soft skills.
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-md border-brand-lavender/60 hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center gap-3 pb-4">
              <Users className="w-8 h-8 text-brand-purple" />
              <CardTitle className="text-xl font-bold text-brand-brinjal">Networking</CardTitle>
            </CardHeader>
            <CardContent className="text-brand-brinjal/80 text-base">
              Meet like-minded peers, industry experts, and alumni to grow your professional network.
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-md border-brand-lavender/60 hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center gap-3 pb-4">
              <Trophy className="w-8 h-8 text-brand-purple" />
              <CardTitle className="text-xl font-bold text-brand-brinjal">Recognition</CardTitle>
            </CardHeader>
            <CardContent className="text-brand-brinjal/80 text-base">
              Get recognized for your achievements and contributions through awards and certificates.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Info Section: How to Get Involved */}
      <section className="py-16 px-4 bg-white/80 border-t border-brand-lavender/40">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-brinjal mb-2">How to Get Involved</h2>
            <ul className="list-disc pl-6 text-brand-brinjal/80 text-base space-y-2">
              <li>Register for upcoming events and workshops.</li>
              <li>Connect with us on social media and our community channels.</li>
              <li>Volunteer or join our organizing team for hands-on experience.</li>
              <li>Showcase your projects and ideas at our events.</li>
            </ul>
          </div>
          <div className="flex-1 flex flex-col items-center gap-4">
            <img src="/community.svg" alt="Community" className="w-60 h-60 object-contain" />
            <Button asChild size="lg" className="bg-gradient-to-r from-brand-purple to-brand-brinjal text-white font-bold rounded-2xl shadow-md hover:opacity-90">
              <Link to="/events">See Upcoming Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Journey Timeline Highlight */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-transparent to-brand-lavender/20">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
          <div>
            <Badge className="mb-4 bg-brand-purple text-white">Our Story</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-brinjal mb-4">
              Explore Our Journey
            </h2>
            <p className="text-lg text-brand-brinjal/70 max-w-2xl mx-auto">
              Discover the milestones, achievements, and key moments that have shaped our community. See how far we've come!
            </p>
          </div>
          <Button asChild size="lg" className="bg-gradient-to-r from-brand-purple to-brand-brinjal text-white font-bold rounded-2xl shadow-lg hover:opacity-90">
            <Link to="/timeline" className="flex items-center gap-2">
              View Timeline
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 flex justify-center items-center">
        <div className="w-full max-w-xl mx-auto bg-white/90 rounded-3xl px-8 py-12 flex flex-col items-center gap-6 border border-brand-lavender">
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