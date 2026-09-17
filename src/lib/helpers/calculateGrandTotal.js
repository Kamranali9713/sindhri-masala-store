export function calculateSubtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function calculateGrandTotal(subtotal, shippingCost) {
  return Number(subtotal) + Number(shippingCost || 0);
}
