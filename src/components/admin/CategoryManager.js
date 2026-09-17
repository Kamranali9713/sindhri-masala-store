'use client';
import { useState } from 'react';
import { saveCategory, deleteCategory } from '@/lib/actions/category.actions';
import { useRouter } from 'next/navigation';

export default function CategoryManager({ categories }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', description: '', isActive: true });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    await saveCategory(form);
    setForm({ name: '', description: '', isActive: true });
    setSaving(false);
    router.refresh();
  }

  async function handleDelete(id) {
    if (!confirm('Delete this category?')) return;
    await deleteCategory(id);
    router.refresh();
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl p-6 space-y-4 h-fit">
        <h2 className="font-semibold">Add Category</h2>
        <input
          required
          placeholder="Category name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-4 py-2"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-4 py-2"
        />
        <button type="submit" disabled={saving} className="bg-brand-red text-white font-semibold px-5 py-2 rounded-lg text-sm">
          {saving ? 'Saving...' : 'Add Category'}
        </button>
      </form>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden h-fit">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr><th className="p-3">Name</th><th className="p-3">Slug</th><th className="p-3"></th></tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-t border-gray-100">
                <td className="p-3 font-medium">{c.name}</td>
                <td className="p-3 text-gray-400">{c.slug}</td>
                <td className="p-3">
                  <button onClick={() => handleDelete(c.id)} className="text-red-500 text-xs font-semibold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
