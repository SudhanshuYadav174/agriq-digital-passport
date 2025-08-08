import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Batch {
  id: string;
  batch_number: string;
  product_name: string;
  product_type: string;
  status: string;
  created_at: string;
  quantity: number;
  unit: string;
  harvest_date: string;
}

export const useBatches = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchBatches = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('batches')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBatches(data || []);
    } catch (error: any) {
      console.error('Error fetching batches:', error);
      toast({
        title: "Error fetching batches",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createBatch = async (batchData: any) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('batches')
        .insert([{
          ...batchData,
          user_id: user.id,
          origin_location: batchData.origin_location || 'Not specified',
        }])
        .select()
        .single();

      if (error) throw error;

      setBatches(prev => [data, ...prev]);
      toast({
        title: "Batch created successfully",
        description: `Batch ${data.batch_number} has been submitted for certification.`,
      });

      return data;
    } catch (error: any) {
      console.error('Error creating batch:', error);
      toast({
        title: "Error creating batch",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  useEffect(() => {
    fetchBatches();
  }, [user]);

  // Set up real-time subscription for batch updates
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('batch-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'batches',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Batch change received:', payload);
          
          if (payload.eventType === 'INSERT') {
            setBatches(prev => [payload.new as Batch, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setBatches(prev => 
              prev.map(batch => 
                batch.id === payload.new.id ? payload.new as Batch : batch
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setBatches(prev => 
              prev.filter(batch => batch.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    batches,
    loading,
    createBatch,
    refreshBatches: fetchBatches,
  };
};