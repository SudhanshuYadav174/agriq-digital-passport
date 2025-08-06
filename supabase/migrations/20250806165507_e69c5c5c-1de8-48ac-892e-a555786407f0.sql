-- Create additional tables for complete agricultural certification platform

-- Organizations table for detailed company information
CREATE TABLE public.organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'exporter', 'qa_agency', 'importer', 'laboratory', 'customs'
  registration_number TEXT,
  license_number TEXT,
  certifications TEXT[],
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  country TEXT NOT NULL,
  postal_code TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  description TEXT,
  accreditation_body TEXT,
  accreditation_number TEXT,
  accreditation_expiry DATE,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Product categories for standardized classification
CREATE TABLE public.product_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID,
  hs_code TEXT, -- Harmonized System code for trade
  organic_eligible BOOLEAN DEFAULT true,
  special_handling TEXT[],
  shelf_life_days INTEGER,
  storage_requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Quality standards and certification types
CREATE TABLE public.quality_standards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  version TEXT NOT NULL DEFAULT '1.0',
  issuing_body TEXT NOT NULL,
  category TEXT NOT NULL, -- 'organic', 'fairtrade', 'gmp', 'haccp', 'iso', 'custom'
  test_parameters JSONB, -- Specific parameters and their acceptable ranges
  validity_period_days INTEGER DEFAULT 365,
  renewal_required BOOLEAN DEFAULT true,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Test results and laboratory data
CREATE TABLE public.test_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  batch_id UUID NOT NULL,
  inspection_id UUID,
  laboratory_id UUID,
  test_type TEXT NOT NULL, -- 'chemical', 'microbiological', 'physical', 'sensory'
  standard_id UUID,
  parameters JSONB NOT NULL, -- Test parameters and results
  methodology TEXT,
  equipment_used TEXT,
  test_date TIMESTAMP WITH TIME ZONE NOT NULL,
  completion_date TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'failed'
  pass_fail TEXT, -- 'pass', 'fail', 'conditional'
  technician_id UUID,
  reviewed_by UUID,
  review_date TIMESTAMP WITH TIME ZONE,
  comments TEXT,
  attachments TEXT[], -- URLs to test reports, images
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Document management
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  batch_id UUID,
  certificate_id UUID,
  inspection_id UUID,
  organization_id UUID,
  uploaded_by UUID NOT NULL,
  document_type TEXT NOT NULL, -- 'lab_report', 'shipping_document', 'photo', 'compliance_doc', 'certificate'
  title TEXT NOT NULL,
  description TEXT,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  storage_path TEXT,
  checksum TEXT, -- For file integrity verification
  version INTEGER DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'active',
  access_level TEXT NOT NULL DEFAULT 'private', -- 'public', 'private', 'restricted'
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Audit logs for tracking all system activities
CREATE TABLE public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  action TEXT NOT NULL, -- 'create', 'update', 'delete', 'view', 'approve', 'reject'
  resource_type TEXT NOT NULL, -- 'batch', 'certificate', 'inspection', 'user', etc.
  resource_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  user_agent TEXT,
  session_id TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Notifications system
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL, -- 'info', 'warning', 'success', 'error'
  category TEXT NOT NULL, -- 'batch_update', 'inspection_due', 'certificate_expiry', 'system'
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB, -- Additional structured data
  read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  action_url TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Shipping and logistics
CREATE TABLE public.shipments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  batch_id UUID NOT NULL,
  exporter_id UUID NOT NULL,
  importer_id UUID NOT NULL,
  shipping_company TEXT,
  tracking_number TEXT,
  container_number TEXT,
  seal_number TEXT,
  vessel_name TEXT,
  voyage_number TEXT,
  port_of_loading TEXT NOT NULL,
  port_of_discharge TEXT NOT NULL,
  estimated_departure TIMESTAMP WITH TIME ZONE,
  actual_departure TIMESTAMP WITH TIME ZONE,
  estimated_arrival TIMESTAMP WITH TIME ZONE,
  actual_arrival TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'preparing', -- 'preparing', 'shipped', 'in_transit', 'arrived', 'cleared', 'delivered'
  temperature_controlled BOOLEAN DEFAULT false,
  temperature_range TEXT,
  special_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quality_standards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for organizations
CREATE POLICY "Users can view their own organization" 
ON public.organizations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own organization" 
ON public.organizations 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own organization" 
ON public.organizations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for product_categories (public read access)
CREATE POLICY "Anyone can view product categories" 
ON public.product_categories 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage product categories" 
ON public.product_categories 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- RLS Policies for quality_standards (public read access)
CREATE POLICY "Anyone can view quality standards" 
ON public.quality_standards 
FOR SELECT 
USING (true);

CREATE POLICY "QA agencies can manage quality standards" 
ON public.quality_standards 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role IN ('qa_agency', 'admin')
));

-- RLS Policies for test_results
CREATE POLICY "Laboratory staff can manage test results" 
ON public.test_results 
FOR ALL 
USING (auth.uid() = laboratory_id OR auth.uid() = technician_id OR auth.uid() = reviewed_by);

CREATE POLICY "Batch owners can view test results" 
ON public.test_results 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.batches 
  WHERE id = test_results.batch_id AND user_id = auth.uid()
));

-- RLS Policies for documents
CREATE POLICY "Users can manage their own documents" 
ON public.documents 
FOR ALL 
USING (auth.uid() = uploaded_by);

CREATE POLICY "Public documents are viewable by all" 
ON public.documents 
FOR SELECT 
USING (access_level = 'public');

CREATE POLICY "Batch owners can view batch documents" 
ON public.documents 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.batches 
  WHERE id = documents.batch_id AND user_id = auth.uid()
));

-- RLS Policies for audit_logs (admin only)
CREATE POLICY "Admins can view audit logs" 
ON public.audit_logs 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications" 
ON public.notifications 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
ON public.notifications 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for shipments
CREATE POLICY "Exporters can manage their shipments" 
ON public.shipments 
FOR ALL 
USING (auth.uid() = exporter_id);

CREATE POLICY "Importers can view their shipments" 
ON public.shipments 
FOR SELECT 
USING (auth.uid() = importer_id);

CREATE POLICY "Batch owners can view shipments" 
ON public.shipments 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.batches 
  WHERE id = shipments.batch_id AND user_id = auth.uid()
));

-- Add foreign key constraints
ALTER TABLE public.organizations 
ADD CONSTRAINT fk_organizations_user_id 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.product_categories 
ADD CONSTRAINT fk_product_categories_parent_id 
FOREIGN KEY (parent_id) REFERENCES public.product_categories(id);

ALTER TABLE public.test_results 
ADD CONSTRAINT fk_test_results_batch_id 
FOREIGN KEY (batch_id) REFERENCES public.batches(id) ON DELETE CASCADE;

ALTER TABLE public.test_results 
ADD CONSTRAINT fk_test_results_inspection_id 
FOREIGN KEY (inspection_id) REFERENCES public.inspections(id);

ALTER TABLE public.test_results 
ADD CONSTRAINT fk_test_results_standard_id 
FOREIGN KEY (standard_id) REFERENCES public.quality_standards(id);

ALTER TABLE public.shipments 
ADD CONSTRAINT fk_shipments_batch_id 
FOREIGN KEY (batch_id) REFERENCES public.batches(id) ON DELETE CASCADE;

-- Add triggers for updated_at columns
CREATE TRIGGER update_organizations_updated_at
BEFORE UPDATE ON public.organizations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_product_categories_updated_at
BEFORE UPDATE ON public.product_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quality_standards_updated_at
BEFORE UPDATE ON public.quality_standards
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_test_results_updated_at
BEFORE UPDATE ON public.test_results
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_documents_updated_at
BEFORE UPDATE ON public.documents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_shipments_updated_at
BEFORE UPDATE ON public.shipments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some initial data for product categories
INSERT INTO public.product_categories (name, code, description, hs_code, organic_eligible, shelf_life_days) VALUES
('Fruits', 'FRUIT', 'Fresh and processed fruits', '08', true, 14),
('Vegetables', 'VEG', 'Fresh and processed vegetables', '07', true, 10),
('Grains & Cereals', 'GRAIN', 'Wheat, rice, corn, and other grains', '10', true, 365),
('Nuts & Seeds', 'NUTS', 'Tree nuts, groundnuts, and seeds', '12', true, 180),
('Spices & Herbs', 'SPICE', 'Dried spices and aromatic herbs', '09', true, 730),
('Coffee & Tea', 'COFFEE', 'Coffee beans, tea leaves, and related products', '09', true, 365),
('Dairy Products', 'DAIRY', 'Milk, cheese, and dairy derivatives', '04', true, 30),
('Meat & Poultry', 'MEAT', 'Fresh and processed meat products', '02', false, 7),
('Seafood', 'SEAFOOD', 'Fish, shellfish, and marine products', '03', false, 3),
('Oils & Fats', 'OIL', 'Vegetable oils and animal fats', '15', true, 365);

-- Insert some initial quality standards
INSERT INTO public.quality_standards (name, code, description, issuing_body, category, validity_period_days) VALUES
('Organic Certification', 'ORGANIC', 'Certified organic agricultural products', 'USDA/EU/JAS', 'organic', 365),
('Fair Trade Certified', 'FAIRTRADE', 'Fair trade certified products', 'Fairtrade International', 'fairtrade', 365),
('Good Manufacturing Practice', 'GMP', 'Good Manufacturing Practice standards', 'FDA/WHO', 'gmp', 730),
('HACCP Certification', 'HACCP', 'Hazard Analysis Critical Control Points', 'Codex Alimentarius', 'haccp', 365),
('ISO 22000', 'ISO22000', 'Food Safety Management System', 'ISO', 'iso', 1095),
('GlobalGAP', 'GLOBALGAP', 'Good Agricultural Practice certification', 'GLOBALG.A.P.', 'gmp', 365),
('BRC Food Safety', 'BRC', 'British Retail Consortium Food Safety', 'BRC', 'iso', 365),
('Rainforest Alliance', 'RA', 'Sustainable agriculture certification', 'Rainforest Alliance', 'custom', 365);