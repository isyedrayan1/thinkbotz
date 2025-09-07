import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-lavender via-background to-brand-lavender/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Mobile layout: stack text, image, CTA, all left-aligned */}
        <div className="flex flex-col md:hidden items-start text-left space-y-6">
          <div className="inline-flex items-center space-x-2 bg-brand-purple/10 px-4 py-2 rounded-full mb-2">
            <Users className="w-4 h-4 text-brand-brinjal" />
            <span className="text-sm font-medium text-brand-brinjal">Student-Led Innovation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight max-w-xs sm:max-w-md">
            ThinkBotz<br />
            <span className="bg-gradient-to-r from-brand-purple to-brand-brinjal bg-clip-text text-transparent">
              Student Association
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Empowering students through innovation, collaboration, and academic excellence.<br />
            Join our vibrant community of learners and leaders.
          </p>
          <div className="w-full flex justify-center">
            <img
              src="/logo.png"
              alt="ThinkBotz Logo"
              className="h-40 w-auto max-w-full object-contain drop-shadow-xl my-4"
            />
          </div>
          <div className="flex flex-col gap-4 w-full mt-2">
            <Button asChild size="lg" className="rounded-2xl w-full sm:w-auto text-left">
              <Link to="/events">Explore Events</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-2xl w-full sm:w-auto text-left">
              <Link to="/contact">Join Community</Link>
            </Button>
          </div>
        </div>
        {/* Desktop layout: grid as before */}
        <div className="hidden md:grid grid-cols-3 gap-12 items-center">
          {/* Left: Text & CTA */}
          <div className="col-span-2 order-2 md:order-1 flex flex-col items-start text-left space-y-6">
            <div className="inline-flex items-center space-x-2 bg-brand-purple/10 px-4 py-2 rounded-full mb-2">
              <Users className="w-4 h-4 text-brand-brinjal" />
              <span className="text-sm font-medium text-brand-brinjal">Student-Led Innovation</span>
            </div>
            <h1 className="text-6xl font-bold text-foreground leading-tight">
              College Department
              <span className="bg-gradient-to-r from-brand-purple to-brand-brinjal bg-clip-text text-transparent">
                {" "}Student Association
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Empowering students through innovation, collaboration, and academic excellence.<br />
              Join our vibrant community of learners and leaders.
            </p>
            <div className="flex flex-row gap-4 mt-4">
              <Button asChild size="lg" className="rounded-2xl">
                <Link to="/events">Explore Events</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-2xl">
                <Link to="/contact">Join Community</Link>
              </Button>
            </div>
          </div>
          {/* Right: Logo */}
          <div className="flex justify-end items-center h-96 order-1 md:order-2 mb-0">
            <img
              src="/logo.png"
              alt="CDSA Logo"
              className="h-full w-auto max-w-full object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}