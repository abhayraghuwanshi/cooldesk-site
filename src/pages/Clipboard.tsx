import FeaturePage, { link, Rows, Section } from "@/components/new/FeaturePage";
import Shot from "@/components/new/Shot";
import { SHOTS } from "@/config/shots";
import { Link } from "react-router-dom";

/**
 * Clipboard history.
 *
 * Claims follow cooldesk-extension:
 *   opt-in, pause, kinds, 30 days / 300       src-tauri/src/clipboard.rs (TTL_DAYS, MAX_ITEMS)
 *   unpinned, local storage, password-manager
 *   skipping, paused copies never recorded
 *   3 recent + Show all, filters, click to    features/clipboard/ClipboardSection.jsx
 *   copy, inline preview, pin, drag out,
 *   links onto workspace cards, Clear unpinned
 */

const KINDS: [string, string][] = [
    ["Text", "anything you copy, with long text kept in full"],
    ["Code", "snippets, recognised as code and previewed as code"],
    ["Links", "shown by site and path, so you can tell them apart"],
    ["Images", "screenshots and copied pictures, as thumbnails"],
    ["Files", "files you copied in Finder or Explorer"],
    ["Colors", "hex and rgb values, with a swatch"],
];

const FAQ = [
    {
        q: "Is it on by default?",
        a: <p>No. Clipboard history stays off until you turn it on in Settings, and nothing you copied before then is recorded.</p>,
    },
    {
        q: "Does it save my passwords?",
        a: <p>No. Anything a password manager marks as hidden is skipped, as is anything copied while a known password manager is in front. Copies made while history is paused are never recorded either.</p>,
    },
    {
        q: "Where is my history stored?",
        a: (
            <p>
                In CoolDesk’s own folder on your computer. It isn’t synced or uploaded anywhere. The <Link to="/privacy-details" className={link}>privacy policy</Link> has the details.
            </p>
        ),
    },
    {
        q: "How much does it keep?",
        a: <p>The last 300 clips, for up to 30 days. Pinned clips are kept until you unpin them.</p>,
    },
];

export default function ClipboardPage() {
    return (
        <FeaturePage
            page="clipboard"
            path="/clipboard"
            seoTitle="CoolDesk Clipboard History: Find and Drag Out Anything You Copied (Free)"
            seoDescription="Clipboard history in the CoolDesk sidebar: text, code, links, images, files and colors. Filter, preview, pin and drag clips into any app. Off until you turn it on; stays on your computer."
            crumb="Clipboard history"
            title="Everything you copied, one hover away."
            intro="CoolDesk keeps what you copy, text, links, code, images, files and colors, in a card in your sidebar. Click a clip to copy it again, or drag it straight into another app."
            hero={SHOTS.clipboard}
            secondary={{ href: "#privacy", label: "What it never saves" }}
            index={[
                { id: "card", label: "The card" },
                { id: "kinds", label: "What it keeps" },
                { id: "drag", label: "Drag it out" },
                { id: "pin", label: "Pin and clear" },
                { id: "privacy", label: "Privacy" },
            ]}
            faq={FAQ}
            ctaTitle="Stop copying the same thing twice"
        >
            <Section id="card" title="A card in your sidebar">
                <p>
                    The clipboard sits in the <Link to="/sidebar" className={link}>sidebar</Link>, just below your workspaces. It shows your three latest clips; <strong className="text-white">Show all</strong> lists the rest, with filters to narrow them down.
                </p>
                <p>Click a clip to copy it. The eye opens a preview right in the list: the full text, rendered Markdown, the image, or the colour.</p>
                <Shot shot={SHOTS.clipboardAll} />
            </Section>

            <Section id="kinds" title="What it keeps">
                <Rows rows={KINDS} width="sm:w-20" />
            </Section>

            <Section id="drag" title="Drag it where it’s needed">
                <p>Drag a clip out of the list and drop it anywhere: text lands as text, and images and copied files land as real files, ready for an email, a chat or a design tool.</p>
                <p>
                    Drop a link on a workspace card and it’s saved to that workspace. Drop anything into the <Link to="/browser" className={link}>built-in browser</Link> to use it there.
                </p>
            </Section>

            <Section id="pin" title="Pin, pause and clear">
                <ul className="list-disc space-y-2 pl-6 marker:text-white/35">
                    <li><strong className="text-white">Pin</strong> the clips you reuse (an address, a command, a hex code). Pinned clips stay at the top and never expire.</li>
                    <li><strong className="text-white">Pause</strong> from the card when you’re about to copy something private.</li>
                    <li><strong className="text-white">Clear unpinned</strong> wipes the rest in one go. Old clips go on their own after 30 days.</li>
                </ul>
            </Section>

            <Section id="privacy" title="What it never saves">
                <p>Clipboard history is off until you turn it on. When it’s on, it still skips:</p>
                <ul className="list-disc space-y-2 pl-6 marker:text-white/35">
                    <li>anything your password manager marks as hidden,</li>
                    <li>anything copied while a password manager is the app in front,</li>
                    <li>anything copied while history is paused,</li>
                    <li>huge text dumps and giant images.</li>
                </ul>
                <p className="text-[15px] text-white/60">Everything it keeps stays in a folder on your computer.</p>
            </Section>
        </FeaturePage>
    );
}
