import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCarrinho } from '@/context/CarrinhoContext';
import CarrinhoItem from '@/components/CarrinhoItem';
import ResumoCarrinho from '@/components/ResumoCarrinho';
import ProductCard from '@/components/ProductCard'; // Assuming this exists from previous tasks
import { productsData } from '@/lib/productsData'; // To get some related products

export default function CarrinhoPage() {
  const { items } = useCarrinho();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const relatedProducts = productsData ? productsData.slice(0, 4) : [];

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="bg-muted py-8 border-b">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-poppins font-bold text-foreground">Seu Carrinho</h1>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center text-sm text-muted-foreground mb-8 font-medium">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-foreground">Carrinho</span>
        </nav>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-card rounded-2xl border shadow-sm">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6 text-muted-foreground">
              <ShoppingBag className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-poppins font-bold text-foreground mb-2">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Parece que você ainda não adicionou nenhum produto ao carrinho. Explore nossos suplementos e encontre o ideal para você!
            </p>
            <Button onClick={() => navigate('/produtos')} className="bg-primary hover:bg-primary/90 text-white font-bold px-8 h-12 rounded-xl">
              Continuar Comprando
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-8">
              <div className="bg-card border rounded-xl p-6 shadow-sm">
                <div className="hidden md:flex justify-between text-sm font-bold text-muted-foreground uppercase border-b pb-4 mb-4">
                  <span>Produto</span>
                  <span>Quantidade e Preço</span>
                </div>
                <div className="flex flex-col">
                  {items.map(item => (
                    <CarrinhoItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <ResumoCarrinho />
            </div>
          </div>
        )}

        {/* You Might Also Like */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t">
            <h2 className="text-2xl font-poppins font-bold text-foreground mb-8">Você Também Pode Gostar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}