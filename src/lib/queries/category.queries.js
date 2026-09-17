import { createClient } from '@/lib/supabase/server';

export async function getAllCategories() {
  const supabase = createClient();
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');
  return data || [];
}

export async function getCategoryBySlug(slug) {
  const supabase = createClient();
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
  return data;
}
