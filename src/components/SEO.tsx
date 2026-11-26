import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { site } from '@/config/site';
import { isSsr, ssrHead, ssrJsonLd } from '@/lib/ssrHead';

interface SEOProps {
    title: string;
    description?: string;
    canonical?: string;
    noindex?: boolean;
    /** One or more schema.org JSON-LD objects to embed for rich results / AI search. */
    jsonLd?: object | object[];
}

const KEYWORDS =
    'app launcher, app switcher, spotlight search, project workspace, context switching, universal search, tab manager, new tab page, raycast alternative, alfred alternative, launcher for windows, free browser extension, no sign-in required, productivity';
const OG_IMAGE = 'https://cool-desk.com/og-cover.png';

// Create-or-update a <meta> tag by its name/property attribute.
function upsertMeta(attr: 'name' | 'property', key: string, content?: string) {
    if (!content) return;
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

// Create-or-update a <link rel="..."> tag.
function upsertLink(rel: string, href?: string) {
    if (!href) return;
    let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
    }
    el.setAttribute('href', href);
}

// Strip query, hash and any trailing slash; the root path becomes ''.
// We canonicalize to a clean, stable per-page URL.
function normalizePath(p: string): string {
    const path = (p || '/').split('#')[0].split('?')[0];
    if (path === '/' || path === '') return '';
    return path.replace(/\/+$/, '');
}

// Canonical must be unique per page. When a page doesn't pass one, derive a
// self-referencing canonical from the current route so no page falls back to
// the homepage URL (or a stale value) — the cause of "same canonical on many
// pages" in search-console warnings.
function selfCanonical(siteUrl: string, pathname: string): string {
    const base = siteUrl.replace(/\/+$/, '');
    const p = normalizePath(pathname);
    return p === '' ? `${base}/` : `${base}${p}`;
}

/**
 * Per-page SEO. Manages the document head imperatively rather than via
 * react-helmet-async, which silently fails to apply tags in this app
 * (React 18 + helmet-async 2.x). Site-wide schemas in index.html are left
 * untouched; only our own JSON-LD (tagged data-seo-jsonld) is managed here.
 */
export default function SEO({ title, description, canonical, noindex = false, jsonLd }: SEOProps) {
    const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : '';
    const location = useLocation();

    // Unique canonical per page; explicit prop wins, otherwise self-referencing.
    const canonicalHref = canonical ?? selfCanonical(site.url, location.pathname);

    // No DOM during the build-time prerender pass — hand the values to the
    // prerender script instead of trying to upsert into a nonexistent `document`.
    if (isSsr) {
        ssrHead.current = { title, description, canonical: canonicalHref, noindex };
        if (jsonLd) {
            const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
            ssrJsonLd.push(...schemas);
        }
    }

    useEffect(() => {
        if (title) document.title = title;

        upsertMeta('name', 'title', title);
        upsertMeta('name', 'description', description);
        upsertMeta('name', 'keywords', KEYWORDS);
        upsertMeta(
            'name',
            'robots',
            noindex
                ? 'noindex, nofollow'
                : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        );

        // Open Graph
        upsertMeta('property', 'og:type', 'website');
        upsertMeta('property', 'og:title', title);
        upsertMeta('property', 'og:description', description);
        upsertMeta('property', 'og:url', canonicalHref);
        upsertMeta('property', 'og:image', OG_IMAGE);
        upsertMeta('property', 'og:image:width', '1200');
        upsertMeta('property', 'og:image:height', '630');

        // Twitter
        upsertMeta('name', 'twitter:card', 'summary_large_image');
        upsertMeta('name', 'twitter:title', title);
        upsertMeta('name', 'twitter:description', description);
        upsertMeta('name', 'twitter:image', OG_IMAGE);

        upsertLink('canonical', canonicalHref);

        // Replace our previously-injected JSON-LD (keep static index.html schemas).
        document.head.querySelectorAll('script[data-seo-jsonld]').forEach((n) => n.remove());
        const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
        schemas.forEach((schema) => {
            const el = document.createElement('script');
            el.type = 'application/ld+json';
            el.setAttribute('data-seo-jsonld', '');
            el.textContent = JSON.stringify(schema);
            document.head.appendChild(el);
        });

        return () => {
            document.head.querySelectorAll('script[data-seo-jsonld]').forEach((n) => n.remove());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, description, canonicalHref, noindex, jsonLdKey]);

    return null;
}
