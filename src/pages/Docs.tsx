import { ParticleBackground } from "@/components/ui/particle-background";

const DocsPage = () => {
  return (
    <div className="min-h-screen py-24 relative">
      <ParticleBackground particleCount={40} speed={0.0002} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            API Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete guide to integrating with AgriQCert APIs
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Authentication</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <code>curl -H "Authorization: Bearer YOUR_API_KEY" https://api.agriqcert.com/v1/certificates</code>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Verify Certificate</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <code>GET /v1/certificates/verify/:certificateId</code>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Create Certificate</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <code>POST /v1/certificates</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;