
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Upload } from 'lucide-react';

export default function ImportarCSVSection() {
  const { toast } = useToast();

  const handleImport = () => {
    toast({
      title: "🚧 Funcionalidade não implementada",
      description: "A importação de CSV será liberada na próxima atualização. 🚀",
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-card rounded-lg border shadow-sm text-center">
      <h2 className="text-2xl font-bold mb-4">Importar CSV</h2>
      <p className="text-muted-foreground mb-8">Importe múltiplos imóveis de uma só vez usando uma planilha CSV.</p>
      
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 mb-6 flex flex-col items-center justify-center bg-muted/20">
        <Upload className="w-12 h-12 text-muted-foreground mb-4" />
        <p className="font-medium mb-2">Arraste seu arquivo CSV aqui</p>
        <p className="text-sm text-muted-foreground mb-4">ou clique para procurar</p>
        <Input type="file" accept=".csv" className="max-w-[250px]" />
      </div>

      <Button onClick={handleImport} className="w-full">Iniciar Importação</Button>
    </div>
  );
}
