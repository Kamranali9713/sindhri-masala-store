// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useCartStore } from '@/store/cartStore';
// import { formatCurrency } from '@/lib/helpers/formatCurrency';
// import { formatWhatsAppMessage, buildWhatsAppUrl } from '@/lib/helpers/formatWhatsAppMessage';
// import { calculateGrandTotal } from '@/lib/helpers/calculateGrandTotal';
// import { createOrder } from '@/lib/actions/order.actions';
// import { createClient } from '@/lib/supabase/client';

// export default function CheckoutForm() {
//   const { items, getSubtotal, clearCart } = useCartStore();
//   const router = useRouter();
//   const [zones, setZones] = useState([]);
//   const [whatsappNumber, setWhatsappNumber] = useState('923001234567');
//   const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', notes: '' });
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     const supabase = createClient();
//     supabase
//       .from('shipping_zones')
//       .select('*')
//       .eq('is_active', true)
//       .order('sort_order')
//       .then(({ data }) => {
//         setZones(data || []);
//         if (data?.length) setForm((f) => ({ ...f, city: data[0].city_name }));
//       });

//     supabase
//       .from('site_settings')
//       .select('whatsapp_number')
//       .limit(1)
//       .single()
//       .then(({ data }) => {
//         if (data?.whatsapp_number) setWhatsappNumber(data.whatsapp_number);
//       });
//   }, []);

//   const subtotal = getSubtotal();
//   const selectedZone = zones.find((z) => z.city_name === form.city);
//   const shippingCost = selectedZone?.shipping_cost ?? 0;
//   const grandTotal = calculateGrandTotal(subtotal, shippingCost);

//   if (items.length === 0) {
//     return <p className="text-gray-500">Your cart is empty. Add products before checking out.</p>;
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!form.name || !form.phone || !form.address || !form.city) return;
//     setSubmitting(true);

//     const result = await createOrder({
//       customer: form,
//       items,
//       subtotal,
//       shippingCost,
//       grandTotal,
//       source: 'checkout',
//     });

//     const message = formatWhatsAppMessage({
//       items,
//       subtotal,
//       shippingCost,
//       grandTotal,
//       customer: form,
//     });
//     const url = buildWhatsAppUrl(whatsappNumber, message);

//     if (result.success) {
//       clearCart();
//     }
//     setSubmitting(false);
//     window.open(url, '_blank');
//     router.push('/');
//   }

//   return (
//     <div className="grid md:grid-cols-2 gap-10">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="text-sm font-semibold block mb-1">Customer Name</label>
//           <input
//             required
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             className="w-full border border-gray-200 rounded-lg px-4 py-2"
//           />
//         </div>
//         <div>
//           <label className="text-sm font-semibold block mb-1">Phone Number</label>
//           <input
//             required
//             value={form.phone}
//             onChange={(e) => setForm({ ...form, phone: e.target.value })}
//             className="w-full border border-gray-200 rounded-lg px-4 py-2"
//           />
//         </div>
//         <div>
//           <label className="text-sm font-semibold block mb-1">Address</label>
//           <textarea
//             required
//             value={form.address}
//             onChange={(e) => setForm({ ...form, address: e.target.value })}
//             className="w-full border border-gray-200 rounded-lg px-4 py-2"
//             rows={3}
//           />
//         </div>
//         <div>
//           <label className="text-sm font-semibold block mb-1">City</label>
//           <select
//             value={form.city}
//             onChange={(e) => setForm({ ...form, city: e.target.value })}
//             className="w-full border border-gray-200 rounded-lg px-4 py-2"
//           >
//             {zones.map((z) => (
//               <option key={z.id} value={z.city_name}>
//                 {z.city_name} — {formatCurrency(z.shipping_cost)}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="text-sm font-semibold block mb-1">Notes (optional)</label>
//           <textarea
//             value={form.notes}
//             onChange={(e) => setForm({ ...form, notes: e.target.value })}
//             className="w-full border border-gray-200 rounded-lg px-4 py-2"
//             rows={2}
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={submitting}
//           className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
//         >
//           {submitting ? 'Placing Order...' : 'Place Order via WhatsApp'}
//         </button>
//       </form>

//       <div className="bg-white border border-gray-100 rounded-xl p-6 h-fit">
//         <h2 className="font-bold text-lg mb-4">Order Summary</h2>
//         <div className="space-y-3 mb-4">
//           {items.map((item) => (
//             <div key={`${item.productId}-${item.variantId}`} className="flex justify-between text-sm">
//               <span>
//                 {item.name} ({item.variantLabel}) x {item.quantity}
//               </span>
//               <span>{formatCurrency(item.price * item.quantity)}</span>
//             </div>
//           ))}
//         </div>
//         <div className="border-t border-gray-100 pt-4 space-y-2">
//           <div className="flex justify-between text-sm">
//             <span>Subtotal</span>
//             <span>{formatCurrency(subtotal)}</span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span>Shipping ({form.city || '—'})</span>
//             <span>{formatCurrency(shippingCost)}</span>
//           </div>
//           <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100">
//             <span>Grand Total</span>
//             <span className="text-brand-red">{formatCurrency(grandTotal)}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/helpers/formatCurrency';
import {
  formatWhatsAppMessage,
  buildWhatsAppUrl,
} from '@/lib/helpers/formatWhatsAppMessage';
import { calculateGrandTotal } from '@/lib/helpers/calculateGrandTotal';
import { createOrder } from '@/lib/actions/order.actions';
import { createClient } from '@/lib/supabase/client';

export default function CheckoutForm() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const router = useRouter();

  const [zones, setZones] = useState([]);
  const [whatsappNumber, setWhatsappNumber] = useState('923001234567');

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [orderType, setOrderType] = useState('');

  useEffect(() => {
    const supabase = createClient();

    supabase
      .from('shipping_zones')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')
      .then(({ data }) => {
        setZones(data || []);

        if (data?.length) {
          setForm((f) => ({
            ...f,
            city: data[0].city_name,
          }));
        }
      });

    supabase
      .from('site_settings')
      .select('whatsapp_number')
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data?.whatsapp_number) {
          setWhatsappNumber(data.whatsapp_number);
        }
      });
  }, []);

  const subtotal = getSubtotal();

  const selectedZone = zones.find(
    (z) => z.city_name === form.city
  );

  const shippingCost = selectedZone?.shipping_cost ?? 0;

  const grandTotal = calculateGrandTotal(
    subtotal,
    shippingCost
  );

  if (items.length === 0) {
    return (
      <p className="text-gray-500">
        Your cart is empty. Add products before checking out.
      </p>
    );
  }

  async function handleDirectOrder() {
    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city
    ) {
      alert('Please fill all required fields.');
      return;
    }

    setSubmitting(true);
    setOrderType('direct');

    try {
      const result = await createOrder({
        customer: form,
        items,
        subtotal,
        shippingCost,
        grandTotal,
        source: 'checkout',
      });

      if (!result?.success) {
        alert(result?.error || 'Failed to place order.');
        return;
      }

      clearCart();

      alert(
        `Order placed successfully!\nOrder Number: ${result.orderNumber}`
      );

      router.push('/');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Something went wrong while placing the order.');
    } finally {
      setSubmitting(false);
      setOrderType('');
    }
  }

  async function handleWhatsAppOrder() {
    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city
    ) {
      alert('Please fill all required fields.');
      return;
    }

    setSubmitting(true);
    setOrderType('whatsapp');

    try {
      /*
       * Save the order in database first.
       * This means WhatsApp orders are also available
       * in the Admin Panel.
       */
      const result = await createOrder({
        customer: form,
        items,
        subtotal,
        shippingCost,
        grandTotal,
        source: 'direct_whatsapp',
      });

      if (!result?.success) {
        alert(result?.error || 'Failed to create order.');
        return;
      }

      const message = formatWhatsAppMessage({
        items,
        subtotal,
        shippingCost,
        grandTotal,
        customer: form,
      });

      const url = buildWhatsAppUrl(
        whatsappNumber,
        message
      );

      clearCart();

      window.open(url, '_blank');

      router.push('/');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setSubmitting(false);
      setOrderType('');
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-10">

      {/* CHECKOUT FORM */}
      <div>
        <div className="space-y-4">

          {/* NAME */}
          <div>
            <label className="text-sm font-semibold block mb-1">
              Customer Name
            </label>

            <input
              required
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm font-semibold block mb-1">
              Phone Number
            </label>

            <input
              required
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
            />
          </div>

          {/* ADDRESS */}
          <div>
            <label className="text-sm font-semibold block mb-1">
              Address
            </label>

            <textarea
              required
              value={form.address}
              onChange={(e) =>
                setForm({
                  ...form,
                  address: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
              rows={3}
            />
          </div>

          {/* CITY */}
          <div>
            <label className="text-sm font-semibold block mb-1">
              City
            </label>

            <select
              required
              value={form.city}
              onChange={(e) =>
                setForm({
                  ...form,
                  city: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
            >
              {zones.map((z) => (
                <option key={z.id} value={z.city_name}>
                  {z.city_name} —{' '}
                  {formatCurrency(z.shipping_cost)}
                </option>
              ))}
            </select>
          </div>

          {/* NOTES */}
          <div>
            <label className="text-sm font-semibold block mb-1">
              Notes (optional)
            </label>

            <textarea
              value={form.notes}
              onChange={(e) =>
                setForm({
                  ...form,
                  notes: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
              rows={2}
            />
          </div>

          {/* BUTTONS */}
          <div className="pt-3 space-y-3">

            {/* DIRECT ORDER */}
            <button
              type="button"
              onClick={handleDirectOrder}
              disabled={submitting}
              className="w-full bg-brand-red hover:opacity-90 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
            >
              {submitting && orderType === 'direct'
                ? 'Placing Order...'
                : 'Place Direct Order'}
            </button>

            {/* WHATSAPP */}
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              disabled={submitting}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
            >
              {submitting && orderType === 'whatsapp'
                ? 'Opening WhatsApp...'
                : 'Place Order via WhatsApp'}
            </button>

          </div>

          <p className="text-xs text-gray-500">
            Direct Order will be sent directly to our
            order management system. WhatsApp Order will
            also be saved and then opened in WhatsApp.
          </p>
        </div>
      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 h-fit">
        <h2 className="font-bold text-lg mb-4">
          Order Summary
        </h2>

        <div className="space-y-3 mb-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.variantId}`}
              className="flex justify-between text-sm gap-4"
            >
              <span>
                {item.name}
                {item.variantLabel
                  ? ` (${item.variantLabel})`
                  : ''}{' '}
                x {item.quantity}
              </span>

              <span className="whitespace-nowrap">
                {formatCurrency(
                  item.price * item.quantity
                )}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-4 space-y-2">

          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>
              Shipping ({form.city || '—'})
            </span>

            <span>
              {formatCurrency(shippingCost)}
            </span>
          </div>

          <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100">
            <span>Grand Total</span>

            <span className="text-brand-red">
              {formatCurrency(grandTotal)}
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}