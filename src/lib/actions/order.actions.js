// 'use server';

// import { createClient } from '@/lib/supabase/server';

// function generateOrderNumber() {
//   const ts = Date.now().toString().slice(-6);
//   const rand = Math.floor(Math.random() * 900 + 100);
//   return `SDH-${ts}${rand}`;
// }

// /**
//  * Persists the order + order_items to Supabase before the customer is
//  * redirected to WhatsApp. Runs as a Server Action (no client-side keys used).
//  */
// export async function createOrder({ customer, items, subtotal, shippingCost, grandTotal, source }) {
//   const supabase = createClient();
//   const orderNumber = generateOrderNumber();

//   const { data: order, error } = await supabase
//     .from('orders')
//     .insert({
//       order_number: orderNumber,
//       customer_name: customer.name,
//       phone: customer.phone,
//       address: customer.address,
//       city: customer.city,
//       notes: customer.notes || null,
//       subtotal,
//       shipping_cost: shippingCost,
//       grand_total: grandTotal,
//       source: source || 'checkout',
//     })
//     .select()
//     .single();

//   if (error) {
//     return { success: false, error: error.message };
//   }

//   const orderItems = items.map((item) => ({
//     order_id: order.id,
//     product_id: item.productId,
//     variant_id: item.variantId || null,
//     product_name: item.name,
//     variant_label: item.variantLabel,
//     quantity: item.quantity,
//     unit_price: item.price,
//     line_total: item.price * item.quantity,
//   }));

//   const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

//   if (itemsError) {
//     return { success: false, error: itemsError.message };
//   }

//   return { success: true, orderNumber: order.order_number, orderId: order.id };
// }


'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

function generateOrderNumber() {
  const ts = Date.now().toString().slice(-6);
  const rand = Math.floor(Math.random() * 900 + 100);

  return `SDH-${ts}${rand}`;
}

export async function createOrder({
  customer,
  items,
  subtotal,
  shippingCost,
  grandTotal,
  source,
}) {
  const supabase = createClient();
  const orderNumber = generateOrderNumber();

  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumber,
      customer_name: customer.name,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      notes: customer.notes || null,
      subtotal,
      shipping_cost: shippingCost,
      grand_total: grandTotal,
      source: source || 'checkout',
    })
    .select()
    .single();

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    variant_id: item.variantId || null,
    product_name: item.name,
    variant_label: item.variantLabel || null,
    quantity: item.quantity,
    unit_price: item.price,
    line_total: item.price * item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    return {
      success: false,
      error: itemsError.message,
    };
  }

  revalidatePath('/admin/orders');

  return {
    success: true,
    orderNumber: order.order_number,
    orderId: order.id,
  };
}

export async function updateOrderStatus(orderId, status) {
  const allowedStatuses = [
    'pending',
    'confirmed',
    'delivered',
    'cancelled',
  ];

  if (!allowedStatuses.includes(status)) {
    return {
      success: false,
      error: 'Invalid order status',
    };
  }

  const supabase = createClient();

  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  revalidatePath('/admin/orders');

  return {
    success: true,
  };
}

export async function deleteOrder(orderId) {
  const supabase = createClient();

  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', orderId);

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  revalidatePath('/admin/orders');

  return {
    success: true,
  };
}