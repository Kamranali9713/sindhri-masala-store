'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/homepage-cms', label: 'Homepage CMS' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/categories', label: 'Categories' },
  { href: '/admin/orders', label: 'Orders' },
  { href: '/admin/shipping', label: 'Shipping' },
  { href: '/admin/videos', label: 'Videos' },
  { href: '/admin/social-media', label: 'Social Media' },
  { href: '/admin/contact', label: 'Contact Settings' },
  { href: '/admin/site-settings', label: 'Site Settings' },
  { href: '/admin/seo-settings', label: 'SEO Settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <aside className="w-56 bg-brand-dark text-white min-h-screen p-4 flex flex-col">
      <div className="font-bold text-lg mb-8 px-2">Sindhri Admin</div>
      <nav className="flex-1 space-y-1">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-3 py-2 rounded-lg text-sm transition ${
              pathname === item.href ? 'bg-brand-red' : 'hover:bg-white/10'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <button onClick={handleLogout} className="text-sm text-white/60 hover:text-white px-3 py-2 text-left">
        Log Out
      </button>
    </aside>
  );
}
