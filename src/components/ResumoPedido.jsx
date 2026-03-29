import React from 'react';
import { useCarrinho } from '@/context/CarrinhoContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function ResumoPedido({ showEdit = true }) {
  const { items, subtotal, frete, desconto, total } = useCarrinho();
  const navigate = useNavigate();

  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm sticky top-24">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h3 className="font-poppins font-bold text-xl">Resumo do Pedido</h3>
        {showEdit && (
          <Button variant="link" onClick={() => navigate('/carrinho')} className="text-primary p-0 h-auto font-medium">
            Editar
          </Button>
        )}
      </div>

      <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {items.map(item => (
          <div key={item.id} className="flex gap-3">
            <div className="w-16 h-16 bg-muted rounded border flex-shrink-0">
              <img src={item.imagem} alt={item.nome} className="w-full h-full object-cover rounded" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h4 className="font-medium text-sm line-clamp-2 leading-tight mb-1">{item.nome}</h4>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Qtd: {item.quantidade}</span>
                <span className="font-bold">R$ {(item.price * item.quantidade).toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 mb-6 pt-4 border-t border-dashed">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Frete</span>
          <span>{frete === 0 && subtotal > 0 ? <span className="text-secondary font-bold">Grátis</span> : `R$ ${frete.toFixed(2).replace('.', ',')}`}</span>
        </div>
        {desconto > 0 && (
          <div className="flex justify-between text-sm text-secondary font-medium">
            <span>Desconto</span>
            <span>- R$ {desconto.toFixed(2).replace('.', ',')}</span>
          </div>
        )}
      </div>

      <div className="border-t pt-4 bg-muted/30 -mx-6 px-6 -mb-6 pb-6 rounded-b-xl">
        <div className="flex justify-between items-center">
          <span className="font-poppins font-bold text-lg text-foreground">Total</span>
          <span className="font-poppins font-black text-3xl text-primary">
            R$ {total.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>
    </div>
  );
}