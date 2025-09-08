import { useState } from "react";

// Grouped gallery data: each event/section has a title, date, and an array of images (only src)
const gallerySections = [
	{
		title: "Tech Fest 2023",
		date: "2023-03-15",
		images: [
			{ src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" },
			{ src: "https://images.unsplash.com/photo-1551818255-e6e10975cd17?w=800&q=80" },
			{ src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80" },
		],
	},
	{
		title: "Research Symposium 2023",
		date: "2023-04-02",
		images: [
			{ src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
			{ src: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80" },
		],
	},
	{
		title: "Team Building 2023",
		date: "2023-09-15",
		images: [
			{ src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" },
			{ src: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&q=80" },
		],
	},
	{
		title: "Graduation 2023",
		date: "2023-05-15",
		images: [
			{ src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80" },
		],
	},
	// Add new sections for new events, each with their images array
];

export default function Gallery() {
	const [selectedImage, setSelectedImage] = useState<{
		src: string;
		sectionTitle: string;
		date: string;
	} | null>(null);

	return (
		<div className="min-h-screen py-12 bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
						Gallery
					</h1>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Relive the best moments from our events. Add new event images anytime—just update the gallerySections list!
					</p>
				</div>

				{/* Dynamic Event Sections */}
				<div className="space-y-16">
					{gallerySections.map((section, sectionIdx) => (
						<div key={sectionIdx}>
							{/* Section Header */}
							<div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
								<div>
									<h2 className="text-2xl font-bold text-brand-brinjal">
										{section.title}
									</h2>
									<div className="text-sm text-muted-foreground">
										{new Date(section.date).toLocaleDateString()}
									</div>
								</div>
							</div>
							{/* Images Grid */}
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
								{section.images.map((img, imgIdx) => (
									<div
										key={imgIdx}
										className="group rounded-2xl overflow-hidden bg-white shadow hover:shadow-lg transition-all cursor-pointer"
										onClick={() =>
											setSelectedImage({
												src: img.src,
												sectionTitle: section.title,
												date: section.date,
											})
										}
									>
										<div className="aspect-[4/3] overflow-hidden">
											<img
												src={img.src}
												alt={section.title}
												className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
												loading="lazy"
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Image Modal */}
				{selectedImage && (
					<div
						className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
						onClick={() => setSelectedImage(null)}
					>
						<div
							className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-lg"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="aspect-video overflow-hidden">
								<img
									src={selectedImage.src}
									alt={selectedImage.sectionTitle}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="p-6 space-y-3 text-center">
								<h2 className="text-2xl font-bold">{selectedImage.sectionTitle}</h2>
								<div className="text-sm text-muted-foreground">
									{new Date(selectedImage.date).toLocaleDateString()}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}