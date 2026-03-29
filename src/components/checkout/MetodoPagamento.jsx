import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, QrCode, FileText } from 'lucide-react';

export default function MetodoPagamento({ value, onChange }) {
  return (
    <RadioGroup 
      value={value}
      onValueChange={onChange}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
    >
      <div className="relative">
        <RadioGroupItem value="pix" id="pix" className="peer sr-only" />
        <Label 
          htmlFor="pix" 
          className="flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer hover:bg-muted transition-all peer-data-[state=checked]:border-[#00B1EA] peer-data-[state=checked]:bg-[#00B1EA]/5 h-full"
        >
          <QrCode className="w-8 h-8 text-[#00B1EA] mb-3" />
          <span className="font-bold text-foreground">Pix</span>
          <span className="text-xs text-[#00B1EA] font-semibold mt-1">Aprovação Imediata</span>
        </Label>
      </div>

      <div className="relative">
        <RadioGroupItem value="cartao" id="cartao" className="peer sr-only" />
        <Label 
          htmlFor="cartao" 
          className="flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer hover:bg-muted transition-all peer-data-[state=checked]:border-[#3B82F6] peer-data-[state=checked]:bg-[#3B82F6]/5 h-full"
        >
          <CreditCard className="w-8 h-8 text-[#3B82F6] mb-3" />
          <span className="font-bold text-foreground">Cartão</span>
          <span className="text-xs text-muted-foreground mt-1">Em até 12x</span>
        </Label>
      </div>

      <div className="relative">
        <RadioGroupItem value="boleto" id="boleto" className="peer sr-only" />
        <Label 
          htmlFor="boleto" 
          className="flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer hover:bg-muted transition-all peer-data-[state=checked]:border-[#F97316] peer-data-[state=checked]:bg-[#F97316]/5 h-full"
        >
          <FileText className="w-8 h-8 text-[#F97316] mb-3" />
          <span className="font-bold text-foreground">Boleto</span>
          <span className="text-xs text-muted-foreground mt-1">Vence em 2 dias</span>
        </Label>
      </div>
    </RadioGroup>
  );
}