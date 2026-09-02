import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { STORE_CONFIG } from '../../core/config/store.config';
import { WhatsAppService } from '../../core/services/whatsapp.service';

@Component({
  selector: 'app-shell-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="main-footer">
      <div class="container footer-grid">
        <!-- Columna 1: Manifiesto de Marca -->
        <div class="footer-col brand-col">
          <div class="footer-logo">
            <span class="logo-text">{{ storeConfig.brandName }}</span>
            <span class="logo-sub">{{ storeConfig.divisionTag }}</span>
          </div>
          <p class="brand-bio">
            Equipamiento de alta especificación técnica, textiles pesados de 240g a 400g y manillas de identificación militar grabables con láser de fibra óptica. Calidad operativa garantizada.
          </p>
          <div class="security-seal">
            <span class="seal-icon">✓</span>
            <span class="seal-text">DESPACHO NACIONAL ASEGURADO • ATENCIÓN DIRECTA</span>
          </div>
        </div>

        <!-- Columna 2: Categorías de la División -->
        <div class="footer-col">
          <h4 class="col-title">Categorías</h4>
          <ul class="footer-links">
            <li><a routerLink="/">Todos los Artículos</a></li>
            <li><a routerLink="/">Camisetas Tácticas Heavyweight</a></li>
            <li><a routerLink="/">Vasos & Termos de Vacío</a></li>
            <li><a routerLink="/">Manillas de Identificación ID</a></li>
            <li><a routerLink="/">Buzos & Hoodies Militares</a></li>
          </ul>
        </div>

        <!-- Columna 3: Compromiso Operativo -->
        <div class="footer-col">
          <h4 class="col-title">Garantía Operativa</h4>
          <ul class="guarantee-list">
            <li>
              <strong>Grabado Láser Permanente</strong>
              <span>Personalización indeleble en titanio y acero</span>
            </li>
            <li>
              <strong>Algodón Premium 240g</strong>
              <span>Tacto suave anti-desgaste y costuras dobles</span>
            </li>
            <li>
              <strong>Soporte WhatsApp 24/7</strong>
              <span>Confirmación de pedido y fotos previas al despacho</span>
            </li>
          </ul>
        </div>

        <!-- Columna 4: Canal de Contacto WhatsApp -->
        <div class="footer-col contact-col">
          <h4 class="col-title">Canal Oficial</h4>
          <p class="contact-hint">¿Tienes dudas sobre tallas, pedidos al por mayor o personalizaciones especiales?</p>
          <a [href]="whatsappUrl" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp w-full">
            Chatear por WhatsApp
          </a>
          <span class="contact-phone">{{ storeConfig.whatsappDisplay }}</span>
        </div>
      </div>

      <!-- Barra de Copyright Inferior -->
      <div class="footer-bottom">
        <div class="container bottom-inner">
          <span>© 2026 MTF MERCHANDISE // TODOS LOS DERECHOS RESERVADOS.</span>
          <span class="dev-tag">ARQUITECTURA MODULAR ANGULAR 21 // SIGNALS REGISTRY</span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .main-footer {
      background: #06090f;
      border-top: 1px solid var(--border-subtle);
      padding-top: 4rem;
      position: relative;
      z-index: 1;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1.5fr 1.5fr;
      gap: 3rem;
      margin-bottom: 3rem;
    }
    .footer-col {
      display: flex;
      flex-direction: column;
    }
    .footer-logo {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }
    .logo-text {
      font-family: var(--font-heading);
      font-size: 1.35rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: #fff;
    }
    .logo-sub {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--color-cyan);
      letter-spacing: 0.1em;
    }
    .brand-bio {
      font-size: 0.85rem;
      line-height: 1.5;
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
    }
    .security-seal {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(0, 242, 254, 0.08);
      border: 1px solid rgba(0, 242, 254, 0.2);
      padding: 0.4rem 0.75rem;
      border-radius: 6px;
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--color-cyan);
    }
    .col-title {
      font-family: var(--font-heading);
      font-size: 0.95rem;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1.25rem;
      position: relative;
      padding-bottom: 0.5rem;
    }
    .col-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 25px;
      height: 2px;
      background: var(--color-cyan);
    }
    .footer-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }
    .footer-links a {
      font-size: 0.85rem;
      color: var(--text-secondary);
    }
    .footer-links a:hover {
      color: var(--color-cyan);
      padding-left: 4px;
    }
    .guarantee-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }
    .guarantee-list strong {
      display: block;
      font-size: 0.85rem;
      color: #fff;
    }
    .guarantee-list span {
      display: block;
      font-size: 0.75rem;
      color: var(--text-muted);
    }
    .contact-hint {
      font-size: 0.82rem;
      line-height: 1.4;
      margin-bottom: 1rem;
    }
    .w-full {
      width: 100%;
    }
    .contact-phone {
      display: block;
      margin-top: 0.75rem;
      text-align: center;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    .footer-bottom {
      border-top: 1px solid var(--border-subtle);
      padding: 1.5rem 0;
      background: #030508;
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: var(--text-muted);
    }
    .bottom-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .dev-tag {
      color: var(--color-cyan);
    }
    @media (max-width: 960px) {
      .footer-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    @media (max-width: 640px) {
      .footer-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FooterComponent {
  storeConfig = STORE_CONFIG;
  private whatsappService = inject(WhatsAppService);

  get whatsappUrl(): string {
    return this.whatsappService.generateGeneralInquiryUrl();
  }
}
