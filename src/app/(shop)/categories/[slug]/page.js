import { notFound } from 'next/navigation';
import { getCategoryBySlug } from '@/lib/queries/category.queries';
import { getAllProducts } from '@/lib/queries/product.queries';
import ProductCard from '@/components/products/ProductCard';

export default async function CategoryPage({ params }) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) notFound();
  const products = await getAllProducts({ categorySlug: params.slug });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-2">{category.name}</h1>
      {category.description && <p className="text-gray-500 mb-8">{category.description}</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
