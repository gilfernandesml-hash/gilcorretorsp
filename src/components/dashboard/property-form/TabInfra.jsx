
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

const AMENITIES = [
  ["Piscina adulto", "Academia", "Coworking", "Sala de massagem", "Espaço Pet", "Quadra", "Churrasqueira"],
  ["Piscina infantil", "Salão de Festas", "Spa", "Sala de Jogos", "Lazer no Rooftop", "Quadra de Tênis"],
  ["Piscina Aquecida (coberta)", "Espaço Gourmet", "Sauna", "Lavanderia", "Espaço Mulher", "Mini Mercadinho"]
];

export default function TabInfra({ data, onChange }) {
  const handleToggle = (item, checked) => {
    let newAmenities = [...data.amenities];
    if (checked) {
      newAmenities.push(item);
    } else {
      newAmenities = newAmenities.filter(a => a !== item);
    }
    onChange('amenities', newAmenities);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl border shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900">Lazer e Infraestrutura</h3>
        <p className="text-sm text-slate-500">
          Selecione todas as opções que se aplicam ao condomínio ou imóvel. 
          Essas informações serão exibidas nos cards e na página de detalhes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {AMENITIES.map((col, colIdx) => (
          <div key={colIdx} className="space-y-4">
            {col.map(item => (
              <div key={item} className="flex items-start space-x-3">
                <Checkbox 
                  id={`amenity-${item}`}
                  checked={data.amenities.includes(item)}
                  onCheckedChange={(checked) => handleToggle(item, checked)}
                />
                <label 
                  htmlFor={`amenity-${item}`}
                  className="text-sm font-medium leading-none cursor-pointer text-slate-700"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
