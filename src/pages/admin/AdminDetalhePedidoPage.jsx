import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminDetalhePedidoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [newStatus, setNewStatus] = useState('');
  const [trackingCode, setTrackingCode] = useState('');

  useEffect(() => {
    const fetchPedido = async () => {
      const { data, error } = await supabase.from('pedidos').select('*').eq('id', id).single();
      if (!error && data) {
        setPedido(data);
        setNewStatus(data.status);
        // Assuming tracking code might be stored in metadata or we just add a mock one if missing in DB schema for now
      }
      setLoading(false);
    };
    fetchPedido();
  }, [id]);

  const handleUpdateStatus = async () => {
    setIsSaving(true);
    try {
      // In a real app, you'd also save tracking code. For now updating status.
      const { error } = await supabase.from('pedidos').update({ status: newStatus }).eq('id', id);
      if (error) throw error;
      toast({ title: "Status atualizado com sucesso!" });
      setPedido(p => ({ ...p, status: newStatus }));
    } catch (err) {
      toast({ title: "Erro", description: err.message, variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
  if (!pedido) return <div>Pedido não encontrado.</div>;

  const itens = pedido.itens_pedido || [];
  const cliente = pedido.dados_cliente || {};
  const endereco = pedido.endereco_entrega || {};

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-poppins font-bold text-gray-900">Pedido #{pedido.numero_pedido}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Itens do Pedido</h3>
            <div className="space-y-4">
              {itens.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded border flex-shrink-0">
                    <img src={item.imagem || item.image || item.image_url} alt={item.nome} className="w-full h-full object-cover rounded" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{item.nome}</h4>
                    <p className="text-sm text-gray-500">Qtd: {item.quantidade} x R$ {Number(item.price).toFixed(2).replace('.', ',')}</p>
                  </div>
                  <div className="font-bold text-primary">
                    R$ {(item.quantidade * item.price).toFixed(2).replace('.', ',')}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t space-y-2 text-right">
              <p className="text-gray-500 text-sm">Subtotal: R$ {Number(pedido.subtotal).toFixed(2).replace('.', ',')}</p>
              <p className="text-gray-500 text-sm">Frete: R$ {Number(pedido.frete).toFixed(2).replace('.', ',')}</p>
              <p className="text-lg font-black text-gray-900 mt-2">Total: R$ {Number(pedido.total).toFixed(2).replace('.', ',')}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Dados do Cliente</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-bold text-gray-500 mb-1">Contato</p>
                <p>{cliente.nome}</p>
                <p>{cliente.email}</p>
                <p>{cliente.telefone}</p>
                <p>CPF: {cliente.cpf}</p>
              </div>
              <div>
                <p className="font-bold text-gray-500 mb-1">Endereço de Entrega</p>
                <p>{endereco.rua}, {endereco.numero} {endereco.complemento}</p>
                <p>{endereco.bairro}</p>
                <p>{endereco.cidade} - {endereco.estado}</p>
                <p>CEP: {endereco.cep}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-primary">
            <h3 className="font-bold text-lg mb-4">Atualizar Status</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Status do Pedido</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger className="bg-gray-50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendente (Aguardando Pagamento)</SelectItem>
                    <SelectItem value="approved">Pago / Aprovado</SelectItem>
                    <SelectItem value="shipped">Enviado</SelectItem>
                    <SelectItem value="delivered">Entregue</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {(newStatus === 'shipped' || newStatus === 'delivered') && (
                <div className="space-y-2">
                  <Label>Código de Rastreio (Opcional)</Label>
                  <Input 
                    placeholder="Ex: BR123456789BR" 
                    value={trackingCode} 
                    onChange={(e) => setTrackingCode(e.target.value)} 
                    className="bg-gray-50"
                  />
                </div>
              )}

              <Button 
                onClick={handleUpdateStatus} 
                disabled={isSaving || newStatus === pedido.status}
                className="w-full font-bold bg-primary hover:bg-primary/90"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                Salvar Alterações
              </Button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Informações do Pagamento</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-bold text-gray-500">Método:</span> {pedido.metodo_pagamento}</p>
              <p><span className="font-bold text-gray-500">ID Mercado Pago:</span> {pedido.payment_id || pedido.preference_id || 'N/A'}</p>
              <p><span className="font-bold text-gray-500">Data da Compra:</span> {new Date(pedido.created_at).toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}