import { ParticleBackground } from "@/components/ui/particle-background";

const TechnicalPage = () => {
  return (
    <div className="min-h-screen py-24 relative">
      <ParticleBackground particleCount={40} speed={0.0002} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Technical Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            In-depth technical specifications and implementation details
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Architecture Overview</h2>
            <p className="text-muted-foreground mb-6">
              AgriQCert is built on a modern, scalable architecture designed for enterprise-grade agricultural certification.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Frontend Technologies</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• React 18 with TypeScript</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• React Query for state management</li>
                  <li>• Vite for build tooling</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Backend Technologies</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Supabase for database & auth</li>
                  <li>• Edge Functions for serverless compute</li>
                  <li>• PostgreSQL with RLS</li>
                  <li>• RESTful API design</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Security Implementation</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Row Level Security (RLS)</h3>
                <p className="text-muted-foreground">
                  All database tables implement PostgreSQL Row Level Security policies to ensure data isolation and access control.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Authentication</h3>
                <p className="text-muted-foreground">
                  JWT-based authentication with role-based access control for different user types.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Data Encryption</h3>
                <p className="text-muted-foreground">
                  All data is encrypted in transit and at rest using industry-standard encryption protocols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalPage;