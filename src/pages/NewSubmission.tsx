import { useState } from "react";
import { SubmissionForm } from "@/components/forms/SubmissionForm";
import { ParticleBackground } from "@/components/ui/particle-background";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const NewSubmission = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmission = async (data: any) => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Create batch record in database
      const { data: batch, error } = await supabase
        .from('batches')
        .insert({
          user_id: user.id,
          batch_number: `BATCH-${Date.now()}`,
          product_name: data.productName,
          product_type: data.productCategory,
          quantity: parseFloat(data.quantity),
          unit: data.unit,
          origin_location: data.originCountry,
          description: data.description,
          status: 'submitted',
          harvest_date: new Date().toISOString(),
          processing_date: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      // Redirect to dashboard
      navigate('/dashboard/exporter');
    } catch (error) {
      console.error('Error creating submission:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8 relative">
      <ParticleBackground particleCount={30} speed={0.0001} />
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Create New Submission</h1>
          <p className="text-muted-foreground">
            Submit your agricultural product for quality certification
          </p>
        </div>
        
        <SubmissionForm 
          onSubmit={handleSubmission}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default NewSubmission;