import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Copy, MapPin, Package, CreditCard, ArrowRight, QrCode, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCarrinho } from '@/context/CarrinhoContext';
import ResumoPedido from '@/components/ResumoPedido';

export default function PedidoConfirmadoPage() {
  const { dadosCliente, endereco, metodoPagamento, items, limparCarrinho } = useCarrinho();
  const navigate = useNavigate();

  const numeroPedido = Math.floor(Math.random() * 900000) + 100000;
  const dataPedido = new Date().toLocaleDateString('pt-BR');

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
       if (items.length > 0) limparCarrinho();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getPaymentDetails = () => {
    switch(metodoPagamento) {
      case 'pix': return { name: 'Pix', icon: <QrCode className="w-5 h-5 text-[#00B1EA]"/>, msg: "Seu pagamento via Pix está sendo processado." };
      case 'boleto': return { name: 'Boleto Bancário', icon: <FileText className="w-5 h-5 text-[#F97316]"/>, msg: "Aguardando compensação do boleto (até 2 dias úteis)." };
      default: return { name: 'Cartão de Crédito', icon: <CreditCard className="w-5 h-5 text-[#3B82F6]"/>, msg: "Seu pagamento foi aprovado com sucesso!" };
    }
  };

  const payment = getPaymentDetails();

  return (
    <div className="min-h-screen bg-muted/20 pb-16">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-12">
        
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
            <CheckCircle2 className="w-14 h-14 text-success" />
          </div>
          <h1 className="text-4xl md:text-5xl font-poppins font-black text-foreground mb-4">Pedido Confirmado!</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Obrigado pela sua compra, <strong className="text-foreground">{dadosCliente?.nome?.split(' ')[0] || 'Cliente'}</strong>! {payment.msg}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm flex flex-col sm:flex-row justify-between gap-6 sm:gap-4">
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Número do Pedido</p>
                <p className="text-2xl font-black text-foreground">#{numeroPedido}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Data</p>
                <p className="text-lg font-medium">{dataPedido}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Status</p>
                <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold ${metodoPagamento === 'cartao' ? 'bg-success/20 text-success' : 'bg-amber-100 text-amber-800'}`}>
                  {metodoPagamento === 'cartao' ? 'Aprovado' : 'Aguardando Pagamento'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-primary">
                  <MapPin className="w-5 h-5" />
                  <h3 className="font-poppins font-bold text-lg text-foreground">Endereço de Entrega</h3>
                </div>
                <div className="text-muted-foreground leading-relaxed text-sm">
                  <p className="font-bold text-foreground text-base mb-1">{dadosCliente?.nome}</p>
                  <p>{endereco?.rua}, {endereco?.numero} {endereco?.complemento && `- ${endereco.complemento}`}</p>
                  <p>{endereco?.bairro}</p>
                  <p>{endereco?.cidade} - {endereco?.estado}</p>
                  <p>CEP: {endereco?.cep}</p>
                </div>
              </div>

              <div className="bg-card border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-primary">
                  <Package className="w-5 h-5" />
                  <h3 className="font-poppins font-bold text-lg text-foreground">Detalhes</h3>
                </div>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-bold text-foreground mb-1">Método de Pagamento</p>
                    <div className="flex items-center gap-2 text-muted-foreground font-medium">
                      {payment.icon} {payment.name}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-foreground mb-1">Previsão de Entrega</p>
                    <p className="text-success font-bold">
                      Em até 5 dias úteis
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button onClick={() => navigate('/')} className="flex-1 bg-primary text-white h-14 rounded-xl font-bold text-lg">
                Voltar ao Início
              </Button>
              <Button onClick={() => navigate('/produtos')} variant="outline" className="flex-1 border-2 border-primary text-primary h-14 rounded-xl font-bold text-lg">
                Continuar Comprando
              </Button>
            </div>

          </div>

          <div className="lg:col-span-4 space-y-6">
            <ResumoPedido showEdit={false} />
            
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <h4 className="font-poppins font-bold text-primary mb-4 flex items-center gap-2">
                Próximos Passos <ArrowRight className="w-4 h-4" />
              </h4>
              <ul className="text-sm text-foreground/80 space-y-3 font-medium">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  Você receberá um e-mail com os detalhes e a confirmação do pedido.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  Assim que o pagamento for aprovado, prepararemos o envio.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  Você poderá rastrear seu pacote acessando sua conta.
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}