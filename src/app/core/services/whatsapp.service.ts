import { Injectable } from '@angular/core';
import { STORE_CONFIG } from '../config/store.config';
import { Product } from '../models/product.model';
import { InquiryItem } from '../models/inquiry.model';

export interface WhatsAppOrderPayload {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  selectedFinish?: string;
  customText?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WhatsAppService {
  private readonly baseUrl = 'https://wa.me';

  /**
   * Genera el enlace directo de WhatsApp con mensaje estructurado para un producto individual
   */
  generateProductOrderUrl(payload: WhatsAppOrderPayload): string {
    const { product, quantity, selectedSize, selectedColor, selectedFinish, customText } = payload;
    const total = product.price * quantity;
    const formattedPrice = this.formatCurrency(product.price);
    const formattedTotal = this.formatCurrency(total);
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    let message = `🛡️ *MTF MERCH // PEDIDO DE PRODUCTO OFICIAL* 🛡️\n\n`;
    message += `Hola, deseo ordenar este producto del catálogo MTF:\n\n`;
    message += `📦 *Producto:* ${product.name}\n`;
    message += `🔖 *SKU:* ${product.sku}\n`;
    message += `💰 *Precio Unitario:* ${formattedPrice} COP\n`;
    message += `🔢 *Cantidad:* ${quantity} unidad(es)\n`;

    if (selectedSize) {
      message += `📏 *Talla / Medida:* ${selectedSize}\n`;
    }
    if (selectedColor) {
      message += `🎨 *Color:* ${selectedColor}\n`;
    }
    if (selectedFinish) {
      message += `✨ *Acabado:* ${selectedFinish}\n`;
    }
    if (customText && customText.trim().length > 0) {
      message += `✍️ *PERSONALIZACIÓN / GRABADO ID:* "${customText.trim().toUpperCase()}"\n`;
    }

    message += `\n💵 *TOTAL ESTIMADO:* ${formattedTotal} COP\n`;
    if (currentUrl) {
      message += `🔗 *Enlace de Referencia:* ${currentUrl}\n`;
    }
    message += `\n¿Tienen disponibilidad para despacho y cuáles son los medios de pago disponibles?`;

    return `${this.baseUrl}/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  /**
   * Genera el enlace directo para una orden múltiple desde el Inquiry Drawer (Bolsa de Cotización)
   */
  generateBulkInquiryUrl(items: InquiryItem[], totalAmount: number): string {
    const formattedTotal = this.formatCurrency(totalAmount);

    let message = `🛡️ *MTF MERCH // COTIZACIÓN MULTI-PRODUCTO* 🛡️\n\n`;
    message += `Hola, deseo cotizar y ordenar los siguientes ${items.length} artículos del catálogo MTF:\n\n`;

    items.forEach((item, index) => {
      message += `*${index + 1}. ${item.product.name}*\n`;
      message += `   • SKU: ${item.product.sku}\n`;
      message += `   • Cantidad: ${item.quantity} x ${this.formatCurrency(item.unitPrice)} COP\n`;
      if (item.selectedSize) message += `   • Talla: ${item.selectedSize}\n`;
      if (item.selectedColor) message += `   • Color: ${item.selectedColor}\n`;
      if (item.selectedFinish) message += `   • Acabado: ${item.selectedFinish}\n`;
      if (item.customText) message += `   • Grabado ID: "${item.customText.toUpperCase()}"\n`;
      message += `   • Subtotal: ${this.formatCurrency(item.subtotal)} COP\n\n`;
    });

    message += `═══════════════════════════\n`;
    message += `💰 *GRAN TOTAL:* ${formattedTotal} COP\n`;
    message += `═══════════════════════════\n\n`;
    message += `Por favor indíquenme los pasos para concretar la compra y coordinar el envío a mi ciudad. ¡Gracias!`;

    return `${this.baseUrl}/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  /**
   * Enlace para dudas o soporte rápido general
   */
  generateGeneralInquiryUrl(): string {
    const msg = `¡Hola MTF Division! 👋 Tengo una consulta sobre el catálogo de merchandise y personalización de productos.`;
    return `${this.baseUrl}/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(value);
  }
}
