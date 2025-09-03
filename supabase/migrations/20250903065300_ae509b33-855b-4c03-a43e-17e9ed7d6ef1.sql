-- Fix function search paths and add missing indexes for better performance
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';

CREATE OR REPLACE FUNCTION public.generate_certificate_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'AGR-' || TO_CHAR(now(), 'YYYY') || '-' || LPAD(nextval('certificate_number_seq')::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_batches_status ON public.batches(status);
CREATE INDEX IF NOT EXISTS idx_batches_user_id ON public.batches(user_id);
CREATE INDEX IF NOT EXISTS idx_inspection_actions_inspector ON public.inspection_actions(inspector_id);
CREATE INDEX IF NOT EXISTS idx_inspection_actions_status ON public.inspection_actions(status);
CREATE INDEX IF NOT EXISTS idx_digital_certificates_status ON public.digital_certificates(status);

-- Enable realtime for all necessary tables
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER TABLE public.batches REPLICA IDENTITY FULL;
ALTER TABLE public.inspection_actions REPLICA IDENTITY FULL;
ALTER TABLE public.digital_certificates REPLICA IDENTITY FULL;
ALTER TABLE public.certificates REPLICA IDENTITY FULL;