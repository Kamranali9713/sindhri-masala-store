'use client';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsAppButton({ phoneNumber }) {
  if (!phoneNumber) return null;
  const message = encodeURIComponent('Hello, I have a question about your products.');

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
}
