    import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { fetchMultipleFolders, type DriveImage } from "@/lib/driveGallery";

const projects = [
	{ title: "MindSpark", folderId: import.meta.env.VITE_DRIVE_MINDSPARK_FOLDER_ID as string },
	{ title: "PromptFusion", folderId: import.meta.env.VITE_DRIVE_PROMPTFUSION_FOLDER_ID as string },
	{ title: "PosterVision", folderId: import.meta.env.VITE_DRIVE_POSTERVISION_FOLDER_ID as string },
	{ title: "PromptStack", folderId: import.meta.env.VITE_DRIVE_PROMPTSTACK_FOLDER_ID as string },
	{ title: "FFSAL", folderId: import.meta.env.VITE_DRIVE_FFSAL_FOLDER_ID as string },
	{ title: "Inauguration Event", folderId: import.meta.env.VITE_DRIVE_INAUGURATION_FOLDER_ID as string },
];

export default function GallerySec() {
  const [images, setImages] = useState<{img: DriveImage, projectTitle: string}[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const apiKey = import.meta.env.VITE_DRIVE_API_KEY as string | undefined;

    fetchMultipleFolders(apiKey ?? "", projects, controller.signal)
      .then((sections) => {
        const highlights: {img: DriveImage, projectTitle: string}[] = [];
        sections.forEach(section => {
          if (section.images.length > 0) {
            highlights.push({ img: section.images[0], projectTitle: section.title });
          }
        });
        setImages(highlights.slice(0, 4));
      })
      .catch(() => setImages([]));

    return () => controller.abort();
  }, []);

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
            {images.map((item) => (
              <Card key={item.img.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.img.thumbnailUrl}
                    alt={`${item.projectTitle} highlight`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-3">
                  <h4 className="font-medium text-sm truncate">{item.projectTitle}</h4>
                  <Badge className="text-xs mt-1" variant="secondary">{item.projectTitle}</Badge>
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