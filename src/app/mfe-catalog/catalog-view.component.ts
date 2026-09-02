import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogGatewayComponent } from './catalog-gateway/catalog-gateway.component';
import { ExtensibleFilterSidebarComponent } from './filter-sidebar/filter-sidebar.component';
import { ProductGridComponent } from './product-grid/product-grid.component';

@Component({
  selector: 'app-catalog-view',
  standalone: true,
  imports: [
    CommonModule,
    CatalogGatewayComponent,
    ExtensibleFilterSidebarComponent,
    ProductGridComponent
  ],
  template: `
    <div class="catalog-view container">
      <!-- Pasarela de Categorías Superior -->
      <app-catalog-gateway />

      <!-- Botón Móvil para abrir filtros -->
      <div class="mobile-filter-trigger">
        <button (click)="toggleMobileFilters()" class="btn btn-secondary w-full">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          {{ isMobileFiltersOpen() ? 'Ocultar Filtros' : 'Filtrar Productos' }}
        </button>
      </div>

      <!-- Distribución Principal: Sidebar de Filtros Extensibles + Grilla -->
      <div class="catalog-layout">
        <div class="sidebar-column" [class.mobile-open]="isMobileFiltersOpen()">
          <app-filter-sidebar />
        </div>

        <main class="grid-column">
          <app-product-grid />
        </main>
      </div>
    </div>
  `,
  styles: [`
    .catalog-view {
      padding-top: 2rem;
      padding-bottom: 4rem;
    }
    .catalog-layout {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 2rem;
      align-items: start;
    }
    .mobile-filter-trigger {
      display: none;
      margin-bottom: 1.25rem;
    }
    .w-full {
      width: 100%;
    }
    @media (max-width: 960px) {
      .catalog-layout {
        grid-template-columns: 1fr;
      }
      .mobile-filter-trigger {
        display: block;
      }
      .sidebar-column {
        display: none;
      }
      .sidebar-column.mobile-open {
        display: block;
        margin-bottom: 1.5rem;
      }
    }
  `]
})
export class CatalogViewComponent {
  isMobileFiltersOpen = signal<boolean>(false);

  toggleMobileFilters(): void {
    this.isMobileFiltersOpen.update(v => !v);
  }
}
