# A Context-Switching Setup for Developers: Code, Docs, Tickets and Tabs per Project

Developers lose the most time not while switching tasks, but while rebuilding context afterwards: finding the repo, the ticket, the PR, the docs page and the staging tab again. Here's a setup that keeps each project's code, docs, tickets and tabs together — so switching takes seconds, not ten minutes.

A typical interrupted afternoon: you're deep in a feature branch, a production bug comes in on another service, and twenty minutes later you come back to… a terminal in the wrong directory, a browser full of tabs from both tasks, and no memory of which docs page you were reading. The switch itself was instant. Getting your head back took a quarter of an hour.

## What "context" actually means for a developer

For any one project, your working context is roughly:

- **The repo** — and which branch you're on, whether you have uncommitted changes, whether the dev server is running
- **The editor** — VS Code, a JetBrains IDE, Cursor
- **The tickets** — Jira, Linear, GitHub Issues
- **The review** — open pull requests
- **The docs** — API references, internal wikis, design specs
- **The running app** — localhost and staging tabs
- **Your notes** — what you tried, what's next

Most tools hold one or two of these. The trick is keeping all of them grouped by project, so one switch brings them all back.

## The setup

### 1. One workspace per project, not per tool

Make a workspace for each repo, service or client you actively work on. Name it what you'd say out loud: "billing-service", "Acme mobile app", "infra on-call".

With [CoolDesk](/) (free, Windows and Mac), a workspace holds all of the above at once: links and tabs, desktop apps, folders, files and notes.

### 2. Put the repo folder in the workspace

Drag the repo folder onto the workspace. CoolDesk shows it as a chip with the project's stack logo, the **current git branch**, a marker when there are **uncommitted changes**, and the **port of a running dev server**. That answers "where was I?" before you open a terminal.

### 3. Add the links that belong to the project

Add the ticket board, the open PR, the docs pages and the staging URL to the same workspace. The quickest way is to open them once, then add them from your open tabs in one go.

### 4. Keep the project one glance away

Turn on the **[bottom bar](/dock)** or the **[side dock](/sidebar)** (Ctrl+Shift+D cycles the layouts, ⌘+Shift+D on Mac). The bar shows the current project's folders, apps and links, or everything you have open right now — your editor, terminals and browser tabs. One click opens or focuses each one. More on this in [The Best Dock and Sidebar Apps for Windows](/blog/best-dock-apps-windows).

### 5. Jump with the keyboard

Press **Alt+K** to open [Spotlight](/spotlight) and type: "billing pr", "staging", "openapi". One search covers open tabs, history, bookmarks, apps, running windows and your workspaces — and jumps to the tab or window that's already open instead of opening a copy. See [Raycast alternatives for Windows](/blog/raycast-alternatives-windows) for how it compares to other launchers.

### 6. Leave a note when you switch away

Before you jump to the urgent thing, write one line in the workspace's notes: "Next: fix the retry test, then update the PR description." It takes ten seconds and saves the ten minutes of remembering.

## Tools that cover part of this

- **VS Code workspaces and profiles** — great for editor settings and folder sets per project, but they stop at the editor.
- **tmux / terminal sessions** — keep your shells per project; nothing for the browser.
- **Browser workspaces (Workona, Arc Spaces, Chrome tab groups)** — keep the tabs per project, but not the repo or the editor. See our [Workona comparison](/vs/workona) and [Arc alternatives](/blog/arc-browser-alternatives).
- **Window managers (FancyZones, Rectangle)** — arrange windows on screen, but don't know which windows belong to which project.

These all work well *alongside* a project workspace. A good setup is CoolDesk for "what belongs to this project", plus your editor's workspaces and a window manager for layout.

**Where CoolDesk falls short:** it doesn't restore window positions or editor layouts, and it doesn't sync across machines — everything stays local on your device.

## FAQ

**How do developers reduce context switching?**
Group everything for a project — repo, editor, tickets, PRs, docs, notes — in one place, so switching back is one action instead of a dozen. And leave yourself a one-line "next step" note before you switch away.

**Is there a tool that shows my git branch and dev server per project?**
CoolDesk's folder chips show the current branch, uncommitted changes and a running dev server's port for each project folder you add.

**Does this work with Jira, Linear and GitHub?**
Yes — they're just links in the workspace, so any web tool works. Your desktop apps (editor, terminal, Slack) can be added too.

**Try it:** [download CoolDesk](/api/download) — free, no account, about a minute to set up.

Tags: context switching, developer productivity, developer workflow, git, project workspace, productivity
