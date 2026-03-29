import React, { useState } from 'react';
import { GripVertical, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import BlockRenderer from './BlockRenderer';

const EditorCanvas = ({
    blocks = [],
    selectedBlockId,
    onSelectBlock,
    onDeleteBlock,
    onReorder,
}) => {
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);

    const handleDragStart = (e, index) => {
        console.log('dragstart', index);
        setDraggedIndex(index);

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.setData('text/plain', String(index));
    };

    const handleDragEnter = (e, index) => {
        e.preventDefault();
        console.log('dragenter', index);

        if (draggedIndex !== index) {
            setDragOverIndex(index);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();

        const sourceIndex = Number(e.dataTransfer.getData('text/plain'));
        console.log('drop', { sourceIndex, dropIndex });

        if (
            Number.isNaN(sourceIndex) ||
            sourceIndex === dropIndex ||
            sourceIndex < 0
        ) {
            handleDragEnd();
            return;
        }

        const newBlocks = [...blocks];
        const draggedItem = newBlocks[sourceIndex];

        newBlocks.splice(sourceIndex, 1);
        newBlocks.splice(dropIndex, 0, draggedItem);

        onReorder(newBlocks);
        handleDragEnd();
    };

    const handleDragEnd = () => {
        console.log('dragend');
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    if (blocks.length === 0) {
        return (
            <div className="bg-white border border-dashed rounded-xl p-10 text-center text-gray-500">
                Nenhum bloco adicionado ainda.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {blocks.map((block, index) => (
                <div
                    key={block.id}
                    onDragEnter={(e) => handleDragEnter(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    className={cn(
                        'bg-white rounded-xl border shadow-sm overflow-hidden transition-all duration-200',
                        selectedBlockId === block.id
                            ? 'ring-2 ring-blue-500 border-blue-300'
                            : 'border-gray-200',
                        draggedIndex === index &&
                        'opacity-50 border-dashed border-2 border-gray-400 scale-95',
                        dragOverIndex === index &&
                        draggedIndex !== index &&
                        'border-2 border-[#1a3a52] scale-[1.01] shadow-xl',
                        draggedIndex === null && 'hover:shadow-md'
                    )}
                >
                    <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
                        <div
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragEnd={handleDragEnd}
                            className="flex items-center gap-2 cursor-grab active:cursor-grabbing text-gray-700 select-none"
                            style={{ userSelect: 'none' }}
                        >
                            <GripVertical className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium">{block.label}</span>
                        </div>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteBlock(block.id);
                            }}
                            className="p-2 rounded hover:bg-red-50 text-red-500"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    <div onClick={() => onSelectBlock(block.id)}>
                        <BlockRenderer block={block} editorMode />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EditorCanvas;