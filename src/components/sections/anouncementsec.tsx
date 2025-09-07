import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

const announcements = [
	{
		id: 1,
		title: "Association Inauguration",
		description:
			"Join us for the biggest tech event of the year with coding competitions, workshops, and prizes worth ₹50,000+",
		date: "Sept 4, 2025",
		isNew: true,
	},
	{
		id: 2,
		title: "Upcoming Events",
		description:
			"There are many exciting events lined up for this semester. Stay tuned for more details! and check events page and register",
		date: "",
		isNew: true,
	},
	// Add more cards to test the animation!
];

export default function AnnouncementSec() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [cardsPerView, setCardsPerView] = useState(3);
	const [shouldScroll, setShouldScroll] = useState(false);
	const [cardWidth, setCardWidth] = useState(320);

	// Responsive: determine cards per view and card width
	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			if (width < 640) {
				setCardsPerView(1);
				setCardWidth(280);
			} else if (width < 1024) {
				setCardsPerView(2);
				setCardWidth(300);
			} else {
				setCardsPerView(3);
				setCardWidth(320);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Check if we need to scroll (more cards than fit)
	useEffect(() => {
		setShouldScroll(announcements.length > cardsPerView);
	}, [cardsPerView]);

	// Animation duration: longer for more cards
	const duration = announcements.length * 4; // seconds

	// Duplicate cards for seamless infinite scroll
	const cardsToShow = shouldScroll
		? [...announcements, ...announcements]
		: announcements;

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
				<div
					className="relative w-full overflow-hidden"
					tabIndex={0}
					aria-label="Announcements carousel"
				>
					<div
						ref={containerRef}
						className={`flex gap-6 ${shouldScroll ? "" : "justify-center"}`}
						style={
							shouldScroll
								? {
										animation: `announcement-scroll ${duration}s linear infinite`,
										width: `max-content`,
								  }
								: {}
						}
					>
						{cardsToShow.map((announcement, idx) => (
							<div
								key={announcement.id + "-" + idx}
								style={{
									width: `${cardWidth}px`,
									maxWidth: "90vw",
									flex: "0 0 auto",
								}}
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
			{/* Animation keyframes */}
			<style>
				{`
          @keyframes announcement-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${(cardWidth + 24) * announcements.length}px); }
          }
        `}
			</style>
		</section>
	);
}