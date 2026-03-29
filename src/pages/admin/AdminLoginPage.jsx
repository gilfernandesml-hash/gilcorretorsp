import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useToast } from '@/components/ui/use-toast';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { loginAdmin } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const result = await loginAdmin(email, password);

    if (result.success) {
      toast({ title: "Login realizado com sucesso!" });
      navigate('/admin/dashboard');
    } else {
      setError(result.error || "Credenciais inválidas ou acesso negado.");
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[#D4547F]/10 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-[#D4547F]" />
            </div>
          </div>
          <h1 className="text-2xl font-poppins font-black text-gray-900 tracking-tight">
            <span className="text-[#D4547F]">Rosa</span> Admin
          </h1>
          <p className="text-gray-500 text-sm mt-1">Acesso restrito a administradores</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail Administrativo</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <Input 
                id="email" 
                type="email" 
                className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <Input 
                id="password" 
                type="password" 
                className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center font-medium">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full h-14 text-lg font-bold bg-[#D4547F] hover:bg-[#b83d66] text-white rounded-xl shadow-lg transition-transform active:scale-[0.98]"
          >
            {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "Entrar no Painel"}
          </Button>
        </form>
      </div>
    </div>
  );
}