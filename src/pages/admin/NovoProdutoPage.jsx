import React from 'react';
import FormProduto from '@/components/admin/FormProduto';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function NovoProdutoPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-poppins font-bold text-gray-900">Novo Produto</h1>
      </div>
      <FormProduto />
    </div>
  );
}