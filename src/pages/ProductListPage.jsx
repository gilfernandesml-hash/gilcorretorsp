import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, ChevronLeft, ChevronRight, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';

import { useProductFilters } from '@/hooks/useProductFilters';
import ProductCard from '@/components/product/ProductCard';
import ProductFilters from '@/components/product/ProductFilters';
import ProductSearch from '@/components/product/ProductSearch';
import ProductSort from '@/components/product/ProductSort';

export default function ProductListPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    filteredProducts,
    selectedCategories,
    priceRange,
    selectedObjectives,
    searchQuery,
    sortBy,
    handleCategoryFilter,
    handlePriceChange,
    handleObjectiveFilter,
    handleSearch,
    handleSort,
    clearFilters
  } = useProductFilters();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, priceRange, selectedObjectives, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleNavigateToProduct = (id) => {
    navigate(`/produto/${id}`);
  };

  const handleAddToCart = (product) => {
    toast({
      title: "Adicionado ao Carrinho! 🛒",
      description: `1x ${product.name} adicionado com sucesso.`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header Banner */}
      <div className="bg-muted py-12 px-4 border-b">
        <div className="container mx-auto max-w-[1400px] text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-black text-foreground mb-4">
            Catálogo de Produtos
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encontre o suplemento perfeito para seus objetivos. Qualidade premium e resultados comprovados.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-[12px] sm:text-[14px] text-muted-foreground mb-8 font-medium">
          <span onClick={() => navigate('/')} className="hover:text-primary cursor-pointer transition-colors">Home</span>
          <ChevronRightIcon className="w-4 h-4 mx-1.5 flex-shrink-0" />
          <span className="text-foreground font-bold">Produtos</span>
        </nav>

        {/* Search & Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <ProductSearch searchQuery={searchQuery} onSearchChange={handleSearch} />
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Mobile Filter Toggle */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden w-full h-12 border-2 rounded-[12px] flex items-center justify-center gap-2 bg-background">
                  <Filter className="w-5 h-5" /> Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetHeader className="mb-6">
                  <SheetTitle className="font-poppins font-bold text-2xl">Filtros</SheetTitle>
                </SheetHeader>
                <ProductFilters 
                  selectedCategories={selectedCategories}
                  handleCategoryFilter={handleCategoryFilter}
                  priceRange={priceRange}
                  handlePriceChange={handlePriceChange}
                  selectedObjectives={selectedObjectives}
                  handleObjectiveFilter={handleObjectiveFilter}
                  clearFilters={clearFilters}
                />
              </SheetContent>
            </Sheet>

            {/* Sort Dropdown */}
            <ProductSort sortBy={sortBy} onSortChange={handleSort} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block col-span-1 space-y-8">
            <div className="bg-card border rounded-[12px] p-6 shadow-sm sticky top-24">
              <ProductFilters 
                selectedCategories={selectedCategories}
                handleCategoryFilter={handleCategoryFilter}
                priceRange={priceRange}
                handlePriceChange={handlePriceChange}
                selectedObjectives={selectedObjectives}
                handleObjectiveFilter={handleObjectiveFilter}
                clearFilters={clearFilters}
              />
            </div>
            
            {/* Promo Banner */}
            <div className="bg-primary/10 border border-primary/20 rounded-[12px] p-6 text-center">
              <h4 className="font-poppins font-bold text-primary text-xl mb-2">Frete Grátis</h4>
              <p className="text-sm text-foreground mb-4">Em compras acima de R$ 150 para todo o Brasil!</p>
              <Button className="w-full font-bold rounded-[12px]">Aproveite</Button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3 flex flex-col">
            
            <div className="mb-6 text-sm text-muted-foreground font-medium">
              Mostrando <span className="font-bold text-foreground">
                {filteredProducts.length === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredProducts.length)}
              </span> de <span className="font-bold text-foreground">{filteredProducts.length}</span> produtos
            </div>

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-card border rounded-[12px] px-4 flex-grow">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Filter className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="font-poppins font-bold text-xl mb-2 text-foreground">Nenhum produto encontrado</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Não encontramos resultados para os filtros selecionados. Tente limpar os filtros ou buscar por outro termo.
                </p>
                <Button onClick={clearFilters} variant="outline" className="border-2 font-bold rounded-[12px] h-12 px-8">
                  Limpar Todos os Filtros
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-grow">
                  {currentProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onNavigate={handleNavigateToProduct}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center items-center gap-2 border-t pt-8">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="rounded-[12px] w-10 h-10 p-0 border-2"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    
                    <div className="flex gap-2">
                      {[...Array(totalPages)].map((_, i) => (
                        <Button
                          key={i + 1}
                          variant={currentPage === i + 1 ? "default" : "outline"}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`rounded-[12px] w-10 h-10 p-0 font-bold ${currentPage !== i + 1 ? 'border-2' : ''}`}
                        >
                          {i + 1}
                        </Button>
                      ))}
                    </div>

                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="rounded-[12px] w-10 h-10 p-0 border-2"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}