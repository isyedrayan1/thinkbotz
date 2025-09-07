import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  Users, 
  MapPin, 
  Clock,
  ExternalLink,
  Eye,
  Search,
  Filter
} from "lucide-react";

// Mock events data
const initialEvents = [
  {
    id: 1,
    title: "Annual Tech Fest 2024",
    description: "Join us for the biggest tech event of the year with coding competitions, workshops, and networking opportunities.",
    date: "2024-03-15",
    time: "09:00",
    endTime: "18:00",
    location: "Main Auditorium",
    coordinators: ["John Doe", "Jane Smith"],
    maxRegistrations: 200,
    currentRegistrations: 156,
    category: "Technical",
    status: "Active",
    registrationLink: "https://forms.google.com/tech-fest-2024",
    featured: true
  },
  {
    id: 2,
    title: "Coding Competition",
    description: "Test your programming skills in this exciting coding challenge with cash prizes.",
    date: "2024-03-20",
    time: "10:00",
    endTime: "16:00",
    location: "Computer Lab A",
    coordinators: ["Michael Brown"],
    maxRegistrations: 100,
    currentRegistrations: 89,
    category: "Technical",
    status: "Active",
    registrationLink: "https://forms.google.com/coding-comp",
    featured: false
  },
  {
    id: 3,
    title: "Cultural Night",
    description: "Celebrate diversity with performances, music, and cultural exhibitions.",
    date: "2024-03-25",
    time: "18:00",
    endTime: "22:00",
    location: "Outdoor Amphitheater",
    coordinators: ["Emily Chen", "David Garcia"],
    maxRegistrations: 300,
    currentRegistrations: 234,
    category: "Cultural",
    status: "Active",
    registrationLink: "https://forms.google.com/cultural-night",
    featured: true
  }
];

const categories = ["Technical", "Cultural", "Academic", "Sports", "Workshop"];
const statuses = ["Active", "Draft", "Completed", "Cancelled"];

export default function EventsManagement() {
  const [events, setEvents] = useState(initialEvents);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<typeof initialEvents[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const { toast } = useToast();

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    endTime: "",
    location: "",
    coordinators: "",
    maxRegistrations: "",
    category: "",
    status: "Draft",
    registrationLink: "",
    featured: false
  });

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || event.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const event = {
      id: Date.now(),
      ...newEvent,
      coordinators: newEvent.coordinators.split(',').map(c => c.trim()),
      maxRegistrations: parseInt(newEvent.maxRegistrations) || 100,
      currentRegistrations: 0
    };

    setEvents([...events, event]);
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      endTime: "",
      location: "",
      coordinators: "",
      maxRegistrations: "",
      category: "",
      status: "Draft",
      registrationLink: "",
      featured: false
    });
    setIsCreateDialogOpen(false);

    toast({
      title: "Success",
      description: "Event created successfully!"
    });
  };

  const handleUpdateEvent = () => {
    if (!editingEvent) return;

    setEvents(events.map(event => 
      event.id === editingEvent.id ? editingEvent : event
    ));
    setEditingEvent(null);

    toast({
      title: "Success",
      description: "Event updated successfully!"
    });
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
    toast({
      title: "Success",
      description: "Event deleted successfully!"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "Draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "Completed":
        return <Badge variant="outline">Completed</Badge>;
      case "Cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events Management</h1>
          <p className="text-muted-foreground">Manage events, registrations, and coordinators</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-brand-purple to-brand-brinjal text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>Fill in the details to create a new event</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="Enter event title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={newEvent.category} onValueChange={(value) => setNewEvent({...newEvent, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Start Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={newEvent.endTime}
                  onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  placeholder="Event location"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxRegistrations">Max Registrations</Label>
                <Input
                  id="maxRegistrations"
                  type="number"
                  value={newEvent.maxRegistrations}
                  onChange={(e) => setNewEvent({...newEvent, maxRegistrations: e.target.value})}
                  placeholder="Maximum participants"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={newEvent.status} onValueChange={(value) => setNewEvent({...newEvent, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  placeholder="Event description"
                  rows={3}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="coordinators">Coordinators (comma separated)</Label>
                <Input
                  id="coordinators"
                  value={newEvent.coordinators}
                  onChange={(e) => setNewEvent({...newEvent, coordinators: e.target.value})}
                  placeholder="John Doe, Jane Smith"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="registrationLink">Registration Link</Label>
                <Input
                  id="registrationLink"
                  value={newEvent.registrationLink}
                  onChange={(e) => setNewEvent({...newEvent, registrationLink: e.target.value})}
                  placeholder="https://forms.google.com/..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateEvent} className="bg-gradient-to-r from-brand-purple to-brand-brinjal text-white">
                Create Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search events..."
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
                <SelectItem value="All">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge className={getCategoryColor(event.category)}>{event.category}</Badge>
                    {getStatusBadge(event.status)}
                    {event.featured && <Badge variant="outline">Featured</Badge>}
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-sm line-clamp-2">
                {event.description}
              </CardDescription>
              
              <div className="grid grid-cols-1 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                {event.time && (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time} - {event.endTime}</span>
                  </div>
                )}
                {event.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>{event.currentRegistrations}/{event.maxRegistrations} registered</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Coordinators:</p>
                <div className="flex flex-wrap gap-1">
                  {event.coordinators.map((coordinator, index) => (
                    <span key={index} className="text-xs bg-brand-lavender text-brand-brinjal px-2 py-1 rounded-full">
                      {coordinator}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link to={`/events/${event.id}`}>
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingEvent(event)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteEvent(event.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <Filter className="w-12 h-12 text-muted-foreground mx-auto" />
            <h3 className="text-lg font-semibold">No events found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        </Card>
      )}

      {/* Edit Event Dialog */}
      {editingEvent && (
        <Dialog open={!!editingEvent} onOpenChange={() => setEditingEvent(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
              <DialogDescription>Update event details</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Event Title</Label>
                <Input
                  id="edit-title"
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select 
                  value={editingEvent.category} 
                  onValueChange={(value) => setEditingEvent({...editingEvent, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select 
                  value={editingEvent.status} 
                  onValueChange={(value) => setEditingEvent({...editingEvent, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-date">Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={editingEvent.date}
                  onChange={(e) => setEditingEvent({...editingEvent, date: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({...editingEvent, description: e.target.value})}
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setEditingEvent(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateEvent} className="bg-gradient-to-r from-brand-purple to-brand-brinjal text-white">
                Update Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}