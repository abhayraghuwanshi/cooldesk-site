/**
 * Every screenshot on the feature pages (/new-tab, /shell, /browser,
 * /clipboard, /file-manager, /dock, /sidebar), in one place.
 *
 * A shot with `pending: true` has no image yet. In production it renders
 * nothing (the page reads fine without it); in `npm run dev` it shows a dashed
 * box naming the file and what to capture.
 *
 * To add one from the running app: `npm run shot -- <key>` (scripts/shot/).
 * It saves public<src> and records the size in shot-sizes.json, which turns
 * the todo() entry on. By hand: save the image and add its size there.
 *
 * Rules for new shots: ~1400–2000px wide JPEG (q≈80), real data but nothing
 * private — no banks, payment pages, mail contents or passwords (see
 * NewTabShowcase.tsx). Dark theme, so they sit well on the site.
 */

import SIZES from "./shot-sizes.json";

export type Shot = {
    src: string;
    width: number;
    height: number;
    alt: string;
    /** Shown under the image. */
    caption?: string;
    /** No image yet: what to capture. */
    pending?: boolean;
};

const sizes: Record<string, { width: number; height: number }> = SIZES;

/** A shot that's live once shot-sizes.json has its size, pending until then. */
const todo = (src: string, alt: string, caption?: string): Shot =>
    sizes[src] ? { src, ...sizes[src], alt, caption } : { src, width: 1600, height: 1000, alt, caption, pending: true };

export const SHOTS = {
    // ── /new-tab: one per layout (overviewLayouts.js) ────────────────────
    // The picker's set: one profile and theme, so switching layouts compares like with like.
    // The page's hero keeps full-window.jpg.
    newTabClassic: todo("/images/new-tab-classic.jpg", "The new tab in the Classic layout over a lake wallpaper: clock, weather, tasks and a quote on the left; favorites and the activity feed on the right."),
    newTabMirror: todo("/images/new-tab-mirror.jpg", "The new tab in the Mirror layout: the feed on the left, widgets on the right."),
    newTabSplit: todo("/images/new-tab-split.jpg", "The new tab in the Split layout: widgets and feed in two equal halves."),
    newTabStacked: todo("/images/new-tab-stacked.jpg", "The new tab in the Stacked layout: a row of widgets on top, the feed below."),
    newTabFocus: todo("/images/new-tab-focus.jpg", "The new tab in the Focus layout: one centered column."),
    newTabCustom: todo("/images/new-tab-custom.jpg", "The new tab in the Custom layout: widgets, favorites and feed sections as separate cards on a grid."),
    newTabCustomize: todo("/images/new-tab-customize.jpg", "Customize mode on the Custom layout: dragging a card, resize handles, and the add-a-card list.", "Customize mode: drag, resize, add and remove cards."),
    newTabZen: todo("/images/new-tab-zen.jpg", "The new tab with everything hidden: just the Lake House wallpaper and the corner buttons.", "Zen: hide everything and keep the wallpaper."),

    // ── /spotlight ──────────────────────────────────────────────────────
    spotlight: todo("/images/spotlight.jpg", "Spotlight searching “cooldesk”: a running app, two open tabs, a GitHub page from history, project folders and a downloaded file."),
    spotlightPreview: todo("/images/spotlight-preview.jpg", "Spotlight scoped to Files, with useLayoutSwitch.js selected and its code previewed beside the result.", "Preview a file before you open it."),

    // ── /shell ────────────────────────────────────────────────────────────
    shellSidebar: todo("/images/shell-sidebar.jpg", "CoolDesk docked as a sidebar on the right: the clipboard, the locked password vault, and the Shell card listing a project’s recent commits.", "The sidebar’s own shell, below the clipboard and passwords."),
    shellTab: todo("/images/shell-tab.jpg", "A shell tab in CoolDesk showing the website repo’s last twelve commits, with the Clear and Restart buttons in its bar.", "A terminal as a tab, next to your pages and files."),
    shellSearch: todo("/images/shell-search.jpg", "CoolDesk’s search bar with “> cd ~/projects/cooldesk-onboard-smoothly && git log --oneline -12” typed in, offering Run in terminal.", "Type > and a command in the search bar."),

    // ── /browser (webview) ───────────────────────────────────────────────
    browser: todo("/images/browser.jpg", "CoolDesk’s browser with cool-desk.com open on the left and the side panel’s Files tab on the right, listing the website project’s folders."),
    browserCanvas: todo("/images/browser-canvas.jpg", "Multi view: the CoolDesk homepage and the /new-tab page tiled side by side.", "Multi view: open tabs side by side."),
    browserTools: todo("/images/browser-tools.jpg", "The Page tab in the side panel: highlights, clip, copy as Markdown, dark mode and site permissions for the open page.", "Page tools and site permissions."),

    // ── /clipboard ───────────────────────────────────────────────────────
    clipboard: todo("/images/clipboard.jpg", "The clipboard card: filters for text, code, links, images and colors, above a color swatch, a link and a command, newest first."),
    clipboardAll: todo("/images/clipboard-all.jpg", "The clipboard filtered to Links, with the hovered clip’s preview, pin and delete buttons.", "Filter by kind; preview, pin or delete a clip."),

    // ── /file-manager ─────────────────────────────────────────────────────
    fileManager: {
        src: "/images/file-manager.jpg",
        width: 1400,
        height: 891,
        alt: "CoolDesk’s file manager open in the cooldesk-extension/src folder, with the space’s commands (Vite dev, Tauri dev, Build frontend, Build desktop app, Lint) as buttons along the top and linked spaces in the sidebar.",
    },
    fileManagerPreview: todo("/images/file-manager-preview.jpg", "CHANGELOG.md open beside the Files panel, which lists the cooldesk-extension project with its linked projects along the top.", "Open a file next to the folder it’s in."),
    fileManagerArchive: todo("/images/file-manager-archive.jpg", "A zip archive open beside the Files panel: the files inside it with their sizes, and an Extract here button.", "See inside an archive, then extract it where it is."),

    // ── /dock ─────────────────────────────────────────────────────────────
    dockBar: {
        src: "/images/dock-bar.jpg",
        width: 2400,
        height: 73,
        alt: "CoolDesk’s dock along the bottom of the screen: the workspace name, its links and apps, a dev server on :3000, and repo folders with their git branch.",
    },
    dockDesktop: todo("/images/dock-desktop.jpg", "The whole screen with the dock as a see-through pill along the bottom, over a code editor.", "A see-through pill along the bottom of your screen."),
    dockActive: todo("/images/dock-active.jpg", "The dock’s Active view: every running app and open browser tab, with dots under the ones in front.", "Active view: everything open right now."),
    dockPicker: todo("/images/dock-picker.jpg", "The dock’s inline workspace picker: one chip per workspace with its item count.", "Click the name to switch workspace."),

    // ── /sidebar ──────────────────────────────────────────────────────────
    sidebar: todo("/images/sidebar-desktop.jpg", "The whole screen with CoolDesk docked as a see-through sidebar on the right: the Active card, two workspaces, the clipboard, the shell and popular folders."),
    sidebarHandle: todo("/images/sidebar-handle.jpg", "The sidebar tucked away: only a thin handle at the screen edge.", "Tucked away to a handle until you hover it."),
    sidebarActive: todo("/images/sidebar-active.jpg", "The sidebar’s Active card: the apps running and the tabs open right now.", "The Active card: what’s open right now."),
} satisfies Record<string, Shot>;

export type ShotKey = keyof typeof SHOTS;
