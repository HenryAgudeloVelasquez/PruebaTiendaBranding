import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../core/services/product.service';
import { WhatsAppService } from '../core/services/whatsapp.service';
import { InquiryService } from '../core/services/inquiry.service';
import { Product } from '../core/models/product.model';
import { WhatsAppButtonComponent } from '../shared/components/whatsapp-button/whatsapp-button.component';
import { QrModalComponent } from '../shared/components/qr-modal/qr-modal.component';
import { CustomizerPreviewComponent } from './customizer-preview/customizer-preview.component';
import { FUNNEL_CAMPAIGNS } from '../core/mock-data/funnel-campaigns.data';

@Component({
  selector: 'app-branding-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    WhatsAppButtonComponent,
    QrModalComponent,
    CustomizerPreviewComponent
  ],
  template: `
    @if (product(); as prod) {
      <div class="branding-page container animate-fade-in">
        <!-- Navegación de Regreso -->
        <nav class="breadcrumb-nav">
          <a routerLink="/" class="back-link">
            ← Volver al Catálogo de División
          </a>
          <span class="nav-separator">/</span>
          <span class="nav-current">{{ prod.name }}</span>
        </nav>

        <!-- Cabecera de Marca Oficial de la Branding Page -->
        <header class="brand-hero-header">
          <div class="brand-insignia">
            <span class="insignia-badge">DIVISIÓN OFICIAL // AUTÉNTICO MTF MERCHANDISE</span>
            <span class="sku-highlight">SKU: {{ prod.sku }}</span>
          </div>
          <h1 class="brand-product-title">{{ prod.name }}</h1>
          <p class="brand-tagline">{{ prod.shortDescription }}</p>
        </header>

        <!-- Grid Principal: Galería & Detalle de Compra -->
        <div class="brand-main-grid">
          <!-- Columna Izquierda: Galería e Imagen de Alta Definición -->
          <div class="gallery-column">
            <div class="spotlight-frame glass-panel">
              <img 
                [src]="prod.images[selectedImageIndex()] || prod.images[0]" 
                [alt]="prod.name"
                class="spotlight-image"
              />
              <div class="spotlight-glow"></div>
              
              @if (prod.badge) {
                <div class="spotlight-badge">{{ prod.badge }}</div>
              }
            </div>

            <!-- Miniaturas / Ángulos -->
            @if (prod.images.length > 1) {
              <div class="thumbnails-track">
                @for (img of prod.images; track img; let i = $index) {
                  <button 
                    type="button"
                    (click)="selectedImageIndex.set(i)" 
                    [class.active]="selectedImageIndex() === i"
                    class="thumb-btn glass-panel"
                  >
                    <img [src]="img" [alt]="prod.name" />
                  </button>
                }
              </div>
            }

            <!-- Garantía de Autenticidad Táctica -->
            <div class="authenticity-card glass-panel">
              <div class="auth-icon">🛡️</div>
              <div class="auth-text">
                <strong>Certificado de Autenticidad MTF</strong>
                <p>Cada pieza cuenta con control de calidad de grado operativo y grabado de alta durabilidad.</p>
              </div>
            </div>
          </div>

          <!-- Columna Derecha: Configuración, Opciones & CTA WhatsApp -->
          <div class="details-column">
            <!-- Bloque de Precio y Stock -->
            <div class="pricing-card glass-panel">
              <div class="price-header">
                <div class="price-figures">
                  <span class="price-label">Precio Oficial</span>
                  <div class="figure-row">
                    <span class="main-price">{{ formatMoney(prod.price) }} COP</span>
                    @if (prod.originalPrice) {
                      <span class="discount-price">{{ formatMoney(prod.originalPrice) }}</span>
                    }
                  </div>
                </div>
                <div class="stock-status">
                  <span class="in-stock-pill">● Disponible para despacho</span>
                  <span class="stock-units">{{ prod.stockCount }} unidades en bodega</span>
                </div>
              </div>

              <!-- Selector de Tallas (si aplica) -->
              @if (prod.sizes && prod.sizes.length > 0) {
                <div class="variant-section">
                  <div class="variant-title-row">
                    <span class="variant-title">Talla / Medida:</span>
                    <span class="selected-variant-name">{{ selectedSize() }}</span>
                  </div>
                  <div class="options-pills">
                    @for (size of prod.sizes; track size) {
                      <button 
                        type="button"
                        (click)="selectedSize.set(size)"
                        [class.active]="selectedSize() === size"
                        class="pill-btn"
                      >
                        {{ size }}
                      </button>
                    }
                  </div>
                </div>
              }

              <!-- Selector de Colores / Acabados (si aplica) -->
              @if (prod.colors && prod.colors.length > 0) {
                <div class="variant-section">
                  <div class="variant-title-row">
                    <span class="variant-title">Color / Acabado:</span>
                    <span class="selected-variant-name">{{ selectedColor() }}</span>
                  </div>
                  <div class="color-swatches">
                    @for (col of prod.colors; track col.name) {
                      <button 
                        type="button"
                        (click)="selectedColor.set(col.name)"
                        [class.active]="selectedColor() === col.name"
                        class="swatch-btn"
                        [title]="col.name"
                      >
                        <span class="swatch-dot" [style.backgroundColor]="col.hex"></span>
                        <span class="swatch-label">{{ col.name }}</span>
                      </button>
                    }
                  </div>
                </div>
              }

              <!-- Selector de Cantidad -->
              <div class="quantity-section">
                <span class="variant-title">Cantidad:</span>
                <div class="qty-control">
                  <button type="button" (click)="decreaseQty()" class="qty-btn" [disabled]="quantity() <= 1">−</button>
                  <span class="qty-display">{{ quantity() }}</span>
                  <button type="button" (click)="increaseQty()" class="qty-btn" [disabled]="quantity() >= prod.stockCount">+</button>
                </div>
                <span class="total-calc">Total: <strong>{{ formatMoney(prod.price * quantity()) }} COP</strong></span>
              </div>
            </div>

            <!-- Personalizador en Vivo de Placa / Grabado (si aplica) -->
            @if (prod.customization?.enabled && prod.customization; as customConfig) {
              <app-customizer-preview 
                [config]="customConfig"
                [customText]="customText()"
                (textChange)="customText.set($event)"
              />
            }

            <!-- ZONA DE LLAMADO A LA ACCIÓN (CTA) WHATSAPP -->
            <div class="whatsapp-cta-card glass-panel">
              <div class="cta-header">
                <span class="badge badge-green">CANAL DIRECTO DE DESPACHO</span>
                <h3>Ordena Directo con un Asesor por WhatsApp</h3>
                <p>Tu orden se pre-completará con la talla, color y grabado personalizado listos para confirmar.</p>
              </div>

              <!-- Vista previa del mensaje que se enviará a WhatsApp -->
              <div class="message-preview-box">
                <div class="preview-bar">
                  <span>MENSAJE PRE-CARGADO PARA WHATSAPP:</span>
                </div>
                <div class="preview-text">
                  "Hola, deseo ordenar <strong>{{ prod.name }}</strong> (SKU: {{ prod.sku }}) x {{ quantity() }} unidad(es)
                  @if (selectedSize()) { | Talla: <em>{{ selectedSize() }}</em> }
                  @if (selectedColor()) { | Color: <em>{{ selectedColor() }}</em> }
                  @if (customText().trim().length > 0) { | Grabado ID: <strong>"{{ customText().toUpperCase() }}"</strong> }
                  | Total: <strong>{{ formatMoney(prod.price * quantity()) }} COP</strong>"
                </div>
              </div>

              <!-- Botones de Acción WhatsApp -->
              <div class="cta-buttons-stack">
                <app-whatsapp-button 
                  label="COMPRAR POR WHATSAPP AHORA"
                  [subtext]="'Despacho inmediato a todo el país • Atención 24/7'"
                  [url]="whatsAppUrl()"
                  size="large"
                  [fullWidth]="true"
                />

                <div class="secondary-actions-row">
                  <button (click)="openQrModal()" class="btn btn-secondary flex-1" type="button">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                    Escanear QR Móvil
                  </button>

                  <button (click)="addToBag()" class="btn btn-secondary flex-1" type="button">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 01-8 0"></path>
                    </svg>
                    Sumar a Bolsa
                  </button>
                </div>

                <!-- Botón Directo al Embudo de Oferta Flash -->
                <a [routerLink]="['/oferta', getOfferCampaignId(prod)]" class="btn-funnel-link-branding">
                  <span class="funnel-link-icon">⚡</span>
                  <span class="funnel-link-text">Ver Oferta Flash & Descuento Especial en Embudo WhatsApp →</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Ficha Técnica y Especificaciones de Grado Militar -->
        <section class="specs-section glass-panel">
          <div class="specs-header">
            <span class="badge badge-cyan">HOJA DE ESPECIFICACIONES TÉCNICAS</span>
            <h2>Materiales y Rendimiento de la División</h2>
          </div>

          <div class="specs-grid">
            <!-- Materiales -->
            <div class="specs-block">
              <h4>Composición & Materiales</h4>
              <ul class="specs-list">
                @for (mat of prod.materials; track mat) {
                  <li>
                    <span class="spec-check">✓</span>
                    <span>{{ mat }}</span>
                  </li>
                }
              </ul>
            </div>

            <!-- Tabla de Atributos -->
            <div class="specs-block">
              <h4>Ficha de Laboratorio Táctico</h4>
              <dl class="specs-table">
                @for (spec of prod.specs; track spec.label) {
                  <div class="spec-row">
                    <dt>{{ spec.label }}</dt>
                    <dd>{{ spec.value }}</dd>
                  </div>
                }
              </dl>
            </div>

            <!-- Características Clave -->
            <div class="specs-block">
              <h4>Características Operativas</h4>
              <ul class="specs-list">
                @for (feature of prod.features; track feature) {
                  <li>
                    <span class="spec-check">★</span>
                    <span>{{ feature }}</span>
                  </li>
                }
              </ul>
            </div>
          </div>
        </section>

        <!-- Barra Flotante Inferior en Dispositivos Móviles -->
        <div class="mobile-sticky-bar">
          <div class="mobile-bar-info">
            <span class="mobile-bar-price">{{ formatMoney(prod.price * quantity()) }}</span>
            <span class="mobile-bar-sku">{{ prod.sku }}</span>
          </div>
          <a [href]="whatsAppUrl()" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp flex-1">
            Comprar por WhatsApp
          </a>
        </div>

        <!-- Modal QR para Escanear con el Smartphone -->
        <app-qr-modal 
          [isOpen]="isQrModalOpen()"
          [whatsappUrl]="whatsAppUrl()"
          (onClose)="isQrModalOpen.set(false)"
        />
      </div>
    } @else {
      <!-- Producto no encontrado -->
      <div class="not-found-container container">
        <div class="glass-panel text-center p-8">
          <h2>Producto no localizado en el inventario</h2>
          <p>El artículo que buscas no existe o ha sido reasignado.</p>
          <a routerLink="/" class="btn btn-primary mt-4">Regresar a la Pasarela</a>
        </div>
      </div>
    }
  `,
  styles: [`
    .branding-page {
      padding-top: 2rem;
      padding-bottom: 6rem;
    }
    .breadcrumb-nav {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-bottom: 1.5rem;
    }
    .back-link {
      color: var(--color-cyan);
      font-family: var(--font-mono);
      font-weight: 600;
    }
    .back-link:hover {
      text-decoration: underline;
    }
    .nav-current {
      color: var(--text-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .brand-hero-header {
      margin-bottom: 2.5rem;
    }
    .brand-insignia {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 0.5rem;
    }
    .insignia-badge {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--color-cyan);
      letter-spacing: 0.1em;
      background: rgba(0, 242, 254, 0.1);
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      border: 1px solid rgba(0, 242, 254, 0.25);
    }
    .sku-highlight {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-muted);
    }
    .brand-product-title {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .brand-tagline {
      font-size: 1.1rem;
      color: var(--text-secondary);
      max-width: 800px;
    }
    .brand-main-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem;
      align-items: start;
      margin-bottom: 4rem;
    }
    .gallery-column {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      position: sticky;
      top: 90px;
    }
    .spotlight-frame {
      position: relative;
      width: 100%;
      aspect-ratio: 1 / 1;
      border-radius: 16px;
      overflow: hidden;
      background: #090d16;
      border: 1px solid var(--border-medium);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
    }
    .spotlight-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .spotlight-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 100%, rgba(0, 242, 254, 0.15), transparent 70%);
      pointer-events: none;
    }
    .spotlight-badge {
      position: absolute;
      top: 15px;
      left: 15px;
      background: linear-gradient(135deg, #f59e0b, #d97706);
      color: #000;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.35rem 0.75rem;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    }
    .thumbnails-track {
      display: flex;
      gap: 0.75rem;
    }
    .thumb-btn {
      width: 70px;
      height: 70px;
      border-radius: 8px;
      overflow: hidden;
      padding: 0;
      cursor: pointer;
      border: 1px solid var(--border-medium);
      transition: all var(--transition-fast);
    }
    .thumb-btn.active {
      border-color: var(--color-cyan);
      box-shadow: 0 0 10px rgba(0, 242, 254, 0.4);
    }
    .thumb-btn img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .authenticity-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      border-radius: 10px;
      border: 1px solid rgba(0, 242, 254, 0.2);
    }
    .auth-icon {
      font-size: 1.8rem;
    }
    .auth-text strong {
      display: block;
      color: #fff;
      font-size: 0.85rem;
    }
    .auth-text p {
      font-size: 0.78rem;
      color: var(--text-muted);
      margin: 0;
    }
    .details-column {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .pricing-card {
      padding: 1.75rem;
      border-radius: 14px;
    }
    .price-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.5rem;
      padding-bottom: 1.25rem;
      border-bottom: 1px solid var(--border-subtle);
    }
    .price-label {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
    }
    .figure-row {
      display: flex;
      align-items: baseline;
      gap: 0.75rem;
      margin-top: 0.25rem;
    }
    .main-price {
      font-family: var(--font-heading);
      font-size: 2rem;
      font-weight: 700;
      color: #fff;
    }
    .discount-price {
      font-size: 1.1rem;
      text-decoration: line-through;
      color: var(--text-muted);
    }
    .stock-status {
      text-align: right;
    }
    .in-stock-pill {
      display: block;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: #4ade80;
    }
    .stock-units {
      font-size: 0.72rem;
      color: var(--text-muted);
    }
    .variant-section {
      margin-bottom: 1.25rem;
    }
    .variant-title-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.65rem;
    }
    .variant-title {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--text-secondary);
      text-transform: uppercase;
    }
    .selected-variant-name {
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--color-cyan);
    }
    .options-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .pill-btn {
      padding: 0.5rem 1rem;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-medium);
      color: #cbd5e1;
      border-radius: 8px;
      cursor: pointer;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 600;
      transition: all var(--transition-fast);
    }
    .pill-btn:hover {
      border-color: var(--color-cyan);
      color: #fff;
    }
    .pill-btn.active {
      background: rgba(0, 242, 254, 0.15);
      border-color: var(--color-cyan);
      color: var(--color-cyan);
      box-shadow: 0 0 10px rgba(0, 242, 254, 0.25);
    }
    .color-swatches {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .swatch-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.45rem 0.85rem;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-medium);
      border-radius: 8px;
      cursor: pointer;
      color: #cbd5e1;
      font-size: 0.8rem;
      transition: all var(--transition-fast);
    }
    .swatch-btn.active {
      border-color: var(--color-cyan);
      background: rgba(0, 242, 254, 0.12);
      color: #fff;
    }
    .swatch-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .quantity-section {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-subtle);
    }
    .qty-control {
      display: flex;
      align-items: center;
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid var(--border-medium);
      border-radius: 8px;
      overflow: hidden;
    }
    .qty-btn {
      width: 34px;
      height: 34px;
      background: none;
      border: none;
      color: #fff;
      font-size: 1.1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background var(--transition-fast);
    }
    .qty-btn:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.1);
    }
    .qty-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
    .qty-display {
      width: 36px;
      text-align: center;
      font-family: var(--font-mono);
      font-weight: 700;
      color: #fff;
    }
    .total-calc {
      font-size: 0.95rem;
      color: var(--text-secondary);
    }
    .total-calc strong {
      color: #fff;
    }
    .whatsapp-cta-card {
      padding: 1.75rem;
      border-radius: 14px;
      border: 1px solid rgba(37, 211, 102, 0.35);
      background: linear-gradient(145deg, rgba(14, 20, 34, 0.95), rgba(18, 40, 30, 0.4));
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(37, 211, 102, 0.15);
    }
    .cta-header h3 {
      font-size: 1.25rem;
      margin-top: 0.5rem;
      margin-bottom: 0.25rem;
    }
    .cta-header p {
      font-size: 0.85rem;
      margin-bottom: 1rem;
    }
    .message-preview-box {
      background: rgba(0, 0, 0, 0.45);
      border: 1px dashed rgba(37, 211, 102, 0.4);
      border-radius: 8px;
      padding: 0.85rem;
      margin-bottom: 1.25rem;
    }
    .preview-bar {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: #4ade80;
      letter-spacing: 0.05em;
      margin-bottom: 0.35rem;
    }
    .preview-text {
      font-size: 0.8rem;
      color: #cbd5e1;
      line-height: 1.4;
    }
    .preview-text em {
      color: var(--color-cyan);
    }
    .preview-text strong {
      color: #fff;
    }
    .cta-buttons-stack {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .secondary-actions-row {
      display: flex;
      gap: 0.75rem;
    }
    .flex-1 {
      flex: 1;
    }
    .btn-funnel-link-branding {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      padding: 0.75rem 1rem;
      border-radius: 10px;
      background: linear-gradient(135deg, rgba(217, 119, 6, 0.25), rgba(180, 83, 9, 0.45));
      border: 1px solid #f59e0b;
      color: #fef08a;
      font-size: 0.82rem;
      font-weight: 800;
      text-decoration: none;
      transition: all var(--transition-fast);
      box-shadow: 0 4px 14px rgba(217, 119, 6, 0.25);
      margin-top: 0.75rem;
      text-align: center;
      cursor: pointer;
    }
    .btn-funnel-link-branding:hover {
      background: linear-gradient(135deg, #d97706, #b45309);
      color: #ffffff;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(245, 158, 11, 0.5);
    }
    .funnel-link-icon {
      font-size: 0.95rem;
    }
    .specs-section {
      padding: 2.5rem;
      border-radius: 16px;
      margin-top: 2rem;
    }
    .specs-header {
      margin-bottom: 2rem;
    }
    .specs-header h2 {
      font-size: 1.75rem;
      margin-top: 0.5rem;
    }
    .specs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    .specs-block h4 {
      font-size: 1rem;
      color: var(--color-cyan);
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--border-subtle);
      padding-bottom: 0.5rem;
    }
    .specs-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .specs-list li {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      font-size: 0.85rem;
      color: var(--text-secondary);
    }
    .spec-check {
      color: var(--color-cyan);
      font-weight: 800;
    }
    .specs-table {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }
    .spec-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
      border-bottom: 1px dashed var(--border-subtle);
      padding-bottom: 0.35rem;
    }
    .spec-row dt {
      color: var(--text-muted);
    }
    .spec-row dd {
      font-weight: 600;
      color: #fff;
      text-align: right;
    }
    .mobile-sticky-bar {
      display: none;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(14, 20, 34, 0.95);
      backdrop-filter: blur(12px);
      border-top: 1px solid var(--border-medium);
      padding: 0.75rem 1rem;
      z-index: 100;
      align-items: center;
      gap: 1rem;
    }
    .mobile-bar-info {
      display: flex;
      flex-direction: column;
    }
    .mobile-bar-price {
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 1.15rem;
      color: #fff;
    }
    .mobile-bar-sku {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--text-muted);
    }
    .not-found-container {
      padding: 4rem 1rem;
    }
    .text-center {
      text-align: center;
    }
    .p-8 {
      padding: 2rem;
    }
    .mt-4 {
      margin-top: 1rem;
    }
    @media (max-width: 960px) {
      .brand-main-grid {
        grid-template-columns: 1fr;
      }
      .gallery-column {
        position: static;
      }
      .mobile-sticky-bar {
        display: flex;
      }
      .brand-product-title {
        font-size: 1.85rem;
      }
    }
  `]
})
export class BrandingPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private whatsappService = inject(WhatsAppService);
  private inquiryService = inject(InquiryService);

  product = signal<Product | undefined>(undefined);
  selectedImageIndex = signal<number>(0);
  selectedSize = signal<string>('');
  selectedColor = signal<string>('');
  quantity = signal<number>(1);
  customText = signal<string>('');
  isQrModalOpen = signal<boolean>(false);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        const found = this.productService.getProductBySlug(slug);
        if (found) {
          this.product.set(found);
          this.selectedSize.set(found.sizes?.[0] || '');
          this.selectedColor.set(found.colors?.[0]?.name || '');
          this.quantity.set(1);
          this.customText.set('');
          this.selectedImageIndex.set(0);
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } else {
          this.product.set(undefined);
        }
      }
    });
  }

  increaseQty(): void {
    const p = this.product();
    if (p && this.quantity() < p.stockCount) {
      this.quantity.update(q => q + 1);
    }
  }

  decreaseQty(): void {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }

  whatsAppUrl = computed<string>(() => {
    const p = this.product();
    if (!p) return '';
    return this.whatsappService.generateProductOrderUrl({
      product: p,
      quantity: this.quantity(),
      selectedSize: this.selectedSize(),
      selectedColor: this.selectedColor(),
      customText: this.customText()
    });
  });

  addToBag(): void {
    const p = this.product();
    if (p) {
      this.inquiryService.addItem(
        p,
        this.quantity(),
        this.selectedSize(),
        this.selectedColor(),
        undefined,
        this.customText()
      );
    }
  }

  openQrModal(): void {
    this.isQrModalOpen.set(true);
  }

  formatMoney(val: number): string {
    return this.productService.formatCurrency(val);
  }

  getOfferCampaignId(prod: Product): string {
    const campaign = FUNNEL_CAMPAIGNS.find(c => c.productId === prod.id && c.isActive);
    if (campaign) {
      return campaign.campaignId;
    }
    return prod.slug;
  }
}
