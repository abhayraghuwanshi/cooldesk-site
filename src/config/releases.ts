// Release notes for /releases, mirrored from the GitHub releases of
// abhayraghuwanshi/cooldesk-extension. Where a GitHub release only says
// "see the full changelog", the notes come from docs/CHANGELOG.md in that repo.
// Newest first — the first entry is shown as "Latest".

export const RELEASES_REPO = "https://github.com/abhayraghuwanshi/cooldesk-extension";

export interface Release {
    version: string;
    /** Git tag on GitHub, when it differs from `v${version}`. */
    tag?: string;
    /** ISO date (YYYY-MM-DD) the GitHub release was published. */
    date: string;
    /** One-line summary shown under the version. */
    summary?: string;
    added?: string[];
    fixed?: string[];
    isMajor?: boolean;
}

export const releases: Release[] = [
    {
        version: "2.0.20",
        date: "2026-11-11",
        summary: "Claude Code runs cleanly in the built-in terminal, plus a Single | Multi switch in Browse.",
        added: [
            "Single | Multi switch in Browse's toolbar, with its own focus-mode button",
            "Scratch notes — a New note button (Tabs header, multi view bar, new-tab screen) opens a note that stays with the tab until you save it to a workspace",
            "A blank tab offers a shell, a note or your files, right on the new-tab screen",
        ],
        fixed: [
            "Claude Code and other full-screen terminal programs drew garbled in terminal tabs — lines at the wrong width, overwriting each other",
            "The file manager stays usable in narrow multi view tiles — its sidebar becomes a drawer and the preview keeps its room",
        ],
    },
    {
        version: "2.0.19",
        date: "2026-11-11",
        summary: "14 languages, separate sidebar and dock windows, multi view and a simpler Browse.",
        isMajor: true,
        added: [
            "CoolDesk speaks 14 languages — English, Spanish, French, German, Italian, Portuguese, Russian, Turkish, Indonesian, Hindi, Arabic (right-to-left), Chinese, Japanese and Korean",
            "The sidebar and the dock are separate windows — turn each on in Settings → Windows or from the tray, alongside the full app",
            "Multi view — your open pages, terminals, files and folders side by side in a grid, with dividers you can drag",
            "Search suggestions from your engine in Spotlight, the address bar and Home's search",
            "Spotlight commands — /shell for real shells inside Spotlight, /todo and /notes per workspace, and /help",
            "Clipboard history in Browse's Home — click a clip to copy it back",
            "Cool Activity and Settings open as tabs; folders open as tabs with the full file manager",
        ],
        fixed: [
            "Pages now appear as soon as they can draw, instead of after every image and ad has loaded",
            "A page could stay stuck on screen after closing its tab while it was still opening",
            "A white block could cover Settings, and a terminal could start all white",
        ],
    },
    {
        version: "2.0.18",
        date: "2026-11-06",
        summary: "49 new-tab layouts, search suggestions and one Customize panel.",
        added: [
            "49 new-tab layouts in five groups — Vibes, Start pages, Just for fun and Designs, from Word Clock and Flip Clock to Synthwave, Newspaper and Boarding Pass",
            "Search bar with suggestions from your engine plus your open tabs, bookmarks and history — open tabs switch instead of duplicating",
            "One Customize panel for the whole new tab: Layout, Look (40 wallpapers or your own) and Settings, applied instantly",
            "Widgets refreshed across all 39",
        ],
        fixed: [
            "The Currency widget was always “Offline”",
            "Year in Dots, Color Palette, Decision Maker, Moon Phase and Timer no longer overflow their cards",
            "White-on-white text on light designs with a wallpaper",
            "Theme changes in Settings now apply to the whole page right away",
        ],
    },
    {
        version: "2.0.17",
        date: "2026-11-03",
        summary: "Reliable Windows updates and an installer that sets up WebView2.",
        added: [
            "The Windows installer installs WebView2 when it's missing, so CoolDesk starts on older Windows 10, LTSC and managed PCs",
            "Optional one-tap feedback after a week of use, and on uninstall — anonymous, and off with the usage stats setting",
        ],
        fixed: [
            "Windows in-app updates were rejected by their own signature check",
            "Windows now offers one installer, so a PC can't end up with two copies of CoolDesk",
        ],
    },
    {
        version: "2.0.16",
        date: "2026-10-18",
        summary: "Build your own new tab, and a see-through dock on Windows.",
        added: [
            "New tab layouts — Classic, Mirror, Split, Stacked and Focus, with any piece shown or hidden (or Zen: wallpaper only)",
            "Custom layout — every piece of the new tab becomes a card you can drag, resize and add on a widget grid",
            "25 featured 4K wallpapers",
            "Widgets scale to the size of their card",
            "Windows: the docked sidebar and bar are see-through, like on Mac",
        ],
        fixed: [
            "Windows: dozens of terminal windows could open on launch (regression in 2.0.15)",
            "Windows: “Update” in the app never actually updated — it now uses the built-in updater, with winget as a fallback",
        ],
    },
    {
        version: "2.0.15",
        date: "2026-10-06",
        summary: "The agent looks at your tabs and history itself, and learns from what you keep.",
        added: [
            "/agent can read your open tabs, history and apps on its own to suggest workspaces — it still can't change anything without your OK",
            "CoolDesk learns from the proposals you apply or turn down, and stops re-suggesting what you rejected",
            "Proposals shown as a diff of your workspaces, with a one-line reason per change — or review them one by one with Y / N",
            "The file manager updates live when files change in the open folder",
            "/u, /a and /f become pills in Spotlight, like /agent",
        ],
        fixed: [
            "Pressing Enter on a follow-up applied the whole pending proposal instead of sending your message",
            "The agent claimed it couldn't see your history while CoolDesk's local server was restarting",
        ],
    },
    {
        version: "2.0.14",
        date: "2026-09-24",
        summary: "CoolDesk comes to Linux.",
        added: [
            "Linux desktop app — .deb, .rpm and .AppImage, with installed-apps search, running-apps support, and a dock handle that gets out of the way of fullscreen apps",
            "In-place updates on macOS and Linux — Install now downloads and applies the update instead of sending you to GitHub",
        ],
        fixed: [
            "macOS multi-monitor: the sidebar and its edge handle now open on the display your cursor is on, sized correctly and clear of the menu bar and Dock",
            "Navbar fixes for the Local and Media tabs in the activity feed",
            "New versions weren't reaching winget since 2.0.9",
        ],
    },
    {
        version: "2.0.13",
        date: "2026-09-06",
        summary: "A smarter activity feed, and the agent can see your real browsing.",
        added: [
            "Media tab — tabs playing audio right now, plus a recently played list, with pause and mute",
            "Suites tab — groups multi-service accounts like Google or Microsoft instead of listing each service",
            "Recent history for each app in the Search tab, so a closed thread stays one click away",
            "“Search my browser” from Spotlight, using your default search engine",
            "Edit a workspace straight from its card",
            "The AI agent can now read your actual tabs, history, bookmarks and apps instead of guessing",
        ],
        fixed: [
            "Deleting a workspace could silently fail and leave it in place",
            "The delete confirmation could get stuck behind the app — replaced with an in-app dialog",
            "A corrupted sync file is now set aside instead of being overwritten, and saves are crash-safe",
            "Requests containing accented letters, CJK text or emoji could crash the local server",
            "Several sync fixes so edits from other devices, and unsent local edits, are no longer lost",
        ],
    },
    {
        version: "2.0.10",
        date: "2026-08-22",
        summary: "Clicking an app on macOS always brings it forward.",
        fixed: [
            "Clicking a running-but-backgrounded macOS app (Music, Notes…) from the dock, workspace cards or activity feed did nothing — it now opens the same way the real Dock does",
            "If focusing an app fails, CoolDesk now launches it instead of silently doing nothing",
            "App launch errors on macOS are now reported instead of ignored",
            "Menu-bar apps that open a real window no longer go missing from the running-apps list",
        ],
    },
    {
        version: "2.0.9",
        date: "2026-08-13",
        summary: "A dock you can't lose.",
        added: [
            "Dock-to-side button in the top/bottom taskbar bar",
            "Tray / menu-bar options to jump to Full Window, Side Dock or Bottom Bar — always reachable",
            "Per-column accent colour on the Overview dashboard",
        ],
        fixed: [
            "The sidebar/bottom-bar dock could get stuck with no way back to the full window",
            "The docked bar could render underneath the macOS Dock or menu bar",
            "“CoolDesk is damaged and can't be opened” on macOS — the fix script is now impossible to miss",
            "The Homebrew cask was stuck on old versions",
            "AI CLI agents started from Spotlight couldn't always find Claude Code, opencode or Codex on macOS/Linux",
        ],
    },
    {
        version: "2.0.8",
        date: "2026-08-03",
        summary: "Terminal AI agents, right in Spotlight.",
        added: [
            "Run Claude Code, opencode or Codex CLI from Spotlight — replies stream in, with a CLI switcher, New chat and prompt history",
            "Adding to a workspace now goes through search — pick as many results as you like and they're filed straight in",
            "Remove any link or app from a workspace card with one click",
        ],
        fixed: [
            "Removed the old AI Workspace Manager panel, which could get stuck",
            "Wallpaper lists in Settings and onboarding can no longer drift out of sync",
        ],
    },
    {
        version: "2.0.7",
        date: "2026-08-01",
        summary: "Project workspaces that live in your repo — and one version number for app and extension.",
        isMajor: true,
        added: [
            "Project workspaces from a committed .cooldesk/ folder — what the project is, decisions, shared todos and run commands travel with git clone",
            "CoolDesk finds .cooldesk projects in your usual folders on startup and turns each into a workspace",
            "Linked projects — group frontend, backend and plugin repos into one workspace",
            "Project panel with git branch, runnable commands, shared todos and docs",
            "One Spotlight everywhere — the desktop app uses the same search as the new tab",
            "Widget store, and a bottom dock with app switching and layout controls",
            "Redesigned workspace cards, a sidebar/taskbar view and a knowledge graph view",
            "First-run onboarding tour, redesigned themes and settings, more wallpapers and a custom accent colour",
        ],
        fixed: [
            "Apps that stopped offering updates (the previous release was tagged v1.0.7 while shipping 1.7.0) now update normally",
            "Window focus, details-view scrolling, dock and workspace layout, and updater reliability",
        ],
    },
    {
        version: "1.7.0",
        tag: "v1.0.7",
        date: "2026-07-25",
        summary: "Widgets, the docked sidebar and the file manager arrive.",
        added: [
            "Widget board with 39 built-in widgets — clock, calendar, pomodoro, habits, notes, GitHub, currency and more",
            "Docked workspace sidebar that reserves screen space instead of floating over your windows (Windows)",
            "Built-in file manager that links folders on disk to projects",
            "Backup and restore for workspaces and settings",
            "Voice and slash commands in Spotlight",
        ],
        fixed: [
            "Auto-updater failures on Windows",
            "Scrolling on the workspace details view, plus dock and layout fixes",
        ],
    },
    {
        version: "1.6.0",
        date: "2026-07-15",
        summary: "See where your time goes.",
        added: [
            "Activity tracking — which apps you use, media you're watching or listening to, and time per website, all on your machine",
            "Redesigned Activity Overview dashboard",
            "Reworked knowledge graph with smoother layout and rendering",
        ],
        fixed: ["Knowledge graph display glitches", "Minor Spotlight styling issues"],
    },
    {
        version: "1.5.0",
        date: "2026-07-06",
        summary: "Search that learns from you.",
        added: [
            "Live web app widgets — pin interactive web apps onto your workspace canvas",
            "Results you pick rank higher the next time you search the same thing",
            "Keyboard: Tab jumps between result sections, ←/→ switches workspaces, /u /a /f scope filters",
        ],
        fixed: [
            "Mouse hover and keyboard selection fighting in Spotlight",
            "Workspace switching via keyboard",
            "AI assistant reliability",
        ],
    },
    {
        version: "1.4.0",
        date: "2026-06-25",
        summary: "Homebrew, and a redesigned search bar.",
        added: [
            "Redesigned, faster search bar, plus a search tab beside the activity feed",
            "Install on macOS via Homebrew",
        ],
        fixed: [
            "Mac apps missing from search results",
            "Startup issue caused by stale local ports",
            "Lower memory usage",
        ],
    },
    {
        version: "1.3.0",
        date: "2026-06-20",
        summary: "Jump to terminals and Explorer windows.",
        added: [
            "Windows Terminal and File Explorer windows show up in search",
            "Search and close buttons in Spotlight",
            "Chrome extension: background sync refresh and a tab-management alert",
        ],
        fixed: ["Security hardening and rate limiting on the local API", "Terminal/Explorer window capture"],
    },
    {
        version: "1.2.8",
        date: "2026-06-19",
        summary: "Folder navigation and extension sync.",
        added: [
            "Folders and button navigation inside CoolDesk",
            "Terminal and File Explorer windows captured in search",
            "Auto-group and merge for tabs",
        ],
        fixed: ["Auth and security fixes, with rate limiting", "Chrome extension sync fixes"],
    },
    {
        version: "1.2.7",
        date: "2026-06-03",
        summary: "macOS install and startup fixes.",
        added: ["Launch at startup"],
        fixed: [
            "macOS build and quarantine (“damaged app”) issues",
            "Duplicate installs when upgrading",
            "Connection issues between the app and the extension",
            "Knowledge graph issue",
        ],
    },
    {
        version: "1.2.3",
        date: "2026-05-08",
        summary: "A lighter app bundle.",
        fixed: ["Removed the embedded webview for a smaller, faster app"],
    },
    {
        version: "1.2.2",
        date: "2026-05-07",
        summary: "Bug fixes and stability improvements.",
    },
    {
        version: "1.2.1",
        date: "2026-05-05",
        summary: "Bug fixes and stability improvements.",
    },
    {
        version: "1.2.0",
        date: "2026-05-05",
        summary: "Knowledge graph and cloud AI.",
        added: [
            "Activity knowledge graph built from your visits",
            "Choose between local AI and cloud AI",
            "Spotlight UI refresh, and mapping workspaces back to their links and apps",
        ],
    },
    {
        version: "1.1.0",
        date: "2026-04-04",
        summary: "Build workspaces from Spotlight.",
        added: ["Create workspaces and add items to them from Spotlight"],
        fixed: ["Notes and app-launch bugs"],
    },
    {
        version: "1.0.0",
        date: "2026-03-30",
        summary: "The CoolDesk desktop app — Spotlight across your whole machine.",
        isMajor: true,
        added: [
            "Desktop app for Windows and macOS, paired with the browser extension",
            "Automatic updates",
        ],
    },
];

export function releaseUrl(release: Release) {
    return `${RELEASES_REPO}/releases/tag/${release.tag ?? `v${release.version}`}`;
}
