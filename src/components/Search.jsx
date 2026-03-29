
import React from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Search({ value, onChange, placeholder = "Buscar por localização..." }) {
  const handleClear = () => {
    // Create a synthetic event object to pass to onChange
    onChange({ target: { value: '' } });
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-slate-400" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        className="pl-10 pr-10 h-12 w-full bg-white text-slate-900 border-slate-200 focus-visible:ring-primary"
        value={value}
        onChange={onChange}
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
          type="button"
          aria-label="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
