
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function GestaoSEOSection() {
  const { toast } = useToast();
  return (
    <div className="p-6 bg-card rounded-lg border">
      <h2 className="text-2xl font-bold mb-4">Gestão SEO</h2>
      <p className="text-muted-foreground mb-6">Configure as tags de SEO dos seus imóveis para melhor ranqueamento no Google.</p>
      
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-lg font-medium mb-2">🚧 Módulo em construção</h3>
        <p className="text-muted-foreground mb-4">A gestão avançada de SEO estará disponível em breve.</p>
        <Button onClick={() => toast({ title: "Notificação ativada", description: "Avisaremos quando o módulo estiver pronto!" })}>
          Avise-me quando lançar
        </Button>
      </div>
    </div>
  );
}
