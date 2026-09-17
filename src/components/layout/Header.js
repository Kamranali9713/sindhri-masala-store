'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Header({ siteName = 'Sindhri Masala' }) {
  const [open, setOpen] = useState(false);
  const count = useCartStore((s) => s.getCount());

  const links = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-brand-red tracking-tight">
          {siteName}
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium hover:text-brand-red transition">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/products" className="hidden sm:block text-gray-500 hover:text-brand-red">
            <Search size={20} />
          </Link>
          <Link href="/cart" className="relative text-gray-700 hover:text-brand-red">
            <ShoppingCart size={22} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-red text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm font-medium">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
