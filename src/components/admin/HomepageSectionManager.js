// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { updateHomepageSection } from '@/lib/actions/homepage.actions';

// function SectionRow({ section }) {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     title: section.title || '',
//     subtitle: section.subtitle || '',
//     sortOrder: section.sort_order,
//     isActive: section.is_active,
//   });
//   const [saving, setSaving] = useState(false);

//   async function handleSave() {
//     setSaving(true);
//     await updateHomepageSection(section.id, form);
//     setSaving(false);
//     router.refresh();
//   }

//   return (
//     <div className="bg-white border border-gray-100 rounded-xl p-5">
//       <div className="flex items-center justify-between mb-3">
//         <span className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
//           {section.section_type.replace(/_/g, ' ')}
//         </span>
//         <label className="flex items-center gap-2 text-sm">
//           <input
//             type="checkbox"
//             checked={form.isActive}
//             onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
//           />
//           Active
//         </label>
//       </div>
//       <input
//         value={form.title}
//         onChange={(e) => setForm({ ...form, title: e.target.value })}
//         placeholder="Section title"
//         className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-2 text-sm"
//       />
//       <input
//         value={form.subtitle}
//         onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
//         placeholder="Section subtitle"
//         className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 text-sm"
//       />
//       <div className="flex items-center gap-3">
//         <input
//           type="number"
//           value={form.sortOrder}
//           onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
//           className="w-20 border border-gray-200 rounded-lg px-3 py-2 text-sm"
//         />
//         <button onClick={handleSave} disabled={saving} className="bg-brand-red text-white text-sm font-semibold px-4 py-2 rounded-lg">
//           {saving ? 'Saving...' : 'Save'}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function HomepageSectionManager({ sections }) {
//   return (
//     <div className="grid md:grid-cols-2 gap-4">
//       {sections.map((s) => (
//         <SectionRow key={s.id} section={s} />
//       ))}
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateHomepageSection } from '@/lib/actions/homepage.actions';

function SectionRow({ section }) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: section.title || '',
    subtitle: section.subtitle || '',
    sortOrder: section.sort_order,
    isActive: section.is_active,
  });

  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);

    try {
      await updateHomepageSection(
        section.id,
        form
      );

      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Failed to update section.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="py-5 border-b border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
          {section.section_type.replace(/_/g, ' ')}
        </span>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) =>
              setForm({
                ...form,
                isActive: e.target.checked,
              })
            }
          />

          Active
        </label>
      </div>

      <input
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title: e.target.value,
          })
        }
        placeholder="Section title"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-2 text-sm"
      />

      <input
        value={form.subtitle}
        onChange={(e) =>
          setForm({
            ...form,
            subtitle: e.target.value,
          })
        }
        placeholder="Section subtitle"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 text-sm"
      />

      <div className="flex items-center gap-3">
        <input
          type="number"
          value={form.sortOrder}
          onChange={(e) =>
            setForm({
              ...form,
              sortOrder: Number(e.target.value),
            })
          }
          className="w-20 border border-gray-200 rounded-lg px-3 py-2 text-sm"
        />

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-brand-red text-white text-sm font-semibold px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}

export default function HomepageSectionManager({
  sections,
}) {
  return (
    <div>
      {sections.map((section) => (
        <SectionRow
          key={section.id}
          section={section}
        />
      ))}
    </div>
  );
}

