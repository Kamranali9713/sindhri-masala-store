// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { saveProduct, deleteProduct } from '@/lib/actions/product.actions';
// import { createClient } from '@/lib/supabase/client';

// export default function ProductForm({ product, categories }) {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     id: product?.id,
//     name: product?.name || '',
//     categoryId: product?.category_id || '',
//     shortDescription: product?.short_description || '',
//     description: product?.description || '',
//     price: product?.price || '',
//     salePrice: product?.sale_price || '',
//     stockStatus: product?.stock_status || 'in_stock',
//     isFeatured: product?.is_featured || false,
//     isBestSeller: product?.is_best_seller || false,
//     isActive: product?.is_active ?? true,
//     mainImageUrl: product?.main_image_url || '',
//   });
//   const [saving, setSaving] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   async function handleImageUpload(e) {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploading(true);
//     const supabase = createClient();
//     const ext = file.name.split('.').pop();
//     const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

//     const { error } = await supabase.storage.from('products').upload(path, file, { upsert: true });
//     if (error) {
//       alert(`Upload failed: ${error.message}`);
//       setUploading(false);
//       return;
//     }

//     const { data } = supabase.storage.from('products').getPublicUrl(path);
//     setForm((f) => ({ ...f, mainImageUrl: data.publicUrl }));
//     setUploading(false);
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setSaving(true);
//     const result = await saveProduct(form);
//     setSaving(false);
//     if (result.success) router.push('/admin/products');
//   }

//   async function handleDelete() {
//     if (!confirm('Delete this product?')) return;
//     await deleteProduct(product.id);
//     router.push('/admin/products');
//   }

//   return (
//     <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl p-6 max-w-2xl space-y-4">
//       <div>
//         <label className="text-sm font-semibold block mb-1">Product Name</label>
//         <input
//           required
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           className="w-full border border-gray-200 rounded-lg px-4 py-2"
//         />
//       </div>

//       <div>
//         <label className="text-sm font-semibold block mb-1">Category</label>
//         <select
//           value={form.categoryId}
//           onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
//           className="w-full border border-gray-200 rounded-lg px-4 py-2"
//         >
//           <option value="">— None —</option>
//           {categories.map((c) => (
//             <option key={c.id} value={c.id}>{c.name}</option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label className="text-sm font-semibold block mb-1">Short Description</label>
//         <input
//           value={form.shortDescription}
//           onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
//           className="w-full border border-gray-200 rounded-lg px-4 py-2"
//         />
//       </div>

//       <div>
//         <label className="text-sm font-semibold block mb-1">Full Description</label>
//         <textarea
//           rows={4}
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           className="w-full border border-gray-200 rounded-lg px-4 py-2"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="text-sm font-semibold block mb-1">Base Price (Rs.)</label>
//           <input
//             type="number"
//             required
//             value={form.price}
//             onChange={(e) => setForm({ ...form, price: e.target.value })}
//             className="w-full border border-gray-200 rounded-lg px-4 py-2"
//           />
//         </div>
//         <div>
//           <label className="text-sm font-semibold block mb-1">Sale Price (optional)</label>
//           <input
//             type="number"
//             value={form.salePrice}
//             onChange={(e) => setForm({ ...form, salePrice: e.target.value })}
//             className="w-full border border-gray-200 rounded-lg px-4 py-2"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="text-sm font-semibold block mb-1">Main Image</label>
//         <div className="flex items-center gap-4">
//           {form.mainImageUrl && (
//             // eslint-disable-next-line @next/next/no-img-element
//             <img src={form.mainImageUrl} alt="" className="w-16 h-16 rounded-lg object-cover border border-gray-200" />
//           )}
//           <div className="flex-1">
//             <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="text-sm" />
//             {uploading && <p className="text-xs text-gray-400 mt-1">Uploading...</p>}
//           </div>
//         </div>
//         <input
//           value={form.mainImageUrl}
//           onChange={(e) => setForm({ ...form, mainImageUrl: e.target.value })}
//           placeholder="Or paste an image URL directly"
//           className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-2 text-sm"
//         />
//       </div>

//       <div>
//         <label className="text-sm font-semibold block mb-1">Stock Status</label>
//         <select
//           value={form.stockStatus}
//           onChange={(e) => setForm({ ...form, stockStatus: e.target.value })}
//           className="w-full border border-gray-200 rounded-lg px-4 py-2"
//         >
//           <option value="in_stock">In Stock</option>
//           <option value="out_of_stock">Out of Stock</option>
//         </select>
//       </div>

//       <div className="flex gap-6">
//         <label className="flex items-center gap-2 text-sm">
//           <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
//           Featured
//         </label>
//         <label className="flex items-center gap-2 text-sm">
//           <input type="checkbox" checked={form.isBestSeller} onChange={(e) => setForm({ ...form, isBestSeller: e.target.checked })} />
//           Best Seller
//         </label>
//         <label className="flex items-center gap-2 text-sm">
//           <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
//           Active
//         </label>
//       </div>

//       <div className="flex gap-3 pt-2">
//         <button type="submit" disabled={saving} className="bg-brand-red text-white font-semibold px-6 py-2.5 rounded-lg">
//           {saving ? 'Saving...' : 'Save Product'}
//         </button>
//         {product?.id && (
//           <button type="button" onClick={handleDelete} className="text-red-500 font-semibold px-4 py-2.5">
//             Delete
//           </button>
//         )}
//       </div>
//     </form>
//   );
// }



'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveProduct, deleteProduct } from '@/lib/actions/product.actions';
import { createClient } from '@/lib/supabase/client';

export default function ProductForm({ product, categories }) {
  const router = useRouter();

  const [form, setForm] = useState({
    id: product?.id,
    name: product?.name || '',
    categoryId: product?.category_id || '',
    shortDescription: product?.short_description || '',
    description: product?.description || '',
    price: product?.price || '',
    salePrice: product?.sale_price || '',
    stockStatus: product?.stock_status || 'in_stock',
    isFeatured: product?.is_featured || false,
    isBestSeller: product?.is_best_seller || false,
    isActive: product?.is_active ?? true,
    mainImageUrl: product?.main_image_url || '',
  });

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    setUploading(true);

    try {
      const supabase = createClient();

      const ext = file.name.split('.').pop();

      const path = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${ext}`;

      const { error } = await supabase.storage
        .from('products')
        .upload(path, file, {
          upsert: true,
        });

      if (error) {
        alert(`Upload failed: ${error.message}`);
        return;
      }

      const { data } = supabase.storage
        .from('products')
        .getPublicUrl(path);

      if (data?.publicUrl) {
        setForm((current) => ({
          ...current,
          mainImageUrl: data.publicUrl,
        }));
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong while uploading the image.');
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);

    try {
      const result = await saveProduct(form);

      if (result.success) {
        router.push('/admin/products');
        router.refresh();
      } else {
        alert(result.error || 'Failed to save product.');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong while saving the product.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!product?.id) return;

    if (!confirm('Delete this product?')) return;

    try {
      await deleteProduct(product.id);
      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Failed to delete product.');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-100 rounded-xl p-6 max-w-2xl space-y-4"
    >
      {/* Product Name */}
      <div>
        <label className="text-sm font-semibold block mb-1">
          Product Name
        </label>

        <input
          required
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          className="w-full border border-gray-200 rounded-lg px-4 py-2"
        />
      </div>

      {/* Category */}
      <div>
        <label className="text-sm font-semibold block mb-1">
          Category
        </label>

        <select
          value={form.categoryId}
          onChange={(e) =>
            setForm({
              ...form,
              categoryId: e.target.value,
            })
          }
          className="w-full border border-gray-200 rounded-lg px-4 py-2"
        >
          <option value="">— None —</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Short Description */}
      <div>
        <label className="text-sm font-semibold block mb-1">
          Short Description
        </label>

        <input
          value={form.shortDescription}
          onChange={(e) =>
            setForm({
              ...form,
              shortDescription: e.target.value,
            })
          }
          className="w-full border border-gray-200 rounded-lg px-4 py-2"
        />
      </div>

      {/* Full Description */}
      <div>
        <label className="text-sm font-semibold block mb-1">
          Full Description
        </label>

        <textarea
          rows={4}
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          className="w-full border border-gray-200 rounded-lg px-4 py-2"
        />
      </div>

      {/* Prices */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold block mb-1">
            Base Price (Rs.)
          </label>

          <input
            type="number"
            required
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
            className="w-full border border-gray-200 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1">
            Sale Price (optional)
          </label>

          <input
            type="number"
            value={form.salePrice}
            onChange={(e) =>
              setForm({
                ...form,
                salePrice: e.target.value,
              })
            }
            className="w-full border border-gray-200 rounded-lg px-4 py-2"
          />
        </div>
      </div>

      {/* IMAGE */}
      <div>
        <label className="text-sm font-semibold block mb-2">
          Product Image
        </label>

        {/* Preview */}
        {form.mainImageUrl && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">
              Image Preview
            </p>

            <div className="relative w-32 h-32">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={form.mainImageUrl}
                alt="Product preview"
                className="w-32 h-32 rounded-lg object-cover border border-gray-200"
              />
            </div>
          </div>
        )}

        {/* Local Image */}
        <div className="mb-3">
          <label className="text-xs text-gray-500 block mb-1">
            Choose image from your computer
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
          />

          {uploading && (
            <p className="text-xs text-gray-400 mt-1">
              Uploading image...
            </p>
          )}
        </div>

        {/* OR */}
        <div className="flex items-center gap-3 my-3">
          <div className="flex-1 border-t border-gray-200" />

          <span className="text-xs text-gray-400">
            OR
          </span>

          <div className="flex-1 border-t border-gray-200" />
        </div>

        {/* Image URL */}
        <div>
          <label className="text-xs text-gray-500 block mb-1">
            Paste image URL
          </label>

          <input
            type="url"
            value={form.mainImageUrl}
            onChange={(e) =>
              setForm({
                ...form,
                mainImageUrl: e.target.value,
              })
            }
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
          />
        </div>
      </div>

      {/* Stock Status */}
      <div>
        <label className="text-sm font-semibold block mb-1">
          Stock Status
        </label>

        <select
          value={form.stockStatus}
          onChange={(e) =>
            setForm({
              ...form,
              stockStatus: e.target.value,
            })
          }
          className="w-full border border-gray-200 rounded-lg px-4 py-2"
        >
          <option value="in_stock">
            In Stock
          </option>

          <option value="out_of_stock">
            Out of Stock
          </option>
        </select>
      </div>

      {/* Checkboxes */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) =>
              setForm({
                ...form,
                isFeatured: e.target.checked,
              })
            }
          />

          Featured
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isBestSeller}
            onChange={(e) =>
              setForm({
                ...form,
                isBestSeller: e.target.checked,
              })
            }
          />

          Best Seller
        </label>

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

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving || uploading}
          className="bg-brand-red text-white font-semibold px-6 py-2.5 rounded-lg disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Product'}
        </button>

        {product?.id && (
          <button
            type="button"
            onClick={handleDelete}
            className="text-red-500 font-semibold px-4 py-2.5"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

