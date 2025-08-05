import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  QrCode, 
  Upload, 
  Search, 
  CheckCircle, 
  Shield,
  FileText,
  Download,
  AlertTriangle,
  XCircle
} from "lucide-react";

const VerifyCertificate = () => {
  const [certificateId, setCertificateId] = useState("");
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Mock verification data
  const mockResults = {
    "AGR-2024-001": {
      status: "verified",
      id: "AGR-2024-001",
      product: "Premium Organic Rice",
      exporter: "Green Valley Farms",
      grade: "Premium A+",
      country: "India",
      certificationDate: "2024-12-15",
      qaAgency: "International Quality Assurance",
      batchSize: "25 tons",
      validUntil: "2025-06-15",
      blockchainHash: "0x7d8a9e2f3c4b5a6e1d9f8e7c2b1a3d4e5f6a7b8c9d0e1f2g3h4i5j6k7l8m9n0p",
      verifications: 47
    },
    "AGR-2024-002": {
      status: "expired",
      id: "AGR-2024-002",
      product: "Basmati Rice Grade A",
      exporter: "Sunrise Agriculture",
      grade: "Grade A",
      country: "India",
      certificationDate: "2024-06-15",
      qaAgency: "Quality Assurance Pro",
      batchSize: "50 tons",
      validUntil: "2024-12-15",
      blockchainHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f",
      verifications: 23
    },
    "AGR-2024-003": {
      status: "revoked",
      id: "AGR-2024-003",
      product: "Wheat Premium",
      exporter: "Golden Fields Ltd",
      grade: "Premium",
      country: "Canada",
      certificationDate: "2024-11-01",
      qaAgency: "North American QA",
      batchSize: "75 tons",
      validUntil: "2025-05-01",
      blockchainHash: "0x9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g9f8e7d6c5b4a3z2y1x0w9v8u",
      verifications: 12,
      revokedReason: "Quality issues detected during spot check"
    }
  };

  const handleVerification = async () => {
    if (!certificateId) return;
    
    setIsVerifying(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = mockResults[certificateId as keyof typeof mockResults];
      setVerificationResult(result || { status: "not_found" });
      setIsVerifying(false);
    }, 1500);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "verified":
        return {
          color: "bg-success text-success-foreground",
          icon: CheckCircle,
          title: "VERIFIED CERTIFICATE",
          description: "This certificate is valid and authentic"
        };
      case "expired":
        return {
          color: "bg-warning text-warning-foreground",
          icon: AlertTriangle,
          title: "EXPIRED CERTIFICATE",
          description: "This certificate has expired"
        };
      case "revoked":
        return {
          color: "bg-destructive text-destructive-foreground",
          icon: XCircle,
          title: "REVOKED CERTIFICATE",
          description: "This certificate has been revoked"
        };
      case "not_found":
        return {
          color: "bg-muted text-muted-foreground",
          icon: XCircle,
          title: "CERTIFICATE NOT FOUND",
          description: "No certificate found with this ID"
        };
      default:
        return {
          color: "bg-muted text-muted-foreground",
          icon: AlertTriangle,
          title: "UNKNOWN STATUS",
          description: "Unable to verify certificate status"
        };
    }
  };

  const statusConfig = verificationResult ? getStatusConfig(verificationResult.status) : null;
  const StatusIcon = statusConfig?.icon;

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Certificate Verification
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Verify Agricultural Quality Certificate
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Instantly verify the authenticity and validity of agricultural product certificates 
            using QR codes or certificate IDs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Verification Input */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <QrCode className="h-5 w-5 text-primary" />
                <span>Certificate Verification</span>
              </CardTitle>
              <CardDescription>
                Scan QR code or enter certificate ID to verify authenticity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Scanner Section */}
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <QrCode className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-medium mb-2">Scan QR Code</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Position the QR code within your camera frame
                </p>
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
                  <span className="bg-background px-2 text-muted-foreground">
                    Or enter manually
                  </span>
                </div>
              </div>

              {/* Manual Input */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="certificate-id">Certificate ID</Label>
                  <Input
                    id="certificate-id"
                    placeholder="e.g., AGR-2024-001"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Try: AGR-2024-001 (valid), AGR-2024-002 (expired), or AGR-2024-003 (revoked)
                  </p>
                </div>
                <Button 
                  variant="agri" 
                  className="w-full" 
                  onClick={handleVerification}
                  disabled={!certificateId || isVerifying}
                >
                  {isVerifying ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Verify Certificate
                    </>
                  )}
                </Button>
              </div>

              {/* Security Note */}
              <div className="bg-primary/10 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium text-foreground mb-1">Blockchain Verified</div>
                    <div className="text-muted-foreground">
                      All certificates are secured with blockchain technology and cannot be forged or altered.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification Result */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Verification Result</CardTitle>
              <CardDescription>Certificate details and validation status</CardDescription>
            </CardHeader>
            <CardContent>
              {verificationResult ? (
                <div className="space-y-6">
                  {/* Status Badge */}
                  <div className="flex items-center justify-center">
                    <Badge className={`${statusConfig?.color} text-lg px-4 py-2`}>
                      {StatusIcon && <StatusIcon className="h-5 w-5 mr-2" />}
                      {statusConfig?.title}
                    </Badge>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">{statusConfig?.description}</p>
                  </div>

                  {verificationResult.status !== "not_found" && (
                    <div className="space-y-4">
                      {/* Certificate Details */}
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

                      <div className="pt-4 border-t space-y-3">
                        <div>
                          <span className="text-sm text-muted-foreground">QA Agency</span>
                          <p className="font-medium">{verificationResult.qaAgency}</p>
                        </div>
                        
                        <div>
                          <span className="text-sm text-muted-foreground">Blockchain Hash</span>
                          <p className="font-mono text-xs text-muted-foreground break-all">
                            {verificationResult.blockchainHash}
                          </p>
                        </div>

                        <div>
                          <span className="text-sm text-muted-foreground">Total Verifications</span>
                          <p className="font-medium">{verificationResult.verifications}</p>
                        </div>

                        {verificationResult.status === "revoked" && verificationResult.revokedReason && (
                          <div className="bg-destructive/10 rounded-lg p-3">
                            <span className="text-sm font-medium text-destructive">Revocation Reason:</span>
                            <p className="text-sm text-destructive mt-1">{verificationResult.revokedReason}</p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      {verificationResult.status === "verified" && (
                        <div className="flex space-x-3">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <FileText className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Shield className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="font-medium mb-2">Ready to Verify</h3>
                  <p className="text-sm">
                    Scan a QR code or enter a certificate ID to get started
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-12 shadow-medium">
          <CardHeader>
            <CardTitle>How Certificate Verification Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <QrCode className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">1. Scan or Enter ID</h3>
                <p className="text-sm text-muted-foreground">
                  Use your device camera to scan the QR code or manually enter the certificate ID
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-medium mb-2">2. Blockchain Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Our system verifies the certificate against the immutable blockchain record
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <h3 className="font-medium mb-2">3. Instant Results</h3>
                <p className="text-sm text-muted-foreground">
                  Get immediate verification results with complete certificate details
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyCertificate;