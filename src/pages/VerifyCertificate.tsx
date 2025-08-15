﻿import { useState`r`nimport { getPassportActor } from "@/integrations/ic/agent"; } from "react";
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
  XCircle,
  Calendar,
  Building,
  MapPin
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ParticleBackground } from "@/components/ui/particle-background";

const VerifyCertificate = () => {
  const [certificateId, setCertificateId] = useState("");
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const handleVerification = async () => {
    if (!certificateId.trim()) return;
    
    setIsVerifying(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('verify-certificate', {
        method: 'GET',
        body: undefined,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (error) throw error;

      setVerificationResult(data);\n      // ICP verification fallback (on-chain cross-check)\n      try { const actor = await getPassportActor(); const icResult = await actor.verify(certificateId); if (icResult && icResult.certificate && icResult.certificate.length) { const c = icResult.certificate[0]; setVerificationResult({ valid: icResult.valid, certificateNumber: certificateId, status: icResult.status, batch: { product_name: c.productName, batch_number: c.batchNumber, origin_location: c.origin, profiles: { organization_name: c.issuer, country: "" } }, issuedDate: new Date(Number(c.issuedAt)).toISOString(), expiryDate: new Date(Number(c.expiresAt)).toISOString(), error: icResult.reason && icResult.reason.length ? icResult.reason[0] : null }); } } catch (e) { console.warn("ICP verification fallback failed", e); }
      
      if (data.valid) {
        toast({
          title: "Certificate Verified âœ“",
          description: "This certificate is valid and authentic.",
        });
      } else {
        toast({
          title: "Verification Failed",
          description: data.error || "Certificate is not valid.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Verification error:', error);
      
      // For demo purposes, show mock data if API fails
      const mockResult = {
        valid: certificateId === "AGR-2024-001",
        certificateNumber: certificateId,
        batch: {
          product_name: "Premium Organic Rice",
          batch_number: "BAT-2024-001",
          origin_location: "Punjab, India",
          profiles: {
            organization_name: "Green Valley Farms",
            country: "India"
          }
        },
        issuedDate: "2024-01-15T00:00:00Z",
        expiryDate: "2025-01-15T00:00:00Z",
        status: certificateId === "AGR-2024-001" ? "valid" : "invalid",
        error: certificateId !== "AGR-2024-001" ? "Certificate not found" : null
      };
      
      setVerificationResult(mockResult);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleQRScan = () => {
    toast({
      title: "QR Scanner",
      description: "QR scanner would open here in a real implementation.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid": return "bg-success/10 text-success border-success/20";
      case "expired": return "bg-warning/10 text-warning border-warning/20";
      case "revoked": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid": return <CheckCircle className="h-5 w-5" />;
      case "expired": return <AlertTriangle className="h-5 w-5" />;
      case "revoked": return <XCircle className="h-5 w-5" />;
      default: return <XCircle className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-12 relative">
      <ParticleBackground particleCount={50} speed={0.0002} />
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Certificate Verification</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Instantly verify the authenticity and validity of agricultural quality certificates using our blockchain-powered verification system.
          </p>
        </div>

        {/* Verification Input */}
        <Card className="mb-8 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Verify Certificate</span>
            </CardTitle>
            <CardDescription>
              Enter a certificate number or scan a QR code to verify authenticity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="certificate-id">Certificate Number</Label>
                <Input
                  id="certificate-id"
                  placeholder="Enter certificate number (e.g., AGR-2024-001)"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleVerification()}
                />
              </div>
              <div className="flex gap-2 items-end">
                <Button 
                  onClick={handleVerification}
                  disabled={!certificateId.trim() || isVerifying}
                  className="min-w-[120px]"
                  variant="default"
                >
                  {isVerifying ? "Verifying..." : "Verify"}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleQRScan}
                  title="Scan QR Code"
                >
                  <QrCode className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Demo certificates */}
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-2">Try these demo certificates:</p>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setCertificateId("AGR-2024-001")}
                  className="text-xs"
                >
                  AGR-2024-001 (Valid)
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setCertificateId("AGR-2024-002")}
                  className="text-xs"
                >
                  AGR-2024-002 (Invalid)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Results */}
        {verificationResult && (
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  {getStatusIcon(verificationResult.status)}
                  <span>Verification Result</span>
                </CardTitle>
                <Badge className={getStatusColor(verificationResult.status)}>
                  {verificationResult.valid ? "VERIFIED" : "INVALID"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Certificate Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Certificate Number</p>
                    <p className="font-mono font-medium">{verificationResult.certificateNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-medium capitalize">{verificationResult.status}</p>
                  </div>
                </div>

                {verificationResult.valid ? (
                  <div className="space-y-6">
                    {/* Product Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Product</p>
                            <p className="font-medium">{verificationResult.batch?.product_name || 'N/A'}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Building className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Organization</p>
                            <p className="font-medium">{verificationResult.batch?.profiles?.organization_name || 'N/A'}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Origin</p>
                            <p className="font-medium">{verificationResult.batch?.origin_location || 'N/A'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Issue Date</p>
                            <p className="font-medium">{new Date(verificationResult.issuedDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Expiry Date</p>
                            <p className="font-medium">{new Date(verificationResult.expiryDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-success/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">Batch Number</p>
                          <p className="text-lg font-bold text-success">{verificationResult.batch?.batch_number || 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Certificate
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Certificate Invalid</h3>
                    <p className="text-muted-foreground">
                      {verificationResult.error || "This certificate could not be verified."}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="text-center p-6">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Blockchain Secured</h3>
            <p className="text-sm text-muted-foreground">
              All certificates are secured using blockchain technology for tamper-proof verification.
            </p>
          </Card>
          
          <Card className="text-center p-6">
            <QrCode className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">QR Code Ready</h3>
            <p className="text-sm text-muted-foreground">
              Quick verification using QR codes for mobile and offline verification.
            </p>
          </Card>
          
          <Card className="text-center p-6">
            <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Instant Results</h3>
            <p className="text-sm text-muted-foreground">
              Get verification results instantly with detailed certificate information.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerifyCertificate;
