import { supabase } from '@/lib/customSupabaseClient';

export const signUp = async (email, password, nome_completo, telefone) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nome_completo,
        telefone,
      },
    },
  });
  if (error) throw error;
  return data;
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

export const updateUserProfile = async (dados) => {
  const { data, error } = await supabase.auth.updateUser({
    data: dados
  });
  if (error) throw error;
  return data;
};