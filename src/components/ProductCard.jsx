import React from 'react';
import { Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useCarrinho } from '@/context/CarrinhoContext';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { toast } = useToast();
  const { adicionarAoCarrinho } = useCarrinho();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent triggering card click
    adicionarAoCarrinho(product, 1);
    toast({
      title: "Adicionado ao Carrinho! 🛒",
      description: `${product.name} foi adicionado com sucesso.`,
    });
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    toast({
      title: "Favoritado",
      description: `${product.name} foi salvo nos seus favoritos.`,
    });
  };

  const navigateToDetail = () => {
    // If product has slug, use it, else id. Fallback to /produto/id
    const param = product.slug || product.id;
    navigate(`/produto/${param}`);
  };

  return (
    <div 
      onClick={navigateToDetail}
      className="group bg-card rounded-xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-1 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              {product.badge}
            </span>
          </div>
        )}
        
        {/* Favorite Button */}
        <button 
          onClick={handleFavorite}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 hover:bg-background text-muted-foreground hover:text-primary transition-colors backdrop-blur-sm shadow-sm"
        >
          <Heart className="w-5 h-5" />
        </button>

        <img 
          src={product.image || product.image_url} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 bg-white"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
            {product.category || (product.rs_categories ? product.rs_categories.name : '')}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-muted-foreground">{product.rating ? Number(product.rating).toFixed(1) : '5.0'}</span>
          </div>
        </div>
        
        <h3 className="font-poppins font-semibold text-lg leading-tight mb-2 line-clamp-2 text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-auto mb-4">
          <span className="text-xl font-bold text-primary">
            R$ {Number(product.price).toFixed(2).replace('.', ',')}
          </span>
        </div>

        <Button 
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold transition-all active:scale-[0.98]"
        >
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  );
}