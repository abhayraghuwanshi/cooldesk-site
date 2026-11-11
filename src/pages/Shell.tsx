import FeaturePage, { Kbd, link, Rows, Section } from "@/components/new/FeaturePage";
import Shot from "@/components/new/Shot";
import { SHOTS } from "@/config/shots";
import { Link } from "react-router-dom";

/**
 * The built-in shell.
 *
 * Claims follow cooldesk-extension:
 *   real login shell in a pty, xterm.js     src-tauri/src/terminal.rs, features/terminal/TerminalTab.jsx
 *   only CoolDesk's own UI can drive it     terminal.rs require_main + guard_remote_webviews
 *   sidebar shell: starts on first open,    features/terminal/ShellSection.jsx
 *   keeps running collapsed
 *   "> cmd" in the search bar / project     features/terminal/runInTerminal.js
 *   the shell, start in the Browse tab's
 *   folder, system terminal fallback
 *   ⌘K clear, Ctrl+` drawer, restart,       TerminalTab.jsx toolbar
 *   cd here, restored tabs start fresh
 */

const TOOLBAR: [string, React.ReactNode][] = [
    ["Clear", <>Wipe the screen. <Kbd>⌘K</Kbd> on a Mac, as in Terminal.</>],
    ["Restart", "Start a fresh shell in the same folder. For a project command, it runs the command again."],
    ["cd here", "Jump the shell to the folder you’re looking at in the Files panel."],
    ["Hide", <>Tuck the drawer away with <Kbd>Ctrl+`</Kbd>. The shell keeps running.</>],
];

const FAQ = [
    {
        q: "Is it a real terminal?",
        a: <p>Yes. It runs your own login shell (zsh, bash, PowerShell…) with your aliases, prompt and PATH. Anything that works in Terminal or Windows Terminal works here.</p>,
    },
    {
        q: "Can a web page run commands in it?",
        a: <p>No. Only CoolDesk’s own window can start or type into a shell. Pages open in the <Link to="/browser" className={link}>built-in browser</Link> are refused.</p>,
    },
    {
        q: "What happens to my shells when I quit?",
        a: <p>They end, like any terminal window. Terminal tabs come back after a restart as fresh shells in the same folder.</p>,
    },
    {
        q: "Can I still use my usual terminal?",
        a: <p>Of course. And when CoolDesk has no shell on screen (in the browser extension, say), project commands open in your system’s terminal instead.</p>,
    },
];

export default function ShellPage() {
    return (
        <FeaturePage
            page="shell"
            path="/shell"
            seoTitle="CoolDesk Shell: A Terminal in Your Sidebar and Workspace (Free)"
            seoDescription="A real login shell built into CoolDesk: in the docked sidebar, as a tab beside your pages and files, and from the search bar with > command. Free for Mac, Windows and Linux."
            crumb="Shell"
            title="A terminal that stays with the project."
            intro="CoolDesk has a real shell built in: one in the sidebar, and as many as you like as tabs next to your pages and files. Type > and a command into the search bar and it runs there, in the right folder."
            hero={SHOTS.shellSidebar}
            secondary={{ href: "#search", label: "Run from the search bar" }}
            index={[
                { id: "sidebar", label: "In the sidebar" },
                { id: "tabs", label: "As a tab" },
                { id: "search", label: "From the search bar" },
                { id: "commands", label: "Project commands" },
                { id: "controls", label: "Controls" },
            ]}
            faq={FAQ}
            ctaTitle="Keep a shell one hover away"
        >
            <Section id="sidebar" title="A shell in the sidebar">
                <p>
                    When CoolDesk is docked as a <Link to="/sidebar" className={link}>sidebar</Link>, the Shell card sits below your clipboard. It starts the first time you open it and keeps running when you collapse it, so a dev server or a long build carries on while you work.
                </p>
            </Section>

            <Section id="tabs" title="Terminals as tabs">
                <p>
                    In the <Link to="/browser" className={link}>browser</Link>, a terminal is a tab like any page or file, with Back and Forward across all of them. Open as many as you need, or pull one up as a drawer at the bottom with <Kbd>Ctrl+`</Kbd>.
                </p>
                <p>Colours follow your theme, light or dark. Switching tabs only hides a shell; closing the tab ends it.</p>
                <Shot shot={SHOTS.shellTab} />
            </Section>

            <Section id="search" title="Run a command from the search bar">
                <p>
                    In <Link to="/spotlight" className={link}>Spotlight</Link> (<Kbd>Alt+K</Kbd> from anywhere, or the search bar at the top of CoolDesk), type <Kbd>&gt;</Kbd> and a command, like <code className="text-white">&gt; git status</code>, and press Enter. It’s typed into a real shell, so <code className="text-white">cd</code>, <code className="text-white">&amp;&amp;</code>, pipes and aliases all work, and the shell stays open for what comes next.
                </p>
                <p>It starts in the folder of the tab you’re working in, or your home folder if there isn’t one.</p>
                <p>For a full terminal right in Spotlight, type <code className="text-white">/shell</code>. It keeps running when Spotlight closes, so a dev server or a long build is still there when you come back. <code className="text-white">/todo</code> and <code className="text-white">/notes</code> sit next to it, for the workspace’s to-dos and notes.</p>
                <Shot shot={SHOTS.shellSearch} />
            </Section>

            <Section id="commands" title="Project commands, where you can see them">
                <p>
                    Save a workspace’s commands once (start the dev server, build, lint) and run them from the <Link to="/file-manager" className={link}>file manager</Link>’s project bar or the search bar. Each opens in a terminal titled after the command, already in the project’s folder.
                </p>
            </Section>

            <Section id="controls" title="Controls">
                <Rows rows={TOOLBAR} width="sm:w-24" />
            </Section>
        </FeaturePage>
    );
}
