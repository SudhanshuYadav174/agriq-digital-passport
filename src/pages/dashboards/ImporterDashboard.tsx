import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  QrCode, 
  Upload, 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  FileText,
  Download,
  Truck,
  Shield
} from "lucide-react";

const ImporterDashboard = () => {
  const [activeTab, setActiveTab] = useState("verify");
  const [qrInput, setQrInput] = useState("");
  const [verificationResult, setVerificationResult] = useState<any>(null);

  // Mock verification data
  const mockVerification = {
    id: "AGR-2024-001",
    status: "verified",
    product: "Premium Organic Rice",
    exporter: "Green Valley Farms",
    grade: "Premium A+",
    country: "India",
    certificationDate: "2024-12-15",
    expiryDate: "2024-12-15",
    qaAgency: "International Quality Assurance",
    batchSize: "25 tons",
    validUntil: "2025-06-15"
  };

  const recentVerifications = [
    { id: "AGR-2024-001", product: "Premium Organic Rice", status: "verified", date: "2024-12-15", exporter: "Green Valley Farms" },
    { id: "AGR-2024-002", product: "Basmati Rice Grade A", status: "verified", date: "2024-12-14", exporter: "Sunrise Agriculture" },
    { id: "AGR-2024-003", product: "Quinoa Organic", status: "expired", date: "2024-12-13", exporter: "Organic Harvest Co." },
    { id: "AGR-2024-004", product: "Wheat Premium", status: "revoked", date: "2024-12-12", exporter: "Golden Fields Ltd" }
  ];

  const handleVerification = () => {
    if (qrInput) {
      // Simulate verification process
      setTimeout(() => {
        setVerificationResult(mockVerification);
      }, 1000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-success text-success-foreground";
      case "expired": return "bg-warning text-warning-foreground";
      case "revoked": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return CheckCircle;
      case "expired": return AlertTriangle;
      case "revoked": return XCircle;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Importer/Customs Dashboard</h1>
          <p className="text-muted-foreground mt-1">Verify agricultural product certificates instantly</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="lg">
            <Download className="h-5 w-5 mr-2" />
            Export Reports
          </Button>
          <Button variant="agri" size="lg">
            <QrCode className="h-5 w-5 mr-2" />
            Quick Verify
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Verified Today</p>
                <p className="text-2xl font-bold text-foreground">24</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total This Month</p>
                <p className="text-2xl font-bold text-foreground">342</p>
              </div>
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Invalid/Expired</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-foreground">96.5%</p>
              </div>
              <Truck className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="verify">Certificate Verification</TabsTrigger>
          <TabsTrigger value="history">Verification History</TabsTrigger>
          <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="verify" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Verification Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <QrCode className="h-5 w-5 text-primary" />
                  <span>Certificate Verification</span>
                </CardTitle>
                <CardDescription>Scan QR code or enter certificate ID to verify authenticity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* QR Scanner Placeholder */}
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <QrCode className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-4">Position QR code within the frame</p>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload QR Image
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or enter manually</span>
                  </div>
                </div>

                {/* Manual Input */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="certificate-id">Certificate ID</Label>
                    <Input
                      id="certificate-id"
                      placeholder="e.g., AGR-2024-001"
                      value={qrInput}
                      onChange={(e) => setQrInput(e.target.value)}
                    />
                  </div>
                  <Button 
                    variant="agri" 
                    className="w-full" 
                    onClick={handleVerification}
                    disabled={!qrInput}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Verify Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Verification Result */}
            <Card>
              <CardHeader>
                <CardTitle>Verification Result</CardTitle>
                <CardDescription>Certificate details and validation status</CardDescription>
              </CardHeader>
              <CardContent>
                {verificationResult ? (
                  <div className="space-y-6">
                    {/* Status Badge */}
                    <div className="flex items-center justify-center">
                      <Badge className={`${getStatusColor(verificationResult.status)} text-lg px-4 py-2`}>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        VERIFIED CERTIFICATE
                      </Badge>
                    </div>

                    {/* Certificate Details */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Certificate ID</span>
                          <p className="font-medium">{verificationResult.id}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Product</span>
                          <p className="font-medium">{verificationResult.product}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Exporter</span>
                          <p className="font-medium">{verificationResult.exporter}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Quality Grade</span>
                          <p className="font-medium">{verificationResult.grade}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Origin Country</span>
                          <p className="font-medium">{verificationResult.country}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Batch Size</span>
                          <p className="font-medium">{verificationResult.batchSize}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Certified Date</span>
                          <p className="font-medium">{verificationResult.certificationDate}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Valid Until</span>
                          <p className="font-medium">{verificationResult.validUntil}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="text-sm text-muted-foreground mb-2">QA Agency</div>
                        <p className="font-medium">{verificationResult.qaAgency}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <FileText className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Shield className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Verification results will appear here</p>
                    <p className="text-sm mt-2">Scan a QR code or enter a certificate ID to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Recent Verifications</CardTitle>
              <CardDescription>History of certificate verifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentVerifications.map((verification) => {
                  const StatusIcon = getStatusIcon(verification.status);
                  return (
                    <div key={verification.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <StatusIcon className={`h-5 w-5 ${verification.status === 'verified' ? 'text-success' : verification.status === 'expired' ? 'text-warning' : 'text-destructive'}`} />
                        <div>
                          <div className="font-medium">{verification.product}</div>
                          <div className="text-sm text-muted-foreground">ID: {verification.id}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(verification.status)}>
                          {verification.status.charAt(0).toUpperCase() + verification.status.slice(1)}
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-1">{verification.date}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports & Analytics</CardTitle>
              <CardDescription>Verification statistics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Analytics dashboard coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImporterDashboard;