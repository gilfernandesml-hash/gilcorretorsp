export const BLOCK_TYPES = {
    HERO: 'hero',
    FEATURED_PROPERTIES: 'featured_properties',
    CTA: 'cta',
    CONTACT: 'contact',
};

export const DEFAULT_BLOCKS = {
    hero: {
        type: BLOCK_TYPES.HERO,
        label: 'Hero',
        props: {
            title: 'Encontre o imóvel ideal em São Paulo',
            subtitle: 'Os melhores imóveis nos bairros mais valorizados',
            description: 'Consultoria especializada para compra, venda e lançamentos.',
            buttonText: 'Ver imóveis',
            buttonLink: '/imoveis',
            backgroundImage: '',
            overlay: true,
        },
    },
    featured_properties: {
        type: BLOCK_TYPES.FEATURED_PROPERTIES,
        label: 'Imóveis em destaque',
        props: {
            title: 'Imóveis em destaque',
            subtitle: 'Selecionados para você',
            limit: 6,
            onlyFeatured: true,
        },
    },
    cta: {
        type: BLOCK_TYPES.CTA,
        label: 'CTA',
        props: {
            title: 'Fale com um corretor especialista',
            description: 'Receba atendimento rápido e encontre a melhor oportunidade.',
            buttonText: 'Falar no WhatsApp',
            buttonLink: 'https://wa.me/5511999999999',
        },
    },
    contact: {
        type: BLOCK_TYPES.CONTACT,
        label: 'Contato',
        props: {
            title: 'Entre em contato',
            description: 'Estamos prontos para ajudar você.',
            showWhatsApp: true,
            showPhone: true,
            showEmail: true,
        },
    },
};

export const createBlock = (type) => {
    const base = DEFAULT_BLOCKS[type];
    if (!base) return null;

    return {
        id: crypto.randomUUID(),
        type: base.type,
        label: base.label,
        props: structuredClone(base.props),
    };
};