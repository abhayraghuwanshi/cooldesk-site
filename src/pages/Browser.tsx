import Footer from "@/components/new/Footer";
import Navbar from "@/components/new/Navbar";
import PageIndex, { type IndexItem } from "@/components/new/PageIndex";
import SectionBackdrop from "@/components/new/SectionBackdrop";
import SEO from "@/components/SEO";
import { MoreFeatures } from "@/components/new/FeaturePage";
import Shot from "@/components/new/Shot";
import { SHOTS } from "@/config/shots";
import { trackEvent, useSectionView } from "@/lib/analytics";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * The desktop app's built-in browser (the "Browse" space).
 *
 * Shipped in 2.0.17 (feature/in-app-browser merged in #21). Screenshots come
 * from src/config/shots.ts (browser, browserCanvas, browserTools).
 *
 * Claims follow cooldesk-extension:
 *   engine, platforms, own cookie jar,   src-tauri/src/browser_pane/mod.rs
 *   no extensions
 *   ad + tracker blocking (macOS only)   src-tauri/src/browser_pane/adblock.rs
 *   page tools, site permissions         browser_pane/tools, permissions (macOS only;
 *                                        other platforms return "not available yet")
 *   streaming (Safari UA)                browser_pane safari_user_agent()
 *   tabs, canvas, side panel, shelf,     commits 1893a02, bba528e, b8659db
 *   terminal, file viewers, archives,
 *   page guard, crash recovery
 */

const canonical = "https://cool-desk.com/browser";
const PAGE = { page_type: "browser" };

const link = "text-sky-300 underline decoration-sky-300/30 underline-offset-4 transition-colors hover:text-sky-200";

const INDEX: IndexItem[] = [
    { id: "panel", label: "Side panel" },
    { id: "canvas", label: "Canvas" },
    { id: "blocking", label: "Ad blocking" },
    { id: "tools", label: "Page tools" },
    { id: "terminal", label: "Terminal" },
    { id: "files", label: "Files & archives" },
    { id: "guard", label: "Stays light" },
    { id: "honest", label: "What it isn’t" },
    { id: "faq", label: "Questions" },
];

const PANEL_TABS = [
    ["Home", "the current workspace: pinned items, notes, to-dos, open tabs, apps and running dev servers"],
    ["Tabs", "the workspace’s pinned links, plus every tab open here and in your other browser"],
    ["Files", "browse the project’s folders; files open in the main view"],
    ["Shelf", "downloads, pasted clips and dropped files, until you put them somewhere"],
    ["Notes", "the workspace’s notes, next to the page you’re reading"],
    ["Page", "tools and site settings for the page in front of you"],
];

const FILE_VIEWERS = [
    ["Markdown & HTML", "source or preview, side by side with your notes"],
    ["JSON", "a collapsible tree"],
    ["CSV / TSV", "a table"],
    ["Audio", "a player"],
    ["Archives", "zip, tar, 7z and rar: see inside, preview a file, extract here; compress any folder to .zip"],
];

const FAQ: { q: string; a: React.ReactNode }[] = [
    {
        q: "Does it replace Chrome?",
        a: <p>No, and it isn’t trying to. It’s for the pages that belong to a project: docs, dashboards, a localhost app, a video while you work. Your main browser stays where it is, and its tabs still show up in the side panel.</p>,
    },
    {
        q: "Do my Chrome extensions work in it?",
        a: <p>No. It uses your computer’s own web engine (WebKit on Mac, WebView2 on Windows), which doesn’t run browser extensions. Ad and tracker blocking is built in on Mac instead.</p>,
    },
    {
        q: "Which platforms is it on?",
        a: <p>The browser, Canvas, terminal and file viewers work on Mac, Windows and Linux. Ad blocking, the page tools and site permissions are Mac-only for now.</p>,
    },
    {
        q: "Am I signed in to my usual sites?",
        a: <p>Not at first. It keeps its own cookies, separate from Chrome or Safari, so you sign in once inside CoolDesk.</p>,
    },
    {
        q: "Is it free? Where does my data go?",
        a: (
            <p>
                It’s part of the free desktop app, with no account. Your highlights, notes and history stay on your computer. The <Link to="/privacy-details" className={link}>privacy policy</Link> has the details.
            </p>
        ),
    },
];

/** A page section that reports once when someone scrolls to it. */
function Part({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    const ref = useSectionView<HTMLElement>(`browser_${id}`, PAGE);
    return (
        <section ref={ref} id={id} aria-labelledby={`${id}-h`} data-track-area={id} className="scroll-mt-28 border-t border-white/10 py-10">
            <h2 id={`${id}-h`} className="text-2xl font-bold tracking-tight">
                {title}
            </h2>
            <div className="mt-4 space-y-4 text-[16.5px] leading-[1.7] text-white/75">{children}</div>
        </section>
    );
}

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

function Rows({ rows, width = "sm:w-28" }: { rows: string[][]; width?: string }) {
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

const MacOnly = () => <span className="ml-2 rounded-md border border-white/15 px-1.5 py-0.5 align-middle text-[12px] font-medium text-white/55">Mac</span>;

export default function BrowserPage() {
    const heroRef = useSectionView<HTMLElement>("browser_hero", PAGE);
    const ctaRef = useSectionView<HTMLElement>("browser_close_cta", PAGE);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "CoolDesk",
        applicationCategory: "BrowserApplication",
        operatingSystem: "macOS, Windows, Linux",
        url: canonical,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    };

    return (
        <main className="min-h-screen text-white">
            <SEO
                title="CoolDesk Browser: A Browser Inside Your Workspace (Free)"
                description="CoolDesk’s built-in browser keeps a project’s pages next to its notes, files and terminal. Split pages on a canvas, block ads and trackers, highlight and clip pages. Free, no account."
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
                        <span className="text-sky-300">Browser</span>
                    </nav>
                    <h1 className="mt-4 max-w-3xl text-[38px] font-bold leading-[1.05] tracking-[-0.03em] md:text-6xl">A browser inside your workspace.</h1>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
                        Open a project’s docs, dashboards and localhost app right next to its notes, files and terminal. Put pages side by side, block ads, highlight what matters and clip it into your notes. It’s built into the free desktop app.
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                        <Download />
                        <a href="#honest" className="inline-flex min-h-12 items-center rounded-xl border border-white/20 px-5 text-[15px] font-medium transition-colors hover:bg-white/[0.04]">
                            What it isn’t
                        </a>
                    </div>
                    <p className="mt-3 text-xs text-white/40">Mac, Windows and Linux · no account</p>

                    <Shot shot={SHOTS.browser} priority className="mt-12" />
                </header>

                <div className="container mx-auto max-w-6xl px-6 pb-24 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
                    <PageIndex items={INDEX} accent="sky" />
                    <div className="min-w-0 max-w-3xl">
                        <Part id="panel" title="The page on the left, your project on the right">
                            <p>The main view shows only what you’re looking at: a page, a file or a terminal. The side panel is where you find things:</p>
                            <Rows rows={PANEL_TABS} />
                            <p>Pages, files and terminals share one row of tabs, with Back and Forward across all of them. The usual shortcuts work: ⌘T, ⌘L, ⌘R, ⌘F and ⌘[ / ⌘].</p>
                        </Part>

                        <Part id="canvas" title="Canvas: pages side by side">
                            <p>Put several pages on one screen as tiles on a snapping grid: the docs next to the app you’re building, a dashboard next to the ticket, a video next to your notes.</p>
                            <Shot shot={SHOTS.browserCanvas} />
                        </Part>

                        <Part id="blocking" title="Ads and trackers blocked">
                            <p>
                                Ad and tracker blocking is built in, using the EasyList and EasyPrivacy lists, with nothing to install.<MacOnly />
                            </p>
                            <p>Streaming sites work too, so a video can play beside your work. Camera and microphone are asked for per site, and you can set each site to Ask, Allow or Block, or mute it.<MacOnly /></p>
                        </Part>

                        <Part id="tools" title="Page tools">
                            <ul className="list-disc space-y-2 pl-6 marker:text-white/35">
                                <li><strong className="text-white">Highlights and notes</strong> on any page, still there next time you open it.</li>
                                <li><strong className="text-white">Clip</strong> a table, chart or block of a page into the workspace’s notes, with a link back to where it came from.</li>
                                <li><strong className="text-white">Copy as Markdown</strong>, find in page, screenshots, and dark mode for any site.</li>
                            </ul>
                            <p className="text-[15px] text-white/60">Page tools are on Mac for now.<MacOnly /></p>
                            <Shot shot={SHOTS.browserTools} />
                        </Part>

                        <Part id="terminal" title="A terminal in the same window">
                            <p>Open a terminal as a tab, or pull up a drawer at the bottom with <strong className="text-white">Ctrl+`</strong>. It’s your real login shell, in your theme’s colours, and links in its output open as tabs.</p>
                            <p>
                                More on the <Link to="/shell" className={link}>built-in shell</Link>.
                            </p>
                        </Part>

                        <Part id="files" title="Files and archives, without another app">
                            <p>Files open in the main view, next to your pages:</p>
                            <Rows rows={FILE_VIEWERS} width="sm:w-36" />
                            <p>Downloads land on the Shelf, so they don’t disappear into a Downloads folder.</p>
                        </Part>

                        <Part id="guard" title="It stays light">
                            <p>Like Safari and Chrome’s memory savers, background tabs go to sleep when they’re idle, spinning the CPU or using too much memory, and wake up on the page you left. Tabs playing sound or using your camera are never put to sleep.</p>
                            <p>If a page crashes it reloads once on its own. If a page you’re looking at gets stuck using a lot of CPU, you can stop it.</p>
                        </Part>

                        <Part id="honest" title="What it isn’t">
                            <ul className="list-disc space-y-2 pl-6 marker:text-white/35">
                                <li><strong className="text-white">Not a Chrome replacement.</strong> It’s for the pages that belong to a project. Keep your main browser for everything else.</li>
                                <li><strong className="text-white">No extensions.</strong> It runs on your computer’s own web engine, which doesn’t support them.</li>
                                <li><strong className="text-white">Separate sign-ins.</strong> It has its own cookies, so you sign in to sites once inside CoolDesk.</li>
                            </ul>
                            <p>
                                Looking for a new main browser? See our honest list of <Link to="/blog/arc-browser-alternatives" className={link}>Arc alternatives</Link>.
                            </p>
                        </Part>

                        <Part id="faq" title="Questions">
                            <div>
                                {FAQ.map((f) => (
                                    <details
                                        key={f.q}
                                        onToggle={(e) => {
                                            if ((e.currentTarget as HTMLDetailsElement).open) trackEvent("browser_faq_open", { ...PAGE, question: f.q });
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
                            <h2 className="relative text-[26px] font-bold">Keep a project’s pages with the project</h2>
                            <p className="relative mt-2.5 max-w-[560px] text-[15.5px] leading-relaxed text-white/65">Free, no account, and everything stays on your device.</p>
                            <div className="relative mt-6 flex flex-wrap gap-3">
                                <Download label="Download CoolDesk" />
                            </div>
                        </section>

                        <MoreFeatures current="/browser" page="browser" />
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
