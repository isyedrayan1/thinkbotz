     import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Calendar, Users, BookOpen, Trophy, ArrowRight, Bell, Target, Eye, 
  Award, TrendingUp, Camera, Mail, Phone, MapPin, Star, Code, 
  Palette, Zap, Globe, Heart, CheckCircle, Image
} from "lucide-react";

const galleryHighlights = [
  {
    id: 1,
    title: "Tech Fest 2023",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    category: "Technical"
  },
  {
    id: 2,
    title: "Cultural Night",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
    category: "Cultural"
  },
  {
    id: 3,
    title: "Sports Championship",
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80",
    category: "Sports"
  },
  {
    id: 4,
    title: "Research Symposium",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    category: "Academic"
  }
];

export default function GallerySec() {
  return (
 <section className="py-16 bg-brand-lavender/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Gallery Highlights</h2>
              <p className="text-muted-foreground">Memories from our amazing events and activities</p>
            </div>
            <Button asChild variant="outline" className="hidden md:inline-flex rounded-2xl">
              <Link to="/gallery">View Full Gallery</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {galleryHighlights.map((item) => (
              <Card key={item.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-3">
                  <h4 className="font-medium text-sm truncate">{item.title}</h4>
                  <Badge className="text-xs mt-1" variant="secondary">{item.category}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center md:hidden">
            <Button asChild className="bg-gradient-to-r from-brand-purple to-brand-brinjal text-white rounded-2xl">
              <Link to="/gallery">View Full Gallery</Link>
            </Button>
          </div>
        </div>
      </section>
  );
}