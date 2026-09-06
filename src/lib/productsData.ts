export interface ProductReview {
  id: string;
  author: string;
  company?: string;
  country: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBuyer: boolean;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  gallery?: string[];
  price: number;
  unit?: string;
  originCountry: string;
  rating: number;
  reviewsCount?: number;
  availableQuantity: number;
  minOrderQty?: number;
  description?: string;
  category?: string;
  createdAt: string;
  exporterName?: string;
  exporterRating?: number;
  exporterVerified?: boolean;
  exporterShipments?: number;
  portOfLoading?: string;
  leadTime?: string;
  hsCode?: string;
  packaging?: string;
  certifications?: string[];
  shelfLife?: string;
  specs?: { label: string; value: string }[];
  reviews?: ProductReview[];
}

export interface ImportedProduct {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  unit?: string;
  rating: number;
  originCountry: string;
  importedQuantity: number;
  importedAt: string;
}

export const initialProducts: Product[] = [
  {
    id: "prod-1",
    name: "Single-Origin Colombian Arabica Coffee Beans (Excelso EP)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Roasted_coffee_beans.jpg/1280px-Roasted_coffee_beans.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Roasted_coffee_beans.jpg/1280px-Roasted_coffee_beans.jpg",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80",
    ],
    price: 2950,
    unit: "kg",
    originCountry: "Colombia",
    rating: 4.9,
    reviewsCount: 38,
    availableQuantity: 450,
    minOrderQty: 5,
    description: "Hand-picked high-altitude Arabica beans from the volcanic soil of Huila, Colombia (1,750m elevation). Features balanced acidity, silky body, and distinct aromatic cupping notes of dark cocoa, orange blossom, and wild honey.",
    category: "Agricultural",
    createdAt: "2026-09-05T10:00:00.000Z",
    exporterName: "Andean Harvest Co.",
    exporterRating: 4.95,
    exporterVerified: true,
    exporterShipments: 142,
    portOfLoading: "Port of Buenaventura",
    leadTime: "7 - 12 business days",
    hsCode: "0901.11.00",
    packaging: "GrainPro hermetic liners in 60kg jute export bags",
    shelfLife: "24 Months",
    certifications: [
      "Rainforest Alliance Certified",
      "USDA Organic",
      "ICO Quality Seal",
      "Fair Trade International",
    ],
    specs: [
      { label: "Grade", value: "Excelso European Preparation (EP)" },
      { label: "Screen Size", value: "15/16 Strictly Hard Bean" },
      { label: "Moisture Content", value: "11.2% Max" },
      { label: "Processing Method", value: "Fully Washed & Sun Dried" },
      { label: "Defect Count", value: "< 0.5% (SCAA Standard)" },
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Marco Rossi",
        company: "Trieste Roastery Ltd",
        country: "Italy",
        rating: 5,
        date: "2026-08-14",
        comment: "Flawless cupping score (86.5). Clean moisture levels, zero shipping damage upon arrival at Genoa port.",
        verifiedBuyer: true,
      },
      {
        id: "rev-2",
        author: "Liam O'Connor",
        company: "Artisan Coffee Group",
        country: "Ireland",
        rating: 5,
        date: "2026-07-29",
        comment: "Excellent packaging with GrainPro liners. Outstanding caramel sweetness in the espresso profile.",
        verifiedBuyer: true,
      },
    ],
  },
  {
    id: "prod-2",
    name: "Premium Raw Tossa Jute Fibre (Grade BTD Top)",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
    ],
    price: 120,
    unit: "kg",
    originCountry: "Bangladesh",
    rating: 4.8,
    reviewsCount: 64,
    availableQuantity: 12000,
    minOrderQty: 100,
    description: "Golden fibre harvested from the fertile alluvial delta of Faridpur, Bangladesh. High tensile strength, natural lustre, and 100% biodegradable composition suitable for high-end geo-textiles, industrial sackings, and composite materials.",
    category: "Textile",
    createdAt: "2026-09-04T15:30:00.000Z",
    exporterName: "Bengal Fibre Mills",
    exporterRating: 4.88,
    exporterVerified: true,
    exporterShipments: 310,
    portOfLoading: "Chittagong Seaport (CTG)",
    leadTime: "3 - 5 business days",
    hsCode: "5303.10.10",
    packaging: "Hydraulic pressed high-density bales (180kg / bale)",
    shelfLife: "Indefinite in dry storage",
    certifications: [
      "OEKO-TEX Standard 100",
      "Bangladesh Jute Research Seal",
      "ISO 9001:2015",
      "100% Biodegradable Certified",
    ],
    specs: [
      { label: "Botanical Species", value: "Corchorus olitorius (Tossa Jute)" },
      { label: "Fibre Length", value: "1.8m - 2.4m avg." },
      { label: "Moisture Regain", value: "14% Standard" },
      { label: "Strength Index", value: "28 - 32 cN/tex" },
      { label: "Foreign Matter", value: "< 0.8%" },
    ],
    reviews: [
      {
        id: "rev-3",
        author: "Klaus Weber",
        company: "Bavaria Packaging GmbH",
        country: "Germany",
        rating: 5,
        date: "2026-08-02",
        comment: "Remarkable tensile strength and uniform fiber length. Seamless customs clearance at Hamburg.",
        verifiedBuyer: true,
      },
    ],
  },
  {
    id: "prod-3",
    name: "Organic Handwoven Khadi Cotton Fabric (60s Count)",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80",
    ],
    price: 450,
    unit: "meters",
    originCountry: "India",
    rating: 4.7,
    reviewsCount: 29,
    availableQuantity: 3500,
    minOrderQty: 25,
    description: "100% natural, chemical-free hand-spun and hand-woven cotton textiles crafted by artisan clusters in Gujarat. Highly breathable with dynamic thermo-regulating micro-textures suited for sustainable fashion and luxury lifestyle brands.",
    category: "Textile",
    createdAt: "2026-09-03T11:20:00.000Z",
    exporterName: "Swaraj Artisans",
    exporterRating: 4.79,
    exporterVerified: true,
    exporterShipments: 88,
    portOfLoading: "Nhava Sheva (JNPT), Mumbai",
    leadTime: "5 - 8 business days",
    hsCode: "5208.11.00",
    packaging: "Moisture-barrier polythene wrapped rolls in export cartons",
    shelfLife: "Indefinite",
    certifications: [
      "GOTS (Global Organic Textile Standard)",
      "Khadi & Village Industries Commission (KVIC)",
      "Craftmark Authenticity",
    ],
    specs: [
      { label: "Yarn Count", value: "60s Ne Warp x 60s Ne Weft" },
      { label: "GSM / Weight", value: "115 GSM" },
      { label: "Width", value: "44 inches (112 cm)" },
      { label: "Shrinkage", value: "< 2.5% Pre-washed" },
    ],
  },
  {
    id: "prod-4",
    name: "Export Quality Cashew Kernels (Grade W320 Jumbo)",
    image: "https://images.unsplash.com/photo-1509914398867-2708b7d4d420?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509914398867-2708b7d4d420?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    ],
    price: 850,
    unit: "kg",
    originCountry: "Ivory Coast",
    rating: 4.9,
    reviewsCount: 52,
    availableQuantity: 2800,
    minOrderQty: 20,
    description: "First-grade whole white cashew kernels roasted and nitrogen-vacuum packed under strict HACCP guidelines. High kernel density, natural ivory color, and sweet buttery crunch ideal for confectionery and direct retail packaging.",
    category: "Food",
    createdAt: "2026-09-02T08:15:00.000Z",
    exporterName: "Abidjan Agri Exports",
    exporterRating: 4.91,
    exporterVerified: true,
    exporterShipments: 204,
    portOfLoading: "Port of Abidjan",
    leadTime: "6 - 10 business days",
    hsCode: "0801.32.00",
    packaging: "2x25 lbs (11.34 kg) flexible vacuum pouches in carton",
    shelfLife: "18 Months",
    certifications: [
      "HACCP & ISO 22000 Certified",
      "BRC Global Standard for Food Safety",
      "Phytosanitary Ministry Inspection",
    ],
    specs: [
      { label: "Grade", value: "W320 (300-320 nuts / lb)" },
      { label: "Moisture", value: "4.5% Maximum" },
      { label: "Broken Kernels", value: "< 1.5% Max" },
      { label: "Color", value: "Uniform White / Pale Ivory" },
    ],
  },
  {
    id: "prod-5",
    name: "Freeze-Dried Carabao Mango Slices (100% Pure)",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
    ],
    price: 650,
    unit: "pack (500g)",
    originCountry: "Philippines",
    rating: 4.6,
    reviewsCount: 23,
    availableQuantity: 1500,
    minOrderQty: 10,
    description: "Crispy sweet Guimaras champagne mangoes dehydrated via sub-zero vacuum sublimation. Preserves 98% of active vitamin C, enzymes, and the legendary sweet aromatic profile of Philippine Carabao mangoes without any additives.",
    category: "Food",
    createdAt: "2026-09-01T14:40:00.000Z",
    exporterName: "Luzon Tropics",
    exporterRating: 4.75,
    exporterVerified: true,
    exporterShipments: 76,
    portOfLoading: "Port of Manila",
    leadTime: "4 - 7 business days",
    hsCode: "0813.40.10",
    packaging: "Nitrogen flushed multi-layer aluminium foil pouches",
    shelfLife: "24 Months",
    certifications: [
      "FDA Certified Food Facility",
      "Halal Philippines Certified",
      "Good Manufacturing Practice (GMP)",
    ],
    specs: [
      { label: "Ingredients", value: "100% Carabao Mango (No added sugar)" },
      { label: "Moisture Content", value: "< 3.0%" },
      { label: "Brix Equivalent", value: "18 - 20° Natural" },
    ],
  },
  {
    id: "prod-6",
    name: "Ceylon Pure Single-Estate Black Tea (BOPF Special)",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    ],
    price: 1800,
    unit: "kg",
    originCountry: "Sri Lanka",
    rating: 4.8,
    reviewsCount: 41,
    availableQuantity: 900,
    minOrderQty: 10,
    description: "High-grown Nuwara Eliya single-estate tea (6,200ft above sea level). Delivers a luminous golden-orange liquor, brisk invigorating astringency, and subtle citrus floral notes certified by the Sri Lanka Tea Board Lion Logo.",
    category: "Agricultural",
    createdAt: "2026-08-30T09:00:00.000Z",
    exporterName: "Kandy Tea Masters",
    exporterRating: 4.92,
    exporterVerified: true,
    exporterShipments: 195,
    portOfLoading: "Port of Colombo",
    leadTime: "5 - 9 business days",
    hsCode: "0902.40.00",
    packaging: "Aluminium-foil lined kraft paper multi-wall sacks (50kg)",
    shelfLife: "36 Months",
    certifications: [
      "Sri Lanka Lion Logo Guarantee",
      "Ethical Tea Partnership (ETP)",
      "ISO 3720 Black Tea Standard",
    ],
    specs: [
      { label: "Grade", value: "Broken Orange Pekoe Fannings (BOPF)" },
      { label: "Elevation", value: "High Grown (6,200 ft)" },
      { label: "Total Liquor Ash", value: "< 7.5%" },
    ],
  },
  {
    id: "prod-7",
    name: "Extra Virgin Organic Cold-Pressed Olive Oil (Kalamata PDO)",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?auto=format&fit=crop&w=800&q=80",
    ],
    price: 1400,
    unit: "liter",
    originCountry: "Greece",
    rating: 4.9,
    reviewsCount: 47,
    availableQuantity: 620,
    minOrderQty: 12,
    description: "First mechanical cold extraction below 24°C from sun-drenched Koroneiki olive groves in Kalamata, Peloponnese. Guaranteed acidity below 0.28%, rich in health-boosting polyphenols with intensely fresh peppery finish.",
    category: "Food",
    createdAt: "2026-08-28T16:00:00.000Z",
    exporterName: "Hellas Oils Ltd",
    exporterRating: 4.97,
    exporterVerified: true,
    exporterShipments: 165,
    portOfLoading: "Port of Piraeus, Athens",
    leadTime: "6 - 11 business days",
    hsCode: "1509.20.00",
    packaging: "5L food-grade nitrogenized tin drums / IBC totes",
    shelfLife: "24 Months",
    certifications: [
      "European Union PDO (Protected Designation of Origin)",
      "Bio Hellas Organic Certification",
      "International Olive Council (IOC) Grade 1",
    ],
    specs: [
      { label: "Free Acidity", value: "0.26% (Oleic Acid)" },
      { label: "Peroxide Value", value: "< 7.5 meq O2/kg" },
      { label: "Polyphenol Count", value: "480 mg/kg High Bio-Active" },
    ],
  },
  {
    id: "prod-8",
    name: "Grade 1 Natural White Sesame Seeds (Humera Type)",
    image: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    ],
    price: 320,
    unit: "kg",
    originCountry: "Ethiopia",
    rating: 4.7,
    reviewsCount: 31,
    availableQuantity: 8400,
    minOrderQty: 100,
    description: "World-renowned Humera sesame seeds characterized by uniform pearly white kernels, exceptionally high oil content (>52%), and a fragrant, sweet nutty flavor profile ideal for premium tahini, halva, and luxury bakery exports.",
    category: "Agricultural",
    createdAt: "2026-08-25T12:00:00.000Z",
    exporterName: "Horn Commodities",
    exporterRating: 4.82,
    exporterVerified: true,
    exporterShipments: 240,
    portOfLoading: "Port of Djibouti (via Ethio-Djibouti Railway)",
    leadTime: "5 - 9 business days",
    hsCode: "1207.40.10",
    packaging: "50kg new polypropylene bags with inner poly lining",
    shelfLife: "18 Months",
    certifications: [
      "Ethiopian Commodity Exchange (ECX Grade 1)",
      "SGS Pre-Shipment Inspection Seal",
      "Non-GMO Verified",
    ],
    specs: [
      { label: "Purity", value: "99.5% Minimum Machine Cleaned" },
      { label: "Oil Content", value: "52.8% Standard" },
      { label: "Moisture Content", value: "5.8% Max" },
      { label: "FFA (Free Fatty Acid)", value: "< 1.5%" },
    ],
  },
];

export const initialImports: ImportedProduct[] = [
  {
    id: "imp-1",
    productId: "prod-1",
    name: "Single-Origin Colombian Arabica Coffee Beans (Excelso EP)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Roasted_coffee_beans.jpg/1280px-Roasted_coffee_beans.jpg",
    price: 2950,
    unit: "kg",
    rating: 4.9,
    originCountry: "Colombia",
    importedQuantity: 50,
    importedAt: "2026-09-05T12:00:00.000Z",
  },
  {
    id: "imp-2",
    productId: "prod-4",
    name: "Export Quality Cashew Kernels (Grade W320 Jumbo)",
    image: "https://images.unsplash.com/photo-1509914398867-2708b7d4d420?auto=format&fit=crop&w=800&q=80",
    price: 850,
    unit: "kg",
    rating: 4.9,
    originCountry: "Ivory Coast",
    importedQuantity: 120,
    importedAt: "2026-09-04T10:30:00.000Z",
  },
];

