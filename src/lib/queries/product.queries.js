import { createClient } from '@/lib/supabase/server';

export async function getFeaturedProducts() {
  const supabase = createClient();
  const { data } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false });
  return data || [];
}

export async function getBestSellers() {
  const supabase = createClient();
  const { data } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .eq('is_active', true)
    .eq('is_best_seller', true);
  return data || [];
}

export async function getAllProducts({ search, categorySlug, featured } = {}) {
  const supabase = createClient();
  let query = supabase
    .from('products')
    .select('*, product_variants(*), categories(name, slug)')
    .eq('is_active', true);

  if (search) query = query.ilike('name', `%${search}%`);
  if (featured) query = query.eq('is_featured', true);
  if (categorySlug) {
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single();
    if (cat) query = query.eq('category_id', cat.id);
  }

  const { data } = await query.order('created_at', { ascending: false });
  return data || [];
}

export async function getProductBySlug(slug) {
  const supabase = createClient();
  const { data } = await supabase
    .from('products')
    .select('*, product_variants(*), product_images(*), categories(name, slug)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
  return data;
}

export async function getRelatedProducts(categoryId, excludeId) {
  const supabase = createClient();
  const { data } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .neq('id', excludeId)
    .limit(4);
  return data || [];
}
