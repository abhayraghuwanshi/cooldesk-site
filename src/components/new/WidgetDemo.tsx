import { trackEvent } from "@/lib/analytics";

/**
 * Live widget previews, embedded straight from /widgets/*.html — the same
 * self-contained pages the extension ships. Used on /new-tab (a row of four)
 * and on the homepage's "Everything around your work" section (one card).
 *
 * The ?tint= param is the app's own per-tile accent mechanism: the widget
 * mixes it into its card surface, so previews read as coloured glass rather
 * than grey slabs. ?v= is the cache-bust key and must track WIDGET_VERSION in
 * cooldesk-extension/src/data/widgetCatalog.js and src/pages/WidgetStore.tsx.
 */

export const WIDGET_VERSION = "14";

export type DemoWidget = {
    /** File in public/widgets, without .html. */
    id: string;
    /** Preview height in px. */
    h: number;
    /** Accent hex without the leading #. */
    tint: string;
};

/** A row for /new-tab: time, weather, markets and a quote. */
export const NEW_TAB_WIDGETS: DemoWidget[] = [
    { id: "clock", h: 150, tint: "3b82f6" },
    { id: "weather", h: 150, tint: "0ea5e9" },
    { id: "crypto", h: 150, tint: "8b5cf6" },
    { id: "quotes", h: 150, tint: "d946ef" },
];

/** A single card for the homepage section. */
export const HOME_WIDGETS: DemoWidget[] = [
    { id: "clock", h: 170, tint: "6366f1" },
];

export default function WidgetDemo({
    widgets,
    className = "",
}: {
    widgets: DemoWidget[];
    className?: string;
}) {
    const cols =
        widgets.length >= 4
            ? "sm:grid-cols-2 lg:grid-cols-4"
            : widgets.length === 3
              ? "sm:grid-cols-3"
              : widgets.length === 2
                ? "sm:grid-cols-2"
                : "";

    return (
        <div className={`grid gap-3 ${cols} ${className}`}>
            {widgets.map((w) => (
                <div
                    key={w.id}
                    className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.045] transition-colors hover:border-white/25"
                    style={{ boxShadow: `0 0 0 1px #${w.tint}24, 0 18px 50px -28px #${w.tint}66` }}
                >
                    <iframe
                        src={`/widgets/${w.id}.html?theme=dark&tint=${w.tint}&v=${WIDGET_VERSION}`}
                        title={`${w.id} widget live preview`}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"
                        className="block w-full"
                        style={{ height: w.h }}
                        onLoad={() => trackEvent("widget_demo_view", { widget_id: w.id })}
                    />
                </div>
            ))}
        </div>
    );
}
