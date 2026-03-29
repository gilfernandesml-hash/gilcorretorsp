
import React from 'react';
import { Building2, Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white">
              <Building2 className="w-8 h-8 text-primary" />
              <span className="font-bold text-xl">Gil Fernandes Imóveis</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Seu corretor de imóveis de confiança especializado em imóveis de pequeno, médio e alto padrão nas melhores regiões de São Paulo.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg text-white mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-primary transition-colors">Início</Link></li>
              <li><Link to="/properties" className="hover:text-primary transition-colors">Imóveis</Link></li>
              <li><Link to="/sobre" className="hover:text-primary transition-colors">Sobre Nós</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/contato" className="hover:text-primary transition-colors">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg text-white mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                 <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                 <span>Av. Paulista, 1000 - Bela Vista<br/>São Paulo - SP</span>
              </li>
              <li className="flex items-center gap-3">
                 <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                 <span>(11) 97115-7373 | Whatsapp</span>
              </li>
              <li className="flex items-center gap-3">
                 <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                 <span>gilfernandesml@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg text-white mb-6">Newsletter</h4>
            <p className="text-sm mb-4 text-slate-400">Receba as Melhores Ofertas de imóvei em São Paulo. Inscreva-se para receber novidades.</p>
            <NewsletterForm />
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>© 2026 Gil Fernandes Imóveis - CRECI 129677-F. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
