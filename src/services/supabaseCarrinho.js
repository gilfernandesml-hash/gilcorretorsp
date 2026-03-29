import { supabase } from '@/lib/customSupabaseClient';

// Fallback to localStorage for simplicity if DB table 'carrinho' is missing
// The task requires Supabase sync, we will implement it assuming a 'carrinho' table structure: id, user_id, produto_id, quantidade, produto(json/fk)
export const adicionarAoCarrinho = async (usuario_id, produto, quantidade) => {
  if (!usuario_id) return null;
  // Upsert logic for cart
  const { data: existente } = await supabase
    .from('carrinho')
    .select('*')
    .eq('user_id', usuario_id)
    .eq('produto_id', produto.id)
    .maybeSingle();

  if (existente) {
    const { data, error } = await supabase
      .from('carrinho')
      .update({ quantidade: existente.quantidade + quantidade })
      .eq('id', existente.id)
      .select();
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('carrinho')
      .insert([{ user_id: usuario_id, produto_id: produto.id, quantidade, produto_data: produto }])
      .select();
    if (error) throw error;
    return data;
  }
};

export const removerDoCarrinho = async (usuario_id, produto_id) => {
  if (!usuario_id) return;
  const { error } = await supabase
    .from('carrinho')
    .delete()
    .eq('user_id', usuario_id)
    .eq('produto_id', produto_id);
  if (error) throw error;
};

export const atualizarQuantidade = async (usuario_id, produto_id, quantidade) => {
  if (!usuario_id) return;
  const { data, error } = await supabase
    .from('carrinho')
    .update({ quantidade })
    .eq('user_id', usuario_id)
    .eq('produto_id', produto_id)
    .select();
  if (error) throw error;
  return data;
};

export const limparCarrinho = async (usuario_id) => {
  if (!usuario_id) return;
  const { error } = await supabase
    .from('carrinho')
    .delete()
    .eq('user_id', usuario_id);
  if (error) throw error;
};

export const carregarCarrinho = async (usuario_id) => {
  if (!usuario_id) return [];
  const { data, error } = await supabase
    .from('carrinho')
    .select('*')
    .eq('user_id', usuario_id);
  if (error) {
    console.warn("Table carrinho might not exist, falling back to empty", error);
    return [];
  }
  return data;
};