import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./mfe-catalog/catalog.routes').then(m => m.CATALOG_ROUTES),
    title: 'MTF Merch // Catálogo Oficial & Pasarela de Productos'
  },
  {
    path: 'brand',
    loadChildren: () => import('./mfe-branding/branding.routes').then(m => m.BRANDING_ROUTES),
    title: 'MTF Merch // Branding Page & Despacho Directo'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
