import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PagamentoPix({ qrCode, pixKey, amount }) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('pending'); // pending, approved

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey || '00020101021126580014br.gov.bcb.pix...');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simulate polling
  useEffect(() => {
    const timer = setTimeout(() => setStatus('approved'), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-muted/20 border rounded-xl animate-in fade-in duration-300">
      <h3 className="font-poppins font-bold text-lg mb-2">Pague com Pix</h3>
      <p className="text-sm text-muted-foreground mb-6 text-center">
        Escaneie o QR Code ou copie o código abaixo para pagar via Pix. A aprovação é instantânea.
      </p>

      {status === 'pending' ? (
        <>
          <div className="p-4 bg-white rounded-xl shadow-sm border mb-6">
            <QRCodeSVG value={qrCode || "dummy-pix-code"} size={160} />
          </div>

          <div className="w-full max-w-sm">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block text-center">
              Código Pix (Copia e Cola)
            </label>
            <div className="flex bg-background border rounded-lg overflow-hidden h-12">
              <input 
                type="text" 
                readOnly 
                value={pixKey || "00020126580014br.gov.bcb.pix0136..."} 
                className="flex-1 px-4 text-sm font-mono bg-transparent outline-none truncate"
              />
              <Button 
                onClick={handleCopy}
                className="rounded-none h-full px-6 bg-primary hover:bg-primary/90 text-white font-bold gap-2"
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado' : 'Copiar'}
              </Button>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm font-medium text-amber-600 bg-amber-50 px-4 py-2 rounded-full">
            <Loader2 className="w-4 h-4 animate-spin" /> Aguardando pagamento...
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center py-8">
          <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-success" />
          </div>
          <h4 className="font-poppins font-bold text-success text-xl mb-1">Pagamento Aprovado!</h4>
          <p className="text-muted-foreground">Seu pedido já está sendo processado.</p>
        </div>
      )}
    </div>
  );
}