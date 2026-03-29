import React from 'react';
import { Milk, Activity, Zap, Heart, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Milk,
      title: "Proteína de Alta Qualidade",
      description: "25g de proteína concentrada por porção para máximo ganho muscular."
    },
    {
      icon: Activity,
      title: "Recuperação Rápida",
      description: "Aminoácidos essenciais (BCAA) para recuperação pós-treino acelerada."
    },
    {
      icon: Zap,
      title: "Absorção Rápida",
      description: "Absorção rápida para aproveitar a janela anabólica."
    },
    {
      icon: Heart,
      title: "Sabor Delicioso",
      description: "5 sabores incríveis: Chocolate, Morango, Baunilha, Cookies, Cappuccino."
    },
    {
      icon: DollarSign,
      title: "Melhor Custo-Benefício",
      description: "Qualidade premium com preço justo. Rende 40 porções por pote."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="section-gap bg-background">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-foreground mb-4">
          Por Que Escolher Este Whey Protein?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Qualidade premium com resultados comprovados
        </p>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {benefits.map((benefit, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-muted rounded-[12px] p-8 text-center border shadow-sm transition-colors hover:border-primary/30 flex flex-col items-center group"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <benefit.icon className="w-10 h-10" />
            </div>
            <h3 className="font-poppins font-bold text-lg mb-3 text-foreground">
              {benefit.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}