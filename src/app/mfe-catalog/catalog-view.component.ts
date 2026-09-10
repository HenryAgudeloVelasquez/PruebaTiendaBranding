import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CatalogGatewayComponent } from './catalog-gateway/catalog-gateway.component';
import { ExtensibleFilterSidebarComponent } from './filter-sidebar/filter-sidebar.component';
import { ProductGridComponent } from './product-grid/product-grid.component';

@Component({
  selector: 'app-catalog-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CatalogGatewayComponent,
    ExtensibleFilterSidebarComponent,
    ProductGridComponent
  ],
  template: `
    <div class="catalog-view container">
      <!-- Pasarela de Categorías Superior -->
      <app-catalog-gateway />

      <!-- Banner Táctico de Campañas Activas (Embudos de Venta Directa) -->
      <section class="funnel-promo-strip glass-panel">
        <div class="strip-badge">⚡ DROPS EXCLUSIVOS & EMBUDOS</div>
        <div class="strip-content">
          <div class="strip-text">
            <strong>Ofertas Relámpago con Despacho Inmediato por WhatsApp</strong>
            <span>Campañas activas con precios especiales, temporizador de urgencia y trazabilidad directa.</span>
          </div>
          <div class="strip-actions">
            <a routerLink="/oferta/blackout-operator" class="strip-link primary">
              🔥 Hoodie Blackout (-35%)
            </a>
            <a routerLink="/oferta/vanguard-titanio" class="strip-link">
              🛡️ Manilla Titanio ID
            </a>
            <a routerLink="/oferta/omega-termico" class="strip-link">
              ❄️ Vaso Ω7
            </a>
          </div>
        </div>
      </section>

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
    .funnel-promo-strip {
      margin-bottom: 2rem;
      padding: 1rem 1.5rem;
      border: 1px solid rgba(245, 158, 11, 0.3);
      background: linear-gradient(90deg, rgba(120, 53, 15, 0.25), rgba(15, 23, 42, 0.6));
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .strip-badge {
      font-size: 0.7rem;
      font-weight: 800;
      color: #fbbf24;
      letter-spacing: 0.1em;
    }
    .strip-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .strip-text {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    .strip-text strong {
      color: #ffffff;
      font-size: 0.95rem;
    }
    .strip-text span {
      font-size: 0.8rem;
      color: #94a3b8;
    }
    .strip-actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .strip-link {
      padding: 0.4rem 0.85rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #e2e8f0;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .strip-link:hover {
      background: rgba(255, 255, 255, 0.12);
      transform: translateY(-2px);
    }
    .strip-link.primary {
      background: linear-gradient(135deg, #d97706, #b45309);
      border-color: #f59e0b;
      color: #fff;
      box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);
    }
    .strip-link.primary:hover {
      background: linear-gradient(135deg, #f59e0b, #d97706);
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
