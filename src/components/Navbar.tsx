import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${isLanding ? "bg-navy/90 backdrop-blur-md border-b border-navy-light/30" : "bg-card border-b border-border"}`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className={`font-display font-bold text-lg ${isLanding ? "text-primary-foreground" : "text-foreground"}`}>
            CivicHelp AI
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {isLanding && (
            <>
              <a href="#features" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">How It Works</a>
            </>
          )}
          <Link to="/login">
            <Button variant={isLanding ? "outline" : "ghost"} size="sm" className={isLanding ? "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" : ""}>
              Log In
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="gradient-primary text-primary-foreground hover:opacity-90">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className={isLanding ? "text-primary-foreground" : "text-foreground"} /> : <Menu className={isLanding ? "text-primary-foreground" : "text-foreground"} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={`md:hidden border-t ${isLanding ? "bg-navy border-navy-light/30" : "bg-card border-border"} p-4 space-y-3`}>
          <Link to="/login" className="block" onClick={() => setMobileOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">Log In</Button>
          </Link>
          <Link to="/register" className="block" onClick={() => setMobileOpen(false)}>
            <Button className="w-full gradient-primary text-primary-foreground">Get Started</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
