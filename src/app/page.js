import { getHomepageSections } from '@/lib/queries/homepage.queries';
import { getAllCategories } from '@/lib/queries/category.queries';
import { getFeaturedProducts, getBestSellers } from '@/lib/queries/product.queries';
import { getSiteSettings } from '@/lib/queries/settings.queries';
import { getFeaturedVideo } from '@/lib/queries/video.queries';
import {
  HeroSection,
  FeaturedCategoriesSection,
  ProductGridSection,
  WhyChooseUsSection,
  WhatsAppCtaSection,
  FaqSection,
  PromoVideoSection,
} from '@/components/cms/HomepageSections';

export default async function HomePage() {
  const [sections, categories, featuredProducts, bestSellers, settings, featuredVideo] = await Promise.all([
    getHomepageSections(),
    getAllCategories(),
    getFeaturedProducts(),
    getBestSellers(),
    getSiteSettings(),
    getFeaturedVideo(),
  ]);

  return (
    <div>
      {sections.map((section) => {
        switch (section.section_type) {
          case 'hero':
            return <HeroSection key={section.id} section={section} />;
          case 'featured_categories':
            return <FeaturedCategoriesSection key={section.id} section={section} categories={categories} />;
          case 'featured_products':
            return <ProductGridSection key={section.id} section={section} products={featuredProducts} />;
          case 'best_sellers':
            return <ProductGridSection key={section.id} section={section} products={bestSellers} />;
          case 'promo_video':
            return <PromoVideoSection key={section.id} section={section} video={featuredVideo} />;
          case 'why_choose_us':
            return <WhyChooseUsSection key={section.id} section={section} />;
          case 'whatsapp_cta':
            return <WhatsAppCtaSection key={section.id} section={section} whatsappNumber={settings?.whatsapp_number} />;
          case 'faq':
            return <FaqSection key={section.id} section={section} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
