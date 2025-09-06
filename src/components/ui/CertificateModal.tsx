import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Shield, Download, QrCode } from "lucide-react";

interface CertificateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inspectionId?: string;
  onCertificateIssued: () => void;
}

const CertificateModal = ({ open, onOpenChange, inspectionId, onCertificateIssued }: CertificateModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    expiry_date: '',
    grade: 'A',
    test_results: '',
    special_conditions: '',
    validity_period: '180'
  });
  const [inspections, setInspections] = useState<any[]>([]);
  const [selectedInspection, setSelectedInspection] = useState(inspectionId || '');
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (open) {
      fetchCompletedInspections();
      if (inspectionId) {
        setSelectedInspection(inspectionId);
      }
      // Set default expiry date (6 months from now)
      const defaultExpiry = new Date();
      defaultExpiry.setMonth(defaultExpiry.getMonth() + 6);
      setFormData(prev => ({
        ...prev,
        expiry_date: defaultExpiry.toISOString().split('T')[0]
      }));
    }
  }, [open, inspectionId]);

  const fetchCompletedInspections = async () => {
    if (!user?.id) {
      console.log('No user ID available for fetching inspections');
      return;
    }
    
    console.log('Fetching completed inspections for user:', user.id);
    
    try {
      const { data, error } = await supabase
        .from('inspection_actions')
        .select(`
          *,
          batches!inner(
            id, batch_number, product_name, user_id
          )
        `)
        .eq('inspector_id', user?.id)
        .eq('status', 'completed')
        .eq('certificate_issued', false)
        .order('completed_date', { ascending: false });

      console.log('Inspections query result:', { data, error });
      
      if (error) throw error;
      setInspections(data || []);
      
      // Don't create sample data - let user know no inspections available
    } catch (error: any) {
      console.error('Error fetching inspections:', error);
      // No sample data - show empty state
    }
  };

  const generateCertificateNumber = async () => {
    try {
      const { data, error } = await supabase.rpc('generate_certificate_number');
      if (error) throw error;
      return data;
    } catch (error) {
      // Fallback if function doesn't work
      const timestamp = Date.now();
      return `AGR-${new Date().getFullYear()}-${String(timestamp).slice(-6)}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Certificate form submission:', { user: !!user, selectedInspection, formData });
    
    if (!user) {
      toast({
        title: "Authentication error",
        description: "You must be logged in to issue certificates.",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedInspection) {
      toast({
        title: "Selection required",
        description: "Please select a completed inspection to issue a certificate for.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Fetching inspection details for:', selectedInspection);
      
      // Get inspection details
      const { data: inspection, error: inspectionError } = await supabase
        .from('inspection_actions')
        .select(`
          *,
          batches!inner(
            id, batch_number, product_name, user_id
          )
        `)
        .eq('id', selectedInspection)
        .single();

      if (inspectionError) {
        console.error('Inspection fetch error:', inspectionError);
        throw inspectionError;
      }
      
      console.log('Inspection data:', inspection);

      // Generate certificate number and QR code
      const certificateNumber = await generateCertificateNumber();
      const qrCode = `${window.location.origin}/verify?id=${certificateNumber}`;
      
      console.log('Generated certificate number:', certificateNumber);

      // Prepare certificate data
      const certificateData = {
        certificate_number: certificateNumber,
        batch_id: inspection.batch_id,
        inspection_id: selectedInspection,
        issued_by: user.id,
        issued_to: inspection.batches.user_id,
        expiry_date: formData.expiry_date,
        status: 'valid',
        qr_code: qrCode,
        certificate_data: {
          quality_grade: formData.grade,
          test_results: formData.test_results,
          special_conditions: formData.special_conditions,
          validity_period_days: parseInt(formData.validity_period),
          issued_date: new Date().toISOString(),
          batch_number: inspection.batches.batch_number,
          product_name: inspection.batches.product_name,
          quality_score: inspection.quality_score,
          inspection_date: inspection.completed_date
        },
        verification_url: qrCode
      };

      // Insert the certificate
      const { data: certificate, error: certificateError } = await supabase
        .from('digital_certificates')
        .insert(certificateData)
        .select()
        .single();

      if (certificateError) throw certificateError;

      // Update inspection to mark certificate as issued
      const { error: updateError } = await supabase
        .from('inspection_actions')
        .update({ certificate_issued: true })
        .eq('id', selectedInspection);

      if (updateError) throw updateError;

      // Update batch status
      const { error: batchError } = await supabase
        .from('batches')
        .update({ 
          status: 'certified',
          certificate_id: certificate.id  // Use the UUID from certificate, not the certificate number
        })
        .eq('id', inspection.batch_id);

      if (batchError) throw batchError;

      toast({
        title: "Certificate issued successfully!",
        description: `Certificate ${certificateNumber} has been created and is ready for download.`,
      });

      onCertificateIssued();
      onOpenChange(false);
      
      // Reset form
      setFormData({
        expiry_date: '',
        grade: 'A',
        test_results: '',
        special_conditions: '',
        validity_period: '180'
      });
      setSelectedInspection('');

    } catch (error: any) {
      console.error('Error issuing certificate:', error);
      toast({
        title: "Failed to issue certificate",
        description: error.message || "There was an error creating the certificate.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Issue Digital Certificate</span>
          </DialogTitle>
          <DialogDescription>
            Create a digital quality certificate for completed inspection
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="inspection">Select Completed Inspection</Label>
            <Select value={selectedInspection} onValueChange={setSelectedInspection} required>
              <SelectTrigger>
                <SelectValue placeholder="Choose a completed inspection" />
              </SelectTrigger>
              <SelectContent>
                {inspections.length === 0 ? (
                  <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    No completed inspections available
                  </div>
                ) : (
                  inspections.map((inspection) => (
                    <SelectItem key={inspection.id} value={inspection.id}>
                      {inspection.batches.batch_number} - {inspection.batches.product_name}
                      <span className="text-xs text-muted-foreground ml-2">
                        (Score: {inspection.quality_score || 'N/A'})
                      </span>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="grade">Quality Grade</Label>
              <Select 
                value={formData.grade} 
                onValueChange={(value) => setFormData({...formData, grade: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">Premium A+</SelectItem>
                  <SelectItem value="A">Grade A</SelectItem>
                  <SelectItem value="B+">Grade B+</SelectItem>
                  <SelectItem value="B">Grade B</SelectItem>
                  <SelectItem value="C">Grade C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="validity_period">Validity Period (Days)</Label>
              <Input
                id="validity_period"
                type="number"
                min="30"
                max="365"
                value={formData.validity_period}
                onChange={(e) => setFormData({...formData, validity_period: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiry_date">Expiry Date</Label>
              <Input
                id="expiry_date"
                type="date"
                value={formData.expiry_date}
                onChange={(e) => setFormData({...formData, expiry_date: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="test_results">Test Results Summary</Label>
            <Textarea
              id="test_results"
              value={formData.test_results}
              onChange={(e) => setFormData({...formData, test_results: e.target.value})}
              placeholder="Summary of quality tests performed and results..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="special_conditions">Special Conditions/Notes</Label>
            <Textarea
              id="special_conditions"
              value={formData.special_conditions}
              onChange={(e) => setFormData({...formData, special_conditions: e.target.value})}
              placeholder="Any special handling, storage, or shipping conditions..."
              rows={2}
            />
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex items-center space-x-2 text-sm font-medium">
              <QrCode className="h-4 w-4" />
              <span>Certificate Features</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Unique certificate number and QR code</li>
              <li>• Digital signature for authenticity</li>
              <li>• Blockchain verification (coming soon)</li>
              <li>• Downloadable PDF format</li>
            </ul>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !selectedInspection}>
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Issuing...</span>
                </div>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Issue Certificate
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateModal;