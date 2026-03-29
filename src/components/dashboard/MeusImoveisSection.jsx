
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { Trash2, Edit, Eye, Plus } from 'lucide-react';

export default function MeusImoveisSection({ onAddClick }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, [user]);

  const fetchProperties = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('broker_id', user.id);
      
      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      toast({ title: "Erro ao carregar imóveis", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este imóvel?")) return;
    try {
      const { error } = await supabase.from('properties').delete().eq('id', id);
      if (error) throw error;
      toast({ title: "Imóvel excluído com sucesso!" });
      fetchProperties();
    } catch (error) {
      toast({ title: "Erro ao excluir", description: error.message, variant: "destructive" });
    }
  };

  if (loading) return <div className="grid grid-cols-1 md:grid-cols-3 gap-4"><Skeleton className="h-64 w-full" /><Skeleton className="h-64 w-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Meus Imóveis ({properties.length})</h2>
        <Button onClick={onAddClick}><Plus className="w-4 h-4 mr-2" /> Adicionar Novo Imóvel</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map(prop => (
          <Card key={prop.id} className="overflow-hidden">
            <div className="h-40 bg-muted relative">
              {prop.images?.[0] ? (
                <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">Sem imagem</div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold truncate" title={prop.title}>{prop.title}</h3>
              <p className="text-sm text-muted-foreground">{prop.type} • {prop.neighborhood}</p>
              <div className="mt-4 font-bold text-primary">R$ {prop.price?.toLocaleString('pt-BR')}</div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => toast({ title: "Em breve", description: "Edição será implementada em breve." })}><Edit className="w-4 h-4 mr-2" /> Editar</Button>
                <Button variant="outline" size="sm" onClick={() => window.open(`/detalhes/${prop.id}`, '_blank')}><Eye className="w-4 h-4" /></Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(prop.id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {properties.length === 0 && (
          <div className="col-span-3 text-center py-12 text-muted-foreground">
            Você ainda não possui imóveis cadastrados.
          </div>
        )}
      </div>
    </div>
  );
}
