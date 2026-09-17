'use server';

import { createClient } from '@/lib/supabase/server';
import { toSlug } from '@/lib/helpers/slugify';
import { revalidatePath } from 'next/cache';

export async function saveCategory(formData) {
  const supabase = createClient();
  const payload = {
    name: formData.name,
    slug: toSlug(formData.name),
    description: formData.description || null,
    is_active: !!formData.isActive,
  };

  let result;
  if (formData.id) {
    result = await supabase.from('categories').update(payload).eq('id', formData.id).select().single();
  } else {
    result = await supabase.from('categories').insert(payload).select().single();
  }

  if (result.error) return { success: false, error: result.error.message };
  revalidatePath('/admin/categories');
  revalidatePath('/products');
  return { success: true, category: result.data };
}

export async function deleteCategory(id) {
  const supabase = createClient();
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/categories');
  return { success: true };
}
