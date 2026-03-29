
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function TabDetalhes({ data, onChange, errors }) {
  return (
    <div className="space-y-6 bg-white p-6 rounded-xl border shadow-sm">
      
      <div className="p-4 bg-slate-50 rounded-lg border">
        <Label className="text-sm font-bold text-slate-900 mb-3 block">Tipo de Negócio</Label>
        <RadioGroup 
          value={data.business_type} 
          onValueChange={(val) => onChange('business_type', val)}
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="venda" id="venda" />
            <Label htmlFor="venda" className="cursor-pointer">Venda</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="locacao" id="locacao" />
            <Label htmlFor="locacao" className="cursor-pointer">Locação</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="text-sm font-semibold text-slate-700">
            {data.business_type === 'locacao' ? 'Preço de Locação (R$/mês)' : 'Preço de Venda (R$)'}
          </Label>
          <Input 
            type="number" 
            value={data.price} 
            onChange={(e) => onChange('price', e.target.value)} 
            className="mt-1" 
            placeholder="Ex: 500000"
          />
        </div>
        <div>
          <Label className="text-sm font-semibold text-slate-700">Preço "A partir de" (Opcional)</Label>
          <Input 
            type="number" 
            value={data.starting_from_price} 
            onChange={(e) => onChange('starting_from_price', e.target.value)} 
            className="mt-1 bg-slate-50" 
            placeholder="Ex: 450000"
          />
          <p className="text-xs text-slate-500 mt-1">Use para lançamentos ou preços base.</p>
        </div>
      </div>

      <hr className="border-slate-100" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label className="text-sm font-semibold text-slate-700">Tipo de Imóvel</Label>
          <Select value={data.type} onValueChange={(val) => onChange('type', val)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Apartamento">Apartamento</SelectItem>
              <SelectItem value="Casa">Casa</SelectItem>
              <SelectItem value="Sala Comercial">Sala Comercial</SelectItem>
              <SelectItem value="Terreno">Terreno</SelectItem>
              <SelectItem value="Cobertura">Cobertura</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="text-sm font-semibold text-slate-700">Estágio</Label>
          <Select value={data.property_status} onValueChange={(val) => onChange('property_status', val)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pronto">Pronto</SelectItem>
              <SelectItem value="Na Planta">Na Planta</SelectItem>
              <SelectItem value="Lançamento">Lançamento</SelectItem>
              <SelectItem value="Em Construção">Em Construção</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-semibold text-slate-700">Área (m²) *</Label>
          <Input 
            type="number" 
            value={data.area} 
            onChange={(e) => onChange('area', e.target.value)} 
            className={`mt-1 ${errors.area ? 'border-red-500' : ''}`} 
          />
          {errors.area && <p className="text-xs text-red-500 mt-1">{errors.area}</p>}
        </div>

        <div>
          <Label className="text-sm font-semibold text-slate-700">Quartos *</Label>
          <Input 
            type="number" 
            value={data.bedrooms} 
            onChange={(e) => onChange('bedrooms', e.target.value)} 
            className={`mt-1 ${errors.bedrooms ? 'border-red-500' : ''}`} 
          />
          {errors.bedrooms && <p className="text-xs text-red-500 mt-1">{errors.bedrooms}</p>}
        </div>

        <div>
          <Label className="text-sm font-semibold text-slate-700">Banheiros *</Label>
          <Input 
            type="number" 
            value={data.bathrooms} 
            onChange={(e) => onChange('bathrooms', e.target.value)} 
            className={`mt-1 ${errors.bathrooms ? 'border-red-500' : ''}`} 
          />
          {errors.bathrooms && <p className="text-xs text-red-500 mt-1">{errors.bathrooms}</p>}
        </div>

        <div>
          <Label className="text-sm font-semibold text-slate-700">Suítes</Label>
          <Input 
            type="number" 
            value={data.suites} 
            onChange={(e) => onChange('suites', e.target.value)} 
            className="mt-1" 
          />
        </div>

        <div>
          <Label className="text-sm font-semibold text-slate-700">Vagas</Label>
          <Input 
            type="number" 
            value={data.parking_spaces} 
            onChange={(e) => onChange('parking_spaces', e.target.value)} 
            className="mt-1" 
          />
        </div>
      </div>
    </div>
  );
}
