import { ParticleBackground } from "@/components/ui/particle-background";

const TermsPage = () => {
  return (
    <div className="min-h-screen py-24 relative">
      <ParticleBackground particleCount={40} speed={0.0002} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Last updated: January 1, 2024
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using the AgriQCert platform, you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, you should not use our services.
            </p>
          </div>
          
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Description of Service</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>AgriQCert provides a digital platform for agricultural quality certification, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Certificate generation and verification</li>
                <li>Batch tracking and management</li>
                <li>Quality inspection recording</li>
                <li>Blockchain-powered authentication</li>
                <li>API access for integration</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-bold mb-6">User Responsibilities</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>As a user of AgriQCert, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and truthful information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Use the service only for legitimate business purposes</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Prohibited Uses</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>You may not use AgriQCert to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Create fraudulent or misleading certificates</li>
                <li>Violate any laws, regulations, or third-party rights</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of the service</li>
                <li>Upload malicious code or harmful content</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Service Availability</h2>
            <p className="text-muted-foreground">
              While we strive to provide reliable service, we do not guarantee that AgriQCert will be available 
              at all times. We may experience downtime for maintenance, updates, or unforeseen technical issues.
            </p>
          </div>
          
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              AgriQCert shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
              or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, 
              use, goodwill, or other intangible losses.
            </p>
          </div>
          
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Termination</h2>
            <p className="text-muted-foreground">
              We may terminate or suspend your account and access to AgriQCert at any time, without prior notice, 
              for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
            </p>
          </div>
          
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <p className="text-muted-foreground">
              For questions about these Terms of Service, please contact us at:
              <br />
              Email: legal@agriqcert.com
              <br />
              Address: 123 Innovation Drive, San Francisco, CA 94105
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;