import { Injectable, inject, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { PRODUCTS_DATA } from '../mock-data/products.data';
import { CATEGORIES_DATA } from '../mock-data/categories.data';
import { FilterRegistryService } from './filter-registry.service';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name-asc';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly filterRegistry = inject(FilterRegistryService);

  private readonly productsSignal = signal<Product[]>(PRODUCTS_DATA);
  public readonly products = this.productsSignal.asReadonly();

  private readonly categoriesSignal = signal<Category[]>(CATEGORIES_DATA);
  public readonly categories = this.categoriesSignal.asReadonly();

  public readonly currentSort = signal<SortOption>('featured');

  /**
   * Señal computada que aplica en tiempo real los filtros dinámicos y el ordenamiento
   */
  public readonly filteredProducts = computed(() => {
    // Escucha tanto el cambio de valores de filtros como la lista de productos
    this.filterRegistry.filterValues();
    const sort = this.currentSort();
    const all = this.productsSignal();

    const filtered = all.filter(p => this.filterRegistry.testProduct(p));

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  });

  /**
   * Total de productos filtrados
   */
  public readonly filteredCount = computed(() => this.filteredProducts().length);

  /**
   * Obtiene un producto por su slug
   */
  getProductBySlug(slug: string): Product | undefined {
    return this.productsSignal().find(p => p.slug === slug);
  }

  /**
   * Obtiene productos relacionados excluyendo el actual
   */
  getRelatedProducts(currentId: string, limit = 3): Product[] {
    const current = this.productsSignal().find(p => p.id === currentId);
    return this.productsSignal()
      .filter(p => p.id !== currentId && (!current || p.categoryId === current.categoryId))
      .slice(0, limit);
  }

  /**
   * Cambia el criterio de orden
   */
  setSortOrder(sort: SortOption): void {
    this.currentSort.set(sort);
  }

  /**
   * Selecciona categoría directa desde la pasarela
   */
  selectCategory(categoryId: string): void {
    this.filterRegistry.setFilterValue('categoryId', categoryId);
  }

  /**
   * Formateador de moneda utilitario
   */
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(value);
  }
}
