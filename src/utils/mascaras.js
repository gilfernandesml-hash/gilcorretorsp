export const aplicarMascaraCEP = (valor) => {
  if (!valor) return '';
  valor = valor.replace(/\D/g, '');
  valor = valor.replace(/^(\d{5})(\d)/, '$1-$2');
  return valor.substring(0, 9);
};

export const aplicarMascaraCPF = (valor) => {
  if (!valor) return '';
  valor = valor.replace(/\D/g, '');
  valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
  valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
  valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return valor.substring(0, 14);
};

export const aplicarMascaraCartao = (valor) => {
  if (!valor) return '';
  valor = valor.replace(/\D/g, '');
  valor = valor.replace(/(\d{4})(?=\d)/g, '$1 ');
  return valor.substring(0, 19);
};

export const aplicarMascaraData = (valor) => {
  if (!valor) return '';
  valor = valor.replace(/\D/g, '');
  valor = valor.replace(/(\d{2})(\d)/, '$1/$2');
  return valor.substring(0, 5);
};

export const aplicarMascaraTelefone = (valor) => {
  if (!valor) return '';
  valor = valor.replace(/\D/g, '');
  if (valor.length <= 10) {
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
  }
  return valor.substring(0, 15);
};