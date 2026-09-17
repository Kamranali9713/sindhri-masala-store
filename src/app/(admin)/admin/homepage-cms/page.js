import { createClient } from '@/lib/supabase/server';
import HomepageSectionManager from '@/components/admin/HomepageSectionManager';

export default async function AdminHomepageCmsPage() {
  const supabase = createClient();
  const { data: sections } = await supabase
    .from('homepage_sections')
    .select('*')
    .order('sort_order');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Homepage CMS</h1>
      <p className="text-sm text-gray-500 mb-6">
        Edit each section's title/subtitle and toggle it on or off. Sort order controls where it appears on the homepage.
      </p>
      <HomepageSectionManager sections={sections || []} />
    </div>
  );
}
