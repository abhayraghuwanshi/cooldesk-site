import FeaturePage, { Kbd, link, Rows, Section } from "@/components/new/FeaturePage";
import Shot from "@/components/new/Shot";
import { SHOTS } from "@/config/shots";
import { Link } from "react-router-dom";

/**
 * Spotlight: CoolDesk's one search, as a global overlay (Alt+K) and as the
 * bar at the top of the full window.
 *
 * Claims follow cooldesk-extension:
 *   one search, overlay + embedded             CHANGELOG "Unified search" (GlobalSpotlight.jsx)
 *   Alt+K default, changeable in Settings      SettingsModal.jsx (set_spotlight_shortcut)
 *   tabs, saved links, bookmarks, history of   commit c10e9a8: /browser-history (Chrome, Arc,
 *   Chromium browsers (all profiles), typo     Brave, Edge, Vivaldi, Chromium), searchScoring.js,
 *   tolerance, jump to an open tab             open page → switch to its tab
 *   /u /a /f scopes as pills                   CHANGELOG 2.0.15
 *   Tab between sections, ←/→ workspaces       CHANGELOG "keyboard navigation overhaul"
 *   file preview (code, Markdown)              PreviewPane.jsx
 *   learns which result you pick               CHANGELOG "Search click learning"
 *   "> cmd" runs in a CoolDesk shell           features/terminal/runInTerminal.js
 *   /agent: Claude Code, opencode, Codex CLI;  aiAdapters.js, sidecar/mcp.rs (read-only);
 *   proposals you apply                        CHANGELOG 2.0.15 proposals
 *   /new-workspace, /edit-workspace            useNewWorkspaceMode.js, useEditWorkspaceMode.js
 */

const FINDS: [string, React.ReactNode][] = [
    ["Open tabs", "in your browser (with the CoolDesk extension) and in CoolDesk’s own browser. Picking one switches to it instead of opening a copy."],
    ["History", "read from Chrome, Arc, Brave, Edge, Vivaldi and Chromium, every profile, one row per page"],
    ["Apps", "installed and running; a running app comes to the front"],
    ["Files & folders", "with a preview of code and Markdown before you open them"],
    ["Workspaces", "and everything saved in them: links, apps, folders, notes"],
];

const SCOPES: [string, React.ReactNode][] = [
    ["/u", "web pages only: tabs, bookmarks, history"],
    ["/a", "apps only"],
    ["/f", "files and folders only"],
    [">", <>run a command in a <Link to="/shell" className={link}>CoolDesk shell</Link></>],
    ["/agent", "ask an AI agent about your work"],
    ["/new-workspace", "set up a workspace for a project"],
];

const FAQ = [
    {
        q: "How is it different from macOS Spotlight or the Windows search?",
        a: <p>It knows your work, not just your disk: open tabs across browsers, your browsing history, and which workspace things belong to. And it does the same on Mac, Windows and Linux.</p>,
    },
    {
        q: "Can I change the shortcut?",
        a: (
            <p>
                Yes. <Kbd>Alt+K</Kbd> is the default; pick another in Settings.
            </p>
        ),
    },
    {
        q: "Does my history leave my computer?",
        a: (
            <p>
                No. Spotlight reads your browsers’ history files on your own computer, and its ranking lives there too. The <Link to="/privacy-details" className={link}>privacy policy</Link> has the details.
            </p>
        ),
    },
    {
        q: "What does the agent need?",
        a: <p>An AI coding CLI you already use, such as Claude Code, opencode or Codex CLI. CoolDesk runs it for you; the agent can look up your tabs, history and apps but can’t change anything. Changes only happen when you apply a proposal.</p>,
    },
];

export default function SpotlightPage() {
    return (
        <FeaturePage
            page="spotlight"
            path="/spotlight"
            seoTitle="CoolDesk Spotlight: Search Tabs, History, Apps and Files from Anywhere (Free)"
            seoDescription="Press Alt+K anywhere to search your open tabs across browsers, browsing history, apps, files and workspaces in one place. Run commands and ask an AI agent too. Free for Mac, Windows and Linux."
            crumb="Spotlight"
            title="One search for everything you work with."
            intro={
                <>
                    Press <Kbd>Alt+K</Kbd> from any app to find an open tab, a page from last week, an app, a file or a whole workspace. Pick it and you’re there: the tab comes forward instead of opening twice.
                </>
            }
            hero={SHOTS.spotlight}
            secondary={{ href: "#commands", label: "See the commands" }}
            index={[
                { id: "finds", label: "What it finds" },
                { id: "commands", label: "Narrow it down" },
                { id: "keys", label: "Keyboard" },
                { id: "agent", label: "Ask the agent" },
                { id: "learns", label: "It learns" },
            ]}
            faq={FAQ}
            ctaTitle="Find anything in two keystrokes"
        >
            <Section id="finds" title="What it finds">
                <p>One box, every kind of thing you work with:</p>
                <Rows rows={FINDS} width="sm:w-32" />
                <p>A typo is fine, and words match in any order, so “boss big” still finds “Bigg Boss”.</p>
                <Shot shot={SHOTS.spotlightPreview} />
            </Section>

            <Section id="commands" title="Narrow it down">
                <p>Start with a scope or a command to change what the box does:</p>
                <Rows rows={SCOPES} width="sm:w-36" />
                <p>Scopes turn into a pill next to the box; Backspace on an empty box removes it.</p>
            </Section>

            <Section id="keys" title="Built for the keyboard">
                <Rows
                    rows={[
                        ["↑ ↓  Enter", "move and open"],
                        ["Tab", "jump between result sections"],
                        ["← →", "switch workspace"],
                        ["Esc", "close"],
                    ]}
                    width="sm:w-28"
                />
                <p>
                    The same search sits at the top of CoolDesk when it’s a full window, and the <Link to="/sidebar" className={link}>sidebar</Link> and <Link to="/dock" className={link}>dock</Link> are one shortcut away from it.
                </p>
            </Section>

            <Section id="agent" title="Ask the agent">
                <p>
                    Type <code className="text-white">/agent</code> and ask in plain words: “sort my open tabs into workspaces”, “what was I reading about Tauri?”. It runs the AI coding CLI you already have (Claude Code, opencode or Codex CLI), and can look up your tabs, history and apps on its own.
                </p>
                <p>It never changes anything by itself. You get a proposal showing what would move where; keep or skip each line, then apply.</p>
            </Section>

            <Section id="learns" title="It learns what you pick">
                <p>When you choose a result for a search, Spotlight remembers and ranks it higher next time. All of that stays on your computer.</p>
            </Section>
        </FeaturePage>
    );
}
