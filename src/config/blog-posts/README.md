# CoolDesk Blog Posts

Each `.md` file here is registered in `src/config/blogs.ts` with its real publish date
(and an `updated` date when refreshed). Only add posts that answer something people search for.

## The format that works

`raycast-alternatives-windows.md` drives ~12x more traffic than any other post. New posts copy its shape:

1. **Search-shaped title** with the year — "X Alternatives for Windows (2026): An Honest List"
2. **Summary table** near the top (tool / price / open source / best for)
3. **Per tool:** "What it's best at" + "Where others beat it" — including CoolDesk
4. **"Which one should you pick?"** — one line per reader type
5. **Download CTA** + links to the matching `/vs/` pages and the Raycast hub post

Register roundups with category `'best'` in `blogs.ts`, then add them to `BEST_GROUPS` in `src/pages/Resources.tsx`
(the "Best apps" section) and to the matching feature's `guides` in `src/config/features.ts`. How-tos stay `'guides'`.

## Monthly loop

1. **Look** — Search Console → Queries: find terms with impressions but few clicks.
2. **Write** — 2 posts/month in the format above.
3. **Judge after ~8 weeks** — rising impressions or 20+ users: keep & interlink.
   Still ~0: merge into a winner and 301-redirect (`public/serve.json`), drop from `public/sitemap.xml`.
4. **Refresh winners quarterly** — update facts, set `updated` in `blogs.ts`, bump sitemap `lastmod`.

## Retired

18 thin essay posts plus the P2P deep dive were removed on 2026-10-04 (no search demand, low engagement).
Their URLs 301-redirect to the closest live page — see `redirects` in `public/serve.json`.

On 2026-10-26 the two how-to "tips" posts (`search-tabs-and-apps-one-shortcut`, `organize-browser-tabs-by-project`)
were removed for bringing no traffic — how-to tips don't rank for us; "best X" / alternatives lists do.
