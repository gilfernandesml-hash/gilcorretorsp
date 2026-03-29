
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, AlertCircle, Search as SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Search from '@/components/Search';
import PropertyFilters from '@/components/PropertyFilters';
import PropertyCard from '@/components/PropertyCard';

export default function PropertyListingPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const initialFilters = {
    type: 'all',
    bedrooms: 'all',
    minPrice: '',
    maxPrice: ''
  };
  const [filters, setFilters] = useState(initialFilters);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase.from('properties').select('*');

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,neighborhood.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`);
      }

      if (filters.type !== 'all') {
        query = query.eq('type', filters.type);
      }

      if (filters.bedrooms !== 'all') {
        query = query.gte('bedrooms', parseInt(filters.bedrooms));
      }

      if (filters.minPrice) {
        query = query.gte('price', parseFloat(filters.minPrice));
      }

      if (filters.maxPrice) {
        query = query.lte('price', parseFloat(filters.maxPrice));
      }

      const { data, error: sbError } = await query.order('created_at', { ascending: false });

      if (sbError) throw sbError;
      
      setProperties(data || []);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Não foi possível carregar os imóveis. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Add a slight debounce for search term to prevent too many queries while typing
    const delayDebounceFn = setTimeout(() => {
      fetchProperties();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-react-hooks/exhaustive-deps
  }, [searchTerm, filters]);

  const handleClearFilters = () => {
    setFilters(initialFilters);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <Helmet>
        <title>Imóveis | Gil Corretor SP</title>
        <meta name="description" content="Explore nossa seleção de imóveis à venda e para locação em São Paulo." />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl font-poppins font-bold text-slate-900">Nossos Imóveis</h1>
            <Search 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              placeholder="Buscar por bairro, cidade ou referência..."
            />
          </div>
          
          <PropertyFilters 
            filters={filters} 
            setFilters={setFilters} 
            onClear={handleClearFilters} 
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-slate-500">Buscando os melhores imóveis para você...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle className="w-16 h-16 text-destructive mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Ops! Ocorreu um erro</h3>
            <p className="text-slate-500 mb-6 max-w-md">{error}</p>
            <Button onClick={fetchProperties}>Tentar Novamente</Button>
          </div>
        ) : properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-lg border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <SearchIcon className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Nenhum imóvel encontrado</h3>
            <p className="text-slate-500 mb-6 max-w-md">
              Não encontramos imóveis que correspondam aos seus filtros atuais. Tente ajustar sua busca.
            </p>
            <Button onClick={handleClearFilters} variant="outline">Limpar Filtros</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
