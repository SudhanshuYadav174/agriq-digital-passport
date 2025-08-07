import { Shield, Zap, Globe, FileCheck, QrCode, Users, CheckCircle, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ParticleBackground } from "@/components/ui/particle-background";

const featuresData = [
  {
    icon: Shield,
    title: "Blockchain Security",
    description: "Immutable records with cryptographic verification ensure the highest level of security and trust for all certificates.",
    features: ["256-bit encryption", "Tamper-proof records", "Digital signatures", "Audit trail"],
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Zap,
    title: "Instant Verification", 
    description: "QR code scanning provides real-time certificate verification in seconds, anywhere in the world.",
    features: ["QR code scanning", "Real-time validation", "Mobile app support", "Offline verification"],
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  },
  {
    icon: Globe,
    title: "Global Standards",
    description: "Compliant with international trade regulations and W3C Verifiable Credentials standards.",
    features: ["ISO compliance", "W3C standards", "International trade", "Multi-language support"],
    color: "text-success",
    bgColor: "bg-success/10"
  },
  {
    icon: FileCheck,
    title: "Digital Passports",
    description: "Comprehensive product information with complete traceability from farm to destination.",
    features: ["Full traceability", "Product history", "Quality metrics", "Chain of custody"],
    color: "text-warning",
    bgColor: "bg-warning/10"
  },
  {
    icon: QrCode,
    title: "Smart Certificates",
    description: "Dynamic QR codes with embedded metadata and real-time status updates.",
    features: ["Dynamic updates", "Rich metadata", "Status tracking", "Version control"],
    color: "text-primary-light",
    bgColor: "bg-primary/5"
  },
  {
    icon: Users,
    title: "Multi-Role Access",
    description: "Tailored dashboards for exporters, QA agencies, importers, and customs officials.",
    features: ["Role-based access", "Custom dashboards", "Permission controls", "Team collaboration"],
    color: "text-secondary-light",
    bgColor: "bg-secondary/5"
  }
];

const comparisonData = [
  { feature: "Digital Certificates", traditional: false, agriQCert: true },
  { feature: "Real-time Verification", traditional: false, agriQCert: true },
  { feature: "Blockchain Security", traditional: false, agriQCert: true },
  { feature: "Global Accessibility", traditional: false, agriQCert: true },
  { feature: "Automated Workflows", traditional: false, agriQCert: true },
  { feature: "Paper-based Process", traditional: true, agriQCert: false },
  { feature: "Manual Verification", traditional: true, agriQCert: false },
  { feature: "Risk of Fraud", traditional: true, agriQCert: false },
  { feature: "Limited Tracking", traditional: true, agriQCert: false },
];

const Features = () => {
  return (
    <div className="min-h-screen py-24 relative">
      <ParticleBackground particleCount={60} speed={0.0002} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Star className="w-4 h-4 mr-2" />
            Complete Feature Overview
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Powerful Features for 
            <span className="text-primary block">Agricultural Certification</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how AgriQCert revolutionizes agricultural quality certification with 
            cutting-edge technology and industry-leading features.
          </p>
        </div>

        {/* Detailed Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {featuresData.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-medium transition-all duration-300 hover-lift">
                <CardHeader>
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-success mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Traditional vs AgriQCert
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how AgriQCert transforms agricultural certification compared to traditional methods.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-6 font-semibold text-foreground">Feature</th>
                    <th className="text-center py-4 px-6 font-semibold text-muted-foreground">Traditional Method</th>
                    <th className="text-center py-4 px-6 font-semibold text-primary">AgriQCert</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-4 px-6 font-medium text-foreground">{row.feature}</td>
                      <td className="py-4 px-6 text-center">
                        {row.traditional ? (
                          <CheckCircle className="w-5 h-5 text-destructive mx-auto" />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-muted mx-auto"></div>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {row.agriQCert ? (
                          <CheckCircle className="w-5 h-5 text-success mx-auto" />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-muted mx-auto"></div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose AgriQCert?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the benefits that make AgriQCert the preferred choice for agricultural certification.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "99.9% Uptime", description: "Reliable service you can count on", icon: Shield },
              { title: "50% Faster", description: "Certification process compared to traditional", icon: Zap },
              { title: "24/7 Support", description: "Global customer service around the clock", icon: Users },
              { title: "Zero Fraud", description: "Blockchain security eliminates certificate fraud", icon: CheckCircle }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="text-center p-6 hover:shadow-medium transition-shadow">
                  <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-card rounded-2xl p-8 md:p-12 shadow-medium">
          <div className="space-y-6">
            <Badge variant="secondary" className="mb-4">
              Start Your Digital Transformation
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Ready to Experience These Features?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of agricultural businesses who have transformed their certification process with AgriQCert.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="premium" size="lg" asChild>
                <Link to="/signup">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/verify">
                  Try Verification Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;