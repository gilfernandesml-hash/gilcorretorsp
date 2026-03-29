
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function ContatoSection() {
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: "Em breve um de nossos corretores entrará em contato.",
    });
  };

  return (
    <section className="py-20 bg-slate-50" id="contato">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 mb-4">Fale Conosco</h2>
          <p className="text-slate-600">Quer comprar, vender ou alugar? Deixe sua mensagem e nós te ajudamos.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input id="nome" placeholder="Seu nome" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="seu@email.com" required />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone / WhatsApp</Label>
            <Input id="telefone" placeholder="(11) 99999-9999" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interesse">Tenho interesse em:</Label>
            <select id="interesse" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option value="comprar">Comprar um imóvel</option>
              <option value="vender">Vender meu imóvel</option>
              <option value="alugar">Alugar um imóvel</option>
              <option value="outro">Outros assuntos</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensagem">Mensagem</Label>
            <Textarea id="mensagem" placeholder="Como podemos ajudar?" rows={4} required />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg">
            Enviar Mensagem
          </Button>
        </form>
      </div>
    </section>
  );
}
