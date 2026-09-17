import { getAboutPage } from '@/lib/queries/settings.queries';

export const metadata = { title: 'About Us | Sindhri Masala' };

export default async function AboutPage() {
  const about = await getAboutPage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold mb-6">{about?.title || 'About Us'}</h1>
      <p className="text-gray-600 mb-8">{about?.description}</p>

      {about?.company_story && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Our Story</h2>
          <p className="text-gray-600">{about.company_story}</p>
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-8">
        {about?.vision && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Vision</h2>
            <p className="text-gray-600">{about.vision}</p>
          </div>
        )}
        {about?.mission && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Mission</h2>
            <p className="text-gray-600">{about.mission}</p>
          </div>
        )}
      </div>
    </div>
  );
}
