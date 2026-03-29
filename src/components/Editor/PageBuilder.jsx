import React, { useEffect, useMemo, useState } from 'react';
import { Save } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import BlockLibrary from './BlockLibrary';
import EditorCanvas from './EditorCanvas';
import BlockInspector from './BlockInspector';
import { BLOCK_TYPES } from "./blocks/blockRegistry";

const PAGE_KEY = 'home';

const PageBuilder = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [blocks, setBlocks] = useState([]);
    const [selectedBlockId, setSelectedBlockId] = useState(null);

    const selectedBlock = useMemo(
        () => blocks.find((block) => block.id === selectedBlockId) || null,
        [blocks, selectedBlockId]
    );

    useEffect(() => {
        const load = async () => {
            try {
                const { data, error } = await supabase
                    .from('page_layouts')
                    .select('*')
                    .eq('page_key', PAGE_KEY)
                    .maybeSingle();

                if (error) throw error;

                if (data?.layout?.length) {
                    setBlocks(data.layout);
                    setSelectedBlockId(data.layout[0]?.id || null);
                }
            } catch (error) {
                console.error(error);
                toast({
                    title: 'Erro',
                    description: 'Não foi possível carregar o layout.',
                    variant: 'destructive',
                });
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [toast]);

    const handleAddBlock = (type) => {
        const block = createBlock(type);
        if (!block) return;

        setBlocks((prev) => [...prev, block]);
        setSelectedBlockId(block.id);
    };

    const handleDeleteBlock = (id) => {
        setBlocks((prev) => prev.filter((block) => block.id !== id));
        if (selectedBlockId === id) setSelectedBlockId(null);
    };

    const handleUpdateBlock = (id, props) => {
        setBlocks((prev) =>
            prev.map((block) => (block.id === id ? { ...block, props } : block))
        );
    };

    const handleSave = async () => {
        try {
            setSaving(true);

            const payload = {
                page_key: PAGE_KEY,
                layout: blocks,
                updated_at: new Date().toISOString(),
            };

            const { data: existing } = await supabase
                .from('page_layouts')
                .select('id')
                .eq('page_key', PAGE_KEY)
                .maybeSingle();

            let error;

            if (existing?.id) {
                const { error: updateError } = await supabase
                    .from('page_layouts')
                    .update(payload)
                    .eq('page_key', PAGE_KEY);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('page_layouts')
                    .insert([payload]);
                error = insertError;
            }

            if (error) throw error;

            toast({
                title: 'Sucesso',
                description: 'Layout salvo com sucesso.',
            });
        } catch (error) {
            console.error(error);
            toast({
                title: 'Erro',
                description: error.message || 'Falha ao salvar o layout.',
                variant: 'destructive',
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-8">Carregando editor...</div>;
    }

    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-2 space-y-4">
                <BlockLibrary onAddBlock={handleAddBlock} />
                <Button onClick={handleSave} disabled={saving} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Salvando...' : 'Salvar'}
                </Button>
            </div>

            <div className="col-span-12 lg:col-span-7">
                <EditorCanvas
                    blocks={blocks}
                    selectedBlockId={selectedBlockId}
                    onSelectBlock={setSelectedBlockId}
                    onDeleteBlock={handleDeleteBlock}
                    onReorder={setBlocks}
                />
            </div>

            <div className="col-span-12 lg:col-span-3">
                <BlockInspector
                    block={selectedBlock}
                    onUpdateBlock={handleUpdateBlock}
                />
            </div>
        </div>
    );
};

export default PageBuilder;