import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts } from '@/lib/queries/product.queries';
import { getSiteSettings } from '@/lib/queries/settings.queries';
import ProductDetailClient from '@/components/products/ProductDetailClient';
import ProductCard from '@/components/products/ProductCard';

export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.meta_title || `${product.name} | Sindhri Masala`,
    description: product.meta_description || product.short_description,
  };
}

export default async function ProductDetailPage({ params }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const [related, settings] = await Promise.all([
    getRelatedProducts(product.category_id, product.id),
    getSiteSettings(),
  ]);

  const gallery = [product.main_image_url, ...(product.product_images || []).map((i) => i.image_url)].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="aspect-square bg-brand-cream rounded-2xl overflow-hidden flex items-center justify-center">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={gallery[0]} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-6xl">🌶️</span>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-3">
              {gallery.slice(1).map((img, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={img} alt="" className="aspect-square object-cover rounded-lg" />
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <ProductDetailClient product={product} whatsappNumber={settings?.whatsapp_number} />
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
