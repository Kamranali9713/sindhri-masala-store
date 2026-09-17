'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateSiteSettings } from '@/lib/actions/settings.actions';

export default function SiteSettingsForm({ settings }) {
  const router = useRouter();
  const [form, setForm] = useState({
    siteName: settings?.site_name || '',
    logoUrl: settings?.logo_url || '',
    faviconUrl: settings?.favicon_url || '',
    whatsappNumber: settings?.whatsapp_number || '',
    email: settings?.email || '',
    phone: settings?.phone || '',
    address: settings?.address || '',
    googleMapsUrl: settings?.google_maps_url || '',
    defaultSocialLink: settings?.default_social_link || '',
    defaultShippingRate: settings?.default_shipping_rate || 0,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await updateSiteSettings(settings.id, form);
    setSaving(false);
    setSaved(true);
    router.refresh();
  }

  const field = (label, key, type = 'text') => (
    <div>
      <label className="text-sm font-semibold block mb-1">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="w-full border border-gray-200 rounded-lg px-4 py-2"
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl p-6 max-w-2xl space-y-4">
      {field('Site Name', 'siteName')}
      {field('Logo URL', 'logoUrl')}
      {field('Favicon URL', 'faviconUrl')}
      {field('Primary WhatsApp Number (with country code, no +)', 'whatsappNumber')}
      {field('Email', 'email')}
      {field('Phone Number', 'phone')}
      <div>
        <label className="text-sm font-semibold block mb-1">Address</label>
        <textarea
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-4 py-2"
          rows={2}
        />
      </div>
      {field('Google Maps Link', 'googleMapsUrl')}
      {field('Default Social Link (fallback for empty social icons)', 'defaultSocialLink')}
      {field('Default Shipping Rate (Rs.)', 'defaultShippingRate', 'number')}

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={saving} className="bg-brand-red text-white font-semibold px-6 py-2.5 rounded-lg">
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
        {saved && <span className="text-sm text-green-600">Saved.</span>}
      </div>
    </form>
  );
}
