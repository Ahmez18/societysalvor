// src/components/public/WhatsAppFloat.tsx
"use client";

const WHATSAPP_NUMBER = "919999999999"; // TODO: replace with real number
const MESSAGE = encodeURIComponent(
  "Hi, I need help with scrap pickup."
);

export default function WhatsAppFloat() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40"
      aria-label="Chat on WhatsApp"
    >
      <div className="h-12 w-12 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg hover:bg-green-700 transition">
        <span className="text-xl">💬</span>
      </div>
    </a>
  );
}
