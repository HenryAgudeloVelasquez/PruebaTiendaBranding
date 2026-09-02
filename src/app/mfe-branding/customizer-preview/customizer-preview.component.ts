import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCustomizationOptions } from '../../core/models/product.model';

@Component({
  selector: 'app-customizer-preview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="customizer-box glass-panel">
      <div class="customizer-header">
        <div class="header-tag">
          <span class="pulse-indicator"></span>
          <span class="tag-text">GRABADO LÁSER DE FIBRA ÓPTICA PERSONALIZABLE</span>
        </div>
        <h4>{{ config().label }}</h4>
        <p class="customizer-hint">{{ config().hint }}</p>
      </div>

      <!-- Campo de entrada -->
      <div class="input-wrapper">
        <input 
          type="text" 
          [placeholder]="config().placeholder"
          [maxlength]="config().maxLength"
          [ngModel]="customText()"
          (ngModelChange)="onTextChange($event)"
          class="custom-input"
        />
        <span class="char-counter">{{ (customText() || '').length }}/{{ config().maxLength }}</span>
      </div>

      <!-- Previsualización Táctica en Vivo de la Placa de Titanio / Grabado -->
      <div class="live-preview-stage">
        <div class="preview-label">VISTA PREVIA DE GRABADO EN TIEMPO REAL:</div>
        <div class="titanium-plate-mockup">
          <div class="plate-screws">
            <span class="screw"></span>
            <span class="screw"></span>
          </div>
          
          <div class="plate-content">
            <div class="plate-logo">MTF // DIVISION ID</div>
            <div class="plate-text">
              @if (customText() && customText().trim().length > 0) {
                <span class="engraved-custom">{{ customText().toUpperCase() }}</span>
              } @else {
                <span class="engraved-placeholder">TU TEXTO O CÓDIGO APARECERÁ AQUÍ</span>
              }
            </div>
            <div class="plate-sub">MIL-SPEC 810G // FIBER OPTIC ETCH</div>
          </div>

          <div class="plate-screws">
            <span class="screw"></span>
            <span class="screw"></span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .customizer-box {
      padding: 1.5rem;
      border: 1px solid var(--border-cyan);
      border-radius: 12px;
      margin-bottom: 1.5rem;
      background: rgba(14, 20, 34, 0.85);
    }
    .customizer-header {
      margin-bottom: 1rem;
    }
    .header-tag {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.35rem;
    }
    .pulse-indicator {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--color-cyan);
      box-shadow: 0 0 8px var(--color-cyan);
      animation: pulseGlow 2s infinite ease-in-out;
    }
    .tag-text {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      color: var(--color-cyan);
      letter-spacing: 0.05em;
    }
    .customizer-header h4 {
      font-size: 1.1rem;
      color: #fff;
      margin-bottom: 0.25rem;
    }
    .customizer-hint {
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    .input-wrapper {
      position: relative;
      margin-bottom: 1.25rem;
    }
    .custom-input {
      width: 100%;
      background: rgba(8, 11, 17, 0.85);
      border: 1px solid var(--border-medium);
      border-radius: 8px;
      padding: 0.75rem 3.5rem 0.75rem 1rem;
      color: #fff;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      letter-spacing: 0.05em;
      outline: none;
      transition: all var(--transition-fast);
    }
    .custom-input:focus {
      border-color: var(--color-cyan);
      box-shadow: 0 0 12px rgba(0, 242, 254, 0.3);
    }
    .char-counter {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: var(--text-muted);
    }
    .live-preview-stage {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .preview-label {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      color: var(--text-secondary);
      letter-spacing: 0.05em;
    }
    .titanium-plate-mockup {
      background: linear-gradient(135deg, #2a3447 0%, #172033 100%);
      border: 1px solid #4b5563;
      border-radius: 8px;
      padding: 0.85rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 4px 12px rgba(0, 0, 0, 0.5);
    }
    .plate-screws {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .screw {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #111827;
      border: 1px solid #6b7280;
    }
    .plate-content {
      text-align: center;
      flex: 1;
    }
    .plate-logo {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: #94a3b8;
      letter-spacing: 0.15em;
      margin-bottom: 0.25rem;
    }
    .plate-text {
      min-height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .engraved-custom {
      font-family: var(--font-mono);
      font-size: 0.9rem;
      font-weight: 700;
      color: #00f2fe;
      text-shadow: 0 0 8px rgba(0, 242, 254, 0.6);
      letter-spacing: 0.1em;
    }
    .engraved-placeholder {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: #64748b;
      letter-spacing: 0.05em;
    }
    .plate-sub {
      font-family: var(--font-mono);
      font-size: 0.58rem;
      color: #64748b;
      letter-spacing: 0.1em;
      margin-top: 0.25rem;
    }
  `]
})
export class CustomizerPreviewComponent {
  config = input.required<ProductCustomizationOptions>();
  customText = input<string>('');
  textChange = output<string>();

  onTextChange(text: string): void {
    this.textChange.emit(text);
  }
}
