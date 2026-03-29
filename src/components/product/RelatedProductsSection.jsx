import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function RelatedProductsSection() {
  const { toast } = useToast();
  
  const products = [
    { id: 1, name: 'Whey Protein Isolado 1kg', price: 129.90, rating: 4.8, img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=400', badge: 'Bestseller' },
    { id: 2, name: 'BCAA 2:1:1 200g', price: 59.90, rating: 4.7, img: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&q=80&w=400', badge: '' },
    { id: 3, name: 'Creatina Monohidrato 300g', price: 49.90, rating: 4.8, img: 'https://images.unsplash.com/photo-1595406236320-a9aa2a54a00e?auto=format&fit=crop&q=80&w=400', badge: 'Promoção' },
    { id: 4, name: 'Glutamina 300g', price: 55.90, rating: 4.6, img: 'https://images.unsplash.com/photo-1632789413875-695790ba93ce?auto=format&fit=crop&q=80&w=400', badge: '' },
  ];

  const handleAction = () => {
    toast({ title: "🚧 Em breve", description: "Funcionalidade de navegação e carrinho será implementada em breve." });
  };

  return (
    <section className="section-gap border-t border-border mt-12">
      <div className="text-center md:text-left mb-10">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-foreground mb-3">
          Você Também Pode Gostar
        </h2>
        <p className="text-lg text-muted-foreground">Produtos complementares para potencializar seus resultados</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group bg-card rounded-[12px] border shadow-sm hover-shadow hover-scale overflow-hidden flex flex-col relative">
            {product.badge && (
              <span className={`absolute top-3 left-3 z-10 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm ${product.badge === 'Promoção' ? 'bg-primary' : 'bg-secondary'}`}>
                {product.badge}
              </span>
            )}
            <div className="aspect-square bg-muted overflow-hidden relative">
              <img 
                src={product.img} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex items-center gap-1 mb-2 text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-bold text-muted-foreground">{product.rating}/5</span>
              </div>
              <h3 className="font-poppins font-bold text-base mb-3 line-clamp-2 text-foreground">{product.name}</h3>
              <div className="mt-auto mb-4">
                <span className="text-2xl font-black text-primary">R$ {product.price.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex flex-col gap-2">
                <Button onClick={handleAction} variant="outline" className="w-full font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors h-11">
                  Ver Produto
                </Button>
                <Button onClick={handleAction} className="w-full font-bold bg-primary hover:bg-primary/90 text-white h-11">
                  <ShoppingCart className="w-4 h-4 mr-2" /> Adicionar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}