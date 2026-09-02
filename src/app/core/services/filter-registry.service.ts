import { Injectable, signal, computed } from '@angular/core';
import { FilterDefinition, FilterValuesState } from '../models/filter.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FilterRegistryService {
  /**
   * Registro dinámico de definiciones de filtros.
   * Nuevos filtros pueden registrarse en caliente sin modificar componentes de interfaz.
   */
  private readonly definitionsSignal = signal<FilterDefinition[]>([]);
  public readonly definitions = this.definitionsSignal.asReadonly();

  /**
   * Estado reactivo de los valores de filtros seleccionados por el usuario
   */
  private readonly filterValuesSignal = signal<FilterValuesState>({
    categoryId: 'all',
    priceMax: 200000,
    search: '',
    onlyCustomizable: false,
    inStockOnly: false,
    sizes: [] as string[],
    tags: [] as string[]
  });
  public readonly filterValues = this.filterValuesSignal.asReadonly();

  constructor() {
    this.initializeDefaultFilters();
  }

  /**
   * Inicializa el catálogo base de filtros extensibles
   */
  private initializeDefaultFilters(): void {
    const baseFilters: FilterDefinition[] = [
      {
        id: 'categoryId',
        title: 'Categoría de División',
        type: 'checkbox-group',
        order: 1,
        options: [
          { id: 'all', label: 'Todas las Categorías', value: 'all' },
          { id: 'apparel', label: 'Camisetas & Ropa', value: 'apparel' },
          { id: 'id-wristbands', label: 'Manillas de Identificación', value: 'id-wristbands' },
          { id: 'drinkware', label: 'Vasos, Termos & Tazas', value: 'drinkware' }
        ],
        matches: (p: Product, val: string) => !val || val === 'all' || p.categoryId === val
      },
      {
        id: 'priceMax',
        title: 'Presupuesto Máximo',
        type: 'range-slider',
        order: 2,
        min: 40000,
        max: 200000,
        step: 5000,
        unit: 'COP',
        defaultValue: 200000,
        matches: (p: Product, val: number) => !val || p.price <= val
      },
      {
        id: 'onlyCustomizable',
        title: 'Con Grabado Personalizado (ID)',
        type: 'toggle-switch',
        order: 3,
        options: [
          { id: 'custom-only', label: 'Solo artículos personalizables', value: true }
        ],
        matches: (p: Product, val: boolean) => !val || !!p.customization?.enabled
      },
      {
        id: 'sizes',
        title: 'Tallas Disponibles',
        type: 'checkbox-group',
        order: 4,
        options: [
          { id: 'S', label: 'Talla S', value: 'S' },
          { id: 'M', label: 'Talla M', value: 'M' },
          { id: 'L', label: 'Talla L', value: 'L' },
          { id: 'XL', label: 'Talla XL', value: 'XL' },
          { id: '2XL', label: 'Talla 2XL', value: '2XL' }
        ],
        matches: (p: Product, selectedSizes: string[]) => {
          if (!selectedSizes || selectedSizes.length === 0) return true;
          if (!p.sizes) return false;
          return selectedSizes.some(s => p.sizes?.includes(s));
        }
      },
      {
        id: 'inStockOnly',
        title: 'Disponibilidad Inmediata',
        type: 'toggle-switch',
        order: 5,
        options: [
          { id: 'stock-only', label: 'En stock para despacho hoy', value: true }
        ],
        matches: (p: Product, val: boolean) => !val || (p.inStock && p.stockCount > 0)
      }
    ];

    this.definitionsSignal.set(baseFilters);
  }

  /**
   * Registra un nuevo filtro en el sistema de manera extensible (Open/Closed Principle)
   */
  registerFilter(newFilter: FilterDefinition): void {
    this.definitionsSignal.update(defs => {
      // Reemplaza si ya existía con el mismo id o agrega al final
      const filtered = defs.filter(d => d.id !== newFilter.id);
      return [...filtered, newFilter].sort((a, b) => a.order - b.order);
    });
  }

  /**
   * Actualiza el valor de un filtro individual
   */
  setFilterValue(filterId: string, value: any): void {
    this.filterValuesSignal.update(state => ({
      ...state,
      [filterId]: value
    }));
  }

  /**
   * Conmuta un valor en un filtro de tipo multiselección (ej. tallas, tags)
   */
  toggleMultiSelectOption(filterId: string, optionValue: string): void {
    this.filterValuesSignal.update(state => {
      const currentList: string[] = Array.isArray(state[filterId]) ? [...state[filterId]] : [];
      const index = currentList.indexOf(optionValue);
      if (index > -1) {
        currentList.splice(index, 1);
      } else {
        currentList.push(optionValue);
      }
      return {
        ...state,
        [filterId]: currentList
      };
    });
  }

  /**
   * Restablece todos los filtros a sus valores predeterminados
   */
  resetAllFilters(): void {
    this.filterValuesSignal.set({
      categoryId: 'all',
      priceMax: 200000,
      search: '',
      onlyCustomizable: false,
      inStockOnly: false,
      sizes: [],
      tags: []
    });
  }

  /**
   * Evalúa si un producto pasa TODOS los filtros registrados y activos
   */
  testProduct(product: Product): boolean {
    const values = this.filterValuesSignal();
    const defs = this.definitionsSignal();

    // Filtro de búsqueda por texto (nombre, descripción, tags, sku)
    if (values['search'] && values['search'].trim().length > 0) {
      const q = values['search'].toLowerCase().trim();
      const matchText = (
        product.name.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q) ||
        product.sku.toLowerCase().includes(q) ||
        product.tags.some(t => t.toLowerCase().includes(q))
      );
      if (!matchText) return false;
    }

    // Evaluar cada definición de filtro registrada
    for (const def of defs) {
      const val = values[def.id];
      if (val !== undefined && val !== null) {
        const passed = def.matches(product, val);
        if (!passed) return false;
      }
    }

    return true;
  }

  /**
   * Número de filtros activos actualmente aplicados
   */
  readonly activeFiltersCount = computed(() => {
    const v = this.filterValues();
    let count = 0;
    if (v['categoryId'] && v['categoryId'] !== 'all') count++;
    if (v['priceMax'] && v['priceMax'] < 200000) count++;
    if (v['search'] && v['search'].trim().length > 0) count++;
    if (v['onlyCustomizable']) count++;
    if (v['inStockOnly']) count++;
    if (Array.isArray(v['sizes']) && v['sizes'].length > 0) count += v['sizes'].length;
    return count;
  });
}
