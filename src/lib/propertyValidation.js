
export function validatePropertyForm(data) {
  const errors = {};

  // Aba Básico
  if (!data.title || data.title.length < 10) {
    errors.title = "O título deve ter no mínimo 10 caracteres.";
  }
  if (!data.neighborhood) {
    errors.neighborhood = "O bairro é obrigatório.";
  }
  if (!data.address) {
    errors.address = "O endereço é obrigatório.";
  }

  // Aba Detalhes
  if (!data.area || isNaN(data.area) || Number(data.area) <= 0) {
    errors.area = "Área válida é obrigatória.";
  }
  if (!data.bedrooms || isNaN(data.bedrooms) || Number(data.bedrooms) < 0) {
    errors.bedrooms = "Número de quartos é obrigatório.";
  }
  if (!data.bathrooms || isNaN(data.bathrooms) || Number(data.bathrooms) < 0) {
    errors.bathrooms = "Número de banheiros é obrigatório.";
  }

  // Aba SEO
  if (!data.meta_title) {
    errors.meta_title = "O Meta Title é obrigatório para SEO.";
  }

  // Format validations
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.contact_email && !emailRegex.test(data.contact_email)) {
    errors.contact_email = "Formato de e-mail inválido.";
  }

  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  if (data.video_url && !urlRegex.test(data.video_url)) {
    errors.video_url = "URL do vídeo inválida.";
  }
  if (data.virtual_tour_url && !urlRegex.test(data.virtual_tour_url)) {
    errors.virtual_tour_url = "URL do tour virtual inválida.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
