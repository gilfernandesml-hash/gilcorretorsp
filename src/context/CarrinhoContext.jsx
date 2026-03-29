import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { adicionarAoCarrinho as apiAdd, removerDoCarrinho as apiRemove, atualizarQuantidade as apiUpdate, limparCarrinho as apiClear, carregarCarrinho as apiLoad } from '@/services/supabaseCarrinho';

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const { user } = useAuth();
  
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('carrinho_items');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [frete, setFrete] = useState(0);
  const [tipoFrete, setTipoFrete] = useState(null);
  const [desconto, setDesconto] = useState(0);
  const [cupomAplicado, setCupomAplicado] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [dadosCliente, setDadosCliente] = useState({});
  const [endereco, setEndereco] = useState({});
  const [metodoPagamento, setMetodoPagamento] = useState('cartao');

  // Recalculate totals
  const subtotal = items.reduce((acc, item) => acc + ((item.price || item.produto_data?.price || 0) * item.quantidade), 0);
  
  useEffect(() => {
    if (subtotal >= 150 && frete > 0) {
      setFrete(0);
    }
  }, [subtotal, frete]);

  const total = Math.max(0, subtotal + frete - desconto);

  useEffect(() => {
    localStorage.setItem('carrinho_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (user) {
      carregarCarrinhoSync();
    } else {
      // Keep local storage items when logged out
    }
  }, [user]);

  const carregarCarrinhoSync = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const dbItems = await apiLoad(user.id);
      if (dbItems && dbItems.length > 0) {
        // Map DB format to local state
        const formatted = dbItems.map(dbItem => ({
          ...dbItem.produto_data,
          id: dbItem.produto_id,
          quantidade: dbItem.quantidade
        }));
        setItems(formatted);
      }
    } catch (e) {
      console.error("Error loading cart from DB", e);
    } finally {
      setIsLoading(false);
    }
  };

  const adicionarAoCarrinho = async (produto, quantidade = 1) => {
    const newItem = { 
      id: produto.id, 
      nome: produto.name, 
      price: produto.price, 
      imagem: produto.image || produto.image_url, 
      categoria: produto.category || (produto.rs_categories ? produto.rs_categories.name : ''),
      quantidade 
    };

    setItems(prev => {
      const existente = prev.find(i => i.id === produto.id);
      if (existente) {
        return prev.map(i => i.id === produto.id ? { ...i, quantidade: i.quantidade + quantidade } : i);
      }
      return [...prev, newItem];
    });

    if (user) {
      try {
        await apiAdd(user.id, produto, quantidade);
      } catch (error) {
        console.error("Failed to sync cart add", error);
      }
    }
  };

  const removerDoCarrinho = async (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
    if (user) {
      try {
        await apiRemove(user.id, id);
      } catch (error) {
        console.error("Failed to sync cart remove", error);
      }
    }
  };

  const atualizarQuantidade = async (id, quantidade) => {
    if (quantidade < 1) return;
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantidade } : i));
    if (user) {
      try {
        await apiUpdate(user.id, id, quantidade);
      } catch (error) {
        console.error("Failed to sync cart update", error);
      }
    }
  };

  const limparCarrinho = async () => {
    setItems([]);
    setFrete(0);
    setTipoFrete(null);
    setDesconto(0);
    setCupomAplicado(null);
    if (user) {
      try {
        await apiClear(user.id);
      } catch (error) {
        console.error("Failed to sync cart clear", error);
      }
    }
  };

  const aplicarDesconto = (cupom) => {
    if (cupom.toUpperCase() === 'ROSA10') {
      setDesconto(subtotal * 0.1);
      setCupomAplicado(cupom);
      return true;
    }
    return false;
  };

  const selecionarFrete = (tipo, valor) => {
    setTipoFrete(tipo);
    setFrete(valor);
  };

  return (
    <CarrinhoContext.Provider value={{
      items, subtotal, total, frete, desconto, cupomAplicado, tipoFrete, isLoading,
      dadosCliente, endereco, metodoPagamento,
      adicionarAoCarrinho, removerDoCarrinho, atualizarQuantidade, limparCarrinho,
      aplicarDesconto, selecionarFrete, carregarCarrinho: carregarCarrinhoSync,
      setDadosCliente, setEndereco, setMetodoPagamento
    }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinho = () => useContext(CarrinhoContext);