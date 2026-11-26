import Footer from "@/components/new/Footer";
import Navbar from "@/components/new/Navbar";
import SectionBackdrop from "@/components/new/SectionBackdrop";
import SEO from "@/components/SEO";
import { relatedComparisons } from "@/config/comparisonGroups";
import { useReadTracking, useSectionView } from "@/lib/analytics";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";

interface ComparisonRow {
    feature: string;
    them: string;
    us: string;
}

interface Comparison {
    name: string;
    title: string;
    description: string;
    intro: string[];
    greatAt: string[];
    differences: { title: string; desc: string }[];
    table: ComparisonRow[];
    chooseThem: string[];
    chooseUs: string[];
    faq: { q: string; a: string }[];
}

export const comparisons: Record<string, Comparison> = {
    raycast: {
        name: "Raycast",
        title: "CoolDesk vs Raycast — An Honest Comparison",
        description:
            "Raycast is a brilliant command palette. CoolDesk is a launcher built around your projects — it remembers what you're working on. An honest comparison for Windows and Mac.",
        intro: [
            "Raycast and CoolDesk are both keyboard-first launchers: press a hotkey, type a few letters, jump. The difference is what they remember.",
            "Raycast is a command palette — stateless, endlessly extensible, superb at doing things fast. CoolDesk is built around your projects: it knows what you're working on, so one keystroke can bring a whole project back — tabs, apps, notes, everything where you left it.",
            "Searching for a Raycast alternative on Windows? That gap is exactly why CoolDesk exists — the honest comparison below should tell you quickly whether it fits.",
        ],
        greatAt: [
            "A huge extension store — community plugins for almost any tool you use",
            "Clipboard history, snippets and window management built in",
            "Deep macOS polish and scriptable workflows",
            "Raycast AI and cloud sync, if you're on the Pro plan",
        ],
        differences: [
            {
                title: "It remembers your projects",
                desc: "Every Raycast search starts from zero. CoolDesk groups tabs, apps, links and notes into workspaces — switch projects and everything comes back exactly where you left it.",
            },
            {
                title: "It searches inside your browser",
                desc: "Launchers treat the browser as one opaque app. CoolDesk's extension makes your open tabs, history and bookmarks first-class search results — across Chrome, Edge and Brave.",
            },
            {
                title: "Windows and macOS on equal footing",
                desc: "Raycast grew up on macOS; its Windows version is newer and still catching up. CoolDesk treats both platforms as first-class.",
            },
            {
                title: "Free, local, no account",
                desc: "CoolDesk stores everything on your device and never asks you to sign in. AI features are optional and run locally or with your own API key.",
            },
        ],
        table: [
            { feature: "Platforms", them: "macOS (Windows is newer)", us: "Windows + macOS" },
            { feature: "Price", them: "Free core · Pro subscription for AI & sync", us: "Free" },
            { feature: "Account required", them: "For Pro, AI and sync", us: "Never" },
            { feature: "Project workspaces", them: "—", us: "Core concept" },
            { feature: "Browser tabs, history & bookmarks", them: "Limited, via extensions", us: "Built in" },
            { feature: "Clipboard history & snippets", them: "Built in", us: "Not yet" },
            { feature: "Plugin ecosystem", them: "Thousands of extensions", us: "—" },
            { feature: "Your data", them: "Local + optional cloud sync", us: "100% local" },
        ],
        chooseThem: [
            "You live on macOS and want a scriptable command palette with a plugin for everything",
            "Clipboard history, snippets and window management in one tool matter to you",
            "You're happy paying a subscription for AI and cross-device sync",
        ],
        chooseUs: [
            "You juggle several projects and lose time rebuilding your context every switch",
            "You want your browser — tabs, history, bookmarks — searchable, not just your apps",
            "You work on Windows (or Windows and Mac) and want everything free and local",
        ],
        faq: [
            {
                q: "Can I use CoolDesk and Raycast together?",
                a: "Yes — they bind different hotkeys and do different jobs. Many people keep Raycast for commands and clipboard history, and use CoolDesk for project switching and browser-deep search.",
            },
            {
                q: "Is CoolDesk really free?",
                a: "Yes. CoolDesk is free with no account and no subscription. Your data stays on your device; optional AI features run locally or with your own API key.",
            },
            {
                q: "Does CoolDesk work on Windows?",
                a: "Yes — CoolDesk runs on Windows, macOS and Linux, with a browser extension for Chrome, Edge, Brave and other Chromium browsers. A Firefox add-on is also available.",
            },
        ],
    },
    alfred: {
        name: "Alfred",
        title: "CoolDesk vs Alfred — An Honest Comparison",
        description:
            "Alfred is a Mac classic with powerful workflows. CoolDesk is a free launcher for Windows and Mac, built around your projects. An honest comparison — including when to pick Alfred.",
        intro: [
            "Alfred has been the Mac power user's launcher for over a decade — fast, private, and endlessly automatable with Powerpack workflows.",
            "CoolDesk plays the same keyboard-first game with a different core idea: it's built around your projects. It groups tabs, apps, links and notes into workspaces, so one keystroke finds anything — or brings a whole project back. And it exists on Windows, where Alfred never has.",
            "If you're hunting for an Alfred alternative that runs on Windows — or one that remembers what you're working on — the honest comparison below should tell you quickly whether CoolDesk fits.",
        ],
        greatAt: [
            "A battle-tested macOS launcher with a decade of polish",
            "Powerpack workflows — deep, scriptable automation",
            "Clipboard history, snippets and text expansion",
            "A one-time license — no subscription",
        ],
        differences: [
            {
                title: "It exists on Windows",
                desc: "Alfred is macOS-only and always has been. CoolDesk runs on Windows and macOS, so your launcher habit works on both machines.",
            },
            {
                title: "It remembers your projects",
                desc: "Alfred searches start from zero every time. CoolDesk knows what you're working on — switch projects and your tabs, apps and notes come back exactly where you left them.",
            },
            {
                title: "It searches inside your browser",
                desc: "CoolDesk's extension makes open tabs, history and bookmarks first-class results across Chrome, Edge and Brave — territory launchers can't reach.",
            },
            {
                title: "Everything is free",
                desc: "Alfred's best features need the Powerpack. CoolDesk is free — workspaces, spotlight search, AI organization — with no account and all data local.",
            },
        ],
        table: [
            { feature: "Platforms", them: "macOS only", us: "Windows + macOS" },
            { feature: "Price", them: "Free basic · Powerpack (one-time) for power features", us: "Free" },
            { feature: "Project workspaces", them: "—", us: "Core concept" },
            { feature: "Browser tabs, history & bookmarks", them: "Limited, via workflows", us: "Built in" },
            { feature: "Workflows & automation", them: "Excellent (Powerpack)", us: "—" },
            { feature: "Clipboard history & snippets", them: "Powerpack", us: "Not yet" },
            { feature: "Your data", them: "Local", us: "100% local" },
        ],
        chooseThem: [
            "You're all-in on macOS and want deep, scriptable automation with workflows",
            "Clipboard history and text expansion are part of your daily muscle memory",
            "You prefer a one-time purchase from a long-established indie developer",
        ],
        chooseUs: [
            "You work on Windows — Alfred simply isn't an option there",
            "You juggle several projects and want each one's tabs, apps and notes one keystroke away",
            "You want browser-deep search and project switching, free, with no account",
        ],
        faq: [
            {
                q: "Is there an Alfred for Windows?",
                a: "No — Alfred is macOS-only. If you're looking for an Alfred-style launcher on Windows, CoolDesk is a free option built around project workspaces, with spotlight search across your apps, files, tabs and notes.",
            },
            {
                q: "Can CoolDesk replace Alfred?",
                a: "For launching, finding and switching between projects — yes. If you rely on Alfred's Powerpack workflows, clipboard history or text expansion, keep Alfred for those; the two run happily side by side.",
            },
            {
                q: "Is CoolDesk really free?",
                a: "Yes. CoolDesk is free with no account and no subscription. Your data stays on your device; optional AI features run locally or with your own API key.",
            },
        ],
    },
    workona: {
        name: "Workona",
        title: "CoolDesk vs Workona — An Honest Comparison",
        description:
            "Workona is the standard for browser workspaces — cloud-synced and team-ready. CoolDesk is a free, local-first project workspace that reaches beyond the browser to your apps, files and notes. An honest comparison.",
        intro: [
            "Workona practically defined the browser workspace category: spaces that hold your tabs, docs and tasks, auto-saved and synced to the cloud so a project is never lost.",
            "CoolDesk starts from the same frustration — juggling client and project contexts all day — but draws the boundary differently. Your work isn't only tabs. CoolDesk groups tabs, desktop apps, links, notes and files by project, and brings the whole working context back from one place. And everything stays on your device: no account, no cloud, free.",
            "If you're weighing the two — or searching for a free, local-first Workona alternative — the honest comparison below should settle it quickly.",
        ],
        greatAt: [
            "Auto-saving spaces — close the browser and every tab is exactly where you left it",
            "Cloud sync, so your spaces follow you to any computer",
            "Team features — shared spaces, resources and tasks for collaborative work",
            "A mature, battle-tested product with years of polish and Firefox support",
        ],
        differences: [
            {
                title: "It sees your whole desktop, not just tabs",
                desc: "Workona lives inside the browser. CoolDesk's desktop app brings running apps — VS Code, Slack, Spotify — and your files into the same project workspace and the same search bar.",
            },
            {
                title: "Local-first, no account",
                desc: "Workona stores your spaces in its cloud behind a sign-in. CoolDesk keeps everything on your device — nothing to sign up for, nothing uploaded.",
            },
            {
                title: "It's a launcher too",
                desc: "One spotlight searches open tabs, history, bookmarks, notes and running apps — and jumps you between projects. Workona organizes; CoolDesk also launches.",
            },
            {
                title: "Free, not freemium",
                desc: "Workona's free plan caps how many spaces you can keep. CoolDesk's workspaces, spotlight search and AI organization are free, with no cap and no upsell.",
            },
        ],
        table: [
            { feature: "Core idea", them: "Browser workspaces (tabs, docs, tasks)", us: "Project workspaces across tabs, apps, notes & files" },
            { feature: "Browsers", them: "Chrome, Edge, Firefox", us: "Chrome, Edge, Brave, Firefox" },
            { feature: "Desktop apps & files", them: "—", us: "Searchable & launchable via desktop app" },
            { feature: "Account required", them: "Yes", us: "Never" },
            { feature: "Where your data lives", them: "Workona cloud", us: "100% local, on your device" },
            { feature: "Sync across devices", them: "Built in", us: "— (local by design)" },
            { feature: "Team collaboration", them: "Shared spaces & tasks", us: "—" },
            { feature: "Price", them: "Free (limited spaces) · paid plans", us: "Free" },
        ],
        chooseThem: [
            "Your whole workflow lives in the browser and you need it synced across several machines",
            "You collaborate in shared spaces with a team every day",
            "You want your work synced across several machines",
        ],
        chooseUs: [
            "Your projects span more than tabs — code editors, Slack, local files — and you want one place that brings all of it back",
            "You'd rather not keep your work context in someone else's cloud — no account, everything local",
            "You want project workspaces free, without a cap on how many you can keep",
        ],
        faq: [
            {
                q: "Is CoolDesk a free alternative to Workona?",
                a: "For organizing tabs, links and notes into project workspaces — yes, and it's free with no account. Be honest with yourself about the trade: CoolDesk doesn't do cloud sync or shared team spaces. If those are essential, Workona earns its subscription.",
            },
            {
                q: "Can CoolDesk bring back my project after a crash or restart?",
                a: "Yes — each workspace keeps its saved tabs and links, so you reopen the whole set in one click instead of digging through history. Because everything is stored locally, it works offline too.",
            },
            {
                q: "Which is better for switching between client projects?",
                a: "If a client means browser tabs only, both work well. If a client means tabs plus apps, files and notes, CoolDesk keeps them in one workspace and one search — that's the case it was built for.",
            },
        ],
    },
    toby: {
        name: "Toby",
        title: "CoolDesk vs Toby — An Honest Comparison",
        description:
            "Toby is a beloved visual tab organizer. CoolDesk is a free, local-first project workspace that adds desktop apps, files, notes and spotlight search. An honest comparison of the two new tabs.",
        intro: [
            "Toby turned the new tab into a visual home for your tabs: drag them into collections, reopen them anytime, share them with your team. It's simple, it's polished, and people love it.",
            "CoolDesk replaces the same new tab with a bigger idea of a project: not just tabs, but desktop apps, files, links and notes — grouped per project, searchable from one spotlight, and restored together when you switch. Everything stays local: no account, no cloud, free.",
            "Both tools want to own your new tab, so you'll end up picking one. The honest comparison below should make that choice quick.",
        ],
        greatAt: [
            "Dead-simple visual collections — drag a tab in, done",
            "Saving a whole session of open tabs into a collection in one click",
            "Team libraries: shared, curated collections of links for your whole team",
            "Years of maturity and a large community of daily users",
        ],
        differences: [
            {
                title: "Projects, not just link collections",
                desc: "Toby organizes tabs. CoolDesk workspaces hold tabs plus desktop apps, files and notes — the full working context of a client or project, not just its browser half.",
            },
            {
                title: "Search that reaches your whole machine",
                desc: "CoolDesk's spotlight searches open tabs, history, bookmarks, notes and running desktop apps — including things you never saved. Toby finds what you've filed into collections.",
            },
            {
                title: "Local-first, no sign-in",
                desc: "Toby syncs your collections through its cloud with an account. CoolDesk keeps everything on your device — nothing to create, nothing uploaded.",
            },
            {
                title: "Tab management before you save anything",
                desc: "Auto-group tabs by domain, sort them by activity, switch on focus mode — CoolDesk organizes the chaos you have now, not only the links you remember to file.",
            },
        ],
        table: [
            { feature: "Core idea", them: "Visual collections of saved tabs", us: "Project workspaces across tabs, apps, notes & files" },
            { feature: "New tab dashboard", them: "Yes", us: "Yes — workspaces, notes & search" },
            { feature: "Desktop apps & files", them: "—", us: "Searchable & launchable via desktop app" },
            { feature: "Spotlight launcher", them: "—", us: "Built in" },
            { feature: "Account required", them: "Yes (for sync)", us: "Never" },
            { feature: "Where your data lives", them: "Toby cloud", us: "100% local, on your device" },
            { feature: "Team sharing", them: "Team collections", us: "—" },
            { feature: "Price", them: "Free personal · paid team plans", us: "Free" },
        ],
        chooseThem: [
            "You want the simplest possible way to file tabs into visual collections",
            "Your team shares curated link libraries and that workflow matters to you",
            "You need your saved tabs synced across several computers",
        ],
        chooseUs: [
            "Switching projects means more than tabs — apps, files and notes should come back too",
            "You want to find things you never saved — history, running apps, any open tab — from one search bar",
            "You'd rather keep your work map on your own device, free, with no account",
        ],
        faq: [
            {
                q: "Is CoolDesk a good Toby alternative?",
                a: "If you use Toby to keep client or project tabs organized, CoolDesk covers that and adds desktop apps, files, notes and spotlight search — free, with no account. If your main use is sharing curated collections with a team, Toby still does that better.",
            },
            {
                q: "Can I use Toby and CoolDesk together?",
                a: "Not really — both replace your new tab, so in practice you choose one home base. You can keep Toby installed while you try CoolDesk, but only one of them can own the new tab page.",
            },
            {
                q: "Does CoolDesk need an account like Toby?",
                a: "No. CoolDesk works without any sign-in and stores everything locally on your device. Optional AI features run locally or with your own API key.",
            },
        ],
    },
    spotlight: {
        name: "Spotlight",
        title: "CoolDesk vs Spotlight — An Honest Comparison",
        description:
            "macOS Spotlight is built-in, fast and always there. CoolDesk is a free launcher for Windows and Mac that remembers your projects. An honest comparison — including when Spotlight is all you need.",
        intro: [
            "Spotlight (Cmd+Space) is the fastest thing on any Mac — instant, native, zero setup. Most Mac users never install anything else.",
            "CoolDesk plays a different game: it's built around your projects. Spotlight finds a file or opens an app from a blank slate every time; CoolDesk groups tabs, apps, links and notes into workspaces, so one keystroke can bring back everything you were working on — and it does the same thing on Windows, where Spotlight doesn't exist.",
            "Searching for a Spotlight alternative for Windows, or wondering whether you need more than what's already built into your Mac? The honest comparison below should make it quick.",
        ],
        greatAt: [
            "Zero install, zero setup — it's already on every Mac",
            "Instant app launch, file search, calculator and dictionary lookups",
            "Deep, private on-device indexing tuned by Apple over 15+ years",
            "Web and Siri Knowledge results for quick facts, right from the search bar",
        ],
        differences: [
            {
                title: "It remembers your projects",
                desc: "Spotlight starts from zero every time — it has no idea what you were working on yesterday. CoolDesk groups tabs, apps, links and notes into workspaces you can bring back with one keystroke.",
            },
            {
                title: "It searches inside your browser",
                desc: "Spotlight barely touches your browser — no open tabs, no real history depth. CoolDesk's extension makes tabs, history and bookmarks first-class results across Chrome, Edge and Brave.",
            },
            {
                title: "It exists on Windows too",
                desc: "Spotlight is Mac-only. If you split time between a Mac and a Windows PC — or use Windows exclusively — CoolDesk gives you the same keystroke on both.",
            },
            {
                title: "Still free, still local",
                desc: "CoolDesk matches Spotlight's biggest strength — no account, everything on-device — while adding project workspaces and browser search on top.",
            },
        ],
        table: [
            { feature: "Platforms", them: "macOS only", us: "Windows + macOS" },
            { feature: "Price", them: "Free (built-in)", us: "Free" },
            { feature: "Setup", them: "None — built in", us: "One install" },
            { feature: "Project workspaces", them: "—", us: "Core concept" },
            { feature: "Browser tabs, history & bookmarks", them: "Minimal", us: "Built in" },
            { feature: "App & file search", them: "Excellent, native", us: "Good, via OS APIs" },
            { feature: "Calculator, dictionary, unit conversion", them: "Built in", us: "Not yet" },
            { feature: "Your data", them: "Local", us: "100% local" },
        ],
        chooseThem: [
            "You're Mac-only and just need to launch apps and find files fast — no extra install",
            "You lean on Spotlight's calculator, dictionary and unit conversions throughout the day",
            "You don't juggle multiple projects with distinct sets of tabs, apps and notes",
        ],
        chooseUs: [
            "You want one keystroke to bring back a whole project — tabs, apps, notes — not just launch a single app",
            "You want your browser tabs and history searchable, not just apps and files",
            "You use Windows, or both Windows and Mac, and want the same launcher habit on each",
        ],
        faq: [
            {
                q: "Isn't Spotlight already enough for most people?",
                a: "For pure app launching and file search, often yes — it's fast and it's free. CoolDesk is worth adding when you're juggling several projects and want tabs, apps, links and notes to come back together, or when you need the same launcher on Windows.",
            },
            {
                q: "Can I use CoolDesk alongside Spotlight?",
                a: "Yes — they don't conflict. Many Mac users keep Cmd+Space for quick app launches and file search, and use CoolDesk's spotlight for project switching and browser-deep search.",
            },
            {
                q: "Is CoolDesk really free?",
                a: "Yes. CoolDesk is free with no account and no subscription. Your data stays on your device; optional AI features run locally or with your own API key.",
            },
        ],
    },
    momentum: {
        name: "Momentum",
        title: "CoolDesk vs Momentum — An Honest Comparison",
        description:
            "Momentum turns your new tab into a beautiful daily dashboard. CoolDesk turns it into a project workspace with tabs, apps, notes and spotlight search. An honest comparison.",
        intro: [
            "Momentum owns the \"beautiful new tab\" category — a stunning photo backdrop, a daily greeting, one focus for today, and a to-do list. Millions of people start their day there.",
            "CoolDesk starts from a different question: not \"how do I make my new tab calmer\" but \"how do I get back to what I was actually working on.\" It replaces the same blank tab with project workspaces — tabs, apps, links and notes grouped per project — plus a spotlight search that reaches your whole browser and desktop, not just today's to-do list.",
            "Looking for a Momentum alternative with more project structure, or wondering if Momentum's simplicity is all you need? The honest comparison below should make it quick.",
        ],
        greatAt: [
            "A genuinely beautiful, calming new tab — curated photography, daily quotes, a soft focus prompt",
            "A dead-simple daily to-do and \"main focus\" habit that keeps you centered",
            "Mac and mobile companions, so the same dashboard follows you everywhere",
            "A mature product with years of polish and a large, loyal daily-use audience",
        ],
        differences: [
            {
                title: "Projects, not just today",
                desc: "Momentum resets to a blank focus every day. CoolDesk groups tabs, apps, links and notes into workspaces you return to — a project doesn't reset, it waits exactly where you left it.",
            },
            {
                title: "It searches, not just displays",
                desc: "Momentum is a dashboard you look at. CoolDesk is also a spotlight search across open tabs, history, bookmarks, notes and running apps — press one key and jump, rather than click through a widget.",
            },
            {
                title: "Desktop apps and files too",
                desc: "Momentum lives entirely in the browser. CoolDesk's desktop app brings native apps and files into the same project and the same search bar.",
            },
            {
                title: "Free, not subscription-gated",
                desc: "Momentum's richer features — recurring to-dos, integrations, more themes — sit behind Momentum Plus. CoolDesk's workspaces, spotlight search and AI organization are free.",
            },
        ],
        table: [
            { feature: "Platforms", them: "Chrome, Firefox, Edge + Mac app", us: "Windows + macOS" },
            { feature: "Price", them: "Free · Momentum Plus subscription for more", us: "Free" },
            { feature: "Core idea", them: "A beautiful daily dashboard", us: "Project workspaces across tabs, apps, notes & files" },
            { feature: "Project workspaces", them: "—", us: "Core concept" },
            { feature: "Spotlight / launcher search", them: "—", us: "Built in" },
            { feature: "Desktop apps & files", them: "—", us: "Searchable & launchable via desktop app" },
            { feature: "To-do & daily focus", them: "Built in", us: "Notes widget (not a dedicated to-do list)" },
            { feature: "Your data", them: "Momentum cloud (for Plus sync)", us: "100% local" },
        ],
        chooseThem: [
            "You want your new tab to feel calm and beautiful more than to be a workspace",
            "A single daily to-do and \"main focus\" prompt is the habit you actually want",
            "You're happy paying for Momentum Plus for themes, integrations and cross-device sync",
        ],
        chooseUs: [
            "You juggle several projects and want each one's tabs, apps and notes to come back together",
            "You want to search — not just look at — your new tab: tabs, history, apps, notes, one bar",
            "You want it free, local, and working the same on Windows and Mac",
        ],
        faq: [
            {
                q: "Can I use CoolDesk and Momentum together?",
                a: "Not really — both replace your new tab, so you end up picking one home base. You can try CoolDesk without uninstalling Momentum first, but only one can own the new tab page at a time.",
            },
            {
                q: "Is CoolDesk as visually calm as Momentum?",
                a: "CoolDesk optimizes for a different feeling — organized rather than serene. If a photo backdrop and daily quote matter more to you than project structure, Momentum's aesthetic is hard to beat.",
            },
            {
                q: "Is CoolDesk really free?",
                a: "Yes. CoolDesk is free with no account and no subscription. Your data stays on your device; optional AI features run locally or with your own API key.",
            },
        ],
    },
};

/** A table cell; the "don't have it" dash is dimmed. */
function CellValue({ value, us }: { value: string; us?: boolean }) {
    if (value === "—") {
        return <span className="text-white/30 select-none">—</span>;
    }
    return <span className={us ? "font-medium text-white" : "text-white/75"}>{value}</span>;
}

/** One side of the decision: a heading and its numbered reasons. */
function Choose({ name, items, tone }: { name: string; items: string[]; tone: "us" | "them" }) {
    return (
        <div>
            <h2 className="mb-2.5 text-[28px] md:text-[32px] font-bold leading-tight tracking-tight">Choose {name} if</h2>
            <ol>
                {items.map((item, i) => (
                    <li key={i} className="flex items-baseline gap-4 border-b border-white/10 py-4 text-[17px] md:text-lg font-medium leading-snug">
                        <span aria-hidden="true" className={`w-7 shrink-0 font-mono text-sm ${tone === "us" ? "text-indigo-300" : "text-orange-300"}`}>
                            {String(i + 1).padStart(2, "0")}
                        </span>
                        {item}
                    </li>
                ))}
            </ol>
        </div>
    );
}

/** A folded section. Native <details>, so the text stays in the HTML for search and screen readers. */
function Fold({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <details className="group border-b border-white/10">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {title}
                <span aria-hidden="true" className="shrink-0 text-2xl font-light text-white/50 transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="pb-6">{children}</div>
        </details>
    );
}

/**
 * The decision-card layout: everything needed to choose on the first screen
 * (both "choose X if" lists side by side, then the table and Download), and
 * the longer material folded below.
 */
export default function VersusPage() {
    const { slug } = useParams<{ slug: string }>();
    const comparison = slug ? comparisons[slug] : undefined;
    const ctaRef = useSectionView<HTMLDivElement>("vs_table_cta", { page_type: "vs", slug });
    const readRef = useReadTracking<HTMLDivElement>({ page_type: "vs", slug });

    if (!comparison) {
        return <NotFound />;
    }

    const canonical = `https://cool-desk.com/vs/${slug}`;
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: comparison.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://cool-desk.com/" },
            { "@type": "ListItem", position: 2, name: "Compare", item: "https://cool-desk.com/vs" },
            { "@type": "ListItem", position: 3, name: `CoolDesk vs ${comparison.name}`, item: canonical },
        ],
    };
    const related = relatedComparisons(slug!);

    return (
        <main className="min-h-screen text-white">
            <SEO
                title={comparison.title}
                description={comparison.description}
                canonical={canonical}
                jsonLd={[faqJsonLd, breadcrumbJsonLd]}
            />
            <Navbar />

            <div className="relative isolate">
                <SectionBackdrop variant="dust" />

                <div ref={readRef} className="container mx-auto max-w-5xl px-6 pt-28 pb-24">
                    {/* Back, then the two names */}
                    <section className="flex flex-col items-start gap-5 pb-8">
                        <Link to="/resources" className="inline-flex min-h-11 items-center text-sm text-white/60 transition-colors hover:text-white">
                            ← Back to resources
                        </Link>
                        <h1 className="flex flex-wrap items-center gap-3.5 text-2xl font-bold leading-none tracking-tight">
                            <span className="inline-flex items-center gap-3">
                                <img src="/cooldesk.png" alt="" width={40} height={40} className="h-10 w-10" />
                                CoolDesk
                            </span>
                            <span className="text-lg font-normal text-white/45">vs</span>
                            <span>{comparison.name}</span>
                        </h1>
                        <p className="max-w-2xl text-[17px] leading-relaxed text-white/65">{comparison.intro[0]}</p>
                    </section>

                    {/* The decision */}
                    <section aria-label="Decision" className="flex flex-col gap-16">
                        <div className="grid gap-x-14 gap-y-11 md:grid-cols-2">
                            <Choose name="CoolDesk" items={comparison.chooseUs} tone="us" />
                            <Choose name={comparison.name} items={comparison.chooseThem} tone="them" />
                        </div>

                        <div>
                            <h2 className="mb-4 text-2xl font-bold tracking-tight">At a glance</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[560px] text-[15px] leading-snug">
                                    <thead>
                                        <tr className="border-b border-white/15 text-left text-[13px] font-semibold text-white/55">
                                            <th scope="col" className="w-[38%] pb-3 pr-3 font-semibold">Feature</th>
                                            <th scope="col" className="pb-3 pr-3 font-semibold text-orange-300">{comparison.name}</th>
                                            <th scope="col" className="pb-3 font-semibold text-indigo-300">CoolDesk</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comparison.table.map((row) => (
                                            <tr key={row.feature} className="border-b border-white/[0.06]">
                                                <th scope="row" className="py-3.5 pr-3 text-left font-normal text-white/70">{row.feature}</th>
                                                <td className="py-3.5 pr-3"><CellValue value={row.them} /></td>
                                                <td className="py-3.5"><CellValue value={row.us} us /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div ref={ctaRef} data-track-area="cta" className="flex flex-wrap items-center gap-x-4 gap-y-2.5 pt-6">
                                <a href="/#downloads" className="inline-flex min-h-[46px] items-center rounded-xl bg-white px-5 text-[15px] font-semibold text-black transition-transform hover:-translate-y-px">
                                    Download CoolDesk free
                                </a>
                                <span className="text-sm text-white/55">No account. Runs alongside {comparison.name}, nothing to migrate.</span>
                            </div>
                        </div>
                    </section>

                    {/* The longer material, folded */}
                    <section aria-label="Details" className="mt-16 border-t border-white/10">
                        <Fold title={`What ${comparison.name} is great at`}>
                            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                                {comparison.greatAt.map((item, i) => (
                                    <li key={i} className="text-[15px] leading-relaxed text-white/70">{item}</li>
                                ))}
                            </ul>
                        </Fold>
                        <Fold title="Where CoolDesk is different">
                            {comparison.intro.slice(1).map((para, i) => (
                                <p key={i} className="mb-4 max-w-3xl text-[15px] leading-relaxed text-white/65">{para}</p>
                            ))}
                            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                                {comparison.differences.map((d) => (
                                    <div key={d.title}>
                                        <h3 className="text-base font-semibold">{d.title}</h3>
                                        <p className="mt-1 text-[15px] leading-relaxed text-white/65">{d.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </Fold>
                        <Fold title="FAQ">
                            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                                {comparison.faq.map((item) => (
                                    <div key={item.q}>
                                        <h3 className="text-base font-semibold">{item.q}</h3>
                                        <p className="mt-1 text-[15px] leading-relaxed text-white/65">{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </Fold>
                    </section>

                    <p className="mt-8 text-[15px] text-white/55">
                        Also compare:
                        {related.map((s) => (
                            <Link key={s} to={`/vs/${s}`} className="ml-2.5 text-white underline-offset-4 hover:underline">
                                {comparisons[s].name}
                            </Link>
                        ))}
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    );
}
