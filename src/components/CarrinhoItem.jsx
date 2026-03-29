import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCarrinho } from '@/context/CarrinhoContext';

export default function CarrinhoItem({ item }) {
  const { atualizarQuantidade, removerDoCarrinho } = useCarrinho();

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-muted flex-shrink-0 overflow-hidden border">
        <img src={item.imagem} alt={item.nome} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-2">
          <div>
            <span className="text-xs text-muted-foreground uppercase font-bold">{item.categoria}</span>
            <h3 className="font-poppins font-bold text-foreground text-sm md:text-base line-clamp-2">{item.nome}</h3>
          </div>
          <button 
            onClick={() => removerDoCarrinho(item.id)}
            className="text-muted-foreground hover:text-destructive transition-colors p-1"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-end justify-between mt-4">
          <div className="flex items-center border rounded-lg overflow-hidden h-9 bg-background">
            <button 
              onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
              className="w-8 h-full flex items-center justify-center hover:bg-muted text-foreground transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-bold text-sm">
              {item.quantidade}
            </span>
            <button 
              onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
              className="w-8 h-full flex items-center justify-center hover:bg-muted text-foreground transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="text-right">
            <div className="text-xs text-muted-foreground">R$ {Number(item.price).toFixed(2).replace('.', ',')} / un</div>
            <div className="font-poppins font-bold text-primary text-lg">
              R$ {(item.price * item.quantidade).toFixed(2).replace('.', ',')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}