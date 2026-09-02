import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, SortOption } from '../../core/services/product.service';
import { FilterRegistryService } from '../../core/services/filter-registry.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { FilterChipsComponent } from '../filter-chips/filter-chips.component';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent, FilterChipsComponent],
  template: `
    <section class="grid-section">
      <!-- Barra superior de control del Grid -->
      <div class="grid-toolbar">
        <div class="results-meta">
          <span class="results-count">
            Mostrando <strong>{{ productService.filteredCount() }}</strong> de {{ productService.products().length }} artículos tácticos
          </span>
        </div>

        <div class="sort-selector-wrapper">
          <label for="sortSelect" class="sort-label">Ordenar por:</label>
          <select 
            id="sortSelect"
            [ngModel]="productService.currentSort()"
            (ngModelChange)="onSortChange($event)"
            class="sort-dropdown"
          >
            <option value="featured">★ Destacados MTF</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="rating">Mejor Calificados</option>
            <option value="name-asc">Nombre A-Z</option>
          </select>
        </div>
      </div>

      <!-- Píldoras de Filtros Activos -->
      <app-filter-chips />

      <!-- Grilla de Productos -->
      @if (productService.filteredProducts().length > 0) {
        <div class="products-grid">
          @for (product of productService.filteredProducts(); track product.id) {
            <app-product-card [product]="product" class="animate-fade-in" />
          }
        </div>
      } @else {
        <!-- Estado Vacío -->
        <div class="empty-state glass-panel">
          <div class="empty-icon">🛡️</div>
          <h3>No se encontraron productos con estos filtros</h3>
          <p>Prueba ajustando el presupuesto, cambiando la categoría o borrando los términos de búsqueda.</p>
          <button (click)="filterRegistry.resetAllFilters()" class="btn btn-primary">
            Restablecer todos los filtros
          </button>
        </div>
      }
    </section>
  `,
  styles: [`
    .grid-section {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .grid-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid var(--border-subtle);
    }
    .results-count {
      font-size: 0.85rem;
      color: var(--text-secondary);
    }
    .results-count strong {
      color: var(--color-cyan);
      font-family: var(--font-mono);
    }
    .sort-selector-wrapper {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .sort-label {
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    .sort-dropdown {
      background: #0e1422;
      border: 1px solid var(--border-medium);
      color: #fff;
      padding: 0.45rem 1rem;
      border-radius: 8px;
      font-size: 0.82rem;
      outline: none;
      cursor: pointer;
      transition: border-color var(--transition-fast);
    }
    .sort-dropdown:focus {
      border-color: var(--color-cyan);
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .empty-state {
      padding: 3.5rem 2rem;
      text-align: center;
      border-radius: 14px;
      margin-top: 1rem;
    }
    .empty-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.7;
    }
    .empty-state h3 {
      font-size: 1.35rem;
      margin-bottom: 0.5rem;
    }
    .empty-state p {
      font-size: 0.9rem;
      max-width: 480px;
      margin: 0 auto 1.5rem auto;
    }
  `]
})
export class ProductGridComponent {
  productService = inject(ProductService);
  filterRegistry = inject(FilterRegistryService);

  onSortChange(sort: SortOption): void {
    this.productService.setSortOrder(sort);
  }
}
