import { createClient } from '@/lib/supabase/server';
import SiteSettingsForm from '@/components/admin/SiteSettingsForm';

export default async function AdminSiteSettingsPage() {
  const supabase = createClient();
  const { data: settings } = await supabase.from('site_settings').select('*').limit(1).single();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>
      <SiteSettingsForm settings={settings} />
    </div>
  );
}
