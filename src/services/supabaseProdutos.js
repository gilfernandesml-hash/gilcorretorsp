import { supabase } from '@/lib/customSupabaseClient';

export const buscarProdutos = async () => {
  const { data, error } = await supabase.from('rs_products').select('*');
  if (error) throw error;
  return data;
};

export const buscarProdutoPorId = async (id) => {
  const { data, error } = await supabase.from('rs_products').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

export const buscarPorCategoria = async (categoria) => {
  const { data, error } = await supabase.from('rs_products').select('*').eq('category', categoria);
  if (error) throw error;
  return data;
};

export const buscarPorNome = async (nome) => {
  const { data, error } = await supabase.from('rs_products').select('*').ilike('name', `%${nome}%`);
  if (error) throw error;
  return data;
};