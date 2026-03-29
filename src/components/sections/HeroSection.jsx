
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('all');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/imoveis?search=${encodeURIComponent(searchTerm)}&type=${type}`);
  };

  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center pt-20">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80')" }}
      >
        <div className="absolute inset-0 bg-slate-900/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-6 drop-shadow-md">
          Seja Bem Vindo !
        </h1>
        <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto drop-shadow">
          A chance de encontrar o imóvel dos sonhos nas melhores regiões de São Paulo começa AQUI!
        </p>

        <div className="bg-white rounded-lg p-6 shadow-xl max-w-4xl mx-auto text-left">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Comprar / Alugar</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-slate-900">
                <option value="buy">Comprar</option>
                <option value="rent">Alugar</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Tipo de Imóvel</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-slate-900"
              >
                <option value="all">Todos os Tipos</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Comercial">Comercial</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Bairro ou Cidade</label>
              <Input 
                placeholder="ex: Pinheiros" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <Button type="submit" className="w-full h-10 bg-primary hover:bg-primary/90 text-white">
              <Search className="w-4 h-4 mr-2" /> Buscar Imóveis
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
