import React, { useState } from 'react';
import { Copy, Download, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PagamentoBoleto({ barcode, boletoUrl }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(barcode || '34191.09008 63571.277308 71444.640008 5 90000000000000');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-muted/20 border rounded-xl animate-in fade-in duration-300 text-center">
      <FileText className="w-16 h-16 text-payment-method-boleto mb-4 opacity-80" />
      <h3 className="font-poppins font-bold text-lg mb-2">Boleto Bancário Gerado</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-md">
        O prazo de compensação do boleto é de até 2 dias úteis. Seu pedido será enviado assim que o pagamento for confirmado.
      </p>

      <div className="w-full max-w-sm mb-6">
        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block text-center">
          Código de Barras
        </label>
        <div className="flex bg-background border rounded-lg overflow-hidden h-12">
          <input 
            type="text" 
            readOnly 
            value={barcode || "34191.09008 63571.277308 71444.640008 5 90000000000000"} 
            className="flex-1 px-4 text-sm font-mono bg-transparent outline-none text-center"
          />
        </div>
      </div>

      <div className="flex gap-3 w-full max-w-sm">
        <Button 
          variant="outline"
          onClick={handleCopy}
          className="flex-1 h-12 font-bold gap-2 border-2"
        >
          {copied ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copiado' : 'Copiar Código'}
        </Button>
        <Button 
          onClick={() => window.open(boletoUrl || '#', '_blank')}
          className="flex-1 h-12 font-bold gap-2 bg-slate-800 hover:bg-slate-700 text-white"
        >
          <Download className="w-4 h-4" /> Baixar Boleto
        </Button>
      </div>
    </div>
  );
}