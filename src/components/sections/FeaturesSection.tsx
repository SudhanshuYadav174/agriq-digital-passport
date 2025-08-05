import { Shield, Zap, Globe, FileCheck, QrCode, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Shield,
    title: "Blockchain Security",
    description: "Immutable records with cryptographic verification ensure the highest level of security and trust.",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Zap,
    title: "Instant Verification",
    description: "QR code scanning provides real-time certificate verification in seconds, anywhere in the world.",
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  },
  {
    icon: Globe,
    title: "Global Standards",
    description: "Compliant with international trade regulations and W3C Verifiable Credentials standards.",
    color: "text-success",
    bgColor: "bg-success/10"
  },
  {
    icon: FileCheck,
    title: "Digital Passports",
    description: "Comprehensive product information with complete traceability from farm to destination.",
    color: "text-warning",
    bgColor: "bg-warning/10"
  },
  {
    icon: QrCode,
    title: "Smart Certificates",
    description: "Dynamic QR codes with embedded metadata and real-time status updates.",
    color: "text-primary-light",
    bgColor: "bg-primary/5"
  },
  {
    icon: Users,
    title: "Multi-Role Access",
    description: "Tailored dashboards for exporters, QA agencies, importers, and customs officials.",
    color: "text-secondary-light",
    bgColor: "bg-secondary/5"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Zap className="w-4 h-4 mr-2" />
            Advanced Features
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Why Choose AgriQCert?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with agricultural expertise 
            to deliver the most reliable certification system in the industry.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover-lift"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-card rounded-2xl p-8 md:p-12 shadow-medium">
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Ready to Transform Your Certification Process?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of agricultural businesses who trust AgriQCert for their quality certification needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="premium" size="lg" asChild>
                <Link to="/signup">
                  Start Free Trial
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/features">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;