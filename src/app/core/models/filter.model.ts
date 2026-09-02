import { Product } from './product.model';

export type FilterType = 'checkbox-group' | 'range-slider' | 'color-palette' | 'toggle-switch' | 'tag-cloud';

export interface FilterOption {
  id: string;
  label: string;
  value: any;
  count?: number;
  colorHex?: string;
  badge?: string;
}

export interface FilterDefinition {
  id: string;
  title: string;
  type: FilterType;
  order: number;
  options?: FilterOption[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  defaultValue?: any;
  /**
   * Predicate function that tests if a given product matches the current filter value.
   * This decoupled design allows adding completely arbitrary new filters at runtime.
   */
  matches: (product: Product, selectedValue: any) => boolean;
}

export type FilterValuesState = Record<string, any>;
