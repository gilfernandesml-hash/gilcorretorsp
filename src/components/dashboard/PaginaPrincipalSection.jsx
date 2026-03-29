
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Home, TrendingUp, Users } from 'lucide-react';

export default function PaginaPrincipalSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Página Principal</h2>
          <p className="text-muted-foreground">Visão geral do seu site e estatísticas.</p>
        </div>
        <Button onClick={() => window.open('/', '_blank')}>
          <ExternalLink className="w-4 h-4 mr-2" /> Acessar Meu Site
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg bg-card flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-full"><Home className="w-6 h-6" /></div>
          <div>
            <p className="text-sm text-muted-foreground">Total de Imóveis</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
        <div className="p-6 border rounded-lg bg-card flex items-center gap-4">
          <div className="p-3 bg-green-500/10 text-green-500 rounded-full"><TrendingUp className="w-6 h-6" /></div>
          <div>
            <p className="text-sm text-muted-foreground">Visualizações</p>
            <p className="text-2xl font-bold">1.450</p>
          </div>
        </div>
        <div className="p-6 border rounded-lg bg-card flex items-center gap-4">
          <div className="p-3 bg-orange-500/10 text-orange-500 rounded-full"><Users className="w-6 h-6" /></div>
          <div>
            <p className="text-sm text-muted-foreground">Leads Gerados</p>
            <p className="text-2xl font-bold">34</p>
          </div>
        </div>
      </div>

      <div className="mt-8 border rounded-lg overflow-hidden h-[400px] relative bg-muted">
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <p className="text-muted-foreground mb-4">Preview do site</p>
          <iframe src="/" className="w-full h-full border-0 opacity-50 pointer-events-none" title="Preview" />
        </div>
      </div>
    </div>
  );
}
