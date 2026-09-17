// import AdminSidebar from '@/components/admin/AdminSidebar';

// export default function AdminLayout({ children }) {
//   return (
//     <div className="flex">
//       <AdminSidebar />
//       <div className="flex-1 bg-gray-50 min-h-screen p-8">{children}</div>
//     </div>
//   );
// }



import AdminSidebar from '@/components/admin/AdminSidebar';
import { createClient } from '@/lib/supabase/server';

export default async function AdminLayout({ children }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Login page / unauthenticated page
  // Do not show sidebar or admin layout
  if (!user) {
    return <>{children}</>;
  }

  // Logged-in admin
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 bg-gray-50 min-h-screen p-8">
        {children}
      </div>
    </div>
  );
}

