import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Code, Globe, Trophy, Users } from "lucide-react";

const whyJoinReasons = [
  {
    icon: Code,
    title: "Technical Excellence",
    description: "Enhance your technical skills through workshops, hackathons, and coding competitions."
  },
  {
    icon: Users,
    title: "Network & Connect",
    description: "Build lasting relationships with peers, faculty, and industry professionals."
  },
  {
    icon: Trophy,
    title: "Recognition & Awards",
    description: "Showcase your talents and get recognized for your achievements and contributions."
  },
  {
    icon: Globe,
    title: "Leadership Opportunities",
    description: "Take on leadership roles and develop essential management and organizational skills."
  }
];
export default function AboutSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.2em] text-brand-brinjal/60">About</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                About Our Association
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Learn what drives us and what we stand for.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-2xl border-brand-brinjal text-brand-brinjal">
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-brand-lavender/60 bg-white/80 p-6">
              <div className="flex items-start gap-4">
                <div className="h-9 w-9 rounded-xl bg-brand-purple/10 flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-brand-brinjal" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To create a vibrant, inclusive community that fosters academic excellence, personal growth, and
                    professional development for all students in our department.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-brand-lavender/60 bg-white/80 p-6">
              <div className="flex items-start gap-4">
                <div className="h-9 w-9 rounded-xl bg-brand-purple/10 flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-brand-brinjal" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To be the leading student association that empowers future leaders and innovators through
                    meaningful experiences and cutting-edge learning opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Why Join ThinkBotz?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the opportunities and benefits of being part of our association.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyJoinReasons.map((reason, index) => (
            <Card key={index} className="text-center border-brand-lavender/60">
              <CardHeader>
                <div className="w-11 h-11 bg-brand-purple/10 rounded-2xl mx-auto flex items-center justify-center mb-4">
                  <reason.icon className="w-5 h-5 text-brand-brinjal" />
                </div>
                <CardTitle className="text-lg">{reason.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {reason.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}