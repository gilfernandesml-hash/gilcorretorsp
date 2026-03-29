export const validarEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validarTelefone = (telefone) => {
  return telefone.replace(/\D/g, '').length >= 10;
};

export const validarCPF = (cpf) => {
  const cleanCPF = cpf.replace(/\D/g, '');
  if (cleanCPF.length !== 11) return false;
  // Basic length check for UI, real validation would be more complex
  return true;
};

export const validarCEP = (cep) => {
  return cep.replace(/\D/g, '').length === 8;
};

export const validarCartao = (numero) => {
  const cleanNum = numero.replace(/\D/g, '');
  return cleanNum.length >= 13 && cleanNum.length <= 19;
};

export const validarDataValidade = (data) => {
  const re = /^(0[1-9]|1[0-2])\/\d{2}$/;
  return re.test(data);
};

export const validarCVV = (cvv) => {
  const cleanCVV = cvv.replace(/\D/g, '');
  return cleanCVV.length === 3 || cleanCVV.length === 4;
};

export const validarFormularioCheckout = (dados) => {
  const erros = {};
  
  if (!dados.nome || dados.nome.trim().length < 3) erros.nome = "Nome é obrigatório";
  if (!validarEmail(dados.email)) erros.email = "E-mail inválido";
  if (!validarTelefone(dados.telefone)) erros.telefone = "Telefone inválido";
  if (!validarCPF(dados.cpf)) erros.cpf = "CPF inválido";
  
  if (!validarCEP(dados.cep)) erros.cep = "CEP inválido";
  if (!dados.numero) erros.numero = "Número é obrigatório";
  
  if (dados.metodoPagamento === 'cartao') {
    if (!validarCartao(dados.numeroCartao)) erros.numeroCartao = "Cartão inválido";
    if (!dados.nomeCartao) erros.nomeCartao = "Nome no cartão é obrigatório";
    if (!validarDataValidade(dados.validadeCartao)) erros.validadeCartao = "Validade inválida (MM/AA)";
    if (!validarCVV(dados.cvvCartao)) erros.cvvCartao = "CVV inválido";
  }

  return erros;
};