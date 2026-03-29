import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { aplicarMascaraCartao, aplicarMascaraData } from '@/utils/mascaras';
import { formatCurrency, calculateInstallmentValue } from '@/services/mercadoPagoService';
import { ShieldCheck } from 'lucide-react';

export default function PagamentoCartao({ formData, setFormData, errors, setErrors, amount }) {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'numeroCartao') formattedValue = aplicarMascaraCartao(value);
    if (name === 'validadeCartao') formattedValue = aplicarMascaraData(value);

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleInstallmentChange = (val) => {
    setFormData(prev => ({ ...prev, parcelas: val }));
  };

  const ErrorMsg = ({ field }) => errors[field] ? <span className="text-xs text-destructive mt-1 block">{errors[field]}</span> : null;

  const installmentOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-top-4 duration-300 p-6 bg-muted/10 border rounded-xl">
      <div className="flex items-center gap-2 mb-2 text-success font-medium bg-success/10 p-3 rounded-lg">
        <ShieldCheck className="w-5 h-5" />
        <span className="text-sm">Pagamento seguro processado via Mercado Pago</span>
      </div>

      <div className="space-y-2">
        <Label htmlFor="numeroCartao">Número do Cartão</Label>
        <Input 
          id="numeroCartao" 
          name="numeroCartao" 
          placeholder="0000 0000 0000 0000" 
          value={formData.numeroCartao || ''} 
          onChange={handleChange} 
          maxLength={19} 
          className={`h-12 text-lg ${errors.numeroCartao ? 'border-destructive' : ''}`} 
        />
        <ErrorMsg field="numeroCartao" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nomeCartao">Nome impresso no Cartão</Label>
        <Input 
          id="nomeCartao" 
          name="nomeCartao" 
          value={formData.nomeCartao || ''} 
          onChange={handleChange} 
          className={`h-12 uppercase ${errors.nomeCartao ? 'border-destructive' : ''}`} 
        />
        <ErrorMsg field="nomeCartao" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="validadeCartao">Validade</Label>
          <Input 
            id="validadeCartao" 
            name="validadeCartao" 
            placeholder="MM/AA" 
            value={formData.validadeCartao || ''} 
            onChange={handleChange} 
            maxLength={5} 
            className={`h-12 ${errors.validadeCartao ? 'border-destructive' : ''}`} 
          />
          <ErrorMsg field="validadeCartao" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvvCartao">CVV</Label>
          <Input 
            id="cvvCartao" 
            name="cvvCartao" 
            placeholder="123" 
            value={formData.cvvCartao || ''} 
            onChange={handleChange} 
            maxLength={4} 
            className={`h-12 ${errors.cvvCartao ? 'border-destructive' : ''}`} 
          />
          <ErrorMsg field="cvvCartao" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="parcelas">Parcelas</Label>
        <Select value={formData.parcelas || "1"} onValueChange={handleInstallmentChange}>
          <SelectTrigger className="h-12 bg-background font-medium">
            <SelectValue placeholder="Selecione o parcelamento" />
          </SelectTrigger>
          <SelectContent>
            {installmentOptions.map(num => {
              const instVal = calculateInstallmentValue(amount, num);
              const label = num === 1 
                ? `1x de ${formatCurrency(amount)} (Sem juros)`
                : `${num}x de ${formatCurrency(instVal)} ${num <= 3 ? '(Sem juros)' : '(Com juros)'}`;
              return <SelectItem key={num} value={num.toString()}>{label}</SelectItem>;
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}