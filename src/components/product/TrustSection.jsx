import React from 'react';
import { ShieldCheck, Lock, Truck } from 'lucide-react';

export default function TrustSection() {
  const trusts = [
    {
      icon: ShieldCheck,
      title: "Produto Original",
      description: "Garantia de autenticidade. Todos os produtos são originais e certificados. Nota Fiscal incluída."
    },
    {
      icon: Lock,
      title: "Pagamento Seguro",
      description: "Seus dados protegidos com criptografia SSL. Cartão de crédito, débito, Pix e boleto. Sem risco."
    },
    {
      icon: Truck,
      title: "Entrega Segura",
      description: "Embalagem reforçada. Rastreamento completo. Entrega em 24-48h. Garantia de integridade."
    }
  ];

  return (
    <section className="section-gap bg-foreground text-background -mx-4 px-4 sm:mx-0 sm:rounded-[12px] my-12 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-12 pt-8 sm:pt-0">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-4">
            Compre com Confiança
          </h2>
          <p className="text-gray-400 text-lg">Garantia de satisfação em 100% dos produtos</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-8 sm:pb-0 px-4 sm:px-8">
          {trusts.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 bg-white/5 rounded-[12px] border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-6">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="font-poppins font-bold text-xl text-white mb-3 flex items-center gap-2">
                <span className="text-secondary text-2xl">✅</span> {item.title}
              </h3>
              <p className="text-base text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-6 border border-white/10 bg-white/5 rounded-[12px] flex flex-col md:flex-row items-center justify-center gap-4 max-w-3xl mx-auto">
          <Lock className="w-8 h-8 text-secondary" />
          <p className="text-lg font-bold text-white">
            Garantia de satisfação ou dinheiro de volta em 30 dias
          </p>
        </div>
      </div>
    </section>
  );
}