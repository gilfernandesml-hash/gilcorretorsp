import React from 'react';
import { Users, Package, Star, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SocialProofSection() {
  const metrics = [
    { icon: Users, value: '15.000+', label: 'Clientes Satisfeitos' },
    { icon: Package, value: '50.000+', label: 'Unidades Vendidas' },
    { icon: Star, value: '4.9/5', label: 'Avaliação Média' },
    { icon: Trophy, value: '#1', label: 'Produto Mais Vendido' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section className="py-16 px-6 bg-muted rounded-[12px] my-12 border">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-poppins font-bold text-foreground">
          Confiado por Milhares de Clientes
        </h2>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {metrics.map((item, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants}
            className="flex flex-col items-center p-8 bg-card rounded-[12px] shadow-sm border hover-shadow hover-scale"
          >
            <div className="p-4 bg-primary/10 rounded-full mb-5 text-primary">
              <item.icon className="w-10 h-10" />
            </div>
            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-primary mb-2">
              {item.value}
            </h3>
            <p className="font-semibold text-muted-foreground text-lg">
              {item.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}