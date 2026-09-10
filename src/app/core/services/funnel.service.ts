import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FunnelConfig, UtmParams } from '../models/funnel.model';
import { FUNNEL_CAMPAIGNS } from '../mock-data/funnel-campaigns.data';
import { PRODUCTS_DATA } from '../mock-data/products.data';
import { STORE_CONFIG } from '../config/store.config';

@Injectable({
  providedIn: 'root'
})
export class FunnelService {
  private readonly campaigns: FunnelConfig[] = FUNNEL_CAMPAIGNS;

  /**
   * Obtiene la configuración de una campaña por su campaignId o slug.
   * Si no coincide con una campaña predefinida, genera un embudo dinámico
   * a partir de un producto del catálogo si existe.
   */
  getCampaignData(campaignId: string): Observable<FunnelConfig | null> {
    const normalizedId = campaignId.toLowerCase().trim();

    // 1. Buscar en campañas preconfiguradas
    const foundCampaign = this.campaigns.find(
      c => c.campaignId.toLowerCase() === normalizedId && c.isActive
    );

    if (foundCampaign) {
      return of(foundCampaign);
    }

    // 2. Fallback inteligente: si coincide con el slug o id de un producto del catálogo
    const product = PRODUCTS_DATA.find(
      p => p.slug.toLowerCase() === normalizedId || p.id.toLowerCase() === normalizedId
    );

    if (product) {
      const dynamicConfig: FunnelConfig = {
        campaignId: product.slug,
        productId: product.id,
        title: product.name,
        subtitle: product.shortDescription,
        badge: product.badge || 'PROMO EXCLUSIVA WHATSAPP',
        imageUrl: product.images[0] || '/assets/products/mtf-tshirt.jpg',
        galleryImages: product.images,
        price: product.originalPrice || Math.round(product.price * 1.25),
        discountPrice: product.price,
        currency: 'COP',
        whatsappNumber: STORE_CONFIG.whatsappNumber,
        defaultMessage: `¡Hola MTF Store! Quiero acceder a la oferta especial de "${product.name}" con precio de ${this.formatCurrency(product.price)} COP.`,
        isActive: product.inStock,
        urgency: {
          enabled: true,
          minutesRemaining: 45,
          bannerText: '⚡ OFERTA VÁLIDA POR TIEMPO LIMITADO // PRECIO ESPECIAL DE CAMPAÑA',
          stockLeft: product.stockCount || 5
        },
        socialProof: {
          rating: product.rating,
          reviewsCount: product.reviewsCount,
          recentOrdersCount: Math.max(12, Math.floor(product.reviewsCount / 2))
        },
        bulletPoints: product.features,
        variantOption: product.sizes?.length
          ? { label: 'Selecciona tu Talla', values: product.sizes }
          : product.colors?.length
          ? { label: 'Selecciona tu Color', values: product.colors.map(c => c.name) }
          : undefined,
        guaranteeText: '🛡️ Garantía oficial MTF de calidad militar y satisfacción comprobada.',
        shippingNote: '🚀 Envíos a toda Colombia con despacho coordinado por WhatsApp.'
      };
      return of(dynamicConfig);
    }

    return of(null);
  }

  /**
   * Obtiene todos los IDs de campañas para el prerenderizado en SSR
   */
  getAllCampaignIds(): string[] {
    const campaignIds = this.campaigns.filter(c => c.isActive).map(c => c.campaignId);
    const productSlugs = PRODUCTS_DATA.map(p => p.slug);
    return Array.from(new Set([...campaignIds, ...productSlugs]));
  }

  /**
   * Construye el enlace parametrizado a WhatsApp con los datos de trazabilidad UTM
   */
  buildWhatsappLink(
    config: FunnelConfig,
    utm: UtmParams,
    selectedVariant?: string
  ): string {
    const source = utm.source || 'organico';
    const medium = utm.medium || 'web';
    const campaign = utm.campaign || config.campaignId;

    let trackingTag = `[Origen: ${source} | Medio: ${medium} | Campaña: ${campaign}`;
    if (utm.content) trackingTag += ` | Contenido: ${utm.content}`;
    trackingTag += `]`;

    let message = `🛡️ *MTF MERCH // PEDIDO DE CAMPAÑA DIRECTA* 🛡️\n\n`;
    message += `${config.defaultMessage}\n\n`;
    message += `📦 *Campaña:* ${config.title}\n`;
    
    if (config.discountPrice) {
      message += `💰 *Precio Promo:* ${this.formatCurrency(config.discountPrice)} ${config.currency || 'COP'}\n`;
      message += `🏷️ *Precio Regular:* ~${this.formatCurrency(config.price)} COP~\n`;
    } else {
      message += `💰 *Precio:* ${this.formatCurrency(config.price)} ${config.currency || 'COP'}\n`;
    }

    if (selectedVariant) {
      message += `⚙️ *Opción Seleccionada:* ${selectedVariant}\n`;
    }

    message += `\n📍 *Trazabilidad:* ${trackingTag}\n\n`;
    message += `¿Me confirman disponibilidad y los datos para realizar la transferencia / contraentrega? ¡Gracias!`;

    const encodedMessage = encodeURIComponent(message);
    const phone = config.whatsappNumber.replace(/[^0-9]/g, '');

    return `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;
  }

  /**
   * Disparo de evento de conversión para métricas
   */
  trackConversion(campaignId: string, utm: UtmParams): void {
    if (typeof window !== 'undefined') {
      console.log(`[MTF Analytics] Lead WhatsApp generado para campaña: "${campaignId}"`, {
        utm_source: utm.source,
        utm_medium: utm.medium,
        utm_campaign: utm.campaign,
        timestamp: new Date().toISOString()
      });

      // Hook para Google Analytics 4 si gtag está presente en window
      const win = window as unknown as { gtag?: (...args: unknown[]) => void };
      if (typeof win.gtag === 'function') {
        win.gtag('event', 'generate_lead', {
          event_category: 'funnel_whatsapp',
          event_label: campaignId,
          source: utm.source,
          medium: utm.medium,
          campaign: utm.campaign
        });
      }
    }
  }

  /**
   * Formateador de moneda en pesos colombianos
   */
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(value);
  }
}
