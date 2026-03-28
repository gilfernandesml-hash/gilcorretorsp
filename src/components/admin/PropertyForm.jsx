import imageCompression from 'browser-image-compression';

const handleImageUpload = async (e, field = 'images') => {
  const files = Array.from(e.target.files || []);
  if (files.length === 0) return;

  const isPlans = field === 'plans_urls';

  if (isPlans) {
    setUploadingPlans(true);
  } else {
    setUploadingImages(true);
  }

  try {
    const newImages = [];

    for (const file of files) {

      // 🔥 COMPRESSÃO + CONVERSÃO PARA JPG
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

      // 🔥 NOME SEGURO (SEM ERRO DE BUILD)
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)}.jpg`;

      // 🔥 UPLOAD CORRETO
      const { error } = await supabase.storage
        .from('property-images')
        .upload(fileName, processedFile);

      if (error) {
        console.error("Erro upload:", error);
        throw error;
      }

      // 🔥 URL PÚBLICA
      const { data } = supabase.storage
        .from('property-images')
        .getPublicUrl(fileName);

      newImages.push(data.publicUrl);
    }

    // 🔥 ATUALIZA FORM
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ...newImages]
    }));

  } catch (error) {
    console.error("❌ ERRO COMPLETO:", error);

    toast({
      title: "Erro no upload",
      description: error.message || "Falha ao enviar arquivos",
      variant: "destructive"
    });

  } finally {
    if (isPlans) {
      setUploadingPlans(false);
    } else {
      setUploadingImages(false);
    }
  }
};