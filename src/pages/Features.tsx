import FeatureBento from "@/components/new/FeatureBento";
import Footer from "@/components/new/Footer";
import Navbar from "@/components/new/Navbar";
import SectionBackdrop from "@/components/new/SectionBackdrop";
import SEO from "@/components/SEO";
import { useSectionView } from "@/lib/analytics";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/** Every feature in one bento grid (FeatureBento), each tile linking to its page. */
export default function FeaturesPage() {
    const ctaRef = useSectionView<HTMLElement>("features_close_cta", { page_type: "features" });
    return (
        <main className="min-h-screen text-white">
            <SEO
                title="CoolDesk Features: Spotlight, AI Agent, Sidebar, Dock, Browser and More (Free)"
                description="Everything in CoolDesk: Spotlight search, an AI agent, a sidebar and dock for your projects, a built-in browser, shell, file manager, clipboard history and a new tab extension. Free, no account."
                canonical="https://cool-desk.com/features"
            />
            <Navbar />
            <div className="relative isolate">
                <SectionBackdrop glow="left-1/2 top-[200px] h-[700px] w-[1300px] -ml-[650px]" tint="rgba(56,189,248,0.12)" />
                <header className="container mx-auto px-6 pt-32 pb-10">
                    <nav aria-label="Breadcrumb" className="text-[13px] text-white/50">
                        <Link to="/" className="text-white/60 transition-colors hover:text-white">Home</Link>
                        {" / "}
                        <span className="text-sky-300">Features</span>
                    </nav>
                    <h1 className="mt-4 max-w-3xl text-[38px] font-bold leading-[1.05] tracking-[-0.03em] md:text-6xl">Everything in CoolDesk.</h1>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
                        A desktop app that keeps each project’s tabs, apps, files and notes together, and a browser extension for your new tab. Pick a part to see how it works.
                    </p>
                </header>
                <div className="container mx-auto px-6 pb-16">
                    <FeatureBento page="features" />
                </div>
                <section ref={ctaRef} data-track-area="cta" className="container mx-auto px-6 pb-24">
                    <div className="relative overflow-hidden rounded-[22px] border border-sky-300/25 bg-[#0a0d16] px-6 py-9 md:px-8">
                        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.3),transparent)]" />
                        <h2 className="relative text-[26px] font-bold">Free, no account</h2>
                        <p className="relative mt-2.5 max-w-[560px] text-[15.5px] leading-relaxed text-white/65">Mac, Windows and Linux. Everything stays on your device.</p>
                        <a
                            href="/#downloads"
                            className="group relative mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-5 text-[15px] font-semibold text-[#07070a] transition-transform hover:-translate-y-px"
                        >
                            Download CoolDesk
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </a>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}
