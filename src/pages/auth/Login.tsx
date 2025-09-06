// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Leaf, User, Building, Shield, Truck } from "lucide-react";
// import { ThemeToggle } from "@/components/ui/theme-toggle";
// import { ParticleBackground } from "@/components/ui/particle-background";

// const roleConfigs = {
//   exporter: {
//     icon: Building,
//     title: "Exporter Login",
//     description: "Access your dashboard to submit batches and manage certifications",
//     color: "text-primary"
//   },
//   qa_agency: {
//     icon: Shield,
//     title: "QA Agency Login",
//     description: "Manage inspection requests and issue quality certificates",
//     color: "text-secondary"
//   },
//   importer: {
//     icon: Truck,
//     title: "Importer/Customs Login",
//     description: "Verify certificates and access import documentation",
//     color: "text-success"
//   },
//   admin: {
//     icon: User,
//     title: "Admin Login",
//     description: "System administration and user management",
//     color: "text-warning"
//   }
// };

// const Login = () => {
//   const [selectedRole, setSelectedRole] = useState<keyof typeof roleConfigs>("exporter");
//   const { user, signIn } = useAuth();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const { data, error } = await signIn(formData.email, formData.password, selectedRole);
    
//     if (data && !error) {
//       // Redirect based on role
//       navigate(`/dashboard/${selectedRole}`);
//     } else if (error) {
//       // Error is already handled in useAuth hook with toast
//       console.error("Login failed:", error.message);
//     }
//   };

//   // Redirect if already logged in
//   useEffect(() => {
//     if (user) {
//       navigate('/');
//     }
//   }, [user, navigate]);

//   const currentRoleConfig = roleConfigs[selectedRole];
//   const RoleIcon = currentRoleConfig.icon;

//   return (
//     <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 relative">
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

//       <div className="w-full max-w-md relative z-10">
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

//         <Card className="glass border-white/20 shadow-glow bg-card/95 backdrop-blur-md">
//           <CardHeader className="space-y-1">
//             <div className="flex items-center space-x-2 mb-2">
//               <RoleIcon className={`h-6 w-6 ${currentRoleConfig.color}`} />
//               <CardTitle className="text-xl text-card-foreground">{currentRoleConfig.title}</CardTitle>
//             </div>
//             <CardDescription className="text-muted-foreground">
//               {currentRoleConfig.description}
//             </CardDescription>
//           </CardHeader>
          
//           <CardContent className="space-y-6">
//             {/* Role Selection */}
//             <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as keyof typeof roleConfigs)}>
//               <TabsList className="grid w-full grid-cols-2 gap-1">
//                 <TabsTrigger value="exporter" className="text-xs">Exporter</TabsTrigger>
//                 <TabsTrigger value="qa_agency" className="text-xs">QA Agency</TabsTrigger>
//               </TabsList>
//               <TabsList className="grid w-full grid-cols-2 gap-1 mt-2">
//                 <TabsTrigger value="importer" className="text-xs">Importer</TabsTrigger>
//                 <TabsTrigger value="admin" className="text-xs">Admin</TabsTrigger>
//               </TabsList>
//             </Tabs>

//             {/* Demo Account Info */}
//             <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-4">
//               <h4 className="text-sm font-medium text-foreground mb-2">Demo Account Credentials:</h4>
//               <div className="text-xs space-y-1 text-muted-foreground">
//                 <div>• Exporter: demo.exporter@agriqcert.com / password123</div>
//                 <div>• QA Agency: demo.qa@agriqcert.com / password123</div>
//                 <div>• Importer: demo.importer@agriqcert.com / password123</div>
//                 <div>• Admin: demo.admin@agriqcert.com / password123</div>
//               </div>
//             </div>

//             {/* Login Form */}
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-foreground">Email</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="Enter your email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                   className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground/60"
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="password" className="text-foreground">Password</Label>
//                 <Input
//                   id="password"
//                   name="password"
//                   type="password"
//                   placeholder="Enter your password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   required
//                   className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground/60"
//                 />
//               </div>

//               <div className="flex items-center justify-between text-sm">
//                 <label className="flex items-center space-x-2 text-muted-foreground">
//                   <input type="checkbox" className="rounded" />
//                   <span>Remember me</span>
//                 </label>
//                 <Link to="/forgot-password" className="text-primary hover:underline">
//                   Forgot password?
//                 </Link>
//               </div>

//               <Button type="submit" variant="agri" className="w-full" size="lg">
//                 Sign In as {currentRoleConfig.title.split(' ')[0]}
//               </Button>
//             </form>

//             {/* Sign Up Link */}
//             <div className="text-center text-sm text-muted-foreground">
//               Don't have an account?{" "}
//               <Link to="/signup" className="text-primary hover:underline font-medium">
//                 Create one here
//               </Link>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Login;



// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Leaf, User, Building, Shield, Truck, Info } from "lucide-react";
// import { ThemeToggle } from "@/components/ui/theme-toggle";
// import { ParticleBackground } from "@/components/ui/particle-background";

// const roleConfigs = {
//   exporter: {
//     icon: Building,
//     title: "Exporter Login",
//     description: "Access your dashboard to submit batches and manage certifications",
//     color: "text-primary"
//   },
//   qa_agency: {
//     icon: Shield,
//     title: "QA Agency Login",
//     description: "Manage inspection requests and issue quality certificates",
//     color: "text-secondary"
//   },
//   importer: {
//     icon: Truck,
//     title: "Importer/Customs Login",
//     description: "Verify certificates and access import documentation",
//     color: "text-success"
//   },
//   admin: {
//     icon: User,
//     title: "Admin Login",
//     description: "System administration and user management",
//     color: "text-warning"
//   }
// };

// const Login = () => {
//   const [selectedRole, setSelectedRole] = useState<keyof typeof roleConfigs>("exporter");
//   const { user, signIn } = useAuth();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const { data, error } = await signIn(formData.email, formData.password, selectedRole);
    
//     if (data && !error) {
//       // Redirect based on role
//       navigate(`/dashboard/${selectedRole}`);
//     } else if (error) {
//       // Error is already handled in useAuth hook with toast
//       console.error("Login failed:", error.message);
//     }
//   };

//   // Redirect if already logged in
//   useEffect(() => {
//     if (user) {
//       navigate('/');
//     }
//   }, [user, navigate]);

//   const currentRoleConfig = roleConfigs[selectedRole];
//   const RoleIcon = currentRoleConfig.icon;

//   return (
//     <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 relative">
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

//       <div className="w-full max-w-md relative z-10">
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

//         <Card className="glass border-white/20 shadow-glow bg-card/95 backdrop-blur-md">
//           <CardHeader className="space-y-1">
//             <div className="flex items-center space-x-2 mb-2">
//               <RoleIcon className={`h-6 w-6 ${currentRoleConfig.color}`} />
//               <CardTitle className="text-xl text-gray-900 dark:text-black">
//                 {currentRoleConfig.title}
//               </CardTitle>
//             </div>
//             <CardDescription className="text-gray-700 dark:text-black">
//               {currentRoleConfig.description}
//             </CardDescription>
//           </CardHeader>
          
//           <CardContent className="space-y-6">
//             {/* Role Selection */}
//             <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as keyof typeof roleConfigs)}>
//               <TabsList className="grid w-full grid-cols-2 gap-1">
//                 <TabsTrigger value="exporter" className="text-xs">Exporter</TabsTrigger>
//                 <TabsTrigger value="qa_agency" className="text-xs">QA Agency</TabsTrigger>
//               </TabsList>
//               <TabsList className="grid w-full grid-cols-2 gap-1 mt-2">
//                 <TabsTrigger value="importer" className="text-xs">Importer</TabsTrigger>
//                 <TabsTrigger value="admin" className="text-xs">Admin</TabsTrigger>
//               </TabsList>
//             </Tabs>

//             {/* Demo Account Info - Fixed for better contrast */}
//             <div className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-4 space-y-3">
//               <div className="flex items-center space-x-2">
//                 <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
//                 <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
//                   Demo Account Credentials
//                 </h4>
//               </div>
              
//               <div className="grid grid-cols-1 gap-2 text-xs">
//                 <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
//                   <span className="font-medium text-gray-900 dark:text-white">Exporter:</span>
//                   <span className="text-gray-700 dark:text-gray-200">demo.exporter@agriqcert.com</span>
//                 </div>
//                 <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
//                   <span className="font-medium text-gray-900 dark:text-white">QA Agency:</span>
//                   <span className="text-gray-700 dark:text-gray-200">demo.qa@agriqcert.com</span>
//                 </div>
//                 <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
//                   <span className="font-medium text-gray-900 dark:text-white">Importer:</span>
//                   <span className="text-gray-700 dark:text-gray-200">demo.importer@agriqcert.com</span>
//                 </div>
//                 <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
//                   <span className="font-medium text-gray-900 dark:text-white">Admin:</span>
//                   <span className="text-gray-700 dark:text-gray-200">demo.admin@agriqcert.com</span>
//                 </div>
//               </div>
              
//               <div className="text-center">
//                 <span className="text-xs text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded font-medium">
//                   Password for all accounts: <strong>password123</strong>
//                 </span>
//               </div>
//             </div>

//             {/* Login Form */}
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label 
//                   htmlFor="email" 
//                   className="text-sm font-medium text-gray-900 dark:text-black"
//                 >
//                   Email
//                 </Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="demo.admin@agriqcert.com"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                   className="bg-background/50 border-border text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <Label 
//                   htmlFor="password" 
//                   className="text-sm font-medium text-gray-900 dark:text-black"
//                 >
//                   Password
//                 </Label>
//                 <Input
//                   id="password"
//                   name="password"
//                   type="password"
//                   placeholder="••••••••••"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   required
//                   className="bg-background/50 border-border text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//               </div>

//               <div className="flex items-center justify-between text-sm">
//                 <label className="flex items-center space-x-2 text-gray-900 dark:text-black cursor-pointer">
//                   <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
//                   <span>Remember me</span>
//                 </label>
//                 <Link to="/forgot-password" className="text-primary hover:underline">
//                   Forgot password?
//                 </Link>
//               </div>

//               <Button type="submit" variant="agri" className="w-full" size="lg">
//                 Sign In as {currentRoleConfig.title.split(' ')[0]}
//               </Button>
//             </form>

//             {/* Sign Up Link */}
//             <div className="text-center text-sm text-gray-900 dark:text-black">
//               Don't have an account?{" "}
//               <Link to="/signup" className="text-primary hover:underline font-medium">
//                 Create one here
//               </Link>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Login;



// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Leaf, User, Building, Shield, Truck, Info } from "lucide-react";
// import { ThemeToggle } from "@/components/ui/theme-toggle";
// import { ParticleBackground } from "@/components/ui/particle-background";

// const roleConfigs = {
//   exporter: {
//     icon: Building,
//     title: "Exporter Login",
//     description: "Access your dashboard to submit batches and manage certifications",
//     color: "text-primary"
//   },
//   qa_agency: {
//     icon: Shield,
//     title: "QA Agency Login",
//     description: "Manage inspection requests and issue quality certificates",
//     color: "text-secondary"
//   },
//   importer: {
//     icon: Truck,
//     title: "Importer/Customs Login",
//     description: "Verify certificates and access import documentation",
//     color: "text-success"
//   },
//   admin: {
//     icon: User,
//     title: "Admin Login",
//     description: "System administration and user management",
//     color: "text-warning"
//   }
// };

// const Login = () => {
//   const [selectedRole, setSelectedRole] = useState<keyof typeof roleConfigs>("exporter");
//   const { user, signIn } = useAuth();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const { data, error } = await signIn(formData.email, formData.password, selectedRole);
    
//     if (data && !error) {
//       // Redirect based on role with proper mapping
//       const roleMapping = {
//         exporter: 'exporter',
//         qa_agency: 'qa',
//         importer: 'importer',
//         admin: 'admin'
//       };
//       navigate(`/dashboard/${roleMapping[selectedRole]}`);
//     } else if (error) {
//       // Error is already handled in useAuth hook with toast
//       console.error("Login failed:", error.message);
//     }
//   };

//   // Redirect if already logged in
//   useEffect(() => {
//     if (user) {
//       navigate('/');
//     }
//   }, [user, navigate]);

//   const currentRoleConfig = roleConfigs[selectedRole];
//   const RoleIcon = currentRoleConfig.icon;

//   return (
//     <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 relative">
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

//       <div className="w-full max-w-md relative z-10">
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

//         <Card className="glass border-white/20 shadow-glow bg-card/95 backdrop-blur-md">
//           <CardHeader className="space-y-1">
//             <div className="flex items-center space-x-2 mb-2">
//               <RoleIcon className={`h-6 w-6 ${currentRoleConfig.color}`} />
//               <CardTitle className="text-xl text-gray-900 dark:text-black">
//                 {currentRoleConfig.title}
//               </CardTitle>
//             </div>
//             <CardDescription className="text-gray-700 dark:text-black">
//               {currentRoleConfig.description}
//             </CardDescription>
//           </CardHeader>
          
//           <CardContent className="space-y-6">
//             {/* Role Selection */}
//             <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as keyof typeof roleConfigs)}>
//               <TabsList className="grid w-full grid-cols-2 gap-1">
//                 <TabsTrigger value="exporter" className="text-xs">Exporter</TabsTrigger>
//                 <TabsTrigger value="qa_agency" className="text-xs">QA Agency</TabsTrigger>
//               </TabsList>
//               <TabsList className="grid w-full grid-cols-2 gap-1 mt-2">
//                 <TabsTrigger value="importer" className="text-xs">Importer</TabsTrigger>
//                 <TabsTrigger value="admin" className="text-xs">Admin</TabsTrigger>
//               </TabsList>
//             </Tabs>

//             {/* Demo Account Info - Fixed for better contrast */}
//             <div className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-4 space-y-3">
//               <div className="flex items-center space-x-2">
//                 <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
//                 <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
//                   Demo Account Credentials
//                 </h4>
//               </div>
              
//               <div className="grid grid-cols-1 gap-2 text-xs">
//                 <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
//                   <span className="font-medium text-gray-900 dark:text-white">Exporter:</span>
//                   <span className="text-gray-700 dark:text-gray-200">demo.exporter@agriqcert.com</span>
//                 </div>
//                 <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
//                   <span className="font-medium text-gray-900 dark:text-white">QA Agency:</span>
//                   <span className="text-gray-700 dark:text-gray-200">demo.qa@agriqcert.com</span>
//                 </div>
//                 <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
//                   <span className="font-medium text-gray-900 dark:text-white">Importer:</span>
//                   <span className="text-gray-700 dark:text-gray-200">demo.importer@agriqcert.com</span>
//                 </div>
//                 <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
//                   <span className="font-medium text-gray-900 dark:text-white">Admin:</span>
//                   <span className="text-gray-700 dark:text-gray-200">demo.admin@agriqcert.com</span>
//                 </div>
//               </div>
              
//               <div className="text-center">
//                 <span className="text-xs text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded font-medium">
//                   Password for all accounts: <strong>password123</strong>
//                 </span>
//               </div>
//             </div>

//             {/* Login Form */}
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label 
//                   htmlFor="email" 
//                   className="text-sm font-medium text-gray-900 dark:text-black"
//                 >
//                   Email
//                 </Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="demo.admin@agriqcert.com"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                   className="bg-background/50 border-border text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <Label 
//                   htmlFor="password" 
//                   className="text-sm font-medium text-gray-900 dark:text-black"
//                 >
//                   Password
//                 </Label>
//                 <Input
//                   id="password"
//                   name="password"
//                   type="password"
//                   placeholder="••••••••••"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   required
//                   className="bg-background/50 border-border text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//               </div>

//               <div className="flex items-center justify-between text-sm">
//                 <label className="flex items-center space-x-2 text-gray-900 dark:text-black cursor-pointer">
//                   <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
//                   <span>Remember me</span>
//                 </label>
//                 <Link to="/forgot-password" className="text-primary hover:underline">
//                   Forgot password?
//                 </Link>
//               </div>

//               <Button type="submit" variant="agri" className="w-full" size="lg">
//                 Sign In as {currentRoleConfig.title.split(' ')[0]}
//               </Button>
//             </form>

//             {/* Sign Up Link */}
//             <div className="text-center text-sm text-gray-900 dark:text-black">
//               Don't have an account?{" "}
//               <Link to="/signup" className="text-primary hover:underline font-medium">
//                 Create one here
//               </Link>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Leaf, User, Building, Shield, Truck, Info } from "lucide-react";
// import { ThemeToggle } from "@/components/ui/theme-toggle";
// import { ParticleBackground } from "@/components/ui/particle-background";

// const roleConfigs = {
//   exporter: {
//     icon: Building,
//     title: "Exporter Login",
//     description: "Access your dashboard to submit batches and manage certifications",
//     color: "text-primary",
//   },
//   qa_agency: {
//     icon: Shield,
//     title: "QA Agency Login",
//     description: "Manage inspection requests and issue quality certificates",
//     color: "text-secondary",
//   },
//   importer: {
//     icon: Truck,
//     title: "Importer/Customs Login",
//     description: "Verify certificates and access import documentation",
//     color: "text-success",
//   },
//   admin: {
//     icon: User,
//     title: "Admin Login",
//     description: "System administration and user management",
//     color: "text-warning",
//   },
// };

// const Login = () => {
//   const [selectedRole, setSelectedRole] = useState<keyof typeof roleConfigs>("exporter");
//   const { user, signIn } = useAuth();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const { data, error } = await signIn(formData.email, formData.password, selectedRole);

//     if (data && !error) {
//       // Redirect based on role mapping
//       const roleMapping = {
//         exporter: "exporter",
//         qa_agency: "qa",
//         importer: "importer",
//         admin: "admin",
//       };
//       navigate(`/dashboard/${roleMapping[selectedRole]}`);
//     } else if (error) {
//       console.error("Login failed:", error.message);
//       // Toast already handled by useAuth hook
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       navigate("/"); // Redirect away from login if already logged in
//     }
//   }, [user, navigate]);

//   const currentRoleConfig = roleConfigs[selectedRole];
//   const RoleIcon = currentRoleConfig.icon;

//   return (
//     <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 relative">
//       <ParticleBackground particleCount={50} speed={0.0002} />
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse" />
//         <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
//       </div>

//       <div className="absolute top-4 right-4 z-20">
//         <ThemeToggle />
//       </div>

//       <div className="w-full max-w-md relative z-10">
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

//         <Card className="glass border-white/20 shadow-glow bg-card/95 backdrop-blur-md">
//           <CardHeader className="space-y-1">
//             <div className="flex items-center space-x-2 mb-2">
//               <RoleIcon className={`${currentRoleConfig.color} h-6 w-6`} />
//               <CardTitle className="text-xl text-gray-900 dark:text-black">{currentRoleConfig.title}</CardTitle>
//             </div>
//             <CardDescription className="text-gray-700 dark:text-black">{currentRoleConfig.description}</CardDescription>
//           </CardHeader>

//           <CardContent>
//             <Tabs value={selectedRole} onValueChange={value => setSelectedRole(value as keyof typeof roleConfigs)}>
//               <TabsList className="grid grid-cols-2 gap-1 w-full">
//                 <TabsTrigger value="exporter" className="text-xs">Exporter</TabsTrigger>
//                 <TabsTrigger value="qa_agency" className="text-xs">QA Agency</TabsTrigger>
//               </TabsList>
//               <TabsList className="grid grid-cols-2 gap-1 w-full mt-2">
//                 <TabsTrigger value="importer" className="text-xs">Importer</TabsTrigger>
//                 <TabsTrigger value="admin" className="text-xs">Admin</TabsTrigger>
//               </TabsList>
//             </Tabs>

//             <div className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-4 mt-4 space-y-3">
//               <div className="flex items-center space-x-2">
//                 <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
//                 <p className="text-sm font-semibold text-gray-900 dark:text-white">
//                   Demo Account Credentials
//                 </p>
//               </div>
//               <div className="grid grid-cols-1 gap-2 text-xs">
//                 <div className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
//                   <span className="font-medium text-gray-900 dark:text-white">Exporter:</span>
//                   <span className="text-gray-700 dark:text-gray-200">demo.exporter@agriqcert.com</span>
//                 </div>
//                 <div className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
//                   <span className="font-medium text-gray-900 dark:text-white">QA Agency:</span>
//                   <span className="text-gray-700 dark:text-gray-200">demo.qa@agriqcert.com</span>
//                 </div>
//                 <div className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
//                   <span className="font-medium text-gray-900 dark:text-white">Importer:</span>
//                   <span className="text-gray-700 dark:text-gray-200">demo.importer@agriqcert.com</span>
//                 </div>
//                 <div className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
//                   <span className="font-medium text-gray-900 dark:text-white">Admin:</span>
//                   <span className="text-gray-700 dark:text-gray-200">demo.admin@agriqcert.com</span>
//                 </div>
//               </div>
//               <div className="text-center mt-2">
//                 <p className="text-xs text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded font-medium">
//                   Password for all accounts: <strong>password123</strong>
//                 </p>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//               <div>
//                 <Label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-black">
//                   Email
//                 </Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="demo.admin@agriqcert.com"
//                   className="mt-1 block w-full"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-black">
//                   Password
//                 </Label>
//                 <Input
//                   id="password"
//                   name="password"
//                   type="password"
//                   placeholder="••••••••"
//                   className="mt-1 block w-full"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div className="flex items-center justify-between text-sm">
//                 <label className="flex items-center space-x-2 cursor-pointer">
//                   <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
//                   <span>Remember me</span>
//                 </label>
//                 <Link to="/forgot-password" className="text-primary hover:underline">
//                   Forgot password?
//                 </Link>
//               </div>

//               <Button type="submit" variant="agri" size="lg" className="w-full">
//                 Sign In as {currentRoleConfig.title.split(" ")[0]}
//               </Button>
//             </form>

//             <p className="mt-4 text-center text-sm text-gray-900 dark:text-black">
//               Don’t have an account?{" "}
//               <Link to="/signup" className="text-primary hover:underline font-medium">
//                 Create one here
//               </Link>
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Login;


import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, User, Building, Shield, Truck, Info } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ParticleBackground } from "@/components/ui/particle-background";

const roleConfigs = {
  exporter: {
    icon: Building,
    title: "Exporter Login",
    description: "Access your dashboard to submit batches and manage certifications",
    color: "text-primary",
  },
  qa_agency: {
    icon: Shield,
    title: "QA Agency Login",
    description: "Manage inspection requests and issue quality certificates",
    color: "text-secondary",
  },
  importer: {
    icon: Truck,
    title: "Importer Login",
    description: "Verify certificates and access import documentation",
    color: "text-success",
  },
  admin: {
    icon: User,
    title: "Admin Login",
    description: "System administration and user management",
    color: "text-warning",
  },
};

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<keyof typeof roleConfigs>("exporter");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect logged in users away from login
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await signIn(formData.email, formData.password, selectedRole);
    if (data && !error) {
      const roleRouteMap = {
        exporter: "exporter",
        qa_agency: "qa",
        importer: "importer",
        admin: "admin",
      };
      navigate(`/dashboard/${roleRouteMap[selectedRole]}`);
    } else if (error) {
      // error toast handled inside signIn hook
      console.error("Login failed:", error.message);
    }
  };

  const currentConfig = roleConfigs[selectedRole];
  const RoleIcon = currentConfig.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-600 flex flex-col justify-center items-center p-4 relative">
      <ParticleBackground particleCount={50} speed={0.0002} />
      <div className="absolute top-4 right-4 z-50"><ThemeToggle /></div>

      <div className="max-w-md w-full bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 shadow-lg relative z-10">
        <div className="mb-6 text-center text-white">
          <Link to="/" className="inline-flex items-center justify-center space-x-2">
            <div className="p-3 bg-white bg-opacity-20 rounded-xl"><Leaf className="w-10 h-10" /></div>
            <span className="text-2xl font-bold">AgriQCert</span>
          </Link>
          <p className="mt-1">Quality Certification</p>
        </div>

        <Card className="bg-transparent shadow-none">
          <CardHeader className="text-center text-white">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <RoleIcon className={`${currentConfig.color} w-7 h-7`} />
              <CardTitle className="text-2xl">{currentConfig.title}</CardTitle>
            </div>
            <CardDescription>{currentConfig.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={selectedRole} onValueChange={(v) => setSelectedRole(v as keyof typeof roleConfigs)} className="mb-4">
              <TabsList>
                <TabsTrigger value="exporter">Exporter</TabsTrigger>
                <TabsTrigger value="qa_agency">QA Agency</TabsTrigger>
                <TabsTrigger value="importer">Importer</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="bg-white bg-opacity-20 rounded p-3 mb-4 text-sm text-white">
              <div className="mb-2 font-semibold">Demo Credentials</div>
              <ul className="list-disc list-inside space-y-1">
                <li>Exporter: demo.exporter@agriqcert.com | password123</li>
                <li>QA Agency: demo.qa@agriqcert.com | password123</li>
                <li>Importer: demo.importer@agriqcert.com | password123</li>
                <li>Admin: demo.admin@agriqcert.com | password123</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-white block mb-1">Email</Label>
                <Input 
                  type="email" 
                  name="email" 
                  id="email"
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-white block mb-1">Password</Label>
                <Input 
                  type="password" 
                  name="password" 
                  id="password"
                  value={formData.password} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>

              <div className="flex items-center justify-between text-white text-sm mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="underline">Forgot password?</Link>
              </div>

              <Button type="submit" variant="agri" className="w-full" size="lg">
                Sign In as {currentConfig.title.split(" ")[0]}
              </Button>
            </form>

            <p className="mt-4 text-center text-white text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="underline font-medium">Create one</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;

