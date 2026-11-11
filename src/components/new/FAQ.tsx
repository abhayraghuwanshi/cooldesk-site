import { useSectionView } from "@/lib/analytics";
import { pushSsrJsonLd } from "@/lib/ssrHead";
import { useEffect, useState } from "react";

interface FAQItem {
    q: string;
    a: string;
}

const items: FAQItem[] = [
    {
        q: "What is CoolDesk?",
        a: "Two free pieces that work together: a desktop launcher for Windows, macOS and Linux (press Alt+K to find anything, kept in spaces, one for each project), and a browser extension that turns your new tab into a dashboard. No sign-in needed.",
    },
    {
        q: "How is it different from Raycast or a tab manager?",
        a: "Launchers open apps; tab managers handle tabs. CoolDesk does both and keeps them in spaces, one for each thing you work on.",
    },
    {
        q: "Do I need the desktop app?",
        a: "It depends what you want. The extension turns your new tab into a dashboard: widgets, favorites, your open tabs and what's playing. Spotlight, spaces, the file manager and the layouts are in the desktop app. Install both and Spotlight can find your browser tabs and jump straight to them.",
    },
    {
        q: "Is my data private?",
        a: "Your data stays on your device. Only an anonymous usage ping (can be turned off), cloud AI with your own key, and Team sync send anything out.",
    },
];

const Chevron = ({ open }: { open: boolean }) => (
    <svg
        className={`h-5 w-5 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
    >
        <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 11.92 1.18l-4.17 3.3a.75.75 0 01-.92 0l-4.17-3.3a.75.75 0 01-.04-1.06z"
            clipRule="evenodd"
        />
    </svg>
);

const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
        },
    })),
};

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const sectionRef = useSectionView<HTMLDivElement>("faq");

    // During the build-time prerender pass there's no DOM to inject into —
    // hand it to the prerender script instead (see SEO.tsx / lib/ssrHead.ts).
    pushSsrJsonLd(faqStructuredData);

    // Inject FAQPage JSON-LD imperatively — react-helmet-async silently fails
    // to apply tags in this app (see SEO.tsx).
    useEffect(() => {
        const el = document.createElement("script");
        el.type = "application/ld+json";
        el.setAttribute("data-faq-jsonld", "");
        el.textContent = JSON.stringify(faqStructuredData);
        document.head.appendChild(el);
        return () => el.remove();
    }, []);

    return (
        <div ref={sectionRef} id="faq" className="relative py-16 scroll-mt-20">
            <div className="flex flex-col md:flex-row gap-12">
                {/* Left: FAQ Title + compatibility at a glance */}
                <div className="md:w-1/3 flex flex-col justify-center">
                    <h2 className="text-5xl md:text-6xl font-bold text-white">
                        FAQs
                    </h2>

                    <div className="mt-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-3">
                            Works on
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {["Windows", "macOS", "Linux", "Chrome", "Edge", "Brave"].map((name) => (
                                <span
                                    key={name}
                                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300"
                                >
                                    {name}
                                </span>
                            ))}
                        </div>
                        <p className="mt-3 text-xs text-gray-500">
                            Other Chromium browsers work too · Firefox coming soon
                        </p>
                    </div>
                </div>

                {/* Right: FAQ List */}
                <div className="md:w-2/3">
                    {items.map((item, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div key={idx} className="border-b border-white/10">
                                <button
                                    className="w-full flex items-center justify-between gap-6 py-5 text-left focus:outline-none"
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-panel-${idx}`}
                                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                                >
                                    <span className={`text-base md:text-lg font-semibold transition-colors duration-200 ${isOpen ? "text-white" : "text-gray-300"}`}>
                                        {item.q}
                                    </span>
                                    <span className={`flex-shrink-0 transition-colors duration-200 ${isOpen ? "text-white" : "text-gray-500"}`}>
                                        <Chevron open={isOpen} />
                                    </span>
                                </button>

                                <div
                                    id={`faq-panel-${idx}`}
                                    role="region"
                                    aria-labelledby={`faq-header-${idx}`}
                                    className={`transition-[max-height,opacity] duration-300 ease-out ${isOpen ? "max-h-[32rem] opacity-100 pb-5" : "max-h-0 opacity-0 overflow-hidden"}`}
                                >
                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">{item.a}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
