import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="'badge badge-' + variant()">
      <span class="badge-dot"></span>
      {{ text() }}
    </span>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    .badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: currentColor;
      display: inline-block;
    }
  `]
})
export class BadgeComponent {
  text = input.required<string>();
  variant = input<'cyan' | 'amber' | 'green' | 'dark'>('cyan');
}
