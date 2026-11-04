import FeaturePage, { Kbd, link, Rows, Section } from "@/components/new/FeaturePage";
import Shot from "@/components/new/Shot";
import { SHOTS } from "@/config/shots";
import { Link } from "react-router-dom";

/**
 * The docked sidebar ("side" layout).
 *
 * Claims follow cooldesk-extension:
 *   card order: workspaces (Active + two most     faces/shell/CoolDeskContainer.jsx (homePage)
 *   active, Show all), clipboard, vault, shell,
 *   widgets / Popular Folders / dev servers
 *   left or right edge, Ctrl+Shift+D              features/dock/useLayoutSwitch.js
 *   drawer handle, hidden over fullscreen         src-tauri/src/dock/*.rs
 *   see-through on Mac and Windows, solid         CHANGELOG 2.0.16
 *   (no wallpaper) on Linux
 *   vault: master password, copy clears after     features/vault/VaultSection.jsx
 *   30s, locks after 5 min idle
 */

const CARDS: [string, React.ReactNode][] = [
    ["Active", "the apps running and the tabs open right now"],
    ["Workspaces", "your two most active, with Show all for the rest"],
    ["Clipboard", <><Link to="/clipboard" className={link}>everything you copied</Link>, if you turn it on</>],
    ["Passwords", "a small encrypted vault, if you turn it on"],
    ["Shell", <>a <Link to="/shell" className={link}>real terminal</Link>, collapsed until you open it</>],
    ["Folders & dev", "widgets, your popular folders and the dev servers running"],
];

const FAQ = [
    {
        q: "Which side does it go on?",
        a: <p>Left or right, your choice. CoolDesk remembers the edge you picked.</p>,
    },
    {
        q: "Does it take space from my other windows?",
        a: <p>No. It slides in over your work while you use it and tucks back to a thin handle when you move away. The handle hides while a full-screen app, game or video is in front.</p>,
    },
    {
        q: "Is the password vault safe?",
        a: <p>It’s locked with a master password you set, and locks itself after 5 minutes idle. A copied password is cleared from the clipboard after 30 seconds. It’s off until you turn it on in Settings.</p>,
    },
    {
        q: "Does it work on Linux?",
        a: <p>Yes. On Mac and Windows the cards float see-through over your desktop; on Linux the sidebar has a solid background in your theme.</p>,
    },
];

export default function SidebarPage() {
    return (
        <FeaturePage
            page="sidebar"
            path="/sidebar"
            seoTitle="CoolDesk Sidebar: Your Project Beside Your Work (Free for Mac & Windows)"
            seoDescription="Dock CoolDesk to the edge of your screen: what's open, your workspaces, clipboard history, a shell and your folders in one see-through sidebar that tucks away until you hover it. Free."
            crumb="Sidebar"
            title="Your project, beside your work."
            intro="Dock CoolDesk to the side of your screen and keep what you’re working on in reach: what’s open, your workspaces, your clipboard, a shell and your folders. It tucks away to a thin handle and slides back when you hover it."
            hero={SHOTS.sidebar}
            secondary={{ href: "#cards", label: "What’s in it" }}
            index={[
                { id: "cards", label: "What’s in it" },
                { id: "active", label: "What’s open" },
                { id: "away", label: "Out of the way" },
                { id: "switch", label: "Switching layouts" },
            ]}
            faq={FAQ}
            ctaTitle="Keep your project one hover away"
        >
            <Section id="cards" title="What’s in it">
                <p>The sidebar is a stack of cards, top to bottom:</p>
                <Rows rows={CARDS} width="sm:w-32" />
                <p className="text-[15px] text-white/60">Clipboard and passwords stay hidden until you switch them on in Settings.</p>
            </Section>

            <Section id="active" title="What’s open, at a glance">
                <p>The Active card lists the apps running and the tabs open right now. Click one to bring it forward. Below it, your workspaces’ links, apps and folders work the same way: open if it isn’t, focus it if it is.</p>
                <Shot shot={SHOTS.sidebarActive} />
            </Section>

            <Section id="away" title="Out of the way until you need it">
                <p>The cards float over your desktop with no panel behind them. Move away and the sidebar tucks back to a thin handle at the screen edge; hover the handle to bring it back.</p>
                <Shot shot={SHOTS.sidebarHandle} />
            </Section>

            <Section id="switch" title="Sidebar, dock or full window">
                <p>
                    Press <Kbd>Ctrl+Shift+D</Kbd> or the layout button to cycle CoolDesk through Full window, Sidebar and <Link to="/dock" className={link}>Dock</Link>. Full window gives you the <Link to="/browser" className={link}>browser</Link>, files and notes; the sidebar keeps the essentials beside whatever else you’re doing.
                </p>
            </Section>
        </FeaturePage>
    );
}
