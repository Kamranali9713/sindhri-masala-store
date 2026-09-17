'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateHomepageSection(id, form) {
  const supabase = createClient();
  const { error } = await supabase
    .from('homepage_sections')
    .update({
      title: form.title,
      subtitle: form.subtitle,
      sort_order: form.sortOrder,
      is_active: form.isActive,
    })
    .eq('id', id);

  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/homepage-cms');
  revalidatePath('/');
  return { success: true };
}
