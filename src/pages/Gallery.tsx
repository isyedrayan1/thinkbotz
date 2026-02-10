import { useEffect, useState } from "react";
import { fetchMultipleFolders, type DriveGallerySection, type DriveImage } from "@/lib/driveGallery";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const tags = ["All", "MindSpark", "PromptFusion", "PosterVision", "PromptStack", "FFSAL", "Inauguration Event"];

export default function Gallery() {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const [sections, setSections] = useState<DriveGallerySection[]>([]);
	const [selectedTag, setSelectedTag] = useState("All");
	const [isLoading, setIsLoading] = useState(true);

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

	return (
		<div className="min-h-screen pt-28 md:pt-28 pb-16 md:pb-20 bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-10 md:mb-16">
					<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
						Gallery
					</h1>
					<p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
						Explore projects and events from our amazing teams.
					</p>
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
			</div>
		</div>
	);
}