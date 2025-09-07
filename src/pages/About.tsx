import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Users, Target, Eye } from "lucide-react";

const hierarchyMembers = [
	{
		role: "Head of Department",
		name: "Dr. Sarah Johnson",
		email: "sarah.johnson@college.edu",
		phone: "+1 (555) 123-4567",
		level: "faculty",
	},
	{
		role: "President",
		name: "Alex Martinez",
		email: "alex.martinez@student.college.edu",
		phone: "+1 (555) 234-5678",
		level: "executive",
	},
	{
		role: "Co-President",
		name: "Emily Chen",
		email: "emily.chen@student.college.edu",
		phone: "+1 (555) 345-6789",
		level: "executive",
	},
	{
		role: "Technical Team Lead",
		name: "Michael Brown",
		email: "michael.brown@student.college.edu",
		phone: "+1 (555) 456-7890",
		level: "technical",
	},
	{
		role: "Events Coordinator",
		name: "Jessica Davis",
		email: "jessica.davis@student.college.edu",
		phone: "+1 (555) 567-8901",
		level: "coordinator",
	},
	{
		role: "Cultural Coordinator",
		name: "David Wilson",
		email: "david.wilson@student.college.edu",
		phone: "+1 (555) 678-9012",
		level: "coordinator",
	},
	{
		role: "Sports Coordinator",
		name: "Lisa Thompson",
		email: "lisa.thompson@student.college.edu",
		phone: "+1 (555) 789-0123",
		level: "coordinator",
	},
	{
		role: "Academic Coordinator",
		name: "Ryan Garcia",
		email: "ryan.garcia@student.college.edu",
		phone: "+1 (555) 890-1234",
		level: "coordinator",
	},
];

const getLevelColor = (level: string) => {
	switch (level) {
		case "faculty":
			return "bg-gradient-to-r from-amber-500 to-orange-500";
		case "executive":
			return "bg-gradient-to-r from-brand-purple to-brand-brinjal";
		case "technical":
			return "bg-gradient-to-r from-blue-500 to-indigo-500";
		case "coordinator":
			return "bg-gradient-to-r from-green-500 to-emerald-500";
		default:
			return "bg-gradient-to-r from-gray-500 to-gray-600";
	}
};

const getLevelBadge = (level: string) => {
	switch (level) {
		case "faculty":
			return { variant: "secondary" as const, text: "Faculty" };
		case "executive":
			return { variant: "default" as const, text: "Executive" };
		case "technical":
			return { variant: "secondary" as const, text: "Technical" };
		case "coordinator":
			return { variant: "outline" as const, text: "Coordinator" };
		default:
			return { variant: "secondary" as const, text: "Member" };
	}
};

export default function About() {
	// Group members by level
	const faculty = hierarchyMembers.filter((m) => m.level === "faculty");
	const executives = hierarchyMembers.filter((m) => m.level === "executive");
	const technical = hierarchyMembers.filter((m) => m.level === "technical");
	const coordinators = hierarchyMembers.filter((m) => m.level === "coordinator");
	// Add more groups as needed (e.g., media, associates)

	// Helper to render a group
	const renderGroup = (title: string, members: typeof hierarchyMembers) =>
		members.length > 0 && (
			<div className="mb-12">
				<h3 className="text-2xl font-bold text-foreground mb-6 text-center">
					{title}
				</h3>
				<div className="flex flex-wrap justify-center gap-6">
					{members.map((member, index) => (
						<Card
							key={index}
							className="w-full max-w-xs sm:w-[320px] hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
						>
							<CardHeader className="text-center pb-2">
								<div
									className={`w-16 h-16 rounded-2xl ${getLevelColor(
										member.level
									)} mx-auto flex items-center justify-center mb-4`}
								>
									<Users className="w-8 h-8 text-white" />
								</div>
								<CardTitle className="text-lg">{member.name}</CardTitle>
								<div className="flex flex-col items-center space-y-2">
									<p className="text-sm font-medium text-brand-brinjal">
										{member.role}
									</p>
									<Badge {...getLevelBadge(member.level)}>
										{getLevelBadge(member.level).text}
									</Badge>
								</div>
							</CardHeader>
							<CardContent className="space-y-3">
								<div className="flex items-center space-x-2 text-sm text-muted-foreground">
									<Mail className="w-4 h-4" />
									<span className="truncate">{member.email}</span>
								</div>
								<div className="flex items-center space-x-2 text-sm text-muted-foreground">
									<Phone className="w-4 h-4" />
									<span>{member.phone}</span>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		);

	return (
		<div className="min-h-screen py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
						About Our Association
					</h1>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						Learn about our mission, vision, and the dedicated team that makes it
						all possible
					</p>
				</div>

				{/* Mission & Vision */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
					<Card className="hover:shadow-lg transition-shadow">
						<CardHeader>
							<div className="flex items-center space-x-3">
								<div className="w-12 h-12 bg-gradient-to-r from-brand-purple to-brand-brinjal rounded-2xl flex items-center justify-center">
									<Target className="w-6 h-6 text-white" />
								</div>
								<CardTitle className="text-2xl">Our Mission</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-muted-foreground leading-relaxed">
								To create a vibrant, inclusive community that fosters academic
								excellence,
								<br className="hidden sm:block" />
								personal growth, and professional development for all students in
								our department.
							</p>
							<p className="text-muted-foreground leading-relaxed">
								We strive to bridge the gap between academic learning and
								real-world application
								<br className="hidden sm:block" />
								through innovative events, workshops, and collaborative projects.
							</p>
						</CardContent>
					</Card>

					<Card className="hover:shadow-lg transition-shadow">
						<CardHeader>
							<div className="flex items-center space-x-3">
								<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
									<Eye className="w-6 h-6 text-white" />
								</div>
								<CardTitle className="text-2xl">Our Vision</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-muted-foreground leading-relaxed">
								To be the leading student association that empowers future leaders
								and innovators
								<br className="hidden sm:block" />
								through meaningful experiences, cutting-edge learning opportunities,
								and strong
								<br className="hidden sm:block" />
								industry connections.
							</p>
							<p className="text-muted-foreground leading-relaxed">
								We envision a community where every student can thrive, contribute,
								and make a
								<br className="hidden sm:block" />
								positive impact on society through their knowledge and skills.
							</p>
						</CardContent>
					</Card>
				</div>

				{/* Association Hierarchy - Grouped */}
				<div className="mb-16">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-foreground mb-4">Our Team</h2>
						<p className="text-muted-foreground">
							Meet the dedicated individuals leading our association
						</p>
					</div>
					{renderGroup("Head of Department", faculty)}
					{renderGroup("President & Co-President", executives)}
					{renderGroup("Technical Team", technical)}
					{renderGroup("Coordinators", coordinators)}
					{/* Add more groups as needed */}
				</div>

				{/* Contact Information */}
				<Card className="bg-gradient-to-r from-brand-lavender to-brand-lavender/50">
					<CardHeader className="text-center">
						<CardTitle className="text-2xl">Get in Touch</CardTitle>
						<p className="text-muted-foreground">
							Having questions? We're here to help!
						</p>
					</CardHeader>
					<CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
						<div className="flex flex-col items-center space-y-2">
							<div className="w-12 h-12 bg-gradient-to-r from-brand-purple to-brand-brinjal rounded-full flex items-center justify-center">
								<MapPin className="w-6 h-6 text-white" />
							</div>
							<h3 className="font-semibold">Visit Us</h3>
							<p className="text-sm text-muted-foreground">
								Room 301, Department Building
								<br />
								College Campus, City 12345
							</p>
						</div>
						<div className="flex flex-col items-center space-y-2">
							<div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
								<Phone className="w-6 h-6 text-white" />
							</div>
							<h3 className="font-semibold">Call Us</h3>
							<p className="text-sm text-muted-foreground">
								+1 (555) 123-CDSA
								<br />
								Mon-Fri, 9AM-5PM
							</p>
						</div>
						<div className="flex flex-col items-center space-y-2">
							<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
								<Mail className="w-6 h-6 text-white" />
							</div>
							<h3 className="font-semibold">Email Us</h3>
							<p className="text-sm text-muted-foreground">
								info@cdsa.college.edu
								<br />
								We'll respond within 24 hours
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}