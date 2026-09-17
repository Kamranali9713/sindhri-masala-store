import { createClient } from '@/lib/supabase/server';

export async function getSiteSettings() {
  const supabase = createClient();
  const { data } = await supabase.from('site_settings').select('*').limit(1).single();
  return data;
}

export async function getSocialLinks() {
  const supabase = createClient();
  const { data } = await supabase
    .from('social_links')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');
  return data || [];
}

export async function getContactPage() {
  const supabase = createClient();
  const { data } = await supabase.from('contact_page').select('*').limit(1).single();
  return data;
}

export async function getAboutPage() {
  const supabase = createClient();
  const { data } = await supabase.from('about_page').select('*').limit(1).single();
  return data;
}
