export function formatCurrency(amount) {
  const value = Number(amount || 0);
  return `Rs. ${value.toLocaleString('en-PK')}`;
}
