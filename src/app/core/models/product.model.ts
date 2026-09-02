export interface ProductVariant {
  id: string;
  name: string;
  type: 'size' | 'color' | 'finish' | 'edition';
  value: string;
  extraPrice?: number;
  inStock?: boolean;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductCustomizationOptions {
  enabled: boolean;
  type: 'text' | 'callsign' | 'serial';
  label: string;
  placeholder: string;
  maxLength: number;
  hint: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: 'NUEVO' | 'BESTSELLER' | 'EDICIÓN LIMITADA' | 'TÁCTICO' | 'EXCLUSIVO';
  images: string[];
  inStock: boolean;
  stockCount: number;
  tags: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  finishes?: string[];
  specs: ProductSpecification[];
  materials: string[];
  customization?: ProductCustomizationOptions;
  features: string[];
  isFeatured?: boolean;
}
