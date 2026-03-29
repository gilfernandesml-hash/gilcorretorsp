import React from 'react';

const FeaturedPropertiesBlock = ({ props }) => {
    return (
        <section className="px-6 py-10">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{props.title}</h2>
                <p className="text-gray-600">{props.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.from({ length: props.limit || 6 }).map((_, index) => (
                    <div key={index} className="rounded-xl border bg-white p-4 shadow-sm">
                        <div className="h-40 rounded-lg bg-gray-100 mb-3" />
                        <div className="h-5 w-2/3 bg-gray-100 rounded mb-2" />
                        <div className="h-4 w-1/2 bg-gray-100 rounded" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedPropertiesBlock;