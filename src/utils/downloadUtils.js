import JSZip from 'jszip';
import { supabase } from '@/lib/customSupabaseClient';
import { format } from 'date-fns';

export async function downloadCompleteProjectAsZip() {
  try {
    const zip = new JSZip();
    const rootFolder = zip.folder("gil-web-designer");

    // Note: Em um ambiente puramente frontend (browser), não é possível ler o sistema 
    // de arquivos recursivamente. Faremos um "best-effort" buscando os arquivos conhecidos
    // através do servidor de desenvolvimento usando fetch.
    const filesToFetch = [
      'index.html',
      'package.json',
      'vite.config.js',
      'tailwind.config.js',
      'postcss.config.js',
      'README.md',
      'src/main.jsx',
      'src/App.jsx',
      'src/index.css',
      'src/utils/downloadUtils.js',
      'src/components/AdminDownloadSection.jsx',
      'src/components/AdminButton.jsx',
      'src/components/AdminPanel.jsx',
      'src/components/AdminAuthModal.jsx',
      'src/components/ScrollToTopButton.jsx'
    ];

    let successCount = 0;

    for (const filePath of filesToFetch) {
      try {
        const response = await fetch(`/${filePath}`);
        if (response.ok) {
          const blob = await response.blob();
          rootFolder.file(filePath, blob);
          successCount++;
        }
      } catch (e) {
        console.warn(`Não foi possível carregar ${filePath}`, e);
      }
    }

    const blob = await zip.generateAsync({ type: "blob" });
    const sizeInMB = (blob.size / (1024 * 1024)).toFixed(2);
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gil-web-designer-codigo.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return { 
      success: true, 
      message: `Código baixado com sucesso! ${successCount} arquivos incluídos (${sizeInMB} MB).` 
    };
  } catch (error) {
    console.error("Erro ao gerar ZIP do código:", error);
    return { success: false, message: "Erro ao gerar arquivo do código." };
  }
}

export async function downloadDatabase() {
  try {
    const tablesToExport = ['properties', 'leads', 'blog_posts', 'site_settings'];
    const exportData = {};
    let hasData = false;

    for (const table of tablesToExport) {
      const { data, error } = await supabase.from(table).select('*');
      if (!error && data && data.length > 0) {
        exportData[table] = data;
        hasData = true;
      }
    }

    if (!hasData) {
      return { success: false, message: "Nenhum dado para exportar." };
    }

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gil-web-designer-database-${format(new Date(), 'yyyy-MM-dd')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return { success: true, message: "Download do banco de dados concluído." };
  } catch (error) {
    console.error("Erro ao exportar banco de dados:", error);
    return { success: false, message: "Erro ao exportar banco de dados." };
  }
}