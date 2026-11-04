import FeaturePage, { Kbd, link, Section } from "@/components/new/FeaturePage";
import Shot from "@/components/new/Shot";
import { CALLOUTS } from "@/components/new/dockCallouts";
import { SHOTS } from "@/config/shots";
import { Link } from "react-router-dom";

/**
 * The bottom bar ("bar" layout).
 *
 * Claims follow cooldesk-extension:
 *   two views (Active / workspace), dot for open, focus-or-launch,
 *   folder chips with stack logo, git branch/dirty and dev server,
 *   inline workspace picker, scroll over the name to step workspaces,
 *   hover label inside the bar                  features/dock/WorkspaceDockBar.jsx
 *   full → side → bar, Ctrl+Shift+D             features/dock/useLayoutSwitch.js
 *   drawer: tucks to a handle, slides in on hover,
 *   handle hidden over fullscreen apps          src-tauri/src/dock/*.rs
 *   see-through pill that hugs its content      CHANGELOG 2.0.16
 */

const FAQ = [
    {
        q: "Does it replace the macOS Dock or the Windows taskbar?",
        a: <p>No, it sits alongside them. Your system dock keeps every app; CoolDesk’s dock shows one project’s links, apps and folders, plus what’s open right now.</p>,
    },
    {
        q: "Will it cover my work?",
        a: <p>It tucks away to a thin handle at the bottom of the screen and slides back in when you hover it. The handle hides itself while a full-screen app, game or video is in front.</p>,
    },
    {
        q: "How do I switch to it?",
        a: (
            <p>
                Press <Kbd>Ctrl+Shift+D</Kbd> or the layout button to cycle through Full window, <Link to="/sidebar" className={link}>Sidebar</Link> and Dock.
            </p>
        ),
    },
];

export default function DockPage() {
    return (
        <FeaturePage
            page="dock"
            path="/dock"
            seoTitle="CoolDesk Dock: A Project Dock for Mac and Windows (Free)"
            seoDescription="A slim, see-through dock along the bottom of your screen with one project's links, apps and folders, its git branch and running dev servers. Switch projects in a click. Free."
            crumb="Dock"
            title="A dock for the project you’re on."
            intro="A slim bar along the bottom of your screen with the current workspace’s links, apps and folders. A dot marks what’s already open; click to bring it forward, or to launch it if it isn’t."
            hero={SHOTS.dockBar}
            secondary={{ href: "#switch", label: "Switch projects" }}
            index={[
                { id: "bar", label: "What’s on it" },
                { id: "active", label: "Active view" },
                { id: "switch", label: "Switch projects" },
                { id: "away", label: "Out of the way" },
            ]}
            faq={FAQ}
            ctaTitle="Put your project along the bottom of the screen"
        >
            <Section id="bar" title="What’s on it">
                <ul className="list-disc space-y-2 pl-6 marker:text-white/35">
                    {CALLOUTS.map((c) => (
                        <li key={c.label}>{c.label}</li>
                    ))}
                </ul>
                <p>Every item is a labelled chip. Folder chips show the project’s stack, its git branch (and whether there are changes), and a dev server running from it.</p>
                <p>Hover any chip and its name shows right in the bar, with no tooltip delay.</p>
                <Shot shot={SHOTS.dockDesktop} />
            </Section>

            <Section id="active" title="Everything open right now">
                <p>Click the logo to flip to the Active view: every running app and open browser tab, in or out of a workspace, like the running section of the macOS Dock. Click the logo again to go back to the workspace.</p>
                <Shot shot={SHOTS.dockActive} />
            </Section>

            <Section id="switch" title="Switch projects in a click">
                <p>Click the workspace name and the bar turns into one chip per workspace, most active first. Pick one and its launchers come back. Or just scroll over the name to step to the next or previous workspace.</p>
                <Shot shot={SHOTS.dockPicker} />
            </Section>

            <Section id="away" title="Out of the way until you need it">
                <p>The dock is a see-through pill that hugs its content, so clicks beside it reach the apps behind. It tucks down to a handle and slides up when you hover the bottom edge.</p>
                <p>
                    Want more room? The <Link to="/sidebar" className={link}>sidebar</Link> holds the same workspace plus your clipboard, shell and folders.
                </p>
            </Section>
        </FeaturePage>
    );
}
