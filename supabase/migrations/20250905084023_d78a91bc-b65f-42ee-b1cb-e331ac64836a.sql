-- Create sample data for testing certificate issuance

-- First, let's create a sample batch (assuming you're the QA user)
INSERT INTO public.batches (
  id,
  user_id,
  batch_number,
  product_name,
  product_type,
  quantity,
  unit,
  origin_location,
  harvest_date,
  processing_date,
  description,
  status,
  qa_agency_id
) VALUES (
  gen_random_uuid(),
  '7d1c4863-9595-4ca3-ae88-b43bcfcd8d35', -- This is the user_id from your console logs
  'DEMO-BATCH-001',
  'Premium Organic Coffee Beans',
  'Coffee',
  1000,
  'kg',
  'Colombia, Huila Region',
  '2024-12-01',
  '2024-12-05',
  'High-quality organic coffee beans for certification testing',
  'under_inspection',
  '7d1c4863-9595-4ca3-ae88-b43bcfcd8d35' -- Assign to the QA user
) ON CONFLICT (batch_number) DO NOTHING;

-- Now create a completed inspection for this batch
INSERT INTO public.inspection_actions (
  id,
  batch_id,
  inspector_id,
  action_type,
  scheduled_date,
  completed_date,
  quality_score,
  status,
  location,
  notes,
  test_results,
  certificate_issued
) VALUES (
  gen_random_uuid(),
  (SELECT id FROM public.batches WHERE batch_number = 'DEMO-BATCH-001' LIMIT 1),
  '7d1c4863-9595-4ca3-ae88-b43bcfcd8d35', -- QA inspector
  'quality_inspection',
  NOW() - INTERVAL '2 days',
  NOW() - INTERVAL '1 day',
  92,
  'completed',
  'Coffee Processing Facility, Huila',
  'Excellent quality beans with superior aroma and no defects detected',
  '{"moisture_content": "11.2%", "defects": "0.5%", "screen_size": "18+", "cupping_score": "85+"}',
  false
) ON CONFLICT DO NOTHING;