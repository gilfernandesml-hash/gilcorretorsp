import { supabase } from '@/lib/customSupabaseClient';

export const enviarContato = async (nome, email, telefone, mensagem) => {
  try {
    // Validação básica
    if (!nome || nome.length < 3) throw new Error("Nome deve ter pelo menos 3 caracteres.");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("E-mail inválido.");
    if (!telefone || telefone.replace(/\D/g, '').length < 10) throw new Error("Telefone inválido.");

    const { error } = await supabase
      .from('contatos')
      .insert([
        { 
          nome, 
          email, 
          telefone, 
          mensagem,
          data_contato: new Date().toISOString(),
          lido: false
        }
      ]);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};