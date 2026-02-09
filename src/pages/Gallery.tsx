import { useEffect, useState } from "react";
import { fetchMultipleFolders, type DriveGallerySection, type DriveImage } from "@/lib/driveGallery";

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
		<div className="min-h-screen py-12 bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
						Gallery
					</h1>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Explore projects and events from our amazing teams.
					</p>
				</div>

				{/* Tags Filter */}
				<div className="flex justify-center mb-8 space-x-4">
					{tags.map((tag) => (
						<button
							key={tag}
							className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
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

				{/* Project Sections */}
				{isLoading ? (
					<div className="text-center text-muted-foreground">Loading images...</div>
				) : filteredSections.length > 0 ? (
					<div className="space-y-16">
						{filteredSections.map((section) => (
							section.images.length > 0 && (
								<div key={section.title}>
									{/* Section Header */}
									<div className="mb-6">
										<h2 className="text-2xl font-bold text-brand-brinjal">
											{section.title}
										</h2>
										<div className="text-sm text-muted-foreground">
											{section.images.length} images
										</div>
									</div>
									{/* Images Grid */}
									<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
										{section.images.map((img) => (
											<div
												key={img.id}
												className="group rounded-2xl overflow-hidden bg-white shadow hover:shadow-lg transition-all cursor-pointer"
												onClick={() => {
													const index = sections
														.flatMap((s) => s.images.map((i) => ({ img: i, sectionTitle: s.title })))
														.findIndex((entry) => entry.img.id === img.id);
													setSelectedIndex(index >= 0 ? index : null);
												}}
											>
												<div className="aspect-[4/3] overflow-hidden">
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
					<div className="text-center text-muted-foreground">No images found.</div>
				)}
			</div>
		</div>
	);
}