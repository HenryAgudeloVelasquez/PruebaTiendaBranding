import { Product } from '../models/product.model';

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-01',
    slug: 'camiseta-tactica-mtf-alpha-9',
    sku: 'MTF-APP-A09',
    name: 'Camiseta Táctica MTF "Alpha-9" Heavyweight 240g',
    shortDescription: 'Camiseta streetwear de alto gramaje con insignia militar serigrafiada en alta definición.',
    description: 'La camiseta insigne de la división Mobile Task Force Alpha-9 está confeccionada en 100% algodón peinado de 240 GSM de gramaje pesado, con tratamiento pre-encogido y costuras dobles reforzadas. Diseñada para máxima durabilidad tanto en despliegue como en uso urbano cotidiano. Su serigrafía táctica resiste más de 120 ciclos de lavado sin perder definición.',
    categoryId: 'apparel',
    price: 85000,
    originalPrice: 110000,
    rating: 4.9,
    reviewsCount: 42,
    badge: 'BESTSELLER',
    images: ['/assets/products/mtf-tshirt.jpg'],
    inStock: true,
    stockCount: 38,
    tags: ['Camiseta', 'MTF', 'Streetwear', 'Algodón Pesado', 'Alpha-9'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Stealth Black', hex: '#111827' },
      { name: 'Tactical Charcoal', hex: '#374151' }
    ],
    finishes: ['Acabado Estándar Mate'],
    materials: ['100% Algodón Peinado 240 GSM', 'Tinta al agua Plastisol HD', 'Cuello rib reforzado 1x1'],
    specs: [
      { label: 'Gramaje', value: '240 g/m² (Heavyweight Premium)' },
      { label: 'Corte', value: 'Streetwear Boxy Fit / Relajado' },
      { label: 'Origen', value: 'Fabricación Especializada MTF Division' },
      { label: 'Garantía', value: '6 meses en costuras y estampado' }
    ],
    features: [
      'Tejido premium anti-desgaste de tacto suave pero ultra resistente',
      'Insignia Alpha-9 con tipografía de coordenadas militares',
      'Etiqueta tejida de autenticidad en el bajo de la prenda',
      'Costura con hilo de nylon de alta tensión'
    ],
    isFeatured: true
  },
  {
    id: 'prod-02',
    slug: 'manilla-identificacion-mtf-vanguard',
    sku: 'MTF-ID-VG01',
    name: 'Manilla de Identificación MTF Vanguard (Titanio & Silicona)',
    shortDescription: 'Placa de titanio aeroespacial con grabado láser de código de operador y correa hipoalergénica.',
    description: 'Diseñada para situaciones críticas y personal militar/entusiasta, la manilla MTF Vanguard cuenta con una placa curva de titanio grado quirúrgico grabable con láser de fibra. Permite personalizar tu indicativo (Call-Sign), grupo sanguíneo, número de contacto de emergencia o código de acceso. Su banda de silicona vulcanizada es inmune al agua salada, sudor y temperaturas extremas.',
    categoryId: 'id-wristbands',
    price: 65000,
    originalPrice: 79000,
    rating: 5.0,
    reviewsCount: 87,
    badge: 'TÁCTICO',
    images: ['/assets/products/mtf-wristband.jpg'],
    inStock: true,
    stockCount: 50,
    tags: ['Manilla', 'Identificación', 'Titanio', 'Personalizable', 'Militar'],
    sizes: ['Ajustable (16cm a 22cm)'],
    colors: [
      { name: 'Matte Gunmetal', hex: '#4b5563' },
      { name: 'Stealth Black', hex: '#000000' }
    ],
    finishes: ['Titanio Pulido Cepillado', 'Titanio Black PVD'],
    materials: ['Titanio Grado 5 Quirúrgico', 'Silicona Médica Vulcanizada Hipoalergénica', 'Hebilla Acero 316L'],
    specs: [
      { label: 'Ancho de Banda', value: '20 mm con relieve táctico' },
      { label: 'Tipo de Grabado', value: 'Láser de Fibra Óptica Profundo' },
      { label: 'Resistencia al Agua', value: 'Sumergible IP68 (Sin límite)' },
      { label: 'Cierre', value: 'Hebilla de pasador micrométrico' }
    ],
    customization: {
      enabled: true,
      type: 'callsign',
      label: 'Personalización de Placa ID',
      placeholder: 'Ej: SGT. RAMIREZ // CALL: GHOST // O+ // TEL: 3001234567',
      maxLength: 60,
      hint: 'Tu texto será grabado con láser de fibra de alta precisión antes del despacho.'
    },
    features: [
      'Placa intercambiable ergonómica curvada para el contorno de la muñeca',
      'Personalización gratuita de hasta 4 líneas de datos vitales',
      'Banda con ranuras internas de ventilación anti-sudor',
      'Cierre ultra seguro que no se desprende ante tracción'
    ],
    isFeatured: true
  },
  {
    id: 'prod-03',
    slug: 'vaso-termico-mtf-omega-7-hammer-down',
    sku: 'MTF-DRK-OM7',
    name: 'Vaso Térmico Táctico MTF Ω7 "Hammer Down" 750ml',
    shortDescription: 'Acero inoxidable de triple capa con textura moleteada y grabado de unidad MTF.',
    description: 'Construido para soportar las jornadas operativas más exigentes, el vaso térmico MTF Ω7 Hammer Down conserva tus bebidas calientes durante 12 horas o heladas hasta por 24 horas gracias a su cámara de aislamiento de alto vacío. Su cuerpo cuenta con un grip moleteado maquinado que garantiza agarre óptimo incluso con guantes tácticos o manos húmedas.',
    categoryId: 'drinkware',
    price: 95000,
    originalPrice: 125000,
    rating: 4.8,
    reviewsCount: 31,
    badge: 'BESTSELLER',
    images: ['/assets/products/mtf-tumbler.jpg'],
    inStock: true,
    stockCount: 22,
    tags: ['Vaso Térmico', 'Termo', 'MTF', 'Acero 304', 'Aislamiento'],
    sizes: ['750 ml (25.4 oz)'],
    colors: [
      { name: 'Matte Stealth Black', hex: '#18181b' },
      { name: 'Brushed Steel', hex: '#9ca3af' }
    ],
    finishes: ['Pintura Powder-Coat Electrostática con Moleteado CNC'],
    materials: ['Acero Inoxidable 18/8 Grado Alimenticio Pro', 'Tapa Tritan Libre de BPA', 'Empaque de Silicona Sellado'],
    specs: [
      { label: 'Capacidad', value: '750 ml (25.4 oz)' },
      { label: 'Retención Frío', value: 'Hasta 24 horas con hielo' },
      { label: 'Retención Calor', value: 'Hasta 12 horas caliente' },
      { label: 'Compatibilidad', value: 'Encaja en portavasos de vehículo estándar' }
    ],
    features: [
      'Tecnología de doble pared aislada al vacío libre de condensación externa',
      'Tapa magnética hermética a prueba de derrames y salpicaduras',
      'Grabado láser permanente del escudo de división MTF Ω7',
      'Pintura electrostática ultra resistente a rayones y golpes'
    ],
    isFeatured: true
  },
  {
    id: 'prod-04',
    slug: 'taza-tactica-mtf-alpha-1-ceramica-carbon',
    sku: 'MTF-DRK-A01',
    name: 'Taza Táctica MTF Alpha-1 Cerámica Carbón Mate',
    shortDescription: 'Taza de cerámica maciza de alta densidad con asa geométrica táctica y escala graduada.',
    description: 'Inspirada en el equipamiento de mando de los escuadrones MTF Alpha-1, esta taza de cerámica industrial de 450ml cuenta con un asa geométrica facetada con agarre ergonómico de 3 dedos y un bajorrelieve tridimensional del emblema MTF. El exterior tiene acabado cerámico arenado mate mientras que el interior es esmaltado liso para fácil limpieza.',
    categoryId: 'drinkware',
    price: 48000,
    originalPrice: 58000,
    rating: 4.9,
    reviewsCount: 19,
    badge: 'NUEVO',
    images: ['/assets/products/mtf-mug.jpg'],
    inStock: true,
    stockCount: 29,
    tags: ['Taza', 'Cerámica', 'Mug', 'Alpha-1', 'Oficina Táctica'],
    sizes: ['450 ml (15 oz)'],
    colors: [
      { name: 'Slate Matte Grey', hex: '#334155' },
      { name: 'Carbon Black', hex: '#0f172a' }
    ],
    finishes: ['Cerámica Arenada Mate con Escala Lateral Graduada'],
    materials: ['Cerámica Refractaria de Alta Densidad', 'Esmalte Mineral No Tóxico'],
    specs: [
      { label: 'Capacidad', value: '450 ml / 15 oz' },
      { label: 'Peso en Vacío', value: '520 g (Maciza y Estable)' },
      { label: 'Resistencia Térmica', value: 'Apta para Microondas y Lavavajillas' },
      { label: 'Base', value: 'Apta para posavasos tácticos anti-vuelco' }
    ],
    features: [
      'Emblema tridimensional en alto relieve de la fuerza élite Alpha-1',
      'Asa angular diseñada para agarre firme sin quemarse los nudillos',
      'Marcas de medición milimétrica/onzas en relieve lateral',
      'Paredes térmicas gruesas que mantienen el café caliente por más tiempo'
    ],
    isFeatured: false
  },
  {
    id: 'prod-05',
    slug: 'hoodie-tactico-mtf-blackout-operador',
    sku: 'MTF-APP-HD02',
    name: 'Hoodie Táctico MTF Blackout con Parche de Operador',
    shortDescription: 'Sudadera premium franela pesada 400g con panel velcro táctico en manga y bordado tonal.',
    description: 'El buzo con capota táctico MTF Blackout redefine la comodidad operativa. Confeccionado en felpa francesa perchada de 400 GSM, cuenta con un panel de velcro militar en el brazo izquierdo para adherir parches morales, bordado frontal de logotipo MTF en relieve al tono y capucha envolvente de tres paneles con cordones tubulares con punteras metálicas grabadas.',
    categoryId: 'apparel',
    price: 165000,
    originalPrice: 195000,
    rating: 5.0,
    reviewsCount: 54,
    badge: 'EDICIÓN LIMITADA',
    images: ['/assets/products/mtf-hoodie.jpg'],
    inStock: true,
    stockCount: 14,
    tags: ['Hoodie', 'Buzo', 'MTF', 'Blackout', 'Streetwear Táctico'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Charcoal Blackout', hex: '#1c1917' }
    ],
    finishes: ['Bordado Tonal 3D y Panel Velcro Laser-Cut'],
    materials: ['85% Algodón Peinado Orgánico / 15% Poliéster Reciclado 400g', 'Velcro grado militar Mil-Spec'],
    specs: [
      { label: 'Gramaje', value: '400 g/m² Ultra-Heavyweight' },
      { label: 'Capucha', value: 'Doble forro estructurado de 3 paneles' },
      { label: 'Bolsillo', value: 'Canguro frontal reforzado con costuras bartack' },
      { label: 'Parche Incluido', value: '1 Parche de PVC engomado MTF Operator' }
    ],
    features: [
      'Panel táctico en manga izquierda para intercambiar parches según misión',
      'Bordado de alta densidad al tono en el pecho con relieve 3D',
      'Punteras de cordón de metal negro mate anodizado',
      'Cremallera YKK de medio cierre en cuello para ventilación rápida'
    ],
    isFeatured: true
  },
  {
    id: 'prod-06',
    slug: 'manilla-paracord-militar-mtf-grillete-titanio',
    sku: 'MTF-ID-PRC05',
    name: 'Manilla Paracord Militar MTF con Grillete de Titanio',
    shortDescription: 'Cuerda Paracord 550 Tipo III de supervivencia con grillete roscado grabado con insignia MTF.',
    description: 'Manilla artesanal de supervivencia fabricada con más de 3.5 metros continuos de cuerda Paracord 550 militar de 7 hebras internas (soporta hasta 250 kg de carga). Su grillete roscado de aleación de titanio anodizado incluye el sello de la división Mobile Task Force y pasador de seguridad desmontable.',
    categoryId: 'id-wristbands',
    price: 52000,
    originalPrice: 65000,
    rating: 4.7,
    reviewsCount: 26,
    badge: 'TÁCTICO',
    images: ['/assets/products/mtf-paracord.jpg'],
    inStock: true,
    stockCount: 40,
    tags: ['Manilla', 'Paracord', 'Supervivencia', 'Titanio', 'Outdoor'],
    sizes: ['Talla M (18-19 cm)', 'Talla L (20-21 cm)', 'Talla XL (22-23 cm)'],
    colors: [
      { name: 'Olive Drab & Black', hex: '#556b2f' },
      { name: 'All Stealth Black', hex: '#18181b' }
    ],
    finishes: ['Tejido Cobra Stitch Reforzado con Grillete Pavonado'],
    materials: ['Paracord 550 Tipo III (Nylon 100%)', 'Grillete Omega de Titanio / Acero Inox PVD'],
    specs: [
      { label: 'Cuerda Interna', value: '3.6 metros desplegables en emergencia' },
      { label: 'Carga de Ruptura', value: '550 libras (249.5 kg)' },
      { label: 'Cierre', value: 'Grillete roscado de 3 posiciones ajustables' },
      { label: 'Resistencia', value: 'Inmune al moho, rayos UV y agua de mar' }
    ],
    customization: {
      enabled: true,
      type: 'text',
      label: 'Grabado en Grillete (Opcional)',
      placeholder: 'Ej: MTF-SQUAD-04 // O+',
      maxLength: 25,
      hint: 'Grabado micro-láser en la superficie del grillete.'
    },
    features: [
      'Funcionalidad real de supervivencia militar desplegable en caso de emergencia',
      'Grillete de anclaje con 3 orificios para micro-ajuste a la muñeca',
      'Tejido apretado y simétrico de grado profesional',
      'Excelente complemento táctico y de identificación personal'
    ],
    isFeatured: false
  }
];
