import FeaturePage, { Kbd, link, Rows, Section } from "@/components/new/FeaturePage";
import Shot from "@/components/new/Shot";
import { SHOTS } from "@/config/shots";
import { Link } from "react-router-dom";

/**
 * The built-in file manager.
 *
 * Claims follow cooldesk-extension/src/features/file-manager/FileManager.jsx:
 *   project bar of saved commands, linked projects, places / recent /
 *   pinned, list or grid view, Quick-Look-style preview column, single-click
 *   open, hover prefetch, extract/compress (archive.rs), drag out (nativeDrag),
 *   copy path, open in system file manager, keys (↑↓ Enter Backspace Ctrl+L,
 *   Alt+←/→, type to filter), live folder updates (CHANGELOG 2.0.15).
 */

const KEYS: [string, React.ReactNode][] = [
    ["↑ ↓  Enter", "move and open"],
    ["Backspace", "up one folder"],
    ["Alt+← / →", "back and forward"],
    ["Ctrl+L", "type a path"],
    ["Any letter", "filter the folder as you type"],
];

const FAQ = [
    {
        q: "Does it replace Finder or Explorer?",
        a: <p>No. It’s for getting around your projects fast. For renaming, copying or file properties, <strong className="text-white">Open in system file manager</strong> is one click away.</p>,
    },
    {
        q: "Which archives can it open?",
        a: <p>Zip and tar (.gz, .xz, .bz2) everywhere, plus 7z and rar on Mac and Windows. Extract one where it sits, or compress a file or folder to a .zip. To look inside first, open it in the <Link to="/browser" className={link}>built-in browser</Link>.</p>,
    },
    {
        q: "Does it see changes made by other apps?",
        a: <p>Yes. The open folder updates by itself, so a finished download or a file saved from your editor shows up without a refresh.</p>,
    },
];

export default function FileManagerPage() {
    return (
        <FeaturePage
            page="file_manager"
            path="/file-manager"
            seoTitle="CoolDesk File Manager: Folders That Know Their Project (Free)"
            seoDescription="A fast file manager built into CoolDesk: your project's commands in one row, linked projects, previews, archives and keyboard navigation. Free for Mac, Windows and Linux."
            crumb="File manager"
            title="A file manager that knows your projects."
            intro="Browse a workspace’s folders with its commands one click away: start the dev server, run the build, jump to the linked backend. Preview files, open archives and drag anything out, all from the keyboard if you like."
            hero={SHOTS.fileManager}
            index={[
                { id: "commands", label: "Project commands" },
                { id: "linked", label: "Linked projects" },
                { id: "preview", label: "Preview" },
                { id: "archives", label: "Archives & drag-out" },
                { id: "keys", label: "Keyboard" },
            ]}
            faq={FAQ}
            ctaTitle="Get to the right folder, and the right command"
        >
            <Section id="commands" title="The project’s commands, in one row">
                <p>
                    Wherever you are inside a project, its saved commands sit along the top: Vite dev, Build, Lint, whatever you’ve added. Each runs in its own <Link to="/shell" className={link}>terminal</Link> at the project’s root, so you can watch it.
                </p>
            </Section>

            <Section id="linked" title="Linked projects, one jump away">
                <p>Link projects that belong together, like an app and its backend, and move between them from the side list. Places, recent locations and pinned folders are there too.</p>
            </Section>

            <Section id="preview" title="Look before you open">
                <p>Turn on the preview column and the file under your cursor shows beside the list: code with highlighting, Markdown rendered, images, and more. Click a file to open it in its usual app.</p>
                <p>Switch between a list and a grid. Hovering a folder loads it before you click, so moving around feels instant.</p>
                <Shot shot={SHOTS.fileManagerPreview} />
            </Section>

            <Section id="archives" title="Archives and drag-out">
                <p><strong className="text-white">Extract here</strong> unpacks a zip, tar, 7z or rar right where it is, and <strong className="text-white">Compress</strong> turns a file or folder into a .zip. The folder updates as soon as it’s done.</p>
                <p>Drag files out to any app, and copy a path in one click.</p>
                <Shot shot={SHOTS.fileManagerArchive} />
            </Section>

            <Section id="keys" title="Built for the keyboard">
                <Rows rows={KEYS} width="sm:w-28" />
                <p className="text-[15px] text-white/60">
                    <Kbd>Esc</Kbd> closes it.
                </p>
            </Section>
        </FeaturePage>
    );
}
