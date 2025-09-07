import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

const announcements = [
	{
		id: 1,
		title: "Annual Tech Fest 2024",
		description:
			"Join us for the biggest tech event of the year with coding competitions, workshops, and prizes worth ₹50,000+",
		date: "March 15, 2024",
		isNew: true,
	},
	{
		id: 2,
		title: "Student Council Elections",
		description:
			"Nominations are now open for the upcoming student council elections. Be the change you want to see!",
		date: "March 10, 2024",
		isNew: true,
	},
	{
		id: 3,
		title: "Workshop: Web Development Bootcamp",
		description:
			"Free 3-day intensive workshop on modern web development. Limited seats available.",
		date: "March 8, 2024",
		isNew: false,
	},
];

export default function AnnouncementSec() {
	const [index, setIndex] = useState(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const [isMobile, setIsMobile] = useState(false);

	// Responsive: update on resize
	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const total = announcements.length;
	const visibleCount = isMobile ? 1 : Math.min(3, total);

	// For infinite scroll: duplicate the array if needed
	const carouselItems =
		total > visibleCount ? [...announcements, ...announcements] : announcements;

	// Animation logic: always scroll forward, reset to 0 for seamless loop
	useEffect(() => {
		if (total <= visibleCount) return;
		intervalRef.current = setInterval(() => {
			setIndex((prev) => {
				if (prev + 1 > carouselItems.length - visibleCount) {
					return 0;
				}
				return prev + 1;
			});
		}, 3500);

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [total, visibleCount, carouselItems.length]);

	// Calculate translateX for the carousel
	// For 3 cards, stretch them to fill the container responsively
	// For more, use fixed width for smooth scroll
	let cardStyle: React.CSSProperties = {};
	let containerStyle: React.CSSProperties = {};
	let translateX = "0px";

	if (total > visibleCount) {
		// Carousel mode (fixed width)
		const cardWidth = isMobile ? 320 : 340;
		const gap = isMobile ? 12 : 24;
		containerStyle = {
			width: `${carouselItems.length * (cardWidth + gap)}px`,
			transform: `translateX(-${index * (cardWidth + gap)}px)`,
			gap: `${gap}px`,
			pointerEvents: "none",
			transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
		};
		cardStyle = {
			width: `${cardWidth}px`,
			maxWidth: "100%",
			flex: "0 0 auto",
		};
	} else {
		// Stretch mode (responsive)
		containerStyle = {
			width: "100%",
			gap: isMobile ? "12px" : "24px",
			pointerEvents: "none",
		};
		cardStyle = {
			flex: "1 1 0%",
			minWidth: 0,
			maxWidth: "100%",
		};
	}

	return (
		<section className="py-16 bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-foreground mb-4">
						Latest Announcements
					</h2>
					<p className="text-muted-foreground">
						Stay updated with the latest news and important updates
					</p>
				</div>
				<div className="relative w-full overflow-hidden">
					<div
						className="flex"
						style={containerStyle}
					>
						{carouselItems.map((announcement, idx) => (
							<div
								key={idx}
								style={cardStyle}
								className="last:mr-0"
							>
								<Card className="h-full shadow-lg flex flex-col justify-between">
									<CardHeader>
										<div className="flex items-start justify-between">
											<div className="flex items-center space-x-2">
												<Bell className="w-5 h-5 text-brand-purple" />
												{announcement.isNew && (
													<span className="bg-brand-purple text-white text-xs px-2 py-1 rounded-full">
														New
													</span>
												)}
											</div>
											<span className="text-sm text-muted-foreground">
												{announcement.date}
											</span>
										</div>
										<CardTitle className="text-lg">
											{announcement.title}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<CardDescription className="text-sm leading-relaxed">
											{announcement.description}
										</CardDescription>
									</CardContent>
								</Card>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}