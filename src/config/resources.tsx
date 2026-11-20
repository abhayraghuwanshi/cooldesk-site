import {
    FileQuestion,
    FileText,
    Lock,
    Mail,
    PenLine,
    Rocket,
    Target
} from 'lucide-react';
import { ReactNode } from 'react';

export interface Resource {
    id: string;
    title: string;
    description: string;
    url: string;
    category: ResourceCategory;
    icon?: ReactNode;
}

export type ResourceCategory =
    | 'privacy'
    | 'contact'
    | 'founder'
    | 'preview'
    | 'docs'
    | 'release';

export const resources: Resource[] = [
    // Documentation
    {
        id: 'getting-started',
        title: 'Getting Started',
        description: 'Learn the basics and set up CoolDesk in minutes',
        url: '/#how-to-use',
        category: 'docs',
        icon: <Rocket className="w-6 h-6" />
    },
    {
        id: 'blog',
        title: 'Blog',
        description: 'Tips, guides, and insights for maximizing productivity',
        url: '/resources#rs-blog',
        category: 'docs',
        icon: <PenLine className="w-6 h-6" />
    },
    {
        id: 'faq',
        title: 'FAQ',
        description: 'Frequently asked questions and answers',
        url: '/#f',
        category: 'docs',
        icon: <FileQuestion className="w-6 h-6" />
    },

    // Privacy & Legal
    {
        id: 'privacy-policy',
        title: 'Privacy Policy',
        description: 'How we handle your data and protect your privacy',
        url: '/privacy-details',
        category: 'privacy',
        icon: <Lock className="w-6 h-6" />
    },

    // Contact & Support
    {
        id: 'contact-us',
        title: 'Contact Us',
        description: 'Get in touch with our team for support and inquiries',
        url: '/contact',
        category: 'contact',
        icon: <Mail className="w-6 h-6" />
    },

    // Preview Gallery
    // {
    //     id: 'preview-gallery',
    //     title: 'Preview Gallery',
    //     description: 'Visual tour of CoolDesk interface and features',
    //     url: '/gallery',
    //     category: 'preview',
    //     icon: <Image className="w-6 h-6" />
    // },

    // Release Notes
    {
        id: 'release-notes',
        title: 'Release Notes',
        description: 'Latest updates, new features, and changes in CoolDesk',
        url: '/releases',
        category: 'release',
        icon: <FileText className="w-6 h-6" />
    }
];

// Helper functions
export const getResourcesByCategory = (category: ResourceCategory): Resource[] => {
    return resources.filter(resource => resource.category === category);
};

export const getResourceById = (id: string): Resource | undefined => {
    return resources.find(resource => resource.id === id);
};

// Category labels for UI
export const categoryLabels: Record<ResourceCategory, string> = {
    docs: 'Documentation',
    privacy: 'Privacy & Legal',
    contact: 'Contact & Support',
    founder: 'Founder Notes',
    preview: 'CoolDesk Preview',
    release: 'Release Notes'
};
