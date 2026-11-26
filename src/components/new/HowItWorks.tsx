import { CHROME_STORE, FIREFOX_STORE } from '@/config/site';
import { trackEvent, useSectionView } from '@/lib/analytics';
import { usePrefersReducedMotion } from '@/lib/motion';
import { ArrowRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import NetworkBackdrop, { type GraphScene } from './NetworkBackdrop';

/**
 * "A day with CoolDesk": the homepage walkthrough told as one working day,
 * text only. Scrolling moves the day forward: each hour's heading lights up
 * word by word as it passes through the viewport, and beside the text (large
 * screens) a pinned panel shows a clock rolling to that hour over the 3D
 * transit map acting out what the text is about.
 *
 * Headings are the same for everyone; only the example sentence changes with
 * the chosen profile. All four profiles' examples are in the HTML (inactive
 * ones `hidden`) so search engines read every version.
 *
 * Copy must match the app: Alt+K Spotlight over tabs/apps/history/files,
 * folder chips with branch and dev-server state, the side dock and bottom bar.
 * There is no one-click "restore everything" — don't imply it.
 *
 * Motion rules: opacity and transform only, one easing, plays with scroll,
 * nothing loops. With reduced motion, text is fully shown and nothing moves.
 */

type ProfileKey = 'developer' | 'student' | 'designer' | 'freelancer';

const PROFILES: { key: ProfileKey; label: string }[] = [
    { key: 'developer', label: 'Developer' },
    { key: 'student', label: 'Student' },
    { key: 'designer', label: 'Designer' },
    { key: 'freelancer', label: 'Freelancer' },
];

type Hour = {
    time: string;
    title: string;
    sub: string;
    examples: Record<ProfileKey, string>;
    cta?: boolean;
};

// Four hours, no more: the problem, the idea, the payoff, the close.
// Layouts (sidebar / dock) are shown in the section right after this one.
const HOURS: Hour[] = [
    {
        time: '08:05',
        title: 'Yesterday is still open.',
        sub: 'Too many tabs, windows everywhere, and no idea where you left off.',
        examples: {
            developer: 'Forty tabs: PR #142, Grafana, three Stack Overflow answers and the API docs, somewhere.',
            student: 'Thirty-eight tabs: lecture slides, four PDFs, the course forum and a paper you half read.',
            designer: 'The Figma file, two moodboards, the client’s feedback doc and thirty reference tabs.',
            freelancer: 'Three clients’ docs, two Slack workspaces and an invoice you forgot to send.',
        },
    },
    {
        time: '09:00',
        title: 'Everything for one thing, in one place.',
        sub: 'Tabs, apps, files and notes, together in a space for each project. Setting one up takes two minutes.',
        examples: {
            developer: 'billing-service holds VS Code, the Linear ticket, PR #142 and the repo, which shows your branch and whether the dev server is running.',
            student: 'Thesis holds your PDFs, Zotero, the course page and your notes, side by side.',
            designer: 'Acme redesign holds the Figma file, the brand folder, the moodboard and the client’s feedback.',
            freelancer: 'Client: Acme holds their contract, their Slack, the shared drive and your invoices, apart from every other client.',
        },
    },
    {
        time: '10:30',
        title: 'Something urgent comes up.',
        sub: 'Search tabs, apps and files with one shortcut.',
        examples: {
            developer: 'Alt+K, “infra logs”, and you’re on the Grafana tab that was already open.',
            student: 'Alt+K, “attention paper”, and last week’s paper is back from your history.',
            designer: 'Alt+K, “fig”: the Figma app, today’s file and yesterday’s version, together.',
            freelancer: 'Alt+K, “acme”, and the client’s space is open before the call starts.',
        },
    },
    {
        time: '18:30',
        title: 'Wrap up. Tomorrow starts clean.',
        sub: 'Leave a note, close the tabs, keep the work. Free for Windows, macOS and Linux, no account needed.',
        examples: {
            developer: '“Fix the retry test, then update the PR.” Close everything; billing-service is one keystroke away tomorrow.',
            student: '“Compare section 3 with the 2024 survey.” Close the laptop; Thesis is one keystroke away tomorrow.',
            designer: '“Send v3 to Acme on Monday.” Close the tabs; the files stay in the space.',
            freelancer: '“Send the revised quote on Monday.” Each client’s work is already in its own space.',
        },
        cta: true,
    },
];

/**
 * What the map acts out at each hour (same order as HOURS).
 * Node keys are NetworkBackdrop's KEY_NODES: chrome, edge, brave, ext,
 * activity, local, app, spotlight, projects, files, layouts…
 */
const SCENES: GraphScene[] = [
    // 08:05 Yesterday is still open: the browsers are busy and noisy.
    {
        focus: ['chrome', 'edge', 'brave'],
        flows: [
            { from: 'chrome', to: 'ext' }, { from: 'edge', to: 'ext' }, { from: 'brave', to: 'ext' },
            { from: 'ext', to: 'activity' },
        ],
        rate: 2.2, dim: 0.6,
    },
    // 09:00 One place: tabs cross to the app and gather into the project with its files.
    {
        focus: ['projects', 'files'],
        flows: [
            { from: 'ext', to: 'local' }, { from: 'local', to: 'app' },
            { from: 'app', to: 'projects' }, { from: 'files', to: 'app' },
        ],
        rate: 1, dim: 0.45,
    },
    // 10:30 Urgent: Spotlight finds it and jumps back to the open tab.
    {
        focus: ['spotlight', 'ext'],
        flows: [
            { from: 'spotlight', to: 'app', color: 'app' }, { from: 'app', to: 'local', color: 'app' },
            { from: 'local', to: 'ext', color: 'app' },
        ],
        rate: 1.4, dim: 0.4, speed: 1.4,
    },
    // 18:30 Wrap up: the last trains settle into the project, then the map goes quiet.
    {
        focus: ['projects'],
        flows: [{ from: 'app', to: 'projects' }],
        rate: 0.25, dim: 0.25, speed: 0.6,
    },
];

const PROFILE_STORAGE_KEY = 'cooldesk_day_profile';

function readStoredProfile(): ProfileKey | null {
    try {
        const v = localStorage.getItem(PROFILE_STORAGE_KEY);
        return PROFILES.some((p) => p.key === v) ? (v as ProfileKey) : null;
    } catch {
        return null;
    }
}

// ── Pieces ─────────────────────────────────────────────────────────────────

/**
 * A heading whose words light up in order as the scroll position passes it.
 * The parent sets `--p` (0→1) on the element; each word's opacity is derived
 * from it in CSS, so a scroll frame costs one style write per heading.
 * Without JS (or with reduced motion) `--p` stays 1 and the text is fully shown.
 */
function RevealText({ text, className }: { text: string; className?: string }) {
    const words = text.split(' ');
    const n = words.length;
    return (
        <h3 data-reveal className={className} style={{ '--p': 1 } as React.CSSProperties}>
            {words.map((w, i) => (
                <span
                    key={i}
                    className="transition-opacity duration-200"
                    // Word i is fully lit once the heading is (i + 1) / n of the way through.
                    style={{ opacity: `clamp(0.15, calc(var(--p) * ${n} - ${i}), 1)` }}
                >
                    {w}
                    {i < n - 1 ? ' ' : ''}
                </span>
            ))}
        </h3>
    );
}

/** The time, with each changed digit rolling up into place. */
function Clock({ time, animate }: { time: string; animate: boolean }) {
    return (
        <span className="inline-flex font-mono tabular-nums" aria-label={time}>
            {time.split('').map((ch, i) => (
                <span key={i} className="inline-block overflow-hidden" aria-hidden="true">
                    <span
                        key={ch}
                        className={`inline-block ${animate ? 'animate-in slide-in-from-bottom-full fade-in duration-300 ease-out' : ''}`}
                    >
                        {ch}
                    </span>
                </span>
            ))}
        </span>
    );
}

// ── Section ────────────────────────────────────────────────────────────────

export default function HowItWorks() {
    const sectionRef = useSectionView<HTMLElement>('how_it_works');
    const reduced = usePrefersReducedMotion();
    const [profile, setProfile] = useState<ProfileKey>('developer');
    const [active, setActive] = useState(-1); // -1: before the first hour
    const hourRefs = useRef<(HTMLLIElement | null)[]>([]);

    useEffect(() => {
        const stored = readStoredProfile();
        if (stored) setProfile(stored);
    }, []);

    const choose = (key: ProfileKey) => {
        setProfile(key);
        try {
            localStorage.setItem(PROFILE_STORAGE_KEY, key);
        } catch {
            // Storage blocked: the choice just won't be remembered.
        }
        trackEvent('how_it_works_lifestyle', { lifestyle: key });
    };

    // One rAF-throttled scroll handler drives the word reveals and the clock.
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const headings = Array.from(section.querySelectorAll<HTMLElement>('[data-reveal]'));

        if (reduced) {
            headings.forEach((h) => h.style.setProperty('--p', '1'));
        }

        let frame = 0;
        const update = () => {
            frame = 0;
            const vh = window.innerHeight;
            if (!reduced) {
                for (const h of headings) {
                    const top = h.getBoundingClientRect().top;
                    // 0 when the heading enters the lower part of the screen, 1 by the upper middle.
                    const p = Math.min(1, Math.max(0, (vh * 0.85 - top) / (vh * 0.45)));
                    h.style.setProperty('--p', p.toFixed(3));
                }
            }
            let current = -1;
            hourRefs.current.forEach((el, i) => {
                if (el && el.getBoundingClientRect().top < vh * 0.55) current = i;
            });
            setActive((prev) => (prev === current ? prev : current));
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [reduced, sectionRef]);

    const clockTime = active < 0 ? '08:00' : HOURS[active].time;

    return (
        <section ref={sectionRef} className="relative text-white">
            <div className="container mx-auto px-6 pt-12">
                {/* Intro: centered, like the hero */}
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">A day with CoolDesk</h2>
                    <p className="mt-3 text-white/55 text-base md:text-lg">
                        Tabs, apps and files, in a space for each thing you’re working on, whatever your day looks like.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <span className="text-sm text-white/45">Whose day?</span>
                        <div role="radiogroup" aria-label="Choose a profile" className="grid grid-cols-2 w-full sm:w-auto sm:inline-flex gap-1 rounded-2xl sm:rounded-full border border-white/10 bg-white/[0.03] p-1">
                            {PROFILES.map((p) => (
                                <button
                                    key={p.key}
                                    type="button"
                                    role="radio"
                                    aria-checked={profile === p.key}
                                    onClick={() => choose(p.key)}
                                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${profile === p.key ? 'bg-white/[0.12] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]' : 'text-white/50 hover:text-white/80'}`}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* The day: hours on the left; on large screens, a pinned panel on
                    the right with the clock and the 3D map acting out each hour. */}
                <div className="mt-12 max-w-6xl mx-auto lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
                    <ol>
                        {HOURS.map((h, i) => (
                            <li
                                key={h.time}
                                ref={(el) => (hourRefs.current[i] = el)}
                                className="py-16 lg:py-0 lg:min-h-[62vh] lg:flex lg:flex-col lg:justify-center border-t border-white/[0.06] lg:border-0 first:border-t-0"
                            >
                                <span className="lg:hidden font-mono text-sm text-white/40">{h.time}</span>
                                <RevealText
                                    text={h.title}
                                    className="mt-2 lg:mt-0 font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]"
                                />
                                <p className="mt-4 text-lg text-white/60">{h.sub}</p>

                                {/* All profiles in the HTML; the visible one fades in when chosen. */}
                                {PROFILES.map((p) => (
                                    <p
                                        key={p.key}
                                        hidden={profile !== p.key}
                                        className={`mt-5 text-white/40 leading-relaxed border-l border-white/15 pl-4 ${reduced ? '' : 'animate-in fade-in duration-200'}`}
                                    >
                                        {h.examples[p.key]}
                                    </p>
                                ))}

                                {h.cta && (
                                    <div className="mt-10 flex flex-wrap gap-3">
                                        <a
                                            href="#downloads"
                                            onClick={() => trackEvent('day_cta', { target: 'download' })}
                                            className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold hover:bg-white/90 transition-colors"
                                        >
                                            Download free
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                                        </a>
                                        <a
                                            href={CHROME_STORE}
                                            onClick={() => trackEvent('day_cta', { target: 'chrome' })}
                                            className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80 hover:text-white hover:border-white/30 transition-colors"
                                        >
                                            Add to Chrome
                                        </a>
                                        <a
                                            href={FIREFOX_STORE}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => trackEvent('day_cta', { target: 'firefox' })}
                                            className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80 hover:text-white hover:border-white/30 transition-colors"
                                        >
                                            Firefox add-on
                                        </a>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ol>

                    <div className="hidden lg:block" aria-hidden="true">
                        {/* The clock sits in the empty top-centre of the map. */}
                        <div className="sticky top-[17vh] h-[66vh]">
                            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_62%,transparent_100%)]">
                                <NetworkBackdrop
                                    labels={false}
                                    clearCenter={false}
                                    fit={0.9}
                                    scene={active >= 0 ? SCENES[active] : null}
                                    className="absolute inset-0 w-full h-full"
                                />
                            </div>
                            <div className="absolute inset-x-0 top-[8%] text-center text-4xl text-white/45">
                                <Clock time={clockTime} animate={!reduced} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
