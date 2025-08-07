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
    <div className="min-h-screen bg-background relative">
      <ParticleBackground particleCount={100} speed={0.0005} />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Create New Submission
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Submit your agricultural product batch for quality certification
          </p>
        </div>

        <div className="animate-slide-up">
          <SubmissionForm 
            onSubmit={handleSubmission}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default NewSubmission;