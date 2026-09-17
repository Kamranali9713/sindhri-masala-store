import { createClient } from '@/lib/supabase/server';

export async function getFeaturedVideo() {
  const supabase = createClient();
  const { data } = await supabase
    .from('videos')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .limit(1)
    .single();
  return data || null;
}
