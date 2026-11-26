import { FEATURES } from "@/config/features";
import { trackEvent, useSectionView } from "@/lib/analytics";
import { ArrowUpRight, LayoutGrid, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { WIDGET_VERSION } from "./WidgetDemo";

/**
 * Every feature as a bento grid, each tile a link to its page. Used on the
 * homepage (#features) and on /features.
 *
 * One system for every tile: dark card, title and a line of text top-left,
 * one soft accent glow, and a single tight crop of the real UI bleeding off
 * the bottom-right edge. Images hang from a fixed offset below the top (not
 * from the bottom), so however tall a tile gets they never cover its text. The crops live in public/images/bento/ and are cut
 * from raw window captures with scripts/shot/tile.swift: floating cards keep
 * their transparency (PNG) so they sit on the tile's glow with no box, window
 * crops are flattened onto TILE_BG (JPEG). Cut edges fade out (FADES).
 *
 * The AI tile has no capture yet; it draws the /agent flow in HTML.
 *
 * Grid: 6 columns from lg, 2 on tablets, one stack on phones (images then sit
 * under the text instead of floating).
 */

const TILE_BG = "#0d1017"; // must match the colour the bento crops were flattened onto

type Tile = {
    slug: string;
    title?: string;
    /** For tiles with no entry in config/features.ts (e.g. /widgets). */
    icon?: typeof Sparkles;
    text: string;
    span: string;
    accent: string;
    img?: { src: string; w: number; h: number; alt: string };
    /** Classes placing the image from lg up (absolute inside the tile). */
    place?: string;
    /** The crop has its own window chrome (rounded card, shadow): no frame. */
    bare?: boolean;
    /** Fade the image out where the tile cuts it: bottom, or bottom and left. */
    fade?: "b" | "bl";
    tag?: string;
    /** A live /widgets/*.html page shown inside the tile (pointer-events off). */
    demo?: { id: string; h: number; tint: string };
};

// Support tools only — the four navigation solutions (Spotlight, Dock,
// Sidebar, Browser) get their own guided section above, so they're not repeated here.
const TILES: Tile[] = [
    {
        slug: "/clipboard",
        text: "Everything you copy, one hover away.",
        span: "lg:col-span-3 lg:row-span-2",
        accent: "rgba(99,102,241,0.26)",
        img: { src: "/images/bento/clipboard.png", w: 600, h: 517, alt: "The clipboard card: filters by kind above a color, a link and a command." },
        place: "lg:absolute lg:top-24 lg:left-5 lg:right-5",
        bare: true,
    },
    {
        slug: "/spotlight#agent",
        title: "AI agent",
        text: "Ask in plain words. It proposes, you apply.",
        span: "lg:col-span-3",
        accent: "rgba(147,51,234,0.28)",
    },
    {
        slug: "/file-manager",
        text: "Folders that know their project, its commands and the projects linked to it.",
        span: "lg:col-span-3 lg:row-span-2",
        accent: "rgba(139,92,246,0.24)",
        img: { src: "/images/bento/file-manager.jpg", w: 1000, h: 760, alt: "The Files panel in the cooldesk-extension project, with linked projects along the top." },
        place: "lg:absolute lg:top-28 lg:right-0 lg:w-[76%] lg:translate-x-[6%]",
        fade: "b",
    },
    {
        slug: "/shell",
        text: "A real terminal in the sidebar and as a tab.",
        span: "lg:col-span-3 lg:row-span-2",
        accent: "rgba(99,102,241,0.22)",
        img: { src: "/images/bento/shell.png", w: 600, h: 600, alt: "The sidebar’s shell listing a project’s recent commits." },
        place: "lg:absolute lg:top-24 lg:right-0 lg:w-[62%] lg:translate-x-[4%]",
        bare: true,
        fade: "bl",
    },
    {
        slug: "/widgets",
        title: "Widgets",
        icon: LayoutGrid,
        text: "39 little tools — clock, weather, tasks, notes. Try one live:",
        span: "lg:col-span-3",
        accent: "rgba(79,70,229,0.24)",
        tag: "Widget store",
        demo: { id: "clock", h: 92, tint: "6366f1" },
    },
    {
        slug: "/new-tab",
        text: "Widgets, favorites and your activity in every browser tab. 49 layouts, sixteen themes.",
        span: "lg:col-span-6 lg:row-span-2",
        accent: "rgba(79,70,229,0.26)",
        img: { src: "/images/bento/new-tab.jpg", w: 1600, h: 1000, alt: "The new tab in the Classic layout: clock, weather, tasks and a quote beside favorites and the activity feed." },
        place: "lg:absolute lg:top-12 lg:right-0 lg:w-[64%] lg:translate-x-[3%]",
        fade: "b",
        tag: "Browser extension",
    },
];

// Soft edges where a tile crops its image, so nothing ends on a hard line.
const FADES: Record<"b" | "bl", React.CSSProperties> = {
    b: { maskImage: "linear-gradient(to bottom, #000 70%, transparent 98%)", WebkitMaskImage: "linear-gradient(to bottom, #000 70%, transparent 98%)" },
    bl: {
        maskImage: "linear-gradient(to bottom, #000 70%, transparent 98%), linear-gradient(to right, transparent, #000 14%)",
        WebkitMaskImage: "linear-gradient(to bottom, #000 70%, transparent 98%), linear-gradient(to right, transparent, #000 14%)",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
    },
};

function AgentSketch() {
    // An illustration of /agent (no capture yet): the request and its proposal.
    return (
        <div aria-hidden="true" className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3 font-mono text-[11px] leading-relaxed">
            <p>
                <span className="rounded-md bg-fuchsia-400/15 px-1.5 py-0.5 text-fuchsia-200">/agent</span>{" "}
                <span className="text-white/80">sort my open tabs</span>
            </p>
            <div className="mt-3 space-y-0.5 border-l border-white/10 pl-3">
                <p className="text-emerald-300/90">+ react.dev <span className="text-white/35">→ Frontend</span></p>
                <p className="text-emerald-300/90">+ vercel.com/docs <span className="text-white/35">→ Deploy</span></p>
                <p className="text-white/35">− 2 skipped</p>
            </div>
        </div>
    );
}

export default function FeatureBento({ page = "home" }: { page?: string }) {
    const ref = useSectionView<HTMLDivElement>("feature_bento", { page_type: page });
    const bySlug = Object.fromEntries(FEATURES.map((f) => [f.slug, f]));

    return (
        <div ref={ref} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:auto-rows-[215px] lg:grid-cols-6">
            {TILES.map((t) => {
                const isAgent = t.slug.endsWith("#agent");
                const f = bySlug[t.slug.split("#")[0]];
                const Icon = isAgent ? Sparkles : (t.icon ?? f?.Icon ?? LayoutGrid);
                return (
                    <div
                        key={t.slug}
                        style={{ backgroundColor: TILE_BG }}
                        className={`group relative isolate flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] p-5 transition-colors duration-300 hover:border-white/20 ${t.span}`}
                    >
                        {/* The whole tile is a link, laid over the content so a
                            live widget iframe can sit inside without nesting an
                            anchor around interactive content. */}
                        <Link
                            to={t.slug}
                            onClick={() => trackEvent("feature_bento_click", { page_type: page, to: t.slug })}
                            aria-label={t.title ?? f?.name}
                            className="absolute inset-0 z-20 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400/70"
                        />
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-20 -top-24 -z-10 h-64 w-64 rounded-full opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                            style={{ background: `radial-gradient(closest-side, ${t.accent}, transparent)` }}
                        />

                        <div className="relative z-10 max-w-[17rem]">
                            <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4 text-white/70" />
                                <h3 className="text-[17px] font-semibold tracking-tight text-white">{t.title ?? f?.name}</h3>
                                <ArrowUpRight className="h-4 w-4 text-white/0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/70" />
                            </div>
                            {t.tag && <p className="mt-1.5 text-[11px] font-medium uppercase tracking-widest text-white/40">{t.tag}</p>}
                            <p className="mt-1.5 text-[14px] leading-snug text-white/55">{t.text}</p>
                        </div>

                        {isAgent && <AgentSketch />}

                        {t.demo && (
                            <div
                                className="pointer-events-none relative mt-3 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]"
                                style={{ boxShadow: `0 0 0 1px #${t.demo.tint}24, 0 18px 40px -24px #${t.demo.tint}66` }}
                            >
                                <iframe
                                    src={`/widgets/${t.demo.id}.html?theme=dark&tint=${t.demo.tint}&v=${WIDGET_VERSION}`}
                                    title="Live widget preview"
                                    loading="lazy"
                                    sandbox="allow-scripts allow-same-origin"
                                    className="block w-full"
                                    style={{ height: t.demo.h }}
                                />
                            </div>
                        )}

                        {t.img && (
                            <div className={`relative mt-6 ${t.place ?? ""}`}>
                                <img
                                    style={t.fade ? FADES[t.fade] : undefined}
                                    src={t.img.src}
                                    alt={t.img.alt}
                                    width={t.img.w}
                                    height={t.img.h}
                                    loading="lazy"
                                    decoding="async"
                                    className={`block h-auto w-full transition-transform duration-500 ease-out group-hover:-translate-y-1.5 ${t.bare ? "" : "rounded-xl border border-white/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]"}`}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
