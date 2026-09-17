import { createClient } from '@/lib/supabase/server';
import ProductForm from '@/components/admin/ProductForm';

export default async function NewProductPage() {
  const supabase = createClient();
  const { data: categories } = await supabase.from('categories').select('*').order('sort_order');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
      <ProductForm categories={categories || []} />
    </div>
  );
}
