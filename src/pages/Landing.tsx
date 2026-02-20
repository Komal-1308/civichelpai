import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Brain, MapPin, BarChart3, MessageSquare, Camera, Mic, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroCity from "@/assets/hero-city.jpg";
import Navbar from "@/components/Navbar";

const features = [
  { icon: MessageSquare, title: "AI Chat Assistant", desc: "Conversational complaint filing with smart category suggestions and duplicate detection." },
  { icon: Mic, title: "Voice Input", desc: "Speak in Hindi or English — auto-transcribed, translated, and summarized in 10 words." },
  { icon: Camera, title: "Image Analysis", desc: "Upload photos of issues — AI detects potholes, garbage, broken lights automatically." },
  { icon: Brain, title: "Predictive Insights", desc: "Time-series forecasting identifies complaint spikes before they happen." },
  { icon: MapPin, title: "Geo-Intelligence", desc: "Heatmap visualization with AI-generated narratives for each zone." },
  { icon: Zap, title: "Auto Escalation", desc: "Emergency complaints auto-flagged and routed with AI-drafted escalation emails." },
];

const steps = [
  { num: "01", title: "Submit", desc: "File a complaint via text, voice, or image upload." },
  { num: "02", title: "AI Analyzes", desc: "Sentiment, urgency, category, and duplicates detected instantly." },
  { num: "03", title: "Route & Resolve", desc: "Smart routing to the right department with action recommendations." },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden gradient-hero">
        <div className="absolute inset-0">
          <img src={heroCity} alt="Smart city" className="w-full h-full object-cover opacity-20 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-cyan/10 text-cyan border border-cyan/20 mb-6">
                <Zap className="w-3 h-3" /> AI-Powered Civic Intelligence
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6" style={{ color: "hsl(0 0% 100%)" }}>
                Smarter Cities Start with{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan to-teal">
                  CivicHelp AI
                </span>
              </h1>
              <p className="text-lg md:text-xl mb-8 leading-relaxed" style={{ color: "hsl(210 20% 75%)" }}>
                Report civic issues with text, voice, or images. Our AI analyzes, routes, and resolves complaints — making governance proactive, not reactive.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg" className="gradient-primary text-primary-foreground hover:opacity-90 text-base px-8 shadow-glow">
                    File a Complaint <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/admin">
                  <Button size="lg" variant="outline" className="border-muted-foreground/30 hover:bg-muted/10 text-base px-8" style={{ color: "hsl(210 20% 80%)" }}>
                    Admin Dashboard
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-navy-light/50 backdrop-blur-sm border-t border-cyan/10">
          <div className="container mx-auto px-4 py-4 flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { label: "Complaints Resolved", value: "12,847" },
              { label: "Avg Resolution Time", value: "2.3 days" },
              { label: "Citizen Satisfaction", value: "94%" },
              { label: "AI Accuracy", value: "97.2%" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl md:text-2xl font-display font-bold text-cyan">{s.value}</div>
                <div className="text-xs" style={{ color: "hsl(210 20% 60%)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Features</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 text-foreground">
              AI That Understands Your City
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              From complaint to resolution — every step enhanced by generative AI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 text-foreground">Three Simple Steps</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl font-display font-bold text-primary/20 mb-3">{s.num}</div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4" style={{ color: "hsl(0 0% 100%)" }}>
            Ready to Transform Your City?
          </h2>
          <p className="mb-8 max-w-md mx-auto" style={{ color: "hsl(210 20% 75%)" }}>
            Join thousands of citizens making their neighborhoods better with AI.
          </p>
          <Link to="/register">
            <Button size="lg" className="gradient-primary text-primary-foreground hover:opacity-90 text-base px-10 shadow-glow">
              Get Started Free <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold text-foreground">CivicHelp AI</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 CivicHelp AI. Smart City Governance Platform.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
