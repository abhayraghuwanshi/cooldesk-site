import Downloads from "@/components/new/Downloads";
import WorkspaceShowcase from "@/components/new/WorkspaceShowcase";
import FeatureBento from "@/components/new/FeatureBento";
import FAQ from "@/components/new/FAQ";
import Footer from "@/components/new/Footer";
import Hero from "@/components/new/Hero";
import HowToUseSection from "@/components/new/HowToUseSection";
import Navbar from '@/components/new/Navbar';
import SectionBackdrop from "@/components/new/SectionBackdrop";
import SEO from "@/components/SEO";
import { site } from "@/config/site";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// Hero, space, Spotlight, AI agent, browser extension, download (with "which one do I
// need?"), FAQ, then the videos (Watch and learn).
// /how-to-use redirects to #how-to-use here.
const Index = () => {
  const { hash } = useLocation();

  // Arriving from another page (or the /how-to-use redirect) with a hash: the
  // browser's own jump happens before these sections exist, so do it once
  // they've rendered.
  useEffect(() => {
    if (!hash) return;
    const t = window.setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
    }, 60);
    return () => window.clearTimeout(t);
  }, [hash]);

  return (
    <>

      <main className="min-h-screen text-white scroll-smooth">
        <SEO
          title={site.seo.title}
          description={site.seo.description}
          canonical={`${site.url}/`}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
        <Navbar />

        <section className="relative z-10">
          <Hero />
        </section>

        <section id="workspace" className="relative z-10 py-16 md:py-24 scroll-mt-20">
          <WorkspaceShowcase />
        </section>

        {/* Every feature as a bento grid; each tile opens its own page. */}
        <section id="features" className="relative isolate z-10 py-16 md:py-24 scroll-mt-20">
          <SectionBackdrop variant="constellation" />
          <div className="container mx-auto px-6">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">Everything in CoolDesk</h2>
                <p className="mt-3 max-w-xl text-lg text-white/60">One app on your desktop, one extension in your browser. Pick a part to see how it works.</p>
              </div>
              <Link to="/features" className="text-[15px] font-medium text-sky-300 transition-colors hover:text-sky-200">All features →</Link>
            </div>
            <FeatureBento page="home" />
          </div>
        </section>

        <section id="downloads" className="relative isolate z-10 scroll-mt-20">
          <SectionBackdrop glow="left-1/2 top-[260px] h-[560px] w-[1100px] -ml-[550px]" tint="rgba(253,186,116,0.10)" />
          <Downloads />
        </section>

        <section className="relative isolate z-10 pt-12 md:pt-20">
          <SectionBackdrop variant="dust" />
          <div className="container mx-auto px-6 relative z-10">
            <FAQ />
          </div>
        </section>

        <section id="how-to-use" className="relative isolate z-10 py-16 md:py-24 scroll-mt-20">
          <SectionBackdrop variant="dust" />
          <HowToUseSection />
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Index;
