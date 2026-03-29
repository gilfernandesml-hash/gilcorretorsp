import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Package, MapPin, CreditCard, Truck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buscarPedidoPorId } from '@/services/supabasePedidos';

export default function DetalhePedidoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarPedidoPorId(id)
      .then(data => setPedido(data))
      .catch(err => {
        console.error(err);
        navigate('/meus-pedidos');
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground font-medium">Carregando detalhes...</p>
      </div>
    );
  }

  if (!pedido) return null;

  const getStatusLabel = (status) => {
    switch(status) {
      case 'approved': return 'Pagamento Aprovado';
      case 'pending': return 'Aguardando Pagamento';
      case 'rejected': return 'Pagamento Rejeitado';
      default: return 'Processando';
    }
  };

  const getPaymentMethod = (method) => {
    if (method === 'pix') return 'Pix';
    if (method === 'boleto') return 'Boleto Bancário';
    return 'Cartão de Crédito';
  };

  const itens = pedido.itens_pedido || [];
  const cliente = pedido.dados_cliente || {};
  const endereco = pedido.endereco_entrega || {};

  return (
    <div className="min-h-screen bg-muted/20 pb-16">
      <div className="bg-background py-8 border-b">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          <nav className="flex items-center text-sm text-muted-foreground mb-4 font-medium">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link to="/meus-pedidos" className="hover:text-primary transition-colors">Meus Pedidos</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-foreground">Pedido #{pedido.numero_pedido}</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-poppins font-black text-foreground">Detalhes do Pedido</h1>
            <Button variant="outline" onClick={() => navigate('/meus-pedidos')} className="w-fit font-bold">
              Voltar aos Pedidos
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border rounded-2xl p-6 shadow-sm">
              <h3 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2 pb-2 border-b">
                <Package className="w-5 h-5 text-primary" /> Status do Pedido
              </h3>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground font-bold uppercase mb-1">Pedido Realizado em</p>
                  <p className="font-medium">{new Date(pedido.created_at).toLocaleDateString('pt-BR')} às {new Date(pedido.created_at).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-bold uppercase mb-1">Status</p>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-bold ${pedido.status === 'approved' ? 'bg-success/20 text-success' : 'bg-amber-100 text-amber-800'}`}>
                    {getStatusLabel(pedido.status)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-2xl p-6 shadow-sm">
              <h3 className="font-poppins font-bold text-lg mb-4 pb-2 border-b">Itens do Pedido</h3>
              <div className="space-y-4">
                {itens.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-muted rounded overflow-hidden border flex-shrink-0">
                      <img src={item.imagem || item.image || item.image_url} alt={item.nome} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground line-clamp-2">{item.nome}</h4>
                      <p className="text-sm text-muted-foreground">Qtd: {item.quantidade} x R$ {Number(item.price).toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div className="font-bold text-primary">
                      R$ {(item.quantidade * item.price).toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card border rounded-2xl p-6 shadow-sm">
              <h3 className="font-poppins font-bold text-lg mb-4 pb-2 border-b">Resumo</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>R$ {Number(pedido.subtotal).toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Frete</span>
                  <span>R$ {Number(pedido.frete).toFixed(2).replace('.', ',')}</span>
                </div>
                {Number(pedido.desconto) > 0 && (
                  <div className="flex justify-between text-secondary font-medium">
                    <span>Desconto</span>
                    <span>- R$ {Number(pedido.desconto).toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between items-center mt-3">
                  <span className="font-poppins font-bold text-base text-foreground">Total</span>
                  <span className="font-poppins font-black text-xl text-primary">
                    R$ {Number(pedido.total).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-2xl p-6 shadow-sm">
              <h3 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2 pb-2 border-b">
                <CreditCard className="w-5 h-5 text-primary" /> Pagamento
              </h3>
              <p className="text-sm font-medium text-foreground mb-1">{getPaymentMethod(pedido.metodo_pagamento)}</p>
              <p className="text-sm text-muted-foreground">Status: {getStatusLabel(pedido.status)}</p>
            </div>

            <div className="bg-card border rounded-2xl p-6 shadow-sm">
              <h3 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2 pb-2 border-b">
                <MapPin className="w-5 h-5 text-primary" /> Entrega
              </h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p className="font-bold text-foreground">{cliente.nome}</p>
                <p>{endereco.rua}, {endereco.numero} {endereco.complemento}</p>
                <p>{endereco.bairro}</p>
                <p>{endereco.cidade} - {endereco.estado}</p>
                <p>CEP: {endereco.cep}</p>
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button className="w-full gap-2 font-bold" variant="outline" disabled>
                  <Truck className="w-4 h-4" /> Rastrear Entrega
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}