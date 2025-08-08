import { ParticleBackground } from "@/components/ui/particle-background";

const CompliancePage = () => {
  return (
    <div className="min-h-screen py-24 relative">
      <ParticleBackground particleCount={40} speed={0.0002} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Compliance & Standards
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AgriQCert meets global compliance standards for agricultural certification
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-2xl shadow-soft">
              <h3 className="text-xl font-semibold mb-4">International Standards</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• ISO 22000 - Food Safety Management</li>
                <li>• GlobalGAP - Good Agricultural Practice</li>
                <li>• HACCP - Hazard Analysis Critical Control Points</li>
                <li>• W3C Verifiable Credentials</li>
                <li>• USDA Organic Standards</li>
                <li>• EU Organic Regulations</li>
              </ul>
            </div>
            
            <div className="bg-card p-6 rounded-2xl shadow-soft">
              <h3 className="text-xl font-semibold mb-4">Regional Compliance</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• FDA Food Safety Modernization Act</li>
                <li>• EU Food Law Regulations</li>
                <li>• Canada Food and Drug Act</li>
                <li>• ASEAN Food Safety Standards</li>
                <li>• Australian Food Standards Code</li>
                <li>• Japanese Food Sanitation Law</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Data Protection & Privacy</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">GDPR Compliance</h3>
                <p className="text-muted-foreground">
                  Full compliance with the General Data Protection Regulation for EU operations, including data subject rights and consent management.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">CCPA Compliance</h3>
                <p className="text-muted-foreground">
                  Adherence to the California Consumer Privacy Act requirements for US operations, ensuring consumer privacy rights.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Audit & Certification</h2>
            <p className="text-muted-foreground mb-4">
              AgriQCert undergoes regular third-party audits to ensure compliance with international standards:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Annual SOC 2 Type II audits</li>
              <li>• ISO 27001 certification</li>
              <li>• Regular penetration testing</li>
              <li>• Continuous security monitoring</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompliancePage;