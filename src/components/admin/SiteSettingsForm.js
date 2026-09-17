// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { updateSiteSettings } from '@/lib/actions/settings.actions';

// export default function SiteSettingsForm({ settings }) {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     siteName: settings?.site_name || '',
//     logoUrl: settings?.logo_url || '',
//     faviconUrl: settings?.favicon_url || '',
//     whatsappNumber: settings?.whatsapp_number || '',
//     email: settings?.email || '',
//     phone: settings?.phone || '',
//     address: settings?.address || '',
//     googleMapsUrl: settings?.google_maps_url || '',
//     defaultSocialLink: settings?.default_social_link || '',
//     defaultShippingRate: settings?.default_shipping_rate || 0,
//   });
//   const [saving, setSaving] = useState(false);
//   const [saved, setSaved] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setSaving(true);
//     setSaved(false);
//     await updateSiteSettings(settings.id, form);
//     setSaving(false);
//     setSaved(true);
//     router.refresh();
//   }

//   const field = (label, key, type = 'text') => (
//     <div>
//       <label className="text-sm font-semibold block mb-1">{label}</label>
//       <input
//         type={type}
//         value={form[key]}
//         onChange={(e) => setForm({ ...form, [key]: e.target.value })}
//         className="w-full border border-gray-200 rounded-lg px-4 py-2"
//       />
//     </div>
//   );

//   return (
//     <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl p-6 max-w-2xl space-y-4">
//       {field('Site Name', 'siteName')}
//       {field('Logo URL', 'logoUrl')}
//       {field('Favicon URL', 'faviconUrl')}
//       {field('Primary WhatsApp Number (with country code, no +)', 'whatsappNumber')}
//       {field('Email', 'email')}
//       {field('Phone Number', 'phone')}
//       <div>
//         <label className="text-sm font-semibold block mb-1">Address</label>
//         <textarea
//           value={form.address}
//           onChange={(e) => setForm({ ...form, address: e.target.value })}
//           className="w-full border border-gray-200 rounded-lg px-4 py-2"
//           rows={2}
//         />
//       </div>
//       {field('Google Maps Link', 'googleMapsUrl')}
//       {field('Default Social Link (fallback for empty social icons)', 'defaultSocialLink')}
//       {field('Default Shipping Rate (Rs.)', 'defaultShippingRate', 'number')}

//       <div className="flex items-center gap-3 pt-2">
//         <button type="submit" disabled={saving} className="bg-brand-red text-white font-semibold px-6 py-2.5 rounded-lg">
//           {saving ? 'Saving...' : 'Save Settings'}
//         </button>
//         {saved && <span className="text-sm text-green-600">Saved.</span>}
//       </div>
//     </form>
//   );
// }


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

  const [logoMode, setLogoMode] = useState(
    settings?.logo_url?.startsWith('data:') ? 'local' : 'url'
  );

  const [faviconMode, setFaviconMode] = useState(
    settings?.favicon_url?.startsWith('data:') ? 'local' : 'url'
  );

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  function updateField(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleLocalImage(file, field) {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    // Keep the data URL reasonably sized.
    if (file.size > 2 * 1024 * 1024) {
      setError('Please select an image smaller than 2MB.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updateField(field, reader.result);
      setError('');
    };

    reader.onerror = () => {
      setError('Unable to read the selected image.');
    };

    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);
    setSaved(false);
    setError('');

    try {
      const result = await updateSiteSettings(settings.id, form);

      if (!result?.success) {
        setError(result?.error || 'Unable to save settings.');
        return;
      }

      setSaved(true);
      router.refresh();
    } catch (err) {
      console.error(err);
      setError('Something went wrong while saving settings.');
    } finally {
      setSaving(false);
    }
  }

  const field = (label, key, type = 'text', placeholder = '') => (
    <div>
      <label className="text-sm font-semibold block mb-1">
        {label}
      </label>

      <input
        type={type}
        value={form[key]}
        placeholder={placeholder}
        onChange={(e) => updateField(key, e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10"
      />
    </div>
  );

  function ImageSourceField({
    title,
    field,
    mode,
    setMode,
    accept = 'image/*',
  }) {
    const currentValue = form[field];

    return (
      <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <label className="text-sm font-bold block">
              {title}
            </label>

            <p className="text-xs text-gray-500 mt-1">
              Choose an image URL or select an image from your computer.
            </p>
          </div>

          <div className="flex bg-white border border-gray-200 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setMode('url')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                mode === 'url'
                  ? 'bg-brand-red text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              URL
            </button>

            <button
              type="button"
              onClick={() => setMode('local')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                mode === 'local'
                  ? 'bg-brand-red text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Local File
            </button>
          </div>
        </div>

        {mode === 'url' ? (
          <input
            type="url"
            value={currentValue?.startsWith('data:') ? '' : currentValue}
            placeholder={`https://example.com/${title.toLowerCase().replace(/\s+/g, '-')}.png`}
            onChange={(e) => updateField(field, e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-white outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10"
          />
        ) : (
          <div>
            <label className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-white p-6 cursor-pointer hover:border-brand-red hover:bg-brand-red/[0.02] transition">
              <div className="text-center">
                <div className="text-3xl mb-2">📁</div>

                <p className="font-semibold text-sm">
                  Choose {title.toLowerCase()}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, JPEG, WEBP • Max 2MB
                </p>
              </div>

              <input
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => {
                  handleLocalImage(e.target.files?.[0], field);
                  e.target.value = '';
                }}
              />
            </label>
          </div>
        )}

        {currentValue && (
          <div className="mt-4 bg-white border border-gray-200 rounded-lg p-3">
            <p className="text-xs font-semibold text-gray-500 mb-2">
              Preview
            </p>

            <div className="flex items-center gap-4">
              <div className="w-24 h-20 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                <img
                  src={currentValue}
                  alt={`${title} preview`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-500 break-all line-clamp-3">
                  {currentValue.startsWith('data:')
                    ? 'Local image selected'
                    : currentValue}
                </p>

                <button
                  type="button"
                  onClick={() => updateField(field, '')}
                  className="mt-2 text-xs font-semibold text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-100 rounded-xl p-6 max-w-3xl space-y-5"
    >
      {field(
        'Site Name',
        'siteName',
        'text',
        'Sindhri Masala'
      )}

      <ImageSourceField
        title="Logo"
        field="logoUrl"
        mode={logoMode}
        setMode={setLogoMode}
      />

      <ImageSourceField
        title="Favicon"
        field="faviconUrl"
        mode={faviconMode}
        setMode={setFaviconMode}
      />

      {field(
        'Primary WhatsApp Number (with country code, no +)',
        'whatsappNumber',
        'text',
        '923001234567'
      )}

      {field(
        'Email',
        'email',
        'email',
        'info@example.com'
      )}

      {field(
        'Phone Number',
        'phone',
        'text',
        '+92 300 1234567'
      )}

      <div>
        <label className="text-sm font-semibold block mb-1">
          Address
        </label>

        <textarea
          value={form.address}
          onChange={(e) => updateField('address', e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10"
          rows={3}
        />
      </div>

      {field(
        'Google Maps Link',
        'googleMapsUrl',
        'url',
        'https://maps.google.com/...'
      )}

      {field(
        'Default Social Link (fallback for empty social icons)',
        'defaultSocialLink',
        'url',
        'https://example.com'
      )}

      {field(
        'Default Shipping Rate (Rs.)',
        'defaultShippingRate',
        'number',
        '300'
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-brand-red hover:bg-brand-dark disabled:opacity-60 text-white font-semibold px-7 py-2.5 rounded-lg transition"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>

        {saved && (
          <span className="text-sm font-medium text-green-600">
            Settings saved successfully.
          </span>
        )}
      </div>
    </form>
  );
}