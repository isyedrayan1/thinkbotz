import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar, Users, Filter } from "lucide-react";

// Mock gallery data - in real app, this would come from a backend/database
const galleryItems = [
  {
    id: 1,
    title: "Tech Fest 2023 Opening Ceremony",
    description: "Students gathering for the grand opening of our annual tech fest",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    event: "Tech Fest 2023",
    date: "2023-03-15",
    category: "Technical",
    tags: ["opening", "ceremony", "students"]
  },
  {
    id: 2,
    title: "Coding Competition Winners",
    description: "Celebrating our coding competition champions with their well-deserved trophies",
    imageUrl: "https://images.unsplash.com/photo-1551818255-e6e10975cd17?w=800&q=80",
    event: "Coding Competition 2023",
    date: "2023-03-20",
    category: "Technical",
    tags: ["winners", "coding", "competition"]
  },
  {
    id: 3,
    title: "Cultural Night Performance",
    description: "Amazing dance performance during our cultural celebration",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    event: "Cultural Night 2023",
    date: "2023-03-25",
    category: "Cultural",
    tags: ["dance", "performance", "culture"]
  },
  {
    id: 4,
    title: "Research Presentation",
    description: "Student presenting their innovative research project",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    event: "Research Symposium 2023",
    date: "2023-04-02",
    category: "Academic",
    tags: ["research", "presentation", "innovation"]
  },
  {
    id: 5,
    title: "Sports Tournament Victory",
    description: "Our basketball team celebrating their championship victory",
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
    event: "Sports Tournament 2023",
    date: "2023-02-28",
    category: "Sports",
    tags: ["basketball", "victory", "championship"]
  },
  {
    id: 6,
    title: "Workshop Session",
    description: "Interactive AI/ML workshop with hands-on learning",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    event: "AI Workshop 2023",
    date: "2023-04-10",
    category: "Workshop",
    tags: ["workshop", "AI", "learning"]
  },
  {
    id: 7,
    title: "Team Building Activity",
    description: "Students collaborating during team building exercises",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    event: "Team Building 2023",
    date: "2023-09-15",
    category: "Social",
    tags: ["teamwork", "collaboration", "fun"]
  },
  {
    id: 8,
    title: "Guest Lecture",
    description: "Industry expert sharing insights with our students",
    imageUrl: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&q=80",
    event: "Industry Talk 2023",
    date: "2023-11-20",
    category: "Academic",
    tags: ["lecture", "industry", "expert"]
  },
  {
    id: 9,
    title: "Graduation Celebration",
    description: "Celebrating our graduating students and their achievements",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    event: "Graduation 2023",
    date: "2023-05-15",
    category: "Academic",
    tags: ["graduation", "celebration", "achievement"]
  }
];

const categories = ["All", "Technical", "Cultural", "Academic", "Sports", "Workshop", "Social"];

export default function Gallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

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
      case "Social":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore memories from our events, activities, and achievements
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search photos by title, event, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredItems.length} of {galleryItems.length} photos
          </p>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="space-y-4">
              <Filter className="w-12 h-12 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-semibold">No photos found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <Card 
                key={item.id} 
                className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>{item.event}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={getCategoryColor(selectedImage.category)}>
                    {selectedImage.category}
                  </Badge>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(selectedImage.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold">{selectedImage.title}</h2>
                <p className="text-muted-foreground">{selectedImage.description}</p>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{selectedImage.event}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedImage.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-brand-lavender text-brand-brinjal px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}