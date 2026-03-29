import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCarrinho } from '@/context/CarrinhoContext';
import { useToast } from '@/components/ui/use-toast';
import { Truck } from 'lucide-react';
import { aplicarMascaraCEP } from '@/utils/mascaras';
import { calcularFrete } from '@/utils/frete';

export default function ResumoCarrinho() {
  const { subtotal, total, frete, desconto, aplicarDesconto, cupomAplicado, selecionarFrete } = useCarrinho();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [cupom, setCupom] = useState('');
  const [cep, setCep] = useState('');
  const [opcoesFrete, setOpcoesFrete] = useState([]);

  const handleAplicarCupom = () => {
    if (!cupom) return;
    const sucesso = aplicarDesconto(cupom);
    if (sucesso) {
      toast({ title: "Cupom aplicado!", description: "Desconto adicionado ao seu carrinho." });
    } else {
      toast({ title: "Cupom inválido", description: "Verifique o código e tente novamente.", variant: "destructive" });
    }
  };

  const handleCalcularFrete = () => {
    if (cep.length < 9) {
      toast({ title: "CEP inválido", description: "Digite um CEP completo.", variant: "destructive" });
      return;
    }
    const opcoes = calcularFrete(cep, subtotal);
    setOpcoesFrete(opcoes);
    // Select first option by default
    if (opcoes.length > 0) {
      selecionarFrete(opcoes[0].id, opcoes[0].valor);
    }
  };

  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm sticky top-24">
      <h3 className="font-poppins font-bold text-xl mb-6 border-b pb-4">Resumo do Pedido</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
        </div>
        
        {desconto > 0 && (
          <div className="flex justify-between text-secondary font-medium">
            <span>Desconto ({cupomAplicado})</span>
            <span>- R$ {desconto.toFixed(2).replace('.', ',')}</span>
          </div>
        )}

        <div className="flex justify-between text-muted-foreground">
          <span>Frete</span>
          <span>{frete === 0 && subtotal >= 150 ? <span className="text-secondary font-bold">Grátis</span> : `R$ ${frete.toFixed(2).replace('.', ',')}`}</span>
        </div>
      </div>

      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between items-center mb-1">
          <span className="font-poppins font-bold text-lg text-foreground">Total</span>
          <span className="font-poppins font-black text-3xl text-primary">
            R$ {total.toFixed(2).replace('.', ',')}
          </span>
        </div>
        <p className="text-xs text-muted-foreground text-right">Em até 12x no cartão</p>
      </div>

      {/* Cupom */}
      <div className="mb-6">
        <label className="text-sm font-bold text-foreground mb-2 block">Cupom de Desconto</label>
        <div className="flex gap-2">
          <Input 
            placeholder="Ex: ROSA10" 
            value={cupom}
            onChange={(e) => setCupom(e.target.value)}
            disabled={!!cupomAplicado}
            className="uppercase"
          />
          <Button onClick={handleAplicarCupom} variant="outline" disabled={!!cupomAplicado || !cupom}>
            Aplicar
          </Button>
        </div>
      </div>

      {/* Frete Calc */}
      <div className="mb-8">
        <label className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
          <Truck className="w-4 h-4" /> Calcular Frete
        </label>
        <div className="flex gap-2 mb-3">
          <Input 
            placeholder="00000-000" 
            value={cep}
            onChange={(e) => setCep(aplicarMascaraCEP(e.target.value))}
            maxLength={9}
          />
          <Button onClick={handleCalcularFrete} variant="outline">OK</Button>
        </div>
        
        {opcoesFrete.length > 0 && (
          <div className="space-y-2 mt-4 bg-muted/50 p-3 rounded-lg border">
            {opcoesFrete.map(opcao => (
              <label key={opcao.id} className="flex items-center justify-between text-sm cursor-pointer hover:bg-muted p-1 rounded transition-colors">
                <div className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="frete" 
                    checked={frete === opcao.valor}
                    onChange={() => selecionarFrete(opcao.id, opcao.valor)}
                    className="text-primary focus:ring-primary accent-primary"
                  />
                  <span>{opcao.nome}</span>
                </div>
                <span className="font-bold">{opcao.valor === 0 ? 'Grátis' : `R$ ${opcao.valor.toFixed(2).replace('.', ',')}`}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <Button 
          onClick={() => navigate('/checkout')} 
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 text-lg rounded-xl transition-transform active:scale-[0.98]"
        >
          Ir para o Checkout
        </Button>
        <Button 
          onClick={() => navigate('/produtos')} 
          variant="outline"
          className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold h-12 rounded-xl transition-colors"
        >
          Continuar Comprando
        </Button>
      </div>
    </div>
  );
}