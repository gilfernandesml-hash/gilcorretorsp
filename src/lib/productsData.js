const categories = [
  'Emagrecimento',
  'Imunidade',
  'Performance',
  'Saúde e Bem-estar',
  'Dor e Articulações',
  'Masculino',
  'Feminino'
];

const images = [
  "https://images.unsplash.com/photo-1687200267991-d86b8df69968?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1663491749098-d2c923eab56c?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1687200267283-f563c9b7cd97?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1693996045838-980674653385?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1610740654950-070baeb919ee?auto=format&fit=crop&q=80&w=600"
];

const generateProducts = () => {
  const products = [];
  let idCounter = 1;

  categories.forEach((category, catIndex) => {
    for (let i = 0; i < 4; i++) {
      const price = Math.floor(Math.random() * (180 - 40 + 1) + 40) + 0.90;
      const rating = (Math.random() * (5 - 4) + 4).toFixed(1);
      const reviews = Math.floor(Math.random() * 500) + 10;
      const badges = ['Bestseller', 'Promoção', 'Novo', null];
      const badge = badges[Math.floor(Math.random() * badges.length)];
      
      const objectivesMap = {
        'Emagrecimento': ['Emagrecimento', 'Saúde Geral'],
        'Imunidade': ['Imunidade', 'Saúde Geral'],
        'Performance': ['Ganho de Massa', 'Performance'],
        'Saúde e Bem-estar': ['Saúde Geral', 'Beleza'],
        'Dor e Articulações': ['Saúde Geral', 'Performance'],
        'Masculino': ['Performance', 'Ganho de Massa'],
        'Feminino': ['Beleza', 'Emagrecimento']
      };

      products.push({
        id: `prod-${idCounter}`,
        name: `${category} Premium ${i + 1}`,
        category: category,
        price: price,
        description: `O ${category} Premium ${i + 1} é a escolha perfeita para quem busca resultados rápidos e duradouros. Desenvolvido com tecnologia de ponta e ingredientes selecionados.`,
        shortDescription: `Suplemento avançado para ${category.toLowerCase()} com absorção ultra rápida.`,
        benefits: ['Alta absorção', 'Ingredientes naturais', 'Resultados comprovados'],
        ingredients: ['Vitamina C', 'Zinco', 'Extratos naturais'],
        usage: 'Tomar 1 cápsula ao dia com água.',
        differentials: 'Fórmula exclusiva importada.',
        rating: Number(rating),
        reviews: reviews,
        image: images[(idCounter - 1) % images.length],
        badge: badge,
        objectives: objectivesMap[category],
        dateAdded: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
      });
      idCounter++;
    }
  });

  return products;
};

export const productsData = generateProducts();

export const getProductsByCategory = (category) => {
  return productsData.filter(p => p.category === category);
};

export const filterByPrice = (products, min, max) => {
  return products.filter(p => p.price >= min && p.price <= max);
};

export const searchProducts = (products, query) => {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) || 
    p.category.toLowerCase().includes(lowerQuery) ||
    p.shortDescription.toLowerCase().includes(lowerQuery)
  );
};

export const sortProducts = (products, sortBy) => {
  const sorted = [...products];
  switch (sortBy) {
    case 'Menor Preço':
      return sorted.sort((a, b) => a.price - b.price);
    case 'Maior Preço':
      return sorted.sort((a, b) => b.price - a.price);
    case 'Mais Vendidos':
      return sorted.sort((a, b) => b.reviews - a.reviews);
    case 'Melhor Avaliação':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'Mais Recentes':
      return sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    case 'Mais Relevante':
    default:
      return sorted;
  }
};