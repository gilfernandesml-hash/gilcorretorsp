import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function ConfiguracoesPage() {
  const { admin } = useAdminAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settingsId, setSettingsId] = useState(null);

  const [geral, setGeral] = useState({ site_name: '', contact_email: '', phone: '', address: '', description: '' });
  const [email, setEmail] = useState({ notificar_vendas: true, admin_email: '' });
  // Simplified frete representation
  const [frete, setFrete] = useState({ frete_gratis_acima_de: '150.00', valor_fixo_pac: '25.00' });

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase.from('site_settings').select('*').limit(1).single();
      if (!error && data) {
        setSettingsId(data.id);
        setGeral({
          site_name: data.site_name || '',
          contact_email: data.contact_email || '',
          phone: data.phone || '',
          address: data.company_address || '',
          description: data.site_description || ''
        });
        if (data.email_settings) setEmail(data.email_settings);
        if (data.frete_options && data.frete_options.length > 0) {
           // Mapping generic JSON for demo
           setFrete(data.frete_options[0] || frete);
        }
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        site_name: geral.site_name,
        contact_email: geral.contact_email,
        phone: geral.phone,
        company_address: geral.address,
        site_description: geral.description,
        email_settings: email,
        frete_options: [frete],
        user_id: admin.id // assuming admin is user
      };

      if (settingsId) {
        await supabase.from('site_settings').update(payload).eq('id', settingsId);
      } else {
        const { data } = await supabase.from('site_settings').insert([payload]).select().single();
        if (data) setSettingsId(data.id);
      }
      toast({ title: "Configurações salvas com sucesso!" });
    } catch (err) {
      toast({ title: "Erro ao salvar", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-poppins font-bold text-gray-900">Configurações da Loja</h1>
        <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-primary/90 font-bold gap-2">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Salvar Alterações
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <Tabs defaultValue="geral" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-3 bg-gray-50 h-12">
            <TabsTrigger value="geral" className="font-bold data-[state=active]:bg-white">Geral</TabsTrigger>
            <TabsTrigger value="frete" className="font-bold data-[state=active]:bg-white">Frete e Entregas</TabsTrigger>
            <TabsTrigger value="email" className="font-bold data-[state=active]:bg-white">Notificações Email</TabsTrigger>
          </TabsList>
          
          <TabsContent value="geral" className="space-y-4 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome da Loja</Label>
                <Input value={geral.site_name} onChange={e => setGeral({...geral, site_name: e.target.value})} className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>Email de Contato Público</Label>
                <Input type="email" value={geral.contact_email} onChange={e => setGeral({...geral, contact_email: e.target.value})} className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>Telefone / WhatsApp</Label>
                <Input value={geral.phone} onChange={e => setGeral({...geral, phone: e.target.value})} className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>Endereço Físico (Opcional)</Label>
                <Input value={geral.address} onChange={e => setGeral({...geral, address: e.target.value})} className="bg-gray-50" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Descrição da Loja (SEO)</Label>
              <Textarea value={geral.description} onChange={e => setGeral({...geral, description: e.target.value})} className="bg-gray-50 h-24" />
            </div>
          </TabsContent>

          <TabsContent value="frete" className="space-y-4 animate-in fade-in">
            <div className="space-y-2 max-w-sm">
              <Label>Frete Grátis Acima de (R$)</Label>
              <Input type="number" step="0.01" value={frete.frete_gratis_acima_de} onChange={e => setFrete({...frete, frete_gratis_acima_de: e.target.value})} className="bg-gray-50" />
              <p className="text-xs text-gray-500">Deixe 0 para desativar frete grátis automático.</p>
            </div>
            <div className="space-y-2 max-w-sm">
              <Label>Valor Fixo Padrão (Ex: PAC) (R$)</Label>
              <Input type="number" step="0.01" value={frete.valor_fixo_pac} onChange={e => setFrete({...frete, valor_fixo_pac: e.target.value})} className="bg-gray-50" />
            </div>
          </TabsContent>

          <TabsContent value="email" className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between border p-4 rounded-xl">
              <div>
                <Label className="text-base">Notificações de Novas Vendas</Label>
                <p className="text-sm text-gray-500">Receber um email quando um novo pedido for pago.</p>
              </div>
              <Switch checked={email.notificar_vendas} onCheckedChange={c => setEmail({...email, notificar_vendas: c})} />
            </div>
            <div className="space-y-2 max-w-sm">
              <Label>Email Administrativo para Notificações</Label>
              <Input type="email" value={email.admin_email} onChange={e => setEmail({...email, admin_email: e.target.value})} className="bg-gray-50" placeholder="admin@rosasuplementos.com.br" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}