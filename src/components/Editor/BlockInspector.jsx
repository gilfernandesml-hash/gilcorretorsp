import React from 'react';

const Field = ({ label, children }) => (
    <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {children}
    </div>
);

const BlockInspector = ({ block, onUpdateBlock }) => {
    if (!block) {
        return (
            <div className="bg-white border rounded-xl p-4 text-sm text-gray-500">
                Selecione um bloco para editar.
            </div>
        );
    }

    const updateProp = (key, value) => {
        onUpdateBlock(block.id, {
            ...block.props,
            [key]: value,
        });
    };

    return (
        <div className="bg-white border rounded-xl p-4 space-y-4">
            <h3 className="font-semibold text-gray-900">Editar bloco</h3>
            <p className="text-sm text-gray-500">{block.label}</p>

            {block.type === 'hero' && (
                <>
                    <Field label="Título">
                        <input
                            className="w-full border rounded-lg px-3 py-2"
                            value={block.props.title}
                            onChange={(e) => updateProp('title', e.target.value)}
                        />
                    </Field>

                    <Field label="Subtítulo">
                        <input
                            className="w-full border rounded-lg px-3 py-2"
                            value={block.props.subtitle}
                            onChange={(e) => updateProp('subtitle', e.target.value)}
                        />
                    </Field>

                    <Field label="Descrição">
                        <textarea
                            className="w-full border rounded-lg px-3 py-2 min-h-[100px]"
                            value={block.props.description}
                            onChange={(e) => updateProp('description', e.target.value)}
                        />
                    </Field>

                    <Field label="Texto do botão">
                        <input
                            className="w-full border rounded-lg px-3 py-2"
                            value={block.props.buttonText}
                            onChange={(e) => updateProp('buttonText', e.target.value)}
                        />
                    </Field>

                    <Field label="Link do botão">
                        <input
                            className="w-full border rounded-lg px-3 py-2"
                            value={block.props.buttonLink}
                            onChange={(e) => updateProp('buttonLink', e.target.value)}
                        />
                    </Field>

                    <Field label="Imagem de fundo">
                        <input
                            className="w-full border rounded-lg px-3 py-2"
                            value={block.props.backgroundImage}
                            onChange={(e) => updateProp('backgroundImage', e.target.value)}
                        />
                    </Field>
                </>
            )}

            {block.type === 'featured_properties' && (
                <>
                    <Field label="Título">
                        <input
                            className="w-full border rounded-lg px-3 py-2"
                            value={block.props.title}
                            onChange={(e) => updateProp('title', e.target.value)}
                        />
                    </Field>

                    <Field label="Subtítulo">
                        <input
                            className="w-full border rounded-lg px-3 py-2"
                            value={block.props.subtitle}
                            onChange={(e) => updateProp('subtitle', e.target.value)}
                        />
                    </Field>

                    <Field label="Quantidade">
                        <input
                            type="number"
                            className="w-full border rounded-lg px-3 py-2"
                            value={block.props.limit}
                            onChange={(e) => updateProp('limit', Number(e.target.value))}
                        />
                    </Field>
                </>
            )}

            {block.type === 'cta' && (
                <>
                    <Field label="Título">
                        <input
                            className="w-full border rounded-lg px-3 py-2"
                            value={block.props.title}
                            onChange={(e) => updateProp('title', e.target.value)}
                        />
                    </Field>

                    <Field label="Descrição">
                        <textarea
                            className="w-full border rounded-lg px-3 py-2 min-h-[100px]"
                            value={block.props.description}
                            onChange={(e) => updateProp('description', e.target.value)}
                        />
                    </Field>

                    <Field label="Texto do botão">
                        <input
                            className="w-full border rounded-lg px-3 py-2"
                            value={block.props.buttonText}
                            onChange={(e) => updateProp('buttonText', e.target.value)}
                        />
                    </Field>

                    <Field label="Link do botão">
                        <input
                            className="w-full border rounded-lg px-3 py-2"
                            value={block.props.buttonLink}
                            onChange={(e) => updateProp('buttonLink', e.target.value)}
                        />
                    </Field>
                </>
            )}

            {block.type === 'contact' && (
                <>
                    <Field label="Título">
                        <input
                            className="w-full border rounded-lg px-3 py-2"
                            value={block.props.title}
                            onChange={(e) => updateProp('title', e.target.value)}
                        />
                    </Field>

                    <Field label="Descrição">
                        <textarea
                            className="w-full border rounded-lg px-3 py-2 min-h-[100px]"
                            value={block.props.description}
                            onChange={(e) => updateProp('description', e.target.value)}
                        />
                    </Field>
                </>
            )}
        </div>
    );
};

export default BlockInspector;