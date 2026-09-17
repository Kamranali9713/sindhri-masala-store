'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/helpers/formatCurrency';
import {
  updateOrderStatus,
  deleteOrder,
} from '@/lib/actions/order.actions';

export default function OrdersManager({ orders }) {
  const [loadingId, setLoadingId] = useState(null);

  async function handleStatusChange(orderId, status) {
    setLoadingId(orderId);

    const result = await updateOrderStatus(orderId, status);

    if (!result?.success) {
      alert(result?.error || 'Failed to update order status');
    }

    setLoadingId(null);
  }

  async function handleDelete(orderId, orderNumber) {
    const confirmed = window.confirm(
      `Are you sure you want to delete order ${orderNumber}?`
    );

    if (!confirmed) return;

    setLoadingId(orderId);

    const result = await deleteOrder(orderId);

    if (!result?.success) {
      alert(result?.error || 'Failed to delete order');
    }

    setLoadingId(null);
  }

  if (!orders || orders.length === 0) {
    return (
      <p className="text-gray-500">
        No orders yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
            <div>
              <div className="font-bold text-lg">
                {order.order_number}
              </div>

              <div className="text-sm text-gray-600 mt-1">
                {order.customer_name} — {order.phone}
              </div>

              <div className="text-sm text-gray-500 mt-1">
                {order.address}, {order.city}
              </div>

              {order.notes && (
                <div className="text-sm text-gray-500 mt-1">
                  <strong>Notes:</strong> {order.notes}
                </div>
              )}

              <div className="text-xs text-gray-400 mt-2">
                Source:{' '}
                {order.source === 'direct_whatsapp'
                  ? 'WhatsApp'
                  : 'Direct Order'}
              </div>
            </div>

            {/* Status + Delete */}
            <div className="flex items-center gap-2">
              <select
                value={order.status || 'pending'}
                disabled={loadingId === order.id}
                onChange={(e) =>
                  handleStatusChange(order.id, e.target.value)
                }
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="delivered">Complete</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <button
                type="button"
                disabled={loadingId === order.id}
                onClick={() =>
                  handleDelete(order.id, order.order_number)
                }
                className="px-3 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 disabled:opacity-50"
              >
                {loadingId === order.id ? '...' : 'Delete'}
              </button>
            </div>
          </div>

          {/* Items */}
          <div className="border-t border-gray-100 pt-3 space-y-2">
            {(order.order_items || []).map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm text-gray-600"
              >
                <span>
                  {item.product_name}
                  {item.variant_label
                    ? ` (${item.variant_label})`
                    : ''}{' '}
                  × {item.quantity}
                </span>

                <span>
                  {formatCurrency(item.line_total)}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-gray-100 mt-4 pt-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                {formatCurrency(order.subtotal)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {formatCurrency(order.shipping_cost)}
              </span>
            </div>

            <div className="flex justify-between font-bold text-base pt-2">
              <span>Grand Total</span>
              <span className="text-brand-red">
                {formatCurrency(order.grand_total)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}