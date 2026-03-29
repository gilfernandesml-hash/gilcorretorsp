import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Loader2, Lock } from 'lucide-react';
import { useCarrinho } from '@/context/CarrinhoContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { aplicarMascaraTelefone, aplicarMascaraCPF } from '@/utils/mascaras';
import { validarFormularioCheckout } from '@/utils/validacao';
import BuscadorCEP from '@/components/BuscadorCEP';
import ResumoPedido from '@/components/ResumoPedido';

// Import Payment Components
import MetodoPagamento from '@/components/checkout/MetodoPagamento';
import PagamentoPix from '@/components/checkout/PagamentoPix';
import PagamentoCartao from '@/components/checkout/PagamentoCartao';
import PagamentoBoleto from '@/components/checkout/PagamentoBoleto';

import { createPreference, processCardPayment, validateCardToken } from '@/services/mercadoPagoService';

export default function CheckoutPage() {
  const { items, subtotal, frete, total, setDadosCliente, setEndereco, setMetodoPagamento: setContextMP } = useCarrinho();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('form'); // form, processing, pix_waiting, boleto_generated
  const [preferenceData, setPreferenceData] = useState(null);

  const [formData, setFormData] = useState({
    nome: '', email: '', telefone: '', cpf: '',
    cep: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '',
    metodoPagamento: 'cartao',
    numeroCartao: '', nomeCartao: '', validadeCartao: '', cvvCartao: '', parcelas: '1',
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    if (items.length === 0 && checkoutStep === 'form') {
      navigate('/carrinho');
    }
  }, [items, navigate, checkoutStep]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'telefone') formattedValue = aplicarMascaraTelefone(value);
    if (name === 'cpf') formattedValue = aplicarMascaraCPF(value);

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleAddressFound = (address) => {
    setFormData(prev => ({
      ...prev, rua: address.rua, bairro: address.bairro, cidade: address.cidade, estado: address.estado
    }));
    setErrors(prev => ({ ...prev, cep: null, rua: null, bairro: null, cidade: null, estado: null }));
  };

  const handleFinalize = async (e) => {
    e.preventDefault();
    
    const validationErrors = validarFormularioCheckout(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorField = document.querySelector(`[name="${Object.keys(validationErrors)[0]}"]`);
      if (firstErrorField) firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      toast({ title: "Verifique os dados", description: "Por favor, corrija os erros no formulário.", variant: "destructive" });
      return;
    }

    setIsProcessing(true);

    try {
      // Sync Context
      setDadosCliente({ nome: formData.nome, email: formData.email, telefone: formData.telefone, cpf: formData.cpf });
      setEndereco({ cep: formData.cep, rua: formData.rua, numero: formData.numero, complemento: formData.complemento, bairro: formData.bairro, cidade: formData.cidade, estado: formData.estado });
      setContextMP(formData.metodoPagamento);

      const payer = { email: formData.email, first_name: formData.nome, identification: { type: "CPF", number: formData.cpf.replace(/\D/g, '') } };

      if (formData.metodoPagamento === 'pix' || formData.metodoPagamento === 'boleto') {
        const pref = await createPreference(items, payer, formData.metodoPagamento);
        setPreferenceData(pref);
        setCheckoutStep(formData.metodoPagamento === 'pix' ? 'pix_waiting' : 'boleto_generated');
        setIsProcessing(false);
        
        // Navigate after short delay for Boleto, for Pix wait user action
        if (formData.metodoPagamento === 'boleto') {
          setTimeout(() => navigate('/pedido-confirmado'), 5000);
        }
      } else {
        // Cartão de Crédito
        const token = await validateCardToken(formData);
        await processCardPayment(token, formData.parcelas, total, payer);
        
        // Simulate Order Creation in DB here (Edge function would do this in real app via webhook, or frontend triggers insert)
        navigate('/pedido-confirmado');
      }
    } catch (err) {
      toast({ title: "Erro no pagamento", description: "Ocorreu um erro ao processar seu pagamento. Tente novamente.", variant: "destructive" });
      setIsProcessing(false);
    }
  };

  const ErrorMsg = ({ field }) => errors[field] ? <span className="text-xs text-destructive mt-1 block">{errors[field]}</span> : null;

  if (items.length === 0 && checkoutStep === 'form') return null;

  return (
    <div className="min-h-screen bg-muted/30 pb-16">
      <div className="bg-background py-8 border-b">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-poppins font-bold text-foreground">Finalizar Compra</h1>
          <div className="hidden sm:flex items-center text-muted-foreground gap-2 text-sm font-medium">
            <Lock className="w-4 h-4 text-success" /> Ambiente Seguro
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center text-sm text-muted-foreground mb-8 font-medium">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/carrinho" className="hover:text-primary transition-colors">Carrinho</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-foreground">Checkout</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="lg:col-span-8">
            {checkoutStep === 'form' && (
              <form onSubmit={handleFinalize} className="space-y-8">
                
                {/* 1. Dados Pessoais */}
                <section className="bg-card p-6 md:p-8 rounded-2xl border shadow-sm space-y-4">
                  <h2 className="font-poppins font-bold text-xl flex items-center gap-3 mb-6">
                    <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span> 
                    Dados Pessoais
                  </h2>
                  <div className="space-y-2">
                    <Label>Nome Completo</Label>
                    <Input name="nome" value={formData.nome} onChange={handleChange} className={`h-12 ${errors.nome ? 'border-destructive' : ''}`} />
                    <ErrorMsg field="nome" />
                  </div>
                  <div className="space-y-2">
                    <Label>E-mail</Label>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} className={`h-12 ${errors.email ? 'border-destructive' : ''}`} />
                    <ErrorMsg field="email" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Telefone</Label>
                      <Input name="telefone" placeholder="(00) 00000-0000" value={formData.telefone} onChange={handleChange} maxLength={15} className={`h-12 ${errors.telefone ? 'border-destructive' : ''}`} />
                      <ErrorMsg field="telefone" />
                    </div>
                    <div className="space-y-2">
                      <Label>CPF</Label>
                      <Input name="cpf" placeholder="000.000.000-00" value={formData.cpf} onChange={handleChange} maxLength={14} className={`h-12 ${errors.cpf ? 'border-destructive' : ''}`} />
                      <ErrorMsg field="cpf" />
                    </div>
                  </div>
                </section>

                {/* 2. Endereço */}
                <section className="bg-card p-6 md:p-8 rounded-2xl border shadow-sm space-y-4">
                  <h2 className="font-poppins font-bold text-xl flex items-center gap-3 mb-6">
                    <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span> 
                    Endereço de Entrega
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2 md:col-span-1">
                      <Label>CEP</Label>
                      <BuscadorCEP value={formData.cep} onChange={(val) => setFormData(p => ({...p, cep: val}))} onAddressFound={handleAddressFound} error={errors.cep} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Rua</Label>
                      <Input name="rua" value={formData.rua} onChange={handleChange} className={`h-12 ${errors.rua ? 'border-destructive' : ''}`} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2 md:col-span-1">
                      <Label>Número</Label>
                      <Input name="numero" value={formData.numero} onChange={handleChange} className={`h-12 ${errors.numero ? 'border-destructive' : ''}`} />
                      <ErrorMsg field="numero" />
                    </div>
                    <div className="space-y-2 md:col-span-3">
                      <Label>Complemento</Label>
                      <Input name="complemento" value={formData.complemento} onChange={handleChange} className="h-12" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Bairro</Label>
                      <Input name="bairro" value={formData.bairro} onChange={handleChange} className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label>Cidade</Label>
                      <Input name="cidade" value={formData.cidade} onChange={handleChange} className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label>Estado (UF)</Label>
                      <Input name="estado" value={formData.estado} onChange={handleChange} maxLength={2} className="h-12 uppercase" />
                    </div>
                  </div>
                </section>

                {/* 3. Pagamento */}
                <section className="bg-card p-6 md:p-8 rounded-2xl border shadow-sm space-y-6">
                  <h2 className="font-poppins font-bold text-xl flex items-center gap-3 mb-6">
                    <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span> 
                    Método de Pagamento
                  </h2>
                  
                  <MetodoPagamento 
                    value={formData.metodoPagamento} 
                    onChange={(val) => {
                      setFormData(p => ({ ...p, metodoPagamento: val }));
                      setErrors({});
                    }} 
                  />

                  {formData.metodoPagamento === 'cartao' && (
                    <PagamentoCartao formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} amount={total} />
                  )}
                </section>

                <Button 
                  type="submit" 
                  disabled={isProcessing}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-16 text-lg rounded-xl shadow-lg transition-all active:scale-[0.98]"
                >
                  {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Finalizar Compra Seguro'}
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-4">
                  <Lock className="w-4 h-4" /> Seus dados estão protegidos.
                </div>
              </form>
            )}

            {checkoutStep === 'pix_waiting' && (
              <div className="bg-card p-8 rounded-2xl border shadow-sm text-center">
                <PagamentoPix qrCode={preferenceData?.qr_code} pixKey={preferenceData?.qr_code_base64} amount={total} />
                <Button onClick={() => navigate('/pedido-confirmado')} className="mt-8 bg-primary text-white font-bold h-14 px-8 rounded-xl">
                  Já realizei o pagamento
                </Button>
              </div>
            )}

            {checkoutStep === 'boleto_generated' && (
              <div className="bg-card p-8 rounded-2xl border shadow-sm">
                <PagamentoBoleto barcode={preferenceData?.barcode} boletoUrl={preferenceData?.boleto_url} />
                <div className="text-center mt-8">
                  <Button onClick={() => navigate('/pedido-confirmado')} variant="outline" className="font-bold h-14 px-8 border-2 rounded-xl">
                    Ver Detalhes do Pedido
                  </Button>
                </div>
              </div>
            )}

          </div>
          
          <div className="lg:col-span-4">
            <ResumoPedido showEdit={checkoutStep === 'form'} />
          </div>
        </div>
      </div>
    </div>
  );
}