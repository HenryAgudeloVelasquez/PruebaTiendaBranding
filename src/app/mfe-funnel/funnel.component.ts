import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
  computed,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FunnelService } from '../core/services/funnel.service';
import { FunnelConfig, UtmParams } from '../core/models/funnel.model';

@Component({
  selector: 'app-funnel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './funnel.component.html',
  styleUrl: './funnel.component.css'
})
export class FunnelComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly funnelService = inject(FunnelService);
  private readonly platformId = inject(PLATFORM_ID);

  // Estado reactivo con Signals
  public readonly campaign = signal<FunnelConfig | null>(null);
  public readonly isLoading = signal<boolean>(true);
  public readonly notFound = signal<boolean>(false);
  public readonly utm = signal<UtmParams>({});
  public readonly selectedVariant = signal<string>('');
  public readonly selectedImage = signal<string>('');

  // Temporizador de urgencia
  public readonly timerMinutes = signal<number>(45);
  public readonly timerSeconds = signal<number>(0);
  private timerInterval: any = null;

  // Enlace computado a WhatsApp en tiempo real
  public readonly whatsappUrl = computed(() => {
    const config = this.campaign();
    if (!config) return '#';
    return this.funnelService.buildWhatsappLink(
      config,
      this.utm(),
      this.selectedVariant()
    );
  });

  // Cálculo de porcentaje de descuento
  public readonly discountPercentage = computed(() => {
    const c = this.campaign();
    if (!c || !c.discountPrice || c.price <= c.discountPrice) return 0;
    return Math.round(((c.price - c.discountPrice) / c.price) * 100);
  });

  ngOnInit(): void {
    // 1. Capturar parámetros de trazabilidad UTM de la URL
    this.route.queryParams.subscribe(params => {
      this.utm.set({
        source: params['utm_source'] || 'organico',
        medium: params['utm_medium'] || 'web',
        campaign: params['utm_campaign'],
        content: params['utm_content'],
        term: params['utm_term']
      });
    });

    // 2. Capturar el ID o slug de la campaña
    this.route.paramMap.subscribe(params => {
      const campaignId = params.get('campaignId');
      if (campaignId) {
        this.loadCampaign(campaignId);
      } else {
        this.isLoading.set(false);
        this.notFound.set(true);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private loadCampaign(campaignId: string): void {
    this.isLoading.set(true);
    this.notFound.set(false);

    this.funnelService.getCampaignData(campaignId).subscribe({
      next: (config) => {
        if (config && config.isActive) {
          this.campaign.set(config);
          this.selectedImage.set(config.imageUrl);

          if (config.variantOption && config.variantOption.values.length > 0) {
            this.selectedVariant.set(config.variantOption.values[0]);
          }

          if (config.urgency?.minutesRemaining) {
            this.timerMinutes.set(config.urgency.minutesRemaining);
          }
          this.startUrgencyTimer();
        } else {
          this.notFound.set(true);
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.notFound.set(true);
        this.isLoading.set(false);
      }
    });
  }

  private startUrgencyTimer(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.timerInterval) clearInterval(this.timerInterval);

    this.timerInterval = setInterval(() => {
      const sec = this.timerSeconds();
      const min = this.timerMinutes();

      if (sec === 0) {
        if (min === 0) {
          clearInterval(this.timerInterval);
        } else {
          this.timerMinutes.set(min - 1);
          this.timerSeconds.set(59);
        }
      } else {
        this.timerSeconds.set(sec - 1);
      }
    }, 1000);
  }

  public selectVariant(variant: string): void {
    this.selectedVariant.set(variant);
  }

  public selectThumbnail(img: string): void {
    this.selectedImage.set(img);
  }

  public onWhatsappClick(): void {
    const c = this.campaign();
    if (c) {
      this.funnelService.trackConversion(c.campaignId, this.utm());
    }
  }

  public formatMoney(amount: number): string {
    return this.funnelService.formatCurrency(amount);
  }

  public padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
