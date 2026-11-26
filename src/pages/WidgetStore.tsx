import Footer from "@/components/new/Footer";
import Navbar from "@/components/new/Navbar";
import SEO from "@/components/SEO";
import { trackEvent, useSectionView } from "@/lib/analytics";
import { useState } from "react";

interface Widget {
    id: string;
    name: string;
    desc: string;
    category: WidgetCategory;
    /** Preview iframe height in px (width is fluid). */
    h: number;
    /** Extra sandbox tokens beyond allow-scripts + allow-same-origin. */
    sandbox?: string;
    /** True when the widget shows demo data here but gets live data over the bridge inside CoolDesk. */
    powered?: boolean;
}

type WidgetCategory = "CoolDesk" | "Time & Focus" | "Productivity" | "Data & Life" | "Dev Tools";

// Curated top-20, ordered by how often the equivalent widget ships in launchers
// and new-tab products (Momentum, Toby, Windows 11 widgets, Raycast, iOS).
const WIDGETS: Widget[] = [
    { id: "spotlight", name: "Spotlight", desc: "The CoolDesk search bar in miniature — try it on demo tabs, apps and notes.", category: "CoolDesk", h: 280, powered: true },
    { id: "workspaces", name: "Project Workspaces", desc: "Your projects with tab/app counts and last activity. One click to switch.", category: "CoolDesk", h: 280, powered: true },
    { id: "session", name: "Resume Session", desc: "Yesterday's working context — tabs, windows, apps — behind one button.", category: "CoolDesk", h: 230, powered: true },
    { id: "tab-stats", name: "Tab Pulse", desc: "Open tabs, duplicates, oldest tab and your top domains right now.", category: "CoolDesk", h: 250, powered: true },
    { id: "clock", name: "Clock", desc: "Big digital clock with date. Configurable timezone and 12/24h.", category: "Time & Focus", h: 150 },
    { id: "focus", name: "Daily Focus", desc: "One main thing per day — type it, do it, check it off. Resets each morning.", category: "Time & Focus", h: 170, sandbox: "allow-forms" },
    { id: "search", name: "Web Search", desc: "One bar for Google, DuckDuckGo, Bing, YouTube and GitHub.", category: "Productivity", h: 120, sandbox: "allow-popups allow-popups-to-escape-sandbox allow-forms" },
    { id: "todo", name: "Tasks", desc: "Quick task list — add, check off, clear. Saves locally.", category: "Productivity", h: 260, sandbox: "allow-forms" },
    { id: "weather", name: "Weather", desc: "Current conditions via Open-Meteo. Set your city with URL params.", category: "Data & Life", h: 160 },
    { id: "pomodoro", name: "Pomodoro", desc: "25/5 focus timer with sessions. Custom durations via params.", category: "Time & Focus", h: 230 },
    { id: "notes", name: "Scratchpad", desc: "A plain autosaving textarea. The simplest widget that earns its tile.", category: "Productivity", h: 240 },
    { id: "calendar", name: "Calendar", desc: "Month at a glance, Monday-start, today highlighted.", category: "Time & Focus", h: 280 },
    { id: "quick-links", name: "Quick Links", desc: "Your favorite sites as a tile grid. Add and remove inline.", category: "Productivity", h: 230, sandbox: "allow-popups allow-popups-to-escape-sandbox allow-forms" },
    { id: "world-clock", name: "World Clock", desc: "Five cities, one glance — with +1d/-1d day markers.", category: "Time & Focus", h: 210 },
    { id: "habits", name: "Habit Tracker", desc: "Weekly dot grid per habit. Tap a day to mark it done.", category: "Productivity", h: 250, sandbox: "allow-forms" },
    { id: "timer", name: "Timer & Stopwatch", desc: "Presets, custom minutes, and a stopwatch in one tile.", category: "Time & Focus", h: 250 },
    { id: "countdown", name: "Countdown", desc: "Days–hours–minutes–seconds to any date. ?to=&label=", category: "Time & Focus", h: 170 },
    { id: "quotes", name: "Quotes", desc: "A stable quote of the day; click for another.", category: "Data & Life", h: 190 },
    { id: "today", name: "Today", desc: "Weekday, date, ISO week and how much of the day is gone.", category: "Time & Focus", h: 190 },
    { id: "crypto", name: "Crypto Ticker", desc: "BTC/ETH/SOL with 24h change, via CoinGecko. Pick coins by param.", category: "Data & Life", h: 200 },
    { id: "year-progress", name: "Year Progress", desc: "The year as a progress bar. Quietly motivating.", category: "Time & Focus", h: 170 },
    { id: "currency", name: "Currency", desc: "Live conversion via ECB rates, cached for offline.", category: "Data & Life", h: 210 },
    { id: "converter", name: "Unit Converter", desc: "Length, weight, data, speed and temperature.", category: "Data & Life", h: 210 },
    { id: "github", name: "GitHub Graph", desc: "Any user's contribution graph in a tile.", category: "Data & Life", h: 190, sandbox: "allow-forms" },
    { id: "breathe", name: "Breathe", desc: "Box breathing (4-4-4-4) with a slow animated orb.", category: "Data & Life", h: 260 },
    { id: "water", name: "Water Tracker", desc: "Glasses per day with a visual fill. Resets daily. ?goal=8", category: "Data & Life", h: 200 },
    { id: "streak", name: "Streak Counter", desc: "Days since anything — a habit kept, a launch, a quit. ?since=&label=", category: "Data & Life", h: 200, sandbox: "allow-forms" },
    { id: "moon", name: "Moon Phase", desc: "Tonight's phase, illumination and days to full — computed locally.", category: "Data & Life", h: 170 },
    { id: "sun", name: "Sunrise & Sunset", desc: "Today's sun times and daylight progress, via Open-Meteo.", category: "Data & Life", h: 200 },
    { id: "on-this-day", name: "On This Day", desc: "A historical event for today's date from Wikipedia. Click for more.", category: "Data & Life", h: 210 },
    { id: "picker", name: "Decision Maker", desc: "Type options and let fate pick — plus coin flip and d6.", category: "Data & Life", h: 230, sandbox: "allow-forms" },
    { id: "password", name: "Password Generator", desc: "Strong passwords via crypto.getRandomValues. Never leaves the page.", category: "Dev Tools", h: 220 },
    { id: "palette", name: "Color Palette", desc: "Harmonized five-color palettes. Click any swatch to copy its hex.", category: "Dev Tools", h: 210 },
    { id: "json", name: "JSON Formatter", desc: "Paste, format or minify, copy. Fully local.", category: "Dev Tools", h: 320 },
    { id: "shortcuts", name: "Shortcut of the Day", desc: "One keyboard shortcut a day — VS Code, browser, Windows, CoolDesk.", category: "Productivity", h: 210 },
    { id: "snippets", name: "Snippets", desc: "Your most-pasted text, one click to copy. Email, links, kaomoji.", category: "Productivity", h: 250, sandbox: "allow-forms" },
    { id: "year-dots", name: "Year in Dots", desc: "The whole year as a dot grid — days gone, today, days left.", category: "Time & Focus", h: 180 },
    { id: "wpm", name: "Typing Sprint", desc: "A 15-second typing test with best-score memory.", category: "Dev Tools", h: 230 },
    { id: "regex", name: "Regex Tester", desc: "Live pattern matching with highlighted results. Fully local.", category: "Dev Tools", h: 300 },
];

// Keep in sync with cooldesk-extension/src/data/widgetCatalog.js WIDGET_VERSION.
const WIDGET_VERSION = "14";

// Per-card accent (?tint=), the same mechanism the app's widget board uses.
// Rotating through the brand palette gives the gallery its coloured glass look
// instead of 39 identical grey cards.
const TINTS = ["3b82f6", "6366f1", "8b5cf6", "a855f7", "0ea5e9", "d946ef"];

function widgetPath(id: string, theme: "dark" | "light", tint?: string) {
    const t = tint ? `&tint=${tint}` : "";
    return `/widgets/${id}.html?theme=${theme}${t}&v=${WIDGET_VERSION}`;
}

function widgetUrl(id: string, theme: "dark" | "light") {
    return `https://cool-desk.com${widgetPath(id, theme)}`;
}

function WidgetCard({ widget, theme, tint }: { widget: Widget; theme: "dark" | "light"; tint: string }) {
    const [copied, setCopied] = useState(false);

    const copy = () => {
        trackEvent("widget_copy_url", { widget_id: widget.id, widget_category: widget.category, theme });
        navigator.clipboard.writeText(widgetUrl(widget.id, theme)).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    };

    return (
        <div
            className="mb-5 break-inside-avoid rounded-xl border border-white/10 bg-white/[0.045] overflow-hidden transition-colors hover:border-white/25"
            style={{
                boxShadow: `0 0 0 1px #${tint}24, 0 18px 50px -28px #${tint}66`,
            }}
        >
            <iframe
                src={widgetPath(widget.id, theme, tint)}
                title={`${widget.name} widget preview`}
                loading="lazy"
                sandbox={`allow-scripts allow-same-origin ${widget.sandbox ?? ""}`}
                className="w-full block border-b border-white/10"
                style={{ height: widget.h }}
            />
            <div className="p-4">
                <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/35 mb-1.5">{widget.category}</p>
                <h3 className="text-base font-bold mb-1">{widget.name}</h3>
                {widget.powered && (
                    <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-blue-300/70 mb-1.5">
                        ⚡ live inside CoolDesk
                    </p>
                )}
                <p className="text-sm text-gray-400 leading-relaxed mb-3">{widget.desc}</p>
                <div className="flex items-center gap-2">
                    <button
                        onClick={copy}
                        className="font-mono text-[10px] tracking-[0.14em] uppercase rounded-md border border-white/15 px-3 py-1.5 hover:border-blue-400/50 transition-colors"
                    >
                        {copied ? "Copied ✓" : "Copy URL"}
                    </button>
                    <a
                        href={widgetPath(widget.id, theme)}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-track-skip
                        onClick={() => trackEvent("widget_open", { widget_id: widget.id, widget_category: widget.category, theme })}
                        className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/40 hover:text-white transition-colors px-1 py-1.5"
                    >
                        Open ↗
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function WidgetStorePage() {
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const ctaRef = useSectionView<HTMLElement>("widgets_close_cta", { page_type: "widgets" });

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "CoolDesk Widget Store",
        itemListElement: WIDGETS.map((w, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: w.name,
            url: widgetUrl(w.id, "dark"),
        })),
    };

    return (
        <main className="min-h-screen text-white scroll-smooth">
            <SEO
                title={`CoolDesk Widget Store — ${WIDGETS.length} Free New-Tab & Dashboard Widgets`}
                description="The most-used launcher and new-tab widgets — clock, daily focus, pomodoro, tasks, weather, habits, moon phase, dev tools and more. Free, embeddable, no account, theme-aware."
                canonical="https://cool-desk.com/widgets"
                jsonLd={jsonLd}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
            <Navbar />

            {/* Hero */}
            <header className="relative z-10 border-b border-white/10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px]">
                <div className="container mx-auto px-6 pt-32 pb-14 max-w-6xl">
                    <p className="font-mono text-[11px] tracking-[0.25em] text-white/35 uppercase mb-6">
                        Widget store
                    </p>
                    <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
                        Widgets,
                        <br />
                        <span className="text-white/40">ready to embed.</span>
                    </h1>
                    <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-2xl">
                        The most-used tiles from launchers and new-tab dashboards — live previews below, each one a
                        self-contained page you can drop into any iframe. Free, no account, dark and light themes,
                        configurable by URL params.
                    </p>
                </div>
            </header>

            <div className="relative z-10 container mx-auto px-6 pb-24 max-w-6xl">
                {/* Add a custom widget inside CoolDesk */}
                <section className="mt-16">
                    <p className="font-mono text-[11px] tracking-[0.25em] text-white/35 uppercase mb-3">For CoolDesk users</p>
                    <h2 className="text-2xl md:text-3xl font-bold mb-8">Add your own widget on the widget screen</h2>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-2xl mb-8">
                        Beyond the widgets below, CoolDesk lets you bring your own — no store submission,
                        no build step. It lives entirely on your device.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        {[
                            {
                                n: "01",
                                t: "Open the widget picker",
                                d: 'On your new tab, click "+ Add widget", then select the Custom category and "+ Create your own widget".',
                            },
                            {
                                n: "02",
                                t: "Describe it to an AI",
                                d: 'Click "Copy AI prompt" and paste it into any AI chat (Claude, ChatGPT, etc.), describing what the widget should show.',
                            },
                            {
                                n: "03",
                                t: "Paste the HTML back",
                                d: 'The AI replies with one HTML file. Paste it into the box — or import a saved .html file — and give it a name and tile height.',
                            },
                            {
                                n: "04",
                                t: "Save & add to board",
                                d: 'Click "Save & add to board". It shows up under Custom from then on — rename it, view its source, or delete it anytime.',
                            },
                        ].map((s) => (
                            <div key={s.n} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                                <span className="font-mono text-3xl font-bold text-white/[0.08]">{s.n}</span>
                                <h3 className="text-base font-bold mt-2 mb-2">{s.t}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{s.d}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-2xl mt-6">
                        Custom widgets are stored on your device (not synced to cool-desk.com) and can read/write their own
                        data through the same host bridge every built-in widget uses.
                    </p>
                </section>

                {/* Theme toggle */}
                <div className="flex items-center justify-between mt-10 mb-8">
                    <p className="font-mono text-[11px] tracking-[0.25em] text-white/35 uppercase">All {WIDGETS.length} widgets</p>
                    <button
                        onClick={() => {
                            const next = theme === "dark" ? "light" : "dark";
                            setTheme(next);
                            trackEvent("widget_theme_toggle", { theme: next });
                        }}
                        className="font-mono text-[11px] tracking-[0.18em] uppercase rounded-full border border-white/15 px-4 py-2 text-white/50 hover:text-white hover:border-white/40 transition-colors"
                    >
                        Preview: {theme}
                    </button>
                </div>

                {/* Google Photos-style masonry gallery on a wallpaper like the
                    app's widget board: one column on phones, up to four on wide
                    screens. Each card gets a ?tint= accent so it reads as
                    coloured glass rather than a flat grey tile. */}
                <div className="relative rounded-3xl border border-white/10 overflow-hidden p-3 sm:p-5">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -z-10"
                        style={{
                            background:
                                "radial-gradient(60% 50% at 85% 4%, rgba(56,189,248,0.34), transparent 60%), radial-gradient(55% 55% at 4% 96%, rgba(236,72,153,0.32), transparent 62%), radial-gradient(60% 60% at 50% 50%, rgba(99,102,241,0.20), transparent 68%), #0b0b12",
                        }}
                    />
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5">
                        {WIDGETS.map((w, i) => (
                            <WidgetCard key={w.id} widget={w} theme={theme} tint={TINTS[i % TINTS.length]} />
                        ))}
                    </div>
                </div>

                {/* How it works */}
                <section className="mt-24">
                    <p className="font-mono text-[11px] tracking-[0.25em] text-white/35 uppercase mb-3">For builders</p>
                    <h2 className="text-2xl md:text-3xl font-bold mb-8">How embedding works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                            {
                                n: "01",
                                t: "It's just an iframe",
                                d: "Every widget is a self-contained page. Point an iframe at it, size the tile, done. No SDK, no build step.",
                            },
                            {
                                n: "02",
                                t: "Configure with params",
                                d: "Static, non-sensitive config goes in the URL: ?theme=dark&tz=Asia/Kolkata&v=2. Params configure; they never carry data.",
                            },
                            {
                                n: "03",
                                t: "Private data over postMessage",
                                d: "Hosts hand each widget a MessageChannel port on load. Anything personal flows through that bridge — never through URLs.",
                            },
                        ].map((s) => (
                            <div key={s.n} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                                <span className="font-mono text-3xl font-bold text-white/[0.08]">{s.n}</span>
                                <h3 className="text-base font-bold mt-2 mb-2">{s.t}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{s.d}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-5 overflow-x-auto">
                        <pre className="font-mono text-xs text-gray-400 leading-relaxed">{`<iframe
  src="https://cool-desk.com/widgets/clock.html?theme=dark&v=2"
  sandbox="allow-scripts allow-same-origin"
  width="320" height="150" style="border:0;border-radius:12px">
</iframe>`}</pre>
                    </div>
                </section>

                {/* CTA */}
                <section ref={ctaRef} data-track-area="cta" className="mt-20 rounded-xl border border-white/10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:32px_32px] p-10 text-center">
                    <p className="font-mono text-[11px] tracking-[0.25em] text-white/35 uppercase mb-3">Native home</p>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">These widgets live best in CoolDesk</h2>
                    <p className="text-sm text-gray-400 mb-7 max-w-md mx-auto leading-relaxed">
                        Get them on every new tab — arranged per project, next to your tabs, apps, notes and spotlight
                        search. Free, local, no account.
                    </p>
                    <a
                        href="/#downloads"
                        className="inline-block rounded-full bg-white text-black font-semibold text-sm px-7 py-3 hover:bg-gray-200 transition-colors"
                    >
                        Get CoolDesk Free
                    </a>
                </section>
            </div>

            <Footer />
        </main>
    );
}
