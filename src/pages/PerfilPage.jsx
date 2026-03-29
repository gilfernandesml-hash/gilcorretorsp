import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Phone, Calendar, Edit3, Key, Package, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { buscarPedidosUsuario } from '@/services/supabasePedidos';
import { useNavigate } from 'react-router-dom';

export default function PerfilPage() {
  const { user, updateUser, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [pedidos, setPedidos] = useState([]);
  const [loadingPedidos, setLoadingPedidos] = useState(true);
  
  const [editData, setEditData] = useState({
    nome_completo: user?.user_metadata?.nome_completo || '',
    telefone: user?.user_metadata?.telefone || ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      buscarPedidosUsuario(user.id)
        .then(data => setPedidos(data || []))
        .catch(err => console.error("Erro ao buscar pedidos:", err))
        .finally(() => setLoadingPedidos(false));
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsEditing(true);
    const result = await updateUser(editData);
    if (result.success) {
      toast({ title: "Perfil atualizado com sucesso!" });
    } else {
      toast({ title: "Erro ao atualizar", description: result.error, variant: "destructive" });
    }
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-16">
      <div className="bg-background py-10 border-b">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 flex items-center gap-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <User className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-3xl font-poppins font-black text-foreground">Meu Perfil</h1>
            <p className="text-muted-foreground font-medium">Gerencie suas informações e pedidos.</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card border rounded-2xl p-6 shadow-sm">
              <h3 className="font-poppins font-bold text-lg mb-4 pb-2 border-b">Dados Pessoais</h3>
              <div className="space-y-4 text-sm font-medium">
                <div className="flex items-center gap-3 text-foreground">
                  <User className="w-5 h-5 text-muted-foreground" />
                  {user?.user_metadata?.nome_completo || 'Sem nome'}
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  {user?.email}
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  {user?.user_metadata?.telefone || 'Sem telefone'}
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  Membro desde {new Date(user?.created_at).toLocaleDateString('pt-BR')}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start gap-2 h-12 font-bold">
                      <Edit3 className="w-4 h-4" /> Editar Perfil
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Perfil</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdateProfile} className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Nome Completo</Label>
                        <Input value={editData.nome_completo} onChange={e => setEditData({...editData, nome_completo: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <Label>Telefone</Label>
                        <Input value={editData.telefone} onChange={e => setEditData({...editData, telefone: e.target.value})} />
                      </div>
                      <Button type="submit" className="w-full h-12 font-bold" disabled={isEditing}>
                        {isEditing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Salvar Alterações"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Button variant="destructive" className="w-full justify-start gap-2 h-12 font-bold bg-destructive/10 text-destructive hover:bg-destructive hover:text-white" onClick={handleLogout}>
                  Sair da Conta
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-card border rounded-2xl p-6 shadow-sm min-h-[400px]">
              <div className="flex justify-between items-center mb-6 pb-2 border-b">
                <h3 className="font-poppins font-bold text-xl flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" /> Últimos Pedidos
                </h3>
                <Button variant="link" onClick={() => navigate('/meus-pedidos')} className="text-primary font-bold">
                  Ver todos
                </Button>
              </div>

              {loadingPedidos ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : pedidos.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p className="font-medium text-lg">Você ainda não possui pedidos.</p>
                  <Button onClick={() => navigate('/produtos')} className="mt-4 font-bold">Ir para a Loja</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {pedidos.slice(0, 5).map(pedido => (
                    <div key={pedido.id} className="border rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-primary/50 transition-colors">
                      <div>
                        <div className="font-bold text-lg mb-1">Pedido #{pedido.numero_pedido}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(pedido.created_at).toLocaleDateString('pt-BR')} • {pedido.itens_pedido?.length || 0} item(ns)
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${pedido.status === 'approved' ? 'bg-success/20 text-success' : 'bg-amber-100 text-amber-800'}`}>
                          {pedido.status === 'approved' ? 'Aprovado' : 'Aguardando'}
                        </span>
                        <div className="font-poppins font-bold text-primary">
                          R$ {Number(pedido.total).toFixed(2).replace('.', ',')}
                        </div>
                        <Button variant="outline" size="sm" onClick={() => navigate(`/pedido/${pedido.id}`)} className="w-full sm:w-auto">
                          Detalhes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}