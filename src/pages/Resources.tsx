import Footer from "@/components/new/Footer";
import Navbar from "@/components/new/Navbar";
import SectionBackdrop from "@/components/new/SectionBackdrop";
import SEO from "@/components/SEO";
import { blogPosts, getCategoryLabel } from "@/config/blogs";
import { comparisonGroups } from "@/config/comparisonGroups";
import { Search } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { comparisons } from "./Versus";

/**
 * /resources: one page that sends each visitor to the right place, built for
 * a skim. Three layers, each enough on its own:
 *   1. one question and one search box
 *   2. three doors (get started, compare, blog), one line and one button each
 *   3. a taste of each: getting-started links, every comparison as a chip,
 *      the three latest posts
 * The destinations stay separate pages; this only routes people to them.
 *
 * "Get started" points at what exists today (walkthrough videos, download,
 * FAQ, release notes) plus the /getting-started guide.
 */

const canonical = "https://cool-desk.com/resources";

type Entry = { title: string; to: string; kind: "Start" | "Compare" | "Blog"; anchor?: boolean };

const START: Entry[] = [
    { title: "Getting started", to: "/getting-started", kind: "Start" },
    { title: "Download CoolDesk", to: "/#downloads", kind: "Start", anchor: true },
    { title: "The new tab extension", to: "/new-tab", kind: "Start" },
    { title: "Walkthrough videos", to: "/#how-to-use", kind: "Start", anchor: true },
    { title: "FAQ", to: "/#faq", kind: "Start", anchor: true },
    { title: "Release notes", to: "/releases", kind: "Start" },
    { title: "Under the hood", to: "/under-the-hood", kind: "Start" },
];

const VS: Entry[] = comparisonGroups
    .flatMap((g) => g.slugs)
    .map((slug) => ({ title: comparisons[slug].name, to: `/vs/${slug}`, kind: "Compare" as const }));

const POSTS = blogPosts
    .filter((p) => p.category !== "comparisons")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const BLOG: Entry[] = POSTS.map((p) => ({ title: p.title, to: p.href ?? `/blog/${p.slug}`, kind: "Blog" as const }));

const DOORS = [
    {
        eyebrow: "Get started",
        title: "Set it up",
        line: "Six steps, from install to your first space.",
        cta: "Start the guide",
        to: "/getting-started",
        accent: "#a5b4fc",
        glow: "rgba(129,140,248,0.35)",
        border: "border-indigo-300/30",
    },
    {
        eyebrow: "Compare",
        title: "See how it compares",
        line: "Honest takes, including where other tools win.",
        cta: "Pick a tool",
        to: "/vs",
        accent: "#fdba74",
        glow: "rgba(253,186,116,0.32)",
        border: "border-orange-300/30",
    },
    {
        eyebrow: "Blog",
        title: "Read the guides",
        line: "How-tos and roundups for working in spaces.",
        cta: "Browse posts",
        // The blog list lives on this page; open it in full and scroll there.
        to: "#rs-blog",
        anchor: true,
        expand: true,
        accent: "#7dd3fc",
        glow: "rgba(56,189,248,0.32)",
        border: "border-sky-300/30",
    },
];

const KIND_STYLE: Record<Entry["kind"], string> = {
    Start: "border-indigo-300/40 text-indigo-200",
    Compare: "border-orange-300/40 text-orange-300",
    Blog: "border-sky-300/40 text-sky-300",
};

const initials = (name: string) =>
    name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

/** A link that's a plain anchor for homepage sections, a router Link otherwise. */
function Go({ to, anchor, className, onClick, children }: { to: string; anchor?: boolean; className?: string; onClick?: () => void; children: React.ReactNode }) {
    return anchor ? (
        <a href={to} className={className} onClick={onClick}>
            {children}
        </a>
    ) : (
        <Link to={to} className={className}>
            {children}
        </Link>
    );
}

export default function ResourcesPage() {
    const [query, setQuery] = useState("");
    const [allPosts, setAllPosts] = useState(false);
    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        return [...START, ...VS.map((v) => ({ ...v, title: `CoolDesk vs ${v.title}` })), ...BLOG].filter((e) =>
            e.title.toLowerCase().includes(q),
        );
    }, [query]);

    // What people look for, once they pause typing; zero results show the gaps.
    useEffect(() => {
        const q = query.trim().toLowerCase();
        if (q.length < 2) return;
        const t = window.setTimeout(() => trackEvent("resources_search", { search_term: q, result_count: results.length }), 1200);
        return () => window.clearTimeout(t);
    }, [query, results.length]);

    return (
        <main className="min-h-screen text-white scroll-smooth">
            <SEO
                title="CoolDesk Resources — Get Started, Comparisons and Guides"
                description="Everything for CoolDesk in one place: walkthroughs to get started, honest comparisons with Raycast, Arc, Workona and more, and guides for working in spaces."
                canonical={canonical}
            />
            <Navbar />

            <div className="relative isolate z-10">
                <SectionBackdrop glow="left-1/2 top-[-200px] h-[620px] w-[1100px] -ml-[550px]" tint="rgba(99,102,241,0.16)" />

                <div className="container mx-auto max-w-5xl px-6 pt-36 pb-24">
                    {/* 1. One question, one search */}
                    <section className="flex flex-col items-center text-center">
                        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.04]">What do you need?</h1>
                        <label className="mt-7 flex w-full max-w-xl items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-4 min-h-[52px] focus-within:border-white/30">
                            <Search className="h-[18px] w-[18px] shrink-0 text-white/55" aria-hidden="true" />
                            <span className="sr-only">Search everything</span>
                            <input
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search getting started, comparisons and guides"
                                className="min-w-0 flex-1 bg-transparent text-base text-white placeholder:text-white/40 outline-none"
                            />
                        </label>
                    </section>

                    {query.trim() ? (
                        /* Search results replace the page body while typing */
                        <section aria-live="polite" className="mx-auto mt-10 max-w-3xl">
                            {results.length ? (
                                <ul className="overflow-hidden rounded-2xl border border-white/10">
                                    {results.map((r) => (
                                        <li key={`${r.kind}-${r.to}`} className="border-b border-white/[0.07] last:border-0">
                                            <Go to={r.to} anchor={r.anchor} className="flex min-h-[56px] items-center gap-4 px-5 py-3 transition-colors hover:bg-white/[0.04]">
                                                <span className={`shrink-0 rounded-md border px-2 py-0.5 font-mono text-[11px] ${KIND_STYLE[r.kind]}`}>{r.kind}</span>
                                                <span className="text-[15px] font-medium">{r.title}</span>
                                            </Go>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-white/55">Nothing matches “{query.trim()}”.</p>
                            )}
                        </section>
                    ) : (
                        <>
                            {/* 2. Three doors: one line, one button each */}
                            <section aria-label="Choose" className="mt-12 grid gap-4 md:grid-cols-3">
                                {DOORS.map((d) => (
                                    <Go
                                        key={d.title}
                                        to={d.to}
                                        anchor={d.anchor}
                                        onClick={"expand" in d ? () => setAllPosts(true) : undefined}
                                        className={`group relative flex min-h-[250px] flex-col gap-3 overflow-hidden rounded-[22px] border ${d.border} bg-[#0b0b14] p-7 transition-transform hover:-translate-y-1`}
                                    >
                                        <span aria-hidden="true" className="absolute -right-16 -top-16 h-60 w-60 rounded-full" style={{ background: `radial-gradient(closest-side, ${d.glow}, transparent)` }} />
                                        <span aria-hidden="true" className="relative h-11 w-11 rounded-full" style={{ background: `radial-gradient(circle at 35% 30%, #ffffff, ${d.accent} 45%, #0a0b14 100%)`, boxShadow: `0 0 26px ${d.glow}` }} />
                                        <span className="relative font-mono text-[11.5px] uppercase tracking-[0.12em]" style={{ color: d.accent }}>{d.eyebrow}</span>
                                        <span className="relative text-[26px] font-bold leading-tight tracking-tight">{d.title}</span>
                                        <span className="relative text-[15px] leading-relaxed text-white/60">{d.line}</span>
                                        <span className="relative mt-auto text-[15px] font-semibold">
                                            {d.cta} <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                                        </span>
                                    </Go>
                                ))}
                            </section>

                            {/* 3. A taste of each, never the whole thing */}
                            <section aria-labelledby="rs-start" className="mt-20">
                                <h2 id="rs-start" className="text-[22px] font-semibold">Get going</h2>
                                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                                    {START.map((s) => (
                                        <li key={s.to}>
                                            <Go to={s.to} anchor={s.anchor} className="group flex min-h-[56px] items-center justify-between gap-3 rounded-xl border border-white/10 px-4 text-[15px] font-medium transition-colors hover:bg-white/[0.04]">
                                                {s.title}
                                                <span aria-hidden="true" className="text-indigo-200/70 transition-transform group-hover:translate-x-0.5">→</span>
                                            </Go>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section aria-labelledby="rs-vs" className="mt-14">
                                {/* Every comparison is a chip below, so no "see all" link */}
                                <h2 id="rs-vs" className="text-[22px] font-semibold">Coming from another tool?</h2>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {VS.map((c) => (
                                        <Link key={c.to} to={c.to} className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/10 py-1 pl-2 pr-4 text-[15px] font-medium transition-colors hover:bg-white/[0.04]">
                                            <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-full border border-orange-300/35 bg-orange-300/10 font-mono text-[10.5px] text-orange-300">
                                                {initials(c.title)}
                                            </span>
                                            {c.title}
                                        </Link>
                                    ))}
                                </div>
                            </section>

                            <section id="rs-blog" aria-labelledby="rs-blog-h" className="mt-14 scroll-mt-28">
                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                    <h2 id="rs-blog-h" className="text-[22px] font-semibold">{allPosts ? "From the blog" : "Latest from the blog"}</h2>
                                    {POSTS.length > 3 && (
                                        <button
                                            type="button"
                                            onClick={() => setAllPosts(!allPosts)}
                                            aria-expanded={allPosts}
                                            aria-controls="rs-blog-list"
                                            className="text-sm text-sky-300 hover:text-sky-200"
                                        >
                                            {allPosts ? "Show less" : `See all ${POSTS.length} posts`}
                                        </button>
                                    )}
                                </div>
                                <ul id="rs-blog-list" className="mt-4 overflow-hidden rounded-2xl border border-white/10">
                                    {(allPosts ? POSTS : POSTS.slice(0, 3)).map((p) => (
                                        <li key={p.slug} className="border-b border-white/[0.07] last:border-0">
                                            <Link to={p.href ?? `/blog/${p.slug}`} className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-5 py-4 transition-colors hover:bg-white/[0.04]">
                                                <span className="shrink-0 rounded-md border border-sky-300/35 px-2 py-0.5 font-mono text-[11px] text-sky-300">{getCategoryLabel(p.category)}</span>
                                                <span className="min-w-0 flex-1 text-base font-semibold">{p.title}</span>
                                                <span className="shrink-0 font-mono text-xs text-white/45">
                                                    {new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: allPosts ? "numeric" : undefined })}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}
