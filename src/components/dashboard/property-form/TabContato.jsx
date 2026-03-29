
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TabContato({ data, onChange, errors }) {
  return (
    <div className="space-y-6 bg-white p-6 rounded-xl border shadow-sm max-w-3xl">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900">Informações de Contato</h3>
        <p className="text-sm text-slate-500">Dados do corretor responsável por este imóvel (opcional). Se deixado em branco, usará os dados gerais do site.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="text-sm font-semibold text-slate-700">Nome do Corretor</Label>
          <Input 
            value={data.contact_name} 
            onChange={(e) => onChange('contact_name', e.target.value)} 
            className="mt-1" 
            placeholder="Gil Fernandes"
          />
        </div>
        <div>
          <Label className="text-sm font-semibold text-slate-700">Email</Label>
          <Input 
            type="email"
            value={data.contact_email} 
            onChange={(e) => onChange('contact_email', e.target.value)} 
            className={`mt-1 ${errors.contact_email ? 'border-red-500' : ''}`} 
            placeholder="contato@email.com"
          />
          {errors.contact_email && <p className="text-xs text-red-500 mt-1">{errors.contact_email}</p>}
        </div>
        <div>
          <Label className="text-sm font-semibold text-slate-700">Telefone Fixo</Label>
          <Input 
            value={data.contact_phone} 
            onChange={(e) => onChange('contact_phone', e.target.value)} 
            className="mt-1" 
            placeholder="(11) 3333-3333"
          />
        </div>
        <div>
          <Label className="text-sm font-semibold text-slate-700">WhatsApp</Label>
          <Input 
            value={data.contact_whatsapp} 
            onChange={(e) => onChange('contact_whatsapp', e.target.value)} 
            className="mt-1" 
            placeholder="(11) 99999-9999"
          />
        </div>
      </div>
    </div>
  );
}
