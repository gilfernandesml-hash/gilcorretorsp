import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, UploadCloud, Image as ImageIcon } from 'lucide-react';

export default function FormProduto({ initialData = null }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || '',
    category: initialData?.category || '',
    stock: initialData?.stock || '0',
    ativo: initialData ? initialData.stock >= 0 : true, // Proxy for active if we don't have explicit col
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image_url || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "Arquivo muito grande", description: "O tamanho máximo é 5MB", variant: "destructive" });
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return imagePreview;
    
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `produtos/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('produtos')
      .upload(filePath, imageFile);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('produtos')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) {
      toast({ title: "Erro de validação", description: "Preencha os campos obrigatórios.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const imageUrl = await uploadImage();

      const productPayload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock, 10),
        image_url: imageUrl
      };

      if (initialData?.id) {
        const { error } = await supabase.from('rs_products').update(productPayload).eq('id', initialData.id);
        if (error) throw error;
        toast({ title: "Produto atualizado com sucesso!" });
      } else {
        const { error } = await supabase.from('rs_products').insert([productPayload]);
        if (error) throw error;
        toast({ title: "Produto criado com sucesso!" });
      }
      navigate('/admin/produtos');
    } catch (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border space-y-8">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto *</Label>
            <Input id="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="h-12" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$) *</Label>
              <Input id="price" type="number" step="0.01" min="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required className="h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Estoque *</Label>
              <Input id="stock" type="number" min="0" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required className="h-12" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria *</Label>
            <Input id="category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required className="h-12" />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="ativo" checked={formData.ativo} onCheckedChange={c => setFormData({...formData, ativo: c})} />
            <Label htmlFor="ativo" className="font-medium cursor-pointer">Produto Ativo na Loja</Label>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Imagem do Produto</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer relative h-64">
            <input 
              type="file" 
              accept="image/jpeg, image/png, image/webp" 
              onChange={handleImageChange} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
            ) : (
              <>
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <p className="font-bold text-gray-700">Clique ou arraste a imagem</p>
                <p className="text-xs text-gray-500 mt-2">JPG, PNG ou WEBP. Máx 5MB.</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição do Produto</Label>
        <Textarea 
          id="description" 
          value={formData.description} 
          onChange={e => setFormData({...formData, description: e.target.value})} 
          className="min-h-[150px] resize-y"
        />
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button type="button" variant="outline" onClick={() => navigate('/admin/produtos')} className="h-12 px-6">
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting} className="h-12 px-8 font-bold bg-primary hover:bg-primary/90">
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
          {initialData ? 'Salvar Alterações' : 'Criar Produto'}
        </Button>
      </div>

    </form>
  );
}