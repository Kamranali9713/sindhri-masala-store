import { getSocialLink } from '@/lib/helpers/getSocialLink';
import { Facebook, Instagram, Youtube, Linkedin, Twitter, Music2 } from 'lucide-react';

const ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  tiktok: Music2,
};

export default function SocialIcons({ socialLinks = [], siteUrl }) {
  return (
    <div className="flex gap-3">
      {socialLinks.map((social) => {
        const Icon = ICONS[social.platform] || Facebook;
        const href = getSocialLink(social.url, siteUrl);
        return (
          <a
            key={social.id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-brand-red transition"
          >
            <Icon size={16} />
          </a>
        );
      })}
    </div>
  );
}
