import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useProducts } from '@/hooks/useProducts';
import { Link, useNavigate } from 'react-router-dom';

export default function ProductSearchBar({ onSearch, initialValue = '' }) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const wrapperRef = useRef(null);
  const { fetchProducts } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchTerm.length >= 2 && isFocused) {
        const results = await fetchProducts({ search: searchTerm });
        setSuggestions(results.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, isFocused, fetchProducts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFocused(false);
    if (onSearch) {
      onSearch(searchTerm);
    } else {
      navigate(`/catalogo?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full z-30">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          placeholder="Buscar suplementos, categorias..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full pl-10 pr-10 h-12 rounded-[12px] border-2 border-border focus-visible:ring-primary focus-visible:border-primary text-base"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
        {searchTerm && (
          <button type="button" onClick={() => { setSearchTerm(''); setSuggestions([]); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        )}
      </form>

      {isFocused && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-[12px] shadow-xl border overflow-hidden">
          <div className="p-2">
            <h4 className="text-xs font-bold text-muted-foreground uppercase px-2 mb-2">Sugestões</h4>
            {suggestions.map(prod => (
              <Link
                key={prod.id}
                to={`/produto/${prod.slug}`}
                onClick={() => setIsFocused(false)}
                className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <img src={prod.image_url} alt={prod.name} className="w-12 h-12 rounded bg-muted object-cover" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground line-clamp-1">{prod.name}</span>
                  <span className="text-xs text-primary">{prod.rs_categories?.name}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="bg-muted p-2 border-t">
            <button onClick={handleSubmit} className="w-full text-center text-sm font-bold text-primary hover:underline">
              Ver todos os resultados para "{searchTerm}"
            </button>
          </div>
        </div>
      )}
    </div>
  );
}