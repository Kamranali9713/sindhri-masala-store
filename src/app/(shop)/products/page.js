import { getAllProducts } from '@/lib/queries/product.queries';
import { getAllCategories } from '@/lib/queries/category.queries';
import ProductCard from '@/components/products/ProductCard';
import Link from 'next/link';

export const metadata = { title: 'Shop All Products | Sindhri Masala' };

export default async function ProductsPage({ searchParams }) {
  const { search, category } = searchParams || {};
  const [products, categories] = await Promise.all([
    getAllProducts({ search, categorySlug: category }),
    getAllCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>

      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/products"
          className={`px-4 py-2 rounded-full text-sm border ${!category ? 'bg-brand-red text-white border-brand-red' : 'border-gray-200'}`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className={`px-4 py-2 rounded-full text-sm border ${category === cat.slug ? 'bg-brand-red text-white border-brand-red' : 'border-gray-200'}`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
