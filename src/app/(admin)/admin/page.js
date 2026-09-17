import { createClient } from '@/lib/supabase/server';

export default async function AdminDashboard() {
  const supabase = createClient();
  const [{ count: productCount }, { count: orderCount }, { data: recentOrders }] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="text-sm text-gray-500">Products</div>
          <div className="text-2xl font-bold">{productCount ?? 0}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="text-sm text-gray-500">Total Orders</div>
          <div className="text-2xl font-bold">{orderCount ?? 0}</div>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Order #</th>
              <th className="p-3">Customer</th>
              <th className="p-3">City</th>
              <th className="p-3">Grand Total</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {(recentOrders || []).map((o) => (
              <tr key={o.id} className="border-t border-gray-100">
                <td className="p-3">{o.order_number}</td>
                <td className="p-3">{o.customer_name}</td>
                <td className="p-3">{o.city}</td>
                <td className="p-3">Rs. {o.grand_total}</td>
                <td className="p-3 capitalize">{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
