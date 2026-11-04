import { AppWindow, Clipboard, Folder, Globe, PanelBottom, PanelRight, Search, SquareTerminal, type LucideIcon } from "lucide-react";

/**
 * The desktop app's parts that each have their own page. Drives the
 * "More in CoolDesk" strip at the bottom of every feature page and the
 * footer's Features column.
 */
export type Feature = { slug: string; name: string; blurb: string; Icon: LucideIcon };

export const FEATURES: Feature[] = [
    { slug: "/spotlight", name: "Spotlight", blurb: "Alt+K for any tab, page, app, file or workspace.", Icon: Search },
    { slug: "/sidebar", name: "Sidebar", blurb: "Your project beside your work, tucked to the screen edge.", Icon: PanelRight },
    { slug: "/dock", name: "Dock", blurb: "A slim bar of a project’s links and apps along the bottom.", Icon: PanelBottom },
    { slug: "/browser", name: "Browser", blurb: "A project’s pages next to its notes, files and terminal.", Icon: Globe },
    { slug: "/shell", name: "Shell", blurb: "A real terminal in the sidebar and as a tab.", Icon: SquareTerminal },
    { slug: "/file-manager", name: "File manager", blurb: "Folders that know their project and its commands.", Icon: Folder },
    { slug: "/clipboard", name: "Clipboard history", blurb: "Everything you copy, found and dragged out again.", Icon: Clipboard },
    { slug: "/new-tab", name: "New tab", blurb: "Widgets, favorites and your day in every browser tab.", Icon: AppWindow },
];
