import { AppWindow, Clipboard, Folder, Globe, PanelBottom, PanelRight, Search, SquareTerminal, type LucideIcon } from "lucide-react";

/**
 * The desktop app's parts that each have their own page. Drives the
 * "More in CoolDesk" strip at the bottom of every feature page and the
 * footer's Features column.
 */
export type Feature = {
    slug: string;
    name: string;
    blurb: string;
    Icon: LucideIcon;
    /** The kind of app this feature competes with, for "Best apps" on /resources (e.g. "Launchers"). */
    job?: string;
    /** Blog slugs (src/config/blogs.ts) that cover this feature. Linked both ways:
     *  "Guides" on the feature page, "CoolDesk features in this guide" on the post. */
    guides: string[];
};

export const FEATURES: Feature[] = [
    { slug: "/spotlight", name: "Spotlight", job: "Launchers", blurb: "Alt+K for any tab, page, app, file or workspace.", Icon: Search, guides: ["raycast-alternatives-windows", "launchpad-alternatives-mac", "developer-context-switching-setup"] },
    { slug: "/sidebar", name: "Sidebar", job: "Sidebars", blurb: "Your project beside your work, tucked to the screen edge.", Icon: PanelRight, guides: ["best-sidebar-apps-mac-windows", "arc-browser-alternatives", "developer-context-switching-setup"] },
    { slug: "/dock", name: "Dock", job: "Docks", blurb: "A slim bar of a project’s links and apps along the bottom.", Icon: PanelBottom, guides: ["best-dock-apps-windows", "best-dock-apps-mac", "launchpad-alternatives-mac"] },
    { slug: "/browser", name: "Browser", job: "Browsers", blurb: "A project’s pages next to its notes, files and terminal.", Icon: Globe, guides: ["split-screen-tabs-browser", "arc-browser-alternatives"] },
    { slug: "/shell", name: "Shell", blurb: "A real terminal in the sidebar and as a tab.", Icon: SquareTerminal, guides: ["split-screen-tabs-browser", "developer-context-switching-setup"] },
    { slug: "/file-manager", name: "File manager", blurb: "Folders that know their project and its commands.", Icon: Folder, guides: ["developer-context-switching-setup", "split-screen-tabs-browser"] },
    { slug: "/clipboard", name: "Clipboard history", job: "Clipboard managers", blurb: "Everything you copy, found and dragged out again.", Icon: Clipboard, guides: ["best-clipboard-managers", "raycast-alternatives-windows"] },
    { slug: "/new-tab", name: "New tab", job: "New tab pages", blurb: "Widgets, favorites and your day in every browser tab.", Icon: AppWindow, guides: ["best-new-tab-extensions"] },
];

/** The feature pages that link to a blog post, for the post's own strip. */
export function featuresForGuide(blogSlug: string): Feature[] {
    return FEATURES.filter((f) => f.guides.includes(blogSlug));
}
