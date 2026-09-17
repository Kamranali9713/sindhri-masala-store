'use client';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/helpers/formatCurrency';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-3">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-6">Browse our masala range and add something delicious.</p>
        <Link href="/products" className="bg-brand-red text-white font-semibold px-6 py-3 rounded-lg">
          Shop Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={`${item.productId}-${item.variantId}`}
            className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4"
          >
            <div className="w-16 h-16 bg-brand-cream rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl">🌶️</span>
              )}
            </div>

            <div className="flex-1">
              <div className="font-semibold">{item.name}</div>
              <div className="text-xs text-gray-500">{item.variantLabel}</div>
              <div className="text-brand-red font-semibold mt-1">{formatCurrency(item.price)}</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                className="w-8 h-8 rounded border border-gray-200 font-bold"
              >
                −
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                className="w-8 h-8 rounded border border-gray-200 font-bold"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(item.productId, item.variantId)}
              className="text-gray-400 hover:text-red-500 ml-2"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-6">
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">{formatCurrency(subtotal)}</span>
        </div>
        <p className="text-xs text-gray-400 mb-4">Shipping is calculated at checkout based on your city.</p>
        <Link
          href="/checkout"
          className="block text-center bg-brand-red text-white font-semibold py-3 rounded-lg hover:bg-brand-dark transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
