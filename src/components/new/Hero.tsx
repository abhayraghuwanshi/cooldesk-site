import { CHROME_STORE } from '@/config/site';
import { trackEvent, useSectionView } from '@/lib/analytics';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import HeroBackdrop from './HeroBackdrop';

function trackHeroCta(label: string, target: string) {
    trackEvent('hero_cta_click', {
        section: 'hero',
        action: 'click',
        cta_label: label,
        cta_target: target,
    });
}


/**
 * Each word fades up from dim, one after another (`offset` continues the count
 * across lines). Words in `bright` render in full white, so they stand out on a
 * dimmed line.
 */
function RevealWords({ text, offset = 0, bright = [] }: { text: string; offset?: number; bright?: string[] }) {
    const words = text.split(' ');
    return (
        <>
            {words.map((w, i) => (
                <React.Fragment key={i}>
                    <span
                        className={`inline-block motion-safe:animate-in motion-safe:fade-in-10 motion-safe:slide-in-from-bottom-1 duration-500 ease-out fill-mode-both ${bright.includes(w) ? 'text-white' : ''}`}
                        style={{ animationDelay: `${150 + (offset + i) * 90}ms` }}
                    >
                        {w}
                    </span>
                    {i < words.length - 1 ? ' ' : ''}
                </React.Fragment>
            ))}
        </>
    );
}

function Hero() {
    const sectionRef = useSectionView<HTMLElement>('hero');

    return (
        <section ref={sectionRef} id="home" className="relative text-white overflow-hidden isolate z-20 scroll-mt-20">
            <HeroBackdrop />

            <div className="container mx-auto flex min-h-[min(92vh,900px)] items-center px-6 pt-32 pb-24 md:pt-36 md:pb-32">
                <div className="flex w-full flex-col items-center text-center">
                    {/* Words light up in order on load: the same reveal the day's
                        headings use on scroll. Pure CSS, so it runs on the
                        prerendered HTML without waiting for JS. */}
                    <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.02] max-w-4xl">
                        <RevealWords text="We killed" />
                        <br />
                        <span className="text-white/55">
                            <RevealWords text="the tab hunt." offset={2} bright={['hunt.']} />
                        </span>
                    </h1>

                    {/* Kept short on purpose: the full definition (platforms, free,
                        Alt+K) lives in the meta description, JSON-LD and llms.txt. */}
                    <p className="mt-6 text-base md:text-lg text-white/55 max-w-xl leading-relaxed">
                        Then we came for the windows, apps and files.
                    </p>

                    <div className="mt-9 flex flex-col sm:flex-row items-center gap-3">
                        <a
                            href="#downloads"
                            onClick={() => trackHeroCta('download_free', 'downloads_section')}
                            className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 h-12 text-sm font-semibold text-black shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_8px_30px_rgba(56,189,248,0.25)] transition-transform hover:-translate-y-px"
                        >
                            Download free
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </a>
                        <a
                            href={CHROME_STORE}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackHeroCta('add_to_chrome', 'chrome_web_store')}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 h-12 text-sm font-semibold text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white"
                        >
                            Add to Chrome
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
