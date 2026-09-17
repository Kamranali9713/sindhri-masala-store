'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function saveVideo(formData) {
  const supabase = createClient();
  const payload = {
    title: formData.title,
    subtitle: formData.subtitle || null,
    video_url: formData.videoUrl,
    thumbnail_url: formData.thumbnailUrl || null,
    button_text: formData.buttonText || null,
    button_link: formData.buttonLink || null,
    is_featured: !!formData.isFeatured,
    is_active: !!formData.isActive,
  };

  let result;
  if (formData.id) {
    result = await supabase.from('videos').update(payload).eq('id', formData.id).select().single();
  } else {
    result = await supabase.from('videos').insert(payload).select().single();
  }

  if (result.error) return { success: false, error: result.error.message };

  // Only one video can be "featured" at a time for the homepage promo section
  if (payload.is_featured) {
    await supabase.from('videos').update({ is_featured: false }).neq('id', result.data.id);
  }

  revalidatePath('/admin/videos');
  revalidatePath('/');
  return { success: true, video: result.data };
}

export async function deleteVideo(id) {
  const supabase = createClient();
  const { error } = await supabase.from('videos').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/videos');
  return { success: true };
}

export async function toggleVideoStatus(id, isActive) {
  const supabase = createClient();
  const { error } = await supabase.from('videos').update({ is_active: isActive }).eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/videos');
  return { success: true };
}
