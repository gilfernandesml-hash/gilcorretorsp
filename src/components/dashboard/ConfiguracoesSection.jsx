
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export default function ConfiguracoesSection() {
  const { toast } = useToast();

  const handleSave = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Funcionalidade não implementada",
      description: "As configurações de perfil serão salvas na próxima atualização! 🚀",
    });
  };

  return (
    <div className="max-w-2xl bg-card p-6 rounded-lg border shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Configurações do Site</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome da Imobiliária / Corretor</label>
          <Input defaultValue="Gil Fernandes Imóveis" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">E-mail de Contato</label>
            <Input defaultValue="contato@gilimoveis.com.br" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">WhatsApp</label>
            <Input defaultValue="(11) 9715-7373" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Endereço (Rodapé)</label>
          <Input defaultValue="São Paulo, SP" />
        </div>
        <div className="pt-4 border-t mt-6">
          <h3 className="font-bold mb-4">Redes Sociais</h3>
          <div className="space-y-4">
            <Input placeholder="Link do Instagram" />
            <Input placeholder="Link do Facebook" />
          </div>
        </div>
        <div className="pt-6">
          <Button type="submit" className="w-full md:w-auto">Salvar Configurações</Button>
        </div>
      </form>
    </div>
  );
}
