import Footer from "@/components/new/Footer";
import Navbar from "@/components/new/Navbar";
import PageIndex, { type IndexItem } from "@/components/new/PageIndex";
import SectionBackdrop from "@/components/new/SectionBackdrop";
import SyncSettingsPanel from "@/components/new/SyncSettingsPanel";
import SEO from "@/components/SEO";
import { BREW_COMMAND, QUARANTINE_COMMAND, WINGET_COMMAND } from "@/config/install";
import { CHROME_STORE, FIREFOX_STORE, GITHUB_REPO, REDDIT_URL } from "@/config/site";
import { trackEvent, useSectionView } from "@/lib/analytics";
import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * /getting-started: the one setup page. Six steps from install to habit,
 * then shortcuts and fixes. Kept to what the app does today; check against
 * the app when a shortcut or setting moves:
 *   Alt+K           src-tauri/src/lib.rs (default, changeable in Settings)
 *   Ctrl/⌘+Shift+D  src/faces/shell/CoolDeskContainer.jsx (layouts, desktop app)
 *   Ctrl+1/2/3      src/faces/shell/WorkspaceShell.jsx (Collections, Tabs, Spaces)
 *   Desktop Sync    extension Settings → General → Sync (on by default, port 4545;
 *                   src/features/settings/SettingsModal.jsx, services/syncConfig.js)
 *   local AI        Settings → Local AI (Qwen2.5 7B, 4.7 GB)
 */

const canonical = "https://cool-desk.com/getting-started";

// Copying an install command is as good as a download click, so it's tracked the same way.
const COMMAND_NAMES: Record<string, string> = {
    [WINGET_COMMAND]: "winget_command",
    [BREW_COMMAND]: "brew_command",
    [QUARANTINE_COMMAND]: "quarantine_command",
};

function Command({ command }: { command: string }) {
    const [copied, setCopied] = useState(false);
    return (
        <div className="mt-3 flex items-start gap-3 rounded-xl border border-white/10 bg-[#0b0b14] p-3.5 pl-4">
            <pre className="min-w-0 flex-1 overflow-x-auto whitespace-pre font-mono text-[13px] leading-relaxed text-white/85">{command}</pre>
            <button
                type="button"
                onClick={() => {
                    trackEvent("download_command_copy", { action: "copy", section: "getting_started", download_target: COMMAND_NAMES[command] });
                    navigator.clipboard?.writeText(command).then(() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1500);
                    });
                }}
                className="shrink-0 rounded-lg border border-white/15 px-2.5 py-1 text-xs text-white/70 transition-colors hover:text-white"
            >
                {copied ? "Copied" : "Copy"}
            </button>
        </div>
    );
}

const Kbd = ({ children }: { children: React.ReactNode }) => (
    <kbd className="rounded-md border border-white/20 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-white">{children}</kbd>
);

function Step({ n, id, title, children }: { n: number; id: string; title: string; children: React.ReactNode }) {
    return (
        <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28 border-t border-white/10 py-10 md:grid md:grid-cols-[72px_1fr] md:gap-4">
            <span aria-hidden="true" className="font-mono text-sm text-indigo-300">
                {String(n).padStart(2, "0")}
            </span>
            <div className="mt-2 md:mt-0">
                <h2 id={`${id}-h`} className="text-2xl font-bold tracking-tight">
                    {title}
                </h2>
                <div className="mt-4 space-y-4 text-[16.5px] leading-[1.7] text-white/75">{children}</div>
            </div>
        </section>
    );
}

const link = "text-sky-300 underline decoration-sky-300/30 underline-offset-4 transition-colors hover:text-sky-200";

const SHORTCUTS: [React.ReactNode, string][] = [
    [<Kbd key="k">Alt+K</Kbd>, "Open Spotlight from anywhere (change it in Settings)"],
    [<><Kbd>Ctrl+Shift+D</Kbd> <span className="text-white/45">/</span> <Kbd>⌘+Shift+D</Kbd></>, "Switch layout: full window, side dock, bottom bar"],
    [<><Kbd>Ctrl+1</Kbd> <Kbd>Ctrl+2</Kbd> <Kbd>Ctrl+3</Kbd></>, "Collections, Tabs and Spaces in the full window"],
];

const FIXES = [
    {
        q: "macOS says CoolDesk is damaged and can’t be opened",
        a: (
            <>
                <p>The app isn’t notarized by Apple yet, so macOS flags any download from outside the App Store. Run this once in Terminal, then open CoolDesk again:</p>
                <Command command={QUARANTINE_COMMAND} />
                <p>Installing with Homebrew does this for you.</p>
            </>
        ),
    },
    {
        q: "Windows SmartScreen warns about the installer",
        a: <p>SmartScreen can warn about newer apps it hasn’t seen many installs of. Click <strong className="text-white">More info</strong>, then <strong className="text-white">Run anyway</strong>.</p>,
    },
    {
        q: "Spotlight doesn’t show my browser tabs",
        a: <p>Make sure the desktop app is running, then check <a href="#sync" className={link}>Desktop Sync</a> in the extension’s Settings: it should be on and the status should say “App connected”. If it says the app wasn’t found, press Retry, or restart the browser.</p>,
    },
    {
        q: "Alt+K does nothing",
        a: <p>Another app may already use that shortcut. Open CoolDesk’s Settings and pick a different Spotlight shortcut. If one can’t be registered, CoolDesk falls back to Alt+K.</p>,
    },
    {
        q: "How do I update?",
        a: (
            <p>
                The desktop app updates itself; the extension updates through the Chrome Web Store. See what changed in the <Link to="/releases" className="text-sky-300 underline decoration-sky-300/30 underline-offset-4 hover:text-sky-200">release notes</Link>.
            </p>
        ),
    },
];

const INDEX: IndexItem[] = [
    { id: "install", label: "Install the app", step: 1 },
    { id: "extension", label: "Add the extension", step: 2 },
    { id: "sync", label: "Turn on Desktop Sync", step: 3 },
    { id: "space", label: "Your first space", step: 4 },
    { id: "spotlight", label: "Find anything", step: 5 },
    { id: "layouts", label: "Pick a layout", step: 6 },
    { id: "shortcuts", label: "Shortcuts" },
    { id: "ai", label: "AI (optional)" },
    { id: "fixes", label: "If something’s off" },
];

export default function GettingStartedPage() {
    const ctaRef = useSectionView<HTMLElement>("guide_close_cta", { page_type: "guide" });
    const howTo = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Get started with CoolDesk",
        description: "Install CoolDesk, add the browser extension, turn on Desktop Sync, make your first space and learn the two shortcuts.",
        step: [
            { "@type": "HowToStep", name: "Install the desktop app", url: `${canonical}#install` },
            { "@type": "HowToStep", name: "Add the browser extension", url: `${canonical}#extension` },
            { "@type": "HowToStep", name: "Turn on Desktop Sync", url: `${canonical}#sync` },
            { "@type": "HowToStep", name: "Make your first space", url: `${canonical}#space` },
            { "@type": "HowToStep", name: "Find anything with Alt+K", url: `${canonical}#spotlight` },
            { "@type": "HowToStep", name: "Pick a layout", url: `${canonical}#layouts` },
        ],
    };

    return (
        <main className="min-h-screen text-white">
            <SEO
                title="Getting Started with CoolDesk — Install, Spaces and Shortcuts"
                description="Set up CoolDesk in six steps: install the app on Windows, macOS or Linux, add the browser extension, turn on Desktop Sync, make your first space, and learn Alt+K and Ctrl+Shift+D."
                canonical={canonical}
                jsonLd={howTo}
            />
            <Navbar />

            <div className="relative isolate">
                <SectionBackdrop variant="dust" />

                <div className="container mx-auto max-w-6xl px-6 pt-28 pb-24 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
                    <PageIndex items={INDEX} />
                    <div className="min-w-0 max-w-3xl">
                    <header className="pb-10">
                        <Link to="/resources" className="inline-flex min-h-11 items-center text-sm text-white/60 transition-colors hover:text-white">
                            ← Back to resources
                        </Link>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">Getting started</h1>
                        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/65">
                            Six steps, from install to habit. CoolDesk is free and needs no account.
                        </p>
                        {/* Phones: the side index becomes a row of links */}
                        <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2 lg:hidden">
                            {INDEX.map((i) => (
                                <a key={i.id} href={`#${i.id}`} className="inline-flex min-h-9 items-center rounded-full border border-white/[0.12] px-3.5 text-[13.5px] font-medium text-white/80">
                                    {i.label}
                                </a>
                            ))}
                        </nav>
                    </header>

                    <Step n={1} id="install" title="Install the desktop app">
                        <p>
                            Download it for your system from the <a href="/#downloads" className={link}>downloads section</a>, or use a package manager:
                        </p>
                        <div>
                            <p className="font-semibold text-white">Windows</p>
                            <Command command={WINGET_COMMAND} />
                        </div>
                        <div>
                            <p className="font-semibold text-white">macOS (Homebrew)</p>
                            <Command command={BREW_COMMAND} />
                            <p className="mt-3 text-[15px] text-white/60">
                                Installed from the DMG instead? macOS may say the app is damaged. <a href="#fixes" className={link}>Here’s the one-line fix.</a>
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold text-white">Linux</p>
                            <p className="mt-1">Download the AppImage, make it executable, and run it. It works on any distro.</p>
                        </div>
                    </Step>

                    <Step n={2} id="extension" title="Add the browser extension">
                        <p>
                            Get it from the <a href={CHROME_STORE} target="_blank" rel="noopener noreferrer" className={link}>Chrome Web Store</a> (works in Chrome, Edge, Brave and other Chromium browsers) or the <a href={FIREFOX_STORE} target="_blank" rel="noopener noreferrer" className={link}>Firefox add-on site</a>.
                        </p>
                        <p>Your new tab becomes a dashboard, and the desktop app can now see your open tabs, history and bookmarks. There’s nothing to sign in to.</p>
                        <p className="text-[15px] text-white/60">Only want the new tab? The extension works on its own. Spotlight, spaces and layouts need the desktop app.</p>
                    </Step>

                    <Step n={3} id="sync" title="Turn on Desktop Sync">
                        <p>Desktop Sync connects the extension to the desktop app, so Spotlight can find your tabs and your spaces stay the same in both. It’s on by default; here’s how to check:</p>
                        <ol className="list-decimal space-y-2 pl-6 marker:text-white/45">
                            <li>Open a new tab and click the gear icon (<strong className="text-white">Settings</strong>).</li>
                            <li>In <strong className="text-white">General</strong>, scroll to <strong className="text-white">Sync</strong>.</li>
                            <li>Switch on <strong className="text-white">Desktop Sync</strong>.</li>
                            <li>Check <strong className="text-white">Status</strong> shows a green dot and “App connected”. Press <strong className="text-white">Sync Now</strong> to sync straight away.</li>
                        </ol>
                        <SyncSettingsPanel />
                        <p className="text-[15px] text-white/60">
                            Status says “App not found — is it running?” Start the desktop app, then press <strong className="text-white/80">Retry</strong>. Sync runs on your own computer (localhost, port 4545); nothing goes to a server.
                        </p>
                    </Step>

                    <Step n={4} id="space" title="Make your first space">
                        <p>A space holds everything for one thing you work on: tabs, links, apps, folders, files and notes. Name it after the work, like “Acme redesign” or “Thesis”.</p>
                        <ul className="list-disc space-y-2 pl-6 marker:text-white/35">
                            <li>Create one from the Spaces view (<Kbd>Ctrl+3</Kbd>).</li>
                            <li>Add what’s already open: pick tabs from your open tabs and put them in the space.</li>
                            <li>Drag folders and files onto the space to add them.</li>
                            <li>Starting from chaos? Let the AI group your recent browsing into spaces, then tidy up.</li>
                        </ul>
                        <p>Then close tabs freely. They’re saved in the space, one click away.</p>
                    </Step>

                    <Step n={5} id="spotlight" title="Find anything with Alt+K">
                        <p>
                            Press <Kbd>Alt+K</Kbd> from anywhere and type a word. Spotlight searches your open tabs, spaces, history, bookmarks, apps, files and notes together, and jumps to a tab that’s already open instead of opening a copy.
                        </p>
                        <p className="text-[15px] text-white/60">Alt+K taken by another app? Change it in Settings.</p>
                    </Step>

                    <Step n={6} id="layouts" title="Pick a layout">
                        <p>
                            Press <Kbd>Ctrl+Shift+D</Kbd> (<Kbd>⌘+Shift+D</Kbd> on Mac) to cycle through three layouts:
                        </p>
                        <ul className="list-disc space-y-2 pl-6 marker:text-white/35">
                            <li><strong className="text-white">Full window</strong>: the complete view of your spaces.</li>
                            <li><strong className="text-white">Side dock</strong>: a slim handle on the screen edge that slides in your spaces, tabs and notes.</li>
                            <li><strong className="text-white">Bottom bar</strong>: a Mac-style dock with what’s open now, or the current space’s links, apps and files.</li>
                        </ul>
                    </Step>

                    {/* Reference */}
                    <section id="shortcuts" aria-labelledby="shortcuts-h" className="scroll-mt-28 border-t border-white/10 py-10">
                        <h2 id="shortcuts-h" className="text-2xl font-bold tracking-tight">Shortcuts</h2>
                        <dl className="mt-5 overflow-hidden rounded-2xl border border-white/10">
                            {SHORTCUTS.map(([keys, what], i) => (
                                <div key={i} className="flex flex-col gap-1.5 border-b border-white/[0.07] px-5 py-4 last:border-0 sm:flex-row sm:items-center sm:gap-6">
                                    <dt className="shrink-0 sm:w-64">{keys}</dt>
                                    <dd className="text-[15px] text-white/70">{what}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>

                    <section id="ai" aria-labelledby="ai-h" className="scroll-mt-28 border-t border-white/10 py-10">
                        <h2 id="ai-h" className="text-2xl font-bold tracking-tight">Optional: AI</h2>
                        <div className="mt-4 space-y-3 text-[16.5px] leading-[1.7] text-white/75">
                            <p>AI is optional, and CoolDesk works fully without it. When you want it:</p>
                            <ul className="list-disc space-y-2 pl-6 marker:text-white/35">
                                <li><strong className="text-white">Local model:</strong> Settings → Local AI downloads Qwen2.5 7B (4.7 GB, about 6–8 GB of RAM). It runs on your device and works offline.</li>
                                <li><strong className="text-white">Your own API key:</strong> OpenAI, Anthropic or Gemini.</li>
                                <li><strong className="text-white">Coding agents:</strong> Claude Code or OpenCode, from the terminal.</li>
                            </ul>
                        </div>
                    </section>

                    <section id="fixes" aria-labelledby="fixes-h" className="scroll-mt-28 border-t border-white/10 py-10">
                        <h2 id="fixes-h" className="text-2xl font-bold tracking-tight">If something’s off</h2>
                        <div className="mt-3">
                            {FIXES.map((f) => (
                                <details key={f.q} className="group border-b border-white/10">
                                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3.5 text-[16.5px] font-semibold [&::-webkit-details-marker]:hidden">
                                        {f.q}
                                        <span aria-hidden="true" className="shrink-0 text-[22px] font-light text-white/50 transition-transform group-open:rotate-45">+</span>
                                    </summary>
                                    <div className="space-y-3 pb-5 text-[15.5px] leading-relaxed text-white/70">{f.a}</div>
                                </details>
                            ))}
                        </div>
                        <p className="mt-6 text-[15px] text-white/60">
                            Still stuck? Ask in <a href={`${GITHUB_REPO}/discussions`} target="_blank" rel="noopener noreferrer" className={link}>GitHub Discussions</a> or on <a href={REDDIT_URL} target="_blank" rel="noopener noreferrer" className={link}>r/cooldesk</a>.
                        </p>
                    </section>

                    <section ref={ctaRef} data-track-area="cta" className="relative mt-4 overflow-hidden rounded-[22px] border border-indigo-300/25 bg-[#0a0b16] px-6 py-9 md:px-8">
                        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-[radial-gradient(closest-side,rgba(129,140,248,0.3),transparent)]" />
                        <h2 className="relative text-[26px] font-bold">Your data stays on your device</h2>
                        <p className="relative mt-2.5 max-w-[560px] text-[15.5px] leading-relaxed text-white/65">
                            Only an anonymous usage ping (you can turn it off), cloud AI with your own key, and Team sync send anything out.
                        </p>
                        <div className="relative mt-6 flex flex-wrap gap-3">
                            <a href="/#downloads" className="inline-flex min-h-12 items-center rounded-xl bg-white px-5 text-[15px] font-semibold text-[#07070a]">
                                Download free
                            </a>
                            <Link to="/under-the-hood" className="inline-flex min-h-12 items-center rounded-xl border border-white/20 px-5 text-[15px] font-medium">
                                How it works →
                            </Link>
                        </div>
                    </section>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
