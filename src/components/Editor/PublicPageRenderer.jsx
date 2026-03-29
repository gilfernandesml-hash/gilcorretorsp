import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import BlockRenderer from './BlockRenderer';

const PublicPageRenderer = ({ pageKey = 'home' }) => {
    const [layout, setLayout] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const { data } = await supabase
                .from('page_layouts')
                .select('layout')
                .eq('page_key', pageKey)
                .maybeSingle();

            setLayout(data?.layout || []);
            setLoading(false);
        };

        load();
    }, [pageKey]);

    if (loading) return null;

    return (
        <>
            {layout.map((block) => (
                <BlockRenderer key={block.id} block={block} />
            ))}
        </>
    );
};

export default PublicPageRenderer;