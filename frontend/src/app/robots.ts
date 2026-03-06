import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || 'https://rumzeesexotics.com';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin/',
                    '/api/',
                    '/login/',
                    '/register/',
                ],
            },
        ],
        sitemap: `${DOMAIN}/sitemap.xml`,
    };
}
