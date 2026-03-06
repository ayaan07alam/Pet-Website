import { MetadataRoute } from 'next';

const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || 'https://rumzeesexotics.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Base routes that are statically defined
    const routes = [
        '',
        '/shop',
        '/about',
        '/services',
        '/contact',
    ].map((route) => ({
        url: `${DOMAIN}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // Attempt to fetch dynamic pet routes for SEO (catch error to prevent build failure if DB is down)
    let petsSitemap: MetadataRoute.Sitemap = [];
    try {
        const res = await fetch(`${DOMAIN}/api/pets`, { next: { revalidate: 3600 } });
        if (res.ok) {
            const pets = await res.json();
            petsSitemap = pets.map((pet: any) => ({
                url: `${DOMAIN}/shop/${pet.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            }));
        }
    } catch (error) {
        console.warn("Could not fetch pets for sitemap generation", error);
    }

    return [...routes, ...petsSitemap];
}
