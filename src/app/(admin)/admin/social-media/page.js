import { createClient } from '@/lib/supabase/server';
import SocialMediaManager from '@/components/admin/SocialMediaManager';

export default async function AdminSocialMediaPage() {
  const supabase = createClient();
  const [{ data: links }, { data: settings }] = await Promise.all([
    supabase.from('social_links').select('*').order('sort_order'),
    supabase.from('site_settings').select('default_social_link').limit(1).single(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Social Media Settings</h1>
      <p className="text-sm text-gray-500 mb-6">
        If a platform's URL is left empty, its icon will fall back to your site's Default Social Link
        (set in Site Settings) instead of a broken link.
      </p>
      <SocialMediaManager links={links || []} siteUrl={settings?.default_social_link} />
    </div>
  );
}
