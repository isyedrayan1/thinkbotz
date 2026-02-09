import { useEffect, useState } from "react";
import { hardcodedGallerySections, type DriveGallerySection, type DriveImage } from "@/lib/driveGallery";

const tags = ["All", "MindSpark", "PromptFusion", "PosterVision", "PromptStack", "FFSAL", "Inauguration Event"];

export default function Gallery() {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const [sections, setSections] = useState<DriveGallerySection[]>(hardcodedGallerySections);
	const [selectedTag, setSelectedTag] = useState("All");

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
				{filteredSections.length > 0 && (
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
				)}

				{/* Image Modal */}
				{selectedImage && (
					<div
						className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
						onClick={() => {
							setSelectedIndex(null);
							setImageLoadError(false);
							setZoom(1);
							setOffset({ x: 0, y: 0 });
						}}
					>
						<div
							className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-lg"
							onClick={(e) => e.stopPropagation()}
						>
							<div
								className="aspect-video overflow-hidden bg-gray-100 flex items-center justify-center relative"
								onWheel={(event) => {
									event.preventDefault();
									const delta = event.deltaY > 0 ? -0.1 : 0.1;
									setZoom((current) => {
										const next = Math.min(5, Math.max(1, current + delta));
										if (next === 1) {
											setOffset({ x: 0, y: 0 });
										}
										return Number(next.toFixed(2));
									});
								}}
								onMouseMove={(event) => {
									if (!isDragging || zoom <= 1) return;
									const nextX = event.clientX - dragStart.x;
									const nextY = event.clientY - dragStart.y;
									setOffset({ x: nextX, y: nextY });
								}}
								onMouseUp={() => setIsDragging(false)}
								onMouseLeave={() => setIsDragging(false)}
								onTouchMove={(event) => {
									if (!isDragging || zoom <= 1) return;
									const touch = event.touches[0];
									if (!touch) return;
									const nextX = touch.clientX - dragStart.x;
									const nextY = touch.clientY - dragStart.y;
									setOffset({ x: nextX, y: nextY });
								}}
								onTouchEnd={() => setIsDragging(false)}
							>
								{imageLoadError ? (
									<div className="text-center text-gray-500 p-4">
										<p>Failed to load image</p>
										<p className="text-sm text-gray-400 mt-2">Try refreshing the page</p>
									</div>
								) : (
									<img
										src={selectedImage.img.fullUrl}
										alt={`${selectedImage.sectionTitle} image`}
										className={`w-full h-full object-contain transition-transform duration-200 ${
											zoom > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : ""
										}`}
										style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }}
										onMouseDown={(event) => {
											if (zoom <= 1) return;
											event.preventDefault();
											setIsDragging(true);
											setDragStart({ x: event.clientX - offset.x, y: event.clientY - offset.y });
										}}
										onTouchStart={(event) => {
											if (zoom <= 1) return;
											const touch = event.touches[0];
											if (!touch) return;
											setIsDragging(true);
											setDragStart({ x: touch.clientX - offset.x, y: touch.clientY - offset.y });
										}}
										onError={() => setImageLoadError(true)}
										loading="eager"
										decoding="async"
									/>
								)}
								{flatImages.length > 1 && (
									<>
										<button
											type="button"
											className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shadow transition"
											aria-label="Previous image"
											onClick={(e) => {
												e.stopPropagation();
												setImageLoadError(false);
												setSelectedIndex((current) => {
													if (current === null) return 0;
													return (current - 1 + flatImages.length) % flatImages.length;
												});
												setOffset({ x: 0, y: 0 });
												setZoom(1);
											}}
										>
											<span aria-hidden="true">‹</span>
										</button>
										<button
											type="button"
											className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shadow transition"
											aria-label="Next image"
											onClick={(e) => {
												e.stopPropagation();
												setImageLoadError(false);
												setSelectedIndex((current) => {
													if (current === null) return 0;
													return (current + 1) % flatImages.length;
												});
												setOffset({ x: 0, y: 0 });
												setZoom(1);
											}}
										>
											<span aria-hidden="true">›</span>
										</button>
									</>
								)}
								{!imageLoadError && (
									<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 text-gray-900 rounded-full px-3 py-1.5 shadow">
										<button
											type="button"
											className="w-7 h-7 rounded-full hover:bg-gray-100"
											aria-label="Zoom out"
											onClick={(e) => {
												e.stopPropagation();
												setZoom((current) => {
													const next = Math.max(1, Number((current - 0.25).toFixed(2)));
													if (next === 1) {
														setOffset({ x: 0, y: 0 });
													}
													return next;
												});
											}}
										>
											-
										</button>
										<span className="text-xs font-medium w-12 text-center">{Math.round(zoom * 100)}%</span>
										<button
											type="button"
											className="w-7 h-7 rounded-full hover:bg-gray-100"
											aria-label="Zoom in"
											onClick={(e) => {
												e.stopPropagation();
												setZoom((current) => Math.min(5, Number((current + 0.25).toFixed(2))));
											}}
										>
											+
										</button>
										<button
											type="button"
											className="text-xs px-2 py-1 rounded-full hover:bg-gray-100"
											aria-label="Reset zoom"
											onClick={(e) => {
												e.stopPropagation();
												setZoom(1);
												setOffset({ x: 0, y: 0 });
											}}
										>
											Reset
										</button>
									</div>
								)}
							</div>
							<div className="p-6 space-y-3 text-center">
								<h2 className="text-2xl font-bold">{selectedImage.sectionTitle}</h2>
								{selectedImage.img.createdTime && (
									<div className="text-sm text-muted-foreground">
										{new Date(selectedImage.img.createdTime).toLocaleDateString()}
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}