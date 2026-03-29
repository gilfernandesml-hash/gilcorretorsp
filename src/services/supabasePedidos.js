import { supabase } from '@/lib/customSupabaseClient';

export const criarPedido = async (usuario_id, dados_pedido) => {
  const { data, error } = await supabase
    .from('pedidos')
    .insert([{ ...dados_pedido, user_id: usuario_id }])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const buscarPedidosUsuario = async (usuario_id) => {
  const { data, error } = await supabase
    .from('pedidos')
    .select('*')
    .eq('user_id', usuario_id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const buscarPedidoPorId = async (id) => {
  const { data, error } = await supabase
    .from('pedidos')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};

export const atualizarStatusPedido = async (pedido_id, status) => {
  const { data, error } = await supabase
    .from('pedidos')
    .update({ status })
    .eq('id', pedido_id)
    .select()
    .single();
  if (error) throw error;
  return data;
};