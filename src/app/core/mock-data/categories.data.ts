import { Category } from '../models/category.model';

export const CATEGORIES_DATA: Category[] = [
  {
    id: 'all',
    slug: 'all',
    name: 'Todo el Merchandise',
    shortName: 'Todos',
    tagline: 'Equipamiento completo de la división',
    icon: 'grid',
    colorAccent: '#00f2fe',
    productCount: 6
  },
  {
    id: 'apparel',
    slug: 'camisetas-ropa',
    name: 'Camisetas & Ropa Táctica',
    shortName: 'Ropa / MTF',
    tagline: 'Textiles pesados 240g de alta resistencia',
    icon: 'shirt',
    colorAccent: '#3b82f6',
    productCount: 2
  },
  {
    id: 'id-wristbands',
    slug: 'manillas-identificacion',
    name: 'Manillas de Identificación',
    shortName: 'Manillas ID',
    tagline: 'Titanio, Silicona médica y Paracord con grabado láser',
    icon: 'shield',
    colorAccent: '#10b981',
    productCount: 2
  },
  {
    id: 'drinkware',
    slug: 'vasos-termos-tazas',
    name: 'Vasos, Termos & Tazas',
    shortName: 'Vasos / Termos',
    tagline: 'Aislamiento térmico al vacío y cerámica mate',
    icon: 'coffee',
    colorAccent: '#f59e0b',
    productCount: 2
  }
];
