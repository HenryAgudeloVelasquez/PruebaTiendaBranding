import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { STORE_CONFIG } from '../../core/config/store.config';
import { InquiryService } from '../../core/services/inquiry.service';
import { ProductService } from '../../core/services/product.service';
import { WhatsAppService } from '../../core/services/whatsapp.service';

@Component({
  selector: 'app-shell-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Barra Superior Táctica de Notificaciones -->
    <div class="top-announcement-bar">
      <div class="container bar-content">
        <span class="live-dot"></span>
        <span class="announcement-text">
          DESPACHOS ACTIVOS // PERSONALIZACIÓN LÁSER GRATUITA EN MANILLAS ID // ASESORÍA DIRECTA EN WHATSAPP
        </span>
        <a [href]="whatsappSupportUrl" target="_blank" rel="noopener noreferrer" class="support-link">
          Línea de Atención: {{ storeConfig.whatsappDisplay }}
        </a>
      </div>
    </div>

    <!-- Navegación Principal -->
    <header class="main-header glass-panel">
      <div class="container header-inner">
        <!-- Logo de la Marca MTF -->
        <a routerLink="/" class="brand-logo">
          <div class="logo-symbol">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div class="logo-titles">
            <span class="brand-name">MTF MERCH</span>
            <span class="brand-sub">TACTICAL APPAREL & GEAR</span>
          </div>
        </a>

        <!-- Enlaces Rápidos de Navegación por Categoría -->
        <nav class="nav-shortcuts">
          <a routerLink="/" (click)="selectCat('all')" class="nav-item" [class.active]="isCatActive('all')">
            Todo
          </a>
          <a routerLink="/" (click)="selectCat('apparel')" class="nav-item" [class.active]="isCatActive('apparel')">
            Camisetas & Ropa
          </a>
          <a routerLink="/" (click)="selectCat('id-wristbands')" class="nav-item" [class.active]="isCatActive('id-wristbands')">
            Manillas ID
          </a>
          <a routerLink="/" (click)="selectCat('drinkware')" class="nav-item" [class.active]="isCatActive('drinkware')">
            Vasos & Termos
          </a>
          <a routerLink="/oferta/blackout-operator" class="nav-item drop-highlight" title="Ver Drop Táctico / Embudo de Campaña">
            ⚡ Drops & Ofertas
          </a>
        </nav>

        <!-- Acciones: Botón de Bolsa de Cotización & Soporte WhatsApp -->
        <div class="header-actions">
          <a 
            [href]="whatsappSupportUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="wa-quick-contact"
            title="Chat con un asesor"
          >
            <span class="wa-dot"></span>
            <span class="wa-text">WhatsApp Asesor</span>
          </a>

          <!-- Botón de Bolsa Flotante / Drawer -->
          <button (click)="inquiryService.toggleDrawer()" class="bag-trigger-btn" aria-label="Abrir bolsa de cotización">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 01-8 0"></path>
            </svg>
            @if (inquiryService.itemCount() > 0) {
              <span class="bag-badge">{{ inquiryService.itemCount() }}</span>
            }
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .top-announcement-bar {
      background: #06090e;
      border-bottom: 1px solid var(--border-subtle);
      font-family: var(--font-mono);
      font-size: 0.68rem;
      padding: 0.35rem 0;
      color: var(--text-secondary);
    }
    .bar-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
    .live-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--color-cyan);
      box-shadow: 0 0 6px var(--color-cyan);
      display: inline-block;
      flex-shrink: 0;
    }
    .announcement-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: 0.05em;
    }
    .support-link {
      color: var(--color-cyan);
      white-space: nowrap;
    }
    .support-link:hover {
      text-decoration: underline;
    }
    .main-header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(8, 11, 17, 0.85);
      border-bottom: 1px solid var(--border-subtle);
      border-radius: 0;
      padding: 0.75rem 0;
    }
    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .logo-symbol {
      width: 38px;
      height: 38px;
      border-radius: 8px;
      background: linear-gradient(135deg, rgba(0, 242, 254, 0.2), rgba(0, 114, 255, 0.1));
      border: 1px solid var(--border-cyan);
      color: var(--color-cyan);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-cyan-glow);
    }
    .logo-titles {
      display: flex;
      flex-direction: column;
    }
    .brand-name {
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 1.15rem;
      letter-spacing: 0.05em;
      color: #fff;
    }
    .brand-sub {
      font-family: var(--font-mono);
      font-size: 0.6rem;
      color: var(--color-cyan);
      letter-spacing: 0.12em;
    }
    .nav-shortcuts {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .nav-item {
      padding: 0.4rem 0.85rem;
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--text-secondary);
      transition: all var(--transition-fast);
      cursor: pointer;
    }
    .nav-item:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.05);
    }
    .nav-item.active {
      color: var(--color-cyan);
      background: rgba(0, 242, 254, 0.1);
      font-weight: 600;
    }
    .nav-item.drop-highlight {
      color: #f59e0b;
      background: rgba(245, 158, 11, 0.1);
      border: 1px solid rgba(245, 158, 11, 0.3);
      font-weight: 700;
    }
    .nav-item.drop-highlight:hover {
      background: rgba(245, 158, 11, 0.2);
      color: #fef3c7;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .wa-quick-contact {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.45rem 0.85rem;
      border-radius: 8px;
      background: rgba(37, 211, 102, 0.12);
      border: 1px solid rgba(37, 211, 102, 0.3);
      color: #4ade80;
      font-size: 0.78rem;
      font-weight: 600;
      transition: all var(--transition-fast);
    }
    .wa-quick-contact:hover {
      background: rgba(37, 211, 102, 0.25);
      color: #fff;
    }
    .wa-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #25d366;
      box-shadow: 0 0 6px #25d366;
    }
    .bag-trigger-btn {
      position: relative;
      width: 42px;
      height: 42px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-medium);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    .bag-trigger-btn:hover {
      background: rgba(0, 242, 254, 0.15);
      border-color: var(--color-cyan);
      color: var(--color-cyan);
    }
    .bag-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      background: var(--color-cyan);
      color: #000;
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 800;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 8px var(--color-cyan);
    }
    @media (max-width: 860px) {
      .nav-shortcuts {
        display: none;
      }
      .wa-text {
        display: none;
      }
    }
  `]
})
export class HeaderComponent {
  storeConfig = STORE_CONFIG;
  inquiryService = inject(InquiryService);
  productService = inject(ProductService);
  private whatsappService = inject(WhatsAppService);

  get whatsappSupportUrl(): string {
    return this.whatsappService.generateGeneralInquiryUrl();
  }

  selectCat(id: string): void {
    this.productService.selectCategory(id);
  }

  isCatActive(id: string): boolean {
    return this.productService['filterRegistry'].filterValues()['categoryId'] === id;
  }
}
