export interface BlogPost {
    id: string;
    title: string;
    description: string;
    content: string;
    author: string;
    date: string;
    /** Last meaningful content refresh (YYYY-MM-DD). Shown as "Updated" and sent as dateModified. */
    updated?: string;
    readTime: string;
    category: BlogCategory;
    tags: string[];
    icon?: string;
    slug: string;
    /** When set, the blog card links to this route instead of /blog/:slug (e.g. /vs/ comparison pages). */
    href?: string;
}

export type BlogCategory =
    | 'productivity'
    | 'features'
    | 'tips'
    | 'updates'
    | 'guides'
    | 'comparisons';

// Import blog posts from markdown files.
// Removed posts are 301-redirected in public/serve.json — add a redirect there when retiring one.
import bestDockAppsContent from './blog-posts/best-dock-apps-windows.md?raw';
import bestSidebarAppsContent from './blog-posts/best-sidebar-apps-mac-windows.md?raw';
import launchpadAlternativesContent from './blog-posts/launchpad-alternatives-mac.md?raw';
import bestDockAppsMacContent from './blog-posts/best-dock-apps-mac.md?raw';
import arcAlternativesContent from './blog-posts/arc-browser-alternatives.md?raw';
import developerContextSwitchingContent from './blog-posts/developer-context-switching-setup.md?raw';
import bestNewTabExtensionsContent from './blog-posts/best-new-tab-extensions.md?raw';
import raycastAlternativesContent from './blog-posts/raycast-alternatives-windows.md?raw';
import splitScreenTabsContent from './blog-posts/split-screen-tabs-browser.md?raw';

// Parse markdown frontmatter and content
// `date` is the real publish date (YYYY-MM-DD) — never derive it from the build time,
// or every deploy tells search engines the post was published today.
function parseBlogPost(content: string, slug: string, category: BlogCategory, icon: string, date: string, updated?: string): BlogPost {
    const lines = content.split('\n');
    let title = '';
    let firstHeading = '';

    // Find first # heading for title
    for (const line of lines) {
        if (line.startsWith('# ')) {
            firstHeading = line.replace('# ', '').trim();
            title = firstHeading;
            break;
        }
    }

    // Generate description from first paragraph
    let description = '';
    let foundHeading = false;
    let tags: string[] = [];

    for (const line of lines) {
        if (line.startsWith('# ')) {
            foundHeading = true;
            continue;
        }
        if (foundHeading && line.trim() && !line.startsWith('#') && !line.startsWith('Tags:')) {
            if (!description) description = line.trim().slice(0, 200);
        }

        // Simple tag parsing: looking for a line "Tags: tag1, tag2"
        if (line.startsWith('Tags:')) {
            tags = line.replace('Tags:', '').split(',').map(tag => tag.trim());
        }
    }

    return {
        id: slug,
        slug: slug,
        title: title || 'Untitled',
        description: description || 'Read more...',
        content: content,
        author: 'CoolDesk Team',
        date,
        updated,
        readTime: Math.ceil(content.split(' ').length / 200) + ' min read',
        category: category,
        tags: tags.length > 0 ? tags : ['productivity', 'browser'], // Fallback tags
        icon: icon
    };
}

// Comparison pages (/vs/:slug) surfaced as blog cards. The card links to the
// canonical /vs/ URL — there is no /blog/ version of these, to avoid duplicate content.
function comparisonCard(slug: string, title: string, description: string, date: string): BlogPost {
    return {
        id: `vs-${slug}`,
        slug: `vs-${slug}`,
        href: `/vs/${slug}`,
        title,
        description,
        content: '',
        author: 'CoolDesk Team',
        date,
        readTime: '4 min read',
        category: 'comparisons',
        tags: ['comparison', 'alternatives'],
        icon: 'ArrowLeftRight',
    };
}

export const blogPosts: BlogPost[] = [
    parseBlogPost(splitScreenTabsContent, 'split-screen-tabs-browser', 'guides', 'Columns2', '2026-11-12'),
    parseBlogPost(raycastAlternativesContent, 'raycast-alternatives-windows', 'guides', 'Search', '2026-07-06', '2026-11-12'),
    parseBlogPost(developerContextSwitchingContent, 'developer-context-switching-setup', 'guides', 'Code', '2026-10-05'),
    parseBlogPost(arcAlternativesContent, 'arc-browser-alternatives', 'guides', 'Globe', '2026-10-26'),
    parseBlogPost(launchpadAlternativesContent, 'launchpad-alternatives-mac', 'guides', 'LayoutGrid', '2026-10-26'),
    parseBlogPost(bestDockAppsMacContent, 'best-dock-apps-mac', 'guides', 'PanelBottom', '2026-10-26'),
    parseBlogPost(bestSidebarAppsContent, 'best-sidebar-apps-mac-windows', 'guides', 'PanelRight', '2026-10-26'),
    parseBlogPost(bestDockAppsContent, 'best-dock-apps-windows', 'guides', 'PanelBottom', '2026-10-04'),
    comparisonCard(
        'arc',
        'CoolDesk vs Arc Browser Spaces — An Honest Comparison',
        'Arc\'s Spaces made project-based browsing popular. CoolDesk brings project workspaces to the browser you already use — plus your desktop apps, files and notes. An honest comparison.',
        '2026-09-27',
    ),
    comparisonCard(
        'flow-launcher',
        'CoolDesk vs Flow Launcher — An Honest Comparison',
        'Flow Launcher is a fast, free, open-source launcher for Windows. CoolDesk is a free launcher built around your projects, with browser tabs as first-class results. An honest comparison.',
        '2026-09-27',
    ),
    comparisonCard(
        'chrome-tab-groups',
        'CoolDesk vs Chrome Tab Groups — An Honest Comparison',
        'Chrome\'s tab groups are the easy way to tidy a tab bar. CoolDesk turns groups into project workspaces with your apps, notes and one-keystroke search. An honest comparison.',
        '2026-09-27',
    ),
    comparisonCard(
        'onetab',
        'CoolDesk vs OneTab — An Honest Comparison',
        'OneTab collapses your tabs into a list to save memory. CoolDesk organises them into project workspaces you can search and reopen — along with your apps and notes. An honest comparison.',
        '2026-09-27',
    ),
    comparisonCard(
        'session-buddy',
        'CoolDesk vs Session Buddy — An Honest Comparison',
        'Session Buddy saves and restores browser sessions. CoolDesk saves whole projects — tabs, apps, files and notes — and finds any of them with one keystroke. An honest comparison.',
        '2026-09-27',
    ),
    comparisonCard(
        'workona',
        'CoolDesk vs Workona — An Honest Comparison',
        'Workona is the standard for browser workspaces — cloud-synced and team-ready. CoolDesk is a free, local-first project workspace that reaches beyond the browser to your apps, files and notes.',
        '2026-07-16',
    ),
    comparisonCard(
        'toby',
        'CoolDesk vs Toby — An Honest Comparison',
        'Toby is a beloved visual tab organizer. CoolDesk is a free, local-first project workspace that adds desktop apps, files, notes and spotlight search. An honest comparison of the two new tabs.',
        '2026-07-16',
    ),
    comparisonCard(
        'raycast',
        'CoolDesk vs Raycast — An Honest Comparison',
        'Raycast is a brilliant command palette. CoolDesk is a launcher built around your projects — it remembers what you\'re working on. An honest comparison for Windows and Mac.',
        '2026-07-05',
    ),
    comparisonCard(
        'alfred',
        'CoolDesk vs Alfred — An Honest Comparison',
        'Alfred is a Mac classic with powerful workflows. CoolDesk is a free launcher for Windows and Mac, built around your projects. An honest comparison — including when to pick Alfred.',
        '2026-07-05',
    ),
    parseBlogPost(bestNewTabExtensionsContent, 'best-new-tab-extensions', 'guides', 'Layout', '2026-08-29', '2026-10-04'),
];

export const getCategoryLabel = (category: BlogCategory): string => {
    const labels: Record<BlogCategory, string> = {
        productivity: 'Productivity',
        features: 'Features',
        tips: 'Tips & Tricks',
        updates: 'Updates',
        guides: 'Guides',
        comparisons: 'Comparisons'
    };
    return labels[category];
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
    // Entries with `href` are link-only cards (comparison pages) — they have no /blog/:slug page.
    return blogPosts.find(post => post.slug === slug && !post.href);
};

export const getBlogsByCategory = (category: BlogCategory): BlogPost[] => {
    return blogPosts.filter(post => post.category === category);
};

export const getLatestBlogs = (count: number = 3): BlogPost[] => {
    return [...blogPosts]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, count);
};
