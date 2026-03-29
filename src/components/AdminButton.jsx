import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import AdminPanel from './AdminPanel';
import AdminAuthModal from './AdminAuthModal';

export default function AdminButton() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const checkAuth = () => {
    const tokenStr = localStorage.getItem('adminToken');
    if (tokenStr) {
      try {
        const token = JSON.parse(tokenStr);
        if (token.valid && token.expiresAt > new Date().getTime()) {
          return true;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  };

  const handleButtonClick = () => {
    if (checkAuth()) {
      setIsPanelOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    setIsPanelOpen(true);
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="fixed bottom-[20px] left-[20px] z-[997] w-[50px] h-[50px] rounded-full bg-[#333333] flex items-center justify-center text-white shadow-lg transition-colors duration-300 hover:bg-[#0066FF]"
        aria-label="Painel Administrativo"
      >
        <Settings className="w-6 h-6" />
      </button>

      <AdminAuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={handleAuthSuccess} 
      />

      <AdminPanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
      />
    </>
  );
}