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
import { FileCheck, Calendar, MapPin } from "lucide-react";

interface InspectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  batchId?: string;
  onInspectionCompleted: () => void;
}

const InspectionModal = ({ open, onOpenChange, batchId, onInspectionCompleted }: InspectionModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    action_type: 'inspect',
    location: '',
    scheduled_date: '',
    quality_score: '',
    notes: '',
    priority: 'medium',
    contact_person: '',
    test_results: {},
    status: 'in_progress'
  });
  const [batches, setBatches] = useState<any[]>([]);
  const [selectedBatch, setSelectedBatch] = useState(batchId || '');
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (open) {
      fetchBatches();
      if (batchId) {
        setSelectedBatch(batchId);
      }
    }
  }, [open, batchId]);

  const fetchBatches = async () => {
    try {
      const { data, error } = await supabase
        .from('batches')
        .select('*, profiles!batches_user_id_fkey(first_name, last_name, organization_name)')
        .eq('status', 'submitted')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBatches(data || []);
    } catch (error: any) {
      console.error('Error fetching batches:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedBatch) return;

    setLoading(true);
    try {
      // Create inspection action
      const inspectionData = {
        ...formData,
        batch_id: selectedBatch,
        inspector_id: user.id,
        scheduled_date: formData.scheduled_date ? new Date(formData.scheduled_date).toISOString() : null,
        quality_score: formData.quality_score ? parseInt(formData.quality_score) : null,
        test_results: formData.test_results || {}
      };

      const { error: inspectionError } = await supabase
        .from('inspection_actions')
        .insert([inspectionData]);

      if (inspectionError) throw inspectionError;

      // Update batch status
      const { error: batchError } = await supabase
        .from('batches')
        .update({ 
          status: formData.action_type === 'inspect' ? 'under_inspection' : 'scheduled_inspection',
          qa_agency_id: user.id,
          inspection_date: formData.scheduled_date ? new Date(formData.scheduled_date).toISOString() : null
        })
        .eq('id', selectedBatch);

      if (batchError) throw batchError;

      toast({
        title: "Inspection recorded successfully",
        description: `Inspection action has been logged for batch ${selectedBatch}`,
      });

      onInspectionCompleted();
      onOpenChange(false);
      setFormData({
        action_type: 'inspect',
        location: '',
        scheduled_date: '',
        quality_score: '',
        notes: '',
        priority: 'medium',
        contact_person: '',
        test_results: {},
        status: 'in_progress'
      });
      setSelectedBatch('');
    } catch (error: any) {
      console.error('Error creating inspection:', error);
      toast({
        title: "Error creating inspection",
        description: error.message || "Failed to create inspection. Please try again.",
        variant: "destructive",
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
            <FileCheck className="h-5 w-5 text-primary" />
            <span>Record Inspection Action</span>
          </DialogTitle>
          <DialogDescription>
            Create an inspection record for quality assessment
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="batch">Select Batch</Label>
              <Select value={selectedBatch} onValueChange={setSelectedBatch} required>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a batch to inspect" />
                </SelectTrigger>
                <SelectContent>
                  {batches.map((batch) => (
                    <SelectItem key={batch.id} value={batch.id}>
                      {batch.batch_number} - {batch.product_name}
                      <span className="text-xs text-muted-foreground ml-2">
                        ({batch.profiles?.organization_name})
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="action_type">Action Type</Label>
              <Select 
                value={formData.action_type} 
                onValueChange={(value) => setFormData({...formData, action_type: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="schedule">Schedule Inspection</SelectItem>
                  <SelectItem value="inspect">Conduct Inspection</SelectItem>
                  <SelectItem value="complete">Complete Inspection</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Inspection Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g., Warehouse, Farm, Processing Unit"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduled_date">Scheduled Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="scheduled_date"
                  type="datetime-local"
                  value={formData.scheduled_date}
                  onChange={(e) => setFormData({...formData, scheduled_date: e.target.value})}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={formData.priority} 
                onValueChange={(value) => setFormData({...formData, priority: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quality_score">Quality Score (0-100)</Label>
              <Input
                id="quality_score"
                type="number"
                min="0"
                max="100"
                value={formData.quality_score}
                onChange={(e) => setFormData({...formData, quality_score: e.target.value})}
                placeholder="85"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact_person">Contact Person</Label>
              <Input
                id="contact_person"
                value={formData.contact_person}
                onChange={(e) => setFormData({...formData, contact_person: e.target.value})}
                placeholder="Primary contact name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Inspection Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Detailed inspection observations, test results, recommendations..."
              rows={4}
            />
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
            <Button type="submit" disabled={loading || !selectedBatch}>
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Recording...</span>
                </div>
              ) : (
                <>
                  <FileCheck className="h-4 w-4 mr-2" />
                  Record Inspection
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InspectionModal;