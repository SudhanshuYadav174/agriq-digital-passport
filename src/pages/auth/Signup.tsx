// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth";
// import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Leaf, Building, Shield, Truck, User, Check } from "lucide-react";
// import { ThemeToggle } from "@/components/ui/theme-toggle";
// import { ParticleBackground } from "@/components/ui/particle-background";

// const roleConfigs = {
//   exporter: {
//     icon: Building,
//     title: "Exporter Registration",
//     description: "Register your agricultural business for quality certification",
//     color: "text-primary",
//     benefits: ["Submit batches for certification", "Track certification progress", "Download digital certificates", "Access global markets"]
//   },
//   qa_agency: {
//     icon: Shield,
//     title: "QA Agency Registration",
//     description: "Join our network of certified quality assurance agencies",
//     color: "text-secondary",
//     benefits: ["Receive inspection requests", "Schedule inspections", "Issue quality certificates", "Manage agency workflow"]
//   },
//   importer: {
//     icon: Truck,
//     title: "Importer/Customs Registration",
//     description: "Verify certificates and streamline import processes",
//     color: "text-success",
//     benefits: ["Instant certificate verification", "QR code scanning", "Import documentation", "Customs integration"]
//   },
//   admin: {
//     icon: User,
//     title: "Admin Registration",
//     description: "System administration access (approval required)",
//     color: "text-warning",
//     benefits: ["User management", "System configuration", "Audit logs", "Analytics dashboard"]
//   }
// };

// const Signup = () => {
//   const [selectedRole, setSelectedRole] = useState<keyof typeof roleConfigs>("exporter");
//   const { signUp } = useAuth();
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     // Basic Info
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
    
//     // Organization Info
//     organizationName: "",
//     organizationType: "",
//     country: "",
//     address: "",
//     website: "",
//     description: "",
    
//     // Role-specific
//     licenseNumber: "",
//     certifications: ""
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSelectChange = (field: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (formData.password !== formData.confirmPassword) {
//       toast({
//         title: "Password mismatch",
//         description: "Please make sure your passwords match.",
//         variant: "destructive",
//       });
//       return;
//     }

//     const userData = {
//       first_name: formData.firstName,
//       last_name: formData.lastName,
//       phone: formData.phone,
//       organization_name: formData.organizationName,
//       organization_type: formData.organizationType,
//       country: formData.country,
//       address: formData.address,
//       website: formData.website,
//       role: selectedRole,
//       license_number: formData.licenseNumber,
//       certifications: formData.certifications
//     };

//     const { data, error } = await signUp(formData.email, formData.password, userData);
    
//     if (data && !error) {
//       // Redirect to login or dashboard
//       navigate('/login');
//     }
//   };

//   const currentRoleConfig = roleConfigs[selectedRole];
//   const RoleIcon = currentRoleConfig.icon;

//   return (
//     <div className="min-h-screen bg-gradient-hero py-12 px-4 relative">
//       <ParticleBackground particleCount={50} speed={0.0002} />
//       {/* Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse" />
//         <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
//       </div>
      
//       {/* Theme Toggle */}
//       <div className="absolute top-4 right-4 z-20">
//         <ThemeToggle />
//       </div>

//       <div className="container mx-auto max-w-4xl relative z-10">
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <Link to="/" className="inline-flex items-center space-x-2 group">
//             <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
//               <Leaf className="h-8 w-8 text-white" />
//             </div>
//             <div className="text-left">
//               <span className="text-2xl font-bold text-white">AgriQCert</span>
//               <div className="text-sm text-white/80">Quality Certification</div>
//             </div>
//           </Link>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Role Selection & Benefits */}
//           <div className="lg:col-span-1">
//             <Card className="glass border-white/20 shadow-glow bg-card/95 backdrop-blur-md">
//               <CardHeader>
//                 <CardTitle className="text-lg font-semibold text-foreground">Choose Your Role</CardTitle>
//                 <CardDescription className="text-muted-foreground">Select the role that best describes you</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as keyof typeof roleConfigs)} orientation="vertical">
//                   <TabsList className="flex flex-col h-auto w-full">
//                     {Object.entries(roleConfigs).map(([key, config]) => {
//                       const Icon = config.icon;
//                       return (
//                         <TabsTrigger key={key} value={key} className="w-full justify-start space-x-2 p-3">
//                           <Icon className={`h-4 w-4 ${config.color}`} />
//                           <span className="text-xs">{config.title.split(' ')[0]}</span>
//                         </TabsTrigger>
//                       );
//                     })}
//                   </TabsList>
//                 </Tabs>

//                 {/* Benefits */}
//                 <div className="mt-6 space-y-3">
//                   <h4 className="font-medium text-foreground">What you get:</h4>
//                   <ul className="space-y-2">
//                     {currentRoleConfig.benefits.map((benefit, index) => (
//                       <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
//                         <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
//                         <span>{benefit}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Registration Form */}
//           <div className="lg:col-span-2">
//             <Card className="glass border-white/20 shadow-glow bg-card/95 backdrop-blur-md">
//               <CardHeader>
//                 <div className="flex items-center space-x-2">
//                   <RoleIcon className={`h-6 w-6 ${currentRoleConfig.color}`} />
//                   <CardTitle className="text-xl font-semibold text-foreground">{currentRoleConfig.title}</CardTitle>
//                 </div>
//                 <CardDescription className="text-muted-foreground">{currentRoleConfig.description}</CardDescription>
//               </CardHeader>

//               <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   {/* Personal Information */}
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
//                      {/* Demo Account Info */}
//                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-4">
//                        <h4 className="text-sm font-medium text-foreground mb-2">Demo Account Available:</h4>
//                        <p className="text-xs text-muted-foreground">
//                          Try our platform with demo credentials. See login page for demo account details.
//                        </p>
//                      </div>

//                      <div className="grid md:grid-cols-2 gap-4">
//                        <div className="space-y-2">
//                          <Label htmlFor="firstName" className="text-foreground">First Name</Label>
//                          <Input
//                            id="firstName"
//                            name="firstName"
//                            placeholder="Enter your first name"
//                            value={formData.firstName}
//                            onChange={handleInputChange}
//                            required
//                            className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground/60"
//                          />
//                        </div>
//                        <div className="space-y-2">
//                          <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
//                          <Input
//                            id="lastName"
//                            name="lastName"
//                            placeholder="Enter your last name"
//                            value={formData.lastName}
//                            onChange={handleInputChange}
//                            required
//                            className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground/60"
//                          />
//                        </div>
//                      </div>

//                      <div className="grid md:grid-cols-2 gap-4">
//                        <div className="space-y-2">
//                          <Label htmlFor="email" className="text-foreground">Email</Label>
//                          <Input
//                            id="email"
//                            name="email"
//                            type="email"
//                            placeholder="Enter your email address"
//                            value={formData.email}
//                            onChange={handleInputChange}
//                            required
//                            className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground/60"
//                          />
//                        </div>
//                        <div className="space-y-2">
//                          <Label htmlFor="phone" className="text-foreground">Phone</Label>
//                          <Input
//                            id="phone"
//                            name="phone"
//                            type="tel"
//                            placeholder="Enter your phone number"
//                            value={formData.phone}
//                            onChange={handleInputChange}
//                            required
//                            className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground/60"
//                          />
//                        </div>
//                      </div>

//                      <div className="grid md:grid-cols-2 gap-4">
//                        <div className="space-y-2">
//                          <Label htmlFor="password" className="text-foreground">Password</Label>
//                          <Input
//                            id="password"
//                            name="password"
//                            type="password"
//                            placeholder="Create a strong password"
//                            value={formData.password}
//                            onChange={handleInputChange}
//                            required
//                            className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground/60"
//                          />
//                        </div>
//                        <div className="space-y-2">
//                          <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
//                          <Input
//                            id="confirmPassword"
//                            name="confirmPassword"
//                            type="password"
//                            placeholder="Confirm your password"
//                            value={formData.confirmPassword}
//                            onChange={handleInputChange}
//                            required
//                            className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground/60"
//                          />
//                        </div>
//                      </div>
//                   </div>

//                   {/* Organization Information */}
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold text-foreground">Organization Information</h3>
//                     <div className="grid md:grid-cols-2 gap-4">
//                        <div className="space-y-2">
//                          <Label htmlFor="organizationName" className="text-foreground">Organization Name</Label>
//                          <Input
//                            id="organizationName"
//                            name="organizationName"
//                            value={formData.organizationName}
//                            onChange={handleInputChange}
//                            required
//                            className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground/60"
//                          />
//                        </div>
//                        <div className="space-y-2">
//                          <Label htmlFor="organizationType" className="text-foreground">Organization Type</Label>
//                          <Select value={formData.organizationType} onValueChange={(value) => handleSelectChange("organizationType", value)}>
//                            <SelectTrigger className="bg-background/50 border-border text-foreground">
//                              <SelectValue placeholder="Select type" />
//                            </SelectTrigger>
//                            <SelectContent>
//                              <SelectItem value="farm">Farm</SelectItem>
//                              <SelectItem value="processor">Processor</SelectItem>
//                              <SelectItem value="exporter">Exporter</SelectItem>
//                              <SelectItem value="importer">Importer</SelectItem>
//                              <SelectItem value="agency">QA Agency</SelectItem>
//                              <SelectItem value="customs">Customs</SelectItem>
//                              <SelectItem value="other">Other</SelectItem>
//                            </SelectContent>
//                          </Select>
//                        </div>
//                      </div>

//                      <div className="grid md:grid-cols-2 gap-4">
//                        <div className="space-y-2">
//                          <Label htmlFor="country" className="text-foreground">Country</Label>
//                          <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
//                            <SelectTrigger className="bg-background/50 border-border text-foreground">
//                              <SelectValue placeholder="Select country" />
//                            </SelectTrigger>
//                            <SelectContent>
//                              <SelectItem value="us">United States</SelectItem>
//                              <SelectItem value="in">India</SelectItem>
//                              <SelectItem value="br">Brazil</SelectItem>
//                              <SelectItem value="cn">China</SelectItem>
//                              <SelectItem value="other">Other</SelectItem>
//                            </SelectContent>
//                          </Select>
//                        </div>
//                        <div className="space-y-2">
//                          <Label htmlFor="website" className="text-foreground">Website (Optional)</Label>
//                          <Input
//                            id="website"
//                            name="website"
//                            type="url"
//                            value={formData.website}
//                            onChange={handleInputChange}
//                            className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground/60"
//                          />
//                        </div>
//                      </div>

//                      <div className="space-y-2">
//                        <Label htmlFor="address" className="text-foreground">Address</Label>
//                        <Textarea
//                          id="address"
//                          name="address"
//                          value={formData.address}
//                          onChange={handleInputChange}
//                          rows={3}
//                          required
//                          className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground/60"
//                        />
//                      </div>
//                   </div>

//                   {/* Role-specific fields */}
//                   {(selectedRole === "qa_agency" || selectedRole === "admin") && (
//                     <div className="space-y-4">
//                       <h3 className="text-lg font-semibold text-foreground">Additional Information</h3>
//                       <div className="grid md:grid-cols-2 gap-4">
//                          <div className="space-y-2">
//                            <Label htmlFor="licenseNumber" className="text-foreground">License Number</Label>
//                            <Input
//                              id="licenseNumber"
//                              name="licenseNumber"
//                              value={formData.licenseNumber}
//                              onChange={handleInputChange}
//                              required
//                              className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground/60"
//                            />
//                          </div>
//                          <div className="space-y-2">
//                            <Label htmlFor="certifications" className="text-foreground">Certifications</Label>
//                            <Input
//                              id="certifications"
//                              name="certifications"
//                              value={formData.certifications}
//                              onChange={handleInputChange}
//                              placeholder="e.g., ISO 9001, HACCP"
//                              className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground/60"
//                            />
//                          </div>
//                       </div>
//                     </div>
//                   )}

//                   <div className="space-y-4">
//                     <div className="flex items-center space-x-2 text-sm">
//                       <input type="checkbox" required className="rounded" />
//                       <span className="text-muted-foreground">
//                         I agree to the{" "}
//                         <Link to="/terms" className="text-primary hover:underline">
//                           Terms of Service
//                         </Link>{" "}
//                         and{" "}
//                         <Link to="/privacy" className="text-primary hover:underline">
//                           Privacy Policy
//                         </Link>
//                       </span>
//                     </div>

//                     <Button type="submit" variant="premium" className="w-full" size="lg">
//                       Create Account
//                     </Button>
//                   </div>

//                   <div className="text-center text-sm text-muted-foreground">
//                     Already have an account?{" "}
//                     <Link to="/login" className="text-primary hover:underline font-medium">
//                       Sign in here
//                     </Link>
//                   </div>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;




import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Leaf, Building, Shield, Truck, User, Check } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ParticleBackground } from "@/components/ui/particle-background";

const roleConfigs = {
  exporter: {
    icon: Building,
    title: "Exporter Registration",
    description: "Register your agricultural business for quality certification",
    color: "text-primary",
    benefits: ["Submit batches for certification", "Track certification progress", "Download digital certificates", "Access global markets"]
  },
  qa_agency: {
    icon: Shield,
    title: "QA Agency Registration",
    description: "Join our network of certified quality assurance agencies",
    color: "text-secondary",
    benefits: ["Receive inspection requests", "Schedule inspections", "Issue quality certificates", "Manage agency workflow"]
  },
  importer: {
    icon: Truck,
    title: "Importer/Customs Registration",
    description: "Verify certificates and streamline import processes",
    color: "text-success",
    benefits: ["Instant certificate verification", "QR code scanning", "Import documentation", "Customs integration"]
  },
  admin: {
    icon: User,
    title: "Admin Registration",
    description: "System administration access (approval required)",
    color: "text-warning",
    benefits: ["User management", "System configuration", "Audit logs", "Analytics dashboard"]
  }
};

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState<keyof typeof roleConfigs>("exporter");
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    
    // Organization Info
    organizationName: "",
    organizationType: "",
    country: "",
    address: "",
    website: "",
    description: "",
    
    // Role-specific
    licenseNumber: "",
    certifications: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    const userData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      organization_name: formData.organizationName,
      organization_type: formData.organizationType,
      country: formData.country,
      address: formData.address,
      website: formData.website,
      role: selectedRole,
      license_number: formData.licenseNumber,
      certifications: formData.certifications
    };

    const { data, error } = await signUp(formData.email, formData.password, userData);
    
    if (data && !error) {
      // Redirect to login or dashboard
      navigate('/login');
    }
  };

  const currentRoleConfig = roleConfigs[selectedRole];
  const RoleIcon = currentRoleConfig.icon;

  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4 relative">
      <ParticleBackground particleCount={50} speed={0.0002} />
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>
      
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-bold text-white">AgriQCert</span>
              <div className="text-sm text-white/80">Quality Certification</div>
            </div>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Role Selection & Benefits */}
          <div className="lg:col-span-1">
            <Card className="glass border-white/20 shadow-glow bg-card/95 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-black">Choose Your Role</CardTitle>
                <CardDescription className="text-gray-700 dark:text-black">Select the role that best describes you</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as keyof typeof roleConfigs)} orientation="vertical">
                  <TabsList className="flex flex-col h-auto w-full">
                    {Object.entries(roleConfigs).map(([key, config]) => {
                      const Icon = config.icon;
                      return (
                        <TabsTrigger key={key} value={key} className="w-full justify-start space-x-2 p-3">
                          <Icon className={`h-4 w-4 ${config.color}`} />
                          <span className="text-xs">{config.title.split(' ')[0]}</span>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </Tabs>

                {/* Benefits */}
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium text-gray-900 dark:text-black">What you get:</h4>
                  <ul className="space-y-2">
                    {currentRoleConfig.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-700 dark:text-black">
                        <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-2">
            <Card className="glass border-white/20 shadow-glow bg-card/95 backdrop-blur-md">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <RoleIcon className={`h-6 w-6 ${currentRoleConfig.color}`} />
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-black">{currentRoleConfig.title}</CardTitle>
                </div>
                <CardDescription className="text-gray-700 dark:text-black">{currentRoleConfig.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-black">Personal Information</h3>
                     
                     {/* Demo Account Info */}
                     <div className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-3 mb-4">
                       <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Demo Account Available:</h4>
                       <p className="text-xs text-gray-700 dark:text-gray-200">
                         Try our platform with demo credentials. See login page for demo account details.
                       </p>
                     </div>

                     <div className="grid md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label htmlFor="firstName" className="text-gray-900 dark:text-black">First Name</Label>
                         <Input
                           id="firstName"
                           name="firstName"
                           placeholder="Enter your first name"
                           value={formData.firstName}
                           onChange={handleInputChange}
                           required
                           className="bg-background/50 border-border text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent"
                         />
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="lastName" className="text-gray-900 dark:text-black">Last Name</Label>
                         <Input
                           id="lastName"
                           name="lastName"
                           placeholder="Enter your last name"
                           value={formData.lastName}
                           onChange={handleInputChange}
                           required
                           className="bg-background/50 border-border text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent"
                         />
                       </div>
                     </div>

                     <div className="grid md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label htmlFor="email" className="text-gray-900 dark:text-black">Email</Label>
                         <Input
                           id="email"
                           name="email"
                           type="email"
                           placeholder="Enter your email address"
                           value={formData.email}
                           onChange={handleInputChange}
                           required
                           className="bg-background/50 border-border text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent"
                         />
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="phone" className="text-gray-900 dark:text-black">Phone</Label>
                         <Input
                           id="phone"
                           name="phone"
                           type="tel"
                           placeholder="Enter your phone number"
                           value={formData.phone}
                           onChange={handleInputChange}
                           required
                           className="bg-background/50 border-border text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent"
                         />
                       </div>
                     </div>

                     <div className="grid md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label htmlFor="password" className="text-gray-900 dark:text-black">Password</Label>
                         <Input
                           id="password"
                           name="password"
                           type="password"
                           placeholder="Create a strong password"
                           value={formData.password}
                           onChange={handleInputChange}
                           required
                           className="bg-background/50 border-border text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent"
                         />
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="confirmPassword" className="text-gray-900 dark:text-black">Confirm Password</Label>
                         <Input
                           id="confirmPassword"
                           name="confirmPassword"
                           type="password"
                           placeholder="Confirm your password"
                           value={formData.confirmPassword}
                           onChange={handleInputChange}
                           required
                           className="bg-background/50 border-border text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent"
                         />
                       </div>
                     </div>
                  </div>

                  {/* Organization Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-black">Organization Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label htmlFor="organizationName" className="text-gray-900 dark:text-black">Organization Name</Label>
                         <Input
                           id="organizationName"
                           name="organizationName"
                           value={formData.organizationName}
                           onChange={handleInputChange}
                           required
                           className="bg-background/50 border-border text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent"
                         />
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="organizationType" className="text-gray-900 dark:text-black">Organization Type</Label>
                         <Select value={formData.organizationType} onValueChange={(value) => handleSelectChange("organizationType", value)}>
                           <SelectTrigger className="bg-background/50 border-border text-foreground dark:text-white">
                             <SelectValue placeholder="Select type" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="farm">Farm</SelectItem>
                             <SelectItem value="processor">Processor</SelectItem>
                             <SelectItem value="exporter">Exporter</SelectItem>
                             <SelectItem value="importer">Importer</SelectItem>
                             <SelectItem value="agency">QA Agency</SelectItem>
                             <SelectItem value="customs">Customs</SelectItem>
                             <SelectItem value="other">Other</SelectItem>
                           </SelectContent>
                         </Select>
                       </div>
                     </div>

                     <div className="grid md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label htmlFor="country" className="text-gray-900 dark:text-black">Country</Label>
                         <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
                           <SelectTrigger className="bg-background/50 border-border text-foreground dark:text-white">
                             <SelectValue placeholder="Select country" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="us">United States</SelectItem>
                             <SelectItem value="in">India</SelectItem>
                             <SelectItem value="br">Brazil</SelectItem>
                             <SelectItem value="cn">China</SelectItem>
                             <SelectItem value="other">Other</SelectItem>
                           </SelectContent>
                         </Select>
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="website" className="text-gray-900 dark:text-black">Website (Optional)</Label>
                         <Input
                           id="website"
                           name="website"
                           type="url"
                           value={formData.website}
                           onChange={handleInputChange}
                           className="bg-background/50 border-border text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent"
                         />
                       </div>
                     </div>

                     <div className="space-y-2">
                       <Label htmlFor="address" className="text-gray-900 dark:text-black">Address</Label>
                       <Textarea
                         id="address"
                         name="address"
                         value={formData.address}
                         onChange={handleInputChange}
                         rows={3}
                         required
                         className="bg-background/50 border-border text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent"
                       />
                     </div>
                  </div>

                  {/* Role-specific fields */}
                  {(selectedRole === "qa_agency" || selectedRole === "admin") && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-black">Additional Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                         <div className="space-y-2">
                           <Label htmlFor="licenseNumber" className="text-gray-900 dark:text-black">License Number</Label>
                           <Input
                             id="licenseNumber"
                             name="licenseNumber"
                             value={formData.licenseNumber}
                             onChange={handleInputChange}
                             required
                             className="bg-background/50 border-border text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent"
                           />
                         </div>
                         <div className="space-y-2">
                           <Label htmlFor="certifications" className="text-gray-900 dark:text-black">Certifications</Label>
                           <Input
                             id="certifications"
                             name="certifications"
                             value={formData.certifications}
                             onChange={handleInputChange}
                             placeholder="e.g., ISO 9001, HACCP"
                             className="bg-background/50 border-border text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent"
                           />
                         </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" required className="rounded" />
                      <span className="text-gray-900 dark:text-black">
                        I agree to the{" "}
                        <Link to="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </span>
                    </div>

                    <Button type="submit" variant="premium" className="w-full" size="lg">
                      Create Account
                    </Button>
                  </div>

                  <div className="text-center text-sm text-gray-900 dark:text-black">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                      Sign in here
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
