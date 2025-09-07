import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    Link as LinkIcon,
    Target,
    Eye,
    MapPin,
    Phone,
    Mail,
} from "lucide-react";

// Updated hierarchy with Treasurer included.
// To add more levels, just add a new level in the hierarchyMembers array and update the groupings below.
const hierarchyMembers = [
    // HOD
    {
        role: "Head of Department",
        name: "Dr. Shaik Parveen mam",
        level: "hod",
        year: "",
        link: { enabled: false, url: "" },
    },
    // President
    {
        role: "President",
        name: "Syed Mohammad Sameer",
        level: "president",
        year: "4th Year",
        link: { enabled: true, url: "https://linkedin.com/in/alexmartinez" },
    },
    {
        role: "Co-President",
        name: "Shaik Aslam",
        level: "president",
        year: "4th Year",
        link: { enabled: true, url: "" },
    },
    // Treasurer
    {
        role: "Treasurer",
        name: "Syed Jaffar",
        level: "treasurer",
        year: "3rd Year",
        link: { enabled: true, url: "https://linkedin.com/in/rahulsingh" },
    },
    // Technical Team
    {
        role: "Technical Team Lead",
        name: "SYED RAYAN",
        level: "technical",
        year: "3rd Year",
        link: { enabled: true, url: "https://isyedrayan.online" },
    },
	{
        role: "Technical Team Lead",
        name: "Syed Naseer",
        level: "technical",
        year: "3rd Year",
        link: { enabled: true, url: "https://github.com/snr9" },
    },
	{
        role: "Technical Team Lead",
        name: "haik Shahul",
        level: "technical",
        year: "3rd Year",
        link: { enabled: true, url: "https://github.com/snr9" },
    },
    // Media
    {
        role: "Media Lead",
        name: "Priya Patel",
        level: "others",
        year: "3rd Year",
        link: { enabled: false, url: "https://instagram.com/priyapatel" },
    },
    // Coordinators
    {
        role: "Events Coordinator",
        name: "Jessica Davis",
        level: "coordinator",
        year: "2nd Year",
        link: { enabled: false, url: "" },
    },
    {
        role: "Cultural Coordinator",
        name: "David Wilson",
        level: "coordinator",
        year: "2nd Year",
        link: { enabled: false, url: "" },
    },
    {
        role: "Sports Coordinator",
        name: "Lisa Thompson",
        level: "coordinator",
        year: "2nd Year",
        link: { enabled: false, url: "https://instagram.com/lisathompson" },
    },
    {
        role: "Academic Coordinator",
        name: "Ryan Garcia",
        level: "coordinator",
        year: "2nd Year",
        link: { enabled: false, url: "" },
    },
];

const getLevelColor = (level: string) => {
    switch (level) {
        case "hod":
            return "bg-gradient-to-r from-amber-500 to-orange-500";
        case "president":
            return "bg-gradient-to-r from-brand-purple to-brand-brinjal";
        case "treasurer":
            return "bg-gradient-to-r from-yellow-500 to-yellow-700";
        case "technical":
            return "bg-gradient-to-r from-blue-500 to-indigo-500";
        case "coordinator":
            return "bg-gradient-to-r from-green-500 to-emerald-500";
        case "others":
            return "bg-gradient-to-r from-pink-500 to-fuchsia-500";
        default:
            return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
};

const getLevelBadge = (level: string) => {
    switch (level) {
        case "hod":
            return { variant: "secondary" as const, text: "HOD" };
        case "president":
            return { variant: "default" as const, text: "President" };
        case "treasurer":
            return { variant: "secondary" as const, text: "Treasurer" };
        case "technical":
            return { variant: "secondary" as const, text: "Technical" };
        case "coordinator":
            return { variant: "outline" as const, text: "Coordinator" };
        case "others":
            return { variant: "secondary" as const, text: "Other" };
        default:
            return { variant: "secondary" as const, text: "Member" };
    }
};

export default function About() {
    // Group members by new hierarchy
    const hod = hierarchyMembers.filter((m) => m.level === "hod");
    const president = hierarchyMembers.filter((m) => m.level === "president");
    const treasurer = hierarchyMembers.filter((m) => m.level === "treasurer");
    const technical = hierarchyMembers.filter((m) => m.level === "technical");
    const coordinators = hierarchyMembers.filter((m) => m.level === "coordinator");

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
                                    {member.level !== "hod" && (
                                        <span className="text-xs text-muted-foreground">
                                            Student, {member.year}
                                        </span>
                                    )}
                                </div>
                            </CardHeader>
                            {member.link.enabled && member.link.url ? (
                                <CardContent className="flex justify-center">
                                    <a
                                        href={member.link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-brinjal text-white font-medium hover:bg-brand-purple transition"
                                    >
                                        <LinkIcon className="w-4 h-4" />
                                        Profile
                                    </a>
                                </CardContent>
                            ) : null}
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

                {/* Hierarchy */}
                <div className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Our Team</h2>
                        <p className="text-muted-foreground">
                            Meet the dedicated individuals leading our association
                        </p>
                    </div>
                    {renderGroup("Head of Department", hod)}
                    {renderGroup("President & Co-President", president)}
                    {renderGroup("Treasurer", treasurer)}
                    {renderGroup("Technical Team", technical)}
                    {renderGroup("Coordinators", coordinators)}
                </div>

                {/* Contact Information */}
                <Card className="bg-gradient-to-r from-brand-lavender to-brand-lavender/50 mt-12">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Get in Touch</CardTitle>
                        <p className="text-muted-foreground">
                            Reach out to us for any queries or support!
                        </p>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        {/* Visit Us */}
                        <div className="flex flex-col items-center space-y-2">
                            <div className="w-12 h-12 bg-gradient-to-r from-brand-purple to-brand-brinjal rounded-full flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold">Visit Us</h3>
                            <p className="text-sm text-muted-foreground">
                                AIML Department
                                <br />
                                College Campus AITK, Kadapa
                            </p>
                        </div>
                        {/* Email Us */}
                        <div className="flex flex-col items-center space-y-2">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold">Email Us</h3>
                            <a
                                href="mailto:isyedrayan.online@gmail.com"
                                className="text-brand-brinjal underline"
                            >
                                thinkbotz@gmail.com
                            </a>
                        </div>
                        {/* Technical Team */}
                        <div className="flex flex-col items-center space-y-2">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold">Technical Team</h3>
                            <p className="text-sm text-muted-foreground">
                                Havinng trouble or need Tech support:<br />
                                <a
                                    href="mailto:isyedrayan.online@gmail.com"
                                    className="text-brand-brinjal underline"
                                >
                                    mesyedrn@gmail.com
                                </a>
                                
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}