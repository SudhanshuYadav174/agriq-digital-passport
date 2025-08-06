const AboutPage = () => {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About AgriQCert
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Revolutionizing agricultural quality certification through innovation and technology
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At AgriQCert, we're committed to transforming the agricultural industry by providing secure, 
              transparent, and efficient quality certification solutions. Our mission is to build trust 
              in the global food supply chain through innovative blockchain technology and comprehensive 
              quality assurance systems.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-2xl shadow-soft">
              <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To become the world's leading platform for agricultural quality certification, 
                ensuring food safety and quality standards are met at every step of the supply chain.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-2xl shadow-soft">
              <h3 className="text-xl font-semibold mb-4">Our Values</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Transparency and Trust</li>
                <li>• Innovation and Excellence</li>
                <li>• Sustainability and Responsibility</li>
                <li>• Global Collaboration</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 2023 by a team of agricultural experts and blockchain engineers, AgriQCert 
              was born from the need for more transparent and efficient quality certification in agriculture.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, we serve hundreds of organizations worldwide, from small family farms to large 
              agricultural corporations, providing them with the tools they need to certify and verify 
              the quality of their products.
            </p>
          </div>
          
          <div className="bg-card p-8 rounded-2xl shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Leadership Team</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah Johnson",
                  position: "CEO & Co-Founder",
                  background: "Former USDA agricultural inspector with 15+ years experience"
                },
                {
                  name: "Michael Chen",
                  position: "CTO & Co-Founder", 
                  background: "Blockchain engineer and former Google software architect"
                },
                {
                  name: "Dr. Elena Rodriguez",
                  position: "Chief Quality Officer",
                  background: "PhD in Food Science, former FDA consultant"
                }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4"></div>
                  <h4 className="font-semibold text-lg">{member.name}</h4>
                  <p className="text-primary font-medium text-sm mb-2">{member.position}</p>
                  <p className="text-muted-foreground text-sm">{member.background}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;