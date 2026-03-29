import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReviewsSection() {
  const [activeFilter, setActiveFilter] = useState('Todas');

  const stats = [
    { stars: 5, count: 1100, pct: 88 },
    { stars: 4, count: 100, pct: 8 },
    { stars: 3, count: 30, pct: 2 },
    { stars: 2, count: 10, pct: 1 },
    { stars: 1, count: 7, pct: 1 },
  ];

  const filters = ['Todas', '5 Estrelas', '4 Estrelas', 'Com Foto'];

  const reviews = [
    { id: 1, name: 'João Silva', date: '15/01/2024', rating: 5, title: 'Melhor whey que já usei!', text: 'Excelente qualidade, mistura muito bem e o sabor é delicioso. Já é a terceira vez que compro. Recomendo muito!', verified: true },
    { id: 2, name: 'Marina Costa', date: '12/01/2024', rating: 5, title: 'Resultados visíveis em 2 semanas', text: 'Comecei a usar e em 2 semanas já sentia a diferença. Meu ganho de massa acelerou muito. Produto de qualidade mesmo!', verified: true },
    { id: 3, name: 'Rafael Oliveira', date: '10/01/2024', rating: 4, title: 'Bom custo-benefício', text: 'Produto bom, preço justo. Entrega rápida. Minha única crítica é que poderia vir com um shaker.', verified: true },
    { id: 4, name: 'Beatriz Santos', date: '08/01/2024', rating: 5, title: 'Recomendo para iniciantes e avançados', text: 'Uso há 6 meses e estou muito satisfeita. Ótima relação qualidade-preço. Entrega sempre no prazo!', verified: true },
    { id: 5, name: 'Lucas Ferreira', date: '05/01/2024', rating: 5, title: 'Melhor investimento que fiz', text: 'Comecei a treinar há 3 meses e este whey foi essencial para meus resultados. Ganho de massa acelerou muito!', verified: true },
  ];

  const filteredReviews = reviews.filter(r => {
    if (activeFilter === '5 Estrelas') return r.rating === 5;
    if (activeFilter === '4 Estrelas') return r.rating === 4;
    return true;
  });

  return (
    <section className="section-gap border-t border-border mt-8">
      <div className="text-center md:text-left mb-10">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-foreground mb-3">
          O Que Nossos Clientes Dizem
        </h2>
        <p className="text-lg text-muted-foreground">Avaliações verificadas de clientes reais</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Summary */}
        <div className="lg:col-span-4 bg-muted/20 p-8 rounded-[12px] border shadow-sm h-fit">
          <div className="flex flex-col items-center md:items-start mb-8">
            <div className="text-6xl font-poppins font-bold text-primary mb-2">4.9<span className="text-3xl text-muted-foreground">/5</span></div>
            <div className="flex gap-1 text-amber-400 mb-2">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-6 h-6 fill-current" />)}
            </div>
            <p className="text-base text-muted-foreground font-medium">1.247 avaliações totais</p>
          </div>
          
          <div className="space-y-4">
            {stats.map((stat) => (
              <div key={stat.stars} className="flex items-center gap-3 text-sm">
                <span className="w-4 font-medium text-muted-foreground">{stat.stars}</span>
                <Star className="w-4 h-4 text-amber-400 fill-current flex-shrink-0" />
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stat.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-primary rounded-full" 
                  />
                </div>
                <span className="w-12 text-right text-muted-foreground text-xs">{stat.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Reviews List */}
        <div className="lg:col-span-8">
          <div className="flex flex-wrap gap-3 mb-8">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2.5 rounded-[12px] text-sm font-bold transition-all border ${
                  activeFilter === f 
                    ? 'bg-primary text-white border-primary shadow-md' 
                    : 'bg-background text-foreground hover:bg-muted hover:border-muted-foreground/30'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((review) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={review.id} 
                  className="bg-card border rounded-[12px] p-6 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl border border-primary/20">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-foreground text-lg">{review.name}</span>
                          {review.verified && (
                            <span className="flex items-center text-xs text-secondary bg-secondary/10 px-2 py-1 rounded-full font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Compra Verificada
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'text-muted stroke-muted-foreground'}`} />
                    ))}
                  </div>
                  <h4 className="font-poppins font-bold text-foreground mb-2 text-lg">{review.title}</h4>
                  <p className="text-muted-foreground text-base leading-relaxed mb-6">
                    {review.text}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground border-t pt-4">
                    <span className="font-medium">Essa avaliação foi útil?</span>
                    <button className="flex items-center gap-2 hover:text-primary transition-colors font-medium">
                      <ThumbsUp className="w-5 h-5" /> Sim
                    </button>
                    <button className="flex items-center gap-2 hover:text-destructive transition-colors font-medium">
                      <ThumbsDown className="w-5 h-5" /> Não
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredReviews.length === 0 && (
              <div className="text-center py-10 text-muted-foreground">
                Nenhuma avaliação encontrada para este filtro.
              </div>
            )}
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg font-bold rounded-[12px] border-2">
              Ver todas as 1.247 avaliações
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}