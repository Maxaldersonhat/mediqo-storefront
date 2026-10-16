'use client';

import { useState, type FormEvent } from 'react';
import { useCart } from '@/lib/cart-context';
import { createOrder } from '@/lib/api';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
const BUSINESS_NAME = 'Mediqo Solutions';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ open, onClose }: Props) {
  const { items, total, clear } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError('Please enter your name');
    if (!phone.trim()) return setError('Please enter your phone number');

    setSubmitting(true);
    try {
      const { ref } = await createOrder({
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerLocation: location.trim() || undefined,
        items: items.map((i) => ({ productId: i.productId, name: i.name, price: i.price, quantity: i.quantity })),
      });

      const lines = items.map((i) => `- ${i.quantity}x ${i.name} (KES ${i.price.toLocaleString()})`);
      const message = [
        `Hi ${BUSINESS_NAME}! I'd like to order:`,
        ...lines,
        `Total: KES ${total.toLocaleString()}`,
        '',
        `Name: ${name.trim()}`,
        `Phone: ${phone.trim()}`,
        ...(location.trim() ? [`Location: ${location.trim()}`] : []),
        `Order ref: ${ref}`,
      ].join('\n');

      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      clear();
      window.location.href = waUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-1 text-lg font-semibold text-gray-900">Complete your order</h2>
        <p className="mb-4 text-sm text-gray-500">We'll open WhatsApp with your order details.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-sm text-gray-600">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" placeholder="Max Mwaura" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-600">Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" placeholder="0712 345 678" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-600">Delivery location (optional)</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" placeholder="Westlands, Nairobi" />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-2 pt-2">
            <button type="submit" disabled={submitting} className="flex-1 rounded-lg bg-green-600 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60">
              {submitting ? 'Placing order…' : 'Continue to WhatsApp'}
            </button>
            <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}