import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ParticleBackground } from "@/components/ui/particle-background";
import ChatBot from "@/components/ui/ChatBot";
import { 
  HelpCircle, 
  FileText, 
  Video, 
  Mail, 
  Phone, 
  MessageCircle,
  Book,
  Download,
  ExternalLink,
  User,
  Building,
  Shield,
  Truck
} from "lucide-react";

const Support = () => {
  const faqs = [
    {
      question: "How do I submit a batch for certification?",
      answer: "To submit a batch, log into your Exporter dashboard and click 'Submit New Batch'. Fill in the product details, upload required documents, and submit for QA review. You'll receive a confirmation email with your batch ID."
    },
    {
      question: "How long does the certification process take?",
      answer: "The typical certification process takes 5-7 business days from submission to certificate issuance. This includes initial review (1-2 days), physical inspection (2-3 days), and certificate generation (1-2 days)."
    },
    {
      question: "What documents are required for certification?",
      answer: "Required documents include: Product specifications, Quality test reports, Origin certificates, Export licenses, and Phytosanitary certificates (if applicable). Specific requirements may vary by product type and destination country."
    },
    {
      question: "How do I verify a certificate's authenticity?",
      answer: "Use our Certificate Verification page to scan the QR code or enter the certificate ID. Our blockchain-powered system provides instant verification results with complete certificate details."
    },
    {
      question: "What happens if my certificate expires?",
      answer: "Expired certificates cannot be used for trade. You'll need to resubmit your batch for a new certification. We recommend monitoring expiry dates and starting the renewal process 30 days before expiration."
    },
    {
      question: "Can I download my certificates offline?",
      answer: "Yes, all certificates are available for download as PDF files from your dashboard. They include QR codes for verification and can be printed or shared digitally with trading partners."
    }
  ];

  const guides = [
    {
      title: "Getting Started Guide",
      description: "Complete walkthrough for new users",
      icon: User,
      type: "PDF Guide",
      color: "text-primary"
    },
    {
      title: "Exporter Manual",
      description: "Detailed guide for agricultural exporters",
      icon: Building,
      type: "PDF Manual",
      color: "text-secondary"
    },
    {
      title: "QA Agency Workflow",
      description: "Inspection and certification procedures",
      icon: Shield,
      type: "Video Tutorial",
      color: "text-success"
    },
    {
      title: "Importer Verification",
      description: "How to verify certificates quickly",
      icon: Truck,
      type: "Quick Guide",
      color: "text-warning"
    }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@agriqcert.com",
      hours: "24/7"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our team",
      contact: "+1 (555) 123-4567",
      hours: "Mon-Fri, 9AM-6PM EST"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with support",
      contact: "Available on dashboard",
      hours: "Mon-Fri, 9AM-6PM EST"
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30 py-12 relative">
      <ParticleBackground particleCount={40} speed={0.0002} />
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4 mr-2" />
            Support Center
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How can we help you?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions, access user guides, and get in touch with our support team.
          </p>
        </div>

        {/* Quick Search */}
        <Card className="mb-12 shadow-medium">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Input 
                  placeholder="Search for help articles, guides, or FAQs..." 
                  className="text-lg"
                />
              </div>
              <Button variant="agri" size="lg">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="faq" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="guides">User Guides</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="api">API Docs</TabsTrigger>
          </TabsList>

          <TabsContent value="faq">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  <span>Frequently Asked Questions</span>
                </CardTitle>
                <CardDescription>
                  Find quick answers to the most common questions about AgriQCert
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guides">
            <div className="grid md:grid-cols-2 gap-6">
              {guides.map((guide, index) => {
                const Icon = guide.icon;
                return (
                  <Card key={index} className="shadow-medium hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg bg-primary/10`}>
                          <Icon className={`h-6 w-6 ${guide.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-foreground">{guide.title}</h3>
                            <span className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground">
                              {guide.type}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">
                            {guide.description}
                          </p>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Online
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Video Tutorials */}
            <Card className="mt-8 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Video className="h-5 w-5 text-secondary" />
                  <span>Video Tutorials</span>
                </CardTitle>
                <CardDescription>
                  Watch step-by-step video guides for common tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-muted rounded-lg p-6 text-center">
                    <Video className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                    <h4 className="font-medium mb-2">Platform Overview</h4>
                    <p className="text-sm text-muted-foreground mb-3">5 min tutorial</p>
                    <Button variant="outline" size="sm">Watch Now</Button>
                  </div>
                  <div className="bg-muted rounded-lg p-6 text-center">
                    <Video className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                    <h4 className="font-medium mb-2">Batch Submission</h4>
                    <p className="text-sm text-muted-foreground mb-3">8 min tutorial</p>
                    <Button variant="outline" size="sm">Watch Now</Button>
                  </div>
                  <div className="bg-muted rounded-lg p-6 text-center">
                    <Video className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                    <h4 className="font-medium mb-2">Certificate Verification</h4>
                    <p className="text-sm text-muted-foreground mb-3">3 min tutorial</p>
                    <Button variant="outline" size="sm">Watch Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Methods */}
              <div className="space-y-6">
                <Card className="shadow-medium">
                  <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                    <CardDescription>
                      Choose your preferred way to contact our support team
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contactMethods.map((method, index) => {
                      const Icon = method.icon;
                      return (
                        <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{method.title}</h4>
                            <p className="text-sm text-muted-foreground mb-1">{method.description}</p>
                            <p className="text-sm font-medium">{method.contact}</p>
                            <p className="text-xs text-muted-foreground">{method.hours}</p>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Emergency Contact */}
                <Card className="shadow-medium border-warning">
                  <CardHeader>
                    <CardTitle className="text-warning">Emergency Support</CardTitle>
                    <CardDescription>
                      For urgent issues affecting live shipments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-warning" />
                        <span className="font-medium">+1 (555) 911-CERT</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Available 24/7 for critical certificate verification issues
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        rows={6} 
                        placeholder="Describe your issue or question..."
                        required 
                      />
                    </div>
                    
                    <Button variant="agri" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="api">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Book className="h-5 w-5 text-secondary" />
                  <span>API Documentation</span>
                </CardTitle>
                <CardDescription>
                  Technical documentation for developers and system integrators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">API Endpoints</h3>
                    <div className="space-y-3">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <code className="text-sm font-mono">POST /api/v1/certificates/verify</code>
                          <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">GET</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Verify certificate authenticity</p>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <code className="text-sm font-mono">POST /api/v1/batches/submit</code>
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">POST</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Submit new batch for certification</p>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <code className="text-sm font-mono">GET /api/v1/certificates/&#123;id&#125;</code>
                          <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">GET</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Retrieve certificate details</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Quick Links</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        API Reference Guide
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        OpenAPI Specification
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Interactive API Explorer
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Book className="h-4 w-4 mr-2" />
                        SDK & Examples
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Authentication</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    API access requires authentication using API keys. Contact support to obtain your API credentials.
                  </p>
                  <code className="text-xs bg-background p-2 rounded border">
                    Authorization: Bearer YOUR_API_KEY
                  </code>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <ChatBot />
    </div>
  );
};

export default Support;