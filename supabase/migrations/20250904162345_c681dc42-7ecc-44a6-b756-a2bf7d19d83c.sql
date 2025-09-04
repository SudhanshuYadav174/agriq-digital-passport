-- Fix user roles and add missing real-time functionality

-- First, let's add a function to easily update user roles
CREATE OR REPLACE FUNCTION public.update_user_role(user_email text, new_role text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE profiles 
  SET role = new_role 
  WHERE email = user_email;
  
  -- Also update auth metadata if needed
  UPDATE auth.users 
  SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || jsonb_build_object('role', new_role)
  WHERE email = user_email;
END;
$$;

-- Add real-time replica identity to key tables
ALTER TABLE inspection_actions REPLICA IDENTITY FULL;
ALTER TABLE digital_certificates REPLICA IDENTITY FULL;
ALTER TABLE verification_logs REPLICA IDENTITY FULL;
ALTER TABLE profiles REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE inspection_actions;
ALTER PUBLICATION supabase_realtime ADD TABLE digital_certificates;
ALTER PUBLICATION supabase_realtime ADD TABLE verification_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE profiles;

-- Create indexes for better performance on real-time queries
CREATE INDEX IF NOT EXISTS idx_inspection_actions_inspector_id ON inspection_actions(inspector_id);
CREATE INDEX IF NOT EXISTS idx_digital_certificates_issued_by ON digital_certificates(issued_by);
CREATE INDEX IF NOT EXISTS idx_verification_logs_created_at ON verification_logs(created_at DESC);

-- Add a sample QA user for testing (update this with the actual QA user email)
-- This is just a template - you'll need to run: SELECT update_user_role('your-qa-email@example.com', 'qa');
-- after the migration

-- Create a view to easily check user roles
CREATE OR REPLACE VIEW public.user_roles_view AS
SELECT 
  p.id,
  p.email,
  p.first_name,
  p.last_name,
  p.role,
  p.organization_name,
  u.raw_user_meta_data->>'role' as metadata_role,
  p.created_at
FROM profiles p
LEFT JOIN auth.users u ON p.user_id = u.id
ORDER BY p.created_at DESC;