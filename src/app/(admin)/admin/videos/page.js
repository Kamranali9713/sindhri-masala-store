import { createClient } from '@/lib/supabase/server';
import VideoManager from '@/components/admin/VideoManager';

export default async function AdminVideosPage() {
  const supabase = createClient();
  const { data: videos } = await supabase.from('videos').select('*').order('created_at', { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Video Management</h1>
      <VideoManager videos={videos || []} />
    </div>
  );
}
