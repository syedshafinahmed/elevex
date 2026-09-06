export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originCountry: string;
  rating: number;
  availableQuantity: number;
  description?: string;
  category?: string;
  createdAt: string;
  exporterName?: string;
}

export interface ImportedProduct {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  originCountry: string;
  importedQuantity: number;
  importedAt: string;
}

export const initialProducts: Product[] = [
  {
    id: "prod-1",
    name: "Single-Origin Colombian Arabica Coffee Beans",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Roasted_coffee_beans.jpg/1280px-Roasted_coffee_beans.jpg",
    price: 2950,
    originCountry: "Colombia",
    rating: 4.9,
    availableQuantity: 450,
    description: "Hand-picked high-altitude Arabica beans from Huila, Colombia. Notes of dark chocolate, citrus, and floral jasmine.",
    category: "Agricultural",
    createdAt: "2026-09-05T10:00:00.000Z",
    exporterName: "Andean Harvest Co.",
  },
  {
    id: "prod-2",
    name: "Premium Raw Jute Fibre (Grade A)",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    price: 120,
    originCountry: "Bangladesh",
    rating: 4.8,
    availableQuantity: 12000,
    description: "Golden fibre harvested from the fertile delta of Faridpur. Ideal for eco-friendly packaging, ropes, and geo-textiles.",
    category: "Textile",
    createdAt: "2026-09-04T15:30:00.000Z",
    exporterName: "Bengal Fibre Mills",
  },
  {
    id: "prod-3",
    name: "Organic Handwoven Khadi Cotton Fabric",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
    price: 450,
    originCountry: "India",
    rating: 4.7,
    availableQuantity: 3500,
    description: "100% natural, chemical-free hand-spun cotton. Breathable, durable, and crafted by heritage artisan cooperatives.",
    category: "Textile",
    createdAt: "2026-09-03T11:20:00.000Z",
    exporterName: "Swaraj Artisans",
  },
  {
    id: "prod-4",
    name: "Cashew Kernels Grade W320 Premium",
    image: "https://images.unsplash.com/photo-1509914398867-2708b7d4d420?auto=format&fit=crop&w=800&q=80",
    price: 850,
    originCountry: "Ivory Coast",
    rating: 4.9,
    availableQuantity: 2800,
    description: "Whole white cashew kernels roasted and vacuum packed under international food safety and phytosanitary standards.",
    category: "Food",
    createdAt: "2026-09-02T08:15:00.000Z",
    exporterName: "Abidjan Agri Exports",
  },
  {
    id: "prod-5",
    name: "Freeze-Dried Carabao Mango Slices",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    price: 650,
    originCountry: "Philippines",
    rating: 4.6,
    availableQuantity: 1500,
    description: "Crispy sweet Guimaras mangoes preserved via low-temperature vacuum freeze drying to retain all natural nutrients.",
    category: "Food",
    createdAt: "2026-09-01T14:40:00.000Z",
    exporterName: "Luzon Tropics",
  },
  {
    id: "prod-6",
    name: "Ceylon Pure Single-Estate Black Tea (BOPF)",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    price: 1800,
    originCountry: "Sri Lanka",
    rating: 4.8,
    availableQuantity: 900,
    description: "High-grown Nuwara Eliya tea with bright liquor and refined astringency. Certified Lion Logo pure Ceylon tea.",
    category: "Agricultural",
    createdAt: "2026-08-30T09:00:00.000Z",
    exporterName: "Kandy Tea Masters",
  },
  {
    id: "prod-7",
    name: "Extra Virgin Organic Cold-Pressed Olive Oil",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
    price: 1400,
    originCountry: "Greece",
    rating: 4.9,
    availableQuantity: 620,
    description: "First cold press from Kalamata olive groves. Acidity below 0.3%, rich in polyphenols and Mediterranean aroma.",
    category: "Food",
    createdAt: "2026-08-28T16:00:00.000Z",
    exporterName: "Hellas Oils Ltd",
  },
  {
    id: "prod-8",
    name: "Grade 1 Natural White Sesame Seeds",
    image: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?auto=format&fit=crop&w=800&q=80",
    price: 320,
    originCountry: "Ethiopia",
    rating: 4.7,
    availableQuantity: 8400,
    description: "Humera type sesame seeds with 99.5% purity, high oil content, and sweet nutty flavor for tahini and bakery.",
    category: "Agricultural",
    createdAt: "2026-08-25T12:00:00.000Z",
    exporterName: "Horn Commodities",
  },
];

export const initialImports: ImportedProduct[] = [
  {
    id: "imp-1",
    productId: "prod-1",
    name: "Single-Origin Colombian Arabica Coffee Beans",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Roasted_coffee_beans.jpg/1280px-Roasted_coffee_beans.jpg",
    price: 2950,
    rating: 4.9,
    originCountry: "Colombia",
    importedQuantity: 50,
    importedAt: "2026-09-05T12:00:00.000Z",
  },
  {
    id: "imp-2",
    productId: "prod-4",
    name: "Cashew Kernels Grade W320 Premium",
    image: "https://images.unsplash.com/photo-1509914398867-2708b7d4d420?auto=format&fit=crop&w=800&q=80",
    price: 850,
    rating: 4.9,
    originCountry: "Ivory Coast",
    importedQuantity: 120,
    importedAt: "2026-09-04T10:30:00.000Z",
  },
];
