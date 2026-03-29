import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, User, Mail, Lock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { aplicarMascaraTelefone } from '@/utils/mascaras';

export default function CadastroPage() {
  const [formData, setFormData] = useState({
    nome_completo: '', email: '', telefone: '', password: '', confirmPassword: '', terms: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === 'telefone') formattedValue = aplicarMascaraTelefone(value);
    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nome_completo || formData.nome_completo.length < 3) newErrors.nome_completo = "Nome completo é obrigatório";
    
    if (!formData.email) newErrors.email = "E-mail é obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "E-mail inválido";
    
    if (!formData.telefone || formData.telefone.length < 14) newErrors.telefone = "Telefone inválido";

    if (!formData.password) newErrors.password = "Senha é obrigatória";
    else if (formData.password.length < 8) newErrors.password = "A senha deve ter pelo menos 8 caracteres";
    else if (!/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
      newErrors.password = "A senha deve conter letra maiúscula e número";
    }

    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "As senhas não coincidem";
    if (!formData.terms) newErrors.terms = "Você deve aceitar os termos";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const result = await signup(formData.email, formData.password, formData.nome_completo, formData.telefone);
    
    if (result.success) {
      toast({ title: "Cadastro realizado com sucesso!", description: "Você já pode fazer login." });
      navigate('/login');
    } else {
      toast({ title: "Erro no cadastro", description: result.error, variant: "destructive" });
      if (result.error?.includes('already registered')) {
        setErrors({ email: "Este e-mail já está em uso." });
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4 py-12">
      <div className="w-full max-w-lg bg-card p-8 rounded-2xl shadow-xl border">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-poppins font-black text-foreground mb-2">Criar Conta</h1>
          <p className="text-muted-foreground">Preencha os dados abaixo para se cadastrar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="nome_completo">Nome Completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input name="nome_completo" placeholder="João da Silva" className={`pl-10 h-12 ${errors.nome_completo ? 'border-destructive' : ''}`} value={formData.nome_completo} onChange={handleChange} />
            </div>
            {errors.nome_completo && <p className="text-xs text-destructive mt-1">{errors.nome_completo}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input name="email" type="email" placeholder="seu@email.com" className={`pl-10 h-12 ${errors.email ? 'border-destructive' : ''}`} value={formData.email} onChange={handleChange} />
            </div>
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone / WhatsApp</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input name="telefone" placeholder="(00) 00000-0000" maxLength={15} className={`pl-10 h-12 ${errors.telefone ? 'border-destructive' : ''}`} value={formData.telefone} onChange={handleChange} />
            </div>
            {errors.telefone && <p className="text-xs text-destructive mt-1">{errors.telefone}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                <Input name="password" type="password" placeholder="••••••••" className={`pl-10 h-12 ${errors.password ? 'border-destructive' : ''}`} value={formData.password} onChange={handleChange} />
              </div>
              {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                <Input name="confirmPassword" type="password" placeholder="••••••••" className={`pl-10 h-12 ${errors.confirmPassword ? 'border-destructive' : ''}`} value={formData.confirmPassword} onChange={handleChange} />
              </div>
              {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="terms" checked={formData.terms} onCheckedChange={(c) => setFormData(p => ({...p, terms: c}))} />
            <Label htmlFor="terms" className={`text-sm ${errors.terms ? 'text-destructive' : 'text-muted-foreground'}`}>
              Li e concordo com os Termos de Serviço e Política de Privacidade.
            </Label>
          </div>

          <Button type="submit" className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg transition-transform active:scale-[0.98] mt-4" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "Criar Conta"}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-muted-foreground">
          Já tem uma conta? <Link to="/login" className="text-primary hover:underline">Faça login</Link>
        </div>
      </div>
    </div>
  );
}