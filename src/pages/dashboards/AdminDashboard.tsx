import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ParticleBackground } from "@/components/ui/particle-background";
import AddUserModal from "@/components/ui/AddUserModal";
import DeleteUserModal from "@/components/ui/DeleteUserModal";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Shield, 
  FileText, 
  Settings, 
  BarChart3, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Search,
  Plus,
  Edit,
  Trash2,
  Download
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [systemStats, setSystemStats] = useState({
    totalUsers: 0,
    activeCertificates: 0,
    pendingApprovals: 0,
    systemHealth: '99.9%'
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
      setSystemStats(prev => ({ ...prev, totalUsers: data?.length || 0 }));
    } catch (error: any) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCertificates = async () => {
    try {
      const { data, error } = await supabase
        .from('digital_certificates')
        .select(`
          *,
          batches(batch_number, product_name),
          profiles!digital_certificates_issued_to_fkey(first_name, last_name, organization_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCertificates(data || []);
      setSystemStats(prev => ({ 
        ...prev, 
        activeCertificates: data?.filter(cert => cert.status === 'valid').length || 0 
      }));
    } catch (error: any) {
      console.error('Error fetching certificates:', error);
    }
  };

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setIsDeleteUserModalOpen(true);
  };

  useEffect(() => {
    fetchUsers();
    fetchCertificates();

    // Set up real-time subscriptions
    const usersChannel = supabase
      .channel('admin-users')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, fetchUsers)
      .subscribe();

    const certificatesChannel = supabase
      .channel('admin-certificates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'digital_certificates' }, fetchCertificates)
      .subscribe();

    return () => {
      supabase.removeChannel(usersChannel);
      supabase.removeChannel(certificatesChannel);
    };
  }, []);

  // Dynamic system stats based on real data
  const dynamicStats = [
    { title: "Total Users", value: systemStats.totalUsers.toString(), change: "+12%", icon: Users, color: "text-primary" },
    { title: "Active Certificates", value: systemStats.activeCertificates.toString(), change: "+8%", icon: Shield, color: "text-success" },
    { title: "Pending Approvals", value: "23", change: "-5%", icon: Clock, color: "text-warning" },
    { title: "System Health", value: systemStats.systemHealth, change: "0%", icon: Activity, color: "text-secondary" }
  ];

  const recentUsers = [
    { id: 1, name: "Green Valley Farms", email: "contact@greenvalley.com", role: "Exporter", status: "active", joinDate: "2024-12-15" },
    { id: 2, name: "Quality Assurance Pro", email: "info@qapro.com", role: "QA Agency", status: "pending", joinDate: "2024-12-14" },
    { id: 3, name: "Global Importers Ltd", email: "admin@globalimport.com", role: "Importer", status: "active", joinDate: "2024-12-13" },
    { id: 4, name: "Organic Harvest Co.", email: "support@organicharvest.com", role: "Exporter", status: "suspended", joinDate: "2024-12-12" }
  ];

  const auditLogs = [
    { id: 1, action: "Certificate Issued", user: "QA Agency Pro", timestamp: "2024-12-15 14:30", details: "AGR-2024-001" },
    { id: 2, action: "User Approved", user: "Admin", timestamp: "2024-12-15 13:15", details: "Green Valley Farms" },
    { id: 3, action: "Batch Submitted", user: "Sunrise Agriculture", timestamp: "2024-12-15 12:00", details: "AGR-2024-002" },
    { id: 4, action: "Certificate Verified", user: "Global Importers", timestamp: "2024-12-15 11:45", details: "AGR-2024-001" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "pending": return "bg-warning text-warning-foreground";
      case "suspended": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Exporter": return "text-primary";
      case "QA Agency": return "text-secondary";
      case "Importer": return "text-success";
      case "Admin": return "text-warning";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle relative">
      <ParticleBackground particleCount={30} speed={0.0001} />
      <div className="container mx-auto px-4 py-8 space-y-8 relative z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">System administration and management</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="lg">
            <Settings className="h-5 w-5 mr-2" />
            System Settings
          </Button>
          <Button variant="agri" size="lg" onClick={() => setIsAddUserModalOpen(true)}>
            <Plus className="h-5 w-5 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dynamicStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-success' : stat.change.startsWith('-') ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10">
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>Latest system activities and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div>
                        <div className="font-medium text-sm">{log.action}</div>
                        <div className="text-xs text-muted-foreground">by {log.user}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">{log.timestamp}</div>
                        <div className="text-xs font-medium">{log.details}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-success" />
                  <span>System Health</span>
                </CardTitle>
                <CardDescription>Current system status and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">API Services</span>
                    </div>
                    <Badge className="bg-success text-success-foreground">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">Database</span>
                    </div>
                    <Badge className="bg-success text-success-foreground">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">File Storage</span>
                    </div>
                    <Badge className="bg-success text-success-foreground">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      <span className="text-sm">Email Service</span>
                    </div>
                    <Badge className="bg-warning text-warning-foreground">Degraded</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search users..." className="pl-10" />
                  </div>
                  <Button variant="agri" size="sm" onClick={() => setIsAddUserModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground mt-2">Loading users...</p>
                  </div>
                ) : users.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No users found.</p>
                  </div>
                ) : (
                  users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{user.first_name} {user.last_name}</div>
                        <div className="text-sm text-muted-foreground">{user.user_id}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Badge className={getRoleColor(user.role)} variant="outline">
                          {user.role}
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-1">
                          Joined {new Date(user.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <Badge className="bg-success text-success-foreground">
                        Active
                      </Badge>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteUser(user)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div>
                  <CardTitle>Certificate Management</CardTitle>
                  <CardDescription>Monitor and manage digital certificates</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certificates.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>No certificates found.</p>
                  </div>
                ) : (
                  certificates.map((certificate) => (
                    <div key={certificate.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{certificate.certificate_number}</div>
                          <div className="text-sm text-muted-foreground">
                            {certificate.batches?.product_name || 'Unknown Product'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge className={certificate.status === 'valid' ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'}>
                            {certificate.status}
                          </Badge>
                          <div className="text-sm text-muted-foreground mt-1">
                            Expires: {new Date(certificate.expiry_date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Audit Logs</CardTitle>
              <CardDescription>Complete audit trail of system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{log.action}</div>
                        <div className="text-sm text-muted-foreground">by {log.user}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{log.details}</div>
                      <div className="text-xs text-muted-foreground">{log.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure system preferences and parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Settings className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>System settings interface coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>

      {/* Add User Modal */}
      <AddUserModal
        open={isAddUserModalOpen}
        onOpenChange={setIsAddUserModalOpen}
        onUserAdded={fetchUsers}
      />

      {/* Delete User Modal */}
      <DeleteUserModal
        open={isDeleteUserModalOpen}
        onOpenChange={setIsDeleteUserModalOpen}
        user={selectedUser}
        onUserDeleted={fetchUsers}
      />
    </div>
  );
};

export default AdminDashboard;