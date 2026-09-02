import { Product } from './product.model';

export interface InquiryItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  selectedFinish?: string;
  customText?: string;
  unitPrice: number;
  subtotal: number;
}
