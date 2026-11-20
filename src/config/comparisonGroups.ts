// Groups the /vs/:slug comparisons for the /vs hub page and the
// "more comparisons" links on each comparison page. Slugs must exist in
// `comparisons` (src/pages/Versus.tsx).

export const comparisonGroups: { title: string; blurb: string; slugs: string[] }[] = [
    {
        title: "Launchers",
        blurb: "Keyboard launchers that open apps and files fast.",
        slugs: ["raycast", "alfred", "spotlight"],
    },
    {
        title: "Browser workspaces & tab managers",
        blurb: "Tools that organise, save and restore your tabs.",
        slugs: ["workona", "toby"],
    },
    {
        title: "New tab pages",
        blurb: "Dashboards that replace the browser's new tab.",
        slugs: ["momentum"],
    },
];

/** Other comparisons to link from a comparison page — same group first. */
export function relatedComparisons(slug: string, limit = 4): string[] {
    const own = comparisonGroups.find((g) => g.slugs.includes(slug));
    const sameGroup = own ? own.slugs.filter((s) => s !== slug) : [];
    const rest = comparisonGroups.flatMap((g) => g.slugs).filter((s) => s !== slug && !sameGroup.includes(s));
    return [...sameGroup, ...rest].slice(0, limit);
}
