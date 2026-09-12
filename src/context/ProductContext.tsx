"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { Product, ImportedProduct, initialProducts, initialImports } from "@/lib/productsData";

export interface CartItem {
  id: string;
  quantity: number;
}

interface ProductContextType {
  products: Product[];
  myImports: ImportedProduct[];
  myExports: Product[];
  cartItems: CartItem[];
  cartCount: number;
  loading: boolean;
  addProduct: (product: Omit<Product, "id" | "createdAt">) => Promise<Product>;
  updateProduct: (id: string, updated: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  importProduct: (productId: string, quantity: number) => Promise<{ success: boolean; error?: string }>;
  removeImport: (id: string) => Promise<void>;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  refreshProducts: () => Promise<void>;
  fetchImportsFromAPI: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);


export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [myImports, setMyImports] = useState<ImportedProduct[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);


  // Fetch initial data from APIs
  async function fetchProductsFromAPI() {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data: Product[] = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  }

  async function fetchImportsFromAPI() {
    try {
      const res = await fetch("/api/imports");
      if (res.ok) {
        const data: ImportedProduct[] = await res.json();
        setMyImports(data);
      }
    } catch (err) {
      console.error("Failed to fetch imports:", err);
    }
  }

  const { data: session } = useSession();

  async function fetchCartFromAPI() {
    try {
      const res = await fetch("/api/cart");
      if (res.ok) {
        const data: { productId: string; quantity: number }[] = await res.json();
        setCartItems(data.map((d) => ({ id: d.productId, quantity: d.quantity })));
      }
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  }

  useEffect(() => {
    Promise.all([fetchProductsFromAPI(), fetchImportsFromAPI(), fetchCartFromAPI()]).finally(() => {
      setLoading(false);
    });
  }, []);



  // User's exports (strictly filtered by logged-in user)
  const myExports = useMemo(() => {
    if (!session?.user) return [];
    const currentUserId = session.user.id;
    const currentUserName = session.user.name?.toLowerCase().trim();
    const currentUserEmail = session.user.email?.toLowerCase().trim();

    return products.filter((p) => {
      // 1. Direct match on userId if assigned
      if (p.userId && currentUserId && p.userId === currentUserId) {
        return true;
      }
      // 2. Fallback match on exporterName
      if (p.exporterName && (currentUserName || currentUserEmail)) {
        const exp = p.exporterName.toLowerCase().trim();
        if (currentUserName && exp === currentUserName) return true;
        if (currentUserEmail && exp === currentUserEmail) return true;
      }
      return false;
    });
  }, [products, session]);

  function addToCart(productId: string, quantity?: number) {
    const targetProduct = products.find((p) => p.id === productId || p.slug === productId);
    const defaultQty = targetProduct?.minOrderQty || 1;
    const itemQty = quantity && quantity > 0 ? quantity : defaultQty;
    const resolvedId = targetProduct?.id || productId;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === resolvedId);
      if (existing) {
        const newQty = existing.quantity + itemQty;
        fetch(`/api/cart/${resolvedId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: newQty }),
        }).catch(console.error);
        return prev.map((item) => item.id === resolvedId ? { ...item, quantity: newQty } : item);
      }
      fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: resolvedId, quantity: itemQty }),
      }).catch(console.error);
      return [...prev, { id: resolvedId, quantity: itemQty }];
    });
  }

  function removeFromCart(productId: string) {
    fetch(`/api/cart/${productId}`, { method: "DELETE" }).catch(console.error);
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }

  function updateCartQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    fetch(`/api/cart/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    }).catch(console.error);
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  }

  function clearCart() {
    fetch("/api/cart", { method: "DELETE" }).catch(console.error);
    setCartItems([]);
  }

  function isInCart(productId: string) {
    return cartItems.some((item) => item.id === productId);
  }

  const cartCount = cartItems.length;

  async function addProduct(productData: Omit<Product, "id" | "createdAt">): Promise<Product> {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create product");
      }

      const created: Product = await res.json();
      setProducts((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      console.error("addProduct error:", err);
      throw err;
    }
  }

  async function updateProduct(id: string, updated: Partial<Product>): Promise<void> {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update product");
      }

      const updatedProduct: Product = await res.json();
      setProducts((prev) =>
        prev.map((item) => (item.id === id || item.slug === id ? updatedProduct : item))
      );
    } catch (err) {
      console.error("updateProduct error:", err);
      throw err;
    }
  }

  async function deleteProduct(id: string): Promise<void> {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete product");
      }

      setProducts((prev) => prev.filter((item) => item.id !== id && item.slug !== id));
      removeFromCart(id);
    } catch (err) {
      console.error("deleteProduct error:", err);
      throw err;
    }
  }

  async function importProduct(productId: string, quantity: number): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch("/api/imports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, error: errorData.error || "Failed to allocate import" };
      }

      const createdImport: ImportedProduct = await res.json();
      setMyImports((prev) => [createdImport, ...prev]);

      // Update product stock locally
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId || p.slug === productId
            ? { ...p, availableQuantity: Math.max(0, p.availableQuantity - quantity) }
            : p
        )
      );

      return { success: true };
    } catch (err) {
      console.error("importProduct error:", err);
      return { success: false, error: "An unexpected error occurred" };
    }
  }

  async function removeImport(id: string): Promise<void> {
    try {
      const res = await fetch(`/api/imports/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to remove import");
      }

      setMyImports((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("removeImport error:", err);
      throw err;
    }
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        myImports,
        myExports,
        cartItems,
        cartCount,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        importProduct,
        removeImport,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isInCart,
        refreshProducts: fetchProductsFromAPI,
        fetchImportsFromAPI,
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
