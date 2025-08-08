import { ParticleBackground } from "@/components/ui/particle-background";
import sudhanshutAvatar from "@/assets/sudhanshu-avatar.png";
import namanAvatar from "@/assets/naman-avatar.png";
import harshAvatar from "@/assets/harsh-avatar.png";

const AboutPage = () => {
  return (
    <div className="min-h-screen py-24 relative">
      <ParticleBackground particleCount={40} speed={0.0001} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                  name: "Sudhanshu Yadav",
                  position: "CEO & Co-Founder",
                  background: "Agricultural technology expert with 10+ years experience",
                  avatar: sudhanshutAvatar
                },
                {
                  name: "Naman Sharma",
                  position: "CTO & Co-Founder", 
                  background: "Full-stack developer and blockchain specialist",
                  avatar: namanAvatar
                },
                {
                  name: "Harsh Vardhan Singh",
                  position: "Chief Quality Officer",
                  background: "Quality assurance and certification expert",
                  avatar: harshAvatar
                }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary/20">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
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