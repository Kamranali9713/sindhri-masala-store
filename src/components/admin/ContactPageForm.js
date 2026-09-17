'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateContactPage } from '@/lib/actions/settings.actions';

export default function ContactPageForm({ contact }) {
  const router = useRouter();

  const [form, setForm] = useState({
    address: contact?.address || '',
    phone: contact?.phone || '',
    email: contact?.email || '',
    whatsapp: contact?.whatsapp || '',
    googleMapUrl: contact?.google_map_url || '',
    businessHours: contact?.business_hours || '',
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);
    setSaved(false);

    const result = await updateContactPage(contact.id, form);

    setSaving(false);

    if (result?.error) {
      alert(result.error);
      return;
    }

    setSaved(true);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-100 rounded-xl p-6 max-w-3xl space-y-5"
    >
      <div>
        <h2 className="text-xl font-bold">
          Contact Page Information
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Update the information displayed on the Contact page.
        </p>
      </div>

      {/* ADDRESS */}
      <div>
        <label className="text-sm font-semibold block mb-1">
          Address
        </label>

        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          rows={3}
          placeholder="Enter business address"
          className="w-full border border-gray-200 rounded-lg px-4 py-2"
        />
      </div>

      {/* PHONE */}
      <div>
        <label className="text-sm font-semibold block mb-1">
          Phone Number
        </label>

        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+92 300 1234567"
          className="w-full border border-gray-200 rounded-lg px-4 py-2"
        />
      </div>

      {/* EMAIL */}
      <div>
        <label className="text-sm font-semibold block mb-1">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="info@example.com"
          className="w-full border border-gray-200 rounded-lg px-4 py-2"
        />
      </div>

      {/* WHATSAPP */}
      <div>
        <label className="text-sm font-semibold block mb-1">
          WhatsApp
        </label>

        <input
          type="text"
          name="whatsapp"
          value={form.whatsapp}
          onChange={handleChange}
          placeholder="923001234567"
          className="w-full border border-gray-200 rounded-lg px-4 py-2"
        />
      </div>

      {/* GOOGLE MAP */}
      <div>
        <label className="text-sm font-semibold block mb-1">
          Google Maps URL
        </label>

        <input
          type="url"
          name="googleMapUrl"
          value={form.googleMapUrl}
          onChange={handleChange}
          placeholder="https://www.google.com/maps/embed?..."
          className="w-full border border-gray-200 rounded-lg px-4 py-2"
        />

        <p className="text-xs text-gray-500 mt-1">
          Paste the Google Maps Embed URL here.
        </p>
      </div>

      {/* BUSINESS HOURS */}
      <div>
        <label className="text-sm font-semibold block mb-1">
          Business Hours
        </label>

        <input
          type="text"
          name="businessHours"
          value={form.businessHours}
          onChange={handleChange}
          placeholder="Mon - Sat: 10:00 AM - 8:00 PM"
          className="w-full border border-gray-200 rounded-lg px-4 py-2"
        />
      </div>

      {/* SAVE */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-brand-red text-white font-semibold px-6 py-2.5 rounded-lg disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Contact Information'}
        </button>

        {saved && (
          <span className="text-sm text-green-600">
            Saved successfully.
          </span>
        )}
      </div>
    </form>
  );
}