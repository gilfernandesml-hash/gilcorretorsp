import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

export function useProducts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Cache for categories
  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
    try {
      if (categories.length > 0) return categories;
      const { data, error: err } = await supabase.from('rs_categories').select('*');
      if (err) throw err;
      setCategories(data || []);
      return data;
    } catch (err) {
      console.error("Error fetching categories", err);
      return [];
    }
  }, [categories]);

  const fetchProducts = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from('rs_products').select('*, rs_categories(name)');

      if (filters.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }
      if (filters.category) {
        query = query.eq('category_id', filters.category);
      }
      if (filters.minPrice !== undefined) {
        // Simple logic for effective price, but Supabase doesn't natively filter by computed easily without functions.
        // Will filter by base price for simplicity or handle slightly off.
        query = query.gte('price', filters.minPrice);
      }
      if (filters.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice);
      }
      if (filters.rating) {
        query = query.gte('rating', filters.rating);
      }
      if (filters.inStock) {
        query = query.eq('in_stock', true);
      }

      // Sorting
      if (filters.sortBy) {
        switch(filters.sortBy) {
          case 'price_asc': query = query.order('price', { ascending: true }); break;
          case 'price_desc': query = query.order('price', { ascending: false }); break;
          case 'rating': query = query.order('rating', { ascending: false }); break;
          case 'newest': query = query.order('created_at', { ascending: false }); break;
          default: query = query.order('reviews_count', { ascending: false }); // Best sellers
        }
      } else {
        query = query.order('reviews_count', { ascending: false });
      }

      const { data, error: err } = await query;
      if (err) throw err;
      return data || [];
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductBySlug = useCallback(async (slug) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('rs_products')
        .select('*, rs_categories(name)')
        .eq('slug', slug)
        .single();
      if (err) throw err;
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductsByCategory = useCallback(async (categoryId, excludeProductId, limit = 4) => {
    try {
      let query = supabase.from('rs_products')
        .select('*, rs_categories(name)')
        .eq('category_id', categoryId)
        .neq('id', excludeProductId)
        .limit(limit);
      
      const { data, error: err } = await query;
      if (err) throw err;
      return data || [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }, []);

  const fetchReviews = useCallback(async (productId) => {
    try {
      const { data, error: err } = await supabase
        .from('rs_reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });
      if (err) throw err;
      return data || [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }, []);

  return {
    loading,
    error,
    fetchProducts,
    fetchProductBySlug,
    fetchProductsByCategory,
    fetchCategories,
    fetchReviews
  };
}