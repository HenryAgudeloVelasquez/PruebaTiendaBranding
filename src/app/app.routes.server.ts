import { RenderMode, ServerRoute, PrerenderFallback } from '@angular/ssr';
import { PRODUCTS_DATA } from './core/mock-data/products.data';

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
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
