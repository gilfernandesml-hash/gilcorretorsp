
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import MeusImoveisSection from '@/components/dashboard/MeusImoveisSection';
import AdicionarImoveisSection from '@/components/dashboard/AdicionarImoveisSection';
import GestaoSEOSection from '@/components/dashboard/GestaoSEOSection';
import ImportarCSVSection from '@/components/dashboard/ImportarCSVSection';
import BackupExportSection from '@/components/dashboard/BackupExportSection';
import PaginaPrincipalSection from '@/components/dashboard/PaginaPrincipalSection';
import ConfiguracoesSection from '@/components/dashboard/ConfiguracoesSection';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('meus-imoveis');

  const renderContent = () => {
    switch (activeTab) {
      case 'meus-imoveis':
        return <MeusImoveisSection onAddClick={() => setActiveTab('adicionar')} />;
      case 'adicionar':
        return <AdicionarImoveisSection onCancel={() => setActiveTab('meus-imoveis')} />;
      case 'seo':
        return <GestaoSEOSection />;
      case 'importar':
        return <ImportarCSVSection />;
      case 'backup':
        return <BackupExportSection />;
      case 'principal':
        return <PaginaPrincipalSection />;
      case 'configuracoes':
        return <ConfiguracoesSection />;
      default:
        return <MeusImoveisSection onAddClick={() => setActiveTab('adicionar')} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | Gil Fernandes Imóveis</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      {/* We use negative margin here if there's a global padding from App.jsx, 
          but since we control App.jsx, we can just render the layout */}
      <div className="-mt-[80px] pt-[80px] min-h-screen bg-slate-50 z-20 relative">
        <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
          {renderContent()}
        </DashboardLayout>
      </div>
    </>
  );
}
