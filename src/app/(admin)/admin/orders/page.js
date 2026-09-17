// import { createClient } from '@/lib/supabase/server';
// import { formatCurrency } from '@/lib/helpers/formatCurrency';

// export default async function AdminOrdersPage() {
//   const supabase = createClient();
//   const { data: orders } = await supabase
//     .from('orders')
//     .select('*, order_items(*)')
//     .order('created_at', { ascending: false });

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Orders</h1>
//       <div className="space-y-4">
//         {(orders || []).map((o) => (
//           <div key={o.id} className="bg-white border border-gray-100 rounded-xl p-5">
//             <div className="flex justify-between items-start mb-3">
//               <div>
//                 <div className="font-bold">{o.order_number}</div>
//                 <div className="text-sm text-gray-500">{o.customer_name} — {o.phone}</div>
//                 <div className="text-sm text-gray-500">{o.address}, {o.city}</div>
//               </div>
//               <span className="text-xs px-2 py-1 rounded bg-gray-100 capitalize">{o.status}</span>
//             </div>
//             <div className="text-sm space-y-1 mb-3">
//               {(o.order_items || []).map((item) => (
//                 <div key={item.id} className="flex justify-between text-gray-600">
//                   <span>{item.product_name} ({item.variant_label}) x {item.quantity}</span>
//                   <span>{formatCurrency(item.line_total)}</span>
//                 </div>
//               ))}
//             </div>
//             <div className="border-t border-gray-100 pt-3 flex justify-between text-sm font-semibold">
//               <span>Grand Total</span>
//               <span className="text-brand-red">{formatCurrency(o.grand_total)}</span>
//             </div>
//           </div>
//         ))}
//         {(!orders || orders.length === 0) && <p className="text-gray-500">No orders yet.</p>}
//       </div>
//     </div>
//   );
// }


import { createClient } from '@/lib/supabase/server';
import OrdersManager from '@/components/admin/OrdersManager';

export default async function AdminOrdersPage() {
  const supabase = createClient();

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', {
      ascending: false,
    });

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">
          Orders
        </h1>

        <p className="text-red-500">
          Failed to load orders: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Orders
      </h1>

      <OrdersManager orders={orders || []} />
    </div>
  );
}