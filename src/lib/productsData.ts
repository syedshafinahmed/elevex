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
  slug?: string;
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
  exporterShipments?: number;
  portOfLoading?: string;
  leadTime?: string;
  hsCode?: string;
  packaging?: string;
  certifications?: string[];
  shelfLife?: string;
  specs?: { label: string; value: string }[];
  reviews?: ProductReview[];
  userId?: string;
  user?: {
    id: string;
    name?: string | null;
    email: string;
    image?: string | null;
    company?: string | null;
    designation?: string | null;
    phone?: string | null;
    createdAt: string;
  } | null;
}

export interface ImportedProduct {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  unit?: string;
  rating?: number;
  originCountry: string;
  importedQuantity: number;
  importedAt: string;
}

// Dynamic database-backed initialization (no hardcoded demo items)
export const initialProducts: Product[] = [];
export const initialImports: ImportedProduct[] = [];
