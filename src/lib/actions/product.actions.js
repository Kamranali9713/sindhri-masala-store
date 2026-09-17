'use server';

import { createClient } from '@/lib/supabase/server';
import { toSlug } from '@/lib/helpers/slugify';
import { revalidatePath } from 'next/cache';

export async function saveProduct(formData) {
  const supabase = createClient();

  const payload = {
    name: formData.name,
    slug: toSlug(formData.name),
    category_id: formData.categoryId || null,
    short_description: formData.shortDescription,
    description: formData.description,
    price: Number(formData.price),
    sale_price: formData.salePrice ? Number(formData.salePrice) : null,
    stock_status: formData.stockStatus,
    is_featured: !!formData.isFeatured,
    is_best_seller: !!formData.isBestSeller,
    is_active: !!formData.isActive,
    main_image_url: formData.mainImageUrl || null,
  };

  let result;
  if (formData.id) {
    result = await supabase.from('products').update(payload).eq('id', formData.id).select().single();
  } else {
    result = await supabase.from('products').insert(payload).select().single();
  }

  if (result.error) {
    return { success: false, error: result.error.message };
  }

  revalidatePath('/admin/products');
  revalidatePath('/products');
  return { success: true, product: result.data };
}

export async function deleteProduct(id) {
  const supabase = createClient();
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/products');
  return { success: true };
}

export async function toggleProductStatus(id, isActive) {
  const supabase = createClient();
  const { error } = await supabase.from('products').update({ is_active: isActive }).eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/products');
  return { success: true };
}
