import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { buscarPedidosUsuario } from '@/services/supabasePedidos';
import { useNavigate, Link } from 'react-router-dom';
import { Package, ChevronRight, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MeusPedidosPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      buscarPedidosUsuario(user.id)
        .then(data => setPedidos(data || []))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const translateStatus = (status) => {
    switch (status) {
      case 'approved': return { label: 'Aprovado', class: 'bg-success/20 text-success' };
      case 'pending': return { label: 'Pendente', class: 'bg-amber-100 text-amber-800' };
      case 'rejected': return { label: 'Rejeitado', class: 'bg-destructive/20 text-destructive' };
      default: return { label: 'Processando', class: 'bg-muted text-muted-foreground' };
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-16">
      <div className="bg-background py-8 border-b">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          <nav className="flex items-center text-sm text-muted-foreground mb-4 font-medium">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link to="/perfil" className="hover:text-primary transition-colors">Perfil</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-foreground">Meus Pedidos</span>
          </nav>
          <h1 className="text-3xl font-poppins font-black text-foreground">Meus Pedidos</h1>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground font-medium">Carregando pedidos...</p>
          </div>
        ) : pedidos.length === 0 ? (
          <div className="bg-card border rounded-2xl p-12 text-center shadow-sm">
            <Package className="w-20 h-20 mx-auto mb-6 text-muted-foreground opacity-30" />
            <h2 className="text-2xl font-poppins font-bold mb-2">Nenhum pedido encontrado</h2>
            <p className="text-muted-foreground mb-8">Você ainda não realizou nenhuma compra conosco.</p>
            <Button onClick={() => navigate('/produtos')} className="font-bold h-14 px-8 text-lg rounded-xl">
              Explorar Produtos
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {pedidos.map(pedido => {
              const statusInfo = translateStatus(pedido.status);
              return (
                <div key={pedido.id} className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center justify-between md:justify-start gap-4 border-b md:border-none pb-4 md:pb-0">
                        <div>
                          <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Pedido</p>
                          <p className="font-poppins font-black text-xl">#{pedido.numero_pedido}</p>
                        </div>
                        <div className="hidden md:block w-px h-10 bg-border"></div>
                        <div className="text-right md:text-left">
                          <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Data</p>
                          <p className="font-medium text-foreground">{new Date(pedido.created_at).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div className="hidden md:block w-px h-10 bg-border"></div>
                        <div className="hidden md:block">
                          <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Total</p>
                          <p className="font-bold text-primary text-lg">R$ {Number(pedido.total).toFixed(2).replace('.', ',')}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusInfo.class}`}>
                          {statusInfo.label}
                        </span>
                        <span className="text-sm text-muted-foreground font-medium">
                          {pedido.metodo_pagamento === 'pix' ? 'Pix' : pedido.metodo_pagamento === 'boleto' ? 'Boleto' : 'Cartão de Crédito'}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-end border-t md:border-none pt-4 md:pt-0 gap-2">
                      <div className="md:hidden flex justify-between items-center mb-2">
                        <span className="font-bold text-muted-foreground">Total:</span>
                        <span className="font-bold text-primary text-xl">R$ {Number(pedido.total).toFixed(2).replace('.', ',')}</span>
                      </div>
                      <Button onClick={() => navigate(`/pedido/${pedido.id}`)} variant="outline" className="w-full md:w-auto h-12 font-bold gap-2 border-2">
                        Ver Detalhes <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}