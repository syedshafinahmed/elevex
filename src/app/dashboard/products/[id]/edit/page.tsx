"use client";

import { use, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Sprout,
  Shirt,
  Utensils,
  Gem,
  FlaskConical,
  Cog,
  Eye,
  Plus,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  Package,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/lib/productsData";
import ProductCard from "@/app/components/products/ProductCard";
import Dropdown, { DropdownOption } from "@/app/components/dashboard/Dropdown";
import Button from "@/app/components/ui/Button";
import AuthModal from "@/app/components/auth/AuthModal";
import Loader from "@/app/components/common/Loader";
import { toast } from "gooey-toast";
import { slugify } from "@/lib/utils";

const categoryOptions: DropdownOption[] = [
  { value: "Agricultural", label: "Agricultural", description: "Crops, grains, raw materials", icon: Sprout },
  { value: "Textile", label: "Textile", description: "Fabrics, garments, fibers", icon: Shirt },
  { value: "Food", label: "Food", description: "Processed food & spices", icon: Utensils },
  { value: "Minerals", label: "Minerals", description: "Ores, metals, building stones", icon: Gem },
  { value: "Chemicals", label: "Chemicals", description: "Polymers, solvents, specialty chemicals", icon: FlaskConical },
  { value: "Machinery", label: "Machinery", description: "Industrial equipment, tools & parts", icon: Cog },
];

const SAVED_CERTIFICATIONS = [
  "ISO 22000 Food Safety Standard",
  "USDA Organic Certified",
  "Fair Trade International",
  "GlobalG.A.P. Certified",
  "HACCP Quality Compliance",
];

interface EditExportPageProps {
  params: Promise<{ id: string }>;
}

export default function EditExportPage({ params }: EditExportPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { data: session } = useSession();
  const [authOpen, setAuthOpen] = useState(false);
  const { products, updateProduct, loading: productsLoading } = useProducts();

  const [fetchedProduct, setFetchedProduct] = useState<Product | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Find product from context or fallback to API fetch
  const product = useMemo(() => {
    return (
      products.find(
        (p) =>
          p.slug === resolvedParams.id ||
          slugify(p.name) === resolvedParams.id ||
          p.id === resolvedParams.id
      ) || fetchedProduct
    );
  }, [products, resolvedParams.id, fetchedProduct]);

  useEffect(() => {
    if (!product && !productsLoading) {
      setIsFetching(true);
      fetch(`/api/products/${resolvedParams.id}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && !data.error) {
            setFetchedProduct(data);
          }
        })
        .catch((err) => console.error("Error fetching product to edit:", err))
        .finally(() => setIsFetching(false));
    }
  }, [product, productsLoading, resolvedParams.id]);

  // Basic Details (Product Model)
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Agricultural");
  const [originCountry, setOriginCountry] = useState("");
  const [image, setImage] = useState("");
  const [galleryInput, setGalleryInput] = useState("");
  const [description, setDescription] = useState("");

  // Pricing & Inventory (Product Model)
  const [price, setPrice] = useState<string>("");
  const [unit, setUnit] = useState<string>("kg");
  const [availableQuantity, setAvailableQuantity] = useState<string>("");
  const [minOrderQty, setMinOrderQty] = useState<string>("1");
  const [rating, setRating] = useState<string>("5.0");

  // Exporter Profile Details (Product Model)
  const [exporterRating, setExporterRating] = useState<string>("4.9");
  const [exporterShipments, setExporterShipments] = useState<string>("12");

  // Customs & Logistics (Product Model)
  const [hsCode, setHsCode] = useState<string>("");
  const [portOfLoading, setPortOfLoading] = useState<string>("");
  const [leadTime, setLeadTime] = useState<string>("");
  const [packaging, setPackaging] = useState<string>("");
  const [shelfLife, setShelfLife] = useState<string>("");

  // Quality Certifications (Product Model)
  const [certifications, setCertifications] = useState<string[]>([]);
  const [newCertInput, setNewCertInput] = useState("");

  // Technical Specifications Matrix (Product Model)
  const [specs, setSpecs] = useState<{ label: string; value: string }[]>([
    { label: "", value: "" },
  ]);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Initialize fields once product is loaded
  useEffect(() => {
    if (product && !hasInitialized) {
      setName(product.name || "");
      setCategory(product.category || "Agricultural");
      setOriginCountry(product.originCountry || "");
      setImage(product.image || "");
      if (product.gallery && product.gallery.length > 1) {
        setGalleryInput(product.gallery.slice(1).join("\n"));
      } else {
        setGalleryInput("");
      }
      setDescription(product.description || "");
      setPrice(product.price ? product.price.toString() : "");
      setUnit(product.unit || "kg");
      setAvailableQuantity(product.availableQuantity ? product.availableQuantity.toString() : "");
      setMinOrderQty((product.minOrderQty || 1).toString());
      setRating((product.rating || 5.0).toString());
      setExporterRating((product.exporterRating || 4.9).toString());
      setExporterShipments((product.exporterShipments || 0).toString());
      setHsCode(product.hsCode || "");
      setPortOfLoading(product.portOfLoading || "");
      setLeadTime(product.leadTime || "");
      setPackaging(product.packaging || "");
      setShelfLife(product.shelfLife || "");
      setCertifications(product.certifications || []);
      if (product.specs && product.specs.length > 0) {
        setSpecs(product.specs);
      } else {
        setSpecs([{ label: "", value: "" }]);
      }
      setHasInitialized(true);
    }
  }, [product, hasInitialized]);

  // Computed Exporter Name
  const currentExporterName = product?.exporterName || session?.user?.name || "Verified Global Exporter";

  // Reactive Product Preview
  const previewProduct: Product = useMemo(() => {
    const extraImages = galleryInput
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => u.length > 0);
    const mainImg =
      image.trim() ||
      product?.image ||
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1200&auto=format&fit=crop";

    return {
      id: product?.id || "preview-commodity",
      slug: product?.slug,
      name: name.trim() || "Export Commodity Title",
      image: mainImg,
      gallery: extraImages.length > 0 ? [mainImg, ...extraImages] : [mainImg],
      price: Number(price) || 0,
      unit: unit.trim() || "kg",
      originCountry: originCountry.trim() || "Origin Country",
      rating: Number(rating) || 5.0,
      availableQuantity: Number(availableQuantity) || 0,
      minOrderQty: Number(minOrderQty) || 1,
      category: category || "Agricultural",
      createdAt: product?.createdAt || new Date().toISOString(),
      description: description.trim(),
      exporterName: currentExporterName,
      exporterRating: Number(exporterRating) || 4.9,
      exporterShipments: Number(exporterShipments) || 0,
      hsCode: hsCode.trim() || undefined,
      portOfLoading: portOfLoading.trim() || undefined,
      leadTime: leadTime.trim() || undefined,
      packaging: packaging.trim() || undefined,
      shelfLife: shelfLife.trim() || undefined,
      certifications: certifications.length > 0 ? certifications : undefined,
      specs: specs.filter((s) => s.label.trim() && s.value.trim()),
    };
  }, [
    product,
    name,
    image,
    galleryInput,
    price,
    unit,
    originCountry,
    rating,
    availableQuantity,
    minOrderQty,
    category,
    description,
    currentExporterName,
    exporterRating,
    exporterShipments,
    hsCode,
    portOfLoading,
    leadTime,
    packaging,
    shelfLife,
    certifications,
    specs,
  ]);

  // Add a spec row
  const addSpecRow = () => {
    setSpecs([...specs, { label: "", value: "" }]);
  };

  const removeSpecRow = (index: number) => {
    setSpecs(specs.filter((_, idx) => idx !== index));
  };

  const updateSpecRow = (index: number, field: "label" | "value", text: string) => {
    const updated = [...specs];
    updated[index][field] = text;
    setSpecs(updated);
  };

  // Add certification
  const addCert = () => {
    if (!newCertInput.trim()) return;
    if (!certifications.includes(newCertInput.trim())) {
      setCertifications([...certifications, newCertInput.trim()]);
    }
    setNewCertInput("");
  };

  const removeCert = (certToRemove: string) => {
    setCertifications(certifications.filter((c) => c !== certToRemove));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!session?.user) {
      toast.error({
        title: "Please log in to edit an export",
        description: "You must be signed in to manage export commodities.",
      });
      setAuthOpen(true);
      return;
    }

    if (!product) {
      setError("Commodity record not found.");
      return;
    }

    if (!name.trim() || !image.trim() || !price || !originCountry.trim() || !availableQuantity) {
      setError("Please fill in all required fields (marked with *).");
      return;
    }

    const numPrice = Number(price);
    const numQty = Number(availableQuantity);
    const numRating = Number(rating) || 5;
    const numMinQty = Number(minOrderQty) || 1;

    if (numPrice <= 0 || numQty <= 0) {
      setError("Price and available stock must be positive numbers.");
      return;
    }

    setLoading(true);

    // Parse gallery images
    const extraImages = galleryInput
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url.length > 0);
    const fullGallery = [image.trim(), ...extraImages];

    // Filter valid specs
    const validSpecs = specs.filter(
      (s) => s.label.trim().length > 0 && s.value.trim().length > 0
    );

    try {
      await updateProduct(product.id, {
        name: name.trim(),
        image: image.trim(),
        gallery: fullGallery.length > 1 ? fullGallery : [image.trim()],
        price: numPrice,
        unit: unit.trim() || "kg",
        originCountry: originCountry.trim(),
        rating: Math.min(5, Math.max(1, numRating)),
        availableQuantity: numQty,
        minOrderQty: numMinQty,
        hsCode: hsCode.trim() || undefined,
        portOfLoading: portOfLoading.trim() || undefined,
        leadTime: leadTime.trim() || undefined,
        packaging: packaging.trim() || undefined,
        shelfLife: shelfLife.trim() || undefined,
        certifications: certifications.length > 0 ? certifications : undefined,
        specs: validSpecs.length > 0 ? validSpecs : undefined,
        description: description.trim(),
        category,
        exporterName: currentExporterName,
        exporterRating: Number(exporterRating) || 4.9,
        exporterShipments: Number(exporterShipments) || 0,
      });

      toast.success({
        title: "Export Listing Updated Successfully",
      });

      setTimeout(() => {
        if (isAdmin) {
          router.push(`/dashboard/products/${product.slug || slugify(name) || product.id}`);
        } else {
          router.push("/dashboard/exports");
        }
      }, 700);
    } catch (err: any) {
      toast.error({
        title: "Failed to Update Export",
        description: err?.message || "Please check your network and try again.",
      });
      setError(err?.message || "Failed to update product. Please try again.");
      setLoading(false);
    }
  }

  const userRole = (session?.user as { role?: string } | undefined)?.role;
  const isAdmin = userRole === "ADMIN";
  const currentUserId = session?.user?.id;
  const currentUserName = session?.user?.name?.toLowerCase().trim();
  const currentUserEmail = session?.user?.email?.toLowerCase().trim();

  const isOwner = Boolean(
    product && (
      (product.userId && currentUserId && product.userId === currentUserId) ||
      (product.exporterName && (
        (currentUserName && product.exporterName.toLowerCase().trim() === currentUserName) ||
        (currentUserEmail && product.exporterName.toLowerCase().trim() === currentUserEmail)
      ))
    )
  );

  const canEdit = isAdmin || isOwner;

  if (productsLoading || isFetching) {
    return (
      <div className={`${sansation.className} flex items-center justify-center py-24 text-center`}>
        <Loader text="Loading commodity data for editing..." />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className={`${sansation.className} flex flex-col items-center justify-center py-20 text-center gap-4`}>
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-foreground/10 bg-foreground/3">
          <ShieldAlert className="h-8 w-8 text-foreground/40" />
        </div>
        <div>
          <h2 className={`${pinkAverage.className} text-2xl text-foreground`}>
            Authentication Required
          </h2>
          <p className="text-xs text-foreground/50 mt-1">
            Please sign in with your account to edit export commodities.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setAuthOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary/20 cursor-pointer"
        >
          <span>Sign In to Continue</span>
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`${sansation.className} flex flex-col items-center justify-center py-20 text-center gap-4`}>
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-foreground/10 bg-foreground/3">
          <Package className="h-8 w-8 text-foreground/40" />
        </div>
        <div>
          <h2 className={`${pinkAverage.className} text-2xl text-foreground`}>
            Product Not Found
          </h2>
          <p className="text-xs text-foreground/50 mt-1">
            The commodity with identifier &ldquo;{resolvedParams.id}&rdquo; does not exist or has been removed.
          </p>
        </div>
        <Link
          href={isAdmin ? "/dashboard/products" : "/dashboard/exports"}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary/20"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{isAdmin ? "Back to All Products" : "Back to My Exports"}</span>
        </Link>
      </div>
    );
  }

  if (!canEdit) {
    return (
      <div className={`${sansation.className} flex flex-col items-center justify-center py-20 text-center gap-4`}>
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-red-500/20 bg-red-500/10 text-red-500">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <div>
          <h2 className={`${pinkAverage.className} text-2xl text-foreground`}>
            Access Restricted
          </h2>
          <p className="text-xs text-foreground/50 mt-1 max-w-md">
            You can only edit export commodities that you uploaded. Platform administrators have permission to edit all commodities.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/exports"
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary/20"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to My Exports</span>
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-xl border border-foreground/15 bg-background px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-foreground/5"
          >
            <span>Dashboard Overview</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${sansation.className} flex flex-col w-full pb-12`}>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

      {/* Main Grid: Left Side = Sticky ProductCard Showcase Preview, Right Side = Form Input Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-1">
        
        {/* LEFT SIDE: Sticky Showcase Preview using exact ProductCard (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-4 flex flex-col gap-3 self-start order-2 lg:order-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground/60 px-1">
            <Eye className="h-4 w-4 text-primary" /> Live Marketplace Showcase Preview
          </div>

          <div className="w-full max-w-sm mx-auto lg:max-w-none">
            <ProductCard product={previewProduct} />
          </div>
        </div>

        {/* RIGHT SIDE: Form Inputs (7 cols) */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-3xl border border-foreground/10 bg-foreground/2 p-6 sm:p-7 inset-shadow-foreground/30 inset-shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
              <div>
                <h2 className={`${pinkAverage.className} text-2xl text-foreground`}>
                  Edit Export Commodity
                </h2>
                <p className="text-xs text-foreground/50">
                  Update specifications, trade pricing, stock, and compliance credentials.
                </p>
              </div>
              <span className="rounded-lg bg-foreground/5 px-2.5 py-1 text-[11px] font-semibold text-foreground/60 border border-foreground/10">
                SKU: {product.id.slice(-8).toUpperCase()}
              </span>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-500 font-semibold">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Section 1: Basic Info */}
            <div className="flex flex-col gap-4">
              <h3 className={`${pinkAverage.className} text-lg text-foreground border-b border-foreground/10 pb-2`}>
                1. Commodity Identification
              </h3>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                  Commodity Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Single-Origin Colombian Arabica Coffee Beans"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 w-full rounded-2xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                    Category *
                  </label>
                  <Dropdown
                    options={categoryOptions}
                    value={category}
                    onChange={(val) => setCategory(val)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                    Origin Country *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Colombia, Bangladesh, Ethiopia"
                    value={originCountry}
                    onChange={(e) => setOriginCountry(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                  Primary High-Resolution Image URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="h-11 w-full rounded-2xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                  Additional Gallery Images (Optional, one URL per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="https://image-url-2.jpg&#10;https://image-url-3.jpg"
                  value={galleryInput}
                  onChange={(e) => setGalleryInput(e.target.value)}
                  className="w-full rounded-2xl border border-foreground/15 bg-background p-3 text-xs text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none font-mono resize-none"
                />
              </div>
            </div>

            {/* Section 2: Pricing & Inventory */}
            <div className="flex flex-col gap-4 pt-2">
              <h3 className={`${pinkAverage.className} text-lg text-foreground border-b border-foreground/10 pb-2`}>
                2. Pricing, Stock & Allocation
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                    Export Unit Price (৳) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 2950"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                    Unit of Measurement
                  </label>
                  <input
                    type="text"
                    placeholder="kg, meters, tons, bags, units"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                    Available Stock *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 5000"
                    value={availableQuantity}
                    onChange={(e) => setAvailableQuantity(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                    Minimum Order Quantity (MOQ)
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 10"
                    value={minOrderQty}
                    onChange={(e) => setMinOrderQty(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                    Initial Commodity Rating (1.0 - 5.0)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    placeholder="e.g. 5.0"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Exporter Identity */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-center justify-between border-b border-foreground/10 pb-2">
                <h3 className={`${pinkAverage.className} text-lg text-foreground`}>
                  3. Exporter Profile & Credentials
                </h3>
                <span className="text-[10px] uppercase font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> Auto-Attributed to Your Account
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                  Exporter Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    disabled
                    value={currentExporterName}
                    className="h-11 w-full rounded-2xl border border-foreground/15 bg-foreground/5 px-3.5 text-xs text-foreground font-semibold cursor-not-allowed opacity-85"
                  />
                  <span className="absolute right-3 top-3 text-[10px] font-bold text-primary">
                    Signed In
                  </span>
                </div>
                <p className="text-[10px] text-foreground/45 mt-1">
                  This listing will be published under your authenticated exporter account: <span className="font-semibold text-foreground/70">{currentExporterName}</span>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                    Exporter Rating (Score out of 5.0)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="1"
                    max="5"
                    placeholder="e.g. 4.95"
                    value={exporterRating}
                    onChange={(e) => setExporterRating(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                    Export Shipments Count
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 14"
                    value={exporterShipments}
                    onChange={(e) => setExporterShipments(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Trade, Customs & Logistics */}
            <div className="flex flex-col gap-4 pt-2">
              <h3 className={`${pinkAverage.className} text-lg text-foreground border-b border-foreground/10 pb-2`}>
                4. Trade & Logistics Specifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                    HS Tariff Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 0901.11.00"
                    value={hsCode}
                    onChange={(e) => setHsCode(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                    Port of Loading
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chittagong Seaport, Port of Buenaventura"
                    value={portOfLoading}
                    onChange={(e) => setPortOfLoading(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                    Estimated Lead Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5 - 10 business days"
                    value={leadTime}
                    onChange={(e) => setLeadTime(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                    Packaging Specification
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. GrainPro hermetic export bags"
                    value={packaging}
                    onChange={(e) => setPackaging(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                    Guaranteed Shelf Life
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 24 Months"
                    value={shelfLife}
                    onChange={(e) => setShelfLife(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
                  Detailed Commodity Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Detailed description of harvest provenance, grading, moisture levels, cupping or textile weave specifications..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-2xl border border-foreground/15 bg-background p-3.5 text-xs text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Section 5: Certifications & Standards */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-center justify-between border-b border-foreground/10 pb-2">
                <h3 className={`${pinkAverage.className} text-lg text-foreground`}>
                  5. Quality Certifications & Accreditations
                </h3>
                <span className="text-[11px] text-foreground/50">
                  {certifications.length} standard{certifications.length === 1 ? "" : "s"} selected
                </span>
              </div>

              {/* 5 Saved Preset Certifications */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                  Choose from 5 Saved Industry Standards:
                </span>
                <div className="flex flex-wrap gap-2">
                  {SAVED_CERTIFICATIONS.map((preset) => {
                    const isSelected = certifications.includes(preset);
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setCertifications(certifications.filter((c) => c !== preset));
                          } else {
                            setCertifications([...certifications, preset]);
                          }
                        }}
                        className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "border-primary bg-primary/15 text-primary shadow-xs font-bold"
                            : "border-foreground/15 bg-background text-foreground/75 hover:bg-foreground/5 hover:border-foreground/25"
                        }`}
                      >
                        {isSelected ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        ) : (
                          <Plus className="h-3.5 w-3.5 text-foreground/40 shrink-0" />
                        )}
                        <span>{preset}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Certification Input */}
              <div className="flex flex-col gap-1.5 pt-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70">
                  Or Add Custom Certification:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Bangladesh Tea Board Certificate, Halal Compliance"
                    value={newCertInput}
                    onChange={(e) => setNewCertInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCert();
                      }
                    }}
                    className="h-10 flex-1 rounded-xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addCert}
                    className="flex items-center gap-1 h-10 px-4 rounded-xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 text-xs font-bold text-foreground transition-all cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Custom</span>
                  </button>
                </div>
              </div>

              {/* Active Selected Certifications List */}
              {certifications.length > 0 && (
                <div className="flex flex-col gap-2 pt-2 border-t border-foreground/8">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-foreground/50">
                    Active Commodity Certifications ({certifications.length}):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {certifications.map((c, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 rounded-xl border border-primary/25 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-foreground"
                      >
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>{c}</span>
                        <button
                          type="button"
                          onClick={() => removeCert(c)}
                          className="text-foreground/40 hover:text-red-500 ml-1 cursor-pointer"
                          title="Remove certification"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Section 6: Technical Specifications (Key-Value) */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-center justify-between border-b border-foreground/10 pb-2">
                <h3 className={`${pinkAverage.className} text-lg text-foreground`}>
                  6. Technical Specifications Matrix
                </h3>
                <button
                  type="button"
                  onClick={addSpecRow}
                  className="flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Row
                </button>
              </div>

              <div className="flex flex-col gap-2.5">
                {specs.map((row, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Parameter (e.g. Moisture Content)"
                      value={row.label}
                      onChange={(e) => updateSpecRow(idx, "label", e.target.value)}
                      className="h-10 flex-1 rounded-xl border border-foreground/15 bg-background px-3 text-xs text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. < 11.5%)"
                      value={row.value}
                      onChange={(e) => updateSpecRow(idx, "value", e.target.value)}
                      className="h-10 flex-1 rounded-xl border border-foreground/15 bg-background px-3 text-xs text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeSpecRow(idx)}
                      className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl text-foreground/40 hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-foreground/10 flex items-center justify-between">
              <Link
                href={isAdmin ? `/dashboard/products/${product.slug || slugify(product.name) || product.id}` : "/dashboard/exports"}
                className="rounded-xl border border-foreground/15 bg-background px-4 py-2.5 text-xs font-semibold text-foreground/70 hover:bg-foreground/5 hover:text-foreground transition-all"
              >
                Cancel
              </Link>

              <Button
                variant="primary"
                size="md"
                type="submit"
                disabled={loading}
                className="px-6 text-white shadow-lg shadow-primary/25"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>{loading ? "Saving Changes..." : "Save Commodity Updates"}</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
