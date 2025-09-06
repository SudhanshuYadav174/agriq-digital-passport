// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { Calendar } from "@/components/ui/calendar";
// import { ParticleBackground } from "@/components/ui/particle-background";
// import InspectionModal from "@/components/ui/InspectionModal";
// import CertificateModal from "@/components/ui/CertificateModal";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/hooks/use-toast";
// import { useAuth } from "@/hooks/useAuth";
// import { 
//   Shield, 
//   Calendar as CalendarIcon, 
//   FileCheck, 
//   Clock, 
//   AlertTriangle,
//   CheckCircle,
//   MapPin,
//   User,
//   Building,
//   Download,
//   Plus
// } from "lucide-react";

// const QADashboard = () => {
//   const [activeTab, setActiveTab] = useState("pending");
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
//   const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
//   const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
//   const [inspections, setInspections] = useState<any[]>([]);
//   const [certificates, setCertificates] = useState<any[]>([]);
//   const [stats, setStats] = useState({
//     pending: 0,
//     completed: 0,
//     scheduled: 0,
//     issued: 0
//   });
//   const [loading, setLoading] = useState(true);
//   const { toast } = useToast();
//   const { user } = useAuth();

//   const fetchInspections = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('inspection_actions')
//         .select(`
//           *,
//           batches(
//             id, batch_number, product_name, origin_location,
//             profiles!batches_user_id_fkey(first_name, last_name, organization_name)
//           )
//         `)
//         .eq('inspector_id', user?.id)
//         .order('created_at', { ascending: false });

//       if (error) throw error;
//       setInspections(data || []);
      
//       // Update stats
//       const pending = data?.filter(i => i.status === 'pending').length || 0;
//       const completed = data?.filter(i => i.status === 'completed').length || 0;
//       const scheduled = data?.filter(i => i.status === 'scheduled').length || 0;
      
//       setStats(prev => ({ ...prev, pending, completed, scheduled }));
//     } catch (error: any) {
//       console.error('Error fetching inspections:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCertificates = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('digital_certificates')
//         .select(`
//           *,
//           batches(batch_number, product_name),
//           profiles!digital_certificates_issued_to_fkey(first_name, last_name, organization_name)
//         `)
//         .eq('issued_by', user?.id)
//         .order('created_at', { ascending: false });

//       if (error) throw error;
//       setCertificates(data || []);
//       setStats(prev => ({ ...prev, issued: data?.length || 0 }));
//     } catch (error: any) {
//       console.error('Error fetching certificates:', error);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchInspections();
//       fetchCertificates();

//       // Set up real-time subscriptions
//       const inspectionsChannel = supabase
//         .channel('qa-inspections')
//         .on('postgres_changes', { 
//           event: '*', 
//           schema: 'public', 
//           table: 'inspection_actions',
//           filter: `inspector_id=eq.${user.id}`
//         }, fetchInspections)
//         .subscribe();

//       const certificatesChannel = supabase
//         .channel('qa-certificates')
//         .on('postgres_changes', { 
//           event: '*', 
//           schema: 'public', 
//           table: 'digital_certificates',
//           filter: `issued_by=eq.${user.id}`
//         }, fetchCertificates)
//         .subscribe();

//       return () => {
//         supabase.removeChannel(inspectionsChannel);
//         supabase.removeChannel(certificatesChannel);
//       };
//     }
//   }, [user]);

//   // Dynamic stats based on real data
//   const dynamicStats = [
//     { title: "Pending Inspections", value: stats.pending.toString(), color: "text-warning", bg: "bg-warning/10" },
//     { title: "Completed Today", value: stats.completed.toString(), color: "text-success", bg: "bg-success/10" },
//     { title: "Scheduled This Week", value: stats.scheduled.toString(), color: "text-secondary", bg: "bg-secondary/10" },
//     { title: "Certificates Issued", value: stats.issued.toString(), color: "text-primary", bg: "bg-primary/10" }
//   ];

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case "high": return "bg-destructive text-destructive-foreground";
//       case "medium": return "bg-warning text-warning-foreground";
//       case "low": return "bg-success text-success-foreground";
//       default: return "bg-muted text-muted-foreground";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-subtle relative">
//       <ParticleBackground particleCount={30} speed={0.0001} />
//       <div className="container mx-auto px-4 py-8 space-y-8 relative z-10">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">QA Agency Dashboard</h1>
//           <p className="text-muted-foreground mt-1">Manage inspections and issue quality certificates</p>
//         </div>
//         <div className="flex space-x-3">
//           <Button variant="outline" size="lg" onClick={() => setIsInspectionModalOpen(true)}>
//             <CalendarIcon className="h-5 w-5 mr-2" />
//             Schedule Inspection
//           </Button>
//           <Button variant="agri" size="lg" onClick={() => setIsCertificateModalOpen(true)}>
//             <FileCheck className="h-5 w-5 mr-2" />
//             Issue Certificate
//           </Button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {dynamicStats.map((stat, index) => (
//           <Card key={index} className="hover-lift">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
//                   <p className="text-2xl font-bold text-foreground">{stat.value}</p>
//                 </div>
//                 <div className={`p-3 rounded-lg ${stat.bg}`}>
//                   <Shield className={`h-6 w-6 ${stat.color}`} />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="grid lg:grid-cols-3 gap-8">
//         {/* Inspection Management */}
//         <div className="lg:col-span-2">
//           <Tabs value={activeTab} onValueChange={setActiveTab}>
//             <TabsList className="grid w-full grid-cols-3">
//               <TabsTrigger value="pending">Pending</TabsTrigger>
//               <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
//               <TabsTrigger value="completed">Completed</TabsTrigger>
//             </TabsList>

//             <TabsContent value="pending" className="space-y-4">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Clock className="h-5 w-5 text-warning" />
//                     <span>Pending Inspections</span>
//                   </CardTitle>
//                   <CardDescription>Inspections awaiting your review and scheduling</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {loading ? (
//                       <div className="text-center py-8">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
//                         <p className="text-muted-foreground mt-2">Loading inspections...</p>
//                       </div>
//                     ) : inspections.filter(i => i.status === 'pending').length === 0 ? (
//                       <div className="text-center py-8 text-muted-foreground">
//                         <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                         <p>No pending inspections.</p>
//                       </div>
//                     ) : (
//                       inspections.filter(i => i.status === 'pending').map((inspection) => (
//                         <div key={inspection.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
//                           <div className="flex items-center justify-between mb-3">
//                             <div className="flex items-center space-x-3">
//                               <Badge className={getPriorityColor(inspection.priority)}>
//                                 {inspection.priority?.toUpperCase() || 'MEDIUM'}
//                               </Badge>
//                               <span className="font-medium text-foreground">{inspection.batches?.batch_number}</span>
//                             </div>
//                             <div className="flex space-x-2">
//                               <Button variant="outline" size="sm" onClick={() => setIsInspectionModalOpen(true)}>
//                                 <CalendarIcon className="h-4 w-4 mr-1" />
//                                 Schedule
//                               </Button>
//                               <Button variant="agri" size="sm" onClick={() => setIsInspectionModalOpen(true)}>
//                                 <FileCheck className="h-4 w-4 mr-1" />
//                                 Inspect
//                               </Button>
//                             </div>
//                           </div>
                          
//                           <div className="grid md:grid-cols-2 gap-4 text-sm">
//                             <div className="space-y-2">
//                               <div className="flex items-center space-x-2">
//                                 <Building className="h-4 w-4 text-muted-foreground" />
//                                 <span className="font-medium">{inspection.batches?.profiles?.organization_name}</span>
//                               </div>
//                               <div className="flex items-center space-x-2">
//                                 <User className="h-4 w-4 text-muted-foreground" />
//                                 <span>{inspection.contact_person || 'N/A'}</span>
//                               </div>
//                             </div>
//                             <div className="space-y-2">
//                               <div className="font-medium text-foreground">{inspection.batches?.product_name}</div>
//                               <div className="flex items-center space-x-2 text-muted-foreground">
//                                 <MapPin className="h-4 w-4" />
//                                 <span>{inspection.location || inspection.batches?.origin_location}</span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="scheduled">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Scheduled Inspections</CardTitle>
//                   <CardDescription>Your upcoming inspection appointments</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {inspections.filter(i => i.status === 'scheduled').length === 0 ? (
//                       <div className="text-center py-8 text-muted-foreground">
//                         <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                         <p>No scheduled inspections for today.</p>
//                       </div>
//                     ) : (
//                       inspections.filter(i => i.status === 'scheduled').map((inspection) => (
//                         <div key={inspection.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
//                           <div className="flex items-center justify-between mb-2">
//                             <div className="font-medium">{inspection.batches?.batch_number}</div>
//                             <Badge className="bg-secondary text-secondary-foreground">Scheduled</Badge>
//                           </div>
//                           <p className="text-sm text-muted-foreground mb-2">{inspection.batches?.product_name}</p>
//                           <div className="flex items-center justify-between text-sm">
//                             <span>📍 {inspection.location}</span>
//                             <span>📅 {inspection.scheduled_date ? new Date(inspection.scheduled_date).toLocaleString() : 'TBD'}</span>
//                           </div>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="completed">
//               <Card>
//                 <CardHeader>
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <CardTitle>Completed Inspections</CardTitle>
//                       <CardDescription>Recently completed inspection reports</CardDescription>
//                     </div>
//                     <Button variant="outline" size="sm" onClick={() => setIsCertificateModalOpen(true)}>
//                       <Plus className="h-4 w-4 mr-2" />
//                       Issue Certificate
//                     </Button>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {inspections.filter(i => i.status === 'completed').length === 0 ? (
//                       <div className="text-center py-8 text-muted-foreground">
//                         <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                         <p>Completed inspections will appear here.</p>
//                       </div>
//                     ) : (
//                       inspections.filter(i => i.status === 'completed').map((inspection) => (
//                         <div key={inspection.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
//                           <div className="flex items-center justify-between mb-2">
//                             <div className="font-medium">{inspection.batches?.batch_number}</div>
//                             <div className="flex items-center space-x-2">
//                               <Badge className="bg-success text-success-foreground">Completed</Badge>
//                               {!inspection.certificate_issued && (
//                                 <Button variant="outline" size="sm" onClick={() => setIsCertificateModalOpen(true)}>
//                                   <Shield className="h-4 w-4 mr-1" />
//                                   Issue Cert
//                                 </Button>
//                               )}
//                             </div>
//                           </div>
//                           <p className="text-sm text-muted-foreground mb-2">{inspection.batches?.product_name}</p>
//                           <div className="flex items-center justify-between text-sm">
//                             <span>Score: {inspection.quality_score || 'N/A'}</span>
//                             <span>Completed: {inspection.completed_date ? new Date(inspection.completed_date).toLocaleDateString() : 'N/A'}</span>
//                           </div>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>

//         {/* Calendar & Quick Actions */}
//         <div className="space-y-6">
//           {/* Calendar */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Inspection Calendar</CardTitle>
//               <CardDescription>View and manage your schedule</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Calendar
//                 mode="single"
//                 selected={selectedDate}
//                 onSelect={setSelectedDate}
//                 className="rounded-md border"
//               />
//             </CardContent>
//           </Card>

//           {/* Quick Actions */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Quick Actions</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               <Button variant="outline" className="w-full justify-start" onClick={() => setIsInspectionModalOpen(true)}>
//                 <FileCheck className="h-4 w-4 mr-2" />
//                 Create Inspection Report
//               </Button>
//               <Button variant="outline" className="w-full justify-start" onClick={() => setIsCertificateModalOpen(true)}>
//                 <Shield className="h-4 w-4 mr-2" />
//                 Issue Digital Certificate
//               </Button>
//               <Button variant="outline" className="w-full justify-start">
//                 <CalendarIcon className="h-4 w-4 mr-2" />
//                 View Schedule
//               </Button>
//               <Button variant="outline" className="w-full justify-start">
//                 <Download className="h-4 w-4 mr-2" />
//                 Download Reports
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Today's Summary */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Today's Summary</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               <div className="flex justify-between items-center text-sm">
//                 <span className="text-muted-foreground">Inspections Completed</span>
//                 <span className="font-medium">{stats.completed}</span>
//               </div>
//               <div className="flex justify-between items-center text-sm">
//                 <span className="text-muted-foreground">Certificates Issued</span>
//                 <span className="font-medium">{stats.issued}</span>
//               </div>
//               <div className="flex justify-between items-center text-sm">
//                 <span className="text-muted-foreground">Pending Reviews</span>
//                 <span className="font-medium">{stats.pending}</span>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//       </div>

//       {/* Inspection Modal */}
//       <InspectionModal
//         open={isInspectionModalOpen}
//         onOpenChange={setIsInspectionModalOpen}
//         onInspectionCompleted={fetchInspections}
//       />

//       {/* Certificate Modal */}
//       <CertificateModal
//         open={isCertificateModalOpen}
//         onOpenChange={setIsCertificateModalOpen}
//         onCertificateIssued={fetchCertificates}
//       />
//     </div>
//   );
// };

// export default QADashboard;


import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom"; // *** ADDED FOR GUARD ***
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { ParticleBackground } from "@/components/ui/particle-background";
import InspectionModal from "@/components/ui/InspectionModal";
import CertificateModal from "@/components/ui/CertificateModal";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import {
  Shield,
  Calendar as CalendarIcon,
  FileCheck,
  Clock,
  AlertTriangle,
  CheckCircle,
  MapPin,
  User,
  Building,
  Download,
  Plus,
} from "lucide-react";

// --- START of ROLE GUARD ---
const QADashboard = () => {
  const { user } = useAuth();

  // Redirect unauthenticated users to login
  if (!user) {
    return <Navigate to="/login" />;
  }
  // Redirect users with wrong role
  if (user.role !== "qa_agency") {
    switch (user.role) {
      case "exporter":
        return <Navigate to="/dashboard/exporter" />;
      case "importer":
        return <Navigate to="/dashboard/importer" />;
      case "admin":
        return <Navigate to="/dashboard/admin" />;
      default:
        return <Navigate to="/login" />;
    }
  }
  // --- END of ROLE GUARD ---

  const [activeTab, setActiveTab] = useState("pending");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [inspections, setInspections] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [stats, setStats] = useState({
    pending: 0,
    completed: 0,
    scheduled: 0,
    issued: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchInspections = async () => {
    try {
      const { data, error } = await supabase
        .from("inspection_actions")
        .select(`
          *,
          batches(
            id, batch_number, product_name, origin_location,
            profiles!batches_user_id_fkey(first_name, last_name, organization_name)
          )
        `)
        .eq("inspector_id", user?.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setInspections(data || []);
      const pending = data?.filter((i) => i.status === "pending").length || 0;
      const completed = data?.filter((i) => i.status === "completed").length || 0;
      const scheduled = data?.filter((i) => i.status === "scheduled").length || 0;
      setStats((prev) => ({ ...prev, pending, completed, scheduled }));
    } catch (error: any) {
      console.error("Error fetching inspections:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchCertificates = async () => {
    try {
      const { data, error } = await supabase
        .from("digital_certificates")
        .select(`
          *,
          batches(batch_number, product_name),
          profiles!digital_certificates_issued_to_fkey(first_name, last_name, organization_name)
        `)
        .eq("issued_by", user?.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setCertificates(data || []);
      setStats((prev) => ({ ...prev, issued: data?.length || 0 }));
    } catch (error: any) {
      console.error("Error fetching certificates:", error);
    }
  };
  useEffect(() => {
    if (user) {
      fetchInspections();
      fetchCertificates();
      const inspectionsChannel = supabase
        .channel("qa-inspections")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "inspection_actions",
            filter: `inspector_id=eq.${user.id}`,
          },
          fetchInspections
        )
        .subscribe();
      const certificatesChannel = supabase
        .channel("qa-certificates")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "digital_certificates",
            filter: `issued_by=eq.${user.id}`,
          },
          fetchCertificates
        )
        .subscribe();
      return () => {
        supabase.removeChannel(inspectionsChannel);
        supabase.removeChannel(certificatesChannel);
      };
    }
  }, [user]);
  const dynamicStats = [
    { title: "Pending Inspections", value: stats.pending.toString(), color: "text-warning", bg: "bg-warning/10" },
    { title: "Completed Today", value: stats.completed.toString(), color: "text-success", bg: "bg-success/10" },
    { title: "Scheduled This Week", value: stats.scheduled.toString(), color: "text-secondary", bg: "bg-secondary/10" },
    { title: "Certificates Issued", value: stats.issued.toString(), color: "text-primary", bg: "bg-primary/10" },
  ];
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
  return (
    <div className="min-h-screen bg-gradient-subtle relative">
      <ParticleBackground particleCount={30} speed={0.0001} />
      <div className="container mx-auto px-4 py-8 space-y-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">QA Agency Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage inspections and issue quality certificates</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="lg" onClick={() => setIsInspectionModalOpen(true)}>
              <CalendarIcon className="h-5 w-5 mr-2" />
              Schedule Inspection
            </Button>
            <Button variant="agri" size="lg" onClick={() => setIsCertificateModalOpen(true)}>
              <FileCheck className="h-5 w-5 mr-2" />
              Issue Certificate
            </Button>
          </div>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dynamicStats.map((stat, index) => (
            <Card key={index} className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bg}`}>
                    <Shield className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Inspection Management */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value="pending" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-warning" />
                      <span>Pending Inspections</span>
                    </CardTitle>
                    <CardDescription>Inspections awaiting your review and scheduling</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {loading ? (
                        <div className="text-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                          <p className="text-muted-foreground mt-2">Loading inspections...</p>
                        </div>
                      ) : inspections.filter((i) => i.status === "pending").length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No pending inspections.</p>
                        </div>
                      ) : (
                        inspections
                          .filter((i) => i.status === "pending")
                          .map((inspection) => (
                            <div key={inspection.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <Badge className={getPriorityColor(inspection.priority)}>
                                    {inspection.priority?.toUpperCase() || "MEDIUM"}
                                  </Badge>
                                  <span className="font-medium text-foreground">{inspection.batches?.batch_number}</span>
                                </div>
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm" onClick={() => setIsInspectionModalOpen(true)}>
                                    <CalendarIcon className="h-4 w-4 mr-1" />
                                    Schedule
                                  </Button>
                                  <Button variant="agri" size="sm" onClick={() => setIsInspectionModalOpen(true)}>
                                    <FileCheck className="h-4 w-4 mr-1" />
                                    Inspect
                                  </Button>
                                </div>
                              </div>
                              <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <Building className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">{inspection.batches?.profiles?.organization_name}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span>{inspection.contact_person || "N/A"}</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="font-medium text-foreground">{inspection.batches?.product_name}</div>
                                  <div className="flex items-center space-x-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{inspection.location || inspection.batches?.origin_location}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="scheduled">
                <Card>
                  <CardHeader>
                    <CardTitle>Scheduled Inspections</CardTitle>
                    <CardDescription>Your upcoming inspection appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {inspections.filter((i) => i.status === "scheduled").length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No scheduled inspections for today.</p>
                        </div>
                      ) : (
                        inspections
                          .filter((i) => i.status === "scheduled")
                          .map((inspection) => (
                            <div key={inspection.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                              <div className="flex items-center justify-between mb-2">
                                <div className="font-medium">{inspection.batches?.batch_number}</div>
                                <Badge className="bg-secondary text-secondary-foreground">Scheduled</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{inspection.batches?.product_name}</p>
                              <div className="flex items-center justify-between text-sm">
                                <span>📍 {inspection.location}</span>
                                <span>
                                  📅{" "}
                                  {inspection.scheduled_date
                                    ? new Date(inspection.scheduled_date).toLocaleString()
                                    : "TBD"}
                                </span>
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="completed">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Completed Inspections</CardTitle>
                        <CardDescription>Recently completed inspection reports</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setIsCertificateModalOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Issue Certificate
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {inspections.filter((i) => i.status === "completed").length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Completed inspections will appear here.</p>
                        </div>
                      ) : (
                        inspections
                          .filter((i) => i.status === "completed")
                          .map((inspection) => (
                            <div key={inspection.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                              <div className="flex items-center justify-between mb-2">
                                <div className="font-medium">{inspection.batches?.batch_number}</div>
                                <div className="flex items-center space-x-2">
                                  <Badge className="bg-success text-success-foreground">Completed</Badge>
                                  {!inspection.certificate_issued && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setIsCertificateModalOpen(true)}
                                    >
                                      <Shield className="h-4 w-4 mr-1" />
                                      Issue Cert
                                    </Button>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{inspection.batches?.product_name}</p>
                              <div className="flex items-center justify-between text-sm">
                                <span>Score: {inspection.quality_score || "N/A"}</span>
                                <span>
                                  Completed:{" "}
                                  {inspection.completed_date
                                    ? new Date(inspection.completed_date).toLocaleDateString()
                                    : "N/A"}
                                </span>
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          {/* Calendar & Quick Actions */}
          <div className="space-y-6">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Inspection Calendar</CardTitle>
                <CardDescription>View and manage your schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setIsInspectionModalOpen(true)}
                >
                  <FileCheck className="h-4 w-4 mr-2" />
                  Create Inspection Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setIsCertificateModalOpen(true)}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Issue Digital Certificate
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  View Schedule
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download Reports
                </Button>
              </CardContent>
            </Card>
            {/* Today's Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Inspections Completed</span>
                  <span className="font-medium">{stats.completed}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Certificates Issued</span>
                  <span className="font-medium">{stats.issued}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Pending Reviews</span>
                  <span className="font-medium">{stats.pending}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* Inspection Modal */}
      <InspectionModal
        open={isInspectionModalOpen}
        onOpenChange={setIsInspectionModalOpen}
        onInspectionCompleted={fetchInspections}
      />
      {/* Certificate Modal */}
      <CertificateModal
        open={isCertificateModalOpen}
        onOpenChange={setIsCertificateModalOpen}
        onCertificateIssued={fetchCertificates}
      />
    </div>
  );
};

export default QADashboard;
