import { useEffect, useState } from "react";
import { fetchMultipleFolders, type DriveGallerySection, type DriveImage } from "@/lib/driveGallery";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, Pause, X, Presentation } from "lucide-react";

const tags = ["All", "MindSpark", "PromptFusion", "PosterVision", "PromptStack", "FFSAL", "Inauguration Event"];

// Event descriptions from Timeline
const eventDescriptions: Record<string, string> = {
	"Inauguration Event": "Marked the beginning of ThinkBotz with an inspiring inauguration that brought students and faculty together to kick off our journey.",
	"MindSpark": "Launched our first major event - a technical quiz competition testing logical reasoning, problem-solving skills, and fundamental programming knowledge. Participants competed in multiple rounds covering Logical Reasoning, C, Python, Java, and core technical concepts.",
	"PromptFusion": "Explored AI creativity with our second event where students demonstrated AI-powered prompt generation, image creation, and video generation skills. Participants challenged themselves with creative prompts and innovative AI-powered tasks.",
	"PosterVision": "Showcased student creativity through poster presentation competition. Students demonstrated innovative ideas and technical knowledge through visually engaging posters, enhancing presentation skills and creative thinking.",
	"PromptStack": "Conducted an AI Tools Show & Tell event where students demonstrated and discussed various AI tools in an interactive format. Participants showcased technical knowledge, creativity, and practical understanding of cutting-edge AI technologies.",
	"FFSAL": "Organized the Free Fire Student Association League gaming competition showcasing strategic thinking, teamwork, and competitive gameplay. Participants demonstrated coordination, tactical planning, and decision-making skills.",
};

export default function Gallery() {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const [sections, setSections] = useState<DriveGallerySection[]>([]);
	const [selectedTag, setSelectedTag] = useState("All");
	const [isLoading, setIsLoading] = useState(true);
	const [slideshowMode, setSlideshowMode] = useState(false);
	const [slideshowIndex, setSlideshowIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(true);

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

		setIsLoading(true);

		fetchMultipleFolders(apiKey ?? "", projects, controller.signal)
			.then((items) => setSections(items))
			.catch((err) => console.error(err))
			.finally(() => setIsLoading(false));

		return () => controller.abort();
	}, []);

	const filteredSections = selectedTag === "All"
		? sections
		: sections.filter((section) => section.title === selectedTag);

	const flatImages = sections.flatMap((section) =>
		section.images.map((img) => ({ img, sectionTitle: section.title }))
	);
	const selectedImage = selectedIndex !== null ? flatImages[selectedIndex] : null;

	// Auto-play slideshow timer
	useEffect(() => {
		if (!slideshowMode || !isPlaying || flatImages.length === 0) return;

		const timer = setInterval(() => {
			setSlideshowIndex((prev) => (prev + 1) % flatImages.length);
		}, 3000); // Change image every 3 seconds

		return () => clearInterval(timer);
	}, [slideshowMode, isPlaying, flatImages.length]);

	// Keyboard navigation for slideshow
	useEffect(() => {
		if (!slideshowMode) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setSlideshowMode(false);
			} else if (e.key === "ArrowRight") {
				setSlideshowIndex((prev) => (prev + 1) % flatImages.length);
			} else if (e.key === "ArrowLeft") {
				setSlideshowIndex((prev) => (prev - 1 + flatImages.length) % flatImages.length);
			} else if (e.key === " ") {
				e.preventDefault();
				setIsPlaying((prev) => !prev);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [slideshowMode, flatImages.length]);

	const handleStartSlideshow = () => {
		if (flatImages.length === 0) return;
		setSlideshowIndex(0);
		setIsPlaying(true);
		setSlideshowMode(true);
	};

	const handleNextSlide = () => {
		setSlideshowIndex((prev) => (prev + 1) % flatImages.length);
	};

	const handlePrevSlide = () => {
		setSlideshowIndex((prev) => (prev - 1 + flatImages.length) % flatImages.length);
	};

	return (
		<div className="min-h-screen pt-28 md:pt-28 pb-16 md:pb-20 bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-10 md:mb-16">
					<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
						Gallery
					</h1>
					<p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
						Explore projects and events from our amazing teams.
					</p>
					{flatImages.length > 0 && (
						<Button
							onClick={handleStartSlideshow}
							className="bg-brand-brinjal hover:bg-brand-purple text-white"
						>
							<Presentation className="w-4 h-4 mr-2" />
							Start Slideshow
						</Button>
					)}
				</div>

				{/* Tags Filter - Desktop Buttons */}
				<div className="hidden md:flex justify-center mb-10 md:mb-16 gap-2 flex-wrap">
					{tags.map((tag) => (
						<button
							key={tag}
							className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
								selectedTag === tag
									? "bg-brand-brinjal text-white"
									: "bg-gray-200 text-gray-700 hover:bg-gray-300"
							}`}
							onClick={() => setSelectedTag(tag)}
						>
							{tag}
						</button>
					))}
				</div>

				{/* Tags Filter - Mobile Dropdown */}
			<div className="md:hidden mb-8 md:mb-10 flex justify-center">
					<Select value={selectedTag} onValueChange={setSelectedTag}>
						<SelectTrigger className="w-full max-w-xs">
							<SelectValue placeholder="Select a project" />
						</SelectTrigger>
						<SelectContent>
							{tags.map((tag) => (
								<SelectItem key={tag} value={tag}>
									{tag}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Project Sections */}
				{isLoading ? (
				<div className="text-center text-muted-foreground py-16">Loading images...</div>
			) : filteredSections.length > 0 && filteredSections.some((s) => s.images.length > 0) ? (
				<div className="space-y-14 md:space-y-20">
						{filteredSections.map((section) => (
							section.images.length > 0 && (
								<div key={section.title}>
									{/* Section Header */}
								<div className="mb-6 md:mb-8">
									<h2 className="text-2xl md:text-3xl font-bold text-brand-brinjal mb-2">
											{section.title}
										</h2>
										<div className="text-xs md:text-sm text-muted-foreground">
											{section.images.length} {section.images.length === 1 ? "image" : "images"}
										</div>
									</div>
									{/* Images Grid */}
									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
										{section.images.map((img) => (
											<div
												key={img.id}
												className="group rounded-lg md:rounded-2xl overflow-hidden bg-white shadow hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
												onClick={() => {
													const index = sections
														.flatMap((s) => s.images.map((i) => ({ img: i, sectionTitle: s.title })))
														.findIndex((entry) => entry.img.id === img.id);
													setSelectedIndex(index >= 0 ? index : null);
												}}
											>
												<div className="aspect-square overflow-hidden bg-gray-100">
													<img
														src={img.thumbnailUrl}
														alt={`${section.title} image`}
														className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
														loading="lazy"
													/>
												</div>
											</div>
										))}
									</div>
								</div>
							)
						))}
					</div>
				) : (
					<div className="text-center py-12">
						<p className="text-muted-foreground text-sm md:text-base">
							{selectedTag === "All" ? "No images found." : `No images available for ${selectedTag}.`}
						</p>
					</div>
				)}

				{/* Fullscreen Slideshow Modal */}
				<Dialog open={slideshowMode} onOpenChange={setSlideshowMode}>
					<DialogContent className="max-w-full w-screen h-screen p-0 border-0">
						{/* Gradient Background */}
						<div className="absolute inset-0 bg-gradient-to-br from-brand-lavender via-white to-brand-lavender" />
						
						{/* Content Container */}
						<div className="relative w-full h-full flex items-stretch overflow-hidden">
							{/* Left Side - Image */}
							{flatImages[slideshowIndex] && (
								<>
									<div className="w-1/2 flex items-center justify-center p-8 md:p-12">
										<div className="relative w-full h-full flex items-center justify-center">
											<div className="absolute inset-0 bg-gradient-to-r from-brand-purple/5 to-brand-brinjal/5 rounded-2xl blur-3xl" />
											<img
												src={flatImages[slideshowIndex].img.thumbnailUrl.replace('=s220', '=s2048')}
												alt={`${flatImages[slideshowIndex].sectionTitle} image`}
												className="relative max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
											/>
										</div>
									</div>

									{/* Right Side - Event Details */}
									<div className="w-1/2 flex flex-col items-center justify-center p-8 md:p-16 bg-gradient-to-br from-brand-lavender/40 to-white backdrop-blur-sm border-l-4 border-brand-brinjal/20">
										{/* Header */}
										<div className="w-full text-center mb-12">
											<h1 className="text-3xl md:text-4xl font-bold text-brand-brinjal mb-2">
												THINKBOTZ STUDENT ASSOCIATION
											</h1>
											<p className="text-brand-brinjal/70 text-sm md:text-base font-semibold">
												Dept. of CSE(AI & ML)
											</p>
										</div>

										<div className="max-w-lg w-full space-y-8">
											{/* Event Title */}
											<div className="space-y-4">
												<div className="inline-block px-4 py-2 rounded-full bg-brand-brinjal/10 border border-brand-brinjal/30">
													<p className="text-brand-brinjal text-sm font-semibold uppercase tracking-wider">
														Event
													</p>
												</div>
												<h2 className="text-4xl md:text-5xl font-bold text-brand-brinjal leading-tight">
													{flatImages[slideshowIndex].sectionTitle}
												</h2>
											</div>

											{/* Event Description */}
											<div className="space-y-4 border-t-2 border-brand-brinjal/20 pt-8">
												<p className="text-brand-brinjal/70 text-sm uppercase tracking-widest font-semibold">About Event</p>
												<p className="text-brand-brinjal text-base leading-relaxed">
													{eventDescriptions[flatImages[slideshowIndex].sectionTitle] || "Explore the moments captured from this amazing event."}
												</p>
											</div>
										</div>
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
											onClick={() => setSlideshowMode(false)}
											className="p-3 rounded-full bg-brand-brinjal/10 hover:bg-brand-brinjal/20 transition-all duration-300 border border-brand-brinjal/30 hover:border-brand-brinjal/50"
											aria-label="Close slideshow"
										>
											<X className="w-5 h-5 text-brand-brinjal" />
										</button>
									</div>
								</>
							)}
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}