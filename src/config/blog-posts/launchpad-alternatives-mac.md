# Launchpad Is Gone in macOS Tahoe: The Best Launchpad Alternatives (2026)

Apple removed Launchpad in macOS 26 Tahoe, and macOS 27 didn't bring it back. Here's what replaced it, why the Terminal trick no longer works, and an honest comparison of LaunchOS, Launchie, LaunchNext, Raycast, Alfred and CoolDesk.

If you upgraded and your grid of apps disappeared, you're not alone. In macOS 26 Tahoe Apple replaced Launchpad with **Apps**, an app browser built into Spotlight. macOS 27 Golden Gate kept it. Apps lists everything alphabetically with category filters along the top, but you can't make your own folders or arrange pages. For many people that was the whole point of Launchpad.

Full disclosure: **we make one of the tools on this list** (CoolDesk). So the usual rule applies: for every tool, including ours, we say what it's genuinely best at *and* where another tool beats it.

## Can you get the real Launchpad back?

Not anymore. Early in the Tahoe betas, a Terminal command that switched off the new Spotlight brought the old Launchpad back. Apple blocked it in later builds, and it doesn't work on current macOS 26 or 27. Be wary of guides that still recommend it.

What you can do:

- **Use Apps.** Press **⌘ Space** and then **⌘ 1**, click the Apps icon in the Dock, or use the Launchpad key and the trackpad pinch gesture you already know. It's the free, built-in option. You just can't organize it.
- **Add the Applications folder to the Dock.** Drag Applications from Finder to the right side of the Dock, right-click it and choose **View content as: Grid**. You get a scrollable grid of every app, one click away. It's free, but it's a folder, not a launcher.
- **Install a replacement.** If you want your folders and pages back, the apps below are built for exactly that.

## The short version

| Tool | Price | Type | Best for |
| --- | --- | --- | --- |
| Apps (built in) | Free | App browser in Spotlight | Not installing anything |
| LaunchOS | Free Basic; Pro from $11.99 lifetime | Launchpad replica | The closest copy of the old Launchpad |
| Launchie | Free; optional Pro | Launchpad replica | Free folders, and Spaces for grouping apps |
| LaunchNext | Free, open source | Launchpad replica | An open-source Launchpad that imports your old layout |
| Raycast / Alfred | Free; paid tiers | Keyboard launchers | Opening apps by typing |
| CoolDesk | Free | Project workspace + launcher | Apps, tabs and files grouped by project |

## LaunchOS

LaunchOS is the best-known Launchpad replacement for Tahoe. It recreates the full-screen grid, folders and pages, and can import your old Launchpad layout, so your folders come back where they were. It's styled to match macOS 26's Liquid Glass and supports 120Hz displays.

**What it's best at:** feeling like the Launchpad you lost. If you want your old Launchpad back, start here.

**Where others beat it:** several useful features are Pro-only: opening it with the F4 key, a hot corner or a trackpad gesture, a custom grid layout, and hiding apps. The Pro lifetime licence is cheap, but Launchie and LaunchNext give you some of those features free.

## Launchie

Launchie is a newer Launchpad replacement that's generous in its free tier. It has a full-screen grid you arrange yourself, unlimited folders, search, and **Spaces**: separate sections, each with its own apps and folders. It imports layouts from the original Launchpad, LaunchNext or LaunchOS, and it's on the Mac App Store and Homebrew.

**What it's best at:** value. Folders, layout import and hot-corner activation don't cost anything.

**Where others beat it:** it's Apple Silicon only and requires macOS 26 or later, so older Intel Macs are left out. It's also young, and its Pro features and pricing are still taking shape.

## LaunchNext

LaunchNext is a free, open-source (GPL-3.0) Launchpad replacement on GitHub with thousands of stars. It reads your existing Launchpad database to rebuild your folders and app positions in one click, and it adds fuzzy search, keyboard navigation, custom icon sizes, hot corners and multi-display support. Recent releases are signed and notarized by Apple.

**What it's best at:** free and open. If you'd rather not pay or create an account, and you like seeing the source, LaunchNext is the pick.

**Where others beat it:** it's a volunteer project, so polish and long-term support depend on one maintainer, and some features (like trackpad gestures) are marked experimental. The author has said future builds may go back to unsigned, which means a Terminal step to get past Gatekeeper.

## Raycast and Alfred

Many Mac power users never touched Launchpad, because a keyboard launcher is faster: press a shortcut, type three letters, hit Enter. **Raycast** is free for the core launcher and adds extensions, window management and clipboard history. **Alfred** is a long-running Mac classic, free to start, with a paid Powerpack for workflows.

**What they're best at:** speed. Once you're used to typing to launch, a grid of icons feels slow.

**Where others beat them:** they're not a grid. If you browse your apps visually or forget app names, a Launchpad replica suits you better. See [CoolDesk vs Raycast](/vs/raycast) and [CoolDesk vs Alfred](/vs/alfred) for detailed comparisons.

## CoolDesk (that's us)

CoolDesk is a free project workspace for Mac and Windows. It isn't a Launchpad clone. It gives you two ways to get to your apps:

- **Option+K** opens a [search](/spotlight) that covers installed apps, running windows, open browser tabs, history, bookmarks and files. If the thing you want is already open, it jumps to it instead of opening a copy.
- **Spaces** group a project's apps, folders, links and notes together. Switch project and the bottom bar or side dock (**⌘+Shift+D**) fills with that project's apps, folders and links. See the [dock](/dock) and [sidebar](/sidebar).

**What it's best at:** context. Launchpad, LaunchOS and Apps show *every* app, sorted by name or by hand. CoolDesk shows the apps that belong to what you're working on, alongside your browser tabs and files. It's free, needs no account, and keeps everything on your device.

**Where others beat it:** there's no full-screen icon grid, no folders of apps and no pinch gesture. If your goal is "make it look like Launchpad again," use LaunchOS, Launchie or LaunchNext.

## Which one should you pick?

- **"I just want my old Launchpad back"** → LaunchOS
- **"I want folders back, free"** → Launchie or LaunchNext
- **"I want free and open source"** → LaunchNext
- **"I don't want to install anything"** → Apps (⌘ Space, ⌘ 1) or the Applications folder in your Dock
- **"I'd rather type than browse"** → Raycast or Alfred
- **"I want my apps, tabs and files grouped by project"** → [CoolDesk](/)

**Try CoolDesk free:** [download for Mac or Windows](/api/download). No account needed, and it takes about a minute to set up. Press Option+K to search everything.

## FAQ

**Why did Apple remove Launchpad?**
Apple folded app browsing into Spotlight in macOS 26 Tahoe, as the new Apps view. It didn't give a detailed reason, but Spotlight now handles apps, files, actions and clipboard history in one place.

**Is Launchpad back in macOS 27?**
No. macOS 27 Golden Gate kept the Apps view from Tahoe, and there's no setting to restore the old Launchpad.

**Does the Terminal command to restore Launchpad still work?**
No. It only worked in early macOS 26 betas, and Apple blocked it in later builds.

**Can I keep my old Launchpad folders?**
Yes, with a replacement app. LaunchOS, Launchie and LaunchNext can all import your previous Launchpad layout, including folders.

**Does the Launchpad key (F4) still work?**
Yes. It opens Apps now instead of Launchpad. Some replacement apps can take over the key.

Want a better Dock too? See [The Best Dock Apps for Mac](/blog/best-dock-apps-mac) and [The Best Sidebar Apps for Mac and Windows](/blog/best-sidebar-apps-mac-windows).

Tags: launchpad alternative, launchpad macos tahoe, launchpad macos 27, mac app launcher, productivity
