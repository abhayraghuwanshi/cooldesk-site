import { ArrowRightLeft, RefreshCw, Share2 } from 'lucide-react';

// What the extension ↔ desktop app connection does. Shared by the homepage's
// "Connect your browser" section and /new-tab; sources are listed in
// NewTabShowcase.tsx.
export const CONNECTS = [
    {
        Icon: Share2,
        title: 'Shares your open tabs',
        text: 'The desktop app sees what’s open in Chrome, Edge, Brave or Firefox, so Spotlight and your spaces can find it.',
    },
    {
        Icon: ArrowRightLeft,
        title: 'Jump or close from the app',
        text: 'Pick a tab in CoolDesk and it switches to it in the right browser window, instead of opening a copy.',
    },
    {
        Icon: RefreshCw,
        title: 'Keeps both in sync',
        text: 'Spaces, notes and pins you change in one show up in the other. All on your computer, never a server.',
    },
];
