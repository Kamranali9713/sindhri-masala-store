'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveSeoSetting } from '@/lib/actions/seo.actions';

const PAGES = [
  { key: 'home', label: 'Homepage' },
  { key: 'products', label: 'Products' },
  { key: 'categories', label: 'Categories' },
  { key: 'about', label: 'About' },
  { key: 'contact', label: 'Contact' },
];

function SeoRow({ pageKey, label, existing }) {
  const router = useRouter();
  const [form, setForm] = useState({
    id: existing?.id,
    pageKey,
    metaTitle: existing?.meta_title || '',
    metaDescription: existing?.meta_description || '',
    keywords: existing?.keywords || '',
    ogImage: existing?.og_image || '',
  });
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    const result = await saveSeoSetting(form);
    if (result.success) setForm((f) => ({ ...f, id: result.seo.id }));
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <h3 className="font-semibold mb-3">{label}</h3>
      <div className="space-y-2">
        <input
          placeholder="Meta Title"
          value={form.metaTitle}
          onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
        />
        <textarea
          placeholder="Meta Description"
          value={form.metaDescription}
          onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          rows={2}
        />
        <input
          placeholder="Keywords (comma separated)"
          value={form.keywords}
          onChange={(e) => setForm({ ...form, keywords: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
        />
        <input
          placeholder="OG Image URL"
          value={form.ogImage}
          onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
        />
      </div>
      <button onClick={handleSave} disabled={saving} className="mt-3 bg-brand-red text-white text-sm font-semibold px-4 py-2 rounded-lg">
        {saving ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
}

export default function SeoSettingsManager({ existingByKey }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {PAGES.map((p) => (
        <SeoRow key={p.key} pageKey={p.key} label={p.label} existing={existingByKey[p.key]} />
      ))}
    </div>
  );
}
