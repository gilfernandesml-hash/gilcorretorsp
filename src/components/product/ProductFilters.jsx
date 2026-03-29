import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function ProductFilters({
  selectedCategories,
  handleCategoryFilter,
  priceRange,
  handlePriceChange,
  selectedObjectives,
  handleObjectiveFilter,
  clearFilters
}) {
  const categories = [
    'Emagrecimento',
    'Imunidade',
    'Performance',
    'Saúde e Bem-estar',
    'Dor e Articulações',
    'Masculino',
    'Feminino'
  ];

  const objectives = [
    'Ganho de Massa',
    'Emagrecimento',
    'Imunidade',
    'Saúde Geral',
    'Performance',
    'Beleza'
  ];

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-poppins font-bold text-lg mb-4 text-foreground">Categorias</h3>
        <div className="space-y-3">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-3">
              <Checkbox 
                id={`cat-${category}`} 
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryFilter(category)}
                className="border-primary data-[state=checked]:bg-primary"
              />
              <Label htmlFor={`cat-${category}`} className="text-base text-muted-foreground hover:text-foreground cursor-pointer font-normal">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="pt-6 border-t">
        <h3 className="font-poppins font-bold text-lg mb-4 text-foreground">Faixa de Preço</h3>
        <Slider
          defaultValue={[0, 200]}
          value={priceRange}
          max={200}
          step={5}
          onValueChange={handlePriceChange}
          className="mb-4"
        />
        <div className="flex justify-between items-center text-sm font-medium text-foreground">
          <span>R$ {priceRange[0]}</span>
          <span>R$ {priceRange[1]}</span>
        </div>
      </div>

      {/* Objectives */}
      <div className="pt-6 border-t">
        <h3 className="font-poppins font-bold text-lg mb-4 text-foreground">Objetivos</h3>
        <div className="space-y-3">
          {objectives.map(objective => (
            <div key={objective} className="flex items-center space-x-3">
              <Checkbox 
                id={`obj-${objective}`} 
                checked={selectedObjectives.includes(objective)}
                onCheckedChange={() => handleObjectiveFilter(objective)}
                className="border-primary data-[state=checked]:bg-primary"
              />
              <Label htmlFor={`obj-${objective}`} className="text-base text-muted-foreground hover:text-foreground cursor-pointer font-normal">
                {objective}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t">
        <Button 
          variant="outline" 
          onClick={clearFilters}
          className="w-full border-2 font-bold rounded-[12px] h-12"
        >
          Limpar Filtros
        </Button>
      </div>
    </div>
  );
}