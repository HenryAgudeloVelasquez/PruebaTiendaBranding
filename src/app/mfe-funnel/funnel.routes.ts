import { Routes } from '@angular/router';
import { FunnelComponent } from './funnel.component';

export const FUNNEL_ROUTES: Routes = [
  {
    path: ':campaignId',
    component: FunnelComponent
  }
];
