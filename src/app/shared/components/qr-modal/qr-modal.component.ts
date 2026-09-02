import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qr-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen()) {
      <div class="modal-backdrop" (click)="close()">
        <div class="modal-content glass-panel" (click)="$event.stopPropagation()">
          <button class="close-btn" (click)="close()" aria-label="Cerrar modal">✕</button>

          <div class="modal-header">
            <span class="badge badge-green">ESCÁNER MÓVIL // WHATSAPP DIRECT</span>
            <h3>Continúa tu Pedido en tu Teléfono</h3>
            <p>Escanea este código con la cámara de tu smartphone para abrir WhatsApp con los datos de tu pedido ya listos.</p>
          </div>

          <div class="qr-container">
            <div class="qr-frame">
              <!-- Renderizado de código QR vectorial dinámico hacia la URL de WhatsApp -->
              <img 
                [src]="'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=' + encodeUrl(whatsappUrl()) + '&color=00f2fe&bgcolor=0e1422'" 
                alt="Código QR de WhatsApp"
                width="200"
                height="200"
                class="qr-image"
              />
            </div>
            <span class="qr-label">MTF OFFICIAL ORDER DISPATCH</span>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary w-full" (click)="copyLink()">
              {{ copied() ? '✓ Enlace Copiado' : 'Copiar Enlace de WhatsApp' }}
            </button>
            <a [href]="whatsappUrl()" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp w-full">
              Abrir WhatsApp Web
            </a>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(4, 6, 12, 0.85);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 1rem;
      animation: fadeIn 0.2s ease;
    }
    .modal-content {
      width: 100%;
      max-width: 440px;
      padding: 2rem;
      position: relative;
      background: #0e1422;
      border: 1px solid var(--border-cyan);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), var(--shadow-cyan-glow);
      text-align: center;
    }
    .close-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 1.25rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 6px;
      transition: color var(--transition-fast);
    }
    .close-btn:hover {
      color: #fff;
    }
    .modal-header h3 {
      font-size: 1.35rem;
      margin-top: 0.75rem;
      margin-bottom: 0.5rem;
    }
    .modal-header p {
      font-size: 0.85rem;
      line-height: 1.4;
      margin-bottom: 1.5rem;
    }
    .qr-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .qr-frame {
      padding: 12px;
      background: #090d16;
      border: 1px solid var(--border-medium);
      border-radius: 12px;
      display: inline-block;
    }
    .qr-image {
      display: block;
      border-radius: 6px;
    }
    .qr-label {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: var(--color-cyan);
      letter-spacing: 0.1em;
      margin-top: 0.75rem;
    }
    .modal-footer {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .w-full {
      width: 100%;
    }
  `]
})
export class QrModalComponent {
  isOpen = input.required<boolean>();
  whatsappUrl = input.required<string>();
  onClose = output<void>();

  copied = signal<boolean>(false);

  close(): void {
    this.onClose.emit();
  }

  encodeUrl(url: string): string {
    return encodeURIComponent(url);
  }

  copyLink(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.whatsappUrl());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2500);
    }
  }
}
