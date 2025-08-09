import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, User, Building, Shield, Truck } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ParticleBackground } from "@/components/ui/particle-background";

const roleConfigs = {
  exporter: {
    icon: Building,
    title: "Exporter Login",
    description: "Access your dashboard to submit batches and manage certifications",
    color: "text-primary"
  },
  qa_agency: {
    icon: Shield,
    title: "QA Agency Login",
    description: "Manage inspection requests and issue quality certificates",
    color: "text-secondary"
  },
  importer: {
    icon: Truck,
    title: "Importer/Customs Login",
    description: "Verify certificates and access import documentation",
    color: "text-success"
  },
  admin: {
    icon: User,
    title: "Admin Login",
    description: "System administration and user management",
    color: "text-warning"
  }
};

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<keyof typeof roleConfigs>("exporter");
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data, error } = await signIn(formData.email, formData.password, selectedRole);
    
    if (data && !error) {
      // Redirect based on role
      navigate(`/dashboard/${selectedRole}`);
    } else if (error) {
      // Error is already handled in useAuth hook with toast
      console.error("Login failed:", error.message);
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const currentRoleConfig = roleConfigs[selectedRole];
  const RoleIcon = currentRoleConfig.icon;

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 relative">
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

      <div className="w-full max-w-md relative z-10">
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

        <Card className="glass border-white/20 shadow-glow bg-card/95 backdrop-blur-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2 mb-2">
              <RoleIcon className={`h-6 w-6 ${currentRoleConfig.color}`} />
              <CardTitle className="text-xl text-card-foreground">{currentRoleConfig.title}</CardTitle>
            </div>
            <CardDescription className="text-muted-foreground">
              {currentRoleConfig.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Role Selection */}
            <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as keyof typeof roleConfigs)}>
              <TabsList className="grid w-full grid-cols-2 gap-1">
                <TabsTrigger value="exporter" className="text-xs">Exporter</TabsTrigger>
                <TabsTrigger value="qa_agency" className="text-xs">QA Agency</TabsTrigger>
              </TabsList>
              <TabsList className="grid w-full grid-cols-2 gap-1 mt-2">
                <TabsTrigger value="importer" className="text-xs">Importer</TabsTrigger>
                <TabsTrigger value="admin" className="text-xs">Admin</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="placeholder:text-muted-foreground/60"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="placeholder:text-muted-foreground/60"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 text-muted-foreground">
                  <input type="checkbox" className="rounded" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" variant="agri" className="w-full" size="lg">
                Sign In as {currentRoleConfig.title.split(' ')[0]}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Create one here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;