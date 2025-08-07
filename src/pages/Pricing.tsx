import { ParticleBackground } from "@/components/ui/particle-background";

const PricingPage = () => {
  return (
    <div className="min-h-screen py-24 relative">
      <ParticleBackground particleCount={45} speed={0.0001} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your agricultural certification needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <div className="bg-card p-8 rounded-2xl shadow-soft border border-border">
            <h3 className="text-2xl font-bold mb-4">Starter</h3>
            <p className="text-4xl font-bold mb-6">$99<span className="text-lg font-normal text-muted-foreground">/month</span></p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center"><span className="text-success mr-2">✓</span> Up to 100 certificates/month</li>
              <li className="flex items-center"><span className="text-success mr-2">✓</span> Basic verification</li>
              <li className="flex items-center"><span className="text-success mr-2">✓</span> Email support</li>
            </ul>
            <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold">
              Get Started
            </button>
          </div>
          
          {/* Professional Plan */}
          <div className="bg-card p-8 rounded-2xl shadow-soft border-2 border-primary relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Professional</h3>
            <p className="text-4xl font-bold mb-6">$299<span className="text-lg font-normal text-muted-foreground">/month</span></p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center"><span className="text-success mr-2">✓</span> Up to 1,000 certificates/month</li>
              <li className="flex items-center"><span className="text-success mr-2">✓</span> Advanced analytics</li>
              <li className="flex items-center"><span className="text-success mr-2">✓</span> API access</li>
              <li className="flex items-center"><span className="text-success mr-2">✓</span> Priority support</li>
            </ul>
            <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold">
              Get Started
            </button>
          </div>
          
          {/* Enterprise Plan */}
          <div className="bg-card p-8 rounded-2xl shadow-soft border border-border">
            <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
            <p className="text-4xl font-bold mb-6">Custom</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center"><span className="text-success mr-2">✓</span> Unlimited certificates</li>
              <li className="flex items-center"><span className="text-success mr-2">✓</span> Custom integrations</li>
              <li className="flex items-center"><span className="text-success mr-2">✓</span> Dedicated support</li>
              <li className="flex items-center"><span className="text-success mr-2">✓</span> White-label solution</li>
            </ul>
            <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;