
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function PropertyFilters({ filters, setFilters, onClear }) {
  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="space-y-2">
          <Label>Tipo de Imóvel</Label>
          <Select value={filters.type} onValueChange={(val) => handleChange('type', val)}>
            <SelectTrigger className="w-full text-slate-900">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="apartamento">Apartamento</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="comercial">Comercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Quartos</Label>
          <Select value={filters.bedrooms} onValueChange={(val) => handleChange('bedrooms', val)}>
            <SelectTrigger className="w-full text-slate-900">
              <SelectValue placeholder="Qualquer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Qualquer</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Preço Mínimo (R$)</Label>
          <Input 
            type="number" 
            placeholder="0" 
            value={filters.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
            className="text-slate-900"
          />
        </div>

        <div className="space-y-2">
          <Label>Preço Máximo (R$)</Label>
          <Input 
            type="number" 
            placeholder="Ilimitado" 
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            className="text-slate-900"
          />
        </div>
      </div>

      <div className="flex justify-end mt-2">
        <Button variant="outline" onClick={onClear} className="text-slate-600">
          Limpar Filtros
        </Button>
      </div>
    </div>
  );
}
