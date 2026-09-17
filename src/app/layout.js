// import './globals.css';
// import Header from '@/components/layout/Header';
// import Footer from '@/components/layout/Footer';
// import FloatingWhatsAppButton from '@/components/whatsapp/FloatingWhatsAppButton';
// import { getSiteSettings, getSocialLinks } from '@/lib/queries/settings.queries';

// export async function generateMetadata() {
//   const settings = await getSiteSettings();
//   return {
//     title: settings?.site_name || 'Sindhri Masala',
//     description: 'Authentic Pakistani spice blends — order via WhatsApp.',
//   };
// }

// export default async function RootLayout({ children }) {
//   const settings = await getSiteSettings();
//   const socialLinks = await getSocialLinks();

//   return (
//     <html lang="en">
//       <body>
//         <Header siteName={settings?.site_name} />
//         <main className="min-h-screen">{children}</main>
//         <Footer settings={settings} socialLinks={socialLinks} />
//         <FloatingWhatsAppButton phoneNumber={settings?.whatsapp_number} />
//       </body>
//     </html>
//   );
// }


import './globals.css';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsAppButton from '@/components/whatsapp/FloatingWhatsAppButton';

import {
  getSiteSettings,
  getSocialLinks,
} from '@/lib/queries/settings.queries';

export async function generateMetadata() {
  const settings = await getSiteSettings();

  const siteName = settings?.site_name || 'Sindhri Masala';
  const favicon = settings?.favicon_url || '';

  return {
    title: siteName,

    description:
      'Authentic Pakistani spice blends — order via WhatsApp.',

    icons: favicon
      ? {
          icon: [
            {
              url: favicon,
              type: 'image/png',
            },
          ],
          shortcut: favicon,
          apple: favicon,
        }
      : undefined,
  };
}

export default async function RootLayout({ children }) {
  const settings = await getSiteSettings();
  const socialLinks = await getSocialLinks();

  return (
    <html lang="en">
      <body>
        <Header
          siteName={settings?.site_name || 'Sindhri Masala'}
          logoUrl={settings?.logo_url || ''}
        />

        <main className="min-h-screen">
          {children}
        </main>

        <Footer
          settings={settings}
          socialLinks={socialLinks}
        />

        <FloatingWhatsAppButton
          phoneNumber={settings?.whatsapp_number}
        />
      </body>
    </html>
  );
}