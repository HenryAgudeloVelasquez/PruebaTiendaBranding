import { RenderMode, ServerRoute, PrerenderFallback } from '@angular/ssr';
import { PRODUCTS_DATA } from './core/mock-data/products.data';
import { FUNNEL_CAMPAIGNS } from './core/mock-data/funnel-campaigns.data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'brand/:slug',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client,
    async getPrerenderParams() {
      return PRODUCTS_DATA.map(product => ({ slug: product.slug }));
    },
  },
  {
    path: 'oferta/:campaignId',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client,
    async getPrerenderParams() {
      const campaignIds = FUNNEL_CAMPAIGNS.map(c => ({ campaignId: c.campaignId }));
      const productSlugs = PRODUCTS_DATA.map(p => ({ campaignId: p.slug }));
      return [...campaignIds, ...productSlugs];
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
