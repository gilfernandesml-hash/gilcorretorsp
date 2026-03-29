import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function PortfolioSection() {
  const projects = [
    { title: "E-commerce de Moda", desc: "Loja virtual completa com integração de pagamentos e correios.", img: "https://images.unsplash.com/photo-1687006067259-6de13ca3875e?q=80&w=800&auto=format&fit=crop" },
    { title: "Landing Page de SaaS", desc: "Página focada em conversão para software de gestão.", img: "https://images.unsplash.com/photo-1688760871131-29afc15029ec?q=80&w=800&auto=format&fit=crop" },
    { title: "Site Corporativo", desc: "Presença digital institucional para escritório de advocacia.", img: "https://images.unsplash.com/photo-1687006067259-6de13ca3875e?q=80&w=800&auto=format&fit=crop" },
    { title: "Plataforma de Cursos", desc: "Portal EAD com área de membros e controle de progresso.", img: "https://images.unsplash.com/photo-1688760871131-29afc15029ec?q=80&w=800&auto=format&fit=crop" },
    { title: "App Web", desc: "Sistema web responsivo para agendamento de consultas.", img: "https://images.unsplash.com/photo-1687006067259-6de13ca3875e?q=80&w=800&auto=format&fit=crop" },
    { title: "Blog Profissional", desc: "Portal de notícias com SEO avançado e alta performance.", img: "https://images.unsplash.com/photo-1688760871131-29afc15029ec?q=80&w=800&auto=format&fit=crop" },
  ];

  return (
    <section id="portfolio" className="py-20 px-6 bg-[#F5F5F5]">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-black text-foreground mb-4">Nosso Portfólio</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça alguns dos nossos projetos recentes e veja a qualidade do que entregamos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <motion.div 
              key={idx}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative h-[250px] overflow-hidden">
                <img src={proj.img} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-[#0066FF]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                  <ExternalLink className="w-10 h-10 text-white mb-4" />
                  <p className="text-white font-medium text-sm">Visualizar Projeto</p>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="font-poppins font-semibold text-lg text-foreground mb-2">{proj.title}</h3>
                <p className="text-sm text-gray-500">{proj.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}