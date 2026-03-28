import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

const PropertyForm = () => {
  const { toast } = useToast();

  const [uploadingImages, setUploadingImages] = useState(false);
  const [formData, setFormData] = useState({
    images: [],
    plans_urls: []
  });

  const handleImageUpload = async (e, field = 'images') => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const isPlans = field === 'plans_urls';

    if (isPlans) {
      setUploadingImages(true);
    } else {
      setUploadingImages(true);
    }

    try {
      const newImages = [];

      for (const file of files) {

        // 🔥 COMPRESSÃO + JPG
        const compressed = await imageCompression(file, {
          maxSizeMB: 0.7,
          maxWidthOrHeight: 1600,
          useWebWorker: true,
          fileType: 'image/jpeg'
        });

        const processedFile = new File(
          [compressed],
          file.name.replace(/\.\w+$/, ".jpg"),
          { type: 'image/jpeg' }
        );

        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 8)}.jpg`;

        const { error } = await supabase.storage
          .from('property-images')
          .upload(fileName, processedFile);

        if (error) throw error;

        const { data } = supabase.storage
          .from('property-images')
          .getPublicUrl(fileName);

        newImages.push(data.publicUrl);
      }

      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], ...newImages]
      }));

      toast({
        title: "Upload concluído",
        description: `${newImages.length} imagem(ns) enviada(s)`
      });

    } catch (error) {
      console.error(error);

      toast({
        title: "Erro no upload",
        description: error.message,
        variant: "destructive"
      });

    } finally {
      setUploadingImages(false);
    }
  };

  return (
    <div className="p-6 space-y-4">

      <h2 className="text-xl font-bold">Upload de Imagens</h2>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleImageUpload(e, 'images')}
      />

      {uploadingImages && <p>Enviando...</p>}

      <div className="grid grid-cols-2 gap-4">
        {formData.images.map((img, index) => (
          <img key={index} src={img} className="w-full rounded" />
        ))}
      </div>

    </div>
  );
};

export default PropertyForm;