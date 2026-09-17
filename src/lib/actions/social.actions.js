'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function saveSocialLink(formData) {
  const supabase = createClient();
  const payload = {
    platform: formData.platform,
    url: formData.url || null,
    is_active: !!formData.isActive,
    sort_order: formData.sortOrder ?? 0,
  };

  let result;
  if (formData.id) {
    result = await supabase.from('social_links').update(payload).eq('id', formData.id).select().single();
  } else {
    result = await supabase.from('social_links').insert(payload).select().single();
  }

  if (result.error) return { success: false, error: result.error.message };
  revalidatePath('/admin/social-media');
  revalidatePath('/');
  return { success: true, link: result.data };
}

export async function deleteSocialLink(id) {
  const supabase = createClient();
  const { error } = await supabase.from('social_links').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/social-media');
  return { success: true };
}
