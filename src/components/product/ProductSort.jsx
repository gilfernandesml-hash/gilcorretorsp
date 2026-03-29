import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { SlidersHorizontal } from 'lucide-react';

export default function ProductSort({ sortBy, onSortChange }) {
  const options = [
    "Mais Relevante",
    "Menor Preço",
    "Maior Preço",
    "Mais Vendidos",
    "Melhor Avaliação",
    "Mais Recentes"
  ];

  return (
    <Select value={sortBy} onValueChange={onSortChange}>
      <SelectTrigger className="w-full md:w-[200px] h-12 rounded-[12px] border-2 font-medium bg-background text-foreground">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          <SelectValue placeholder="Ordenar por" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option} value={option}>{option}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}