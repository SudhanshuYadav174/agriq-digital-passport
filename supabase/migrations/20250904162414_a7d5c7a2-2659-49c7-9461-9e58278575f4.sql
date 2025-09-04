-- Fix security issues by removing the problematic view and creating safer alternatives

-- Drop the problematic view that exposes auth.users
DROP VIEW IF EXISTS public.user_roles_view;

-- Create a safer function to check user roles for debugging (only for admin users)
CREATE OR REPLACE FUNCTION public.get_user_role_debug()
RETURNS TABLE(email text, role text, metadata_role text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow admin users to call this function
  IF NOT EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;
  
  RETURN QUERY
  SELECT 
    p.email,
    p.role,
    'metadata_hidden'::text -- Don't expose actual metadata
  FROM profiles p
  WHERE p.user_id = auth.uid();
END;
$$;

-- Create a simple function for users to check their own role
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role text;
BEGIN
  SELECT role INTO user_role
  FROM profiles
  WHERE user_id = auth.uid();
  
  RETURN COALESCE(user_role, 'unknown');
END;
$$;