import { Chrome, Globe, Layers, PanelBottom, PanelRight, Search } from 'lucide-react';
import { NEWTAB_URL } from '@/config/site';

/**
 * "Which one do I need?" — the ways CoolDesk's four navigation solutions pair
 * with the New Tab extension, as a full-width strip under both Downloads
 * columns. New Tab is a separate KazeKit product (newtab.kazekit.com); the
 * desktop pieces are native features of the one desktop install.
 */

type Option = {
    icon: typeof Layers;
    name: string;
    where: string;
    text: string;
    best?: boolean;
    /** Paste the install/download URL here when the standalone app ships.
     *  Empty = no link is rendered, so the card stays clean until then. */
    href: string;
    linkLabel?: string;
};

// TODO: fill in `href` for each standalone app as its installer goes live.
// Desktop-wide one is the existing download panel, but a direct URL works too.
const OPTIONS: Option[] = [
    {
        icon: Layers,
        name: 'All + New Tab',
        where: 'Recommended',
        best: true,
        text: 'The full desktop app — Spotlight, Dock, Sidebar and Browser — with New Tab connected.',
        href: '',
        linkLabel: 'Download CoolDesk',
    },
    {
        icon: PanelBottom,
        name: 'Dock + New Tab',
        where: 'Desktop + browser',
        text: 'Your project’s links and apps along the bottom of the screen, plus a new tab that opens into them.',
        href: '',
        linkLabel: 'Get Dock',
    },
    {
        icon: Globe,
        name: 'Browser (separate)',
        where: 'Separate product',
        text: 'CoolDesk Browser on its own: pages beside your files and notes, tiled side by side.',
        href: '',
        linkLabel: 'Get Browser',
    },
    {
        icon: PanelRight,
        name: 'Sidebar + New Tab',
        where: 'Desktop + browser',
        text: 'Your space on the screen edge, with the browser’s new tab plugged into the same project.',
        href: '',
        linkLabel: 'Get Sidebar',
    },
    {
        icon: Search,
        name: 'Spotlight + New Tab',
        where: 'Desktop + browser',
        text: 'Alt+K finds tabs, apps and files — New Tab keeps what’s open close when you land in the browser.',
        href: '',
        linkLabel: 'Get Spotlight',
    },
];

export default function WhichOne() {
    return (
        <div>
            <div className="px-5 py-2.5 bg-white/[0.03] border-b border-white/15 flex flex-wrap items-baseline justify-between gap-2">
                <p className="label">Which one do I need?</p>
                <a
                    href={NEWTAB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-sky-300 hover:text-sky-200 transition-colors"
                >
                    <Chrome className="w-3.5 h-3.5" strokeWidth={1.75} />
                    New Tab lives on KazeKit
                    <span aria-hidden="true">↗</span>
                </a>
            </div>

            <div className="grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
                {OPTIONS.map((o) => (
                    <div key={o.name} className={`flex items-start gap-3 px-4 py-4 transition-colors ${o.best ? 'bg-sky-400/[0.06]' : 'bg-[#0c0e14] hover:bg-[#10131a]'}`}>
                        <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${o.best ? 'bg-sky-400/10 border-sky-400/30' : 'bg-white/5 border-white/15'}`}>
                            <o.icon className={`w-[18px] h-[18px] ${o.best ? 'text-sky-300' : 'text-white/70'}`} strokeWidth={1.75} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="heading-5 flex flex-wrap items-baseline gap-x-2">
                                {o.name}
                                <span className={`text-[11px] font-medium ${o.best ? 'text-sky-300' : 'text-white/40'}`}>{o.where}</span>
                            </p>
                            <p className="caption mt-1 leading-relaxed">{o.text}</p>
                            {o.href && (
                                <a
                                    href={o.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`mt-2 inline-flex items-center gap-1 text-[12px] font-medium transition-colors ${o.best ? 'text-sky-300 hover:text-sky-200' : 'text-white/60 hover:text-white'}`}
                                >
                                    {o.linkLabel ?? 'Download'}
                                    <span aria-hidden="true">↗</span>
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
