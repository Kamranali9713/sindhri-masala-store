'use client';

export default function BuyViaWhatsAppButton({ phoneNumber, productName, variantLabel, price }) {
  const message = encodeURIComponent(
    `Hello,\n\nI want to order:\n${productName} (${variantLabel})\nPrice: Rs. ${price}\n\nPlease confirm availability.`
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full block text-center border-2 border-green-500 text-green-600 font-semibold py-3 rounded-lg hover:bg-green-50 transition"
    >
      Buy Through WhatsApp
    </a>
  );
}
