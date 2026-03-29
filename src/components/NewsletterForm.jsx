
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { Loader2 } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('newsletters').insert([{ email }]);
      if (error) throw error;
      
      toast({
        title: "Inscrição realizada!",
        description: "Você receberá nossas melhores ofertas em breve.",
      });
      setEmail('');
    } catch (error) {
      toast({
        title: "Erro ao se inscrever",
        description: "Ocorreu um erro, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <Input
        type="email"
        placeholder="Seu melhor e-mail"
        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-accent h-12"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button 
        type="submit" 
        className="bg-accent hover:bg-accent/90 text-accent-foreground h-12 px-8 font-bold"
        disabled={loading}
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Inscrever"}
      </Button>
    </form>
  );
}
