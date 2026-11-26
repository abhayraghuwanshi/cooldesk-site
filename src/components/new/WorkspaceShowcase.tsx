import { trackEvent, useSectionView } from '@/lib/analytics';
import { useEffect, useRef, useState } from 'react';
import SectionBackdrop from './SectionBackdrop';
import './workspace-showcase.css';

/**
 * Four ways into your work — one guided tour through CoolDesk's navigation
 * solutions: Spotlight (/images/spotlight.jpg), Dock (/images/dock-desktop.jpg),
 * Sidebar (/images/sidebar-desktop.jpg) and Browser (/images/browser.jpg).
 * Each tab is a real screenshot with its own points. The frame is a fixed
 * aspect ratio so switching tabs never moves the page.
 *
 * A guided tour: while the section is on screen it steps through the points,
 * then on to the next tab. Hovering or tapping a point jumps to it and pauses;
 * leaving resumes. Under prefers-reduced-motion it never advances on its own.
 *
 * Claims follow the app (cooldesk-extension): GlobalSpotlight.jsx (Alt+K search),
 * WorkspaceDockBar.jsx (bar with git branch + dev server, Ctrl+Shift+D),
 * the sidebar (links, clipboard, shell) and the browser (multi view, side panel).
 */

type Rect = [x: number, y: number, w: number, h: number];
type Point = { title: string; text: string; spot: Rect | null };

const VIEWS: { key: string; label: string; title: string; intro: string; src: string; alt: string; points: Point[] }[] = [
    {
        key: 'spotlight',
        label: 'Spotlight',
        title: 'Find anything, instantly',
        intro: 'Alt+K searches tabs, apps, files and workspaces — everything you have open or saved.',
        src: '/images/spotlight.jpg',
        alt: 'Spotlight searching “cooldesk”: a running app, two open tabs, a GitHub page from history, project folders and a downloaded file.',
        points: [
            { title: 'One box, everything', text: 'Open tabs, browsing history, apps, files and workspaces in one search.', spot: null },
            { title: 'Jump to what is open', text: 'Pick a tab and it comes forward instead of opening a copy.', spot: null },
            { title: 'Narrow it down', text: 'Start with /f, /a or /u to search only files, apps or web pages.', spot: null },
        ],
    },
    {
        key: 'dock',
        label: 'Dock',
        title: 'Your project, one click away',
        intro: 'A slim bar along the bottom of your screen with this project’s links, apps and folders.',
        src: '/images/dock-desktop.jpg',
        alt: 'CoolDesk’s dock along the bottom of the screen with a project’s links, apps, folders, a git branch and a running dev server.',
        points: [
            { title: 'The essentials, pinned', text: 'The repo, the live site, your editor and the project’s folders sit in the bar.', spot: null },
            { title: 'See what is open', text: 'A dot marks what is already running, so one click brings it forward.', spot: null },
            { title: 'Switch projects in a click', text: 'Scroll over the workspace name to step to the next project.', spot: null },
        ],
    },
    {
        key: 'sidebar',
        label: 'Sidebar',
        title: 'Always at hand, never in the way',
        intro: 'Your space on the edge of the screen, tucked away until you hover.',
        src: '/images/sidebar-desktop.jpg',
        alt: 'CoolDesk docked as a sidebar on the right of the screen with a project’s open apps, tabs, links, clipboard and shell.',
        points: [
            { title: 'Your space on the edge', text: 'Links, apps and folders for the task at hand, right where you need them.', spot: null },
            { title: 'More than links', text: 'The clipboard, shell and files live in the same panel.', spot: null },
            { title: 'One shortcut to switch layouts', text: 'Ctrl+Shift+D cycles full window, sidebar and dock.', spot: null },
        ],
    },
    {
        key: 'browser',
        label: 'Browser',
        title: 'Work on the web, in your space',
        intro: 'Pages beside your notes and files — tile them side by side.',
        src: '/images/browser.jpg',
        alt: 'CoolDesk’s browser with a page open and the side panel’s Files tab listing the project’s folders.',
        points: [
            { title: 'Pages beside your files', text: 'The side panel keeps the project’s files and notes next to the page.', spot: null },
            { title: 'Multi view', text: 'Tile two pages side by side when you need to compare them.', spot: null },
            { title: 'Page tools', text: 'Highlights, copy as Markdown, dark mode and site permissions in one place.', spot: null },
        ],
    },
];

/** How long each point stays up during the tour. */
const STEP_MS = 4500;


export default function WorkspaceShowcase() {
    const sectionRef = useSectionView<HTMLElement>('workspace_showcase');
    const [view, setView] = useState(0);
    const [step, setStep] = useState(0);
    const [paused, setPaused] = useState(false);
    const [visible, setVisible] = useState(false);
    const [calm, setCalm] = useState(true); // prerender: no tour until we know
    const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const fillRef = useRef<HTMLSpanElement | null>(null);

    const active = VIEWS[view];
    const running = visible && !paused && !calm;

    useEffect(() => {
        setCalm(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }, []);

    // Only tour while the section is on screen.
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
        io.observe(el);
        return () => io.disconnect();
    }, [sectionRef]);

    // The clock: progress bars are written directly each frame, React only
    // re-renders when the step changes.
    useEffect(() => {
        const bar = barRefs.current[step];
        const paint = (t: number) => {
            if (bar) bar.style.height = `${t * 100}%`;
            if (fillRef.current) fillRef.current.style.width = `${((step + t) / active.points.length) * 100}%`;
        };
        if (!running) {
            paint(1);
            return;
        }
        let frame = 0;
        const start = performance.now();
        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / STEP_MS);
            paint(t);
            if (t < 1) {
                frame = requestAnimationFrame(tick);
            } else if (step + 1 < active.points.length) {
                setStep(step + 1);
            } else {
                setView((view + 1) % VIEWS.length);
                setStep(0);
            }
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [running, step, view, active.points.length]);

    function pickView(i: number) {
        setView(i);
        setStep(0);
        setPaused(false);
        trackEvent('navigation_showcase_view', { view: VIEWS[i].key });
    }

    function pickPoint(j: number) {
        setStep(j);
        setPaused(true);
    }

    return (
        <section ref={sectionRef} className="relative isolate text-white">
            <SectionBackdrop glow="left-[2%] top-[280px] h-[520px] w-[760px]" />

            <div className="container mx-auto px-6">
                {/* Section header: title, then the tabs that drive everything below */}
                <div className="flex flex-col items-center text-center">
                    <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight leading-[1.05]">
                        Four ways into your work
                    </h2>
                    <p className="mt-3 max-w-2xl text-white/55 text-sm md:text-base">
                        Spotlight finds it. Dock keeps it close. Sidebar holds it. Browser opens it.
                    </p>

                    {/* Spotlight | Dock | Sidebar | Browser; the active one fills as the tour goes */}
                    <div role="tablist" aria-label="Navigation solutions" className="mt-6 inline-flex flex-wrap justify-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
                        {VIEWS.map((v, i) => (
                            <button
                                key={v.key}
                                type="button"
                                role="tab"
                                aria-selected={view === i}
                                onClick={() => pickView(i)}
                                className={`relative overflow-hidden rounded-full px-3.5 py-1 text-xs font-medium transition-colors duration-200 ${view === i ? 'bg-white/[0.12] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]' : 'text-white/50 hover:text-white/80'}`}
                            >
                                {view === i && <span ref={fillRef} className="absolute inset-y-0 left-0 bg-white/[0.07]" aria-hidden="true" />}
                                <span className="relative">{v.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-8 grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-8 lg:gap-10 items-center">
                    {/* Every view stacked, the active one in focus. Fixed frame so
                        switching never moves the page. */}
                    <div className="relative mx-auto aspect-[16/10] w-full max-w-[880px]">
                        {VIEWS.map((v, i) => {
                            const on = view === i;
                            return (
                                <div key={v.key} className={`ws-shot ${on ? 'on' : ''}`} style={{ aspectRatio: '16 / 10' }} aria-hidden={!on}>
                                    <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
                                        <img src={v.src} alt={v.alt} loading="lazy" decoding="async" className="block h-full w-full object-contain bg-[#0d1017]" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* The tab's own heading, intro and points; hover or tap one to jump to it */}
                    <div key={active.key} onMouseLeave={() => setPaused(false)} className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 duration-300">
                        <h3 className="text-xl md:text-2xl font-semibold tracking-tight">{active.title}</h3>
                        <p className="mt-2 text-white/55 text-sm md:text-base">{active.intro}</p>
                        <ul className="mt-6 space-y-4">
                            {active.points.map((p, j) => (
                                <li
                                    key={p.title}
                                    onMouseEnter={() => pickPoint(j)}
                                    onClick={() => pickPoint(j)}
                                    className={`relative cursor-default pl-4 transition-opacity duration-300 ${j === step ? 'opacity-100' : 'opacity-[0.45]'}`}
                                >
                                    <span className="absolute inset-y-0 left-0 w-px bg-white/15" aria-hidden="true" />
                                    <span
                                        ref={(el) => { barRefs.current[j] = el; }}
                                        className="absolute left-0 top-0 w-0.5 -ml-px rounded-full bg-sky-300 shadow-[0_0_10px_rgba(125,211,252,0.9)]"
                                        style={{ height: j < step ? '100%' : j === step ? undefined : 0 }}
                                        aria-hidden="true"
                                    />
                                    <h4 className="text-sm font-semibold text-white">{p.title}</h4>
                                    <p className="mt-1 text-xs text-white/50 leading-relaxed">{p.text}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
