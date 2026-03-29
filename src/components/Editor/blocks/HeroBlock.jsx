import React from 'react';

const HeroBlock = ({ props, editorMode = false }) => {
    return (
        <section
            className="rounded-xl overflow-hidden"
            style={{
                backgroundImage: props.backgroundImage
                    ? `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url(${props.backgroundImage})`
                    : 'linear-gradient(135deg, #0f172a, #1e293b)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="px-8 py-16 text-white">
                <p className="text-sm uppercase tracking-wide opacity-80">{props.subtitle}</p>
                <h2 className="text-3xl md:text-5xl font-bold mt-2">{props.title}</h2>
                <p className="mt-4 max-w-2xl text-white/90">{props.description}</p>

                <div className="mt-6">
                    <a
                        href={editorMode ? '#' : props.buttonLink}
                        onClick={(e) => editorMode && e.preventDefault()}
                        className="inline-flex items-center rounded-xl bg-white text-gray-900 px-5 py-3 font-medium"
                    >
                        {props.buttonText}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HeroBlock;