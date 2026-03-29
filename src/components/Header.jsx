
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, User, LogOut, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Imóveis', href: '/properties' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contato', href: '/contato' },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 h-[80px] flex items-center bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        
        <Link to="/" className="flex items-center gap-2 z-50">
          <Building2 className="w-8 h-8 text-primary" />
          <span className="font-bold text-xl text-foreground hidden sm:block">Gil Fernandes Imóveis</span>
          <span className="font-bold text-xl text-foreground sm:hidden">GF Imóveis</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 text-foreground font-semibold text-sm mr-2">
            <Phone className="w-4 h-4 text-primary" /> (11) 9715-7373
          </div>

          {!user ? (
            <Button asChild variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/login"><User className="w-4 h-4 mr-2" /> Login</Link>
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" onClick={handleLogout} className="text-destructive hover:bg-destructive/10">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        <button 
          className="lg:hidden p-2 text-foreground z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-background z-40 transition-transform duration-300 lg:hidden flex flex-col pt-24 px-6 gap-6 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-semibold text-foreground border-b border-border pb-4 hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="mt-4 flex flex-col gap-4">
          {!user ? (
            <Button asChild className="w-full h-12 bg-primary text-primary-foreground" onClick={() => setIsMobileMenuOpen(false)}>
              <Link to="/login">Login</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="outline" className="w-full h-12 border-primary text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="destructive" className="w-full h-12" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>
                Sair
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
