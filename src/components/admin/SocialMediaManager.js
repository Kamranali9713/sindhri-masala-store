'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveSocialLink, deleteSocialLink } from '@/lib/actions/social.actions';
import { getSocialLink } from '@/lib/helpers/getSocialLink';

const PLATFORMS = ['facebook', 'instagram', 'tiktok', 'youtube', 'linkedin', 'twitter'];

function LinkRow({ link, siteUrl }) {
  const router = useRouter();
  const [url, setUrl] = useState(link.url || '');
  const [isActive, setIsActive] = useState(link.is_active);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    await saveSocialLink({ id: link.id, platform: link.platform, url, isActive, sortOrder: link.sort_order });
    setSaving(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm(`Remove ${link.platform}?`)) return;
    await deleteSocialLink(link.id);
    router.refresh();
  }

  const resolvedLink = getSocialLink(url, siteUrl);

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold capitalize">{link.platform}</span>
        <label className="flex items-center gap-2 text-xs">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          Active
        </label>
      </div>
      <input
        placeholder={`${link.platform} URL (leave empty to fall back to site URL)`}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2"
      />
      <p className="text-xs text-gray-400 mb-3">
        Icon currently links to: <span className="text-gray-600">{resolvedLink}</span>
        {!url && ' (fallback — no platform URL set)'}
      </p>
      <div className="flex gap-3">
        <button onClick={handleSave} disabled={saving} className="bg-brand-red text-white text-xs font-semibold px-4 py-2 rounded-lg">
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button onClick={handleDelete} className="text-red-500 text-xs font-semibold">Remove</button>
      </div>
    </div>
  );
}

export default function SocialMediaManager({ links, siteUrl }) {
  const router = useRouter();
  const existingPlatforms = links.map((l) => l.platform);
  const missing = PLATFORMS.filter((p) => !existingPlatforms.includes(p));
  const [adding, setAdding] = useState(missing[0] || '');
  const [saving, setSaving] = useState(false);

  async function handleAdd() {
    if (!adding) return;
    setSaving(true);
    await saveSocialLink({ platform: adding, url: '', isActive: true, sortOrder: links.length + 1 });
    setSaving(false);
    router.refresh();
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {links.map((l) => (
          <LinkRow key={l.id} link={l} siteUrl={siteUrl} />
        ))}
      </div>

      {missing.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3 max-w-md">
          <select value={adding} onChange={(e) => setAdding(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1">
            {missing.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <button onClick={handleAdd} disabled={saving} className="bg-brand-red text-white text-sm font-semibold px-4 py-2 rounded-lg">
            + Add Platform
          </button>
        </div>
      )}
    </div>
  );
}
