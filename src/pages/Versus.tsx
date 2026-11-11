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
                a: "Yes — CoolDesk runs on Windows, macOS and Linux, with a browser extension for Chrome, Edge, Brave and other Chromium browsers. A Firefox version is coming soon.",
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
            { feature: "Browsers", them: "Chrome, Edge, Firefox", us: "Chrome, Edge, Brave" },
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
            "You use Firefox — CoolDesk’s Firefox add-on isn’t out yet",
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
    powertoys: {
        name: "PowerToys",
        title: "CoolDesk vs PowerToys Run — An Honest Comparison",
        description:
            "PowerToys Run is Microsoft's free, open-source launcher for Windows. CoolDesk is a free launcher built around your projects, for Windows and Mac. An honest comparison.",
        intro: [
            "PowerToys Run (Alt+Space) is the launcher inside Microsoft's free PowerToys utility suite — open source, plugin-based, and genuinely fast for launching apps and finding files on Windows.",
            "CoolDesk starts from a different problem: not \"how do I launch an app fast\" but \"how do I get back to what I was doing.\" It groups tabs, apps, links and notes into project workspaces, and its browser extension makes tabs and history searchable — territory PowerToys Run doesn't cover. And it runs on macOS too, where PowerToys doesn't exist.",
            "Deciding between the two, or wondering whether PowerToys Run already covers what you need? The honest comparison below should settle it quickly.",
        ],
        greatAt: [
            "Free, open source, built and maintained by Microsoft",
            "A genuinely useful plugin ecosystem — calculator, shell commands, registry, window walker, unit converter",
            "Part of a bigger utility suite — FancyZones, PowerRename, Awake and more in one install",
            "Lightweight and fast, with no cloud dependency at all",
        ],
        differences: [
            {
                title: "It remembers your projects",
                desc: "PowerToys Run launches one thing at a time from a blank state. CoolDesk groups tabs, apps, links and notes into workspaces — switch projects and everything comes back where you left it.",
            },
            {
                title: "It searches inside your browser",
                desc: "PowerToys Run has no concept of browser tabs or history. CoolDesk's extension makes tabs, history and bookmarks first-class results across Chrome, Edge and Brave.",
            },
            {
                title: "It exists on macOS too",
                desc: "PowerToys is Windows-only, tied to the Win32 utility model. CoolDesk treats Windows and macOS as equally first-class.",
            },
            {
                title: "One thing, done well",
                desc: "PowerToys Run is one module in a suite of 10+ utilities — powerful, but general-purpose. CoolDesk is built specifically around project switching and browser-deep search.",
            },
        ],
        table: [
            { feature: "Platforms", them: "Windows only", us: "Windows + macOS" },
            { feature: "Price", them: "Free, open source", us: "Free" },
            { feature: "Setup", them: "One install (full PowerToys suite)", us: "One install" },
            { feature: "Project workspaces", them: "—", us: "Core concept" },
            { feature: "Browser tabs, history & bookmarks", them: "—", us: "Built in" },
            { feature: "Plugin ecosystem", them: "Yes — community plugins", us: "—" },
            { feature: "Other utilities bundled", them: "FancyZones, PowerRename, Awake & more", us: "—" },
            { feature: "Your data", them: "Local", us: "100% local" },
        ],
        chooseThem: [
            "You want a free, open-source Windows launcher with a strong plugin ecosystem",
            "You already use (or want) the rest of the PowerToys suite — FancyZones, PowerRename and the rest",
            "You don't need your browser tabs or multi-app projects to be searchable or grouped",
        ],
        chooseUs: [
            "You juggle several projects and want tabs, apps, links and notes to come back together, one keystroke",
            "You want your browser — tabs, history, bookmarks — searchable from the same bar",
            "You want the same launcher on macOS as well as Windows",
        ],
        faq: [
            {
                q: "Can I use CoolDesk and PowerToys together?",
                a: "Yes — they bind different hotkeys and solve different problems. Plenty of people keep PowerToys Run (and the rest of the suite) for quick launches and utilities, and use CoolDesk for project switching and browser-deep search.",
            },
            {
                q: "Is CoolDesk open source like PowerToys?",
                a: "CoolDesk isn't open source the way PowerToys is, but it shares the same local-first philosophy — everything stays on your device, no account required.",
            },
            {
                q: "Does CoolDesk replace the rest of the PowerToys suite?",
                a: "No — FancyZones, PowerRename and PowerToys' other utilities do jobs CoolDesk doesn't touch. CoolDesk specifically replaces the \"find and launch\" half (PowerToys Run) and adds project workspaces and browser search on top.",
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
    "flow-launcher": {
        name: "Flow Launcher",
        title: "CoolDesk vs Flow Launcher — An Honest Comparison",
        description:
            "Flow Launcher is a fast, free, open-source launcher for Windows. CoolDesk is a free launcher built around your projects, with browser tabs as first-class results. An honest comparison.",
        intro: [
            "Flow Launcher is one of the best things to happen to Windows power users: a free, open-source Alt+Space launcher that finds apps and files instantly and grows with plugins.",
            "CoolDesk shares the keyboard-first idea but adds memory. It knows which tabs, apps, notes and files belong to which project, so a search can bring a whole project back — not just one app.",
            "Looking for a Flow Launcher alternative, or wondering whether to run both? The comparison below keeps it short and honest.",
        ],
        greatAt: [
            "Fast, lightweight and fully open source",
            "A large plugin library — calculators, web searches, system commands and more",
            "Lightning-fast file search through its Everything integration",
            "Deep customisation: themes, hotkeys, and plugins in several languages",
        ],
        differences: [
            {
                title: "It remembers your projects",
                desc: "Flow Launcher is stateless — every search starts fresh. CoolDesk groups tabs, apps, links and notes into project workspaces, so switching projects brings everything back where you left it.",
            },
            {
                title: "Your browser is inside the search",
                desc: "CoolDesk's extension makes open tabs, history and bookmarks first-class results across Chrome, Edge and Brave, and jumps to the exact tab instead of opening a duplicate.",
            },
            {
                title: "Windows, macOS and Linux",
                desc: "Flow Launcher is Windows-only. CoolDesk runs on Windows, macOS and Linux, so the same habit works on every machine you use.",
            },
            {
                title: "Ways to keep a project in view",
                desc: "Beyond the search bar, CoolDesk shows a project as a sidebar, a dock at the screen edge or a full-screen workspace with notes and todos.",
            },
        ],
        table: [
            { feature: "Platforms", them: "Windows", us: "Windows, macOS, Linux" },
            { feature: "Price", them: "Free, open source", us: "Free" },
            { feature: "Project workspaces", them: "—", us: "Core concept" },
            { feature: "Open browser tabs as results", them: "Via plugins", us: "Built in, jumps to the exact tab" },
            { feature: "File search", them: "Excellent (Everything)", us: "Built in" },
            { feature: "Plugin ecosystem", them: "Large", us: "—" },
            { feature: "Notes & todos per project", them: "—", us: "Built in" },
            { feature: "Account required", them: "Never", us: "Never" },
        ],
        chooseThem: [
            "You only use Windows and want a lean, open-source launcher",
            "You rely on specific plugins, or want to write your own",
            "You mostly search apps and files, not browser tabs",
        ],
        chooseUs: [
            "You switch between several projects a day and want each one to come back complete",
            "Half your work lives in browser tabs and you want them in the same search as your apps",
            "You work across Windows and Mac (or Linux) and want one tool on all of them",
        ],
        faq: [
            {
                q: "Can I run CoolDesk and Flow Launcher together?",
                a: "Yes. Give them different hotkeys — for example Flow Launcher on Alt+Space and CoolDesk on Alt+K. Many people keep Flow for plugins and quick commands, and use CoolDesk for projects and browser tabs.",
            },
            {
                q: "Is CoolDesk open source like Flow Launcher?",
                a: "CoolDesk's source is public on GitHub under the Apache 2.0 license. It's free with no account, and everything stays on your device.",
            },
            {
                q: "Which is faster?",
                a: "Both open instantly. Flow Launcher is a little leaner because it does less; CoolDesk also indexes your tabs, workspaces and notes so it can search them together.",
            },
        ],
    },
    arc: {
        name: "Arc",
        title: "CoolDesk vs Arc Browser Spaces — An Honest Comparison",
        description:
            "Arc's Spaces made project-based browsing popular. CoolDesk brings project workspaces to the browser you already use — plus your desktop apps, files and notes. An honest comparison.",
        intro: [
            "Arc changed how many people think about a browser. Spaces, a vertical sidebar and profiles made it natural to keep work, side projects and personal browsing apart.",
            "CoolDesk takes the same idea — one space per project — and removes two limits. You don't have to switch browsers: it works with Chrome, Edge and Brave. And a project isn't only tabs: CoolDesk also holds the apps, files and notes that go with it.",
            "Arc stops working on December 22, 2026 — The Browser Company is shutting it down to focus on Dia. If you loved Arc's Spaces and want them in a browser you already use, here's the honest comparison.",
        ],
        greatAt: [
            "Beautiful design and a genuinely new take on the browser",
            "Spaces and profiles that keep contexts cleanly separated",
            "A vertical tab sidebar with pinned and auto-archiving tabs",
            "Split view, Boosts and Little Arc for quick lookups",
        ],
        differences: [
            {
                title: "Keep your browser",
                desc: "Arc's Spaces only exist inside Arc. CoolDesk is an extension plus a desktop app, so your project workspaces work in Chrome, Edge or Brave — with your existing extensions, logins and bookmarks.",
            },
            {
                title: "Projects beyond the browser",
                desc: "An Arc Space holds tabs. A CoolDesk workspace also holds the desktop apps, folders, files and notes a project needs, and opens or focuses them in one click.",
            },
            {
                title: "One search for everything",
                desc: "Press Alt+K from any app to search tabs, history, bookmarks, running apps, files and notes together — not only what's open in one browser window.",
            },
            {
                title: "Not tied to one browser",
                desc: "Arc shuts down on December 22, 2026. CoolDesk's workspaces live on your device, on top of whichever browser you use — switch browsers and your projects come with you.",
            },
        ],
        table: [
            { feature: "What it is", them: "A browser", us: "Extension + desktop app for your current browser" },
            { feature: "Works with Chrome, Edge, Brave", them: "— (replaces them)", us: "Yes" },
            { feature: "Project spaces", them: "Spaces (tabs only)", us: "Workspaces (tabs, apps, files, notes)" },
            { feature: "Desktop apps & files", them: "—", us: "Built in" },
            { feature: "System-wide search hotkey", them: "—", us: "Alt+K from any app" },
            { feature: "Platforms", them: "macOS, Windows", us: "Windows, macOS, Linux" },
            { feature: "Account required", them: "Yes", us: "Never" },
            { feature: "Price", them: "Free", us: "Free" },
        ],
        chooseThem: [
            "You want a whole new browser experience, not an add-on",
            "Split view, Boosts and Arc's design are what you love",
            "Your projects live entirely in web tabs",
        ],
        chooseUs: [
            "You want Arc-style project spaces without leaving Chrome, Edge or Brave",
            "Your projects include apps, folders and notes, not just tabs",
            "You want one hotkey that finds anything on your machine, with no account",
        ],
        faq: [
            {
                q: "Is CoolDesk a good Arc alternative?",
                a: "If what you miss is Spaces — separate, organised contexts per project — yes. CoolDesk gives you project workspaces in the browser you already use. It isn't a browser itself, so it doesn't replace Arc's sidebar or split view.",
            },
            {
                q: "When does Arc shut down?",
                a: "The Browser Company announced on October 22, 2026 that Arc for Mac and Windows stops working on December 22, 2026, and accounts are deactivated. Export your Spaces and tabs from Arc's settings (Advanced) before then.",
            },
            {
                q: "Can I move my Arc Spaces into CoolDesk?",
                a: "Export your Spaces as links from Arc's settings, open a Space's tabs in Chrome, Edge or Brave and ask CoolDesk to group them — its AI sorts open tabs into projects for you, so you don't have to rebuild each one by hand.",
            },
            {
                q: "Does CoolDesk need an account?",
                a: "No. CoolDesk is free, needs no sign-in, and keeps everything on your device.",
            },
        ],
    },
    onetab: {
        name: "OneTab",
        title: "CoolDesk vs OneTab — An Honest Comparison",
        description:
            "OneTab collapses your tabs into a list to save memory. CoolDesk organises them into project workspaces you can search and reopen — along with your apps and notes. An honest comparison.",
        intro: [
            "OneTab does one thing and does it well: one click turns a window full of tabs into a tidy list, freeing memory and clearing your head.",
            "CoolDesk solves the next problem — finding and reusing those tabs later. Instead of one long list, your tabs are grouped by project, searchable with Alt+K, and reopen together with the apps and notes that belong to the same work.",
            "If your OneTab list has grown into hundreds of forgotten links, this comparison is for you.",
        ],
        greatAt: [
            "One click to collapse every tab and free up memory",
            "Dead simple — nothing to learn",
            "Share a tab list as a web page",
            "Works in Chrome, Edge and Firefox",
        ],
        differences: [
            {
                title: "Organised by project, not by date",
                desc: "OneTab saves tabs in the order you dumped them. CoolDesk groups them into projects — and its AI can do the sorting for you — so a year of saved tabs stays usable.",
            },
            {
                title: "Searchable in one keystroke",
                desc: "Press Alt+K to find any saved or open tab, plus your history, bookmarks, notes and apps, instead of scrolling a long list.",
            },
            {
                title: "Reopen the whole context",
                desc: "Open a project and its tabs come back with the desktop apps, files and notes that go with it.",
            },
            {
                title: "Also free and local",
                desc: "Like OneTab, CoolDesk is free and keeps your data on your device. Sharing a workspace as a link is end-to-end encrypted.",
            },
        ],
        table: [
            { feature: "Core idea", them: "Collapse tabs into a list", us: "Project workspaces you search and reopen" },
            { feature: "Organisation", them: "By save date", us: "By project, AI-assisted" },
            { feature: "Search saved tabs", them: "Browser find on the list", us: "Alt+K across tabs, history, notes & apps" },
            { feature: "Desktop apps & notes", them: "—", us: "Built in" },
            { feature: "Frees tab memory", them: "Yes, core feature", us: "Close a project's tabs and reopen them later" },
            { feature: "Browsers", them: "Chrome, Edge, Firefox", us: "Chrome, Edge, Brave" },
            { feature: "Price", them: "Free", us: "Free" },
        ],
        chooseThem: [
            "You just want to clear your tab bar and save memory in one click",
            "You use Firefox — CoolDesk’s Firefox add-on isn’t out yet",
            "You don't need tabs organised or searchable later",
        ],
        chooseUs: [
            "Your saved-tab list has become a graveyard you never go back to",
            "You want to find a saved tab in seconds, not scroll for it",
            "You want tabs grouped with the apps and notes of the same project",
        ],
        faq: [
            {
                q: "Can CoolDesk replace OneTab?",
                a: "For most people, yes: save a project's tabs, close them, and reopen them together later. If the one-click memory saver is all you use, OneTab is simpler.",
            },
            {
                q: "Can I import my OneTab list?",
                a: "Open the links from OneTab and let CoolDesk group your open tabs into projects — it sorts them automatically.",
            },
            {
                q: "Is my data private?",
                a: "Yes. CoolDesk has no account and stores everything on your device.",
            },
        ],
    },
    "session-buddy": {
        name: "Session Buddy",
        title: "CoolDesk vs Session Buddy — An Honest Comparison",
        description:
            "Session Buddy saves and restores browser sessions. CoolDesk saves whole projects — tabs, apps, files and notes — and finds any of them with one keystroke. An honest comparison.",
        intro: [
            "Session Buddy has rescued countless people from a crashed browser. It saves your open windows and tabs as sessions you can search and restore any time.",
            "CoolDesk thinks in projects instead of sessions. Rather than snapshots of whatever was open, you get a workspace per project that holds its tabs, apps, files and notes, and one search that covers all of them.",
            "If you're choosing between saving sessions and organising projects, here's the honest comparison.",
        ],
        greatAt: [
            "Reliable session saving and crash recovery",
            "Search across saved sessions",
            "Export sessions in several formats",
            "Lightweight and focused",
        ],
        differences: [
            {
                title: "Projects, not snapshots",
                desc: "A session is whatever happened to be open. A CoolDesk workspace is a project you shape over time — and its AI can group your open tabs into projects for you.",
            },
            {
                title: "More than the browser",
                desc: "CoolDesk's desktop app brings running apps, folders and files into the same workspace and the same search.",
            },
            {
                title: "Search from anywhere",
                desc: "Alt+K works from any app, not just a browser tab, and jumps to an already-open tab or window instead of opening a copy.",
            },
            {
                title: "Keep it in view",
                desc: "Show a project as a sidebar, a dock at the screen edge or full screen, with notes and todos alongside its tabs.",
            },
        ],
        table: [
            { feature: "Core idea", them: "Save & restore sessions", us: "Project workspaces" },
            { feature: "Crash recovery", them: "Core feature", us: "Reopen any saved workspace" },
            { feature: "Search", them: "Saved sessions", us: "Tabs, history, bookmarks, apps, files & notes" },
            { feature: "Desktop apps & files", them: "—", us: "Built in" },
            { feature: "Notes & todos", them: "—", us: "Per project" },
            { feature: "Account required", them: "Never", us: "Never" },
            { feature: "Price", them: "Free", us: "Free" },
        ],
        chooseThem: [
            "Crash recovery and session backups are all you need",
            "You like keeping dated snapshots of your windows",
            "You want the lightest possible tool",
        ],
        chooseUs: [
            "You want your tabs organised by project, not by when you saved them",
            "Your work spans apps and files as well as tabs",
            "You want one hotkey to find anything, from any app",
        ],
        faq: [
            {
                q: "Can I use CoolDesk and Session Buddy together?",
                a: "Yes. They don't conflict — Session Buddy as a safety net for sessions, CoolDesk for organising and switching projects.",
            },
            {
                q: "Does CoolDesk restore tabs after a crash?",
                a: "Each workspace keeps its saved tabs and links, so you reopen the whole project in one click. It isn't an automatic session snapshot tool, though.",
            },
            {
                q: "Is CoolDesk free?",
                a: "Yes — free, no account, and your data stays on your device.",
            },
        ],
    },
    "chrome-tab-groups": {
        name: "Chrome Tab Groups",
        title: "CoolDesk vs Chrome Tab Groups — An Honest Comparison",
        description:
            "Chrome's tab groups are the easy way to tidy a tab bar. CoolDesk turns groups into project workspaces with your apps, notes and one-keystroke search. An honest comparison.",
        intro: [
            "Tab groups are built into Chrome, and for good reason: name a group, give it a colour, collapse it, and your tab bar is suddenly readable.",
            "CoolDesk picks up where groups stop. Groups live in one browser window and only hold tabs. A CoolDesk workspace holds a project's tabs, apps, files and notes, and you can find any of it from anywhere with Alt+K.",
            "If your tab groups keep multiplying and you still can't find anything, the comparison below should help.",
        ],
        greatAt: [
            "Built into Chrome — nothing to install",
            "Names and colours make a busy tab bar readable",
            "Collapse a group to hide it until you need it",
            "Saved groups sync across devices through your Google account",
        ],
        differences: [
            {
                title: "Groups built for you",
                desc: "CoolDesk's AI sorts your open tabs into projects automatically, so you don't have to drag tabs into groups one by one.",
            },
            {
                title: "Beyond one browser",
                desc: "Tab groups stay inside Chrome. CoolDesk works across Chrome, Edge and Brave, and adds your desktop apps, folders and files to the same project.",
            },
            {
                title: "Search every group at once",
                desc: "Alt+K searches open tabs, history, bookmarks, notes and apps together, then jumps straight to the right tab or window.",
            },
            {
                title: "Notes and todos with the tabs",
                desc: "Each workspace keeps notes, todos and status next to its links, so the plan lives with the work.",
            },
        ],
        table: [
            { feature: "Built into the browser", them: "Yes (Chrome)", us: "Extension + optional desktop app" },
            { feature: "Grouping", them: "Manual", us: "Automatic, AI-assisted" },
            { feature: "Browsers", them: "Chrome", us: "Chrome, Edge, Brave" },
            { feature: "Desktop apps & files", them: "—", us: "Built in" },
            { feature: "Search across groups", them: "Chrome tab search", us: "Alt+K across tabs, history, notes & apps" },
            { feature: "Notes & todos", them: "—", us: "Per project" },
            { feature: "Sync", them: "Via Google account", us: "Local; share a workspace as an encrypted link" },
            { feature: "Price", them: "Free", us: "Free" },
        ],
        chooseThem: [
            "You want zero setup and nothing extra to install",
            "Your projects are only tabs, in one browser",
            "You rely on Google sync to see saved groups on every device",
        ],
        chooseUs: [
            "You have too many groups and still can't find the tab you need",
            "You'd like tabs grouped for you instead of dragging them by hand",
            "Your projects include apps, files and notes too",
        ],
        faq: [
            {
                q: "Does CoolDesk work with Chrome tab groups?",
                a: "Yes. CoolDesk runs alongside tab groups, and its spotlight understands them, so you can keep using groups inside a window and use workspaces to switch between whole projects.",
            },
            {
                q: "Is CoolDesk better than tab groups for lots of tabs?",
                a: "If you have dozens of groups, yes: automatic grouping and one search across everything scale much better than scanning a tab bar.",
            },
            {
                q: "Do I need the desktop app?",
                a: "No. The extension works on its own. The desktop app adds your desktop apps, files and the system-wide Alt+K search.",
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
