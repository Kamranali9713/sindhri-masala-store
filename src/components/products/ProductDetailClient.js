'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/helpers/formatCurrency';
import { useCartStore } from '@/store/cartStore';
import BuyViaWhatsAppButton from '@/components/whatsapp/BuyViaWhatsAppButton';

export default function ProductDetailClient({ product, whatsappNumber }) {
  const variants = product.product_variants?.length
    ? [...product.product_variants].sort((a, b) => a.sort_order - b.sort_order)
    : [{ id: null, label: 'Standard', price: product.price }];

  const [selectedVariant, setSelectedVariant] = useState(
    variants.find((v) => v.is_default) || variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();

  const price = selectedVariant.sale_price || selectedVariant.price;
  const outOfStock = (selectedVariant.stock_status || product.stock_status) === 'out_of_stock';

  const cartItem = {
    productId: product.id,
    variantId: selectedVariant.id,
    name: product.name,
    variantLabel: selectedVariant.label,
    price,
    quantity,
    image: product.main_image_url,
  };

  return (
    <div>
      {product.short_description && <p className="text-gray-600 mb-4">{product.short_description}</p>}

      <div className="text-3xl font-bold text-brand-red mb-6">{formatCurrency(price)}</div>

      <div className="mb-6">
        <div className="text-sm font-semibold mb-2">Weight</div>
        <div className="flex flex-wrap gap-2">
          {variants.map((v) => (
            <button
              key={v.id || v.label}
              onClick={() => setSelectedVariant(v)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                selectedVariant.label === v.label
                  ? 'bg-brand-red text-white border-brand-red'
                  : 'border-gray-200 hover:border-brand-red'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm font-semibold mb-2">Quantity</div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-9 h-9 rounded-lg border border-gray-200 font-bold"
          >
            −
          </button>
          <span className="w-8 text-center font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-9 h-9 rounded-lg border border-gray-200 font-bold"
          >
            +
          </button>
        </div>
      </div>

      {outOfStock ? (
        <div className="bg-gray-100 text-gray-500 font-semibold text-center py-3 rounded-lg mb-3">
          Out of Stock
        </div>
      ) : (
        <div className="space-y-3">
          <button
            onClick={() => addItem(cartItem)}
            className="w-full bg-brand-red text-white font-semibold py-3 rounded-lg hover:bg-brand-dark transition"
          >
            Add To Cart
          </button>
          <button
            onClick={() => {
              addItem(cartItem);
              router.push('/checkout');
            }}
            className="w-full border-2 border-brand-red text-brand-red font-semibold py-3 rounded-lg hover:bg-brand-cream transition"
          >
            Buy Now
          </button>
          <BuyViaWhatsAppButton
            phoneNumber={whatsappNumber}
            productName={product.name}
            variantLabel={selectedVariant.label}
            price={price}
          />
        </div>
      )}
    </div>
  );
}
