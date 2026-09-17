// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { saveVideo, deleteVideo, toggleVideoStatus } from '@/lib/actions/video.actions';

// const EMPTY = { title: '', subtitle: '', videoUrl: '', thumbnailUrl: '', buttonText: '', buttonLink: '', isFeatured: false, isActive: true };

// export default function VideoManager({ videos }) {
//   const router = useRouter();
//   const [form, setForm] = useState(EMPTY);
//   const [saving, setSaving] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setSaving(true);
//     await saveVideo(form);
//     setForm(EMPTY);
//     setSaving(false);
//     router.refresh();
//   }

//   async function handleDelete(id) {
//     if (!confirm('Delete this video?')) return;
//     await deleteVideo(id);
//     router.refresh();
//   }

//   async function handleToggle(id, current) {
//     await toggleVideoStatus(id, !current);
//     router.refresh();
//   }

//   return (
//     <div className="grid md:grid-cols-2 gap-8">
//       <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl p-6 space-y-3 h-fit">
//         <h2 className="font-semibold mb-1">Upload Video</h2>
//         <p className="text-xs text-gray-400 mb-2">
//           Upload the MP4 to Supabase Storage → <code>videos</code> bucket, then paste its public URL here.
//         </p>
//         <input
//           required
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           className="w-full border border-gray-200 rounded-lg px-4 py-2"
//         />
//         <input
//           placeholder="Subtitle"
//           value={form.subtitle}
//           onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
//           className="w-full border border-gray-200 rounded-lg px-4 py-2"
//         />
//         <input
//           required
//           placeholder="Video URL (mp4)"
//           value={form.videoUrl}
//           onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
//           className="w-full border border-gray-200 rounded-lg px-4 py-2"
//         />
//         <input
//           placeholder="Thumbnail URL"
//           value={form.thumbnailUrl}
//           onChange={(e) => setForm({ ...form, thumbnailUrl: e.target.value })}
//           className="w-full border border-gray-200 rounded-lg px-4 py-2"
//         />
//         <div className="grid grid-cols-2 gap-3">
//           <input
//             placeholder="Button text"
//             value={form.buttonText}
//             onChange={(e) => setForm({ ...form, buttonText: e.target.value })}
//             className="w-full border border-gray-200 rounded-lg px-4 py-2"
//           />
//           <input
//             placeholder="Button link"
//             value={form.buttonLink}
//             onChange={(e) => setForm({ ...form, buttonLink: e.target.value })}
//             className="w-full border border-gray-200 rounded-lg px-4 py-2"
//           />
//         </div>
//         <label className="flex items-center gap-2 text-sm">
//           <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
//           Set as Featured (shown in Homepage Promo Video section)
//         </label>
//         <button type="submit" disabled={saving} className="bg-brand-red text-white font-semibold px-5 py-2 rounded-lg text-sm">
//           {saving ? 'Saving...' : 'Save Video'}
//         </button>
//       </form>

//       <div className="space-y-3">
//         {videos.map((v) => (
//           <div key={v.id} className="bg-white border border-gray-100 rounded-xl p-4">
//             <div className="flex justify-between items-start">
//               <div>
//                 <div className="font-semibold">{v.title} {v.is_featured && <span className="text-xs text-brand-red">★ Featured</span>}</div>
//                 <div className="text-xs text-gray-400 truncate max-w-xs">{v.video_url}</div>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleToggle(v.id, v.is_active)}
//                   className={`text-xs px-2 py-1 rounded h-fit ${v.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
//                 >
//                   {v.is_active ? 'Active' : 'Inactive'}
//                 </button>
//                 <button onClick={() => handleDelete(v.id)} className="text-red-500 text-xs font-semibold">Delete</button>
//               </div>
//             </div>
//           </div>
//         ))}
//         {videos.length === 0 && <p className="text-gray-500 text-sm">No videos uploaded yet.</p>}
//       </div>
//     </div>
//   );
// }



'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveVideo, deleteVideo, toggleVideoStatus } from '@/lib/actions/video.actions';
import { createClient } from '@/lib/supabase/client';

const EMPTY = {
  title: '',
  subtitle: '',
  videoUrl: '',
  thumbnailUrl: '',
  buttonText: '',
  buttonLink: '',
  isFeatured: false,
  isActive: true,
};

export default function VideoManager({ videos }) {
  const router = useRouter();

  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function handleVideoUpload(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('video/')) {
      alert('Please select a valid video file.');
      return;
    }

    setUploading(true);

    try {
      const supabase = createClient();

      const extension = file.name.split('.').pop();

      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${extension}`;

      const filePath = `videos/${fileName}`;

      const { error } = await supabase.storage
        .from('videos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
        });

      if (error) {
        console.error(error);
        alert(`Upload failed: ${error.message}`);
        return;
      }

      const { data } = supabase.storage
        .from('videos')
        .getPublicUrl(filePath);

      if (!data?.publicUrl) {
        alert('Could not get video URL.');
        return;
      }

      setForm((prev) => ({
        ...prev,
        videoUrl: data.publicUrl,
      }));

      alert('Video uploaded successfully.');
    } catch (error) {
      console.error(error);
      alert('Video upload failed.');
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.videoUrl) {
      alert('Please upload a video first.');
      return;
    }

    setSaving(true);

    try {
      const result = await saveVideo(form);

      if (result?.error) {
        alert(result.error);
        return;
      }

      setForm(EMPTY);

      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Failed to save video.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this video?')) return;

    await deleteVideo(id);
    router.refresh();
  }

  async function handleToggle(id, current) {
    await toggleVideoStatus(id, !current);
    router.refresh();
  }

  return (
    <div className="space-y-8">

      {/* ADD VIDEO */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-100 rounded-xl p-6 space-y-4"
      >
        <div>
          <h2 className="font-semibold text-lg">
            Upload Video
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            Select a video directly from your computer.
          </p>
        </div>

        {/* TITLE */}
        <input
          required
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
          className="w-full border border-gray-200 rounded-lg px-4 py-2"
        />

        {/* SUBTITLE */}
        <input
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={(e) =>
            setForm({
              ...form,
              subtitle: e.target.value,
            })
          }
          className="w-full border border-gray-200 rounded-lg px-4 py-2"
        />

        {/* LOCAL VIDEO */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Upload Video
          </label>

          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            disabled={uploading}
            className="w-full border border-gray-200 rounded-lg px-4 py-3"
          />

          {uploading && (
            <p className="text-sm text-gray-500 mt-2">
              Uploading video...
            </p>
          )}
        </div>

        {/* VIDEO PREVIEW */}
        {form.videoUrl && (
          <div>
            <p className="text-sm font-medium mb-2">
              Video Preview
            </p>

            <video
              src={form.videoUrl}
              controls
              className="w-full max-w-2xl rounded-lg border"
            />
          </div>
        )}

        {/* VIDEO URL */}
        <input
          placeholder="Or paste Video URL"
          value={form.videoUrl}
          onChange={(e) =>
            setForm({
              ...form,
              videoUrl: e.target.value,
            })
          }
          className="w-full border border-gray-200 rounded-lg px-4 py-2"
        />

        {/* THUMBNAIL */}
        <input
          placeholder="Thumbnail URL"
          value={form.thumbnailUrl}
          onChange={(e) =>
            setForm({
              ...form,
              thumbnailUrl: e.target.value,
            })
          }
          className="w-full border border-gray-200 rounded-lg px-4 py-2"
        />

        {/* BUTTON */}
        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="Button text"
            value={form.buttonText}
            onChange={(e) =>
              setForm({
                ...form,
                buttonText: e.target.value,
              })
            }
            className="w-full border border-gray-200 rounded-lg px-4 py-2"
          />

          <input
            placeholder="Button link"
            value={form.buttonLink}
            onChange={(e) =>
              setForm({
                ...form,
                buttonLink: e.target.value,
              })
            }
            className="w-full border border-gray-200 rounded-lg px-4 py-2"
          />
        </div>

        {/* FEATURED */}
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

          Set as Featured
          <span className="text-gray-400">
            (shown on homepage)
          </span>
        </label>

        {/* ACTIVE */}
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

        {/* SAVE */}
        <button
          type="submit"
          disabled={saving || uploading}
          className="bg-brand-red text-white font-semibold px-5 py-2 rounded-lg text-sm disabled:opacity-50"
        >
          {uploading
            ? 'Uploading...'
            : saving
            ? 'Saving...'
            : 'Save Video'}
        </button>
      </form>

      {/* EXISTING VIDEOS */}
      <div className="space-y-3">
        {videos.map((v) => (
          <div
            key={v.id}
            className="bg-white border border-gray-100 rounded-xl p-4"
          >
            <div className="flex justify-between items-start gap-4">

              <div>
                <div className="font-semibold">
                  {v.title}

                  {v.is_featured && (
                    <span className="text-xs text-brand-red ml-2">
                      ★ Featured
                    </span>
                  )}
                </div>

                <div className="text-xs text-gray-400 truncate max-w-md mt-1">
                  {v.video_url}
                </div>
              </div>

              <div className="flex gap-2">

                <button
                  onClick={() =>
                    handleToggle(v.id, v.is_active)
                  }
                  className={`text-xs px-2 py-1 rounded h-fit ${
                    v.is_active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {v.is_active ? 'Active' : 'Inactive'}
                </button>

                <button
                  onClick={() => handleDelete(v.id)}
                  className="text-red-500 text-xs font-semibold"
                >
                  Delete
                </button>

              </div>
            </div>
          </div>
        ))}

        {videos.length === 0 && (
          <p className="text-gray-500 text-sm">
            No videos uploaded yet.
          </p>
        )}
      </div>

    </div>
  );
}