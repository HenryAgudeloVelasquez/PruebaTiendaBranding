import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { FilterRegistryService } from '../../core/services/filter-registry.service';

@Component({
  selector: 'app-catalog-gateway',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="gateway-container">
      <div class="gateway-header">
        <div class="gateway-title-group">
          <span class="badge badge-cyan">DIVISIÓN OFICIAL // PASARELA DE PRODUCTOS</span>
          <h2>Línea de Merchandise MTF</h2>
          <p>Selecciona una categoría táctica para explorar equipamiento verificado y personalizable.</p>
        </div>
      </div>

      <!-- Pasarela de Categorías Interactiva -->
      <div class="categories-track">
        @for (category of productService.categories(); track category.id) {
          <button 
            type="button"
            (click)="selectCategory(category.id)"
            [class.active]="activeCategory() === category.id"
            class="category-card glass-panel"
            [style.--cat-accent]="category.colorAccent"
          >
            <div class="cat-icon-frame">
              @switch (category.icon) {
                @case ('grid') {
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                }
                @case ('shirt') {
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/>
                  </svg>
                }
                @case ('shield') {
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                }
                @case ('coffee') {
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                    <line x1="6" y1="1" x2="6" y2="4"></line>
                    <line x1="10" y1="1" x2="10" y2="4"></line>
                    <line x1="14" y1="1" x2="14" y2="4"></line>
                  </svg>
                }
              }
            </div>

            <div class="cat-content">
              <span class="cat-name">{{ category.name }}</span>
              <span class="cat-tagline">{{ category.tagline }}</span>
            </div>

            <div class="cat-badge">
              <span>{{ category.productCount }} ítems</span>
            </div>

            <div class="active-indicator"></div>
          </button>
        }
      </div>
    </section>
  `,
  styles: [`
    .gateway-container {
      margin-bottom: 2.5rem;
    }
    .gateway-header {
      margin-bottom: 1.5rem;
    }
    .gateway-title-group h2 {
      font-size: 2rem;
      margin-top: 0.5rem;
      margin-bottom: 0.25rem;
      background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .gateway-title-group p {
      font-size: 0.95rem;
    }
    .categories-track {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1rem;
    }
    .category-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      text-align: left;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: all var(--transition-normal);
      border-radius: 12px;
      color: var(--text-primary);
    }
    .category-card:hover {
      border-color: var(--cat-accent);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 242, 254, 0.15);
    }
    .category-card.active {
      border-color: var(--cat-accent);
      background: linear-gradient(135deg, rgba(14, 20, 34, 0.95) 0%, rgba(21, 29, 48, 0.95) 100%);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 242, 254, 0.25);
    }
    .cat-icon-frame {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-subtle);
      color: var(--cat-accent);
      flex-shrink: 0;
      transition: transform var(--transition-normal);
    }
    .category-card:hover .cat-icon-frame {
      transform: scale(1.1);
      background: rgba(0, 242, 254, 0.1);
    }
    .cat-content {
      flex: 1;
      min-width: 0;
    }
    .cat-name {
      display: block;
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 0.95rem;
      color: #fff;
    }
    .cat-tagline {
      display: block;
      font-size: 0.75rem;
      color: var(--text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 2px;
    }
    .cat-badge {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-secondary);
      border: 1px solid var(--border-subtle);
    }
    .category-card.active .cat-badge {
      background: rgba(0, 242, 254, 0.15);
      color: var(--color-cyan);
      border-color: rgba(0, 242, 254, 0.3);
    }
    .active-indicator {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: transparent;
      transition: background var(--transition-normal);
    }
    .category-card.active .active-indicator {
      background: linear-gradient(90deg, transparent, var(--cat-accent), transparent);
    }
  `]
})
export class CatalogGatewayComponent {
  productService = inject(ProductService);
  filterRegistry = inject(FilterRegistryService);

  get activeCategory(): () => string {
    return () => this.filterRegistry.filterValues()['categoryId'] || 'all';
  }

  selectCategory(id: string): void {
    this.productService.selectCategory(id);
  }
}
