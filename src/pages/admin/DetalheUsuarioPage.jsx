import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { ArrowLeft, Loader2, Ban, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function DetalheUsuarioPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [usuario, setUsuario] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: userData } = await supabase.from('usuarios').select('*').eq('id', id).single();
      const { data: orderData } = await supabase.from('pedidos').select('*').eq('user_id', id).order('created_at', { ascending: false }).limit(5);
      
      setUsuario(userData);
      setPedidos(orderData || []);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const toggleStatus = async () => {
    setIsToggling(true);
    try {
      const newStatus = !usuario.ativo;
      const { error } = await supabase.from('usuarios').update({ ativo: newStatus }).eq('id', id);
      if (error) throw error;
      setUsuario({ ...usuario, ativo: newStatus });
      toast({ title: `Usuário ${newStatus ? 'ativado' : 'desativado'} com sucesso!` });
    } catch (err) {
      toast({ title: "Erro", description: err.message, variant: "destructive" });
    } finally {
      setIsToggling(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
  if (!usuario) return <div>Usuário não encontrado.</div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-poppins font-bold text-gray-900">Perfil do Usuário</h1>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">{usuario.nome || 'Sem Nome'}</h2>
          <p className="text-gray-500">{usuario.email}</p>
          <div className="mt-4 space-y-1 text-sm text-gray-600">
            <p><span className="font-bold text-gray-900">Telefone:</span> {usuario.telefone || '-'}</p>
            <p><span className="font-bold text-gray-900">Cadastro:</span> {new Date(usuario.data_cadastro).toLocaleDateString('pt-BR')}</p>
            <p><span className="font-bold text-gray-900">Status:</span> {usuario.ativo ? <span className="text-green-600 font-bold">Ativo</span> : <span className="text-red-600 font-bold">Inativo</span>}</p>
          </div>
        </div>
        
        <Button 
          variant={usuario.ativo ? 'destructive' : 'default'} 
          onClick={toggleStatus}
          disabled={isToggling}
          className="gap-2 font-bold"
        >
          {isToggling ? <Loader2 className="w-4 h-4 animate-spin" /> : (usuario.ativo ? <Ban className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />)}
          {usuario.ativo ? 'Desativar Usuário' : 'Reativar Usuário'}
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-poppins font-bold text-lg text-gray-900">Últimos Pedidos do Usuário</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Número</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pedidos.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">Nenhum pedido encontrado para este usuário.</td></tr>
              ) : (
                pedidos.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold">#{p.numero_pedido}</td>
                    <td className="px-6 py-4">{new Date(p.created_at).toLocaleDateString('pt-BR')}</td>
                    <td className="px-6 py-4 font-bold text-primary">R$ {Number(p.total).toFixed(2).replace('.', ',')}</td>
                    <td className="px-6 py-4">{p.status}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm" onClick={() => navigate(`/admin/pedidos/${p.id}`)}>Ver Pedido</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}