
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import PropertyCard from '@/components/PropertyCard';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

export default function FeaturedPropertiesSection() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('featured', true)
          .limit(6);
          
        if (error) throw error;
        setProperties(data || []);
      } catch (err) {
        console.error("Error fetching featured properties:", err);
        setError("Não foi possível carregar os imóveis em destaque.");
      } finally {
        setLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-poppins font-bold text-center text-slate-900 mb-12">
          Imóveis em Destaque
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-lg overflow-hidden border border-slate-100">
                <Skeleton className="h-[250px] w-full" />
                <div className="p-5 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10 flex flex-col items-center">
            <AlertCircle className="w-10 h-10 mb-4" />
            <p>{error}</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center text-slate-500 py-10">
            Nenhum imóvel em destaque no momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
