
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Download, Database } from 'lucide-react';

export default function BackupExportSection() {
  const { toast } = useToast();

  const handleAction = (actionName) => {
    toast({
      title: "🚧 Funcionalidade não implementada",
      description: `A ação "${actionName}" estará disponível em breve! 🚀`,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Backup e Exportação</h2>
      <p className="text-muted-foreground">Exporte seus dados para planilhas ou faça um backup completo da sua conta.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg bg-card">
          <Database className="w-8 h-8 text-primary mb-4" />
          <h3 className="font-bold text-lg mb-2">Backup Completo</h3>
          <p className="text-sm text-muted-foreground mb-6">Gera um arquivo com todos os seus imóveis, leads e configurações.</p>
          <Button onClick={() => handleAction('Backup Completo')} className="w-full"><Download className="w-4 h-4 mr-2"/> Gerar Backup</Button>
        </div>

        <div className="p-6 border rounded-lg bg-card">
          <Database className="w-8 h-8 text-primary mb-4" />
          <h3 className="font-bold text-lg mb-2">Exportar Imóveis</h3>
          <p className="text-sm text-muted-foreground mb-6">Baixe sua lista de imóveis em formato CSV para usar no Excel.</p>
          <Button onClick={() => handleAction('Exportar CSV')} variant="outline" className="w-full"><Download className="w-4 h-4 mr-2"/> Exportar CSV</Button>
        </div>
      </div>
    </div>
  );
}
