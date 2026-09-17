import { createClient } from '@/lib/supabase/server';

export async function getHomepageSections() {
  const supabase = createClient();
  const { data } = await supabase
    .from('homepage_sections')
    .select('*, homepage_section_items(*)')
    .eq('is_active', true)
    .order('sort_order');
  return data || [];
}
