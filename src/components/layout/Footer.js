import Link from 'next/link';
import SocialIcons from '@/components/whatsapp/SocialIcons';

export default function Footer({ settings, socialLinks }) {
  return (
    <footer className="bg-brand-dark text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-3">{settings?.site_name || 'Sindhri Masala'}</h3>
          <p className="text-sm text-white/70">
            Authentic, halal-certified Pakistani spice blends — ordered easily through WhatsApp.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/products">All Products</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>{settings?.phone}</li>
            <li>{settings?.email}</li>
            <li>{settings?.address}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <SocialIcons socialLinks={socialLinks} siteUrl={process.env.NEXT_PUBLIC_SITE_URL} />
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {settings?.site_name || 'Sindhri Masala'}. All rights reserved.
      </div>
    </footer>
  );
}
