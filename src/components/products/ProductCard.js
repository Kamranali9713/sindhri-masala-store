import Link from 'next/link';
import { formatCurrency } from '@/lib/helpers/formatCurrency';

export default function ProductCard({ product }) {
  const variants = product.product_variants || [];
  const defaultVariant = variants.find((v) => v.is_default) || variants[0];
  const displayPrice = defaultVariant?.price ?? product.price;
  const displaySale = defaultVariant?.sale_price ?? product.sale_price;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition"
    >
      <div className="aspect-square bg-brand-cream flex items-center justify-center overflow-hidden">
        {product.main_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.main_image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <span className="text-4xl">🌶️</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-brand-red transition">
          {product.name}
        </h3>
        {product.short_description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.short_description}</p>
        )}
        <div className="mt-2 flex items-center gap-2">
          {displaySale ? (
            <>
              <span className="font-bold text-brand-red">{formatCurrency(displaySale)}</span>
              <span className="text-xs text-gray-400 line-through">{formatCurrency(displayPrice)}</span>
            </>
          ) : (
            <span className="font-bold text-brand-red">{formatCurrency(displayPrice)}</span>
          )}
          {defaultVariant?.label && (
            <span className="text-xs text-gray-400">/ {defaultVariant.label}</span>
          )}
        </div>
        {product.stock_status === 'out_of_stock' && (
          <span className="inline-block mt-2 text-xs text-white bg-gray-400 px-2 py-0.5 rounded">
            Out of Stock
          </span>
        )}
      </div>
    </Link>
  );
}
