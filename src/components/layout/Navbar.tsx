import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
	{ name: "Home", href: "/" },
	{ name: "About", href: "/about" },
	{ name: "Events", href: "/events" },
	{ name: "Gallery", href: "/gallery" },
	{ name: "Contact", href: "/contact" },
];

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();

	const isActive = (href: string) => location.pathname === href;

	return (
		<nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					{/* Logo and Brand */}
					<div className="flex items-center space-x-3">
						<Link
							to="/"
							className="font-inter font-extrabold text-lg sm:text-xl bg-gradient-to-r from-brand-purple to-brand-brinjal bg-clip-text text-transparent hover:opacity-80 transition-opacity"
						>
							ThinkBotz
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex md:items-center md:space-x-8">
						{navigation.map((item) => (
							<Link
								key={item.name}
								to={item.href}
								className={cn(
									"px-3 py-2 text-sm font-medium rounded-lg transition-colors",
									isActive(item.href)
										? "bg-brand-lavender text-brand-brinjal"
										: "text-muted-foreground hover:text-foreground hover:bg-brand-lavender/50"
								)}
							>
								{item.name}
							</Link>
						))}
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden flex items-center">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setIsOpen(!isOpen)}
							className="p-2"
						>
							{isOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</Button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isOpen && (
					<div className="md:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
							{navigation.map((item) => (
								<Link
									key={item.name}
									to={item.href}
									onClick={() => setIsOpen(false)}
									className={cn(
										"block px-3 py-2 text-base font-medium rounded-lg transition-colors",
										isActive(item.href)
											? "bg-brand-lavender text-brand-brinjal"
											: "text-muted-foreground hover:text-foreground hover:bg-brand-lavender/50"
									)}
								>
									{item.name}
								</Link>
							))}
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}