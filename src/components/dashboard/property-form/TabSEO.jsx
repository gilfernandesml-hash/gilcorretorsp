
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Sparkles, Globe } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

export default function TabSEO({ data, onChange, errors }) {
  const { toast } = useToast();

  const handleAutoSEO = () => {
    // Basic auto-generation fallback
    if (!data.title || !data.neighborhood || !data.type) {
      toast({
        title: "Dados insuficientes",
        description: "Preencha Título, Tipo e Bairro para gerar SEO automaticamente.",
        variant: "destructive"
      });
      return;
    }
    const metaTitle = `${data.type} em ${data.neighborhood} | Gil Corretor SP`.substring(0, 60);
    const metaDesc = `Excelente oportunidade de ${data.business_type}: ${data.title}. ${data.bedrooms ? `${data.bedrooms} quartos, ` : ''}${data.area ? `${data.area}m². ` : ''}Entre em contato para saber mais detalhes!`.substring(0, 160);
    
    onChange('meta_title', metaTitle);
    onChange('meta_description', metaDesc);
    toast({ title: "SEO Gerado!", description: "Títulos e descrições foram atualizados." });
  };

  return (
    <div className="space-y-8 bg-white p-6 rounded-xl border shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Otimização para Mecanismos de Busca (SEO)</h3>
          <p className="text-sm text-slate-500">Configure como seu imóvel aparecerá no Google e redes sociais.</p>
        </div>
        <Button onClick={handleAutoSEO} type="button" className="bg-blue-600 hover:bg-blue-700 text-white">
          <Sparkles className="w-4 h-4 mr-2" /> Gerar SEO Automático
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Fields */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-1">
              <Label className="text-sm font-semibold text-slate-700">Meta Title *</Label>
              <span className={`text-xs ${data.meta_title.length > 60 ? 'text-red-500' : 'text-slate-500'}`}>
                {data.meta_title.length}/60 caracteres
              </span>
            </div>
            <Input 
              value={data.meta_title} 
              onChange={(e) => onChange('meta_title', e.target.value)} 
              className={errors.meta_title ? 'border-red-500' : ''}
              maxLength={70}
            />
            {errors.meta_title && <p className="text-xs text-red-500 mt-1">{errors.meta_title}</p>}
            <p className="text-xs text-slate-500 mt-1">Ideal: 50-60 caracteres. Títulos muito longos serão cortados (...) pelo Google.</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <Label className="text-sm font-semibold text-slate-700">Meta Description</Label>
              <span className={`text-xs ${data.meta_description.length > 160 ? 'text-red-500' : 'text-slate-500'}`}>
                {data.meta_description.length}/160 caracteres
              </span>
            </div>
            <Textarea 
              value={data.meta_description} 
              onChange={(e) => onChange('meta_description', e.target.value)} 
              className="min-h-[120px]"
              maxLength={200}
            />
            <p className="text-xs text-slate-500 mt-1">Ideal: 150-160 caracteres. Inclua diferenciais e 'call-to-action'.</p>
          </div>
        </div>

        {/* Google Preview */}
        <div className="space-y-4">
          <Label className="text-sm font-semibold text-slate-700 block">Prévia no Google</Label>
          <div className="p-4 border rounded-lg bg-white shadow-sm font-sans max-w-[600px]">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                <Globe className="w-3 h-3 text-slate-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-[#202124] leading-tight">Gil Corretor SP</span>
                <span className="text-[12px] text-[#4d5156] leading-tight break-all">
                  https://gilcorretorsp.com.br/imovel/{data.slug || 'slug-do-imovel'}
                </span>
              </div>
            </div>
            <div className="text-[20px] text-[#1a0dab] hover:underline cursor-pointer mb-1 leading-snug truncate">
              {data.meta_title || 'Título do Imóvel aparecerá aqui'}
            </div>
            <div className="text-[14px] text-[#4d5156] leading-snug line-clamp-2">
              {data.meta_description || 'A descrição do imóvel será exibida aqui para atrair os usuários a clicarem no seu link e conhecerem a propriedade.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
