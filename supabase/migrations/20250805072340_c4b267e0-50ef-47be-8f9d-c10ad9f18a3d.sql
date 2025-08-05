-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization_name TEXT NOT NULL,
  organization_type TEXT NOT NULL,
  country TEXT NOT NULL,
  address TEXT NOT NULL,
  website TEXT,
  role TEXT NOT NULL CHECK (role IN ('exporter', 'qa_agency', 'importer', 'admin')),
  license_number TEXT,
  certifications TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create batches table for exporters
CREATE TABLE public.batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  batch_number TEXT NOT NULL UNIQUE,
  product_name TEXT NOT NULL,
  product_type TEXT NOT NULL,
  quantity DECIMAL NOT NULL,
  unit TEXT NOT NULL,
  harvest_date DATE NOT NULL,
  processing_date DATE,
  origin_location TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_inspection', 'approved', 'rejected')),
  qa_agency_id UUID REFERENCES auth.users(id),
  inspection_date TIMESTAMP WITH TIME ZONE,
  certificate_id UUID,
  qr_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;

-- Batch policies
CREATE POLICY "Exporters can view their own batches" ON public.batches
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Exporters can create their own batches" ON public.batches
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "QA agencies can view assigned batches" ON public.batches
  FOR SELECT USING (auth.uid() = qa_agency_id);

CREATE POLICY "QA agencies can update assigned batches" ON public.batches
  FOR UPDATE USING (auth.uid() = qa_agency_id);

-- Create certificates table
CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID REFERENCES public.batches(id) ON DELETE CASCADE NOT NULL,
  certificate_number TEXT NOT NULL UNIQUE,
  issued_by UUID REFERENCES auth.users(id) NOT NULL,
  issued_to UUID REFERENCES auth.users(id) NOT NULL,
  issue_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expiry_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'valid' CHECK (status IN ('valid', 'expired', 'revoked')),
  vc_data JSONB,
  qr_code TEXT NOT NULL,
  digital_signature TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Certificate policies
CREATE POLICY "Anyone can view valid certificates" ON public.certificates
  FOR SELECT USING (status = 'valid');

CREATE POLICY "QA agencies can create certificates" ON public.certificates
  FOR INSERT WITH CHECK (auth.uid() = issued_by);

CREATE POLICY "QA agencies can update their certificates" ON public.certificates
  FOR UPDATE USING (auth.uid() = issued_by);

-- Create inspections table
CREATE TABLE public.inspections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID REFERENCES public.batches(id) ON DELETE CASCADE NOT NULL,
  inspector_id UUID REFERENCES auth.users(id) NOT NULL,
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  completed_date TIMESTAMP WITH TIME ZONE,
  location TEXT NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  quality_score INTEGER CHECK (quality_score >= 0 AND quality_score <= 100),
  test_results JSONB,
  notes TEXT,
  photos TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.inspections ENABLE ROW LEVEL SECURITY;

-- Inspection policies
CREATE POLICY "Inspectors can view their inspections" ON public.inspections
  FOR SELECT USING (auth.uid() = inspector_id);

CREATE POLICY "Inspectors can create inspections" ON public.inspections
  FOR INSERT WITH CHECK (auth.uid() = inspector_id);

CREATE POLICY "Inspectors can update their inspections" ON public.inspections
  FOR UPDATE USING (auth.uid() = inspector_id);

-- Create trigger for profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    user_id,
    first_name,
    last_name,
    email,
    phone,
    organization_name,
    organization_type,
    country,
    address,
    website,
    role,
    license_number,
    certifications
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'phone', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'organization_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'organization_type', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'country', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'address', ''),
    NEW.raw_user_meta_data ->> 'website',
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'exporter'),
    NEW.raw_user_meta_data ->> 'license_number',
    NEW.raw_user_meta_data ->> 'certifications'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_batches_updated_at
  BEFORE UPDATE ON public.batches
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_inspections_updated_at
  BEFORE UPDATE ON public.inspections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();