
import React from 'react';
import { ShieldCheck, HeartHandshake as Handshake, TrendingUp, Clock } from 'lucide-react';

export default function DiferenciaisSection() {
  const differentials = [
    {
      title: "Atendimento Personalizado",
      desc: "Entendemos sua necessidade para buscar exatamente o que você procura.",
      icon: Handshake
    },
    {
      title: "Segurança Jurídica",
      desc: "Suporte completo na análise de documentos e confecção de contratos.",
      icon: ShieldCheck
    },
    {
      title: "Agilidade no Processo",
      desc: "Processos desburocratizados para acelerar a sua mudança ou investimento.",
      icon: Clock
    },
    {
      title: "Melhores Negociações",
      desc: "Expertise de mercado para garantir que você faça sempre o melhor negócio.",
      icon: TrendingUp
    }
  ];

  return (
    <section className="py-20 bg-white" id="diferenciais">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 mb-6">
              Por que escolher o <span className="text-primary">Gil Corretor SP</span>?
            </h2>
            <p className="text-slate-600 mb-8 text-lg">
              Mais do que vender imóveis, nosso objetivo é realizar sonhos e garantir investimentos seguros. Nossa experiência no mercado imobiliário de São Paulo faz toda a diferença.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {differentials.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop" 
              alt="Reunião de negócios imobiliários" 
              className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
