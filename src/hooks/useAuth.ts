// import { useState, useEffect } from 'react';
// import { User, Session } from '@supabase/supabase-js';
// import { supabase } from '@/integrations/supabase/client';
// import { useToast } from '@/hooks/use-toast';

// export const useAuth = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [session, setSession] = useState<Session | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState<any>(null);
//   const { toast } = useToast();

//   useEffect(() => {
//     let isMounted = true;

//     // Set up auth state listener FIRST
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         if (!isMounted) return;
        
//         console.log('Auth state changed:', event, session?.user?.id);
//         setSession(session);
//         setUser(session?.user ?? null);
        
//         // Clear profile when user logs out
//         if (!session?.user) {
//           setProfile(null);
//         }
        
//         setLoading(false);
//       }
//     );

//     // THEN check for existing session
//     const initializeAuth = async () => {
//       try {
//         const { data: { session } } = await supabase.auth.getSession();
//         if (!isMounted) return;
        
//         setSession(session);
//         setUser(session?.user ?? null);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error getting session:', error);
//         if (isMounted) setLoading(false);
//       }
//     };

//     initializeAuth();

//     return () => {
//       isMounted = false;
//       subscription.unsubscribe();
//     };
//   }, []);

//   const signUp = async (email: string, password: string, userData: any) => {
//     try {
//       const redirectUrl = `${window.location.origin}/`;
      
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           emailRedirectTo: redirectUrl,
//           data: userData
//         }
//       });

//       if (error) throw error;

//       toast({
//         title: "Account created successfully!",
//         description: "Please check your email to verify your account.",
//       });

//       return { data, error: null };
//     } catch (error: any) {
//       toast({
//         title: "Sign up failed",
//         description: error.message,
//         variant: "destructive",
//       });
//       return { data: null, error };
//     }
//   };

//   const signIn = async (email: string, password: string, expectedRole?: string) => {
//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (error) throw error;

//       // Check if user has expected role if provided
//       if (expectedRole && data.user) {
//         const userRole = data.user.user_metadata?.role;
//         if (userRole && userRole !== expectedRole) {
//           await supabase.auth.signOut();
//           throw new Error(`Account does not exist for the selected role (${expectedRole}). Please check your credentials or register for this role.`);
//         }
//       }

//       toast({
//         title: "Welcome back!",
//         description: "You have successfully signed in.",
//       });

//       return { data, error: null };
//     } catch (error: any) {
//       toast({
//         title: "Sign in failed",
//         description: error.message,
//         variant: "destructive",
//       });
//       return { data: null, error };
//     }
//   };

//   const signOut = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;

//       // Clear state immediately
//       setUser(null);
//       setSession(null);
//       setProfile(null);

//       toast({
//         title: "Signed out",
//         description: "You have been successfully signed out.",
//       });
      
//       // Redirect to home page
//       window.location.href = '/';
//     } catch (error: any) {
//       toast({
//         title: "Sign out failed",
//         description: error.message,
//         variant: "destructive",
//       });
//     }
//   };

//   const getUserProfile = async () => {
//     if (!user) return null;
    
//     // Return cached profile if available
//     if (profile && profile.user_id === user.id) {
//       return profile;
//     }
    
//     try {
//       const { data, error } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('user_id', user.id)
//         .single();

//       if (error) throw error;
      
//       // Cache the profile
//       setProfile(data);
//       return data;
//     } catch (error: any) {
//       console.error('Error fetching profile:', error);
//       return null;
//     }
//   };

//   return {
//     user,
//     session,
//     loading,
//     profile,
//     signUp,
//     signIn,
//     signOut,
//     getUserProfile,
//   };
// };



import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const { toast } = useToast();

  // Fetch user profile based on user ID
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      setProfile(data);
      return data;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  };

  useEffect(() => {
    let isMounted = true;

    // Handle auth state changes and keep user/profile updated
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;

        console.log('Auth state changed:', event, session?.user?.id);

        // Always update session and user state
        setSession(session);
        setUser(session?.user ?? null);

        if (!session?.user) {
          // Clear all state when signing out
          setProfile(null);
          setLoading(false);
          return;
        }

        // Only fetch profile for authenticated users
        if (session?.user && event !== 'TOKEN_REFRESHED') {
          // Defer profile fetching to avoid recursive calls
          setTimeout(async () => {
            if (!isMounted) return;
            try {
              const userProfile = await fetchUserProfile(session.user.id);
              if (isMounted) {
                setProfile(userProfile);
              }
            } catch (error) {
              console.error('Error fetching profile after auth change:', error);
            }
            if (isMounted) {
              setLoading(false);
            }
          }, 0);
        } else {
          setLoading(false);
        }
      }
    );

    // Initial auth check on mount
    const initializeAuth = async () => {
      try {
        const {
          data: { session }
        } = await supabase.auth.getSession();

        if (!isMounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          const userProfile = await fetchUserProfile(session.user.id);
          if (isMounted) {
            setProfile(userProfile);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error('Error getting session:', error);
        if (isMounted) setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Sign up function remains the same
  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const redirectUrl = `${window.location.origin}/`;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: userData,
        }
      });

      if (error) throw error;

      toast({
        title: "Account created successfully!",
        description: "Please check your email to verify your account.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  // Sign in function updated to set profile after login
  const signIn = async (email: string, password: string, expectedRole?: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Fetch user profile to check role - but allow login regardless of role selection
      // The redirect will happen based on actual user role, not expected role
      if (data.user) {
        const userProfile = await fetchUserProfile(data.user.id);
        setProfile(userProfile);
      }


      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      // Clear state immediately BEFORE calling Supabase signOut
      setUser(null);
      setSession(null);
      setProfile(null);

      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });

      // Redirect to home page
      window.location.href = '/';
    } catch (error: any) {
      console.error('Sign out error:', error);
      
      // Even if there's an error, clear local state and redirect
      setUser(null);
      setSession(null);
      setProfile(null);
      
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
      
      // Force redirect anyway
      window.location.href = '/';
    }
  };

  const getUserProfile = async () => {
    if (!user) return null;

    if (profile && profile.user_id === user.id) {
      return profile;
    }

    return await fetchUserProfile(user.id);
  };

  return {
    user,
    session,
    loading,
    profile,
    signUp,
    signIn,
    signOut,
    getUserProfile,
  };
};
