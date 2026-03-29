
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Loader2, Info } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { validatePropertyForm } from '@/lib/propertyValidation';

import TabBasico from './TabBasico';
import TabDetalhes from './TabDetalhes';
import TabInfra from './TabInfra';
import TabMidia from './TabMidia';
import TabSEO from './TabSEO';
import TabContato from './TabContato';

const INITIAL_DATA = {
  title: '', slug: '', description: '', neighborhood: '', address: '', lat: '', lng: '',
  business_type: 'venda', price: '', starting_from_price: '', type: 'Apartamento', property_status: 'Pronto',
  area: '', bedrooms: '', bathrooms: '', suites: '', parking_spaces: '',
  amenities: [],
  images: [], plans_urls: [], video_url: '', virtual_tour_url: '',
  meta_title: '', meta_description: '',
  contact_name: '', contact_phone: '', contact_email: '', contact_whatsapp: ''
};

export default function PropertyFormComplete({ propertyId = null, onCancel, onSuccess }) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("basico");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!propertyId);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  const fetchProperty = async () => {
    try {
      setFetching(true);
      const { data, error } = await supabase.from('properties').select('*').eq('id', propertyId).single();
      if (error) throw error;
      if (data) {
        // Map DB fields back to form state
        setFormData({
          ...INITIAL_DATA,
          ...data,
          business_type: data.business_type || 'venda',
          images: data.images || [],
          plans_urls: data.plans_urls || data.floor_plans || [],
          amenities: data.amenities || []
        });
      }
    } catch (error) {
      toast({ title: "Erro ao carregar", description: error.message, variant: "destructive" });
      onCancel();
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const generateSlug = (title) => {
    if (!title) return;
    const slug = title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    handleChange('slug', slug);
  };

  const handleSave = async () => {
    const { isValid, errors: validationErrors } = validatePropertyForm(formData);
    
    if (!isValid) {
      setErrors(validationErrors);
      toast({ 
        title: "Existem erros no formulário", 
        description: "Verifique os campos em vermelho nas abas correspondentes.",
        variant: "destructive" 
      });
      return;
    }

    setLoading(true);
    try {
      const dbPayload = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        neighborhood: formData.neighborhood,
        address: formData.address,
        lat: formData.lat ? parseFloat(formData.lat) : null,
        lng: formData.lng ? parseFloat(formData.lng) : null,
        business_type: formData.business_type,
        price: formData.price ? parseFloat(formData.price) : null,
        starting_from_price: formData.starting_from_price ? parseFloat(formData.starting_from_price) : null,
        type: formData.type,
        property_status: formData.property_status,
        area: parseFloat(formData.area),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        suites: formData.suites ? parseInt(formData.suites) : 0,
        parking_spaces: formData.parking_spaces ? parseInt(formData.parking_spaces) : 0,
        amenities: formData.amenities,
        images: formData.images,
        floor_plans: formData.plans_urls,
        video_url: formData.video_url,
        virtual_tour_url: formData.virtual_tour_url,
        meta_title: formData.meta_title,
        meta_description: formData.meta_description,
        contact_name: formData.contact_name,
        contact_phone: formData.contact_phone,
        contact_email: formData.contact_email,
        contact_whatsapp: formData.contact_whatsapp,
        status: 'active'
      };

      if (propertyId) {
        const { error } = await supabase.from('properties').update(dbPayload).eq('id', propertyId);
        if (error) throw error;
        toast({ title: "Imóvel atualizado com sucesso!" });
      } else {
        const { error } = await supabase.from('properties').insert([dbPayload]);
        if (error) throw error;
        toast({ title: "Imóvel cadastrado com sucesso!" });
      }
      
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-12 flex justify-center items-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b pb-4">
        <div>
          <Button variant="ghost" onClick={onCancel} className="mb-2 -ml-3 text-slate-500 hover:text-slate-900">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Lista
          </Button>
          <h1 className="text-2xl font-bold text-slate-900">{propertyId ? 'Editar Imóvel' : 'Adicionar Novo Imóvel'}</h1>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" onClick={onCancel} className="flex-1 sm:flex-none">Cancelar</Button>
          <Button onClick={handleSave} disabled={loading} className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 text-white">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Salvar Imóvel
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 h-auto bg-white border rounded-lg p-1 shadow-sm mb-6">
          <TabsTrigger value="basico" className="form-tab-trigger py-2.5">Básico</TabsTrigger>
          <TabsTrigger value="detalhes" className="form-tab-trigger py-2.5">Detalhes</TabsTrigger>
          <TabsTrigger value="infra" className="form-tab-trigger py-2.5">Infra</TabsTrigger>
          <TabsTrigger value="midia" className="form-tab-trigger py-2.5">Mídia</TabsTrigger>
          <TabsTrigger value="seo" className="form-tab-trigger py-2.5">SEO</TabsTrigger>
          <TabsTrigger value="contato" className="form-tab-trigger py-2.5">Contato</TabsTrigger>
        </TabsList>

        <TabsContent value="basico" className="mt-0">
          <TabBasico data={formData} onChange={handleChange} errors={errors} onGenerateSlug={generateSlug} />
        </TabsContent>

        <TabsContent value="detalhes" className="mt-0">
          <TabDetalhes data={formData} onChange={handleChange} errors={errors} />
        </TabsContent>

        <TabsContent value="infra" className="mt-0">
          <TabInfra data={formData} onChange={handleChange} />
        </TabsContent>

        <TabsContent value="midia" className="mt-0">
          <TabMidia data={formData} onChange={handleChange} />
        </TabsContent>

        <TabsContent value="seo" className="mt-0">
          <TabSEO data={formData} onChange={handleChange} errors={errors} />
        </TabsContent>

        <TabsContent value="contato" className="mt-0">
          <TabContato data={formData} onChange={handleChange} errors={errors} />
        </TabsContent>
      </Tabs>

    </div>
  );
}
