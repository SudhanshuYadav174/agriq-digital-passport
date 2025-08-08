import { ParticleBackground } from "@/components/ui/particle-background";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen py-24 relative">
      <ParticleBackground particleCount={40} speed={0.0002} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Last updated: January 1, 2024
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Information We Collect</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account information (name, email, organization details)</li>
                <li>Certificate and batch data you submit</li>
                <li>Usage data and analytics</li>
                <li>Communication preferences</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-bold mb-6">How We Use Your Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and verify agricultural certificates</li>
                <li>Communicate with you about your account and our services</li>
                <li>Comply with legal obligations and industry standards</li>
                <li>Detect, prevent, and address fraud and security issues</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Information Sharing</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>We may share your information in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With your consent or at your direction</li>
                <li>For legal compliance and protection of rights</li>
                <li>With service providers who assist in our operations</li>
                <li>In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. This includes encryption, 
              access controls, and regular security assessments.
            </p>
          </div>
          
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Your Rights</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your personal information</li>
                <li>Data portability</li>
                <li>Objection to processing</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@agriqcert.com
              <br />
              Address: 123 Innovation Drive, San Francisco, CA 94105
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;