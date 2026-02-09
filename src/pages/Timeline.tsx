"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  date: string;
  fullYear: string;
  title: string;
  description: string;
  media: string[];
}

const TimelineComponent = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

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

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans"
      ref={containerRef}
    >
      {/* Full Viewport Hero Section */}
      <div className="relative w-full h-screen flex items-center justify-center px-4 md:px-10 pt-16 md:pt-20 lg:pt-24">
        <div className="text-center max-w-5xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-brand-purple to-brand-brinjal bg-clip-text text-transparent mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Journey Timeline
          </motion.h2>
          <motion.p
            className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Follow our milestone achievements and major events that shaped our success.
          </motion.p>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="relative max-w-7xl mx-auto pb-20 md:px-10" ref={ref}>
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-96 md:gap-10 min-h-screen md:min-h-auto"
          >
            {/* Left: Sticky Year/Title Container */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <div className="hidden md:flex md:flex-col md:pl-20 items-start">
                <h3 className="text-xl md:text-4xl font-bold text-neutral-500 dark:text-neutral-500">
                  {item.date}
                </h3>
                <p className="text-sm md:text-lg text-neutral-400 dark:text-neutral-600 font-semibold">
                  {item.fullYear}
                </p>
              </div>
            </div>

            {/* Right: Content and Media Container */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <div className="md:hidden block mb-4">
                <h3 className="text-2xl font-bold text-neutral-500 dark:text-neutral-500">
                  {item.date}
                </h3>
                <p className="text-sm text-neutral-400 dark:text-neutral-600 font-semibold">
                  {item.fullYear}
                </p>
              </div>

              {/* Content Section */}
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-semibold text-neutral-800 dark:text-neutral-200 mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg leading-relaxed">
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
                    className="w-full h-48 md:h-64 rounded-xl object-cover shadow-md border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-shadow duration-300"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: mediaIndex * 0.1 }}
                    viewport={{ once: false, amount: 0.3 }}
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
    </div>
  );
};

const timelineData: TimelineEntry[] = [
  {
    date: "Sep 11",
    fullYear: "2025",
    title: "MindSpark Quiz",
    description: "Launched our first major event - a technical quiz competition testing logical reasoning, problem-solving skills, and fundamental programming knowledge. Participants competed in multiple rounds covering Logical Reasoning, C, Python, Java, and core technical concepts.",
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
    media: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=600&h=400&fit=crop",
    ],
  },
  {
    date: "Feb",
    fullYear: "2026",
    title: "Continuous Growth",
    description: "ThinkBotz Student Association continues to grow with more exciting events, workshops, and competitions. Building a vibrant community of AI & ML enthusiasts and fostering innovation across the department.",
    media: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1677442d019cecf8978f1e0b6d34be7f8c3b4d9f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    ],
  },
];

export default function Timeline() {
  return (
    <div className="bg-white dark:bg-neutral-950">
      <TimelineComponent data={timelineData} />
    </div>
  );
}
