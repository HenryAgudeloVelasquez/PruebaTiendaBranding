import { FunnelConfig } from '../models/funnel.model';
import { STORE_CONFIG } from '../config/store.config';

export const FUNNEL_CAMPAIGNS: FunnelConfig[] = [
  {
    campaignId: 'blackout-operator',
    productId: 'prod-05',
    title: 'Drop Táctico Exclusivo // Hoodie MTF Blackout Operador',
    subtitle: 'Confección pesada 400g con panel velcro militar y parche PVC incluido. Envío prioritario directo.',
    badge: 'OFERTA RELÁMPAGO // 35% OFF',
    imageUrl: '/assets/products/mtf-hoodie.jpg',
    galleryImages: ['/assets/products/mtf-hoodie.jpg'],
    price: 195000,
    discountPrice: 145000,
    currency: 'COP',
    whatsappNumber: STORE_CONFIG.whatsappNumber,
    defaultMessage: '¡Hola MTF Store! Quiero aprovechar la OFERTA RELÁMPAGO del Hoodie MTF Blackout Operador ($145.000 COP) antes de que se agoten las unidades.',
    isActive: true,
    urgency: {
      enabled: true,
      minutesRemaining: 47,
      bannerText: '⚡ OFERTA VÁLIDA SÓLO POR TIEMPO LIMITADO - POCAS UNIDADES',
      stockLeft: 6
    },
    socialProof: {
      rating: 5.0,
      reviewsCount: 54,
      recentOrdersCount: 28,
      highlightReview: {
        author: 'Cmdte. R. Valenzuela (Medellín)',
        comment: 'La calidad de la tela de 400g es insuperable y el panel velcro le da toda la presencia táctica. Llegó al día siguiente.',
        verified: true
      }
    },
    bulletPoints: [
      'Felpa francesa perchada ultra-pesada 400 GSM con capucha envolvente de 3 paneles',
      'Panel táctico Mil-Spec en manga para parches morales intercambiables',
      'Incluye 1 Parche PVC con relieve engomado oficial MTF Operator',
      'Bordado tonal 3D frontal con hilo reforzado de alta durabilidad'
    ],
    variantOption: {
      label: 'Selecciona tu Talla Operativa',
      values: ['Talla S', 'Talla M', 'Talla L', 'Talla XL', 'Talla 2XL']
    },
    guaranteeText: '🛡️ Garantía de satisfacción total por 6 meses en costuras y acabados tácticos.',
    shippingNote: '🚀 Despacho express el mismo día con número de guía rastreable nacional.'
  },
  {
    campaignId: 'vanguard-titanio',
    productId: 'prod-02',
    title: 'Manilla MTF Vanguard // Placa de Titanio con Grabado Personalizado',
    subtitle: 'Placa aeroespacial con grabado láser de tu Call-Sign, sangre o teléfono de emergencia.',
    badge: 'FLASH SALE 24H',
    imageUrl: '/assets/products/mtf-wristband.jpg',
    galleryImages: ['/assets/products/mtf-wristband.jpg'],
    price: 79000,
    discountPrice: 59000,
    currency: 'COP',
    whatsappNumber: STORE_CONFIG.whatsappNumber,
    defaultMessage: '¡Hola! Quiero ordenar la Manilla de Titanio MTF Vanguard en oferta ($59.000 COP) con grabado láser personalizado gratuito.',
    isActive: true,
    urgency: {
      enabled: true,
      minutesRemaining: 120,
      bannerText: '🔥 GRABADO LÁSER GRATIS INCLUIDO EN ESTA CAMPAÑA',
      stockLeft: 11
    },
    socialProof: {
      rating: 5.0,
      reviewsCount: 87,
      recentOrdersCount: 43,
      highlightReview: {
        author: 'Sargento Mayor K. Arismendi',
        comment: 'El grabado láser quedó nítido y la banda de silicona es comodísima para entrenamiento diario.',
        verified: true
      }
    },
    bulletPoints: [
      'Placa curvada ergonómica de Titanio Grado Quirúrgico hipoalergénico',
      'Grabado con láser de fibra óptica de hasta 4 líneas (nombre, call-sign, sangre, contacto)',
      'Banda de silicona vulcanizada resistente al agua salada, sudor y calor extremo',
      'Hebilla de micro-ajuste de seguridad'
    ],
    variantOption: {
      label: 'Acabado de la Placa',
      values: ['Titanio Pulido Cepillado', 'Titanio Black PVD Stealth']
    },
    guaranteeText: '🛡️ Grabado permanente garantizado de por vida contra desgaste.',
    shippingNote: '📦 Envío seguro a cualquier ciudad de Colombia con pago contra-entrega o transferencia.'
  },
  {
    campaignId: 'omega-termico',
    productId: 'prod-03',
    title: 'Vaso Térmico Táctico MTF Ω7 Hammer Down 750ml',
    subtitle: 'Triple capa aislada al vacío con moleteado CNC y escudo grabado de la división.',
    badge: 'OFERTA TÁCTICA',
    imageUrl: '/assets/products/mtf-tumbler.jpg',
    galleryImages: ['/assets/products/mtf-tumbler.jpg'],
    price: 125000,
    discountPrice: 89000,
    currency: 'COP',
    whatsappNumber: STORE_CONFIG.whatsappNumber,
    defaultMessage: '¡Buenas! Me interesa el Vaso Térmico MTF Ω7 de 750ml con la promo de $89.000 COP.',
    isActive: true,
    urgency: {
      enabled: true,
      minutesRemaining: 90,
      bannerText: '❄️ 24h Frío / 🔥 12h Caliente - Tapa magnética hermética incluida',
      stockLeft: 8
    },
    socialProof: {
      rating: 4.8,
      reviewsCount: 31,
      recentOrdersCount: 19,
      highlightReview: {
        author: 'David E. (Bogotá)',
        comment: 'Mantiene el café hirviendo todo el turno de guardia. El agarre moleteado es una genialidad.',
        verified: true
      }
    },
    bulletPoints: [
      'Acero inoxidable 18/8 grado quirúrgico libre de BPA y condensación externa',
      'Grip moleteado mecanizado por control numérico CNC anti-resbalante',
      'Tapa de sellado magnético resistente a salpicaduras y caídas',
      'Capacidad táctica de 750ml (25.4 oz) compatible con posavasos estándar'
    ],
    variantOption: {
      label: 'Color Táctico',
      values: ['Matte Stealth Black', 'Brushed Steel Raw']
    },
    guaranteeText: '🛡️ Garantía de retención térmica y hermetismo certificada.',
    shippingNote: '⚡ Despacho ultra-rápido en caja de protección táctica MTF.'
  },
  {
    campaignId: 'alpha-heavyweight',
    productId: 'prod-01',
    title: 'Camiseta Táctica MTF Alpha-9 Heavyweight 240g',
    subtitle: 'Algodón peinado pesado con serigrafía de coordenadas militares y corte boxy fit.',
    badge: 'BESTSELLER DROP',
    imageUrl: '/assets/products/mtf-tshirt.jpg',
    galleryImages: ['/assets/products/mtf-tshirt.jpg'],
    price: 110000,
    discountPrice: 79000,
    currency: 'COP',
    whatsappNumber: STORE_CONFIG.whatsappNumber,
    defaultMessage: 'Hola, quiero pedir la Camiseta Táctica MTF Alpha-9 Heavyweight en promo por $79.000 COP.',
    isActive: true,
    urgency: {
      enabled: true,
      minutesRemaining: 60,
      bannerText: '🎯 DESCUENTO EXCLUSIVO DE LANZAMIENTO // SERIGRAFÍA MIL-SPEC',
      stockLeft: 14
    },
    socialProof: {
      rating: 4.9,
      reviewsCount: 42,
      recentOrdersCount: 33,
      highlightReview: {
        author: 'Camilo S. (Cali)',
        comment: 'El gramaje de 240g se siente súper pesado y premium, no se deforma el cuello tras varias lavadas.',
        verified: true
      }
    },
    bulletPoints: [
      '100% Algodón Peinado de 240 GSM de gramaje robusto pre-encogido',
      'Serigrafía Plastisol HD de alta definición resistente a +120 lavadas',
      'Cuello ribeteado 1x1 indeformable y costuras con hilo de nylon',
      'Insignia de división militar Alpha-9 en pecho y espalda'
    ],
    variantOption: {
      label: 'Selecciona tu Talla',
      values: ['Talla S', 'Talla M', 'Talla L', 'Talla XL', 'Talla 2XL']
    },
    guaranteeText: '🛡️ 6 meses de garantía total en estampado y tejido.',
    shippingNote: '🚀 Envíos a todo el país con entrega estimada en 24 a 48 horas.'
  }
];
