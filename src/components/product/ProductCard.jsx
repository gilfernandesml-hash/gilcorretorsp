import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProductCard({ product, onNavigate, onAddToCart }) {
  const getBadgeColor = (badge) => {
    if (badge === 'Bestseller') return 'bg-secondary text-white';
    if (badge === 'Promoção') return 'bg-primary text-white';
    if (badge === 'Novo') return 'bg-blue-500 text-white';
    return '';
  };

  return (
    <div className="group bg-card rounded-[12px] border shadow-sm hover-shadow hover-scale overflow-hidden flex flex-col relative h-full">
      {product.badge && (
        <span className={`absolute top-3 left-3 z-10 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm ${getBadgeColor(product.badge)}`}>
          {product.badge}
        </span>
      )}
      
      <div 
        className="aspect-square bg-muted overflow-hidden relative cursor-pointer"
        onClick={() => onNavigate(product.id)}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{product.category}</span>
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-bold text-foreground">{product.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
          </div>
        </div>
        
        <h3 
          className="font-poppins font-bold text-lg mb-2 line-clamp-2 text-foreground cursor-pointer hover:text-primary transition-colors"
          onClick={() => onNavigate(product.id)}
        >
          {product.name}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
          {product.shortDescription}
        </p>
        
        <div className="mt-auto mb-4">
          <span className="text-2xl font-black text-primary">R$ {product.price.toFixed(2).replace('.', ',')}</span>
        </div>
        
        <div className="flex flex-col gap-2 mt-auto">
          <Button 
            onClick={() => onNavigate(product.id)} 
            variant="outline" 
            className="w-full font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors h-11 rounded-[12px]"
          >
            Ver Detalhes
          </Button>
          <Button 
            onClick={() => onAddToCart(product)} 
            className="w-full font-bold bg-primary hover:bg-primary/90 text-white h-11 rounded-[12px] btn-hover"
          >
            <ShoppingCart className="w-4 h-4 mr-2" /> Adicionar ao Carrinho
          </Button>
        </div>
      </div>
    </div>
  );
}