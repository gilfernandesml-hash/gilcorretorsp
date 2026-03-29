import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Package, ShoppingCart, Users, DollarSign, Loader2 } from 'lucide-react';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState({
    produtos: 0,
    pedidos: 0,
    usuarios: 0,
    faturamento: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch counts (using simple queries for demonstration)
        const { count: prodCount } = await supabase.from('rs_products').select('*', { count: 'exact', head: true });
        const { count: orderCount } = await supabase.from('pedidos').select('*', { count: 'exact', head: true });
        const { count: userCount } = await supabase.from('usuarios').select('*', { count: 'exact', head: true });
        
        // Sum faturamento (approved orders)
        const { data: revData } = await supabase.from('pedidos').select('total').eq('status', 'approved');
        const faturamento = revData ? revData.reduce((acc, curr) => acc + Number(curr.total || 0), 0) : 0;

        setMetrics({
          produtos: prodCount || 0,
          pedidos: orderCount || 0,
          usuarios: userCount || 0,
          faturamento
        });

        // Fetch recent 5 orders
        const { data: orders } = await supabase
          .from('pedidos')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        setRecentOrders(orders || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const MetricCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colorClass}`}>
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">{title}</p>
        <p className="text-3xl font-poppins font-black text-gray-900">{value}</p>
      </div>
    </div>
  );

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      shipped: 'bg-blue-100 text-blue-800',
      delivered: 'bg-emerald-100 text-emerald-800',
      rejected: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800'
    };
    const labelConfig = {
      pending: 'Pendente', approved: 'Pago', shipped: 'Enviado',
      delivered: 'Entregue', rejected: 'Rejeitado', cancelled: 'Cancelado'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusConfig[status] || 'bg-gray-100 text-gray-800'}`}>
        {labelConfig[status] || status}
      </span>
    );
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-poppins font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Produtos" value={metrics.produtos} icon={Package} colorClass="bg-purple-100 text-purple-600" />
        <MetricCard title="Total Pedidos" value={metrics.pedidos} icon={ShoppingCart} colorClass="bg-blue-100 text-blue-600" />
        <MetricCard title="Total Usuários" value={metrics.usuarios} icon={Users} colorClass="bg-orange-100 text-orange-600" />
        <MetricCard 
          title="Faturamento" 
          value={`R$ ${metrics.faturamento.toFixed(2).replace('.', ',')}`} 
          icon={DollarSign} 
          colorClass="bg-green-100 text-green-600" 
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-poppins font-bold text-lg text-gray-900">Últimos Pedidos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Número</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">Nenhum pedido encontrado.</td></tr>
              ) : (
                recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold">#{order.numero_pedido}</td>
                    <td className="px-6 py-4">{order.dados_cliente?.nome || 'N/A'}</td>
                    <td className="px-6 py-4">{new Date(order.created_at).toLocaleDateString('pt-BR')}</td>
                    <td className="px-6 py-4 font-medium text-primary">R$ {Number(order.total).toFixed(2).replace('.', ',')}</td>
                    <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}