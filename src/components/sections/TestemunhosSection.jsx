
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function TestemunhosSection() {
  const testimonials = [
    {
      name: "Carlos Eduardo",
      role: "Comprador de Apartamento",
      content: "O Gil encontrou o apartamento perfeito para minha família em Pinheiros. Todo o processo foi transparente e muito rápido.",
      rating: 5
    },
    {
      name: "Mariana Silva",
      role: "Investidora",
      content: "Excelente assessoria. Venderam meu imóvel comercial pelo valor justo e me auxiliaram na compra de um novo investimento.",
      rating: 5
    },
    {
      name: "Roberto Almeida",
      role: "Locatário",
      content: "Atendimento diferenciado. Mostraram várias opções dentro do meu orçamento e resolveram toda a burocracia do aluguel.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-slate-900 text-white" id="depoimentos">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">O que nossos clientes dizem</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">A satisfação dos nossos clientes é a nossa maior recompensa.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="bg-slate-800 border-slate-700 text-white">
              <CardContent className="pt-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 italic mb-6">"{t.content}"</p>
                <div>
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-sm text-slate-400">{t.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
