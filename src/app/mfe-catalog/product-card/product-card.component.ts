import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { WhatsAppService } from '../../core/services/whatsapp.service';
import { InquiryService } from '../../core/services/inquiry.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article class="product-card glass-panel glass-panel-glow">
      <!-- Imagen y Badges Superiores -->
      <div class="card-media-wrapper">
        <a [routerLink]="['/brand', product().slug]" class="media-link">
          <img 
            [src]="product().images[0]" 
            [alt]="product().name"
            loading="lazy"
            class="product-image"
          />
        </a>

        <!-- Badge de Estado de Producto -->
        <div class="media-badges">
          @if (product().badge) {
            <span [class]="'card-badge ' + getBadgeClass(product().badge)">
              {{ product().badge }}
            </span>
          }
          @if (product().customization?.enabled) {
            <span class="card-badge badge-customizable" title="Permite grabado de nombre o código militar">
              ⚡ GRABADO ID
            </span>
          }
        </div>

        <!-- Botón de Vista Rápida a Branding Page -->
        <a [routerLink]="['/brand', product().slug]" class="quick-view-overlay">
          <span>ABRIR BRANDING PAGE →</span>
        </a>
      </div>

      <!-- Contenido de la Tarjeta -->
      <div class="card-body">
        <div class="card-meta">
          <span class="sku-tag">{{ product().sku }}</span>
          <div class="rating-stars">
            <span class="star-icon">★</span>
            <span class="rating-score">{{ product().rating }}</span>
            <span class="reviews-count">({{ product().reviewsCount }})</span>
          </div>
        </div>

        <h3 class="product-name">
          <a [routerLink]="['/brand', product().slug]">{{ product().name }}</a>
        </h3>

        <p class="product-desc">{{ product().shortDescription }}</p>

        <!-- Bloque de Precios -->
        <div class="price-row">
          <div class="price-group">
            <span class="current-price">{{ formatPrice(product().price) }} COP</span>
            @if (product().originalPrice; as orig) {
              <span class="original-price">{{ formatPrice(orig) }}</span>
            }
          </div>
          @if (product().inStock) {
            <span class="stock-indicator">En stock</span>
          }
        </div>

        <!-- Acciones: Branding Page y Quick WhatsApp -->
        <div class="card-actions">
          <a 
            [routerLink]="['/brand', product().slug]" 
            class="btn btn-secondary flex-1 btn-branding"
          >
            Branding Page
          </a>

          <!-- Botón de Compra Directa Rápida a WhatsApp -->
          <a 
            [href]="getQuickWhatsAppUrl()" 
            target="_blank" 
            rel="noopener noreferrer"
            class="btn-quick-wa" 
            title="Ordenar directo por WhatsApp"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </a>

          <!-- Botón de Agregar a Bolsa de Consulta -->
          <button 
            type="button"
            (click)="addToBag()" 
            class="btn-add-bag" 
            title="Agregar a la bolsa de cotización"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 01-8 0"></path>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .product-card {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border-radius: 14px;
      height: 100%;
    }
    .card-media-wrapper {
      position: relative;
      width: 100%;
      aspect-ratio: 1 / 1;
      background: #090d16;
      overflow: hidden;
    }
    .media-link {
      display: block;
      width: 100%;
      height: 100%;
    }
    .product-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .product-card:hover .product-image {
      transform: scale(1.06);
    }
    .media-badges {
      position: absolute;
      top: 10px;
      left: 10px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      z-index: 2;
    }
    .card-badge {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      font-weight: 700;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    }
    .badge-bestseller {
      background: linear-gradient(135deg, #f59e0b, #d97706);
      color: #000;
    }
    .badge-tactico {
      background: linear-gradient(135deg, var(--color-cyan), var(--color-cobalt));
      color: #000;
    }
    .badge-nuevo {
      background: #10b981;
      color: #000;
    }
    .badge-limited {
      background: #8b5cf6;
      color: #fff;
    }
    .badge-customizable {
      background: rgba(14, 20, 34, 0.9);
      color: var(--color-cyan);
      border: 1px solid var(--border-cyan);
    }
    .quick-view-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0.75rem;
      background: linear-gradient(to top, rgba(8, 11, 17, 0.95), transparent);
      display: flex;
      justify-content: center;
      opacity: 0;
      transform: translateY(10px);
      transition: all var(--transition-normal);
      z-index: 3;
    }
    .quick-view-overlay span {
      font-family: var(--font-heading);
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--color-cyan);
      letter-spacing: 0.05em;
    }
    .product-card:hover .quick-view-overlay {
      opacity: 1;
      transform: translateY(0);
    }
    .card-body {
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    .sku-tag {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: var(--text-muted);
    }
    .rating-stars {
      display: flex;
      align-items: center;
      gap: 3px;
      font-size: 0.75rem;
    }
    .star-icon {
      color: #f59e0b;
    }
    .rating-score {
      font-weight: 600;
      color: #fff;
    }
    .reviews-count {
      color: var(--text-muted);
    }
    .product-name {
      font-size: 1rem;
      line-height: 1.35;
      margin-bottom: 0.4rem;
    }
    .product-name a {
      color: #fff;
    }
    .product-name a:hover {
      color: var(--color-cyan);
    }
    .product-desc {
      font-size: 0.82rem;
      color: var(--text-secondary);
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-bottom: 1rem;
      flex: 1;
    }
    .price-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 1rem;
      padding-top: 0.5rem;
      border-top: 1px solid var(--border-subtle);
    }
    .price-group {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
    }
    .current-price {
      font-family: var(--font-heading);
      font-size: 1.15rem;
      font-weight: 700;
      color: #fff;
    }
    .original-price {
      font-size: 0.8rem;
      text-decoration: line-through;
      color: var(--text-muted);
    }
    .stock-indicator {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: #4ade80;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .stock-indicator::before {
      content: '';
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #4ade80;
    }
    .card-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .flex-1 {
      flex: 1;
    }
    .btn-branding {
      font-size: 0.78rem;
      padding: 0.5rem 0.75rem;
    }
    .btn-quick-wa {
      width: 38px;
      height: 38px;
      border-radius: 8px;
      background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all var(--transition-fast);
      box-shadow: 0 2px 8px rgba(37, 211, 102, 0.3);
    }
    .btn-quick-wa:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 14px rgba(37, 211, 102, 0.5);
    }
    .btn-add-bag {
      width: 38px;
      height: 38px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-medium);
      color: #cbd5e1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: all var(--transition-fast);
    }
    .btn-add-bag:hover {
      background: rgba(0, 242, 254, 0.15);
      border-color: var(--color-cyan);
      color: var(--color-cyan);
      transform: translateY(-2px);
    }
  `]
})
export class ProductCardComponent {
  product = input.required<Product>();
  
  private whatsappService = inject(WhatsAppService);
  private inquiryService = inject(InquiryService);

  formatPrice(val?: number): string {
    if (!val) return '';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  }

  getBadgeClass(badge?: string): string {
    switch (badge) {
      case 'BESTSELLER': return 'badge-bestseller';
      case 'TÁCTICO': return 'badge-tactico';
      case 'NUEVO': return 'badge-nuevo';
      case 'EDICIÓN LIMITADA': return 'badge-limited';
      default: return 'badge-tactico';
    }
  }

  getQuickWhatsAppUrl(): string {
    return this.whatsappService.generateProductOrderUrl({
      product: this.product(),
      quantity: 1,
      selectedSize: this.product().sizes?.[0],
      selectedColor: this.product().colors?.[0]?.name
    });
  }

  addToBag(): void {
    this.inquiryService.addItem(
      this.product(),
      1,
      this.product().sizes?.[0],
      this.product().colors?.[0]?.name
    );
  }
}
