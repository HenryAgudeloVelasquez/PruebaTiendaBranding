import { Routes } from '@angular/router';
import { BrandingPageComponent } from './branding-page.component';

export const BRANDING_ROUTES: Routes = [
  {
    path: ':slug',
    component: BrandingPageComponent
  }
];
