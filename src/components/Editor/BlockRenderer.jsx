import React from 'react';
import HeroBlock from './blocks/HeroBlock';
import FeaturedPropertiesBlock from './blocks/FeaturedPropertiesBlock';
import CTABlock from './blocks/CTABlock';
import ContactBlock from './blocks/ContactBlock';

const BlockRenderer = ({ block, editorMode = false }) => {
    switch (block.type) {
        case 'hero':
            return <HeroBlock props={block.props} editorMode={editorMode} />;
        case 'featured_properties':
            return <FeaturedPropertiesBlock props={block.props} editorMode={editorMode} />;
        case 'cta':
            return <CTABlock props={block.props} editorMode={editorMode} />;
        case 'contact':
            return <ContactBlock props={block.props} editorMode={editorMode} />;
        default:
            return null;
    }
};

export default BlockRenderer;