import { Link } from "react-router-dom";

const navigation = [
	{ name: "Home", href: "/" },
	{ name: "About", href: "/about" },
	{ name: "Events", href: "/events" },
	{ name: "Gallery", href: "/gallery" },
	{ name: "Contact", href: "/contact" },
];

export function Footer() {
	return (
		<footer className="bg-gradient-to-br from-brand-lavender via-background to-brand-lavender/50 border-t border-border mt-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center md:justify-between gap-8">
				{/* Brand */}
				<Link
					to="/"
					className="font-inter font-extrabold text-3xl md:text-4xl bg-gradient-to-r from-brand-purple to-brand-brinjal bg-clip-text text-transparent drop-shadow"
				>
					ThinkBotz
				</Link>
				{/* Navigation */}
				<nav className="flex flex-wrap justify-center gap-6">
					{navigation.map((item) => (
						<Link
							key={item.name}
							to={item.href}
							className="font-bold text-base text-muted-foreground hover:text-brand-brinjal transition-colors"
						>
							{item.name}
						</Link>
					))}
				</nav>
			</div>
			<div className="text-center text-xs text-muted-foreground py-4 space-y-1">
				<div>
					&copy; {new Date().getFullYear()} ThinkBotz. All rights reserved.
				</div>
				<div>
					Website created by{" "}
					<a
						href="https://isyedrayan.online"
						target="_blank"
						rel="noopener noreferrer"
						className="text-brand-brinjal underline font-semibold hover:text-brand-purple"
					>
						Syed Rayan
					</a>
					{" "} | Technical Team - ThinkBotz
				</div>
			</div>
		</footer>
	);
}