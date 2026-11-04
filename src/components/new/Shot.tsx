import type { Shot as ShotData } from "@/config/shots";

/**
 * One screenshot from src/config/shots.ts. A pending shot renders nothing in
 * production and a dashed "screenshot needed" box in dev, so a missing image
 * never ships as a broken one.
 */
export default function Shot({ shot, priority = false, className = "" }: { shot: ShotData; priority?: boolean; className?: string }) {
    if (shot.pending) {
        // MODE, not DEV: the prerender runs under vite-node, where DEV is true even for a production build.
        if (import.meta.env.MODE !== "development") return null;
        return (
            <figure className={className}>
                <div className="grid aspect-[16/10] place-items-center rounded-2xl border-2 border-dashed border-amber-300/40 bg-amber-300/[0.04] p-6 text-center">
                    <div>
                        <p className="text-[13px] font-semibold uppercase tracking-widest text-amber-200/80">Screenshot needed</p>
                        <p className="mt-2 font-mono text-[13px] text-white/70">public{shot.src}</p>
                        <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-white/50">{shot.alt}</p>
                    </div>
                </div>
                {shot.caption && <figcaption className="mt-2.5 text-[14px] text-white/50">{shot.caption}</figcaption>}
            </figure>
        );
    }
    return (
        <figure className={className}>
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
                <img
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    loading={priority ? undefined : "lazy"}
                    decoding="async"
                    className="block h-auto w-full"
                />
            </div>
            {shot.caption && <figcaption className="mt-2.5 text-[14px] text-white/50">{shot.caption}</figcaption>}
        </figure>
    );
}
