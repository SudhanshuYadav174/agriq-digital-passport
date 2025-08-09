import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { ParticleBackground } from "@/components/ui/particle-background";
import { 
  Shield, 
  Calendar as CalendarIcon, 
  FileCheck, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  MapPin,
  User,
  Building
} from "lucide-react";

const QADashboard = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock data
  const stats = [
    { title: "Pending Inspections", value: "12", color: "text-warning", bg: "bg-warning/10" },
    { title: "Completed Today", value: "5", color: "text-success", bg: "bg-success/10" },
    { title: "Scheduled This Week", value: "18", color: "text-secondary", bg: "bg-secondary/10" },
    { title: "Certificates Issued", value: "342", color: "text-primary", bg: "bg-primary/10" }
  ];

  const pendingInspections = [
    {
      id: "AGR-2024-001",
      exporter: "Green Valley Farms",
      product: "Premium Organic Rice",
      location: "Punjab, India",
      scheduledDate: "2024-12-16",
      priority: "high",
      contact: "Rajesh Kumar"
    },
    {
      id: "AGR-2024-002",
      exporter: "Sunrise Agriculture",
      product: "Basmati Rice Grade A",
      location: "Haryana, India",
      scheduledDate: "2024-12-17",
      priority: "medium",
      contact: "Priya Sharma"
    },
    {
      id: "AGR-2024-003",
      exporter: "Organic Harvest Co.",
      product: "Quinoa Organic",
      location: "Rajasthan, India",
      scheduledDate: "2024-12-18",
      priority: "low",
      contact: "Amit Patel"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
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
          <Button variant="outline" size="lg">
            <CalendarIcon className="h-5 w-5 mr-2" />
            Schedule Inspection
          </Button>
          <Button variant="agri" size="lg">
            <FileCheck className="h-5 w-5 mr-2" />
            Issue Certificate
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
                    {pendingInspections.map((inspection) => (
                      <div key={inspection.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Badge className={getPriorityColor(inspection.priority)}>
                              {inspection.priority.toUpperCase()}
                            </Badge>
                            <span className="font-medium text-foreground">{inspection.id}</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              Schedule
                            </Button>
                            <Button variant="agri" size="sm">
                              <FileCheck className="h-4 w-4 mr-1" />
                              Inspect
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Building className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{inspection.exporter}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{inspection.contact}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="font-medium text-foreground">{inspection.product}</div>
                            <div className="flex items-center space-x-2 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{inspection.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No scheduled inspections for today.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completed">
              <Card>
                <CardHeader>
                  <CardTitle>Completed Inspections</CardTitle>
                  <CardDescription>Recently completed inspection reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Completed inspections will appear here.</p>
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
              <Button variant="outline" className="w-full justify-start">
                <FileCheck className="h-4 w-4 mr-2" />
                Create Inspection Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Issue Digital Certificate
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CalendarIcon className="h-4 w-4 mr-2" />
                View Schedule
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report Issue
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
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Certificates Issued</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Pending Reviews</span>
                <span className="font-medium">2</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>
  );
};

export default QADashboard;