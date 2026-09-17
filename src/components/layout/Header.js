// 'use client';
// import Link from 'next/link';
// import { useState } from 'react';
// import { ShoppingCart, Menu, X, Search } from 'lucide-react';
// import { useCartStore } from '@/store/cartStore';

// export default function Header({ siteName = 'Sindhri Masala' }) {
//   const [open, setOpen] = useState(false);
//   const count = useCartStore((s) => s.getCount());

//   const links = [
//     { href: '/', label: 'Home' },
//     { href: '/products', label: 'Products' },
//     { href: '/about', label: 'About' },
//     { href: '/contact', label: 'Contact' },
//   ];

//   return (
//     <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
//         <Link href="/" className="text-xl font-bold text-brand-red tracking-tight">
//           {siteName}
//         </Link>

//         <nav className="hidden md:flex items-center gap-8">
//           {links.map((l) => (
//             <Link key={l.href} href={l.href} className="text-sm font-medium hover:text-brand-red transition">
//               {l.label}
//             </Link>
//           ))}
//         </nav>

//         <div className="flex items-center gap-4">
//           <Link href="/products" className="hidden sm:block text-gray-500 hover:text-brand-red">
//             <Search size={20} />
//           </Link>
//           <Link href="/cart" className="relative text-gray-700 hover:text-brand-red">
//             <ShoppingCart size={22} />
//             {count > 0 && (
//               <span className="absolute -top-2 -right-2 bg-brand-red text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
//                 {count}
//               </span>
//             )}
//           </Link>
//           <button className="md:hidden" onClick={() => setOpen(!open)}>
//             {open ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </div>
//       </div>

//       {open && (
//         <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-3">
//           {links.map((l) => (
//             <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm font-medium">
//               {l.label}
//             </Link>
//           ))}
//         </div>
//       )}
//     </header>
//   );
// }


'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ShoppingCart,
  Menu,
  X,
  Search,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Header({
  siteName = 'Sindhri Masala',
  logoUrl = '',
}) {
  const [open, setOpen] = useState(false);
  const count = useCartStore((s) => s.getCount());

  const links = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group min-w-0"
          >
            {logoUrl ? (
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <img
                  src={logoUrl}
                  alt={siteName}
                  className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-brand-red text-white flex items-center justify-center font-black text-lg">
                {siteName?.charAt(0)?.toUpperCase() || 'S'}
              </div>
            )}

            <span className="text-xl font-extrabold text-brand-red tracking-tight truncate">
              {siteName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-semibold text-gray-700 hover:text-brand-red transition-colors group"
              >
                {link.label}

                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full text-gray-500 hover:text-brand-red hover:bg-brand-cream transition"
              aria-label="Search products"
            >
              <Search size={20} />
            </Link>

            <Link
              href="/cart"
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-gray-700 hover:text-brand-red hover:bg-brand-cream transition"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={22} />

              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            <button
              type="button"
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-brand-cream transition"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open
            ? 'max-h-96 border-t border-gray-100'
            : 'max-h-0'
        }`}
      >
        <nav className="bg-white px-4 py-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:text-brand-red hover:bg-brand-cream transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}