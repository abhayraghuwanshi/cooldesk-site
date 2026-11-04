#!/usr/bin/env node
/**
 * Capture a screenshot for src/config/shots.ts from the running CoolDesk app.
 *
 *   npm run shot -- <key> [--window main|spotlight|handle] [--place tight|right|left|bottom] [--bg wallpaper-misty-valley.jpg] [--crop x,y,w,h]
 *   npm run shot -- --list      every shot and whether it has an image
 *
 * Put CoolDesk in the state the shot needs (its alt text in shots.ts says
 * what), then run this. It grabs the window with macOS `screencapture` (no
 * input is sent to the app), puts it on a wallpaper from public/images,
 * saves public<src> and records the size in src/config/shot-sizes.json —
 * which is what turns a pending shot on. Look at the image before you commit:
 * these go on the public site.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const sizesPath = join(root, "src/config/shot-sizes.json");

// Sensible defaults per shot; flags override them.
const DEFAULTS = {
    spotlight: { window: "spotlight", place: "tight" },
    spotlightPreview: { window: "spotlight", place: "tight" },
    sidebar: { place: "right" },
    sidebarActive: { place: "tight" },
    sidebarHandle: { window: "handle", place: "right" },
    clipboard: { place: "tight" },
    clipboardAll: { place: "tight" },
    shellSidebar: { place: "right" },
    shellTab: { place: "tight" },
    shellSearch: { place: "tight" },
    dockDesktop: { place: "bottom" },
    dockActive: { place: "tight" },
    dockPicker: { place: "tight" },
    browser: { place: "tight" },
    browserCanvas: { place: "tight" },
    browserTools: { place: "tight" },
    fileManagerPreview: { place: "tight" },
    fileManagerArchive: { place: "tight" },
};

const argv = process.argv.slice(2);
const flag = (name) => {
    const i = argv.indexOf(`--${name}`);
    return i >= 0 ? argv[i + 1] : undefined;
};

// shots.ts is TypeScript; pull the key → src pairs out with a regex rather than compiling it.
const source = readFileSync(join(root, "src/config/shots.ts"), "utf8");
const shots = Object.fromEntries([...source.matchAll(/^\s{4}(\w+):\s*(?:todo\(|\{\s*src:\s*)"([^"]+)"/gm)].map((m) => [m[1], m[2]]));
const sizes = JSON.parse(readFileSync(sizesPath, "utf8"));

if (argv.includes("--list") || argv.length === 0) {
    for (const [key, src] of Object.entries(shots)) {
        const done = sizes[src] || !source.includes(`todo("${src}"`);
        console.log(`${done ? "✓" : "·"} ${key.padEnd(20)} ${src}`);
    }
    process.exit(0);
}

const key = argv[0];
const src = shots[key];
if (!src) {
    console.error(`Unknown shot "${key}". Run with --list to see them.`);
    process.exit(1);
}
const d = DEFAULTS[key] ?? {};
const win = flag("window") ?? d.window ?? "main";
const place = flag("place") ?? d.place ?? "tight";
const bg = join(root, "public/images", flag("bg") ?? "wallpaper-misty-valley.jpg");
const out = join(root, "public", src);

const [width, height] = execFileSync("swift", [join(root, "scripts/shot/capture.swift"), win, place, bg, out, "2000", ...(flag("crop") ? [flag("crop")] : [])], { encoding: "utf8" })
    .trim()
    .split(/\s+/)
    .map(Number);

sizes[src] = { width, height };
writeFileSync(sizesPath, JSON.stringify(sizes, null, 4) + "\n");
console.log(`saved public${src} (${width}×${height}) — check it for anything private before committing`);
