
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, X, ArrowUp, ArrowDown } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

export default function TabMidia({ data, onChange }) {
  const { toast } = useToast();
  const [imgUrl, setImgUrl] = useState('');
  const [planUrl, setPlanUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e, field) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    try {
      const newUrls = [];
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { error } = await supabase.storage
          .from('property-images')
          .upload(fileName, file);
          
        if (error) throw error;
        
        const { data: publicData } = supabase.storage
          .from('property-images')
          .getPublicUrl(fileName);
          
        newUrls.push(publicData.publicUrl);
      }
      
      onChange(field, [...data[field], ...newUrls]);
      toast({ title: "Upload concluído!" });
    } catch (error) {
      toast({ title: "Erro no upload", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const addUrl = (url, field, setUrlFn) => {
    if (!url) return;
    onChange(field, [...data[field], url]);
    setUrlFn('');
  };

  const removeUrl = (index, field) => {
    const newList = [...data[field]];
    newList.splice(index, 1);
    onChange(field, newList);
  };

  const moveItem = (index, direction, field) => {
    const newList = [...data[field]];
    if (direction === 'up' && index > 0) {
      [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
    } else if (direction === 'down' && index < newList.length - 1) {
      [newList[index + 1], newList[index]] = [newList[index], newList[index + 1]];
    }
    onChange(field, newList);
  };

  const RenderImageGallery = ({ field, title, description, urlState, setUrlState }) => (
    <div className="space-y-4 border p-4 rounded-lg bg-slate-50">
      <div>
        <h4 className="font-bold text-slate-900">{title}</h4>
        <p className="text-sm text-slate-500 mb-4">{description}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1 flex gap-2">
          <Input 
            value={urlState} 
            onChange={(e) => setUrlState(e.target.value)} 
            placeholder="https://..." 
          />
          <Button type="button" onClick={() => addUrl(urlState, field, setUrlState)} variant="secondary">Add URL</Button>
        </div>
        <div className="relative">
          <Input 
            type="file" 
            multiple 
            accept="image/*" 
            onChange={(e) => handleFileUpload(e, field)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full"
            disabled={uploading}
          />
          <Button type="button" disabled={uploading} className="w-full">
            <Upload className="w-4 h-4 mr-2" /> {uploading ? 'Carregando...' : 'Carregar Imagens'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data[field].length === 0 ? (
          <div className="col-span-full py-8 text-center text-slate-400 border-2 border-dashed rounded-lg bg-white">
            Nenhuma imagem adicionada
          </div>
        ) : (
          data[field].map((url, idx) => (
            <div key={idx} className="relative group rounded-lg overflow-hidden border bg-white shadow-sm aspect-square">
              <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="destructive" className="h-6 w-6" onClick={() => removeUrl(idx, field)}>
                  <X className="w-3 h-3" />
                </Button>
                {idx > 0 && (
                  <Button size="icon" variant="secondary" className="h-6 w-6" onClick={() => moveItem(idx, 'up', field)}>
                    <ArrowUp className="w-3 h-3" />
                  </Button>
                )}
                {idx < data[field].length - 1 && (
                  <Button size="icon" variant="secondary" className="h-6 w-6" onClick={() => moveItem(idx, 'down', field)}>
                    <ArrowDown className="w-3 h-3" />
                  </Button>
                )}
              </div>
              {idx === 0 && field === 'images' && (
                <div className="absolute bottom-0 left-0 right-0 bg-primary/80 text-white text-[10px] text-center py-1 font-bold">CAPA</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 bg-white p-6 rounded-xl border shadow-sm">
      
      <RenderImageGallery 
        field="images" 
        title="Galeria de Fotos" 
        description="Arraste as imagens para reordenar (usando setas). A primeira será a capa do imóvel."
        urlState={imgUrl}
        setUrlState={setImgUrl}
      />

      <RenderImageGallery 
        field="plans_urls" 
        title="Plantas Humanizadas" 
        description="Faça upload das imagens das plantas (JPG/PNG)."
        urlState={planUrl}
        setUrlState={setPlanUrl}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
        <div>
          <Label className="text-sm font-semibold text-slate-700">URL do Vídeo (YouTube)</Label>
          <Input 
            value={data.video_url} 
            onChange={(e) => onChange('video_url', e.target.value)} 
            placeholder="https://youtube.com/watch?v=..." 
            className="mt-1"
          />
          <p className="text-xs text-slate-500 mt-1">Insira o link completo do YouTube.</p>
        </div>
        <div>
          <Label className="text-sm font-semibold text-slate-700">URL do Tour Virtual (Matterport/Outros)</Label>
          <Input 
            value={data.virtual_tour_url} 
            onChange={(e) => onChange('virtual_tour_url', e.target.value)} 
            placeholder="https://my.matterport.com/..." 
            className="mt-1"
          />
        </div>
      </div>

    </div>
  );
}
