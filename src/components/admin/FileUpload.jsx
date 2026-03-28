import React, { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import { Upload, X, FileText, Loader2, Download, FileType } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

const FileUpload = ({
  files = [],
  onFilesChange,
  bucketName = 'property-images',
  maxSizeMB = 10
}) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  // 🔥 CONVERTE SEMPRE PRA JPG
  const processFile = async (file) => {
    if (file.type.includes('image')) {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.7,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        fileType: 'image/jpeg'
      });

      return new File(
        [compressed],
        file.name.replace(/\.\w+$/, ".jpg"),
        { type: 'image/jpeg' }
      );
    }
    return file;
  };

  const handleFileSelect = async (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    setUploading(true);

    try {
      const uploadPromises = selectedFiles.map(async (file) => {

        const processedFile = await processFile(file);

        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 8)}.jpg`;

        const { error } = await supabase.storage
          .from(bucketName)
          .upload(fileName, processedFile);

        if (error) {
          console.error("Erro upload:", error);
          throw error;
        }

        const { data } = supabase.storage
          .from(bucketName)
          .getPublicUrl(fileName);

        return {
          name: fileName,
          size: processedFile.size,
          type: 'image/jpeg',
          url: data.publicUrl
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);

      onFilesChange([...files, ...uploadedFiles]);

      toast({
        title: "Upload concluído",
        description: `${uploadedFiles.length} imagem(ns) enviada(s)`,
      });

    } catch (error) {
      console.error("Erro completo:", error);

      toast({
        title: "Erro no upload",
        description: error.message || "Falha ao enviar imagem",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    onFilesChange(updated);
  };

  return (
    <div className="space-y-4">

      {/* DROP AREA */}
      <div
        className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer hover:bg-gray-50"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {uploading ? (
          <>
            <Loader2 className="animate-spin mx-auto mb-2" />
            <p>Enviando...</p>
          </>
        ) : (
          <>
            <Upload className="mx-auto mb-2" />
            <p>Clique ou arraste imagens</p>
          </>
        )}
      </div>

      {/* LISTA */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {files.map((file, index) => (
            <div key={index} className="border p-2 rounded flex items-center">

              <div className="flex-1">
                <p className="text-sm truncate">{file.name}</p>
              </div>

              <a href={file.url} target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4 mx-2" />
              </a>

              <button onClick={() => removeFile(index)}>
                <X className="w-4 h-4 text-red-500" />
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;