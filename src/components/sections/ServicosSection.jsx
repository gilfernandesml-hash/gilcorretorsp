
import React from 'react';
import { Home, Key, Building, SearchCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function ServicosSection() {
  const services = [
    {
      title: "Compra de Imóveis",
      description: "Assessoria completa para você encontrar e comprar o imóvel dos seus sonhos com segurança e tranquilidade.",
      icon: Home,
    },
    {
      title: "Venda de Imóveis",
      description: "Estratégias de marketing e avaliação precisa para vender seu imóvel pelo melhor valor e no menor tempo.",
      icon: Key,
    },
    {
      title: "Locação Residencial",
      description: "Ampla carteira de imóveis para alugar nos melhores bairros de São Paulo, com processo ágil.",
      icon: Building,
    },
    {
      title: "Consultoria e Avaliação",
      description: "Avaliação imobiliária profissional e consultoria especializada para investidores.",
      icon: SearchCheck,
    }
  ];

  return (
    <section className="py-20 bg-slate-50" id="servicos">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 mb-4">Nossos Serviços Imobiliários</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Oferecemos soluções completas em negócios imobiliários para garantir o sucesso da sua transação.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white text-center">
              <CardHeader className="items-center pb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <service.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl text-slate-900">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-600">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
