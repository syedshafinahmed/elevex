"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ImportedProduct, initialProducts, initialImports } from "@/lib/productsData";

interface ProductContextType {
  products: Product[];
  myImports: ImportedProduct[];
  myExports: Product[];
  addProduct: (product: Omit<Product, "id" | "createdAt">) => Product;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  importProduct: (productId: string, quantity: number) => { success: boolean; error?: string };
  removeImport: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = "elevex_products_v1";
const IMPORTS_STORAGE_KEY = "elevex_my_imports_v1";

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [myImports, setMyImports] = useState<ImportedProduct[]>(initialImports);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      const savedImports = localStorage.getItem(IMPORTS_STORAGE_KEY);
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      }
      if (savedImports) {
        setMyImports(JSON.parse(savedImports));
      }
    } catch {
      // fallback to initial demo data
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
      } catch {}
    }
  }, [products, mounted]);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(IMPORTS_STORAGE_KEY, JSON.stringify(myImports));
      } catch {}
    }
  }, [myImports, mounted]);

  // Derived: user's exports (for demo, first 4 or user-created items)
  const myExports = products;

  function addProduct(productData: Omit<Product, "id" | "createdAt">) {
    const newProd: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProd, ...prev]);
    return newProd;
  }

  function updateProduct(id: string, updated: Partial<Product>) {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  }

  function deleteProduct(id: string) {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  }

  function importProduct(productId: string, quantity: number) {
    const target = products.find((p) => p.id === productId);
    if (!target) {
      return { success: false, error: "Product not found" };
    }
    if (quantity <= 0) {
      return { success: false, error: "Quantity must be greater than zero" };
    }
    if (quantity > target.availableQuantity) {
      return {
        success: false,
        error: `Cannot import more than available quantity (${target.availableQuantity})`,
      };
    }

    // Deduct available quantity
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, availableQuantity: p.availableQuantity - quantity }
          : p
      )
    );

    // Add to myImports
    const newImport: ImportedProduct = {
      id: `imp-${Date.now()}`,
      productId: target.id,
      name: target.name,
      image: target.image,
      price: target.price,
      rating: target.rating,
      originCountry: target.originCountry,
      importedQuantity: quantity,
      importedAt: new Date().toISOString(),
    };

    setMyImports((prev) => [newImport, ...prev]);
    return { success: true };
  }

  function removeImport(id: string) {
    setMyImports((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        myImports,
        myExports,
        addProduct,
        updateProduct,
        deleteProduct,
        importProduct,
        removeImport,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
