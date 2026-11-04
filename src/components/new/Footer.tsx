import { FEATURES } from '@/config/features';
import { GITHUB_REPO, site } from '@/config/site';
import { useLatestRelease } from '@/hooks/useLatestRelease';
import { useSectionView } from '@/lib/analytics';
import { Github } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import FooterSpace from './FooterSpace';

export default function Footer() {
  const release = useLatestRelease();
  const { pathname } = useLocation();
  // Did they read to the bottom? One footer view per page.
  const ref = useSectionView<HTMLElement>('footer', { page_path: pathname });
  return (
    <footer ref={ref} className="relative isolate z-10 overflow-hidden border-t border-white/10 bg-black/60 backdrop-blur-sm">
      {/* The page's last stretch of space: star dust over a planet's horizon. */}
      <FooterSpace />
      {/* Top section */}
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <a href="/" className="flex items-center gap-3 group">
              <img
                src="/cooldesk.png"
                alt={`${site.name} logo`}
                className="h-9 w-auto"
                width={256}
                height={256}
                loading="lazy"
              />
            </a>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Browser tabs, desktop apps, links, and notes — kept in spaces in the app.
            </p>
          </div>

          {/* The desktop app's parts, one page each */}
          <div>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-4">
              Features
            </p>
            <ul className="space-y-2.5">
              {FEATURES.map((f) => (
                <li key={f.slug}>
                  <a href={f.slug} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {f.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {[
                { label: 'How to Use', href: '/#how-to-use' },
                { label: 'New Tab Extension', href: '/new-tab' },
                { label: 'FAQ', href: '/#faq' },
                { label: 'CoolDesk vs Workona', href: '/vs/workona' },
                { label: 'CoolDesk vs Toby', href: '/vs/toby' },
                { label: 'CoolDesk vs Raycast', href: '/vs/raycast' },
                { label: 'CoolDesk vs Alfred', href: '/vs/alfred' },
                { label: 'CoolDesk vs Spotlight', href: '/vs/spotlight' },
                { label: 'CoolDesk vs PowerToys', href: '/vs/powertoys' },
                { label: 'CoolDesk vs Momentum', href: '/vs/momentum' },
                { label: 'CoolDesk vs Flow Launcher', href: '/vs/flow-launcher' },
                { label: 'CoolDesk vs Arc', href: '/vs/arc' },
                { label: 'CoolDesk vs OneTab', href: '/vs/onetab' },
                { label: 'CoolDesk vs Session Buddy', href: '/vs/session-buddy' },
                { label: 'CoolDesk vs Chrome Tab Groups', href: '/vs/chrome-tab-groups' },
                { label: 'All comparisons', href: '/vs' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-4">
              Resources
            </p>
            <ul className="space-y-2.5">
              {[
                { label: 'All resources', href: '/resources' },
                { label: 'Getting started', href: '/getting-started' },
                { label: 'Release Notes', href: '/releases' },
                { label: 'Under the Hood', href: '/under-the-hood' },
                { label: 'Founder Story', href: '/founder' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy-details' },
                { label: 'Terms of Service', href: '/terms' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600 font-mono">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-green-400/40" />
              v{release.version}
            </span>
            <span className="text-gray-700">|</span>
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-gray-500 hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              Open Source
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
