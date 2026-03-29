
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Home, Plus, Search, Upload, Download, Settings, LayoutDashboard, Menu, X, LogOut, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function DashboardLayout({ children, activeTab, setActiveTab }) {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const tabs = [
    { id: 'meus-imoveis', label: 'Meus Imóveis', icon: Home },
    { id: 'adicionar', label: 'Adicionar Imóvel', icon: Plus },
    { id: 'seo', label: 'Gestão SEO', icon: Search },
    { id: 'importar', label: 'Importar CSV', icon: Upload },
    { id: 'backup', label: 'Backup / Export', icon: Download },
    { id: 'principal', label: 'Página Principal', icon: LayoutDashboard },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ];

  const handleCleanDemo = () => {
    toast({
      title: "🚧 Funcionalidade não implementada",
      description: "A limpeza de demo estará disponível em breve! 🚀",
    });
  };

  const NavContent = () => (
    <div className="flex flex-col md:flex-row gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-md whitespace-nowrap transition-colors text-sm font-medium
            ${activeTab === tab.id 
              ? 'bg-primary text-primary-foreground shadow-sm' 
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
        >
          <tab.icon className="w-4 h-4" />
          {tab.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Header */}
      <header className="bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Olá, {user?.user_metadata?.nome_completo || user?.email?.split('@')[0] || 'Corretor'}</h1>
              <p className="text-sm text-muted-foreground hidden md:block">Gerencie seus imóveis e configurações.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="destructive" size="sm" onClick={handleCleanDemo} className="hidden md:flex">
              <Trash2 className="w-4 h-4 mr-2" /> Clean Demo Properties
            </Button>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2 hidden sm:block" /> Sair
            </Button>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="container mx-auto px-4 hidden md:block pb-2">
          <NavContent />
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b px-4 py-4 absolute w-full z-20 shadow-lg">
          <NavContent />
        </div>
      )}

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
