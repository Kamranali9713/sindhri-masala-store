// import { getContactPage, getSocialLinks } from '@/lib/queries/settings.queries';
// import SocialIcons from '@/components/whatsapp/SocialIcons';

// export const metadata = { title: 'Contact Us | Sindhri Masala' };

// export default async function ContactPage() {
//   const [contact, socialLinks] = await Promise.all([getContactPage(), getSocialLinks()]);

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-14">
//       <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
//       <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-3 mb-8">
//         <p><strong>Address:</strong> {contact?.address}</p>
//         <p><strong>Phone:</strong> {contact?.phone}</p>
//         <p><strong>Email:</strong> {contact?.email}</p>
//         <p><strong>WhatsApp:</strong> {contact?.whatsapp}</p>
//         <p><strong>Business Hours:</strong> {contact?.business_hours}</p>
//       </div>
//       <SocialIcons socialLinks={socialLinks} siteUrl={process.env.NEXT_PUBLIC_SITE_URL} />
//     </div>
//   );
// }



import { getContactPage, getSocialLinks } from '@/lib/queries/settings.queries';
import SocialIcons from '@/components/whatsapp/SocialIcons';

export const metadata = {
  title: 'Contact Us | Sindhri Masala',
};

export default async function ContactPage() {
  const [contact, socialLinks] = await Promise.all([
    getContactPage(),
    getSocialLinks(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold mb-8">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* CONTACT INFORMATION */}
        <div>
          <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-3 mb-8">
            <p>
              <strong>Address:</strong>{' '}
              {contact?.address || '—'}
            </p>

            <p>
              <strong>Phone:</strong>{' '}
              {contact?.phone || '—'}
            </p>

            <p>
              <strong>Email:</strong>{' '}
              {contact?.email || '—'}
            </p>

            <p>
              <strong>WhatsApp:</strong>{' '}
              {contact?.whatsapp || '—'}
            </p>

            <p>
              <strong>Business Hours:</strong>{' '}
              {contact?.business_hours || '—'}
            </p>
          </div>

          <SocialIcons
            socialLinks={socialLinks}
            siteUrl={process.env.NEXT_PUBLIC_SITE_URL}
          />
        </div>

        {/* MAP */}
        <div>
          {contact?.google_map_url ? (
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
              <iframe
                src={contact.google_map_url}
                width="100%"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Business Location"
              />
            </div>
          ) : (
            <div className="h-[450px] rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
              Map location has not been added yet.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}