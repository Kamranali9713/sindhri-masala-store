'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function saveShippingZone(formData) {
  const supabase = createClient();
  const payload = {
    city_name: formData.cityName,
    shipping_cost: Number(formData.shippingCost),
    is_active: !!formData.isActive,
    is_default: !!formData.isDefault,
  };

  let result;
  if (formData.id) {
    result = await supabase.from('shipping_zones').update(payload).eq('id', formData.id).select().single();
  } else {
    result = await supabase.from('shipping_zones').insert(payload).select().single();
  }

  if (result.error) return { success: false, error: result.error.message };
  revalidatePath('/admin/shipping');
  return { success: true, zone: result.data };
}

export async function deleteShippingZone(id) {
  const supabase = createClient();
  const { error } = await supabase.from('shipping_zones').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/shipping');
  return { success: true };
}

export async function toggleShippingZoneStatus(id, isActive) {
  const supabase = createClient();
  const { error } = await supabase.from('shipping_zones').update({ is_active: isActive }).eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/shipping');
  return { success: true };
}
