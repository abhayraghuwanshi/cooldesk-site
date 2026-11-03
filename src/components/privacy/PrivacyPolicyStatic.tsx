import React from "react";
import Navbar from "@/components/new/Navbar";
import SEO from "@/components/SEO";

interface PolicySectionProps {
    id: string;
    title: string;
    children: React.ReactNode;
}

const PolicySection: React.FC<PolicySectionProps> = ({ id, title, children }) => (
    <section id={id} className="mb-10 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">{title}</h2>
        <div className="text-gray-700 leading-relaxed space-y-3">{children}</div>
    </section>
);

const PolicyNav: React.FC = () => {
    const sections = [
        { id: "overview", label: "Overview" },
        { id: "info-we-collect", label: "Information We Collect" },
        { id: "how-we-use", label: "How We Use Your Data" },
        { id: "permissions", label: "Chrome Permissions" },
        { id: "desktop-app", label: "Windows Desktop App" },
        { id: "ai-features", label: "AI Features (Your Own Key)" },
        { id: "team-sharing", label: "Team Sharing & Spaces" },
        { id: "app-analytics", label: "Anonymous Usage Analytics" },
        { id: "website-analytics", label: "Website Analytics" },
        { id: "security", label: "Data Security" },
        { id: "user-rights", label: "User Control & Rights" },
        { id: "compliance", label: "Compliance" },
        { id: "contact", label: "Contact" },
        { id: "summary", label: "Summary" },
    ];

    return (
        <nav className="hidden lg:block w-64 shrink-0 border-r border-gray-200 p-6 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Contents</p>
            <ul className="space-y-2">
                {sections.map((section) => (
                    <li key={section.id}>
                        <a
                            href={`#${section.id}`}
                            className="text-sm text-gray-500 hover:text-gray-900 hover:underline block py-0.5"
                        >
                            {section.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

const PrivacyPolicyStatic: React.FC = () => {
    return (
        <main className="bg-white text-gray-800 font-sans min-h-screen">
            <SEO
                title="Privacy Policy — CoolDesk"
                description="How CoolDesk handles your data: everything stays local in your browser, no sign-in required. Read our full privacy policy, Chrome permissions and your rights."
                canonical="https://cool-desk.com/privacy-details"
            />
            <Navbar />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row pt-20">
                <PolicyNav />

                <div className="flex-1 px-6 py-12 lg:px-16 max-w-3xl">
                    <header className="mb-12">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
                        <p className="text-gray-500 text-sm">Last updated: November 2026</p>
                        <p className="mt-4 text-gray-600 text-sm bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
                            This policy covers both the <strong>CoolDesk browser extension</strong> and the <strong>CoolDesk desktop app</strong> (Windows, macOS and Linux). Everything runs locally and <strong>no sign-up or account is required</strong>. Data only leaves your device in three opt-in or opt-out cases: an anonymous <a href="#app-analytics" className="underline text-blue-600">usage ping</a>, optional <a href="#ai-features" className="underline text-blue-600">cloud AI</a> using your own key, and <a href="#team-sharing" className="underline text-blue-600">Team Sharing</a> when you choose to share with others. Website traffic is covered separately under <a href="#website-analytics" className="underline text-blue-600">Website Analytics</a>.
                        </p>
                    </header>

                    <PolicySection id="overview" title="Overview">
                        <p>
                            CoolDesk helps you organise browser tabs, desktop apps, links, and notes by project — all in one place. This policy explains what data we access, how it stays on your device, and your rights as a user.
                        </p>
                        <p className="font-medium text-gray-900">
                            Core principle: your browsing data stays on your device by default, and CoolDesk does not operate servers that store your personal data. Anything only leaves your device in three cases you control: the opt-out anonymous usage ping, the optional cloud AI mode you turn on with your own key, and Team Sharing when you choose to share a Space with others — all described below.
                        </p>
                    </PolicySection>

                    <PolicySection id="info-we-collect" title="Information We Collect">
                        <p>CoolDesk stores data <strong>locally on your device</strong> using Chrome's built-in storage. This includes:</p>
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li>Browsing history — limited to 30 days, max 1,000 items, used for Spotlight search</li>
                            <li>Bookmarks — for workspace organisation</li>
                            <li>Open tabs — to enable quick access and workspace grouping</li>
                            <li>Notes — text you explicitly save within the extension</li>
                            <li>Workspace configurations — project names, saved URLs, and preferences</li>
                            <li>Page engagement signals — for pages you visit, the extension measures simple interaction metrics: time on page, scroll depth, and the <strong>number</strong> of clicks, key-presses, and form submissions, plus how often you return to a site. These are counts and event types only — it does <strong>not</strong> record the text you type, your form values, keystrokes, or page content. Used to rank and auto-categorise URLs so Spotlight and workspaces surface the sites that matter to you.</li>
                        </ul>
                        <p className="text-sm text-gray-500 mt-2">
                            All of this is stored on your device (Chrome storage and, if you use the desktop app, mirrored to it locally on the same machine). None of it is transmitted to CoolDesk's servers or any third party.
                        </p>
                    </PolicySection>

                    <PolicySection id="how-we-use" title="How We Use Your Data">
                        <p>Locally stored data powers these features:</p>
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li><strong>GlobalSpotlight (Alt+K)</strong> — searches your tabs, history, bookmarks, notes, and workspaces instantly</li>
                            <li><strong>Workspaces</strong> — groups your saved URLs and apps by project</li>
                            <li><strong>Smart Tab Management</strong> — auto-groups open tabs by domain or project</li>
                            <li><strong>Smart ranking &amp; categorisation</strong> — uses the on-page engagement signals above to rank your most-used sites and auto-categorise URLs, so the most relevant results appear first</li>
                            <li><strong>Notes</strong> — quick capture on new tab, including voice dictation stored locally</li>
                            <li><strong>AI SmartWorkspace</strong> — suggests project groupings from your activity. It runs on a local AI model by default; an optional cloud mode uses an API key you provide (see <a href="#ai-features" className="underline text-blue-600">AI Features</a>)</li>
                        </ul>
                        <p className="text-sm text-gray-500 mt-2">All processing happens on your device.</p>
                    </PolicySection>

                    <PolicySection id="permissions" title="Chrome Permissions">
                        <p>CoolDesk requests the following Chrome permissions and uses them only as described:</p>
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li><strong>tabs</strong> — read open tabs for workspace grouping and Spotlight search</li>
                            <li><strong>history</strong> — read recent browsing history (30 days) for search suggestions</li>
                            <li><strong>bookmarks</strong> — read bookmarks for workspace organisation</li>
                            <li><strong>storage</strong> — save your workspaces, notes, and preferences locally</li>
                            <li><strong>newtab override</strong> — replace the new tab page with the CoolDesk dashboard</li>
                            <li><strong>content scripts</strong> — a lightweight script runs on the web pages you visit to measure the on-page engagement signals described above (click/scroll/time counts). It reads interaction counts only — not page content, form values, or what you type — and never sends them off your device.</li>
                        </ul>
                        <p className="text-sm text-gray-500 mt-2">
                            Aside from the engagement-measuring content script above, we do not request broad host permissions or use page access to read your page content. We request no permission beyond what is necessary for the described features.
                        </p>
                    </PolicySection>

                    <PolicySection id="desktop-app" title="Windows Desktop App">
                        <p>
                            The optional CoolDesk Windows app (currently in beta) extends Spotlight search to include your <strong>running Windows applications</strong> (e.g. VS Code, Slack, Postman).
                        </p>
                        <p className="font-medium text-gray-900">
                            No account, sign-up, or login is required. The app runs entirely on your machine — your apps, windows, workspaces, and notes never leave your device.
                        </p>
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li>The app reads the list of currently running processes and open windows (including window titles) from the Windows OS</li>
                            <li>It can derive the names and paths of <strong>project folders you currently have open</strong> — parsed from the window titles of code editors, terminals, and File Explorer (e.g. a VS Code or terminal path). It may check the folder on disk to resolve the project root, but it does <strong>not</strong> read your file contents or index your drive</li>
                            <li>This information is used to surface running apps and open folders in Spotlight, to focus the window you pick, and — only if you choose — to save an app or folder into a workspace, which is stored locally</li>
                            <li>App names, window titles, and folder paths are never sent to CoolDesk's servers. The one exception is if you enable cloud AI, in which case they may be sent to your chosen AI provider — see <a href="#ai-features" className="underline text-blue-600">AI Features</a></li>
                        </ul>
                        <p className="text-sm text-gray-500 mt-2">
                            The desktop app is not required. The browser extension works fully without it. By default the only data it sends off your device is the anonymous usage ping described below — and that can be turned off. Optional cloud AI is the only other case where data leaves your device, and only when you enable it.
                        </p>
                    </PolicySection>

                    <PolicySection id="ai-features" title="AI Features (Bring Your Own Key)">
                        <p>
                            CoolDesk's AI workspace suggestions can run in two modes, and you choose which:
                        </p>
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li><strong>Local AI (default, fully private)</strong> — a model running locally on your machine. Nothing leaves your device.</li>
                            <li><strong>Cloud AI (optional, your own key)</strong> — you connect your own OpenAI or Anthropic API key. CoolDesk does not provide, resell, or proxy an AI service; requests go directly from your device to the provider you chose, billed to your own account.</li>
                        </ul>
                        <p className="mt-3">When you use cloud AI:</p>
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li>The context needed for the suggestion — such as your workspace names, open tabs, recent history titles and URLs, running app and window titles, and open project folder names — is sent to your chosen provider to generate the response, and is then handled under <strong>that provider's privacy policy</strong> (<a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">OpenAI</a> / <a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">Anthropic</a>).</li>
                            <li>Your API key is stored locally and <strong>encrypted at rest</strong> (Windows DPAPI). It is never transmitted to CoolDesk.</li>
                            <li>Cloud AI is off until you add a key. CoolDesk never sends your AI context to its own servers in either mode.</li>
                        </ul>
                    </PolicySection>

                    <PolicySection id="team-sharing" title="Team Sharing & Spaces">
                        <p>
                            CoolDesk includes an optional <strong>Spaces</strong> feature for sharing links, notes, saved items, and a shared "space context" (a goal, today's focus, and notices) with people you choose. It is <strong>off until you create or join a Space</strong>, and no account or sign-up is required.
                        </p>
                        <p className="font-medium text-gray-900">
                            A Space is opened with a <strong>shared secret phrase</strong>. That phrase is the key: on your device it is turned into a room ID and an encryption key — the phrase itself is never uploaded. Anyone who has the phrase can join the Space and read its contents, so treat it like a password and share it only with people you trust.
                        </p>
                        <p className="mt-3">How the data moves:</p>
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li><strong>Peer-to-peer &amp; end-to-end encrypted.</strong> Space data syncs directly between members' devices over WebRTC and is encrypted with the key derived from your secret phrase.</li>
                            <li><strong>Signaling server.</strong> A lightweight signaling server helps members discover and connect to each other. It sees only the Space's connection ID — never your decrypted content.</li>
                            <li><strong>Relay servers.</strong> To connect across firewalls and networks, WebRTC may route traffic through third-party STUN/TURN relays (e.g. Google STUN and Open Relay). Because the data is end-to-end encrypted, these relays only ever carry ciphertext.</li>
                            <li><strong>No central store.</strong> CoolDesk does not operate a server that stores your Space content — it lives only on members' devices.</li>
                        </ul>
                        <p className="mt-3">What is shared inside a Space:</p>
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li>The items you add — links, notes, and saved data, including their titles, URLs, and tags</li>
                            <li>The shared space context — goal, today's focus, notices, and the alert flag</li>
                            <li>Your <strong>display name and colour</strong>, so members can see who's present. This is a name you set; no email or account is attached.</li>
                        </ul>
                        <p className="text-sm text-gray-500 mt-3">
                            You stay in control: you can pause syncing for a Space at any time, and leaving a Space stops sharing your data with it. Only the data you put into a Space is shared — your personal tabs, history, and private workspaces are never shared unless you explicitly add them.
                        </p>
                    </PolicySection>

                    <PolicySection id="app-analytics" title="Anonymous Usage Analytics">
                        <p>
                            To understand how many people use CoolDesk, how often, and which features are worth improving, the desktop app (Windows, macOS and Linux) sends a small <strong>anonymous heartbeat</strong> to our analytics endpoint. The same request doubles as the check for app updates. It is sent when the app starts, every few hours while it runs, and once on each new day you use it. The very first launch also sends one, before any window opens, so we can tell how many installs start at all.
                        </p>
                        <p>The heartbeat contains only these non-identifying fields:</p>
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li><strong>Install ID</strong> — a random identifier generated on your device the first time the app runs (a UUID). It is not tied to your name, email, or any account, and is used only to avoid double-counting the same install.</li>
                            <li><strong>Operating system</strong> — e.g. "windows"</li>
                            <li><strong>App version</strong> — e.g. 2.0.18</li>
                            <li><strong>Install source</strong> — how you installed the app (e.g. winget or a direct download)</li>
                            <li><strong>Release channel</strong> — whether this is a public release or a test build</li>
                            <li><strong>Locale</strong> — your system language, two letters only, e.g. "en"</li>
                            <li><strong>Active minutes</strong> — how many minutes you interacted with a CoolDesk window. Only <em>that</em> input happened is counted, never which keys, clicks or text.</li>
                            <li><strong>Feature counts</strong> — how many times you used a fixed list of features: opening Spotlight, opening a result (and whether it was a tab, link, app or file — never which one), opening or creating a workspace, asking the agent, re-copying from clipboard history, unlocking the vault, turning on the dock, finishing onboarding</li>
                            <li><strong>Delivery count</strong> — how many earlier heartbeats failed to arrive, so counts from offline days are added late rather than lost</li>
                            <li><strong>One optional rating</strong> — after you have used CoolDesk on seven different days, the app asks once how it's going (three fixed answers). It is only sent if you answer.</li>
                        </ul>
                        <p className="mt-3">
                            When you uninstall the Windows app or the browser extension, a CoolDesk page opens where you can, optionally, pick the main reason from a fixed list. That answer is stored with only the date, the version and whether it was the app or the extension — no install ID.
                        </p>
                        <p className="mt-3">We explicitly do <strong>not</strong> collect or store:</p>
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li>Your IP address (it is never logged or stored)</li>
                            <li>Search queries, URLs, page contents, notes, passwords, clipboard contents, or workspace data</li>
                            <li>The names of your apps, windows, files, workspaces, or any free-text content</li>
                            <li>Any cross-site or advertising identifier</li>
                        </ul>
                        <p className="text-sm text-gray-500 mt-3">
                            <strong>Opt out anytime:</strong> turn off "Anonymous Usage Stats" in the app's settings. With it off, the app sends none of the above — no heartbeat, no counts, no rating prompt — and checks for updates directly from GitHub instead.
                        </p>
                    </PolicySection>

                    <PolicySection id="website-analytics" title="Website Analytics">
                        <p>
                            The <strong>cool-desk.com website</strong> (not the extension) uses Google Analytics (GA4) to collect anonymous usage statistics such as page views and session duration. This helps us understand which content is useful.
                        </p>
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li>Analytics apply only to the marketing website, not the extension or desktop app</li>
                            <li>No personally identifiable information is collected via analytics</li>
                            <li>You can opt out using the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">Google Analytics Opt-out Browser Add-on</a></li>
                        </ul>
                    </PolicySection>

                    <PolicySection id="security" title="Data Security">
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li>Extension data remains on your device — Chrome handles local storage encryption</li>
                            <li>No CoolDesk server receives your browsing, tab, or workspace data (the only off-device cases are the anonymous usage ping, optional cloud AI you enable with your own key, and Team Sharing — which is peer-to-peer and end-to-end encrypted, with no content stored on our servers)</li>
                            <li>Strict Content Security Policy prevents unauthorised network requests</li>
                            <li>The only script the extension runs on third-party pages is the engagement-measuring content script described under Chrome Permissions; it reads interaction counts, not page content, and sends nothing off your device</li>
                        </ul>
                    </PolicySection>

                    <PolicySection id="user-rights" title="User Control & Rights">
                        <p>You have full control over your data:</p>
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li>View all stored data via Chrome DevTools → Application → Storage</li>
                            <li>Delete individual items or clear all data from within the extension settings</li>
                            <li>Uninstalling CoolDesk removes all locally stored data</li>
                        </ul>
                    </PolicySection>

                    <PolicySection id="compliance" title="Compliance">
                        <p>
                            CoolDesk complies with the <a href="https://chromewebstore.google.com/user_data_faq" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">Chrome Web Store User Data Policy</a> and the Limited Use Policy. We do not sell, share, or transfer user data to third parties.
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            If cloud sync or cross-device features are added in the future, this policy will be updated and users will be notified before any data leaves their device.
                        </p>
                    </PolicySection>

                    <PolicySection id="contact" title="Contact & Questions">
                        <p>For privacy questions or data requests:</p>
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li>Email: <a href="mailto:raghuwanshi.abhay405@gmail.com" className="underline text-blue-600">raghuwanshi.abhay405@gmail.com</a></li>
                            <li>Contact form: <a href="/contact" className="underline text-blue-600">cool-desk.com/contact</a></li>
                        </ul>
                        <p className="text-sm text-gray-500 mt-2">We aim to respond within 5 business days.</p>
                    </PolicySection>

                    <PolicySection id="summary" title="Summary">
                        <ul className="list-disc ml-5 mt-2 space-y-1.5">
                            <li>Everything runs locally — no account, sign-up, or login required</li>
                            <li>Your browsing, tabs, notes, workspaces, and apps stay on your device — never sent to our servers</li>
                            <li>No tracking, ads, or third-party data sharing</li>
                            <li>The desktop app sends only an anonymous daily usage ping (random ID, OS, version, locale, Spotlight count) — no IP, no content — and you can turn it off</li>
                            <li>AI is optional: it runs locally by default, or with your own OpenAI/Anthropic key — CoolDesk never stores your key or proxies your data</li>
                            <li>Team Sharing is optional and end-to-end encrypted: only data you put in a Space is shared, peer-to-peer with people who have your secret phrase — CoolDesk never stores your Space content</li>
                            <li>Chrome permissions used only for the features described above</li>
                            <li>Website uses Google Analytics (anonymous, opt-outable)</li>
                            <li>You can delete all data at any time by uninstalling</li>
                        </ul>
                        <p className="mt-4 font-medium text-gray-800">
                            Your privacy is central to CoolDesk — productivity without compromise.
                        </p>
                    </PolicySection>

                    <footer className="mt-16 pt-8 border-t border-gray-100 text-sm text-gray-400">
                        <p>© {new Date().getFullYear()} CoolDesk. All rights reserved.</p>
                        <p className="mt-1"><a href="/terms" className="underline hover:text-gray-600">Terms of Service</a></p>
                    </footer>
                </div>
            </div>
        </main>
    );
};

export default PrivacyPolicyStatic;
