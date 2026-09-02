import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterRegistryService } from '../../core/services/filter-registry.service';
import { ProductService } from '../../core/services/product.service';

interface ActiveFilterChip {
  key: string;
  label: string;
  value: any;
}

@Component({
  selector: 'app-filter-chips',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (activeChips().length > 0) {
      <div class="chips-container">
        <span class="chips-label">Filtros activos:</span>
        <div class="chips-list">
          @for (chip of activeChips(); track chip.key + chip.label) {
            <span class="chip-item">
              <span class="chip-text">{{ chip.label }}</span>
              <button 
                type="button" 
                class="chip-remove" 
                (click)="removeChip(chip)"
                aria-label="Quitar filtro"
              >
                ✕
              </button>
            </span>
          }
          <button (click)="filterRegistry.resetAllFilters()" class="chip-clear-all">
            Limpiar todos
          </button>
        </div>
      </div>
    }
  `,
  styles: [`
    .chips-container {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
      padding: 0.65rem 1rem;
      background: rgba(14, 20, 34, 0.6);
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
    }
    .chips-label {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-family: var(--font-mono);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .chips-list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .chip-item {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.2rem 0.6rem;
      background: rgba(0, 242, 254, 0.1);
      border: 1px solid rgba(0, 242, 254, 0.3);
      border-radius: 999px;
      font-size: 0.78rem;
      color: var(--color-cyan);
    }
    .chip-remove {
      background: none;
      border: none;
      color: var(--color-cyan);
      cursor: pointer;
      font-size: 0.75rem;
      padding: 0 0.15rem;
      display: flex;
      align-items: center;
      transition: color var(--transition-fast);
    }
    .chip-remove:hover {
      color: #fff;
    }
    .chip-clear-all {
      background: none;
      border: none;
      color: #f87171;
      font-size: 0.75rem;
      cursor: pointer;
      text-decoration: underline;
      padding: 0.2rem 0.5rem;
      font-family: var(--font-mono);
    }
  `]
})
export class FilterChipsComponent {
  filterRegistry = inject(FilterRegistryService);
  productService = inject(ProductService);

  activeChips = computed<ActiveFilterChip[]>(() => {
    const v = this.filterRegistry.filterValues();
    const chips: ActiveFilterChip[] = [];

    if (v['categoryId'] && v['categoryId'] !== 'all') {
      const cat = this.productService.categories().find(c => c.id === v['categoryId']);
      chips.push({
        key: 'categoryId',
        label: `Categoría: ${cat ? cat.shortName : v['categoryId']}`,
        value: 'all'
      });
    }

    if (v['search'] && v['search'].trim().length > 0) {
      chips.push({
        key: 'search',
        label: `Búsqueda: "${v['search']}"`,
        value: ''
      });
    }

    if (v['priceMax'] && v['priceMax'] < 200000) {
      chips.push({
        key: 'priceMax',
        label: `Hasta ${this.productService.formatCurrency(v['priceMax'])}`,
        value: 200000
      });
    }

    if (v['onlyCustomizable']) {
      chips.push({
        key: 'onlyCustomizable',
        label: 'Grabado Personalizable',
        value: false
      });
    }

    if (v['inStockOnly']) {
      chips.push({
        key: 'inStockOnly',
        label: 'En Stock Hoy',
        value: false
      });
    }

    if (Array.isArray(v['sizes'])) {
      v['sizes'].forEach(size => {
        chips.push({
          key: 'sizeItem',
          label: `Talla ${size}`,
          value: size
        });
      });
    }

    return chips;
  });

  removeChip(chip: ActiveFilterChip): void {
    if (chip.key === 'sizeItem') {
      this.filterRegistry.toggleMultiSelectOption('sizes', chip.value);
    } else {
      this.filterRegistry.setFilterValue(chip.key, chip.value);
    }
  }
}
