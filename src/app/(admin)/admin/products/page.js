import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { formatCurrency } from '@/lib/helpers/formatCurrency';

export default async function AdminProductsPage() {
  const supabase = createClient();
  const { data: products } = await supabase
    .from('products')
    .select('*, categories(name)')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/products/new" className="bg-brand-red text-white px-4 py-2 rounded-lg text-sm font-semibold">
          + Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Featured</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {(products || []).map((p) => (
              <tr key={p.id} className="border-t border-gray-100">
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3">{p.categories?.name || '—'}</td>
                <td className="p-3">{formatCurrency(p.price)}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {p.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-3">{p.is_featured ? '⭐' : ''}</td>
                <td className="p-3">
                  <Link href={`/admin/products/${p.id}/edit`} className="text-brand-red font-semibold">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
