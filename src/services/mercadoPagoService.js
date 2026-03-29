import { supabase } from '@/lib/customSupabaseClient';

export const createPreference = async (items, payer, paymentMethod) => {
  try {
    const { data, error } = await supabase.functions.invoke('mercado-pago-preference', {
      body: { items, payer, payment_method: paymentMethod }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating preference:", error);
    throw error;
  }
};

export const processCardPayment = async (cardToken, installments, amount, payer) => {
  try {
    const { data, error } = await supabase.functions.invoke('mercado-pago-payment', {
      body: { card_token: cardToken, installments, amount, payer }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error processing payment:", error);
    throw error;
  }
};

export const checkPaymentStatus = async (preferenceId) => {
  // In a real app, you would have an endpoint or poll MP directly 
  // if you have a custom proxy, or check your database for webhook updates.
  // We'll simulate a delayed success for UX purposes.
  return new Promise(resolve => {
    setTimeout(() => resolve({ status: 'approved' }), 3000);
  });
};

export const validateCardToken = async (cardData) => {
  // Simulates MP.js tokenizer
  if (!cardData.numeroCartao || cardData.numeroCartao.length < 15) {
    throw new Error("Cartão inválido");
  }
  return "tok_" + Math.random().toString(36).substring(7);
};

export const formatCurrency = (value) => {
  if (isNaN(value)) return 'R$ 0,00';
  return `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
};

export const calculateInstallmentValue = (total, installments) => {
  // Simple simulation: 1-3x no interest, 4-12x with 1.5% am interest
  if (installments <= 3) {
    return total / installments;
  }
  const interestRate = 0.015;
  const val = (total * Math.pow((1 + interestRate), installments)) / installments;
  return val;
};