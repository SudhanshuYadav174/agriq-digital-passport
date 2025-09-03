-- Create missing functionality tables

-- Create inspections table if not exists (enhanced version)
CREATE TABLE IF NOT EXISTS public.inspection_actions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  batch_id UUID REFERENCES public.batches(id),
  inspector_id UUID NOT NULL,
  action_type TEXT NOT NULL CHECK (action_type IN ('schedule', 'inspect', 'complete')),
  scheduled_date TIMESTAMP WITH TIME ZONE,
  completed_date TIMESTAMP WITH TIME ZONE,
  quality_score INTEGER CHECK (quality_score >= 0 AND quality_score <= 100),
  test_results JSONB,
  location TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'in_progress', 'completed', 'cancelled')),
  notes TEXT,
  photos TEXT[],
  certificate_issued BOOLEAN DEFAULT false,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  contact_person TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for inspection_actions
ALTER TABLE public.inspection_actions ENABLE ROW LEVEL SECURITY;

-- RLS policies for inspection_actions
CREATE POLICY "QA agencies can manage their inspections" 
ON public.inspection_actions 
FOR ALL 
USING (auth.uid() = inspector_id);

CREATE POLICY "Batch owners can view their inspections" 
ON public.inspection_actions 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.batches 
  WHERE batches.id = inspection_actions.batch_id 
  AND batches.user_id = auth.uid()
));

-- Create digital_certificates table for enhanced certificate management
CREATE TABLE IF NOT EXISTS public.digital_certificates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  certificate_number TEXT UNIQUE NOT NULL,
  batch_id UUID REFERENCES public.batches(id),
  inspection_id UUID REFERENCES public.inspection_actions(id),
  issued_by UUID NOT NULL,
  issued_to UUID NOT NULL,
  issue_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expiry_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'valid' CHECK (status IN ('valid', 'expired', 'revoked')),
  qr_code TEXT NOT NULL,
  digital_signature TEXT,
  certificate_hash TEXT,
  verification_url TEXT,
  certificate_data JSONB NOT NULL,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for digital_certificates
ALTER TABLE public.digital_certificates ENABLE ROW LEVEL SECURITY;

-- RLS policies for digital_certificates
CREATE POLICY "Anyone can view valid certificates for verification" 
ON public.digital_certificates 
FOR SELECT 
USING (status = 'valid');

CREATE POLICY "QA agencies can manage certificates they issue" 
ON public.digital_certificates 
FOR ALL 
USING (auth.uid() = issued_by);

CREATE POLICY "Certificate owners can view their certificates" 
ON public.digital_certificates 
FOR SELECT 
USING (auth.uid() = issued_to);

-- Create verification_logs table for tracking verifications
CREATE TABLE IF NOT EXISTS public.verification_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  certificate_id UUID REFERENCES public.digital_certificates(id),
  verifier_id UUID,
  verification_method TEXT NOT NULL CHECK (verification_method IN ('qr_scan', 'manual_id', 'api')),
  ip_address TEXT,
  user_agent TEXT,
  verification_status TEXT NOT NULL CHECK (verification_status IN ('valid', 'invalid', 'expired', 'revoked')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for verification_logs
ALTER TABLE public.verification_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies for verification_logs
CREATE POLICY "Anyone can insert verification logs" 
ON public.verification_logs 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view all verification logs" 
ON public.verification_logs 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = 'admin'
));

-- Create function to update updated_at columns
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for updated_at
CREATE TRIGGER trigger_inspection_actions_updated_at
  BEFORE UPDATE ON public.inspection_actions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_digital_certificates_updated_at
  BEFORE UPDATE ON public.digital_certificates
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create function to generate certificate numbers
CREATE OR REPLACE FUNCTION public.generate_certificate_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'AGR-' || TO_CHAR(now(), 'YYYY') || '-' || LPAD(nextval('certificate_number_seq')::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create sequence for certificate numbers
CREATE SEQUENCE IF NOT EXISTS certificate_number_seq START 1;