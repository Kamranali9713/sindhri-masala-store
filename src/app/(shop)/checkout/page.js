import CheckoutForm from '@/components/checkout/CheckoutForm';

export const metadata = { title: 'Checkout | Sindhri Masala' };

export default function CheckoutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      <CheckoutForm />
    </div>
  );
}
