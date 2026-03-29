import React, { useState } from 'react';
import { Download, Database, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { downloadCompleteProjectAsZip, downloadDatabase } from '@/utils/downloadUtils';

export default function AdminDownloadSection() {
  const { toast } = useToast();
  const [isDownloadingCode, setIsDownloadingCode] = useState(false);
  const [isDownloadingDb, setIsDownloadingDb] = useState(false);

  const handleDownloadCode = async () => {
    setIsDownloadingCode(true);
    toast({
      title: "Download iniciado",
      description: "Baixando código completo...",
    });
    
    const result = await downloadCompleteProjectAsZip();
    
    if (result.success) {
      toast({
        title: "Sucesso",
        description: result.message,
      });
    } else {
      toast({
        title: "Erro",
        description: result.message,
        variant: "destructive",
      });
    }
    setIsDownloadingCode(false);
  };

  const handleDownloadDb = async () => {
    setIsDownloadingDb(true);
    toast({
      title: "Preparando download",
      description: "Exportando dados do Supabase...",
    });
    
    const result = await downloadDatabase();
    
    if (result.success) {
      toast({
        title: "Sucesso",
        description: result.message,
      });
    } else {
      toast({
        title: "Aviso",
        description: result.message,
        variant: result.message === "Nenhum dado para exportar." ? "default" : "destructive",
      });
    }
    setIsDownloadingDb(false);
  };

  return (
    <div className="space-y-6 mt-8 p-6">
      <div className="flex flex-col gap-4">
        <Button 
          onClick={handleDownloadCode} 
          disabled={isDownloadingCode}
          className="w-full h-auto py-4 flex flex-col items-center justify-center gap-2 bg-[#0066FF] hover:bg-[#0052cc] text-white transition-all hover:scale-105 shadow-md hover:shadow-lg"
        >
          {isDownloadingCode ? <Loader2 className="w-8 h-8 animate-spin" /> : <Download className="w-8 h-8" />}
          <div className="text-center">
            <span className="block font-bold text-lg">Baixar Código do Site</span>
            <span className="block text-sm opacity-90 font-normal mt-1">Exporta todos os arquivos do projeto</span>
          </div>
        </Button>

        <Button 
          onClick={handleDownloadDb} 
          disabled={isDownloadingDb}
          className="w-full h-auto py-4 flex flex-col items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white transition-all hover:scale-105 shadow-md hover:shadow-lg"
        >
          {isDownloadingDb ? <Loader2 className="w-8 h-8 animate-spin" /> : <Database className="w-8 h-8" />}
          <div className="text-center">
            <span className="block font-bold text-lg">Baixar Banco de Dados</span>
            <span className="block text-sm opacity-90 font-normal mt-1">Exporta dados do Supabase (se houver)</span>
          </div>
        </Button>
      </div>
    </div>
  );
}