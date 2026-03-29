
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function TabBasico({ data, onChange, errors, onGenerateSlug }) {
  const handleTitleChange = (e) => {
    onChange('title', e.target.value);
    onGenerateSlug(e.target.value);
  };

  // Quill modules for the toolbar
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      ['clean']
    ]
  };

  const plainTextLength = data.description?.replace(/<[^>]*>/g, '').length || 0;

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl border shadow-sm">
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-semibold text-slate-700">Título do Anúncio *</Label>
          <Input 
            value={data.title} 
            onChange={handleTitleChange} 
            placeholder="Ex: Apartamento de Luxo na Vila Mariana" 
            className={`mt-1 ${errors.title ? 'border-red-500' : ''}`}
          />
          {errors.title ? (
            <p className="text-xs text-red-500 mt-1">{errors.title}</p>
          ) : (
            <p className="text-xs text-slate-500 mt-1">Mínimo 10 caracteres.</p>
          )}
        </div>

        <div>
          <Label className="text-sm font-semibold text-slate-700">Slug (URL)</Label>
          <div className="flex items-center mt-1">
            <span className="bg-slate-100 border border-r-0 rounded-l-md px-3 py-2 text-slate-500 text-sm">
              /imovel/
            </span>
            <Input 
              value={data.slug} 
              onChange={(e) => onChange('slug', e.target.value)} 
              className="rounded-l-none"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <Label className="text-sm font-semibold text-slate-700">Descrição do Imóvel</Label>
            <Button type="button" variant="outline" size="sm" className="text-primary border-primary/20 hover:bg-primary/5">
              <Sparkles className="w-4 h-4 mr-2" /> Gerar descrição com IA
            </Button>
          </div>
          <ReactQuill 
            theme="snow" 
            value={data.description} 
            onChange={(val) => onChange('description', val)} 
            modules={modules}
          />
          <div className="flex justify-between mt-2">
            <p className="text-xs text-slate-500">Use títulos e listas para melhorar a legibilidade e o SEO.</p>
            <p className={`text-xs ${plainTextLength < 50 ? 'text-orange-500' : 'text-green-600'}`}>
              {plainTextLength} / 50 caracteres (mínimo recomendado)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-semibold text-slate-700">Bairro *</Label>
            <Input 
              value={data.neighborhood} 
              onChange={(e) => onChange('neighborhood', e.target.value)} 
              className={`mt-1 ${errors.neighborhood ? 'border-red-500' : ''}`}
            />
            {errors.neighborhood && <p className="text-xs text-red-500 mt-1">{errors.neighborhood}</p>}
          </div>
          <div>
            <Label className="text-sm font-semibold text-slate-700">Endereço *</Label>
            <Input 
              value={data.address} 
              onChange={(e) => onChange('address', e.target.value)} 
              className={`mt-1 ${errors.address ? 'border-red-500' : ''}`}
            />
            {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
          </div>
          <div>
            <Label className="text-sm font-semibold text-slate-700">Latitude</Label>
            <Input 
              type="number" 
              value={data.lat} 
              onChange={(e) => onChange('lat', e.target.value)} 
              className="mt-1" 
              placeholder="-23.5505"
            />
          </div>
          <div>
            <Label className="text-sm font-semibold text-slate-700">Longitude</Label>
            <Input 
              type="number" 
              value={data.lng} 
              onChange={(e) => onChange('lng', e.target.value)} 
              className="mt-1" 
              placeholder="-46.6333"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
