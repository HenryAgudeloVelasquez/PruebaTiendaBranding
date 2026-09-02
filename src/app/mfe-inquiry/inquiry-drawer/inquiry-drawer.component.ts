import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InquiryService } from '../../core/services/inquiry.service';
import { WhatsAppService } from '../../core/services/whatsapp.service';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-inquiry-drawer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (inquiryService.isDrawerOpen()) {
      <div class="drawer-overlay" (click)="inquiryService.closeDrawer()">
        <aside class="drawer-container glass-panel" (click)="$event.stopPropagation()">
          <!-- Cabecera del Drawer -->
          <div class="drawer-header">
            <div class="header-titles">
              <span class="badge badge-cyan">BOLSA DE COTIZACIÓN TÁCTICA</span>
              <h3>Tus Artículos ({{ inquiryService.itemCount() }})</h3>
            </div>
            <button (click)="inquiryService.closeDrawer()" class="btn-close" aria-label="Cerrar bolsa">✕</button>
          </div>

          <!-- Contenido: Lista de Artículos -->
          <div class="drawer-body">
            @if (inquiryService.items().length > 0) {
              <div class="items-list">
                @for (item of inquiryService.items(); track item.id) {
                  <div class="drawer-item glass-panel">
                    <img [src]="item.product.images[0]" [alt]="item.product.name" class="item-thumb" />

                    <div class="item-details">
                      <div class="item-name-row">
                        <h4 class="item-title">
                          <a [routerLink]="['/brand', item.product.slug]" (click)="inquiryService.closeDrawer()">
                            {{ item.product.name }}
                          </a>
                        </h4>
                        <button (click)="inquiryService.removeItem(item.id)" class="btn-remove" title="Eliminar artículo">✕</button>
                      </div>

                      <div class="item-variants-summary">
                        @if (item.selectedSize) {
                          <span class="variant-tag">Talla: {{ item.selectedSize }}</span>
                        }
                        @if (item.selectedColor) {
                          <span class="variant-tag">Color: {{ item.selectedColor }}</span>
                        }
                      </div>

                      @if (item.customText) {
                        <div class="item-custom-box">
                          <span class="custom-icon">⚡</span>
                          <span class="custom-val">ID: "{{ item.customText.toUpperCase() }}"</span>
                        </div>
                      }

                      <div class="item-footer">
                        <div class="qty-stepper">
                          <button (click)="inquiryService.updateQuantity(item.id, item.quantity - 1)" class="stepper-btn">−</button>
                          <span class="stepper-val">{{ item.quantity }}</span>
                          <button (click)="inquiryService.updateQuantity(item.id, item.quantity + 1)" class="stepper-btn">+</button>
                        </div>

                        <span class="item-subtotal">{{ formatMoney(item.subtotal) }} COP</span>
                      </div>
                    </div>
                  </div>
                }
              </div>
            } @else {
              <!-- Estado Vacío -->
              <div class="drawer-empty">
                <span class="empty-icon">🎒</span>
                <h4>Tu bolsa táctica está vacía</h4>
                <p>Agrega camisetas, manillas de identificación con grabado o termos para cotizar todo en conjunto.</p>
                <button (click)="inquiryService.closeDrawer()" class="btn btn-primary">
                  Explorar Catálogo
                </button>
              </div>
            }
          </div>

          <!-- Pie del Drawer con Total y CTA Consolidado de WhatsApp -->
          @if (inquiryService.items().length > 0) {
            <div class="drawer-footer">
              <div class="footer-totals">
                <span class="total-label">Total Estimado del Pedido:</span>
                <span class="total-amount">{{ formatMoney(inquiryService.totalAmount()) }} COP</span>
              </div>

              <!-- Botón Consolidado a WhatsApp -->
              <a 
                [href]="getBulkWhatsAppUrl()" 
                target="_blank" 
                rel="noopener noreferrer"
                class="btn btn-whatsapp w-full btn-lg"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                ENVIAR PEDIDO COMPLETO A WHATSAPP
              </a>

              <div class="footer-aux">
                <button (click)="inquiryService.clearInquiry()" class="btn-clear-bag">
                  Vaciar Bolsa
                </button>
              </div>
            </div>
          }
        </aside>
      </div>
    }
  `,
  styles: [`
    .drawer-overlay {
      position: fixed;
      inset: 0;
      background: rgba(4, 6, 12, 0.7);
      backdrop-filter: blur(8px);
      z-index: 9999;
      display: flex;
      justify-content: flex-end;
      animation: fadeIn 0.2s ease;
    }
    .drawer-container {
      width: 100%;
      max-width: 460px;
      height: 100%;
      background: #0b0f19;
      border-left: 1px solid var(--border-medium);
      display: flex;
      flex-direction: column;
      box-shadow: -15px 0 50px rgba(0, 0, 0, 0.8);
      animation: slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes slideLeft {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    .drawer-header {
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 1px solid var(--border-subtle);
    }
    .header-titles h3 {
      font-size: 1.25rem;
      margin-top: 0.35rem;
    }
    .btn-close {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 1.25rem;
      cursor: pointer;
      padding: 0.25rem;
      transition: color var(--transition-fast);
    }
    .btn-close:hover {
      color: #fff;
    }
    .drawer-body {
      flex: 1;
      overflow-y: auto;
      padding: 1.25rem;
    }
    .items-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .drawer-item {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      background: rgba(18, 26, 43, 0.6);
      border-radius: 10px;
    }
    .item-thumb {
      width: 72px;
      height: 72px;
      border-radius: 8px;
      object-fit: cover;
      background: #000;
      flex-shrink: 0;
    }
    .item-details {
      flex: 1;
      min-width: 0;
    }
    .item-name-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.25rem;
    }
    .item-title {
      font-size: 0.85rem;
      line-height: 1.3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .item-title a {
      color: #fff;
    }
    .item-title a:hover {
      color: var(--color-cyan);
    }
    .btn-remove {
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 0.8rem;
      padding: 0 0.25rem;
    }
    .btn-remove:hover {
      color: #f87171;
    }
    .item-variants-summary {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      margin-bottom: 0.35rem;
    }
    .variant-tag {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      color: var(--text-muted);
      background: rgba(255, 255, 255, 0.05);
      padding: 0.1rem 0.4rem;
      border-radius: 4px;
    }
    .item-custom-box {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      background: rgba(0, 242, 254, 0.08);
      border: 1px dashed rgba(0, 242, 254, 0.25);
      border-radius: 4px;
      padding: 0.2rem 0.4rem;
      margin-bottom: 0.5rem;
      font-family: var(--font-mono);
      font-size: 0.68rem;
      color: var(--color-cyan);
    }
    .item-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.5rem;
    }
    .qty-stepper {
      display: flex;
      align-items: center;
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid var(--border-medium);
      border-radius: 6px;
    }
    .stepper-btn {
      width: 26px;
      height: 26px;
      background: none;
      border: none;
      color: #fff;
      cursor: pointer;
      font-size: 0.9rem;
    }
    .stepper-val {
      width: 24px;
      text-align: center;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: #fff;
    }
    .item-subtotal {
      font-family: var(--font-heading);
      font-weight: 700;
      color: #fff;
      font-size: 0.9rem;
    }
    .drawer-empty {
      text-align: center;
      padding: 4rem 1.5rem;
    }
    .empty-icon {
      font-size: 3rem;
      display: block;
      margin-bottom: 1rem;
    }
    .drawer-empty h4 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
    .drawer-empty p {
      font-size: 0.85rem;
      margin-bottom: 1.5rem;
    }
    .drawer-footer {
      padding: 1.5rem;
      border-top: 1px solid var(--border-subtle);
      background: rgba(14, 20, 34, 0.95);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .footer-totals {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .total-label {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--text-muted);
      text-transform: uppercase;
    }
    .total-amount {
      font-family: var(--font-heading);
      font-size: 1.4rem;
      font-weight: 700;
      color: #fff;
    }
    .w-full {
      width: 100%;
    }
    .btn-lg {
      padding: 0.85rem;
      font-size: 0.88rem;
    }
    .footer-aux {
      display: flex;
      justify-content: center;
    }
    .btn-clear-bag {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 0.75rem;
      font-family: var(--font-mono);
      cursor: pointer;
      text-decoration: underline;
    }
    .btn-clear-bag:hover {
      color: #f87171;
    }
  `]
})
export class InquiryDrawerComponent {
  inquiryService = inject(InquiryService);
  whatsappService = inject(WhatsAppService);
  productService = inject(ProductService);

  formatMoney(val: number): string {
    return this.productService.formatCurrency(val);
  }

  getBulkWhatsAppUrl(): string {
    return this.whatsappService.generateBulkInquiryUrl(
      this.inquiryService.items(),
      this.inquiryService.totalAmount()
    );
  }
}
