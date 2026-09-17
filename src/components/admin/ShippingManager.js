'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveShippingZone, deleteShippingZone, toggleShippingZoneStatus } from '@/lib/actions/shipping.actions';
import { formatCurrency } from '@/lib/helpers/formatCurrency';

export default function ShippingManager({ zones }) {
  const router = useRouter();
  const [form, setForm] = useState({ cityName: '', shippingCost: '', isActive: true, isDefault: false });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    await saveShippingZone(form);
    setForm({ cityName: '', shippingCost: '', isActive: true, isDefault: false });
    setSaving(false);
    router.refresh();
  }

  async function handleDelete(id) {
    if (!confirm('Delete this city?')) return;
    await deleteShippingZone(id);
    router.refresh();
  }

  async function handleToggle(id, current) {
    await toggleShippingZoneStatus(id, !current);
    router.refresh();
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl p-6 space-y-4 h-fit">
        <h2 className="font-semibold">Add City</h2>
        <input
          required
          placeholder="City name"
          value={form.cityName}
          onChange={(e) => setForm({ ...form, cityName: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-4 py-2"
        />
        <input
          required
          type="number"
          placeholder="Shipping cost (Rs.)"
          value={form.shippingCost}
          onChange={(e) => setForm({ ...form, shippingCost: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-4 py-2"
        />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.isDefault} onChange={(e) => setForm({ ...form, isDefault: e.target.checked })} />
          Default fallback city ("Other Cities")
        </label>
        <button type="submit" disabled={saving} className="bg-brand-red text-white font-semibold px-5 py-2 rounded-lg text-sm">
          {saving ? 'Saving...' : 'Add City'}
        </button>
      </form>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden h-fit">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr><th className="p-3">City</th><th className="p-3">Cost</th><th className="p-3">Status</th><th className="p-3"></th></tr>
          </thead>
          <tbody>
            {zones.map((z) => (
              <tr key={z.id} className="border-t border-gray-100">
                <td className="p-3 font-medium">{z.city_name}{z.is_default && ' (default)'}</td>
                <td className="p-3">{formatCurrency(z.shipping_cost)}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleToggle(z.id, z.is_active)}
                    className={`text-xs px-2 py-1 rounded ${z.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                  >
                    {z.is_active ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="p-3">
                  <button onClick={() => handleDelete(z.id)} className="text-red-500 text-xs font-semibold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
