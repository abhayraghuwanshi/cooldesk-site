import Footer from "@/components/new/Footer";
import Navbar from "@/components/new/Navbar";
import { CONNECTS } from "@/components/new/connects";
import PageIndex, { type IndexItem } from "@/components/new/PageIndex";
import SectionBackdrop from "@/components/new/SectionBackdrop";
import SyncSettingsPanel from "@/components/new/SyncSettingsPanel";
import SEO from "@/components/SEO";
import { MoreFeatures } from "@/components/new/FeaturePage";
import Shot from "@/components/new/Shot";
import { SHOTS, type ShotKey } from "@/config/shots";
import { CHROME_STORE } from "@/config/site";
import { trackEvent, useSectionView } from "@/lib/analytics";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * The browser extension on its own page, linked from the homepage's
 * "Connect your browser" section.
 *
 * Claims follow cooldesk-extension/src:
 *   layouts, hideable parts, feed tabs   faces/overview/overviewLayouts.js
 *   Active Apps / Local Dev / by domain  faces/tabs/TabManagement.jsx (Active Apps
 *                                        needs the desktop app: utils/userApps.js)
 *   themes (gradients copied verbatim), wallpapers (featured, opacity, rotate,
 *   Unsplash), fonts                     features/settings/parts/ThemesTab.jsx,
 *                                        shared/data/wallpapers.js
 *
 * Wallpaper previews are the catalog's Misty Valley, Mountain Mirror and
 * Mountain Sunset, shrunk to public/images/wallpaper-*.jpg (1280px).
 *
 * Screenshot: public/images/full-window.jpg (2000×1254). Never swap in a shot
 * that shows banks or payment pages (see NewTabShowcase.tsx). Each layout has
 * its own shot in src/config/shots.ts (newTab*); the picker shows the one for
 * the selected layout once its image is in.
 *
 * Tracking: every Chrome Web Store / download link goes through the site-wide
 * listener (download_intent_click, link_area from data-track-area). This page
 * adds a section_view per section, layout previews and FAQ opens.
 */

const canonical = "https://cool-desk.com/new-tab";
const PAGE = { page_type: "new_tab" };

const link = "text-sky-300 underline decoration-sky-300/30 underline-offset-4 transition-colors hover:text-sky-200";

const ALT =
    "The CoolDesk new tab over a lake wallpaper: widget tabs with a quote, crypto prices, currency converter, weather and world clock; today’s timeline; favorites and the activity feed showing local dev servers; and the running apps, local dev and grouped-by-domain column.";

const INDEX: IndexItem[] = [
    { id: "widgets", label: "Widgets" },
    { id: "feed", label: "Favorites & activity" },
    { id: "today", label: "Your day" },
    { id: "tabs", label: "Tabs & apps" },
    { id: "layouts", label: "Layouts" },
    { id: "themes", label: "Themes & wallpapers" },
    { id: "connect", label: "Connect the app" },
    { id: "sync", label: "Turn on Desktop Sync" },
    { id: "faq", label: "Questions" },
];

const FEED_TABS = [
    ["All", "everything, newest first"],
    ["Browsing", "the sites you’ve had open"],
    ["Local", "dev servers on localhost, with their ports"],
    ["Suites", "a site’s services grouped together, like every Google app under google.com"],
    ["Search", "what you searched for"],
    ["Media", "videos and music"],
];

// [x, y, w, h] in a 40×28 box, w = widgets, f = feed (same as the extension's previews).
const LAYOUTS: { key: string; label: string; hint: string; shot: ShotKey; cells: [number, number, number, number][] }[] = [
    { key: "classic", label: "Classic", hint: "Widgets left, feed right", shot: "newTabClassic", cells: [[2, 2, 13, 24], [17, 2, 21, 24]] },
    { key: "mirror", label: "Mirror", hint: "Feed left, widgets right", shot: "newTabMirror", cells: [[25, 2, 13, 24], [2, 2, 21, 24]] },
    { key: "split", label: "Split", hint: "Two equal halves", shot: "newTabSplit", cells: [[2, 2, 17, 24], [21, 2, 17, 24]] },
    { key: "stacked", label: "Stacked", hint: "Widgets on top, feed below", shot: "newTabStacked", cells: [[2, 2, 36, 9], [2, 13, 36, 13]] },
    { key: "focus", label: "Focus", hint: "One centered column", shot: "newTabFocus", cells: [[10, 2, 20, 8], [10, 12, 20, 14]] },
    { key: "custom", label: "Custom", hint: "Build your own from cards", shot: "newTabCustom", cells: [[2, 2, 11, 11], [15, 2, 23, 11], [2, 15, 23, 11], [27, 15, 11, 11]] },
];

// The extension's own gradient themes (ThemesTab.jsx), with the font each one pairs with.
const THEMES: { id: string; name: string; font: string; bg: string }[] = [
    { id: "ai-midnight-nebula", name: "AI Midnight Nebula", font: "Inter", bg: "radial-gradient(60% 80% at 10% 10%, #60a5fa1f, #0000 60%), radial-gradient(50% 60% at 90% 20%, #8b5cf61f, #0000 60%), linear-gradient(180deg, #0a0a0f 0%, #121218 100%)" },
    { id: "cosmic-aurora", name: "Cosmic Aurora", font: "Poppins", bg: "radial-gradient(60% 80% at 20% 30%, #10b98120, #0000 60%), radial-gradient(50% 60% at 80% 10%, #06b6d420, #0000 60%), linear-gradient(180deg, #0f172a 0%, #1e293b 100%)" },
    { id: "sunset-horizon", name: "Sunset Horizon", font: "Roboto", bg: "radial-gradient(60% 80% at 10% 70%, #f9731620, #0000 60%), radial-gradient(50% 60% at 90% 30%, #ec489920, #0000 60%), linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)" },
    { id: "forest-depths", name: "Forest Depths", font: "System", bg: "radial-gradient(60% 80% at 30% 20%, #059f4620, #0000 60%), radial-gradient(50% 60% at 70% 80%, #047c3a20, #0000 60%), linear-gradient(180deg, #0f1419 0%, #1a2332 100%)" },
    { id: "minimal-dark", name: "Minimal Dark", font: "Inter", bg: "linear-gradient(135deg, #1f2937 0%, #111827 100%)" },
    { id: "ocean-depths", name: "Ocean Depths", font: "Poppins", bg: "radial-gradient(50% 60% at 20% 30%, #8b5cf620, #0000 70%), radial-gradient(40% 50% at 80% 20%, #a78bfa20, #0000 60%), linear-gradient(140deg, #1a0c26 0%, #3b1e29 100%)" },
    { id: "cherry-blossom", name: "Cherry Blossom", font: "Poppins", bg: "radial-gradient(60% 70% at 25% 25%, #ec489920, #0000 65%), radial-gradient(50% 60% at 75% 15%, #a855f720, #0000 70%), linear-gradient(130deg, #1f1729 0%, #2d1b3d 100%)" },
    { id: "arctic-frost", name: "Arctic Frost", font: "Inter", bg: "radial-gradient(40% 50% at 30% 20%, #14b8a615, #0000 70%), radial-gradient(60% 40% at 70% 80%, #5eead415, #0000 60%), linear-gradient(155deg, #0f1b1a 0%, #2d4a42 100%)" },
    { id: "volcanic-ember", name: "Volcanic Ember", font: "Roboto", bg: "radial-gradient(60% 80% at 30% 20%, #dc262620, #0000 60%), radial-gradient(50% 60% at 80% 40%, #ea580c20, #0000 60%), linear-gradient(140deg, #1a0f0f 0%, #2d1b1b 100%)" },
    { id: "neon-cyberpunk", name: "Neon Cyberpunk", font: "JetBrains Mono", bg: "radial-gradient(60% 50% at 30% 20%, #ec489920, #0000 65%), radial-gradient(40% 60% at 70% 80%, #06b6d420, #0000 70%), linear-gradient(135deg, #0a0a0f 0%, #2a1a2a 100%)" },
    { id: "orange-warm", name: "Orange Warm", font: "Roboto", bg: "radial-gradient(60% 80% at 20% 30%, #f9731620, #0000 60%), radial-gradient(50% 60% at 80% 10%, #ea580c20, #0000 60%), linear-gradient(180deg, #2d1b1b 0%, #451a03 100%)" },
    { id: "brown-earth", name: "Brown Earth", font: "System", bg: "radial-gradient(60% 80% at 20% 30%, #92400e20, #0000 60%), radial-gradient(50% 60% at 80% 10%, #78350f20, #0000 60%), linear-gradient(180deg, #3c2415 0%, #451a03 100%)" },
    { id: "royal-purple", name: "Royal Purple", font: "Poppins", bg: "radial-gradient(60% 80% at 20% 30%, #8b5cf620, #0000 60%), radial-gradient(50% 60% at 80% 10%, #a855f720, #0000 60%), linear-gradient(180deg, #1e1b3a 0%, #2d1b69 100%)" },
    { id: "golden-honey", name: "Golden Honey", font: "Roboto", bg: "radial-gradient(60% 80% at 20% 30%, #f59e0b20, #0000 60%), radial-gradient(50% 60% at 80% 10%, #d9770620, #0000 60%), linear-gradient(180deg, #3a2817 0%, #451a03 100%)" },
    { id: "mint-sage", name: "Mint Sage", font: "Inter", bg: "radial-gradient(60% 80% at 20% 30%, #10b98120, #0000 60%), radial-gradient(50% 60% at 80% 10%, #6ee7b720, #0000 60%), linear-gradient(180deg, #1e2e23 0%, #0f2027 100%)" },
    { id: "crimson-fire", name: "Crimson Fire", font: "Roboto", bg: "radial-gradient(60% 80% at 20% 30%, #dc262620, #0000 60%), radial-gradient(50% 60% at 80% 10%, #ef444420, #0000 60%), linear-gradient(180deg, #3c1518 0%, #220a0c 100%)" },
];

const WALLPAPERS = [
    { id: "misty-valley", name: "Misty Valley", src: "/images/wallpaper-misty-valley.jpg" },
    { id: "mountain-mirror", name: "Mountain Mirror", src: "/images/wallpaper-mountain-mirror.jpg" },
    { id: "mountain-sunset", name: "Mountain Sunset", src: "/images/wallpaper-mountain-sunset.jpg" },
];

const FAQ: { q: string; a: React.ReactNode }[] = [
    {
        q: "Does it work without the desktop app?",
        a: <p>Yes. Widgets, favorites, the activity feed, your timeline, layouts and wallpapers all work in the browser on their own. The desktop app adds running apps, app time in your timeline, and Spotlight (Alt+K) across your whole computer.</p>,
    },
    {
        q: "Which browsers does it work in?",
        a: <p>Chrome, Edge, Brave and other Chromium browsers that install from the Chrome Web Store.</p>,
    },
    {
        q: "Is it free? Do I need an account?",
        a: <p>It’s free and open source, and there’s nothing to sign in to.</p>,
    },
    {
        q: "Where does my browsing data go?",
        a: (
            <p>
                Nowhere. It stays in your browser. If you install the desktop app, the extension syncs with it on your own computer (localhost), never through a server. The <Link to="/privacy-details" className={link}>privacy policy</Link> has the details.
            </p>
        ),
    },
    {
        q: "Can I add my own widgets?",
        a: (
            <p>
                Yes. Pick from the <Link to="/widgets" className={link}>widget store</Link>, or add your own custom widget.
            </p>
        ),
    },
];

/** A page section that reports once when someone scrolls to it. */
function Part({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    const ref = useSectionView<HTMLElement>(`new_tab_${id}`, PAGE);
    return (
        <section ref={ref} id={id} aria-labelledby={`${id}-h`} data-track-area={id} className="scroll-mt-28 border-t border-white/10 py-10">
            <h2 id={`${id}-h`} className="text-2xl font-bold tracking-tight">
                {title}
            </h2>
            <div className="mt-4 space-y-4 text-[16.5px] leading-[1.7] text-white/75">{children}</div>
        </section>
    );
}

function AddToChrome({ label = "Add to Chrome, free" }: { label?: string }) {
    return (
        <a
            href={CHROME_STORE}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-5 text-[15px] font-semibold text-[#07070a] shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_8px_30px_rgba(56,189,248,0.25)] transition-transform hover:-translate-y-px"
        >
            {label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
    );
}

function LayoutPicker() {
    const [current, setCurrent] = useState(LAYOUTS[0].key);
    const layout = LAYOUTS.find((l) => l.key === current)!;
    return (
        <div className="space-y-4">
        {/* key: a fresh <img> per layout, so the old shot never lingers while the new one loads. */}
        <Shot key={layout.shot} shot={SHOTS[layout.shot]} />
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
            {LAYOUTS.map((l) => (
                <button
                    key={l.key}
                    type="button"
                    aria-pressed={current === l.key}
                    onClick={() => {
                        setCurrent(l.key);
                        trackEvent("new_tab_layout_preview", { ...PAGE, layout: l.key });
                    }}
                    className={`rounded-xl border p-2.5 text-left transition-colors ${current === l.key ? "border-sky-300/50 bg-sky-400/[0.06]" : "border-white/10 hover:border-white/25"}`}
                >
                    <svg viewBox="0 0 40 28" aria-hidden="true" className="w-full">
                        <rect x="0.5" y="0.5" width="39" height="27" rx="3" className="fill-white/[0.03] stroke-white/15" strokeWidth="0.6" />
                        {l.cells.map(([x, y, w, h], i) => (
                            <rect key={i} x={x} y={y} width={w} height={h} rx="1.5" className={i === 0 ? "fill-sky-300/50" : "fill-white/25"} />
                        ))}
                    </svg>
                    <span className="mt-2 block text-[13px] font-semibold text-white">{l.label}</span>
                </button>
            ))}
            <p className="col-span-full text-[14.5px] text-white/55">
                <span className="text-white">{layout.label}:</span> {layout.hint}.
            </p>
        </div>
        </div>
    );
}

/** A sketch of the new tab (Classic layout) over the chosen background. */
function ThemePreview({ bg, label, detail }: { bg: string; label: string; detail: string }) {
    const card = "rounded-lg border border-white/10 bg-black/30 backdrop-blur-sm";
    return (
        <div className="overflow-hidden rounded-2xl border border-white/10">
            <div className="relative aspect-[16/9] bg-cover bg-center" style={{ backgroundImage: bg }}>
                <div aria-hidden="true" className="absolute inset-0 grid grid-cols-[1fr_1.6fr] gap-[3%] p-[4%]">
                    <div className="grid grid-rows-[auto_1fr_1fr] gap-[6%]">
                        <div className={`${card} h-5 w-2/3`} />
                        <div className={card} />
                        <div className={card} />
                    </div>
                    <div className="grid grid-rows-[auto_auto_1fr] gap-[4%]">
                        <div className="flex gap-1.5">
                            {Array.from({ length: 7 }, (_, i) => (
                                <span key={i} className="h-5 w-5 rounded-md border border-white/10 bg-white/15 sm:h-6 sm:w-6" />
                            ))}
                        </div>
                        <div className={`${card} h-4 w-4/5`} />
                        <div className={card} />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-white/[0.02] px-4 py-3 text-[14px]">
                <span className="font-semibold text-white">{label}</span>
                <span className="text-white/50">{detail}</span>
            </div>
        </div>
    );
}

function ThemePicker() {
    const [current, setCurrent] = useState<string>(THEMES[0].id);
    const theme = THEMES.find((t) => t.id === current);
    const wallpaper = WALLPAPERS.find((w) => w.id === current);

    const pick = (id: string, kind: "gradient" | "wallpaper") => {
        setCurrent(id);
        trackEvent("new_tab_theme_preview", { ...PAGE, theme: id, theme_kind: kind });
    };

    const swatch = (active: boolean) =>
        `group relative aspect-[4/3] overflow-hidden rounded-xl border transition-colors ${active ? "border-sky-300/70 ring-1 ring-sky-300/50" : "border-white/10 hover:border-white/30"}`;

    return (
        <div className="grid gap-5 sm:grid-cols-[1.35fr_1fr] sm:items-start">
            <ThemePreview
                bg={wallpaper ? `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${wallpaper.src})` : theme!.bg}
                label={wallpaper ? wallpaper.name : theme!.name}
                detail={wallpaper ? "Wallpaper" : `Gradient · ${theme!.font}`}
            />

            <div className="space-y-5">
            <div>
                <p className="mb-2.5 text-[13px] font-medium text-white/50">16 gradient themes</p>
                <div className="grid grid-cols-8 gap-2 sm:grid-cols-4">
                    {THEMES.map((t) => (
                        <button key={t.id} type="button" aria-pressed={current === t.id} aria-label={t.name} title={t.name} onClick={() => pick(t.id, "gradient")} className={swatch(current === t.id)} style={{ background: t.bg }} />
                    ))}
                </div>
            </div>

            <div>
                <p className="mb-2.5 text-[13px] font-medium text-white/50">Or a wallpaper</p>
                <div className="grid grid-cols-3 gap-2">
                    {WALLPAPERS.map((w) => (
                        <button key={w.id} type="button" aria-pressed={current === w.id} onClick={() => pick(w.id, "wallpaper")} className={swatch(current === w.id)}>
                            <img src={w.src} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 pb-1 pt-4 text-left text-[11px] font-medium leading-tight text-white">{w.name}</span>
                        </button>
                    ))}
                </div>
            </div>
            </div>
        </div>
    );
}

export default function NewTabPage() {
    const heroRef = useSectionView<HTMLElement>("new_tab_hero", PAGE);
    const ctaRef = useSectionView<HTMLElement>("new_tab_close_cta", PAGE);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "New Tab by CoolDesk",
        applicationCategory: "BrowserApplication",
        operatingSystem: "Chrome, Edge, Brave",
        url: canonical,
        downloadUrl: CHROME_STORE,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    };

    return (
        <main className="min-h-screen text-white">
            <SEO
                title="CoolDesk New Tab — Widgets, Activity and Your Day in Every Tab (Free)"
                description="A free new tab extension for Chrome, Edge and Brave: widgets, favorites, an activity feed, today’s timeline, six layouts and wallpapers. No account; connects to the CoolDesk desktop app."
                canonical={canonical}
                jsonLd={jsonLd}
            />
            <Navbar />

            <div className="relative isolate">
                <SectionBackdrop glow="left-1/2 top-[200px] h-[700px] w-[1300px] -ml-[650px]" tint="rgba(56,189,248,0.12)" />

                {/* Hero */}
                <header ref={heroRef} data-track-area="hero" className="container mx-auto max-w-6xl px-6 pt-32 pb-12">
                    <nav aria-label="Breadcrumb" className="text-[13px] text-white/50">
                        <Link to="/" className="text-white/60 transition-colors hover:text-white">Home</Link>
                        {" / "}
                        <span className="text-sky-300">New tab extension</span>
                    </nav>
                    <h1 className="mt-4 max-w-3xl text-[38px] font-bold leading-[1.05] tracking-[-0.03em] md:text-6xl">Your new tab, organized.</h1>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
                        Every new tab opens on your widgets, favorite sites, what you’ve been working on and where your day went. It’s free, there’s no account, and it connects to the CoolDesk desktop app when you want more.
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                        <AddToChrome />
                        <a href="#connect" className="inline-flex min-h-12 items-center rounded-xl border border-white/20 px-5 text-[15px] font-medium transition-colors hover:bg-white/[0.04]">
                            How it connects to the app
                        </a>
                    </div>
                    <p className="mt-3 text-xs text-white/40">Also works in Edge and Brave</p>

                    <div className="mt-12 overflow-hidden rounded-3xl border border-white/[0.08] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
                        <img src="/images/full-window.jpg" alt={ALT} width={2000} height={1254} decoding="async" className="block h-auto w-full" />
                    </div>
                </header>

                <div className="container mx-auto max-w-6xl px-6 pb-24 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
                    <PageIndex items={INDEX} accent="sky" />
                    <div className="min-w-0 max-w-3xl">
                        <Part id="widgets" title="Widgets, sorted into tabs">
                            <p>Keep a clock, weather, currency converter, crypto prices, quotes and more on your new tab. Sort them into tabs like Home, Dev Tools and Productivity, and switch between them in one click.</p>
                            <p>
                                Browse them all in the <Link to="/widgets" className={link}>widget store</Link>, or add your own.
                            </p>
                        </Part>

                        <Part id="feed" title="Favorites and an activity feed">
                            <p>Your favorite sites sit in a row at the top. Below them, the activity feed shows what you’ve been doing, split into tabs:</p>
                            <dl className="overflow-hidden rounded-2xl border border-white/10">
                                {FEED_TABS.map(([tab, what]) => (
                                    <div key={tab} className="flex flex-col gap-1 border-b border-white/[0.07] px-5 py-3.5 last:border-0 sm:flex-row sm:gap-6">
                                        <dt className="shrink-0 font-semibold text-white sm:w-28">{tab}</dt>
                                        <dd className="text-[15px] text-white/70">{what}</dd>
                                    </div>
                                ))}
                            </dl>
                        </Part>

                        <Part id="today" title="Where your day went">
                            <p><strong className="text-white">Today’s timeline</strong> shows when you were active and where the time went, hour by hour. <strong className="text-white">What you worked on</strong> adds it up over the last 7, 14 or 30 days.</p>
                            <p className="text-[15px] text-white/60">On its own, the extension counts time in your browser. With the desktop app connected, your apps count too.</p>
                        </Part>

                        <Part id="tabs" title="Tabs, dev servers and running apps">
                            <p>A column on the side keeps the rest in view:</p>
                            <ul className="list-disc space-y-2 pl-6 marker:text-white/35">
                                <li><strong className="text-white">Local Dev:</strong> your localhost and LAN dev servers, pulled out of the tab pile.</li>
                                <li><strong className="text-white">Grouped by domain:</strong> all the tabs from one site in one card, opened or closed together.</li>
                                <li><strong className="text-white">Active Apps:</strong> what’s running on your computer, when the desktop app is connected.</li>
                            </ul>
                        </Part>

                        <Part id="layouts" title="Six layouts">
                            <p>Arrange the page the way you like it. Tap a layout to see it:</p>
                            <LayoutPicker />
                            <p>On Custom, every piece of the page is its own card: each widget, Favorites, the summary, the feed or a single feed tab. Drag cards anywhere, resize them, and add or remove them from a list.</p>
                            <Shot shot={SHOTS.newTabCustomize} />
                            <p>Hide the widgets, the summary or the feed, or turn them all off and keep just the background.</p>
                            <Shot shot={SHOTS.newTabZen} />
                        </Part>

                        <Part id="themes" title="Themes and wallpapers">
                            <p>Give it a gradient theme or a photo. Tap one to try it:</p>
                            <ThemePicker />
                            <ul className="list-disc space-y-2 pl-6 marker:text-white/35">
                                <li><strong className="text-white">Gradient themes:</strong> 16 of them, each paired with a font. Change the font and text size too if you like.</li>
                                <li><strong className="text-white">Wallpapers:</strong> dozens built in, any image link of your own, or search Unsplash with your own key.</li>
                                <li><strong className="text-white">Make it yours:</strong> set how strongly the wallpaper shows through, or let it rotate on its own.</li>
                            </ul>
                        </Part>

                        <Part id="connect" title="Connect it to the desktop app">
                            <p>The extension works by itself. Install the free desktop app as well and they connect on your computer:</p>
                            <ul className="grid gap-3 sm:grid-cols-3">
                                {CONNECTS.map(({ Icon, title, text }) => (
                                    <li key={title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-sky-400/10 text-sky-300">
                                            <Icon className="h-4 w-4" />
                                        </span>
                                        <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
                                        <p className="mt-1.5 text-sm leading-relaxed text-white/50">{text}</p>
                                    </li>
                                ))}
                            </ul>

                            <h3 id="sync" className="scroll-mt-28 pt-4 text-xl font-semibold text-white">Turn on Desktop Sync</h3>
                            <p>
                                <a href="/#downloads" className={link}>Get the desktop app</a> and keep it running. Desktop Sync is on by default; here’s how to check:
                            </p>
                            <ol className="list-decimal space-y-2 pl-6 marker:text-white/45">
                                <li>Open a new tab and click the gear icon (<strong className="text-white">Settings</strong>).</li>
                                <li>In <strong className="text-white">General</strong>, scroll to <strong className="text-white">Sync</strong>.</li>
                                <li>Switch on <strong className="text-white">Desktop Sync</strong>.</li>
                                <li>Check <strong className="text-white">Status</strong> shows a green dot and “App connected”. Press <strong className="text-white">Sync Now</strong> to sync straight away.</li>
                            </ol>
                            <SyncSettingsPanel pageType="new_tab" />
                            <p className="text-[15px] text-white/60">
                                Status says “App not found — is it running?” Start the desktop app, then press <strong className="text-white/80">Retry</strong>. Sync runs on your own computer (localhost, port 4545); nothing goes to a server.
                            </p>
                        </Part>

                        <Part id="faq" title="Questions">
                            <div>
                                {FAQ.map((f) => (
                                    <details
                                        key={f.q}
                                        onToggle={(e) => {
                                            if ((e.currentTarget as HTMLDetailsElement).open) trackEvent("new_tab_faq_open", { ...PAGE, question: f.q });
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
                        </Part>

                        <section ref={ctaRef} data-track-area="cta" className="relative mt-4 overflow-hidden rounded-[22px] border border-sky-300/25 bg-[#0a0d16] px-6 py-9 md:px-8">
                            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.3),transparent)]" />
                            <h2 className="relative text-[26px] font-bold">Make your next new tab useful</h2>
                            <p className="relative mt-2.5 max-w-[560px] text-[15.5px] leading-relaxed text-white/65">Free, no account, and everything stays on your device.</p>
                            <div className="relative mt-6 flex flex-wrap gap-3">
                                <AddToChrome />
                                <a href="/#downloads" className="inline-flex min-h-12 items-center rounded-xl border border-white/20 px-5 text-[15px] font-medium">
                                    Get the desktop app too →
                                </a>
                            </div>
                        </section>

                        <MoreFeatures current="/new-tab" page="new_tab" />
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
