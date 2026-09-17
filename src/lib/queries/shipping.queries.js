import { createClient } from '@/lib/supabase/server';

export async function getActiveShippingZones() {
  const supabase = createClient();
  const { data } = await supabase
    .from('shipping_zones')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');
  return data || [];
}
