// import { useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import { ArrowRight, Shield, Leaf, Globe, QrCode } from "lucide-react";
// import { ParticleBackground } from "@/components/ui/particle-background";
// import { useAuth } from "@/hooks/useAuth";
// import { useState } from "react";

// const HeroTrialButton = () => {
//   const { user, getUserProfile } = useAuth();
//   const [userProfile, setUserProfile] = useState<any>(null);

//   useEffect(() => {
//     if (user) {
//       getUserProfile().then(setUserProfile);
//     }
//   }, [user, getUserProfile]);

//   if (user) {
//     const role = userProfile?.role || user.user_metadata?.role;
//     const dashboardPath = role === 'admin' ? '/dashboard/admin' : 
//                          role === 'qa' ? '/dashboard/qa' : 
//                          role === 'importer' ? '/dashboard/importer' : 
//                          '/dashboard/exporter';
    
//     return (
//       <Button variant="trial" size="xl" asChild className="group">
//         <Link to={dashboardPath}>
//           {role === 'admin' ? 'Go to Admin Dashboard' : 'Go to Dashboard'}
//           <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//         </Link>
//       </Button>
//     );
//   }

//   return (
//     <Button variant="trial" size="xl" asChild className="group">
//       <Link to="/signup">
//         Start Free Trial
//         <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//       </Link>
//     </Button>
//   );
// };

// const HeroSection = () => {
//   const heroRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Simple scroll-triggered animation
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("animate-fade-in");
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     if (heroRef.current) {
//       observer.observe(heroRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section className="relative min-h-screen flex items-center overflow-hidden">
//       <ParticleBackground particleCount={80} speed={0.0003} />
//       {/* Background with gradient */}
//       <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
//         <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
//         <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: "2s" }} />
//       </div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Hero Content */}
//           <div ref={heroRef} className="text-white space-y-8">
//             <div className="space-y-4">
//               <div className="flex items-center space-x-2 text-white/90">
//                 <Shield className="h-5 w-5" />
//                 <span className="text-sm font-medium">Trusted Digital Certification</span>
//               </div>
              
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
//                 Digital Quality
//                 <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
//                   Certification
//                 </span>
//                 <span className="block text-2xl md:text-3xl font-normal text-white/90 mt-2">
//                   for Agricultural Products
//                 </span>
//               </h1>
              
//               <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
//                 Streamline your agricultural export certification process with our secure, 
//                 blockchain-powered digital platform. From farm to table, ensure quality and trust.
//               </p>
//             </div>

//             {/* CTAs */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <HeroTrialButton />
//               <Button variant="glass" size="xl" asChild className="group">
//                 <Link to="/verify">
//                   Verify Certificate
//                   <QrCode className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                 </Link>
//               </Button>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/20">
//               <div className="text-center">
//                 <div className="text-2xl md:text-3xl font-bold text-white">50K+</div>
//                 <div className="text-sm text-white/70">Certificates Issued</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl md:text-3xl font-bold text-white">150+</div>
//                 <div className="text-sm text-white/70">Countries Served</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl md:text-3xl font-bold text-white">99.9%</div>
//                 <div className="text-sm text-white/70">Verification Rate</div>  
//               </div>
//             </div>
//           </div>

//           {/* Hero Visual */}
//           <div className="relative">
//             <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-glow">
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 bg-primary dark:bg-primary rounded-lg flex items-center justify-center">
//                       <Leaf className="h-5 w-5 text-white" />
//                     </div>
//                     <div>
//                       <div className="text-white font-semibold">Certificate #AGR-2024-001</div>
//                       <div className="text-white/70 text-sm">Premium Organic Rice</div>
//                     </div>
//                   </div>
//                   <div className="px-3 py-1 bg-primary/20 text-white rounded-full text-xs font-medium">
//                     Verified ✓
//                   </div>
//                 </div>
                
//                 <div className="space-y-3">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-white/70">Quality Grade</span>
//                     <span className="text-white font-medium">Premium A+</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-white/70">Export Country</span>
//                     <span className="text-white font-medium">India</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-white/70">Certification Date</span>
//                     <span className="text-white font-medium">Dec 15, 2024</span>
//                   </div>
//                 </div>

//                 <div className="pt-4 border-t border-white/20">
//                   <div className="w-24 h-24 bg-white rounded-lg mx-auto flex items-center justify-center">
//                     <QrCode className="h-16 w-16 text-primary" />
//                   </div>
//                   <div className="text-center mt-2 text-white/70 text-xs">
//                     Scan to verify instantly
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Floating elements */}
//             <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
//             <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: "1.5s" }} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;












// import { useEffect, useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import { ArrowRight, Shield, Leaf, Globe, QrCode } from "lucide-react";
// import { ParticleBackground } from "@/components/ui/particle-background";
// import { useAuth } from "@/hooks/useAuth";

// const HeroTrialButton = () => {
//   const { user, getUserProfile } = useAuth();
//   const [userProfile, setUserProfile] = useState<any>(null);
//   const [loadingProfile, setLoadingProfile] = useState(true);

//   useEffect(() => {
//     let mounted = true;
//     if (user) {
//       getUserProfile()
//         .then((profile) => {
//           if (mounted) {
//             setUserProfile(profile);
//             setLoadingProfile(false);
//           }
//         })
//         .catch(() => setLoadingProfile(false));
//     } else {
//       setLoadingProfile(false);
//     }
//     return () => {
//       mounted = false;
//     };
//   }, [user, getUserProfile]);

//   if (loadingProfile) {
//     // Optionally return null or a placeholder button while loading
//     return (
//       <Button variant="trial" size="xl" disabled>
//         Loading...
//       </Button>
//     );
//   }

//   if (user) {
//     // Adjust role key names as per your app's user roles
//     const role = userProfile?.role || user.user_metadata?.role || "";
//     let dashboardPath = "/dashboard/exporter";

//     if (role === "admin") {
//       dashboardPath = "/dashboard/admin";
//     } else if (role === "qa_agency") {
//       dashboardPath = "/dashboard/qa";
//     } else if (role === "importer") {
//       dashboardPath = "/dashboard/importer";
//     }

//     return (
//       <Button variant="trial" size="xl" asChild className="group">
//         <Link to={dashboardPath}>
//           {/* Show different text for admin */}
//           {role === "admin" ? "Go to Admin Dashboard" : "Go to Dashboard"}
//           <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//         </Link>
//       </Button>
//     );
//   }

//   return (
//     <Button variant="trial" size="xl" asChild className="group">
//       <Link to="/signup">
//         Start Free Trial
//         <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//       </Link>
//     </Button>
//   );
// };

// const HeroSection = () => {
//   const heroRef = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     // Simple scroll-triggered animation
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("animate-fade-in");
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );
//     if (heroRef.current) {
//       observer.observe(heroRef.current);
//     }
//     return () => observer.disconnect();
//   }, []);
//   return (
//     <section className="relative min-h-screen flex items-center overflow-hidden">
//       <ParticleBackground particleCount={80} speed={0.0003} />
//       {/* Background with gradient */}
//       <div className="absolute inset-0 bg-gradient-hero opacity-90" />

//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
//         <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
//         <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: "2s" }} />
//       </div>
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Hero Content */}
//           <div ref={heroRef} className="text-white space-y-8">
//             <div className="space-y-4">
//               <div className="flex items-center space-x-2 text-white/90">
//                 <Shield className="h-5 w-5" />
//                 <span className="text-sm font-medium">Trusted Digital Certification</span>
//               </div>

//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
//                 Digital Quality
//                 <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
//                   Certification
//                 </span>
//                 <span className="block text-2xl md:text-3xl font-normal text-white/90 mt-2">
//                   for Agricultural Products
//                 </span>
//               </h1>

//               <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
//                 Streamline your agricultural export certification process with our secure, 
//                 blockchain-powered digital platform. From farm to table, ensure quality and trust.
//               </p>
//             </div>
//             {/* CTAs */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <HeroTrialButton />
//               <Button variant="glass" size="xl" asChild className="group">
//                 <Link to="/verify">
//                   Verify Certificate
//                   <QrCode className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                 </Link>
//               </Button>
//             </div>
//             {/* Stats */}
//             <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/20">
//               <div className="text-center">
//                 <div className="text-2xl md:text-3xl font-bold text-white">50K+</div>
//                 <div className="text-sm text-white/70">Certificates Issued</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl md:text-3xl font-bold text-white">150+</div>
//                 <div className="text-sm text-white/70">Countries Served</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl md:text-3xl font-bold text-white">99.9%</div>
//                 <div className="text-sm text-white/70">Verification Rate</div>  
//               </div>
//             </div>
//           </div>
//           {/* Hero Visual */}
//           <div className="relative">
//             <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-glow">
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 bg-primary dark:bg-primary rounded-lg flex items-center justify-center">
//                       <Leaf className="h-5 w-5 text-white" />
//                     </div>
//                     <div>
//                       <div className="text-white font-semibold">Certificate #AGR-2024-001</div>
//                       <div className="text-white/70 text-sm">Premium Organic Rice</div>
//                     </div>
//                   </div>
//                   <div className="px-3 py-1 bg-primary/20 text-white rounded-full text-xs font-medium">
//                     Verified ✓
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-white/70">Quality Grade</span>
//                     <span className="text-white font-medium">Premium A+</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-white/70">Export Country</span>
//                     <span className="text-white font-medium">India</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-white/70">Certification Date</span>
//                     <span className="text-white font-medium">Dec 15, 2024</span>
//                   </div>
//                 </div>
//                 <div className="pt-4 border-t border-white/20">
//                   <div className="w-24 h-24 bg-white rounded-lg mx-auto flex items-center justify-center">
//                     <QrCode className="h-16 w-16 text-primary" />
//                   </div>
//                   <div className="text-center mt-2 text-white/70 text-xs">
//                     Scan to verify instantly
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Floating elements */}
//             <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
//             <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: "1.5s" }} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;



// ExporterDashboard.jsx
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useBatches } from "@/hooks/useBatches";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Download, Plus, Package, Clock, CheckCircle, AlertCircle, BarChart3, TrendingUp } from "lucide-react";
import AnalyticsCharts from "@/components/analytics/AnalyticsCharts";

const ExporterDashboard = () => {
  const { user, loading, profile } = useAuth();

  if (loading) {
    return null; // You can replace with a loading spinner if you want
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const role = profile?.role || user.user_metadata?.role || "";

  if (role !== "exporter") {
    switch (role) {
      case "qa_agency":
        return <Navigate to="/dashboard/qa" />;
      case "importer":
        return <Navigate to="/dashboard/importer" />;
      case "admin":
        return <Navigate to="/dashboard/admin" />;
      default:
        return <Navigate to="/login" />;
    }
  }

  const [activeTab, setActiveTab] = useState("overview");
  const { batches, loading: batchesLoading } = useBatches();

  const totalBatches = batches.length;
  const certifiedBatches = batches.filter((b) => b.status === "certified").length;
  const pendingBatches = batches.filter((b) => b.status === "pending" || b.status === "submitted").length;
  const inspectionBatches = batches.filter((b) => b.status === "inspection").length;
  const stats = [
    { title: "Total Batches", value: totalBatches.toString(), change: "+12%", icon: Package, color: "text-primary" },
    { title: "Pending Certification", value: pendingBatches.toString(), change: "+3%", icon: Clock, color: "text-warning" },
    { title: "Certified Batches", value: certifiedBatches.toString(), change: "+18%", icon: CheckCircle, color: "text-success" },
    { title: "Export Value", value: "$2.4M", change: "+25%", icon: TrendingUp, color: "text-secondary" },
  ];

  const recentBatches = batches.slice(0, 4).map((batch) => {
    const progress =
      batch.status === "certified"
        ? 100
        : batch.status === "inspection"
        ? 75
        : batch.status === "submitted"
        ? 25
        : 0;

    return {
      id: batch.batch_number,
      product: batch.product_name,
      status: batch.status,
      date: new Date(batch.created_at).toLocaleDateString(),
      progress,
    };
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "certified":
        return "bg-success text-success-foreground";
      case "inspection":
        return "bg-warning text-warning-foreground";
      case "submitted":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "certified":
        return CheckCircle;
      case "inspection":
        return Clock;
      case "submitted":
        return Upload;
      default:
        return AlertCircle;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>
      <div className="container mx-auto px-4 py-8 space-y-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Exporter Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your agricultural product certifications</p>
          </div>
          <Button variant="agri" size="lg" className="group" asChild>
            <Link to="/submit">
              <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform" />
              Submit New Batch
            </Link>
          </Button>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-success">{stat.change} from last month</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-primary/10`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="batches">My Batches</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            {/* Recent Batches */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Batches</CardTitle>
                <CardDescription>Track the progress of your submitted batches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBatches.map((batch) => {
                    const StatusIcon = getStatusIcon(batch.status);
                    return (
                      <div key={batch.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <StatusIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{batch.product}</div>
                            <div className="text-sm text-muted-foreground">ID: {batch.id}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <Badge className={getStatusColor(batch.status)}>
                              {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                            </Badge>
                            <div className="text-sm text-muted-foreground mt-1">{batch.date}</div>
                          </div>
                          <div className="w-24">
                            <Progress value={batch.progress} className="h-2" />
                            <div className="text-xs text-muted-foreground mt-1 text-center">{batch.progress}%</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="h-5 w-5 text-primary" />
                    <span>Submit New Batch</span>
                  </CardTitle>
                  <CardDescription>Start the certification process for a new product batch</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="agri" className="w-full" asChild>
                    <Link to="/submit">Create Submission</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Download className="h-5 w-5 text-secondary" />
                    <span>Download Certificates</span>
                  </CardTitle>
                  <CardDescription>Access and download your digital quality certificates</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="secondary" className="w-full">
                    View Certificates
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="batches">
            <Card>
              <CardHeader>
                <CardTitle>All Batches</CardTitle>
                <CardDescription>Complete list of your submitted batches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Batch management interface coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle>Digital Certificates</CardTitle>
                <CardDescription>Download and manage your quality certificates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Certificate management interface coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
                  <p className="text-muted-foreground">Real-time insights into your certification performance</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span>Live data</span>
                </div>
              </div>
              <AnalyticsCharts />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default ExporterDashboard;

// HeroTrialButton.jsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const HeroTrialButton = () => {
  const { user, getUserProfile } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (user) {
      getUserProfile()
        .then((profile) => {
          if (mounted) {
            setUserProfile(profile);
            setLoadingProfile(false);
          }
        })
        .catch(() => setLoadingProfile(false));
    } else {
      setLoadingProfile(false);
    }
    return () => {
      mounted = false;
    };
  }, [user, getUserProfile]);

  if (loadingProfile) {
    return <Button variant="trial" size="xl" disabled>Loading...</Button>;
  }

  if (user) {
    const role = userProfile?.role || user.user_metadata?.role || "";
    let dashboardPath = "/dashboard/exporter";
    if (role === "admin") {
      dashboardPath = "/dashboard/admin";
    } else if (role === "qa_agency") {
      dashboardPath = "/dashboard/qa";
    } else if (role === "importer") {
      dashboardPath = "/dashboard/importer";
    }

    return (
      <Button variant="trial" size="xl" asChild className="group">
        <Link to={dashboardPath}>
          {role === "admin" ? "Go to Admin Dashboard" : "Go to Dashboard"}
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    );
  }

  return (
    <Button variant="trial" size="xl" asChild className="group">
      <Link to="/signup">
        Start Free Trial
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </Button>
  );
};

export default HeroTrialButton;

