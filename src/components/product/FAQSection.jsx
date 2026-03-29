import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Qual é a diferença entre Whey Concentrado e Isolado?",
      a: "O Whey Concentrado passa por menos processos de filtração, mantendo cerca de 80% de proteína, além de pequenas quantidades de carboidratos (lactose) e gorduras. O Isolado é mais puro (90%+ de proteína) e é ideal para quem tem sensibilidade à lactose ou busca zero carboidratos."
    },
    {
      q: "Posso usar este whey mesmo sendo iniciante?",
      a: "Sim, com certeza! A suplementação com Whey Protein é perfeita para todos os níveis de treinamento. Recomendamos começar com 1 porção ao dia, logo após o treino, para ajudar na recuperação e construção muscular inicial."
    },
    {
      q: "Qual é o melhor horário para tomar?",
      a: "O pós-treino é o horário ideal devido à 'janela anabólica', necessitando de rápida absorção. No entanto, pode ser consumido em qualquer momento para bater suas metas diárias de proteína, como no café da manhã ou antes de dormir."
    },
    {
      q: "Quanto tempo dura um pote de 1kg?",
      a: "Considerando a porção recomendada de 25g de proteína (aprox. 30g de pó), um pote de 1kg rende cerca de 33 a 40 porções. Usando 1 vez ao dia, dura aproximadamente 40 dias; usando 2 vezes, dura 20 dias."
    },
    {
      q: "Este produto é seguro?",
      a: "Totalmente seguro. Todos os nossos produtos são testados e aprovados pela ANVISA. Além disso, nossas instalações possuem certificação ISO 9001, garantindo rigoroso controle de qualidade em cada lote."
    },
    {
      q: "Qual é a política de devolução?",
      a: "Oferecemos uma garantia blindada de 30 dias. Se você não estiver 100% satisfeito com o produto, basta entrar em contato conosco que faremos o reembolso total do seu dinheiro, sem fazer perguntas."
    },
    {
      q: "Qual é a validade do produto?",
      a: "A validade padrão é de 24 meses a partir da data de fabricação. Garantimos que todos os produtos enviados tenham uma validade longa pela frente, pois trabalhamos com estoques sempre frescos."
    },
    {
      q: "Posso misturar com outros suplementos?",
      a: "Sim! O Whey Protein combina perfeitamente com Creatina, BCAA, e Glutamina. Inclusive, misturar Whey com Creatina no pós-treino é uma das estratégias mais eficientes para ganho de massa. Consulte um nutricionista para dosagens ideais."
    }
  ];

  return (
    <section className="section-gap max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-foreground">
          Dúvidas Frequentes
        </h2>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`border rounded-[12px] bg-card overflow-hidden transition-all duration-300 ${isOpen ? 'border-primary shadow-md' : 'border-border hover:border-primary/50'}`}
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left font-poppins font-bold text-foreground focus:outline-none"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="text-base md:text-lg pr-4">{faq.q}</span>
                <ChevronDown 
                  className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} 
                />
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-muted-foreground text-base leading-relaxed border-t mt-2 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}