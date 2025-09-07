import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Leaf, Globe, QrCode } from "lucide-react";
import { ParticleBackground } from "@/components/ui/particle-background";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const HeroTrialButton = () => {
  const { user, getUserProfile } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    if (user) {
      getUserProfile().then(setUserProfile);
    }
  }, [user, getUserProfile]);

  if (user && userProfile) {
    const role = userProfile?.role;
    const dashboardPath = role === 'admin' ? '/dashboard/admin' : 
                         role === 'qa_agency' ? '/dashboard/qa' : 
                         role === 'importer' ? '/dashboard/importer' : 
                         '/dashboard/exporter';
    
    return (
      <Button variant="trial" size="xl" asChild className="group">
        <Link to={dashboardPath}>
          {role === 'admin' ? 'Go to Admin Dashboard' : 'Go to Dashboard'}
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    );
  }

  return (
    <Button variant="trial" size="xl" asChild className="group">
      <Link to="/signup">
        Start Free Trial
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </Button>
  );
};

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple scroll-triggered animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <ParticleBackground particleCount={80} speed={0.0003} />
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div ref={heroRef} className="text-white space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-white/90">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">Trusted Digital Certification</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Digital Quality
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                  Certification
                </span>
                <span className="block text-2xl md:text-3xl font-normal text-white/90 mt-2">
                  for Agricultural Products
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                Streamline your agricultural export certification process with our secure, 
                blockchain-powered digital platform. From farm to table, ensure quality and trust.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <HeroTrialButton />
              <Button variant="glass" size="xl" asChild className="group">
                <Link to="/verify">
                  Verify Certificate
                  <QrCode className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">50K+</div>
                <div className="text-sm text-white/70">Certificates Issued</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">150+</div>
                <div className="text-sm text-white/70">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">99.9%</div>
                <div className="text-sm text-white/70">Verification Rate</div>  
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-glow">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary dark:bg-primary rounded-lg flex items-center justify-center">
                      <Leaf className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Certificate #AGR-2024-001</div>
                      <div className="text-white/70 text-sm">Premium Organic Rice</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-primary/20 text-white rounded-full text-xs font-medium">
                    Verified ✓
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Quality Grade</span>
                    <span className="text-white font-medium">Premium A+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Export Country</span>
                    <span className="text-white font-medium">India</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Certification Date</span>
                    <span className="text-white font-medium">Dec 15, 2024</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <div className="w-24 h-24 bg-white rounded-lg mx-auto flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-primary" />
                  </div>
                  <div className="text-center mt-2 text-white/70 text-xs">
                    Scan to verify instantly
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: "1.5s" }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
