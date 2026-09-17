// import Link from 'next/link';
// import ProductCard from '@/components/products/ProductCard';

// export function HeroSection({ section }) {
//   return (
//     <section className="bg-gradient-to-br from-brand-red to-brand-dark text-white">
//       <div className="max-w-7xl mx-auto px-4 py-20 text-center">
//         <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{section.title}</h1>
//         {section.subtitle && <p className="text-white/80 text-lg max-w-2xl mx-auto">{section.subtitle}</p>}
//         <div className="mt-8 flex justify-center gap-4">
//           <Link href="/products" className="bg-white text-brand-red font-semibold px-6 py-3 rounded-lg hover:bg-brand-cream transition">
//             Shop Now
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

// export function FeaturedCategoriesSection({ section, categories }) {
//   if (!categories?.length) return null;
//   return (
//     <section className="max-w-7xl mx-auto px-4 py-12">
//       <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {categories.map((cat) => (
//           <Link
//             key={cat.id}
//             href={`/categories/${cat.slug}`}
//             className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:shadow-md transition"
//           >
//             <div className="text-3xl mb-2">🌿</div>
//             <div className="font-semibold">{cat.name}</div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }

// export function ProductGridSection({ section, products }) {
//   if (!products?.length) return null;
//   return (
//     <section className="max-w-7xl mx-auto px-4 py-12">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h2 className="text-2xl font-bold">{section.title}</h2>
//           {section.subtitle && <p className="text-gray-500 text-sm">{section.subtitle}</p>}
//         </div>
//         <Link href="/products" className="text-sm font-semibold text-brand-red hover:underline">
//           View All
//         </Link>
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
//         {products.map((p) => (
//           <ProductCard key={p.id} product={p} />
//         ))}
//       </div>
//     </section>
//   );
// }

// export function WhyChooseUsSection({ section }) {
//   const points = [
//     { title: 'Halal Certified', desc: 'All blends certified halal and quality tested.' },
//     { title: 'Authentic Recipes', desc: 'Traditional Pakistani spice combinations.' },
//     { title: 'Fast Delivery', desc: 'Dispatched quickly across major cities.' },
//     { title: 'Easy Ordering', desc: 'Order directly through WhatsApp — no account needed.' },
//   ];
//   return (
//     <section className="bg-white py-12">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-2xl font-bold mb-8 text-center">{section.title}</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {points.map((p) => (
//             <div key={p.title} className="text-center">
//               <div className="text-3xl mb-2">✅</div>
//               <h3 className="font-semibold">{p.title}</h3>
//               <p className="text-sm text-gray-500 mt-1">{p.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export function WhatsAppCtaSection({ section, whatsappNumber }) {
//   const message = encodeURIComponent('Hello, I want to place an order.');
//   return (
//     <section className="max-w-7xl mx-auto px-4 py-12">
//       <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
//         <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
//         {section.subtitle && <p className="text-gray-600 mb-6">{section.subtitle}</p>}
//         <a
//           href={`https://wa.me/${whatsappNumber}?text=${message}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg transition"
//         >
//           Chat on WhatsApp
//         </a>
//       </div>
//     </section>
//   );
// }

// export function PromoVideoSection({ section, video }) {
//   console.log("----------------video", video)
//   if (!video) return null;
//   return (
//     <section className="max-w-7xl mx-auto px-4 py-12">
//       <div className="grid md:grid-cols-2 gap-8 items-center bg-white border border-gray-100 rounded-2xl overflow-hidden">
//         <video
//           controls
//           poster={video.thumbnail_url || undefined}
//           className="w-full h-full object-cover aspect-video"
//         >
//           <source src={video.video_url} type="video/mp4" />
//         </video>
//         <div className="p-8">
//           <h2 className="text-2xl font-bold mb-2">{video.title || section.title}</h2>
//           {video.subtitle && <p className="text-gray-500 mb-6">{video.subtitle}</p>}
//           {video.button_text && video.button_link && (
//             <a
//               href={video.button_link}
//               className="inline-block bg-brand-red text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-dark transition"
//             >
//               {video.button_text}
//             </a>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// export function FaqSection({ section }) {
//   const faqs = [
//     { q: 'Do I need to create an account to order?', a: 'No — you can order directly via WhatsApp with no signup required.' },
//     { q: 'How is shipping calculated?', a: 'Shipping cost is based on your selected city at checkout.' },
//     { q: 'Are your products halal certified?', a: 'Yes, all Sindhri masala blends are halal certified.' },
//   ];
//   return (
//     <section className="max-w-3xl mx-auto px-4 py-12">
//       <h2 className="text-2xl font-bold mb-6 text-center">{section.title}</h2>
//       <div className="space-y-4">
//         {faqs.map((f) => (
//           <div key={f.q} className="bg-white border border-gray-100 rounded-lg p-4">
//             <div className="font-semibold">{f.q}</div>
//             <div className="text-sm text-gray-500 mt-1">{f.a}</div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }



import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';

export function HeroSection({ section }) {
  const image = section?.image_url;

  return (
    <>
     <section className="relative min-h-[400] md:min-h-[480px] overflow-hidden bg-gradient-to-br from-brand-dark via-brand-red to-[#4f0b09] text-white">

  {/* Animated background glow */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="hero-orb hero-orb-one" />
    <div className="hero-orb hero-orb-two" />
    <div className="hero-orb hero-orb-three" />

    <div className="absolute inset-0 opacity-10">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
          backgroundSize: '55px 55px',
        }}
      />
    </div>

    {/* Floating particles */}
    <span className="hero-particle particle-1">✦</span>
    <span className="hero-particle particle-2">✧</span>
    <span className="hero-particle particle-3">✦</span>
    <span className="hero-particle particle-4">✧</span>
    <span className="hero-particle particle-5">✦</span>
    <span className="hero-particle particle-6">✧</span>
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 md:py-14">
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">

      {/* Content */}
      <div className="text-center lg:text-left">

        <div className="hero-fade-up inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-3 py-1.5 mb-4">
          <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse" />
          <span className="text-[11px] md:text-xs font-semibold tracking-wider uppercase text-white/90">
            Authentic • Premium • Pakistani
          </span>
        </div>

        <h1 className="hero-fade-up hero-delay-1 text-2xl sm:text-3xl md:text-4xl lg:text-2xl font-black leading-[1.1] tracking-tight">
          {section?.title || 'Authentic Taste. Rich Tradition.'}
        </h1>

        {section?.subtitle && (
          <p className="hero-fade-up hero-delay-2 mt-0 text-sm md:text-base text-white/75 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            {section.subtitle}
          </p>
        )}

        <div className="hero-fade-up hero-delay-3 mt-5 flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
          <Link
            href={section?.button_link || '/products'}
            className="hero-button group inline-flex items-center justify-center gap-2 bg-white text-brand-red font-bold px-5 py-2.5 rounded-xl shadow-xl shadow-black/20 hover:bg-brand-cream transition-all duration-300 text-sm"
          >
            <span>{section?.button_text || 'Shop Now'}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 border border-white/30 bg-white/5 backdrop-blur-sm text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 transition-all duration-300 text-sm"
          >
            Explore Products
          </Link>
        </div>

        {/* Trust indicators — stays on the red background */}
        <div className="hero-fade-up hero-delay-4 mt-8 flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 text-xs text-white/65">
          <span className="flex items-center gap-1.5">
            <span className="text-brand-gold">✓</span>
            Quality Ingredients
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-brand-gold">✓</span>
            Traditional Recipes
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-brand-gold">✓</span>
            Fast Delivery
          </span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative justify-center lg:justify-end hidden sm:flex">
        <div className="absolute w-[220px] h-[220px] md:w-[300px] md:h-[300px] rounded-full border border-white/10 hero-spin-slow" />
        <div className="absolute w-[190px] h-[190px] md:w-[260px] md:h-[260px] rounded-full border border-brand-gold/20 hero-spin-reverse" />

        <div className="hero-image-wrap relative w-[200px] h-[240px] md:w-[280px] md:h-[320px]">
          {image ? (
            <div className="absolute inset-3 rounded-[1.5rem] overflow-hidden border border-white/20 shadow-2xl shadow-black/30 bg-white/10 backdrop-blur-sm">
              <img
                src={image}
                alt={section?.title || 'Sindhri Masala'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/10" />
            </div>
          ) : (
            <div className="absolute inset-3 rounded-[1.5rem] border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center">
              <div className="text-5xl md:text-6xl hero-spice-float">🌶️</div>
              <div className="text-3xl md:text-4xl mt-2 hero-spice-float hero-delay-2">🌿</div>
              <p className="mt-3 text-white/70 text-xs font-medium">Authentic Pakistani Flavours</p>
            </div>
          )}

          <div className="absolute -left-2 md:-left-6 top-10 bg-white text-gray-900 rounded-xl px-3 py-2 shadow-xl hero-float-card">
            <div className="text-brand-red font-black text-sm">100%</div>
            <div className="text-[10px] text-gray-500 font-medium">Authentic Taste</div>
          </div>

          <div className="absolute -right-2 md:-right-5 bottom-12 bg-white text-gray-900 rounded-xl px-3 py-2 shadow-xl hero-float-card hero-delay-2">
            <div className="flex items-center gap-1.5">
              <span className="text-base">⭐</span>
              <div>
                <div className="font-black text-xs">Premium</div>
                <div className="text-[10px] text-gray-500">Quality Spices</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Bottom curve */}
  <div className="absolute bottom-0 left-0 right-0">
    <svg
      viewBox="0 0 1440 120"
      className="w-full h-auto block"
      preserveAspectRatio="none"
    >
      <path
        d="M0,80 C240,120 360,20 720,55 C1080,90 1200,15 1440,55 L1440,120 L0,120 Z"
        fill="#FBF6EE"
      />
    </svg>
  </div>
</section>
    </>
  );
}

export function FeaturedCategoriesSection({ section, categories }) {
  if (!categories?.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="flex items-end justify-between gap-4 mb-5">
        <div>
          <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-2">
            Explore
          </p>

          <h2 className="text-2xl md:text-3xl font-black">
            {section.title}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="group bg-white border border-gray-100 rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {cat.image_url ? (
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src={cat.image_url}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ) : (
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                🌿
              </div>
            )}

            <div className="font-bold">
              {cat.name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ProductGridSection({ section, products }) {
  if (!products?.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="flex items-end justify-between gap-4 mb-7">
        <div>
          <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-2">
            Our Collection
          </p>

          <h2 className="text-2xl md:text-3xl font-black">
            {section.title}
          </h2>

          {section.subtitle && (
            <p className="text-gray-500 text-sm mt-2">
              {section.subtitle}
            </p>
          )}
        </div>

        <Link
          href="/products"
          className="text-sm font-bold text-brand-red hover:underline shrink-0"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export function WhyChooseUsSection({ section }) {
  const points = [
    {
      title: 'Halal Certified',
      desc: 'All blends certified halal and quality tested.',
      icon: '✓',
    },
    {
      title: 'Authentic Recipes',
      desc: 'Traditional Pakistani spice combinations.',
      icon: '✦',
    },
    {
      title: 'Fast Delivery',
      desc: 'Dispatched quickly across major cities.',
      icon: '→',
    },
    {
      title: 'Easy Ordering',
      desc: 'Order directly through WhatsApp — no account needed.',
      icon: '♡',
    },
  ];

  return (
    <section className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-2">
            Why Us
          </p>

          <h2 className="text-2xl md:text-3xl font-black">
            {section.title}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {points.map((point) => (
            <div
              key={point.title}
              className="text-center p-5 rounded-2xl hover:bg-brand-cream transition-colors"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-brand-red text-white flex items-center justify-center text-xl font-black">
                {point.icon}
              </div>

              <h3 className="font-bold">
                {point.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhatsAppCtaSection({
  section,
  whatsappNumber,
}) {
  const message = encodeURIComponent(
    'Hello, I want to place an order.'
  );

  const cleanNumber = String(
    whatsappNumber || ''
  ).replace(/\D/g, '');

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="relative overflow-hidden bg-green-50 border border-green-200 rounded-3xl p-8 md:p-12 text-center">

        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-green-200/40" />
        <div className="absolute -bottom-24 -left-20 w-56 h-56 rounded-full bg-green-200/30" />

        <div className="relative">
          <h2 className="text-2xl md:text-3xl font-black mb-2">
            {section.title}
          </h2>

          {section.subtitle && (
            <p className="text-gray-600 mb-7 max-w-xl mx-auto">
              {section.subtitle}
            </p>
          )}

          <a
            href={`https://wa.me/${cleanNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <span className="text-xl">◉</span>
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}


export function PromoVideoSection({ section, video }) {
  if (!video) return null;

  return (
    <section className="w-full py-14">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Heading */}
        <div className="text-center mb-8">
          <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-2">
            Watch
          </p>

          <h2 className="text-2xl md:text-4xl font-black">
            {section?.title || video.title || 'Project Video'}
          </h2>

          {section?.subtitle && (
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              {section.subtitle}
            </p>
          )}
        </div>

        {/* Full Video */}
        <div className="relative w-full bg-black rounded-3xl overflow-hidden shadow-2xl">

          <video
            controls
            playsInline
            preload="metadata"
            poster={video.thumbnail_url || undefined}
            className="
              block
              w-full
              h-auto
              max-h-[80vh]
              object-contain
              mx-auto
            "
          >
            <source
              src={video.video_url}
              type="video/mp4"
            />

            Your browser does not support the video tag.
          </video>

        </div>

        {/* Video Details */}
        {(video.title ||
          video.subtitle ||
          video.button_text) && (
          <div className="text-center mt-6">

            {video.title && (
              <h3 className="text-xl md:text-2xl font-bold">
                {video.title}
              </h3>
            )}

            {video.subtitle && (
              <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
                {video.subtitle}
              </p>
            )}

            {video.button_text && video.button_link && (
              <a
                href={video.button_link}
                className="inline-flex items-center mt-5 bg-brand-red text-white font-bold px-6 py-3 rounded-xl hover:bg-brand-dark hover:-translate-y-0.5 transition-all"
              >
                {video.button_text}
              </a>
            )}

          </div>
        )}

      </div>
    </section>
  );
}


export function FaqSection({ section }) {
  const faqs = [
    {
      q: 'Do I need to create an account to order?',
      a: 'No — you can order directly via WhatsApp with no signup required.',
    },
    {
      q: 'How is shipping calculated?',
      a: 'Shipping cost is based on your selected city at checkout.',
    },
    {
      q: 'Are your products halal certified?',
      a: 'Yes, all Sindhri masala blends are halal certified.',
    },
  ];

  return (
    <section className="max-w-3xl mx-auto px-4 py-14">
      <div className="text-center mb-7">
        <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-2">
          FAQ
        </p>

        <h2 className="text-2xl md:text-3xl font-black">
          {section.title}
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.q}
            className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="font-bold">
              {faq.q}
            </div>

            <div className="text-sm text-gray-500 mt-2 leading-relaxed">
              {faq.a}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}