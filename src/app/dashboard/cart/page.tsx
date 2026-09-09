"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Trash2,
  Eye,
  MapPin,
  ArrowRight,
  Plus,
  Minus,
  ShieldCheck,
  CheckCircle2,
  PackageCheck,
  Building,
  AlertCircle,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";
import Button from "@/app/components/ui/Button";
import DeleteConfirmModal from "@/app/components/dashboard/DeleteConfirmModal";
import { toast } from "gooey-toast";
import { slugify } from "@/lib/utils";

export default function CartItemsPage() {
  const router = useRouter();
  const { products, cartItems, removeFromCart, updateCartQuantity, clearCart, importProduct } = useProducts();
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);
  const [isClearingCart, setIsClearingCart] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Map cart items to real product records
  const resolvedCartItems = cartItems
    .map((item) => {
      const prod = products.find((p) => p.id === item.id);
      return prod ? { product: prod, quantity: item.quantity } : null;
    })
    .filter((item): item is { product: (typeof products)[0]; quantity: number } => item !== null);

  const totalUnits = resolvedCartItems.reduce((acc, cur) => acc + cur.quantity, 0);
  const subtotal = resolvedCartItems.reduce(
    (acc, cur) => acc + cur.product.price * cur.quantity,
    0
  );
  const portDutyEst = Math.round(subtotal * 0.025);
  const totalLandedCost = subtotal + portDutyEst;

  const productBeingRemoved = products.find((p) => p.id === itemToRemove);

  function handleQuantityChange(productId: string, newQty: number, minQty: number, maxStock: number) {
    const clamped = Math.max(minQty, Math.min(newQty, maxStock || minQty));
    updateCartQuantity(productId, clamped);
  }

  function handleCheckoutAll() {
    if (resolvedCartItems.length === 0) return;

    setIsCheckingOut(true);

    // Verify stock availability
    for (const item of resolvedCartItems) {
      if (item.quantity > item.product.availableQuantity) {
        toast.error({
          title: `Insufficient Stock for ${item.product.name}`,
          description: `Only ${item.product.availableQuantity} units available.`,
        });
        setIsCheckingOut(false);
        return;
      }
    }

    try {
      for (const item of resolvedCartItems) {
        importProduct(item.product.id, item.quantity);
      }
      clearCart();
      toast.success({
        title: "All Consignments Successfully Allocated",
      });
      setTimeout(() => {
        router.push("/dashboard/imports");
      }, 800);
    } catch {
      toast.error({
        title: "Checkout Failed",
        description: "An error occurred while allocating your consignments.",
      });
      setIsCheckingOut(false);
    }
  }

  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12`}>
      {/* Remove Item Modal */}
      <DeleteConfirmModal
        isOpen={itemToRemove !== null}
        title="Remove Commodity from Cart"
        description={`Are you sure you want to remove "${productBeingRemoved?.name || "this commodity"}" from your cart?`}
        onConfirm={() => {
          if (itemToRemove) {
            removeFromCart(itemToRemove);
            toast.info({
              title: "Removed from Cart",
            });
            setItemToRemove(null);
          }
        }}
        onClose={() => setItemToRemove(null)}
      />

      {/* Clear Cart Modal */}
      <DeleteConfirmModal
        isOpen={isClearingCart}
        title="Clear Entire Cart"
        description="Are you sure you want to remove all items from your cart? This action cannot be undone."
        onConfirm={() => {
          clearCart();
          toast.info({
            title: "Cart Cleared",
          });
          setIsClearingCart(false);
        }}
        onClose={() => setIsClearingCart(false)}
      />

      {/* Top Actions Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs text-foreground/50">
          Showing <span className="font-semibold text-foreground">{resolvedCartItems.length}</span> commodities ready for import allocation
        </div>
        <div className="flex items-center gap-2">
          {resolvedCartItems.length > 0 && (
            <button
              type="button"
              onClick={() => setIsClearingCart(true)}
              className="flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/5 px-3.5 py-2 text-xs font-semibold text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear Cart</span>
            </button>
          )}
          <Button
            href="/products"
            variant="primary"
            size="sm"
            className="flex items-center gap-1.5 shadow-xl shadow-primary/20 text-white"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add More Commodities</span>
          </Button>
        </div>
      </div>

      {resolvedCartItems.length === 0 ? (
        /* Empty Cart State */
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-foreground/15 bg-foreground/2 p-12 text-center inset-shadow-foreground/30 inset-shadow-xs">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
            <ShoppingCart className="h-8 w-8 stroke-[1.5]" />
          </div>
          <h2 className={`${pinkAverage.className} text-2xl font-bold text-foreground`}>
            Your Cart is Currently Empty
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-foreground/60 max-w-md leading-relaxed">
            Browse our verified international trade catalog, compare prices, and add agricultural, textile, or food lots to your cart.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Button
              href="/products"
              variant="primary"
              size="sm"
              className="flex items-center gap-2 shadow-lg shadow-primary/20 text-white"
            >
              <span>Explore Products</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Summary KPI Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/30 inset-shadow-sm">
              <span className="text-[10px] uppercase tracking-wider text-foreground/45 font-semibold block">
                Total Cart Lots
              </span>
              <span className={`${pinkAverage.className} text-2xl font-bold text-foreground`}>
                {resolvedCartItems.length} Products
              </span>
            </div>

            <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/30 inset-shadow-sm">
              <span className="text-[10px] uppercase tracking-wider text-foreground/45 font-semibold block">
                Total Ordered Units
              </span>
              <span className={`${pinkAverage.className} text-2xl font-bold text-foreground`}>
                {totalUnits.toLocaleString()} units
              </span>
            </div>

            <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/30 inset-shadow-sm">
              <span className="text-[10px] uppercase tracking-wider text-foreground/45 font-semibold block">
                Estimated Order Value
              </span>
              <span className={`${pinkAverage.className} text-2xl font-bold text-primary`}>
                ৳ {subtotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Main Grid: Cart Items List + Order Summary Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Cols: Cart Items List */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              {resolvedCartItems.map(({ product, quantity }) => {
                const itemTotal = product.price * quantity;
                const minOrder = product.minOrderQty || 1;
                const maxStock = product.availableQuantity;
                const unit = product.unit || "kg";

                return (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-2xl border border-foreground/10 bg-foreground/2 p-4 transition-all hover:border-foreground/20 inset-shadow-foreground/30 inset-shadow-sm"
                  >
                    {/* Left: Thumbnail + Info */}
                    <div className="flex items-center gap-4 min-w-[240px]">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-foreground/5 border border-foreground/10">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
                            {product.category || "Commodity"}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-foreground/60">
                            <MapPin className="h-3 w-3 text-primary shrink-0" />
                            {product.originCountry}
                          </span>
                        </div>

                        <Link
                          href={`/products/${product.slug || slugify(product.name) || product.id}`}
                          className="text-sm font-bold text-foreground hover:text-primary transition-colors line-clamp-1"
                        >
                          {product.name}
                        </Link>

                        <div className="flex items-center gap-2 text-xs text-foreground/50">
                          <Building className="h-3 w-3" />
                          <span className="truncate max-w-[140px]">{product.exporterName}</span>
                          <span className="text-primary font-semibold">
                            ৳ {product.price.toLocaleString()}/{unit}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Center: Quantity Stepper */}
                    <div className="flex items-center justify-between sm:justify-center gap-3 border-y sm:border-y-0 sm:border-x border-foreground/10 py-2 sm:py-0 sm:px-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-semibold text-foreground/45">
                          Quantity ({unit})
                        </span>
                        <div className="flex items-center rounded-xl border border-foreground/15 bg-background p-1">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(product.id, quantity - (minOrder || 1), minOrder, maxStock)}
                            disabled={quantity <= minOrder}
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-foreground/70 hover:bg-foreground/5 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <input
                            type="number"
                            value={quantity}
                            onChange={(e) =>
                              handleQuantityChange(product.id, parseInt(e.target.value) || minOrder, minOrder, maxStock)
                            }
                            min={minOrder}
                            max={maxStock}
                            className="w-16 bg-transparent text-center text-xs font-bold text-foreground focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(product.id, quantity + (minOrder || 1), minOrder, maxStock)}
                            disabled={quantity >= maxStock}
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-foreground/70 hover:bg-foreground/5 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-[9px] text-foreground/40">
                          Min: {minOrder} {unit} · Max: {maxStock.toLocaleString()} {unit}
                        </span>
                      </div>
                    </div>

                    {/* Right: Subtotal + Actions */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                      <div className="flex flex-col items-start sm:items-end">
                        <span className="text-[10px] uppercase font-semibold text-foreground/45">
                          Item Total
                        </span>
                        <span className="text-base font-extrabold text-primary">
                          ৳ {itemTotal.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/products/${product.slug || slugify(product.name) || product.id}`}
                          aria-label="View product details"
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/5 text-foreground/60 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setItemToRemove(product.id)}
                          aria-label="Remove item"
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/15 transition-all cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right 4 Cols: Order Summary & Checkout Card */}
            <div className="lg:col-span-4 sticky top-4 flex flex-col gap-4">
              <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-5 flex flex-col gap-4 inset-shadow-foreground/30 inset-shadow-sm">
                <h3 className={`${pinkAverage.className} text-lg font-bold text-foreground`}>
                  Consignment Summary
                </h3>

                <div className="flex flex-col gap-2.5 text-xs">
                  <div className="flex items-center justify-between text-foreground/70">
                    <span>Commodities Subtotal ({totalUnits.toLocaleString()} units)</span>
                    <span className="font-semibold text-foreground">৳ {subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between text-foreground/70">
                    <span className="flex items-center gap-1">
                      <span>Port Handling & Customs (Est. 2.5%)</span>
                    </span>
                    <span className="font-semibold text-foreground">৳ {portDutyEst.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>100% Escrow Protection</span>
                    </span>
                    <span className="font-bold uppercase text-[10px] tracking-wider">Free / Included</span>
                  </div>

                  <div className="h-px w-full bg-foreground/10 my-1" />

                  <div className="flex items-baseline justify-between text-foreground">
                    <span className="text-sm font-bold">Total Landed Cost</span>
                    <div className="flex flex-col items-end">
                      <span className={`${pinkAverage.className} text-xl font-bold text-primary`}>
                        ৳ {totalLandedCost.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-foreground/45">All port taxes included</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 rounded-xl bg-primary/5 border border-primary/15 p-3 text-[11px] text-foreground/75">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    Allocating items will immediately reserve quantities from available inventory and record them in your <strong>My Imports</strong> portfolio.
                  </span>
                </div>

                <Button
                  onClick={handleCheckoutAll}
                  disabled={isCheckingOut || resolvedCartItems.length === 0}
                  className="w-full justify-center py-3 text-sm font-bold text-white shadow-lg shadow-primary/25"
                >
                  <PackageCheck className="h-4 w-4 mr-1.5" />
                  <span>{isCheckingOut ? "Allocating Consignments..." : "Allocate & Confirm Imports"}</span>
                </Button>
              </div>

              {/* Security guarantee note */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-foreground/50">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>Protected by Elevex Multi-Currency Escrow Protocol</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
