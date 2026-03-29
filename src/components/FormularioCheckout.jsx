import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import BuscadorCEP from './BuscadorCEP';
import { 
  aplicarMascaraTelefone, aplicarMascaraCPF, aplicarMascaraCartao, aplicarMascaraData 
} from '@/utils/mascaras';
import { validarFormularioCheckout } from '@/utils/validacao';
import { calcularFrete } from '@/utils/frete';
import { useCarrinho } from '@/context/CarrinhoContext';
import { CreditCard, QrCode, FileText, CheckCircle2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FormularioCheckout({ onSubmit }) {
  const { subtotal, frete, selecionarFrete, setDadosCliente, setEndereco, setMetodoPagamento: setContextMetodoPagamento } = useCarrinho();
  
  const [formData, setFormData] = useState({
    nome: '', email: '', telefone: '', cpf: '',
    cep: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '',
    metodoPagamento: 'cartao',
    numeroCartao: '', nomeCartao: '', validadeCartao: '', cvvCartao: '', parcelas: '1',
    termos: false
  });
  
  const [errors, setErrors] = useState({});
  const [opcoesFrete, setOpcoesFrete] = useState([]);

  // Load initial frete based on context/empty state
  useEffect(() => {
    if (formData.cep.length === 9) {
      const opcoes = calcularFrete(formData.cep, subtotal);
      setOpcoesFrete(opcoes);
      if (opcoes.length > 0 && frete === 0) {
        selecionarFrete(opcoes[0].id, opcoes[0].valor);
      }
    }
  }, [formData.cep, subtotal, frete, selecionarFrete]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'telefone') formattedValue = aplicarMascaraTelefone(value);
    if (name === 'cpf') formattedValue = aplicarMascaraCPF(value);
    if (name === 'numeroCartao') formattedValue = aplicarMascaraCartao(value);
    if (name === 'validadeCartao') formattedValue = aplicarMascaraData(value);

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleAddressFound = (address) => {
    setFormData(prev => ({
      ...prev,
      rua: address.rua,
      bairro: address.bairro,
      cidade: address.cidade,
      estado: address.estado
    }));
    setErrors(prev => ({ ...prev, cep: null, rua: null, bairro: null, cidade: null, estado: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termos) {
      setErrors(prev => ({ ...prev, termos: "Você precisa aceitar os termos" }));
      return;
    }

    const validationErrors = validarFormularioCheckout(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error roughly
      const firstErrorField = document.querySelector(`[name="${Object.keys(validationErrors)[0]}"]`);
      if (firstErrorField) firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Update Context
    setDadosCliente({
      nome: formData.nome, email: formData.email, telefone: formData.telefone, cpf: formData.cpf
    });
    setEndereco({
      cep: formData.cep, rua: formData.rua, numero: formData.numero, 
      complemento: formData.complemento, bairro: formData.bairro, 
      cidade: formData.cidade, estado: formData.estado
    });
    setContextMetodoPagamento(formData.metodoPagamento);

    onSubmit();
  };

  const ErrorMsg = ({ field }) => errors[field] ? <span className="text-xs text-destructive mt-1 block">{errors[field]}</span> : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* 1. Dados Pessoais */}
      <section className="bg-card p-6 rounded-xl border shadow-sm space-y-4">
        <h2 className="font-poppins font-bold text-xl flex items-center gap-2 mb-4"><span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span> Dados Pessoais</h2>
        
        <div className="space-y-2">
          <Label htmlFor="nome">Nome Completo</Label>
          <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} className={errors.nome ? 'border-destructive' : ''} />
          <ErrorMsg field="nome" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={errors.email ? 'border-destructive' : ''} />
          <ErrorMsg field="email" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input id="telefone" name="telefone" placeholder="(00) 00000-0000" value={formData.telefone} onChange={handleChange} maxLength={15} className={errors.telefone ? 'border-destructive' : ''} />
            <ErrorMsg field="telefone" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input id="cpf" name="cpf" placeholder="000.000.000-00" value={formData.cpf} onChange={handleChange} maxLength={14} className={errors.cpf ? 'border-destructive' : ''} />
            <ErrorMsg field="cpf" />
          </div>
        </div>
      </section>

      {/* 2. Endereço */}
      <section className="bg-card p-6 rounded-xl border shadow-sm space-y-4">
        <h2 className="font-poppins font-bold text-xl flex items-center gap-2 mb-4"><span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span> Endereço de Entrega</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2 md:col-span-1">
            <Label htmlFor="cep">CEP</Label>
            <BuscadorCEP 
              value={formData.cep} 
              onChange={(val) => setFormData(p => ({...p, cep: val}))} 
              onAddressFound={handleAddressFound}
              error={errors.cep}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="rua">Rua</Label>
            <Input id="rua" name="rua" value={formData.rua} onChange={handleChange} className={errors.rua ? 'border-destructive' : ''} />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2 md:col-span-1">
            <Label htmlFor="numero">Número</Label>
            <Input id="numero" name="numero" value={formData.numero} onChange={handleChange} className={errors.numero ? 'border-destructive' : ''} />
            <ErrorMsg field="numero" />
          </div>
          <div className="space-y-2 md:col-span-3">
            <Label htmlFor="complemento">Complemento (opcional)</Label>
            <Input id="complemento" name="complemento" value={formData.complemento} onChange={handleChange} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bairro">Bairro</Label>
            <Input id="bairro" name="bairro" value={formData.bairro} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cidade">Cidade</Label>
            <Input id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="estado">Estado (UF)</Label>
            <Input id="estado" name="estado" value={formData.estado} onChange={handleChange} maxLength={2} className="uppercase" />
          </div>
        </div>
      </section>

      {/* 3. Frete */}
      {opcoesFrete.length > 0 && (
        <section className="bg-card p-6 rounded-xl border shadow-sm space-y-4">
          <h2 className="font-poppins font-bold text-xl flex items-center gap-2 mb-4"><span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span> Opções de Entrega</h2>
          <div className="space-y-3">
            {opcoesFrete.map(opcao => (
              <label key={opcao.id} className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors ${frete === opcao.valor ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="frete_checkout" 
                    checked={frete === opcao.valor}
                    onChange={() => selecionarFrete(opcao.id, opcao.valor)}
                    className="text-primary focus:ring-primary accent-primary w-4 h-4"
                  />
                  <span className="font-medium">{opcao.nome}</span>
                </div>
                <span className="font-bold text-primary">{opcao.valor === 0 ? 'Grátis' : `R$ ${opcao.valor.toFixed(2).replace('.', ',')}`}</span>
              </label>
            ))}
          </div>
        </section>
      )}

      {/* 4. Pagamento */}
      <section className="bg-card p-6 rounded-xl border shadow-sm space-y-6">
        <h2 className="font-poppins font-bold text-xl flex items-center gap-2 mb-4"><span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span> Pagamento</h2>
        
        <RadioGroup 
          defaultValue="cartao" 
          value={formData.metodoPagamento}
          onValueChange={(val) => {
            setFormData(p => ({ ...p, metodoPagamento: val }));
            setErrors({}); // Clear payment errors when changing method
          }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
            <RadioGroupItem value="cartao" id="cartao" />
            <Label htmlFor="cartao" className="flex items-center gap-2 cursor-pointer w-full font-medium">
              <CreditCard className="w-5 h-5 text-primary" /> Cartão
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
            <RadioGroupItem value="pix" id="pix" />
            <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer w-full font-medium">
              <QrCode className="w-5 h-5 text-secondary" /> Pix
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
            <RadioGroupItem value="boleto" id="boleto" />
            <Label htmlFor="boleto" className="flex items-center gap-2 cursor-pointer w-full font-medium">
              <FileText className="w-5 h-5 text-muted-foreground" /> Boleto
            </Label>
          </div>
        </RadioGroup>

        {/* Dynamic Payment Fields */}
        <div className="pt-4 border-t">
          {formData.metodoPagamento === 'cartao' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="space-y-2">
                <Label htmlFor="numeroCartao">Número do Cartão</Label>
                <Input id="numeroCartao" name="numeroCartao" placeholder="0000 0000 0000 0000" value={formData.numeroCartao} onChange={handleChange} maxLength={19} className={errors.numeroCartao ? 'border-destructive' : ''} />
                <ErrorMsg field="numeroCartao" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nomeCartao">Nome impresso no Cartão</Label>
                <Input id="nomeCartao" name="nomeCartao" value={formData.nomeCartao} onChange={handleChange} className={`uppercase ${errors.nomeCartao ? 'border-destructive' : ''}`} />
                <ErrorMsg field="nomeCartao" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="validadeCartao">Validade</Label>
                  <Input id="validadeCartao" name="validadeCartao" placeholder="MM/AA" value={formData.validadeCartao} onChange={handleChange} maxLength={5} className={errors.validadeCartao ? 'border-destructive' : ''} />
                  <ErrorMsg field="validadeCartao" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvvCartao">CVV</Label>
                  <Input id="cvvCartao" name="cvvCartao" placeholder="123" value={formData.cvvCartao} onChange={handleChange} maxLength={4} className={errors.cvvCartao ? 'border-destructive' : ''} />
                  <ErrorMsg field="cvvCartao" />
                </div>
              </div>
            </div>
          )}

          {formData.metodoPagamento === 'pix' && (
            <div className="text-center p-6 bg-muted/30 rounded-lg border animate-in fade-in duration-300">
              <QrCode className="w-24 h-24 mx-auto text-secondary mb-4 opacity-50" />
              <h4 className="font-bold text-lg mb-2">Pagamento rápido e seguro</h4>
              <p className="text-sm text-muted-foreground mb-4">O código Pix será gerado na próxima etapa após confirmar o pedido. A aprovação é imediata.</p>
              <div className="flex items-center justify-center gap-2 text-secondary font-medium bg-secondary/10 p-2 rounded inline-flex">
                <CheckCircle2 className="w-5 h-5" /> 5% de desconto extra no Pix (simulado)
              </div>
            </div>
          )}

          {formData.metodoPagamento === 'boleto' && (
            <div className="text-center p-6 bg-muted/30 rounded-lg border animate-in fade-in duration-300">
              <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
              <h4 className="font-bold text-lg mb-2">Boleto Bancário</h4>
              <p className="text-sm text-muted-foreground">O boleto será gerado após a confirmação. O prazo de compensação é de até 2 dias úteis após o pagamento.</p>
            </div>
          )}
        </div>
      </section>

      {/* 5. Termos */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="termos" 
            checked={formData.termos}
            onCheckedChange={(c) => setFormData(p => ({...p, termos: c}))}
            className={errors.termos ? 'border-destructive' : ''}
          />
          <Label htmlFor="termos" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Eu concordo com os Termos e Condições e Políticas de Privacidade.
          </Label>
        </div>
        <ErrorMsg field="termos" />
      </section>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 text-lg rounded-xl shadow-lg transition-transform active:scale-[0.98]">
        Finalizar Compra
      </Button>
    </form>
  );
}