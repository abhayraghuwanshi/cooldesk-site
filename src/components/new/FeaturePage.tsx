import Footer from "@/components/new/Footer";
import Navbar from "@/components/new/Navbar";
import PageIndex, { type IndexItem } from "@/components/new/PageIndex";
import SectionBackdrop from "@/components/new/SectionBackdrop";
import Shot from "@/components/new/Shot";
import SEO from "@/components/SEO";
import { FEATURES } from "@/config/features";
import type { Shot as ShotData } from "@/config/shots";
import { trackEvent, useSectionView } from "@/lib/analytics";
import { ArrowRight } from "lucide-react";
import { createContext, useContext } from "react";
import { Link } from "react-router-dom";

/**
 * The layout every desktop-feature page shares (/sidebar, /dock, /shell,
 * /clipboard, /file-manager): hero with a screenshot, a sticky index, the
 * page's sections, questions, a closing call to action and links to the
 * other features. /new-tab and /browser predate it and keep their own.
 *
 * Tracking: section_view per <Section> as `${page}_${id}`, FAQ opens as
 * `${page}_faq_open`; download links go through the site-wide listener.
 */

export const link = "text-sky-300 underline decoration-sky-300/30 underline-offset-4 transition-colors hover:text-sky-200";

const PageKey = createContext("feature");

/** A page section that reports once when someone scrolls to it. */
export function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    const page = useContext(PageKey);
    const ref = useSectionView<HTMLElement>(`${page}_${id}`, { page_type: page });
    return (
        <section ref={ref} id={id} aria-labelledby={`${id}-h`} data-track-area={id} className="scroll-mt-28 border-t border-white/10 py-10">
            <h2 id={`${id}-h`} className="text-2xl font-bold tracking-tight">
                {title}
            </h2>
            <div className="mt-4 space-y-4 text-[16.5px] leading-[1.7] text-white/75">{children}</div>
        </section>
    );
}

/** Name → description rows. */
export function Rows({ rows, width = "sm:w-32" }: { rows: [string, React.ReactNode][]; width?: string }) {
    return (
        <dl className="overflow-hidden rounded-2xl border border-white/10">
            {rows.map(([name, what]) => (
                <div key={name} className="flex flex-col gap-1 border-b border-white/[0.07] px-5 py-3.5 last:border-0 sm:flex-row sm:gap-6">
                    <dt className={`shrink-0 font-semibold text-white ${width}`}>{name}</dt>
                    <dd className="text-[15px] text-white/70">{what}</dd>
                </div>
            ))}
        </dl>
    );
}

export function Kbd({ children }: { children: React.ReactNode }) {
    return <kbd className="rounded-md border border-white/20 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-white">{children}</kbd>;
}

export const Platform = ({ children }: { children: React.ReactNode }) => (
    <span className="ml-2 rounded-md border border-white/15 px-1.5 py-0.5 align-middle text-[12px] font-medium text-white/55">{children}</span>
);

function Download({ label = "Download free" }: { label?: string }) {
    return (
        <a
            href="/#downloads"
            className="group inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-5 text-[15px] font-semibold text-[#07070a] shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_8px_30px_rgba(56,189,248,0.25)] transition-transform hover:-translate-y-px"
        >
            {label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
    );
}

/** The other feature pages, as a grid of cards. Used here and on /new-tab, /browser. */
export function MoreFeatures({ current, page }: { current: string; page: string }) {
    return (
        <nav aria-labelledby="more-features-h" data-track-area="more_features" className="mt-14">
            <h2 id="more-features-h" className="text-[13px] font-semibold uppercase tracking-widest text-white/45">
                More in CoolDesk
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {FEATURES.filter((f) => f.slug !== current).map(({ slug, name, blurb, Icon }) => (
                    <li key={slug}>
                        <Link
                            to={slug}
                            onClick={() => trackEvent("feature_page_link", { page_type: page, to: slug })}
                            className="group flex h-full gap-3.5 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/25 hover:bg-white/[0.04]"
                        >
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sky-400/10 text-sky-300">
                                <Icon className="h-4 w-4" />
                            </span>
                            <span>
                                <span className="block text-[15px] font-semibold text-white">{name}</span>
                                <span className="mt-0.5 block text-[13.5px] leading-snug text-white/50">{blurb}</span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export type FeaturePageProps = {
    /** Analytics prefix and page_type, e.g. "shell". */
    page: string;
    /** Path, e.g. "/shell". */
    path: string;
    seoTitle: string;
    seoDescription: string;
    crumb: string;
    title: string;
    intro: React.ReactNode;
    hero: ShotData;
    platforms?: string;
    secondary?: { href: string; label: string };
    index: IndexItem[];
    faq: { q: string; a: React.ReactNode }[];
    ctaTitle: string;
    children: React.ReactNode;
};

export default function FeaturePage(p: FeaturePageProps) {
    const heroRef = useSectionView<HTMLElement>(`${p.page}_hero`, { page_type: p.page });
    const ctaRef = useSectionView<HTMLElement>(`${p.page}_close_cta`, { page_type: p.page });
    const canonical = `https://cool-desk.com${p.path}`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "CoolDesk",
        applicationCategory: "ProductivityApplication",
        operatingSystem: "macOS, Windows, Linux",
        url: canonical,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    };

    return (
        <PageKey.Provider value={p.page}>
            <main className="min-h-screen text-white">
                <SEO title={p.seoTitle} description={p.seoDescription} canonical={canonical} jsonLd={jsonLd} />
                <Navbar />

                <div className="relative isolate">
                    <SectionBackdrop glow="left-1/2 top-[200px] h-[700px] w-[1300px] -ml-[650px]" tint="rgba(56,189,248,0.12)" />

                    <header ref={heroRef} data-track-area="hero" className="container mx-auto max-w-6xl px-6 pt-32 pb-12">
                        <nav aria-label="Breadcrumb" className="text-[13px] text-white/50">
                            <Link to="/" className="text-white/60 transition-colors hover:text-white">Home</Link>
                            {" / "}
                            <span className="text-sky-300">{p.crumb}</span>
                        </nav>
                        <h1 className="mt-4 max-w-3xl text-[38px] font-bold leading-[1.05] tracking-[-0.03em] md:text-6xl">{p.title}</h1>
                        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">{p.intro}</p>
                        <div className="mt-7 flex flex-wrap items-center gap-3">
                            <Download />
                            {p.secondary && (
                                <a href={p.secondary.href} className="inline-flex min-h-12 items-center rounded-xl border border-white/20 px-5 text-[15px] font-medium transition-colors hover:bg-white/[0.04]">
                                    {p.secondary.label}
                                </a>
                            )}
                        </div>
                        <p className="mt-3 text-xs text-white/40">{p.platforms ?? "Mac, Windows and Linux · free, no account"}</p>

                        <Shot shot={p.hero} priority className="mt-12" />
                    </header>

                    <div className="container mx-auto max-w-6xl px-6 pb-24 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
                        <PageIndex items={[...p.index, { id: "faq", label: "Questions" }]} accent="sky" />
                        <div className="min-w-0 max-w-3xl">
                            {p.children}

                            <Section id="faq" title="Questions">
                                <div>
                                    {p.faq.map((f) => (
                                        <details
                                            key={f.q}
                                            onToggle={(e) => {
                                                if ((e.currentTarget as HTMLDetailsElement).open) trackEvent(`${p.page}_faq_open`, { page_type: p.page, question: f.q });
                                            }}
                                            className="group border-b border-white/10"
                                        >
                                            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3.5 text-[16.5px] font-semibold [&::-webkit-details-marker]:hidden">
                                                {f.q}
                                                <span aria-hidden="true" className="shrink-0 text-[22px] font-light text-white/50 transition-transform group-open:rotate-45">+</span>
                                            </summary>
                                            <div className="pb-5 text-[15.5px] leading-relaxed text-white/70">{f.a}</div>
                                        </details>
                                    ))}
                                </div>
                            </Section>

                            <section ref={ctaRef} data-track-area="cta" className="relative mt-4 overflow-hidden rounded-[22px] border border-sky-300/25 bg-[#0a0d16] px-6 py-9 md:px-8">
                                <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.3),transparent)]" />
                                <h2 className="relative text-[26px] font-bold">{p.ctaTitle}</h2>
                                <p className="relative mt-2.5 max-w-[560px] text-[15.5px] leading-relaxed text-white/65">Free, no account, and everything stays on your device.</p>
                                <div className="relative mt-6 flex flex-wrap gap-3">
                                    <Download label="Download CoolDesk" />
                                </div>
                            </section>

                            <MoreFeatures current={p.path} page={p.page} />
                        </div>
                    </div>
                </div>

                <Footer />
            </main>
        </PageKey.Provider>
    );
}
