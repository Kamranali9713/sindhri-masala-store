'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function saveSeoSetting(formData) {
  const supabase = createClient();
  const payload = {
    page_key: formData.pageKey,
    meta_title: formData.metaTitle || null,
    meta_description: formData.metaDescription || null,
    keywords: formData.keywords || null,
    og_image: formData.ogImage || null,
  };

  let result;
  if (formData.id) {
    result = await supabase.from('seo_settings').update(payload).eq('id', formData.id).select().single();
  } else {
    result = await supabase.from('seo_settings').insert(payload).select().single();
  }

  if (result.error) return { success: false, error: result.error.message };
  revalidatePath('/admin/seo-settings');
  return { success: true, seo: result.data };
}
