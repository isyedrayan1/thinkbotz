import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartContainer } from "@/components/ui/chart";
import { Link } from "react-router-dom";
import {
  Award,
  ArrowRight,
  Calendar,
  Code,
  Trophy,
  Users,
  Zap,
  Star,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import HeroSection from "../components/sections/herosection";
import AboutSection from "../components/sections/aboutsection";
import GallerySec from "../components/sections/gallerysec";

const statsCharts = [
  {
    title: "Active Members",
    value: "300+",
    label: "community size",
    data: [
      { name: "Members", value: 300, color: "#7C3AED" },
      { name: "Remaining", value: 100, color: "#E9D5FF" },
    ],
  },
  {
    title: "Events Delivered",
    value: "5+",
    label: "flagship events",
    data: [
      { name: "Events", value: 5, color: "#6D28D9" },
      { name: "Remaining", value: 3, color: "#E9D5FF" },
    ],
  },
];

const skillChartData = [
  { label: "AI Tools", value: 86 },
  { label: "Prompting", value: 78 },
  { label: "Design", value: 72 },
  { label: "Teamwork", value: 90 },
];






export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Impact Stats + Charts */}
      <section className="py-16 px-4 bg-gradient-to-b from-brand-lavender/40 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-brand-purple text-white">Impact</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Our Growth Snapshot
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple, clear numbers that reflect our community and event strength.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statsCharts.map((stat) => (
              <Card key={stat.title} className="rounded-2xl shadow-md border-brand-lavender/60">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-brand-brinjal">{stat.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-6">
                  <div className="h-[160px] w-[160px]">
                    <ChartContainer
                      config={{
                        primary: { label: stat.title, color: stat.data[0].color },
                      }}
                      className="h-full w-full"
                    >
                      <PieChart>
                        <Pie
                          data={stat.data}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={55}
                          outerRadius={75}
                          stroke="transparent"
                        >
                          {stat.data.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ChartContainer>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-brand-brinjal">{stat.value}</p>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="rounded-2xl shadow-md border-brand-lavender/60">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-brand-brinjal">Skill Lift</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: { label: "Skill Lift", color: "#7C3AED" },
                  }}
                  className="h-[170px] w-full"
                >
                  <BarChart data={skillChartData} margin={{ left: 4, right: 8, top: 10, bottom: 4 }}>
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis dataKey="label" tickLine={false} axisLine={false} />
                    <YAxis width={24} />
                    <Bar dataKey="value" fill="var(--color-value)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Highlights */}
      <GallerySec />

      {/* Signature Events */}
      <section className="py-16 px-4 bg-white/80 border-t border-brand-lavender/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <Badge className="mb-3 bg-brand-purple text-white">Signature Events</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-brinjal">Moments that Define Us</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Focused events that build confidence, skills, and community. Each one pushes members forward.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-2xl border-brand-brinjal text-brand-brinjal">
              <Link to="/events">View All Events</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "MindSpark Quiz",
                desc: "Competitive quiz rounds across logic, C, Python, and Java fundamentals.",
                icon: Trophy,
              },
              {
                title: "PromptFusion",
                desc: "AI creativity challenges in prompt building, image creation, and storytelling.",
                icon: Zap,
              },
              {
                title: "PosterVision",
                desc: "Research + design showcased through high-impact poster presentations.",
                icon: Award,
              },
            ].map((item) => (
              <Card key={item.title} className="rounded-2xl shadow-md border-brand-lavender/60">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-brand-brinjal" />
                  </div>
                  <CardTitle className="text-xl text-brand-brinjal">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-brand-brinjal/80 text-base">
                  {item.desc}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section: What We Offer */}
      <section className="py-16 px-4 bg-gradient-to-b from-brand-lavender/40 to-transparent">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <Card className="rounded-2xl shadow-md border-brand-lavender/60 hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center gap-3 pb-4">
              <Award className="w-8 h-8 text-brand-purple" />
              <CardTitle className="text-xl font-bold text-brand-brinjal">Skill Development</CardTitle>
            </CardHeader>
            <CardContent className="text-brand-brinjal/80 text-base">
              Workshops, seminars, and hands-on sessions to boost your technical and soft skills.
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-md border-brand-lavender/60 hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center gap-3 pb-4">
              <Users className="w-8 h-8 text-brand-purple" />
              <CardTitle className="text-xl font-bold text-brand-brinjal">Networking</CardTitle>
            </CardHeader>
            <CardContent className="text-brand-brinjal/80 text-base">
              Meet like-minded peers, industry experts, and alumni to grow your professional network.
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-md border-brand-lavender/60 hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center gap-3 pb-4">
              <Trophy className="w-8 h-8 text-brand-purple" />
              <CardTitle className="text-xl font-bold text-brand-brinjal">Recognition</CardTitle>
            </CardHeader>
            <CardContent className="text-brand-brinjal/80 text-base">
              Get recognized for your achievements and contributions through awards and certificates.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Journey Timeline Highlight */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-brand-lavender/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-brand-purple text-white">Our Story</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-brinjal mb-3">
              Journey Snapshot
            </h2>
            <p className="text-lg text-brand-brinjal/70 max-w-2xl mx-auto">
              A quick look at the milestones that shaped ThinkBotz so far.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6 border-l-2 border-brand-lavender pl-6">
              {[
                {
                  date: "Aug 2024",
                  title: "Association Launch",
                  detail: "Started with a vision to build practical AI and ML skills.",
                },
                {
                  date: "Sep 2025",
                  title: "MindSpark Quiz",
                  detail: "Our first flagship event with multi-round technical challenges.",
                },
                {
                  date: "Dec 2025",
                  title: "PosterVision",
                  detail: "Student research + design showcased to the department.",
                },
              ].map((item) => (
                <div key={item.title} className="relative">
                  <span className="absolute -left-[35px] top-2 h-3 w-3 rounded-full bg-brand-purple animate-pulse" />
                  <p className="text-xs uppercase tracking-widest text-brand-brinjal/70">{item.date}</p>
                  <h3 className="text-xl font-semibold text-brand-brinjal">{item.title}</h3>
                  <p className="text-brand-brinjal/70">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-between gap-6">
              <Card className="rounded-2xl border-brand-lavender/60 shadow-md">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-brand-brinjal" />
                  </div>
                  <CardTitle className="text-xl text-brand-brinjal">Next Big Milestone</CardTitle>
                </CardHeader>
                <CardContent className="text-brand-brinjal/80">
                  Upcoming semester kickoff with workshops, speaker sessions, and a new project showcase.
                </CardContent>
              </Card>
              <Button asChild size="lg" className="bg-gradient-to-r from-brand-purple to-brand-brinjal text-white font-bold rounded-2xl shadow-lg hover:opacity-90">
                <Link to="/timeline" className="flex items-center gap-2">
                  View Full Timeline
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Teaser */}
      <section className="py-16 px-4 bg-white/80 border-t border-brand-lavender/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <Badge className="mb-3 bg-brand-purple text-white">Team</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-brinjal">Meet the Leaders</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Presidents and the technical team driving our community forward.
              </p>
            </div>
            <Button asChild className="rounded-2xl bg-brand-brinjal text-white hover:bg-brand-purple">
              <Link to="/about">See Full Team</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-2xl border-brand-lavender/60 shadow-md">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center">
                  <Star className="h-6 w-6 text-brand-brinjal" />
                </div>
                <CardTitle className="text-xl text-brand-brinjal">Presidents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-brand-brinjal/80">
                <p>S.MD Shoyab</p>
                <p>S.MD Sameer</p>
                <p>T. Nikhitha Reddy</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-brand-lavender/60 shadow-md">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center">
                  <Code className="h-6 w-6 text-brand-brinjal" />
                </div>
                <CardTitle className="text-xl text-brand-brinjal">Technical Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-brand-brinjal/80">
                <p>Syed Rayan</p>
                <p>Syed Naseer</p>
                <p>S. Abdul Aleem</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
