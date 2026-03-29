import React from 'react';
import { Button } from '@/components/ui/button';
import { BLOCK_TYPES } from './blockRegistry';
import { BLOCK_TYPES } from "./blocks/blockRegistry";

const ITEMS = [
    { type: BLOCK_TYPES.HERO, label: 'Hero' },
    { type: BLOCK_TYPES.FEATURED_PROPERTIES, label: 'Imóveis em destaque' },
    { type: BLOCK_TYPES.CTA, label: 'CTA' },
    { type: BLOCK_TYPES.CONTACT, label: 'Contato' },
];

const BlockLibrary = ({ onAddBlock }) => {
    return (
        <div className="bg-white border rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-gray-900">Blocos</h3>

            <div className="grid grid-cols-1 gap-2">
                {ITEMS.map((item) => (
                    <Button
                        key={item.type}
                        type="button"
                        variant="outline"
                        className="justify-start"
                        onClick={() => onAddBlock(item.type)}
                    >
                        + {item.label}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default BlockLibrary;