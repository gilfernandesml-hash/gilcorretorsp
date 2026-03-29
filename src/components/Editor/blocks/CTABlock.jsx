import React from 'react';

const CTABlock = ({ props, editorMode = false }) => {
    return (
        <section className="px-6 py-12">
            <div className="bg-[#1a3a52] text-white rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold">{props.title}</h2>
                <p className="mt-3 text-white/90 max-w-2xl mx-auto">{props.description}</p>
                <div className="mt-6">
                    <a
                        href={editorMode ? '#' : props.buttonLink}
                        onClick={(e) => editorMode && e.preventDefault()}
                        className="inline-flex rounded-xl bg-white text-[#1a3a52] px-5 py-3 font-semibold"
                    >
                        {props.buttonText}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CTABlock;