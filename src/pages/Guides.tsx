import { ParticleBackground } from "@/components/ui/particle-background";

const GuidesPage = () => {
  return (
    <div className="min-h-screen py-24 relative">
      <ParticleBackground particleCount={40} speed={0.0002} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            User Guides
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Step-by-step guides to help you get the most out of AgriQCert
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Getting Started",
              description: "Learn the basics of AgriQCert and create your first certificate",
              time: "5 min read"
            },
            {
              title: "Batch Management",
              description: "How to efficiently manage product batches and documentation",
              time: "8 min read"
            },
            {
              title: "Quality Inspections",
              description: "Comprehensive guide to conducting and recording quality inspections",
              time: "12 min read"
            },
            {
              title: "Certificate Verification",
              description: "Master the art of verifying certificates using QR codes and manual entry",
              time: "6 min read"
            },
            {
              title: "API Integration",
              description: "Integrate AgriQCert with your existing systems using our robust API",
              time: "15 min read"
            },
            {
              title: "Best Practices",
              description: "Industry best practices for agricultural quality certification",
              time: "10 min read"
            }
          ].map((guide, index) => (
            <div key={index} className="bg-card p-6 rounded-2xl shadow-soft hover:shadow-medium transition-shadow">
              <h3 className="text-xl font-semibold mb-3">{guide.title}</h3>
              <p className="text-muted-foreground mb-4">{guide.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{guide.time}</span>
                <button className="text-primary font-semibold hover:underline">Read Guide →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuidesPage;