import { createClient } from '@/lib/supabase/server';
import SeoSettingsManager from '@/components/admin/SeoSettingsManager';

export default async function AdminSeoSettingsPage() {
  const supabase = createClient();
  const { data: rows } = await supabase.from('seo_settings').select('*');
  const existingByKey = Object.fromEntries((rows || []).map((r) => [r.page_key, r]));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">SEO Settings</h1>
      <SeoSettingsManager existingByKey={existingByKey} />
    </div>
  );
}
