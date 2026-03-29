import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { aplicarMascaraCEP } from '@/utils/mascaras';
import { buscarCEP } from '@/utils/viacep';

export default function BuscadorCEP({ onAddressFound, value, onChange, error }) {
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleSearch = async () => {
    if (!value || value.length < 9) {
      setLocalError('Digite um CEP válido');
      return;
    }

    setLoading(true);
    setLocalError('');
    
    try {
      const address = await buscarCEP(value);
      onAddressFound(address);
    } catch (err) {
      setLocalError('CEP não encontrado. Verifique e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-2">
        <Input 
          placeholder="00000-000"
          value={value}
          onChange={(e) => {
            setLocalError('');
            onChange(aplicarMascaraCEP(e.target.value));
          }}
          maxLength={9}
          className={error || localError ? 'border-destructive' : ''}
        />
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleSearch} 
          disabled={loading}
          className="flex-shrink-0"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </Button>
      </div>
      {(error || localError) && (
        <span className="text-xs text-destructive mt-1 block">{error || localError}</span>
      )}
    </div>
  );
}