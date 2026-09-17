'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateSiteSettings(id, form) {
  const supabase = createClient();
  const { error } = await supabase
    .from('site_settings')
    .update({
      site_name: form.siteName,
      logo_url: form.logoUrl || null,
      favicon_url: form.faviconUrl || null,
      whatsapp_number: form.whatsappNumber,
      email: form.email || null,
      phone: form.phone || null,
      address: form.address || null,
      google_maps_url: form.googleMapsUrl || null,
      default_social_link: form.defaultSocialLink || null,
      default_shipping_rate: Number(form.defaultShippingRate || 0),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/site-settings');
  revalidatePath('/');
  return { success: true };
}


export async function updateContactPage(id, form) {
  const supabase = createClient();

  const { error } = await supabase
    .from('contact_page')
    .update({
      address: form.address || null,
      phone: form.phone || null,
      email: form.email || null,
      whatsapp: form.whatsapp || null,
      google_map_url: form.googleMapUrl || null,
      business_hours: form.businessHours || null,
    })
    .eq('id', id);

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  revalidatePath('/contact');
  revalidatePath('/admin/contact');

  return {
    success: true,
  };
}
