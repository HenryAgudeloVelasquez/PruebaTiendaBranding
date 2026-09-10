export interface UtmParams {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}

export interface FunnelUrgencyConfig {
  enabled: boolean;
  minutesRemaining?: number;
  bannerText?: string;
  stockLeft?: number;
}

export interface FunnelSocialProof {
  rating: number;
  reviewsCount: number;
  recentOrdersCount: number;
  highlightReview?: {
    author: string;
    comment: string;
    verified: boolean;
  };
}

export interface FunnelVariantOption {
  label: string;
  values: string[];
}

export interface FunnelConfig {
  campaignId: string;
  productId?: string;
  title: string;
  subtitle: string;
  badge?: string;
  imageUrl: string;
  galleryImages?: string[];
  price: number;
  discountPrice?: number;
  currency?: string;
  whatsappNumber: string;
  defaultMessage: string;
  isActive: boolean;
  
  // Atributos de alta conversión y urgencia
  urgency?: FunnelUrgencyConfig;
  socialProof?: FunnelSocialProof;
  bulletPoints?: string[];
  variantOption?: FunnelVariantOption;
  guaranteeText?: string;
  shippingNote?: string;
}
