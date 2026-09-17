import { createClient } from '@/lib/supabase/server';
import ShippingManager from '@/components/admin/ShippingManager';

export default async function AdminShippingPage() {
  const supabase = createClient();
  const { data: zones } = await supabase.from('shipping_zones').select('*').order('sort_order');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Shipping Management</h1>
      <ShippingManager zones={zones || []} />
    </div>
  );
}
