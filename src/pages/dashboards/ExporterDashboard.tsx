import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Download, 
  Plus, 
  Package, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  BarChart3,
  TrendingUp
} from "lucide-react";

const ExporterDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const stats = [
    { title: "Total Batches", value: "156", change: "+12%", icon: Package, color: "text-primary" },
    { title: "Pending Certification", value: "23", change: "+3%", icon: Clock, color: "text-warning" },
    { title: "Certified Batches", value: "98", change: "+18%", icon: CheckCircle, color: "text-success" },
    { title: "Export Value", value: "$2.4M", change: "+25%", icon: TrendingUp, color: "text-secondary" }
  ];

  const recentBatches = [
    { id: "AGR-2024-001", product: "Premium Organic Rice", status: "certified", date: "2024-12-15", progress: 100 },
    { id: "AGR-2024-002", product: "Basmati Rice Grade A", status: "inspection", date: "2024-12-14", progress: 75 },
    { id: "AGR-2024-003", product: "Quinoa Organic", status: "submitted", date: "2024-12-13", progress: 25 },
    { id: "AGR-2024-004", product: "Wheat Premium", status: "pending", date: "2024-12-12", progress: 0 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "certified": return "bg-success text-success-foreground";
      case "inspection": return "bg-warning text-warning-foreground";
      case "submitted": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "certified": return CheckCircle;
      case "inspection": return Clock;
      case "submitted": return Upload;
      default: return AlertCircle;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Exporter Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your agricultural product certifications</p>
        </div>
        <Button variant="agri" size="lg" className="group">
          <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform" />
          Submit New Batch
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
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>Insights into your certification performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Analytics dashboard coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExporterDashboard;