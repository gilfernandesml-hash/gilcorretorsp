import { useState, useMemo } from 'react';
import { productsData, sortProducts } from '../lib/productsData';

export function useProductFilters() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedObjectives, setSelectedObjectives] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Mais Relevante');

  const handleCategoryFilter = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handleObjectiveFilter = (objective) => {
    setSelectedObjectives(prev => 
      prev.includes(objective)
        ? prev.filter(o => o !== objective)
        : [...prev, objective]
    );
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (sortOption) => {
    setSortBy(sortOption);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 200]);
    setSelectedObjectives([]);
    setSearchQuery('');
    setSortBy('Mais Relevante');
  };

  const filteredProducts = useMemo(() => {
    let result = productsData;

    // Search filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.category.toLowerCase().includes(lowerQuery) ||
        p.shortDescription.toLowerCase().includes(lowerQuery)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // Objective filter
    if (selectedObjectives.length > 0) {
      result = result.filter(p => 
        p.objectives.some(obj => selectedObjectives.includes(obj))
      );
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    return sortProducts(result, sortBy);
  }, [selectedCategories, priceRange, selectedObjectives, searchQuery, sortBy]);

  return {
    filteredProducts,
    selectedCategories,
    priceRange,
    selectedObjectives,
    searchQuery,
    sortBy,
    handleCategoryFilter,
    handlePriceChange,
    handleObjectiveFilter,
    handleSearch,
    handleSort,
    clearFilters
  };
}