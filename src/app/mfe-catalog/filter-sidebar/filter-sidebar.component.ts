import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterRegistryService } from '../../core/services/filter-registry.service';
import { FilterDefinition } from '../../core/models/filter.model';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <aside class="filter-panel glass-panel">
      <div class="filter-header">
        <div class="header-left">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          <span class="filter-heading">FILTROS AVANZADOS</span>
        </div>
        @if (filterRegistry.activeFiltersCount() > 0) {
          <button (click)="filterRegistry.resetAllFilters()" class="btn-clear-all" title="Restablecer filtros">
            Limpiar ({{ filterRegistry.activeFiltersCount() }})
          </button>
        }
      </div>

      <!-- Buscador dinámico integrado -->
      <div class="search-box">
        <svg class="search-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          placeholder="Buscar por nombre, SKU o tag..."
          [ngModel]="filterRegistry.filterValues()['search']"
          (ngModelChange)="onSearchChange($event)"
          class="search-input"
        />
        @if (filterRegistry.filterValues()['search']) {
          <button class="clear-search" (click)="onSearchChange('')">✕</button>
        }
      </div>

      <!-- Renderizado Dinámico y Extensible de Filtros Registrados -->
      <div class="dynamic-filters-list">
        @for (filter of filterRegistry.definitions(); track filter.id) {
          <div class="filter-section">
            <h4 class="filter-title">{{ filter.title }}</h4>

            @switch (filter.type) {
              <!-- 1. GRUPO DE CHECKBOXES -->
              @case ('checkbox-group') {
                <div class="options-group">
                  @for (opt of filter.options; track opt.id) {
                    <label class="custom-checkbox-row">
                      @if (filter.id === 'sizes') {
                        <input 
                          type="checkbox" 
                          [checked]="isSizeChecked(opt.value)"
                          (change)="filterRegistry.toggleMultiSelectOption(filter.id, opt.value)"
                          class="checkbox-input"
                        />
                      } @else {
                        <input 
                          type="radio" 
                          [name]="filter.id"
                          [value]="opt.value"
                          [checked]="filterRegistry.filterValues()[filter.id] === opt.value"
                          (change)="filterRegistry.setFilterValue(filter.id, opt.value)"
                          class="checkbox-input"
                        />
                      }
                      <span class="checkbox-box"></span>
                      <span class="option-label">{{ opt.label }}</span>
                      @if (opt.badge) {
                        <span class="option-badge">{{ opt.badge }}</span>
                      }
                    </label>
                  }
                </div>
              }

              <!-- 2. SLIDER DE RANGO (PRESUPUESTO) -->
              @case ('range-slider') {
                <div class="slider-wrapper">
                  <div class="slider-labels">
                    <span class="slider-limit">$40k</span>
                    <span class="slider-current-val">Hasta {{ formatMoney(filterRegistry.filterValues()[filter.id]) }}</span>
                    <span class="slider-limit">$200k</span>
                  </div>
                  <input 
                    type="range" 
                    [min]="filter.min || 40000" 
                    [max]="filter.max || 200000" 
                    [step]="filter.step || 5000"
                    [ngModel]="filterRegistry.filterValues()[filter.id]"
                    (ngModelChange)="filterRegistry.setFilterValue(filter.id, $event)"
                    class="range-slider"
                  />
                </div>
              }

              <!-- 3. TOGGLE SWITCH (PERSONALIZABLE / DISPONIBILIDAD) -->
              @case ('toggle-switch') {
                <label class="switch-row">
                  <span class="switch-label">
                    {{ filter.options?.[0]?.label || filter.title }}
                  </span>
                  <div class="switch-control">
                    <input 
                      type="checkbox" 
                      [checked]="filterRegistry.filterValues()[filter.id]"
                      (change)="onToggleChange(filter.id, $event)"
                      class="switch-input"
                    />
                    <span class="switch-slider"></span>
                  </div>
                </label>
              }
            }
          </div>
        }
      </div>

      <!-- Sello de Arquitectura Extensible -->
      <div class="extensible-badge-footer">
        <span class="extensible-dot"></span>
        <span>Motor de Filtros Extensible // Signals Registry v21</span>
      </div>
    </aside>
  `,
  styles: [`
    .filter-panel {
      padding: 1.5rem;
      border-radius: 14px;
    }
    .filter-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.25rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid var(--border-subtle);
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--color-cyan);
    }
    .filter-heading {
      font-family: var(--font-heading);
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #fff;
    }
    .btn-clear-all {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #f87171;
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
      font-size: 0.7rem;
      font-family: var(--font-mono);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    .btn-clear-all:hover {
      background: rgba(239, 68, 68, 0.25);
      color: #fff;
    }
    .search-box {
      position: relative;
      margin-bottom: 1.5rem;
    }
    .search-icon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      pointer-events: none;
    }
    .search-input {
      width: 100%;
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid var(--border-medium);
      border-radius: 8px;
      padding: 0.55rem 2rem 0.55rem 2.2rem;
      color: #fff;
      font-size: 0.82rem;
      outline: none;
      transition: border-color var(--transition-fast);
    }
    .search-input:focus {
      border-color: var(--color-cyan);
      box-shadow: 0 0 10px rgba(0, 242, 254, 0.2);
    }
    .clear-search {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 0.8rem;
    }
    .dynamic-filters-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .filter-section {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }
    .filter-title {
      font-family: var(--font-heading);
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #cbd5e1;
      margin-bottom: 0.15rem;
    }
    .options-group {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }
    .custom-checkbox-row {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      cursor: pointer;
      font-size: 0.85rem;
      color: var(--text-secondary);
      transition: color var(--transition-fast);
    }
    .custom-checkbox-row:hover {
      color: #fff;
    }
    .checkbox-input {
      display: none;
    }
    .checkbox-box {
      width: 16px;
      height: 16px;
      border-radius: 4px;
      border: 1px solid var(--border-medium);
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all var(--transition-fast);
    }
    .checkbox-input:checked + .checkbox-box {
      background: var(--color-cyan);
      border-color: var(--color-cyan);
      box-shadow: 0 0 8px rgba(0, 242, 254, 0.4);
    }
    .checkbox-input:checked + .checkbox-box::after {
      content: '✓';
      color: #000;
      font-size: 11px;
      font-weight: 800;
    }
    .option-label {
      flex: 1;
    }
    .slider-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .slider-labels {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-mono);
      font-size: 0.72rem;
    }
    .slider-limit {
      color: var(--text-muted);
    }
    .slider-current-val {
      color: var(--color-cyan);
      font-weight: 600;
      background: rgba(0, 242, 254, 0.1);
      padding: 0.15rem 0.45rem;
      border-radius: 4px;
    }
    .range-slider {
      width: 100%;
      accent-color: var(--color-cyan);
      cursor: pointer;
    }
    .switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      padding: 0.25rem 0;
    }
    .switch-label {
      font-size: 0.82rem;
      color: var(--text-secondary);
    }
    .switch-control {
      position: relative;
      width: 36px;
      height: 20px;
    }
    .switch-input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .switch-slider {
      position: absolute;
      cursor: pointer;
      inset: 0;
      background-color: #1e293b;
      border: 1px solid var(--border-medium);
      border-radius: 20px;
      transition: .3s;
    }
    .switch-slider:before {
      position: absolute;
      content: "";
      height: 14px;
      width: 14px;
      left: 2px;
      bottom: 2px;
      background-color: #94a3b8;
      border-radius: 50%;
      transition: .3s;
    }
    .switch-input:checked + .switch-slider {
      background-color: rgba(0, 242, 254, 0.2);
      border-color: var(--color-cyan);
    }
    .switch-input:checked + .switch-slider:before {
      transform: translateX(16px);
      background-color: var(--color-cyan);
      box-shadow: 0 0 8px var(--color-cyan);
    }
    .extensible-badge-footer {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px dashed var(--border-subtle);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--text-muted);
    }
    .extensible-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--color-cyan);
      box-shadow: 0 0 6px var(--color-cyan);
    }
  `]
})
export class ExtensibleFilterSidebarComponent {
  filterRegistry = inject(FilterRegistryService);

  onSearchChange(text: string): void {
    this.filterRegistry.setFilterValue('search', text);
  }

  isSizeChecked(size: string): boolean {
    const sizes = this.filterRegistry.filterValues()['sizes'];
    return Array.isArray(sizes) && sizes.includes(size);
  }

  onToggleChange(filterId: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.filterRegistry.setFilterValue(filterId, isChecked);
  }

  formatMoney(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(value || 0);
  }
}
