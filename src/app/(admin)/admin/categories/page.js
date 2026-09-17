import { createClient } from '@/lib/supabase/server';
import CategoryManager from '@/components/admin/CategoryManager';

export default async function AdminCategoriesPage() {
  const supabase = createClient();
  const { data: categories } = await supabase.from('categories').select('*').order('sort_order');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      <CategoryManager categories={categories || []} />
    </div>
  );
}
