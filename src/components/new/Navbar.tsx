import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GITHUB_REPO, site } from '@/config/site';
import { trackEvent } from '@/lib/analytics';

const NAV_SECTION = 'navbar';

function trackNavClick(label: string, href: string, source: 'desktop' | 'mobile') {
    trackEvent('nav_link_click', {
        section: NAV_SECTION,
        action: 'click',
        nav_label: label,
        nav_target: href,
        source,
    });
}

interface NavLink {
    href: string;
    label: string;
    /** Other paths that count as this section, e.g. /vs and /blog under Resources. */
    match?: string[];
}

const STARS_KEY = 'cd_github_stars';

/**
 * The repo's star count, fetched once per browser session (GitHub's
 * unauthenticated API allows 60 calls an hour per visitor). Null until it
 * loads, or if it can't; the button then just says "Star".
 */
function useGithubStars(): number | null {
    const [stars, setStars] = useState<number | null>(null);
    useEffect(() => {
        try {
            const cached = sessionStorage.getItem(STARS_KEY);
            if (cached) {
                setStars(Number(cached));
                return;
            }
        } catch {
            // storage blocked: just fetch
        }
        const repo = GITHUB_REPO.replace('https://github.com/', '');
        let alive = true;
        fetch(`https://api.github.com/repos/${repo}`)
            .then((r) => (r.ok ? r.json() : null))
            .then((d) => {
                const n = typeof d?.stargazers_count === 'number' ? d.stargazers_count : null;
                if (!alive || n === null) return;
                setStars(n);
                try {
                    sessionStorage.setItem(STARS_KEY, String(n));
                } catch {
                    // ignore
                }
            })
            .catch(() => {});
        return () => {
            alive = false;
        };
    }, []);
    return stars;
}

const formatStars = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : String(n));

function GithubIcon({ className = '' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
    );
}

function StarIcon({ className = '' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
        </svg>
    );
}

/** "★ Star 1.2k" — links to the repo. `compact` drops the word, for phones. */
function GithubStarButton({ stars, compact = false }: { stars: number | null; compact?: boolean }) {
    return (
        <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('nav_github_click', { section: NAV_SECTION, action: 'click', stars: stars ?? undefined })}
            aria-label={stars !== null ? `Star CoolDesk on GitHub (${stars} stars)` : 'Star CoolDesk on GitHub'}
            className="group inline-flex h-9 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 text-sm font-medium text-white/80 transition-colors hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
        >
            <GithubIcon className="h-4 w-4" />
            {!compact && <span>Star</span>}
            {stars !== null && (
                <span className="inline-flex items-center gap-1 border-l border-white/15 pl-2 text-white/60 group-hover:text-white/80">
                    <StarIcon className="h-3.5 w-3.5 text-amber-300 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                    {formatStars(stars)}
                </span>
            )}
        </a>
    );
}

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const stars = useGithubStars();

    // Kept short on purpose: /resources is the front door for getting
    // started, comparisons and the blog; everything else is in the footer.
    // Add Docs here once /docs ships.
    const links: NavLink[] = [
        { href: '/', label: 'Home' },
        // Features covers /new-tab and every other feature page.
        { href: '/features', label: 'Features', match: ['/spotlight', '/sidebar', '/dock', '/browser', '/shell', '/file-manager', '/clipboard', '/new-tab'] },
        // The hub links out to these, so they read as part of Resources.
        { href: '/resources', label: 'Resources', match: ['/getting-started', '/vs', '/blog', '/releases', '/under-the-hood'] },
        { href: '/widgets', label: 'Widgets' },
    ];

    const { pathname } = useLocation();
    const isActive = (link: NavLink) =>
        link.href === '/'
            ? pathname === '/'
            : [link.href, ...(link.match ?? [])].some((p) => pathname === p || pathname.startsWith(`${p}/`));

    const renderDesktopLink = (link: NavLink) => {
        const active = isActive(link);
        return (
            <Link
                key={link.href}
                to={link.href}
                aria-current={active ? 'page' : undefined}
                onClick={() => trackNavClick(link.label, link.href, 'desktop')}
                className={`relative py-1 text-sm font-medium transition-colors ${active ? 'text-white' : 'text-txt-secondary hover:text-txt-primary'}`}
            >
                {link.label}
                {/* The current section: a short glowing bar under the label */}
                {active && (
                    <span aria-hidden="true" className="absolute -bottom-1.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-sky-300 shadow-[0_0_8px_rgba(125,211,252,0.9)]" />
                )}
            </Link>
        );
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
            <div className="container mx-auto px-6 py-4">
                {/* Logo | links (centred) | GitHub + Download */}
                <div className="flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
                    {/* Logo */}
                    <a href="/#home" className="flex items-center gap-2 group ml-2 md:ml-0 md:justify-self-start">
                        <img
                            src="/cooldesk.png"
                            alt={`${site.name} logo`}
                            className="h-10 w-auto"
                            width={256}
                            height={256}
                        />
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map(renderDesktopLink)}
                    </div>

                    {/* Right: GitHub star + Download */}
                    <div className="hidden md:flex items-center gap-2.5 justify-self-end">
                        <GithubStarButton stars={stars} />
                        <a
                            href="/#downloads"
                            onClick={() => trackNavClick('Download', '/#downloads', 'desktop')}
                            className="inline-flex h-9 items-center rounded-full bg-white px-4 text-sm font-semibold text-black transition-transform hover:-translate-y-px"
                        >
                            Download
                        </a>
                    </div>

                    {/* Mobile: GitHub + menu button */}
                    <div className="flex items-center gap-3 md:hidden">
                        <GithubStarButton stars={stars} compact />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-300 hover:text-white transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-white/10 pt-4">
                        {links.map((link) => {
                            const active = isActive(link);
                            return (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    aria-current={active ? 'page' : undefined}
                                    onClick={() => {
                                        trackNavClick(link.label, link.href, 'mobile');
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`flex items-center gap-2.5 py-2 transition-colors ${active ? 'text-white' : 'text-txt-secondary hover:text-txt-primary'}`}
                                >
                                    <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-sky-300' : 'bg-transparent'}`} />
                                    {link.label}
                                </Link>
                            );
                        })}

                        <a
                            href="/#downloads"
                            onClick={() => {
                                trackNavClick('Download', '/#downloads', 'mobile');
                                setMobileMenuOpen(false);
                            }}
                            className="mt-2 inline-flex h-10 items-center rounded-full bg-white px-5 text-sm font-semibold text-black"
                        >
                            Download
                        </a>
                    </div>
                )}
            </div>
        </nav>
    );
}
