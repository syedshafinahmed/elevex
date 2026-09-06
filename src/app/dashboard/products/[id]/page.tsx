"use client";

import { use, useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Star,
  Edit2,
  Trash2,
  ExternalLink,
  Package,
  Boxes,
  TrendingUp,
  Clock,
  CheckCircle2,
  X,
  Globe,
  ShieldCheck,
  BadgeCheck,
  Layers,
  Anchor,
  FileText,
  Info,
  Maximize2,
  ChevronRight,
  Download,
  AlertCircle,
  Building,
  Plus,
  Minus,
  Sparkles,
  Sliders,
  DollarSign,
  Truck,
  FileCheck,
  Lock,
} from "lucide-react";
import { pinkAverage, sansation, trunkey } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/lib/productsData";
import DeleteConfirmModal from "@/app/components/dashboard/DeleteConfirmModal";
import Dropdown, { DropdownOption } from "@/app/components/dashboard/Dropdown";
import Button from "@/app/components/ui/Button";
import { toast } from "gooey-toast";
import { Sprout, Shirt, Utensils, Gem } from "lucide-react";

const categoryOptions: DropdownOption[] = [
  { value: "Agricultural", label: "Agricultural", description: "Crops, grains, raw materials", icon: Sprout },
  { value: "Textile", label: "Textile", description: "Fabrics, garments, fibers", icon: Shirt },
  { value: "Food", label: "Food", description: "Processed food & spices", icon: Utensils },
  { value: "Minerals", label: "Minerals", description: "Ores, metals, building stones", icon: Gem },
];

interface AdminProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function AdminProductDetailsPage({ params }: AdminProductDetailsPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { products, updateProduct, deleteProduct } = useProducts();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const product = products.find((p) => p.id === resolvedParams.id) || products[0];

  // Gallery & Lightbox
  const gallery = useMemo(() => {
    if (!product) return [];
    if (product.gallery && product.gallery.length > 0) {
      return product.gallery;
    }
    return [product.image];
  }, [product]);

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Form edit states
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editGallery, setEditGallery] = useState("");
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editUnit, setEditUnit] = useState("kg");
  const [editOrigin, setEditOrigin] = useState("");
  const [editRating, setEditRating] = useState<number>(5);
  const [editQuantity, setEditQuantity] = useState<number>(0);
  const [editCategory, setEditCategory] = useState("Agricultural");
  const [editDescription, setEditDescription] = useState("");
  const [editHsCode, setEditHsCode] = useState("");
  const [editPort, setEditPort] = useState("");
  const [editLeadTime, setEditLeadTime] = useState("");
  const [editPackaging, setEditPackaging] = useState("");
  const [editShelfLife, setEditShelfLife] = useState("");
  const [editMinOrderQty, setEditMinOrderQty] = useState<number>(1);
  const [editCertifications, setEditCertifications] = useState<string[]>([]);
  const [editNewCert, setEditNewCert] = useState("");
  const [editSpecs, setEditSpecs] = useState<{ label: string; value: string }[]>([]);

  // Quick Stock Adjustment in Admin console
  const [stockDelta, setStockDelta] = useState<number>(100);

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
            The commodity with ID &ldquo;{resolvedParams.id}&rdquo; does not exist or has been removed.
          </p>
        </div>
        <Link
          href="/dashboard/products"
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary/20"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Products</span>
        </Link>
      </div>
    );
  }

  const unit = product.unit || "kg";
  const minOrder = product.minOrderQty || 1;
  const maxStock = product.availableQuantity;
  const totalValuation = product.price * product.availableQuantity;
  const portHandlingDutyEst = Math.round(totalValuation * 0.025);
  const totalLandedCost = totalValuation + portHandlingDutyEst;

  const openEditModal = () => {
    setEditName(product.name);
    setEditImage(product.image);
    setEditGallery(product.gallery ? product.gallery.join("\n") : "");
    setEditPrice(product.price);
    setEditUnit(product.unit || "kg");
    setEditOrigin(product.originCountry);
    setEditRating(product.rating);
    setEditQuantity(product.availableQuantity);
    setEditCategory(product.category || "Agricultural");
    setEditDescription(product.description || "");
    setEditHsCode(product.hsCode || "");
    setEditPort(product.portOfLoading || "");
    setEditLeadTime(product.leadTime || "");
    setEditPackaging(product.packaging || "");
    setEditShelfLife(product.shelfLife || "");
    setEditMinOrderQty(product.minOrderQty || 1);
    setEditCertifications(
      product.certifications || [
        "ISO 22000 Food Safety Standard",
        "USDA Organic Certified",
        "Phytosanitary Ministry Release",
        "Fair Trade International",
      ]
    );
    setEditSpecs(
      product.specs || [
        { label: "Moisture Content", value: "< 11.5%" },
        { label: "Processing Method", value: "Fully Washed & Sun Dried" },
        { label: "Purity Grade", value: "Grade 1 (99.8% purity)" },
      ]
    );
    setIsEditModalOpen(true);
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim() || !editImage.trim() || editPrice <= 0 || editQuantity <= 0) {
      toast.error({ title: "Please fill in all required fields." });
      return;
    }

    const extraGallery = editGallery
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => u.length > 0);

    const validSpecs = editSpecs.filter(
      (s) => s.label.trim().length > 0 && s.value.trim().length > 0
    );

    updateProduct(product.id, {
      name: editName.trim(),
      image: editImage.trim(),
      gallery: extraGallery.length > 0 ? [editImage.trim(), ...extraGallery] : [editImage.trim()],
      price: editPrice,
      unit: editUnit.trim() || "kg",
      originCountry: editOrigin.trim(),
      rating: editRating,
      availableQuantity: editQuantity,
      category: editCategory,
      description: editDescription.trim(),
      hsCode: editHsCode.trim() || undefined,
      portOfLoading: editPort.trim() || undefined,
      leadTime: editLeadTime.trim() || undefined,
      packaging: editPackaging.trim() || undefined,
      shelfLife: editShelfLife.trim() || undefined,
      minOrderQty: editMinOrderQty,
      certifications: editCertifications,
      specs: validSpecs,
    });

    setIsEditModalOpen(false);
    toast.success({ title: "Export Listing Updated Successfully" });
  };

  const handleQuickStockChange = (amount: number) => {
    const newQty = Math.max(0, product.availableQuantity + amount);
    updateProduct(product.id, { availableQuantity: newQty });
    toast.success({
      title: amount > 0 ? `Added ${amount} ${unit} to stock` : `Deducted ${Math.abs(amount)} ${unit} from stock`,
    });
  };

  const handleDelete = () => {
    deleteProduct(product.id);
    setIsDeleteModalOpen(false);
    toast.success({ title: "Product Deleted Successfully" });
    router.push("/dashboard/products");
  };

  // Cert editing helpers
  const handleAddCertToModal = () => {
    if (!editNewCert.trim()) return;
    if (!editCertifications.includes(editNewCert.trim())) {
      setEditCertifications([...editCertifications, editNewCert.trim()]);
    }
    setEditNewCert("");
  };

  const handleRemoveCertFromModal = (cert: string) => {
    setEditCertifications(editCertifications.filter((c) => c !== cert));
  };

  // Spec editing helpers
  const handleAddSpecToModal = () => {
    setEditSpecs([...editSpecs, { label: "", value: "" }]);
  };

  const handleRemoveSpecFromModal = (index: number) => {
    setEditSpecs(editSpecs.filter((_, i) => i !== index));
  };

  const handleUpdateSpecInModal = (index: number, field: "label" | "value", val: string) => {
    const updated = [...editSpecs];
    updated[index][field] = val;
    setEditSpecs(updated);
  };

  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12 w-full`}>
      {/* 1. Header Navigation & Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-foreground/10">
        <div className="flex flex-col gap-1.5">
          <nav className="flex items-center gap-1.5 text-xs text-foreground/60">
            <Link href="/dashboard" className="hover:text-primary transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-foreground/30 shrink-0" />
            <Link href="/dashboard/products" className="hover:text-primary transition-colors">
              Products
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-foreground/30 shrink-0" />
            <span className="font-bold text-foreground truncate max-w-[200px] sm:max-w-xs">
              {product.name}
            </span>
          </nav>

          <div className="flex items-center gap-3 flex-wrap">
            <h1 className={`${pinkAverage.className} text-2xl sm:text-3xl text-foreground`}>
              Commodity SKU Console
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active in Marketplace
            </span>
            <span className="rounded-lg bg-foreground/5 px-2.5 py-0.5 text-[11px] font-semibold text-foreground/60 border border-foreground/10">
              SKU: {product.id.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href={`/products/${product.id}`}
            target="_blank"
            className="flex items-center gap-1.5 rounded-xl border border-foreground/15 bg-background px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-foreground/5 transition-all shadow-xs"
          >
            <ExternalLink className="h-3.5 w-3.5 text-primary" />
            <span>Buyer View</span>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={openEditModal}
            className="flex items-center gap-1.5"
          >
            <Edit2 className="h-3.5 w-3.5" />
            <span>Edit Commodity</span>
          </Button>

          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 px-3.5 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* 2. Top Executive Metric Cards (4 KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Lot Valuation */}
        <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/30 inset-shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-foreground/60 mb-2">
            <span className="text-[11px] uppercase font-bold tracking-wider">Lot Valuation</span>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </div>
          <div>
            <div className={`${pinkAverage.className} text-2xl font-bold text-foreground`}>
              ৳ {totalValuation.toLocaleString()}
            </div>
            <p className="text-[11px] text-foreground/50 mt-0.5">
              ৳ {product.price.toLocaleString()} per {unit}
            </p>
          </div>
        </div>

        {/* Metric 2: Available Stock Allocation */}
        <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/30 inset-shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-foreground/60 mb-2">
            <span className="text-[11px] uppercase font-bold tracking-wider">Inventory Stock</span>
            <Boxes className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className={`${pinkAverage.className} text-2xl font-bold text-foreground`}>
              {product.availableQuantity.toLocaleString()}{" "}
              <span className="text-sm font-normal text-foreground/60">{unit}</span>
            </div>
            <p className="text-[11px] text-foreground/50 mt-0.5">
              Min Order (MOQ): {product.minOrderQty || 1} {unit}
            </p>
          </div>
        </div>

        {/* Metric 3: Quality & Assurance Score */}
        <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/30 inset-shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-foreground/60 mb-2">
            <span className="text-[11px] uppercase font-bold tracking-wider">Trade Score</span>
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`${pinkAverage.className} text-2xl font-bold text-foreground`}>
                {product.rating}
              </span>
              <span className="text-xs text-foreground/50">/ 5.0</span>
            </div>
            <p className="text-[11px] text-emerald-500 font-semibold mt-0.5">
              Tier 1 Export Quality
            </p>
          </div>
        </div>

        {/* Metric 4: Logistics & Escrow Clearance */}
        <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/30 inset-shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-foreground/60 mb-2">
            <span className="text-[11px] uppercase font-bold tracking-wider">Escrow Security</span>
            <ShieldCheck className="h-4 w-4 text-blue-500" />
          </div>
          <div>
            <div className={`${pinkAverage.className} text-2xl font-bold text-blue-500`}>
              100% Protected
            </div>
            <p className="text-[11px] text-foreground/50 mt-0.5">
              Port: {product.portOfLoading || "Origin Port"}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Main Console Layout: Left (8 cols) Detailed Data, Right (4 cols) Inventory Controls & Manifest */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Media & Detailed Specs (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Card A: Commodity Hero Visual & Gallery Assets */}
          <div className="rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/30 inset-shadow-sm flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
              <div>
                <h3 className={`${pinkAverage.className} text-xl text-foreground`}>
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-foreground/60">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-primary" /> {product.originCountry}
                  </span>
                  <span>•</span>
                  <span className="rounded-md bg-foreground/5 px-2 py-0.5 text-[10px] font-semibold text-foreground/70 uppercase">
                    {product.category || "Commodity"}
                  </span>
                  <span>•</span>
                  <span>Created {new Date(product.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Main Visual Display */}
            <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-foreground/5 border border-foreground/10 group">
              <Image
                src={gallery[activeImgIndex] || product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-xl bg-black/60 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white hover:bg-black/80 transition-colors cursor-pointer"
              >
                <Maximize2 className="h-3.5 w-3.5" /> Fullscreen View
              </button>
            </div>

            {/* Thumbnails if multiple images exist */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                      activeImgIndex === idx
                        ? "border-primary shadow-md"
                        : "border-foreground/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={imgUrl} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Detailed Commercial Description (Exact paragraphs from details page) */}
            <div className="pt-2 border-t border-foreground/8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/60 mb-2">
                Commercial Description & Provenance
              </h4>
              <div className={`${sansation.className} flex flex-col gap-2.5 text-foreground/80 text-xs sm:text-sm leading-relaxed text-justify font-extralight`}>
                <p className="first-letter:text-xl sm:first-letter:text-2xl first-letter:font-bold first-letter:mr-0.5">
                  {product.description}
                </p>
                <p>
                  Harvested and processed under certified commercial export standards in {product.originCountry}, this lot is curated specifically for high-volume cross-border trade. Each consignment is subjected to comprehensive quality grading, ensuring optimal purity, moisture stabilization, and full conformity with global import and phytosanitary regulations.
                </p>
                <p>
                  Shipped in {product.packaging || "export-grade hermetic protective packaging"} with an estimated export dispatch window of {product.leadTime || "7 - 14 business days"}{product.portOfLoading ? ` through ${product.portOfLoading}` : ""}. Fully secured under the Elevex 100% Escrow Guarantee, with smart contract settlement released only upon SGS lot verification and port inspection.
                </p>
              </div>
            </div>

            {/* Quality & Origin Highlights + Trade Terms & Handover */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-foreground/8">
              <div className="rounded-2xl border border-foreground/10 bg-background/50 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                  Quality & Origin Highlights
                </h4>
                <ul className="flex flex-col gap-2 text-xs text-foreground/75">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Single-origin sourcing from certified agricultural cooperatives</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Strict phytosanitary and export-grade moisture control standards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Pre-shipment batch chemical and purity assay documentation</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-foreground/10 bg-background/50 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                  Trade Terms & Handover
                </h4>
                <ul className="flex flex-col gap-2 text-xs text-foreground/75">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Incoterms: FOB / CIF options supported on request</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Electronic Bill of Lading (eBL) transfer upon customs clearance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Full container load (FCL) & less than container load (LCL) enabled</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card B: Technical Specifications Matrix */}
          <div className="rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/30 inset-shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" />
                <h3 className={`${pinkAverage.className} text-xl text-foreground`}>
                  Technical Specifications & Quality Parameters
                </h3>
              </div>
              <span className="text-[11px] text-foreground/50">Laboratory Assayed</span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-foreground/10">
              <table className="w-full text-left text-xs">
                <tbody className="divide-y divide-foreground/8">
                  {(
                    product.specs || [
                      { label: "Moisture Content", value: "< 11.5%" },
                      { label: "Processing Method", value: "Fully Washed & Sun Dried" },
                      { label: "Purity Grade", value: "Grade 1 (99.8% purity)" },
                      { label: "Harvest Season", value: "Current 2026/2027" },
                    ]
                  ).map((item, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-foreground/2" : "bg-background"}
                    >
                      <td className="px-4 py-3 font-semibold text-foreground/60 w-1/3">
                        {item.label}
                      </td>
                      <td className="px-4 py-3 font-bold text-foreground">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card C: Certifications & Standards Ledger */}
          <div className="rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/30 inset-shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
              <div className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-emerald-500" />
                <h3 className={`${pinkAverage.className} text-xl text-foreground`}>
                  Trade Accreditations & Phytosanitary Status
                </h3>
              </div>
              <span className="text-[11px] text-emerald-500 font-bold">Active & Verified</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(
                product.certifications || [
                  "ISO 22000 Food Safety Standard",
                  "USDA Organic Certified",
                  "Phytosanitary Ministry Release",
                  "Fair Trade International",
                ]
              ).map((cert, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-2xl border border-foreground/10 bg-background/50 p-3.5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-foreground">{cert}</h5>
                    <p className="text-[10px] text-foreground/50 mt-0.5">
                      Valid for current export season. Certified digital copy on escrow allocation.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Inventory Controls, Customs, Pricing & Shipping Manifest (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">

          {/* Card 1: Quick Inventory Control Terminal */}
          <div className="rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/30 inset-shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-foreground/10 pb-2">
              <div className="flex items-center gap-1.5">
                <Sliders className="h-4 w-4 text-primary" />
                <h3 className={`${pinkAverage.className} text-lg text-foreground`}>
                  Stock Adjuster
                </h3>
              </div>
              <span className="text-xs font-bold text-primary">
                {product.availableQuantity.toLocaleString()} {unit}
              </span>
            </div>

            <p className="text-xs text-foreground/60 leading-relaxed">
              Instantly adjust live stock available for international buyers in the Elevex global marketplace.
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleQuickStockChange(-stockDelta)}
                disabled={product.availableQuantity <= 0}
                className="flex-1 flex items-center justify-center gap-1 h-10 rounded-xl border border-foreground/15 bg-background text-xs font-bold text-foreground hover:bg-foreground/5 disabled:opacity-40 transition-all cursor-pointer"
              >
                <Minus className="h-3.5 w-3.5 text-red-500" />
                <span>-{stockDelta} {unit}</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickStockChange(stockDelta)}
                className="flex-1 flex items-center justify-center gap-1 h-10 rounded-xl border border-foreground/15 bg-background text-xs font-bold text-foreground hover:bg-foreground/5 transition-all cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5 text-emerald-500" />
                <span>+{stockDelta} {unit}</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-foreground/8 text-xs text-foreground/60">
              <span>Step size:</span>
              <div className="flex items-center gap-1">
                {[50, 100, 500].map((step) => (
                  <button
                    key={step}
                    type="button"
                    onClick={() => setStockDelta(step)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-colors ${
                      stockDelta === step
                        ? "bg-primary text-white"
                        : "bg-foreground/5 text-foreground/70 hover:bg-foreground/10"
                    }`}
                  >
                    {step}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Financial Landed Cost Valuation Breakdown */}
          <div className="rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/30 inset-shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-foreground/10 pb-2">
              <DollarSign className="h-4 w-4 text-emerald-500" />
              <h3 className={`${pinkAverage.className} text-lg text-foreground`}>
                Consignment Valuation & Landed Cost
              </h3>
            </div>

            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between text-foreground/60">
                <span>Total Lot Units:</span>
                <span className="font-semibold text-foreground">
                  {product.availableQuantity.toLocaleString()} {unit}
                </span>
              </div>

              <div className="flex justify-between text-foreground/60">
                <span>Unit Export Price:</span>
                <span className="font-semibold text-foreground">
                  ৳ {product.price.toLocaleString()} / {unit}
                </span>
              </div>

              <div className="flex justify-between text-foreground/60">
                <span>Total Consignment Value:</span>
                <span className="font-semibold text-foreground">
                  ৳ {totalValuation.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-foreground/60">
                <span className="flex items-center gap-1">
                  <span>Port Clearance & Duty (2.5%):</span>
                  <Info className="h-3 w-3 text-foreground/40" />
                </span>
                <span className="font-semibold text-foreground">
                  ৳ {portHandlingDutyEst.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-foreground/60">
                <span>Verified Escrow Protection:</span>
                <span className="font-bold text-emerald-500">FREE (Elevex Covered)</span>
              </div>

              <div className="flex justify-between border-t border-foreground/10 pt-2.5 mt-1 text-sm font-bold text-foreground">
                <span>Full Landed Valuation:</span>
                <span className={`${pinkAverage.className} text-xl font-bold text-primary`}>
                  ৳ {totalLandedCost.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Logistics & Customs Freight Matrix */}
          <div className="rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/30 inset-shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-foreground/10 pb-2">
              <Truck className="h-4 w-4 text-primary" />
              <h3 className={`${pinkAverage.className} text-lg text-foreground`}>
                Trade & Shipping Manifest
              </h3>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div className="rounded-2xl border border-foreground/10 bg-background/50 p-3 flex flex-col gap-1">
                <span className="text-[10px] uppercase font-semibold text-foreground/45">
                  HS Classification Code
                </span>
                <span className="font-mono font-bold text-foreground text-sm">
                  {product.hsCode || "0901.11.00"}
                </span>
              </div>

              <div className="rounded-2xl border border-foreground/10 bg-background/50 p-3 flex flex-col gap-1">
                <span className="text-[10px] uppercase font-semibold text-foreground/45">
                  Port of Loading
                </span>
                <span className="font-bold text-foreground text-sm">
                  {product.portOfLoading || "Origin International Seaport"}
                </span>
              </div>

              <div className="rounded-2xl border border-foreground/10 bg-background/50 p-3 flex flex-col gap-1">
                <span className="text-[10px] uppercase font-semibold text-foreground/45">
                  Export Packaging
                </span>
                <span className="font-bold text-foreground text-xs leading-snug">
                  {product.packaging || "Export standard hermetic seaworthy packaging"}
                </span>
              </div>

              <div className="rounded-2xl border border-foreground/10 bg-background/50 p-3 flex flex-col gap-1">
                <span className="text-[10px] uppercase font-semibold text-foreground/45">
                  Estimated Lead Time
                </span>
                <span className="font-bold text-foreground text-xs">
                  {product.leadTime || "5 - 10 Business Days"}
                </span>
              </div>

              <div className="rounded-2xl border border-foreground/10 bg-background/50 p-3 flex flex-col gap-1">
                <span className="text-[10px] uppercase font-semibold text-foreground/45">
                  Guaranteed Shelf Life
                </span>
                <span className="font-bold text-foreground text-xs">
                  {product.shelfLife || "24 Months"}
                </span>
              </div>

              <div className="rounded-2xl border border-foreground/10 bg-background/50 p-3 flex flex-col gap-1">
                <span className="text-[10px] uppercase font-semibold text-foreground/45">
                  Minimum Order Threshold (MOQ)
                </span>
                <span className="font-bold text-foreground text-xs">
                  {minOrder} {unit}
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Escrow & Settlement Guarantee */}
          <div className="rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/30 inset-shadow-sm flex flex-col gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0" />
              <h4 className="font-bold text-foreground">Elevex Guaranteed Escrow</h4>
            </div>
            <p className="text-foreground/70 leading-relaxed text-[11px]">
              Every buyer order for this commodity is backed 100% in digital collateral. Funds are released automatically into your exporter settlement wallet upon electronic BoL confirmation.
            </p>
          </div>

        </div>

      </div>

      {/* 4. Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="relative h-[80vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={gallery[activeImgIndex] || product.image}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* 5. Delete Confirm Modal */}
      {isDeleteModalOpen && mounted && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          itemName={product.name}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}

      {/* 6. Comprehensive Edit Modal */}
      {isEditModalOpen && mounted && typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-foreground/15 bg-background p-6 sm:p-8 shadow-2xl flex flex-col gap-6">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
                <div>
                  <h3 className={`${pinkAverage.className} text-2xl text-foreground`}>
                    Edit Commodity Listing
                  </h3>
                  <p className="text-xs text-foreground/50 mt-0.5">
                    Update technical data, pricing, stock, certifications, and shipping specifications.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-full p-2 text-foreground/40 hover:bg-foreground/5 hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Edit Form */}
              <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-4">
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1">
                    Commodity Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1">
                      Category *
                    </label>
                    <Dropdown
                      options={categoryOptions}
                      value={editCategory}
                      onChange={(val) => setEditCategory(val)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1">
                      Origin Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={editOrigin}
                      onChange={(e) => setEditOrigin(e.target.value)}
                      className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1">
                    Primary Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={editImage}
                    onChange={(e) => setEditImage(e.target.value)}
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1">
                    Additional Gallery Images (one per line)
                  </label>
                  <textarea
                    rows={2}
                    value={editGallery}
                    onChange={(e) => setEditGallery(e.target.value)}
                    className="w-full rounded-xl border border-foreground/15 bg-background p-2.5 text-xs text-foreground font-mono focus:border-primary focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1">
                      Export Unit Price (৳) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={editPrice}
                      onChange={(e) => setEditPrice(Number(e.target.value))}
                      className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1">
                      Unit of Measurement
                    </label>
                    <input
                      type="text"
                      value={editUnit}
                      onChange={(e) => setEditUnit(e.target.value)}
                      className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1">
                      Available Stock *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={editQuantity}
                      onChange={(e) => setEditQuantity(Number(e.target.value))}
                      className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1">
                      Minimum Order (MOQ)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={editMinOrderQty}
                      onChange={(e) => setEditMinOrderQty(Number(e.target.value))}
                      className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1">
                      HS Tariff Code
                    </label>
                    <input
                      type="text"
                      value={editHsCode}
                      onChange={(e) => setEditHsCode(e.target.value)}
                      className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3.5 text-xs font-mono text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1">
                      Port of Loading
                    </label>
                    <input
                      type="text"
                      value={editPort}
                      onChange={(e) => setEditPort(e.target.value)}
                      className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1">
                      Estimated Lead Time
                    </label>
                    <input
                      type="text"
                      value={editLeadTime}
                      onChange={(e) => setEditLeadTime(e.target.value)}
                      className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1">
                      Packaging Specification
                    </label>
                    <input
                      type="text"
                      value={editPackaging}
                      onChange={(e) => setEditPackaging(e.target.value)}
                      className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1">
                    Guaranteed Shelf Life
                  </label>
                  <input
                    type="text"
                    value={editShelfLife}
                    onChange={(e) => setEditShelfLife(e.target.value)}
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1">
                    Commodity Description
                  </label>
                  <textarea
                    rows={3}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full rounded-xl border border-foreground/15 bg-background p-3 text-xs text-foreground focus:border-primary focus:outline-none resize-none"
                  />
                </div>

                {/* Edit Certifications Section */}
                <div className="flex flex-col gap-2 pt-2 border-t border-foreground/10">
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70">
                    Certifications & Accreditations
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add certification..."
                      value={editNewCert}
                      onChange={(e) => setEditNewCert(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddCertToModal();
                        }
                      }}
                      className="h-9 flex-1 rounded-xl border border-foreground/15 bg-background px-3 text-xs text-foreground focus:border-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddCertToModal}
                      className="h-9 px-3 rounded-xl bg-foreground/5 hover:bg-foreground/10 text-xs font-bold text-foreground cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                  {editCertifications.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {editCertifications.map((c, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        >
                          <ShieldCheck className="h-3 w-3" />
                          {c}
                          <button
                            type="button"
                            onClick={() => handleRemoveCertFromModal(c)}
                            className="ml-1 text-foreground/40 hover:text-red-500 cursor-pointer"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Edit Technical Specs Section */}
                <div className="flex flex-col gap-2 pt-2 border-t border-foreground/10">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70">
                      Technical Specifications Matrix
                    </label>
                    <button
                      type="button"
                      onClick={handleAddSpecToModal}
                      className="text-xs font-bold text-primary hover:underline cursor-pointer"
                    >
                      + Add Row
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {editSpecs.map((row, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Spec Name"
                          value={row.label}
                          onChange={(e) => handleUpdateSpecInModal(idx, "label", e.target.value)}
                          className="h-9 flex-1 rounded-xl border border-foreground/15 bg-background px-3 text-xs text-foreground focus:border-primary focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Value"
                          value={row.value}
                          onChange={(e) => handleUpdateSpecInModal(idx, "value", e.target.value)}
                          className="h-9 flex-1 rounded-xl border border-foreground/15 bg-background px-3 text-xs text-foreground focus:border-primary focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSpecFromModal(idx)}
                          className="h-9 w-9 flex items-center justify-center rounded-xl text-foreground/40 hover:text-red-500 hover:bg-red-500/10 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-foreground/10">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="rounded-xl border border-foreground/15 px-4 py-2.5 text-xs font-semibold text-foreground/70 hover:bg-foreground/5 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <Button variant="primary" size="md" type="submit" className="px-5 text-white">
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
