import React from 'react';

const ContactBlock = ({ props }) => {
    return (
        <section className="px-6 py-10">
            <div className="bg-white rounded-2xl border p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900">{props.title}</h2>
                <p className="mt-3 text-gray-600">{props.description}</p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-xl p-4">WhatsApp</div>
                    <div className="border rounded-xl p-4">Telefone</div>
                    <div className="border rounded-xl p-4">E-mail</div>
                </div>
            </div>
        </section>
    );
};

export default ContactBlock;