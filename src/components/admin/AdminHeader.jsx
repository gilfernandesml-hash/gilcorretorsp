import React from 'react';
import { Menu, UserCircle } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Button } from '@/components/ui/button';

export default function AdminHeader({ toggleSidebar }) {
  const { admin } = useAdminAuth();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6 z-10">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
          <Menu className="w-5 h-5" />
        </Button>
        <h2 className="font-poppins font-bold text-lg hidden sm:block text-foreground">
          Painel Administrativo
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-medium bg-muted/50 px-3 py-1.5 rounded-full border">
          <UserCircle className="w-5 h-5 text-primary" />
          <span className="hidden sm:inline-block">{admin?.adminData?.nome || 'Administrador'}</span>
        </div>
      </div>
    </header>
  );
}