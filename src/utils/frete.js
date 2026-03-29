export const calcularFrete = (cep, valorCarrinho) => {
  if (!cep || cep.replace(/\D/g, '').length !== 8) return [];

  const temFreteGratis = valorCarrinho >= 150;

  return [
    { id: 'sedex', nome: 'Sedex (1-2 dias úteis)', valor: temFreteGratis ? 0 : 25.00 },
    { id: 'pac', nome: 'PAC (5-7 dias úteis)', valor: temFreteGratis ? 0 : 15.00 },
    { id: 'agendado', nome: 'Agendado (8-10 dias úteis)', valor: temFreteGratis ? 0 : 10.00 }
  ];
};