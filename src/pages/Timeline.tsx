"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { fetchMultipleFolders, type DriveGallerySection } from "@/lib/driveGallery";
import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface TimelineEntry {
  date: string;
  fullYear: string;
  title: string;
  description: string;
  media: string[];
  galleryKey?: string;
}

const TimelineComponent = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [preview, setPreview] = useState<{
    title: string;
    media: string[];
    index: number;
    description?: string;
  } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useEffect(() => {
    if (!preview) {
      setIsPlaying(false);
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreview(null);
        setIsPlaying(false);
        return;
      }

      if (event.code === "Space") {
        event.preventDefault();
        setIsPlaying((prev) => !prev);
        return;
      }

      if (event.key === "ArrowRight") {
        setPreview((prev) => {
          if (!prev || prev.media.length === 0) return prev;
          return { ...prev, index: (prev.index + 1) % prev.media.length };
        });
      }

      if (event.key === "ArrowLeft") {
        setPreview((prev) => {
          if (!prev || prev.media.length === 0) return prev;
          return {
            ...prev,
            index: (prev.index - 1 + prev.media.length) % prev.media.length,
          };
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [preview]);

  useEffect(() => {
    if (!preview || !isPlaying) return;

    const intervalId = window.setInterval(() => {
      setPreview((prev) => {
        if (!prev || prev.media.length === 0) return prev;
        return { ...prev, index: (prev.index + 1) % prev.media.length };
      });
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, [isPlaying, preview]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans mt-32"
      ref={containerRef}
    >
      {/* Hero Section */}
      <div className="relative w-full flex items-center justify-center px-4 md:px-10 pt-16 md:pt-20 lg:pt-24">
        <div className="text-center max-w-5xl mx-auto">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Journey Timeline
          </motion.h2>
          <motion.p
            className="text-base md:text-lg max-w-3xl mx-auto mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore the milestones and achievements that define our story. From humble beginnings to impactful events, see how we’ve grown together.
          </motion.p>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="relative max-w-7xl mx-auto pb-20 md:px-10" ref={ref}>
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-96 md:gap-10 min-h-screen pt-28 md:pt-28 pb-16 md:pb-20"
          >
            {/* Left: Sticky Year/Title Container */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              {item.date ? (
                <div className="hidden md:flex md:flex-col md:pl-20 items-start">
                  <h3 className="text-xl md:text-4xl font-bold text-neutral-500 dark:text-neutral-500">
                    {item.date}
                  </h3>
                  <p className="text-sm md:text-lg text-neutral-400 dark:text-neutral-600 font-semibold">
                    {item.fullYear}
                  </p>
                </div>
              ) : null}
            </div>

            {/* Right: Content and Media Container */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              {item.date ? (
                <div className="md:hidden block mb-4">
                  <h3 className="text-2xl font-bold text-neutral-500 dark:text-neutral-500">
                    {item.date}
                  </h3>
                  <p className="text-sm text-neutral-400 dark:text-neutral-600 font-semibold">
                    {item.fullYear}
                  </p>
                </div>
              ) : null}

              {/* Content Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl md:text-3xl font-semibold text-neutral-800 dark:text-neutral-200">
                    {item.title}
                  </h3>
                  {item.media.length > 0 && (
                    <button
                      onClick={() => {
                        setPreview({ title: item.title, media: item.media, index: 0, description: item.description });
                        setIsPlaying(true);
                      }}
                      className="flex-shrink-0 p-2 rounded-full bg-brand-brinjal/10 hover:bg-brand-brinjal/20 transition-all duration-300 border border-brand-brinjal/30 hover:border-brand-brinjal/50"
                      aria-label="Start slideshow"
                    >
                      <Play className="w-6 h-6 text-brand-brinjal" />
                    </button>
                  )}
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg leading-relaxed mt-3">
                  {item.description}
                </p>
              </div>

              {/* Media Grid Container */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {item.media.map((mediaUrl, mediaIndex) => (
                  <motion.img
                    key={mediaIndex}
                    src={mediaUrl}
                    alt={`${item.title} - ${mediaIndex + 1}`}
                    className="w-full h-48 md:h-64 rounded-xl object-cover shadow-md border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: mediaIndex * 0.1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    onClick={() => {
                      setPreview({ title: item.title, media: item.media, index: mediaIndex, description: item.description });
                      setIsPlaying(false);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>

      {preview ? (
        <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
          <DialogContent className="max-w-full w-screen h-screen p-0 border-0 m-0">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-lavender via-white to-brand-lavender" />
            
            {/* Content Container - Full Viewport */}
            <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
              {/* Header */}
              <div className="w-full text-center px-8 pt-8">
                <h1 className="text-3xl md:text-4xl font-bold text-brand-brinjal mb-2">
                  THINKBOTZ STUDENT ASSOCIATION
                </h1>
                <p className="text-brand-brinjal/70 text-sm md:text-base font-semibold">
                  Dept. of CSE(AI & ML)
                </p>
              </div>

              {/* Large Image in Middle - Takes up remaining space */}
              <div className="flex-grow flex items-center justify-center w-full px-8 py-4 max-h-[60vh]">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/5 to-brand-brinjal/5 rounded-2xl blur-3xl" />
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={preview.index}
                      src={preview.media[preview.index]}
                      alt={`${preview.title} - ${preview.index + 1}`}
                      className="relative max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    />
                  </AnimatePresence>
                </div>
              </div>

              {/* Event Name at Bottom */}
              <div className="w-full text-center px-8 pb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-brinjal mb-2">
                  {preview.title}
                </h2>
                <p className="text-brand-brinjal/70 text-sm">
                  {preview.index + 1} / {preview.media.length}
                </p>
              </div>

              {/* Control Buttons */}
              <div className="absolute top-6 right-6 z-50 flex gap-3">
                {/* Play/Pause Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-3 rounded-full bg-brand-brinjal/10 hover:bg-brand-brinjal/20 transition-all duration-300 border border-brand-brinjal/30 hover:border-brand-brinjal/50"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-brand-brinjal" />
                  ) : (
                    <Play className="w-5 h-5 text-brand-brinjal" />
                  )}
                </button>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setPreview(null);
                    setIsPlaying(false);
                  }}
                  className="p-3 rounded-full bg-brand-brinjal/10 hover:bg-brand-brinjal/20 transition-all duration-300 border border-brand-brinjal/30 hover:border-brand-brinjal/50"
                  aria-label="Close slideshow"
                >
                  <X className="w-5 h-5 text-brand-brinjal" />
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
};

const timelineData: TimelineEntry[] = [
  {
    date: "",
    fullYear: "",
    title: "Inauguration Event",
    description: "Marked the beginning of ThinkBotz with an inspiring inauguration that brought students and faculty together to kick off our journey.",
    media: [
      "https://drive.google.com/thumbnail?id=1EMjRrIZYbhyBH_LWualM0cbPRL8rE8nM&sz=w1200",
      "https://drive.google.com/thumbnail?id=17Vq0DcRJLPfcG3Ixq43RvlI2lCTUEE-H&sz=w1200",
      "https://drive.google.com/thumbnail?id=17bJmBuynyk7cDa5CCsI0vns_iUJ-yz4A&sz=w1200",
      "https://drive.google.com/thumbnail?id=1H_Tp264cCutvJvkGF33P2S_PvCjD1Yf1&sz=w1200",
      "https://drive.google.com/thumbnail?id=1d3MCbGycf7oT5ScCRqkXLqhMi6Fnif1G&sz=w1200",
      "https://drive.google.com/thumbnail?id=10qnhHVpRKOgwDlJhXdIvpffnncvk2ZSJ&sz=w1200",
    ],
  },
  {
    date: "Sep 11",
    fullYear: "2025",
    title: "MindSpark Quiz",
    description: "Launched our first major event - a technical quiz competition testing logical reasoning, problem-solving skills, and fundamental programming knowledge. Participants competed in multiple rounds covering Logical Reasoning, C, Python, Java, and core technical concepts.",
    galleryKey: "MindSpark",
    media: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    ],
  },
  {
    date: "Sep 19",
    fullYear: "2025",
    title: "Prompt Fusion Event",
    description: "Explored AI creativity with our second event where students demonstrated AI-powered prompt generation, image creation, and video generation skills. Participants challenged themselves with creative prompts and innovative AI-powered tasks.",
    galleryKey: "PromptFusion",
    media: [
      "https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    ],
  },
  {
    date: "Dec 10",
    fullYear: "2025",
    title: "Poster Vision",
    description: "Showcased student creativity through poster presentation competition. Students demonstrated innovative ideas and technical knowledge through visually engaging posters, enhancing presentation skills and creative thinking.",
    galleryKey: "PosterVision",
    media: [
      "https://images.unsplash.com/photo-1677442d019cecf8978f1e0b6d34be7f8c3b4d9f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=600&h=400&fit=crop",
    ],
  },
  {
    date: "Dec 23",
    fullYear: "2025",
    title: "Smart Stack",
    description: "Conducted an AI Tools Show & Tell event where students demonstrated and discussed various AI tools in an interactive format. Participants showcased technical knowledge, creativity, and practical understanding of cutting-edge AI technologies.",
    galleryKey: "PromptStack",
    media: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1677442d019cecf8978f1e0b6d34be7f8c3b4d9f?w=600&h=400&fit=crop",
    ],
  },
  {
    date: "Jan 2-5",
    fullYear: "2026",
    title: "FFSAL eSports League",
    description: "Organized the Free Fire Student Association League gaming competition showcasing strategic thinking, teamwork, and competitive gameplay. Participants demonstrated coordination, tactical planning, and decision-making skills.",
    galleryKey: "FFSAL",
    media: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=600&h=400&fit=crop",
    ],
  },
];

export default function Timeline() {
  const [sections, setSections] = useState<DriveGallerySection[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const apiKey = import.meta.env.VITE_DRIVE_API_KEY as string | undefined;

    const projects = [
      { title: "MindSpark", folderId: import.meta.env.VITE_DRIVE_MINDSPARK_FOLDER_ID as string },
      { title: "PromptFusion", folderId: import.meta.env.VITE_DRIVE_PROMPTFUSION_FOLDER_ID as string },
      { title: "PosterVision", folderId: import.meta.env.VITE_DRIVE_POSTERVISION_FOLDER_ID as string },
      { title: "PromptStack", folderId: import.meta.env.VITE_DRIVE_PROMPTSTACK_FOLDER_ID as string },
      { title: "FFSAL", folderId: import.meta.env.VITE_DRIVE_FFSAL_FOLDER_ID as string },
      { title: "Inauguration Event", folderId: import.meta.env.VITE_DRIVE_INAUGURATION_FOLDER_ID as string },
    ];

    fetchMultipleFolders(apiKey ?? "", projects, controller.signal)
      .then((items) => setSections(items))
      .catch((err) => console.error(err));

    return () => controller.abort();
  }, []);

  const resolvedTimelineData = useMemo(() => {
    if (sections.length === 0) return timelineData;

    return timelineData.map((item) => {
      if (!item.galleryKey) return item;

      const section = sections.find((entry) => entry.title === item.galleryKey);
      const media = section?.images.slice(0, 6).map((img) => img.thumbnailUrl) ?? [];

      return {
        ...item,
        media: media.length > 0 ? media : item.media,
      };
    });
  }, [sections]);

  return (
    <div className="bg-white dark:bg-neutral-950">
      <TimelineComponent data={resolvedTimelineData} />
    </div>
  );
}
