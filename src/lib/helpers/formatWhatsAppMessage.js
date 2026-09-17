import { formatCurrency } from './formatCurrency';

/**
 * Builds the WhatsApp order message text exactly matching the required format:
 * product lines, subtotal, shipping, grand total, customer details.
 */
export function formatWhatsAppMessage({ items, subtotal, shippingCost, grandTotal, customer }) {
  const lines = [];
  lines.push('Hello,');
  lines.push('');
  lines.push('I want to place an order.');
  lines.push('');
  lines.push('Products:');
  lines.push('');

  items.forEach((item) => {
    lines.push(item.name);
    lines.push(`${item.variantLabel} x ${item.quantity}`);
    lines.push(formatCurrency(item.price * item.quantity));
    lines.push('');
  });

  lines.push('-----------------');
  lines.push(`Subtotal: ${formatCurrency(subtotal)}`);
  lines.push(`Shipping: ${formatCurrency(shippingCost)}`);
  lines.push(`Grand Total: ${formatCurrency(grandTotal)}`);
  lines.push('');
  lines.push(`Customer Name: ${customer.name}`);
  lines.push(`Phone: ${customer.phone}`);
  lines.push('');
  lines.push('Address:');
  lines.push(customer.address);
  lines.push('');
  lines.push('City:');
  lines.push(customer.city);

  if (customer.notes) {
    lines.push('');
    lines.push('Notes:');
    lines.push(customer.notes);
  }

  return lines.join('\n');
}

export function buildWhatsAppUrl(phoneNumber, message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encoded}`;
}
