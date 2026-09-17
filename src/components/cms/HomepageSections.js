import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';

export function HeroSection({ section }) {
  return (
    <section className="bg-gradient-to-br from-brand-red to-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{section.title}</h1>
        {section.subtitle && <p className="text-white/80 text-lg max-w-2xl mx-auto">{section.subtitle}</p>}
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/products" className="bg-white text-brand-red font-semibold px-6 py-3 rounded-lg hover:bg-brand-cream transition">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FeaturedCategoriesSection({ section, categories }) {
  if (!categories?.length) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:shadow-md transition"
          >
            <div className="text-3xl mb-2">🌿</div>
            <div className="font-semibold">{cat.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ProductGridSection({ section, products }) {
  if (!products?.length) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">{section.title}</h2>
          {section.subtitle && <p className="text-gray-500 text-sm">{section.subtitle}</p>}
        </div>
        <Link href="/products" className="text-sm font-semibold text-brand-red hover:underline">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

export function WhyChooseUsSection({ section }) {
  const points = [
    { title: 'Halal Certified', desc: 'All blends certified halal and quality tested.' },
    { title: 'Authentic Recipes', desc: 'Traditional Pakistani spice combinations.' },
    { title: 'Fast Delivery', desc: 'Dispatched quickly across major cities.' },
    { title: 'Easy Ordering', desc: 'Order directly through WhatsApp — no account needed.' },
  ];
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">{section.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {points.map((p) => (
            <div key={p.title} className="text-center">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhatsAppCtaSection({ section, whatsappNumber }) {
  const message = encodeURIComponent('Hello, I want to place an order.');
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
        {section.subtitle && <p className="text-gray-600 mb-6">{section.subtitle}</p>}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          Chat on WhatsApp
        </a>
      </div>
    </section>
  );
}

export function PromoVideoSection({ section, video }) {
  console.log("----------------video", video)
  if (!video) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <video
          controls
          poster={video.thumbnail_url || undefined}
          className="w-full h-full object-cover aspect-video"
        >
          <source src={video.video_url} type="video/mp4" />
        </video>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-2">{video.title || section.title}</h2>
          {video.subtitle && <p className="text-gray-500 mb-6">{video.subtitle}</p>}
          {video.button_text && video.button_link && (
            <a
              href={video.button_link}
              className="inline-block bg-brand-red text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-dark transition"
            >
              {video.button_text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export function FaqSection({ section }) {
  const faqs = [
    { q: 'Do I need to create an account to order?', a: 'No — you can order directly via WhatsApp with no signup required.' },
    { q: 'How is shipping calculated?', a: 'Shipping cost is based on your selected city at checkout.' },
    { q: 'Are your products halal certified?', a: 'Yes, all Sindhri masala blends are halal certified.' },
  ];
  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">{section.title}</h2>
      <div className="space-y-4">
        {faqs.map((f) => (
          <div key={f.q} className="bg-white border border-gray-100 rounded-lg p-4">
            <div className="font-semibold">{f.q}</div>
            <div className="text-sm text-gray-500 mt-1">{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
