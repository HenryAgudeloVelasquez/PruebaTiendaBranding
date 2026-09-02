import { Injectable, signal, computed } from '@angular/core';
import { InquiryItem } from '../models/inquiry.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private readonly itemsSignal = signal<InquiryItem[]>([]);
  public readonly items = this.itemsSignal.asReadonly();

  public readonly isDrawerOpen = signal<boolean>(false);

  public readonly itemCount = computed(() => {
    return this.itemsSignal().reduce((sum, item) => sum + item.quantity, 0);
  });

  public readonly totalAmount = computed(() => {
    return this.itemsSignal().reduce((sum, item) => sum + item.subtotal, 0);
  });

  addItem(
    product: Product,
    quantity = 1,
    selectedSize?: string,
    selectedColor?: string,
    selectedFinish?: string,
    customText?: string
  ): void {
    const itemId = `${product.id}-${selectedSize || ''}-${selectedColor || ''}-${customText || ''}`;

    this.itemsSignal.update(items => {
      const existingIndex = items.findIndex(i => i.id === itemId);

      if (existingIndex > -1) {
        const updated = [...items];
        const existing = updated[existingIndex];
        const newQty = existing.quantity + quantity;
        updated[existingIndex] = {
          ...existing,
          quantity: newQty,
          subtotal: existing.unitPrice * newQty
        };
        return updated;
      } else {
        const newItem: InquiryItem = {
          id: itemId,
          product,
          quantity,
          selectedSize,
          selectedColor,
          selectedFinish,
          customText,
          unitPrice: product.price,
          subtotal: product.price * quantity
        };
        return [...items, newItem];
      }
    });

    // Abrir automáticamente el drawer para retroalimentación visual
    this.openDrawer();
  }

  updateQuantity(itemId: string, newQty: number): void {
    if (newQty <= 0) {
      this.removeItem(itemId);
      return;
    }

    this.itemsSignal.update(items => {
      return items.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: newQty,
            subtotal: item.unitPrice * newQty
          };
        }
        return item;
      });
    });
  }

  removeItem(itemId: string): void {
    this.itemsSignal.update(items => items.filter(i => i.id !== itemId));
  }

  clearInquiry(): void {
    this.itemsSignal.set([]);
  }

  openDrawer(): void {
    this.isDrawerOpen.set(true);
  }

  closeDrawer(): void {
    this.isDrawerOpen.set(false);
  }

  toggleDrawer(): void {
    this.isDrawerOpen.update(v => !v);
  }
}
