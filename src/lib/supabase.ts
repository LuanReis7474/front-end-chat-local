import { supabase } from "@/integrations/supabase/client";

export const getUserRole = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.log('No role found for user');
    return null;
  }

  return data?.role;
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.log('No profile found for user');
    return null;
  }

  return data;
};
