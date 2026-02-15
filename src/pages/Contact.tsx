import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Clock, Send, User } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  // Replace with your Web3Forms Access Key
  const WEB3FORMS_ACCESS_KEY = "bffb0684-215f-449a-8c8c-19d411cca61e";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      access_key: WEB3FORMS_ACCESS_KEY,
      from_name: formData.name,
      email: formData.email,
      subject: `[ThinkBotz] - ${formData.subject}`,
      message: formData.message,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setSuccess(true);
        toast({
          title: "Message sent!",
          description: "Thank you for contacting us. We'll get back to you soon.",
          className: "border-green-500 border-2",
          duration: 600, // 600 milliseconds
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive"
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen pt-40 md:pt-28 pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Contact Us</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our team. We're here to help and answer any questions you may have.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div>
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="pb-6 md:pb-8">
                <CardTitle className="text-2xl md:text-3xl flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-brand-purple to-brand-brinjal rounded-lg flex items-center justify-center">
                    <Send className="w-4 h-4 text-white" />
                  </div>
                  <span>Send us a Message</span>
                </CardTitle>
                <CardDescription>
                  Fill out the form below and your message will be sent to <span className="font-semibold">thinkbotz.sa@gmail.com</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-7\">
                  <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please describe your inquiry or message in detail..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-brand-purple to-brand-brinjal text-white rounded-2xl"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                  
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Quick Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Get in Touch</CardTitle>
                <CardDescription>Multiple ways to reach us</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-lavender rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-brand-brinjal" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:thinkbotz.sa@gmail.com"
                      className="text-sm text-brand-brinjal underline"
                    >
                      thinkbotz.sa@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-lavender rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brand-brinjal" />
                  </div>
                  <div>
                    <p className="font-medium">Visit Us</p>
                    <p className="text-sm text-muted-foreground">AIML dept , AITK - kadapa</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-lavender rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-brand-brinjal" />
                  </div>
                  <div>
                    <p className="font-medium">Active Hours</p>
                    <p className="text-sm text-muted-foreground">Monday-Saturday, 9AM-4PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Technical Team Contact */}
            <div className="rounded-xl bg-brand-lavender/60 p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-lavender rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-brand-brinjal" />
              </div>
              <div>
                <div className="font-semibold text-brand-brinjal">Technical Team Contact</div>
                <div className="text-sm text-muted-foreground">Galat Family</div>
                <a
                  href="mailto:galatfamily@gmail.com"
                  className="text-sm text-brand-brinjal underline"
                >
                  galatfamily@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}