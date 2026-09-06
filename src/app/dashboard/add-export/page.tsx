"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  Image as ImageIcon,
  Sprout,
  Shirt,
  Utensils,
  Gem,
  ChevronRight,
  Eye,
  Plus,
  Trash2,
  ShieldCheck,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/lib/productsData";
import ProductCard from "@/app/components/products/ProductCard";
import Dropdown, { DropdownOption } from "@/app/components/dashboard/Dropdown";
import Button from "@/app/components/ui/Button";
import AuthModal from "@/app/components/auth/AuthModal";
import { toast } from "gooey-toast";

const categoryOptions: DropdownOption[] = [
  { value: "Agricultural", label: "Agricultural", description: "Crops, grains, raw materials", icon: Sprout },
  { value: "Textile", label: "Textile", description: "Fabrics, garments, fibers", icon: Shirt },
  { value: "Food", label: "Food", description: "Processed food & spices", icon: Utensils },
  { value: "Minerals", label: "Minerals", description: "Ores, metals, building stones", icon: Gem },
];

export default function AddExportPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [authOpen, setAuthOpen] = useState(false);
  const { addProduct } = useProducts();

  // Basic Details
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [galleryInput, setGalleryInput] = useState("");
  const [price, setPrice] = useState<string>("2950");
  const [unit, setUnit] = useState<string>("kg");
  const [originCountry, setOriginCountry] = useState("Colombia");
  const [rating, setRating] = useState<string>("4.9");
  const [availableQuantity, setAvailableQuantity] = useState<string>("4500");
  const [minOrderQty, setMinOrderQty] = useState<string>("50");
  const [category, setCategory] = useState("Agricultural");
  const [description, setDescription] = useState(
    "Hand-picked high-altitude Arabica beans from the volcanic soil of Huila, Colombia. Features balanced acidity, silky body, and distinct aromatic cupping notes of dark cocoa, orange blossom, and wild honey."
  );

  // Customs & Logistics
  const [hsCode, setHsCode] = useState<string>("0901.11.00");
  const [portOfLoading, setPortOfLoading] = useState<string>("Port of Buenaventura");
  const [leadTime, setLeadTime] = useState<string>("7 - 12 business days");
  const [packaging, setPackaging] = useState<string>("GrainPro hermetic liners in 60kg jute export bags");
  const [shelfLife, setShelfLife] = useState<string>("24 Months");

  // Dynamic Certifications
  const [certifications, setCertifications] = useState<string[]>([
    "ISO 22000 Food Safety Standard",
    "USDA Organic Certified",
    "Phytosanitary Ministry Release",
    "Fair Trade International",
  ]);
  const [newCertInput, setNewCertInput] = useState("");

  // Dynamic Technical Specifications (Key-Value)
  const [specs, setSpecs] = useState<{ label: string; value: string }[]>([
    { label: "Grade", value: "Excelso European Preparation (EP)" },
    { label: "Screen Size", value: "15/16 Strictly Hard Bean" },
    { label: "Moisture Content", value: "11.2% Max" },
    { label: "Processing Method", value: "Fully Washed & Sun Dried" },
    { label: "Defect Count", value: "< 0.5% (SCAA Standard)" },
  ]);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Reactive Product Preview
  const previewProduct: Product = useMemo(() => {
    const extraImages = galleryInput
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => u.length > 0);
    const mainImg =
      image.trim() ||
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Roasted_coffee_beans.jpg/1280px-Roasted_coffee_beans.jpg";

    return {
      id: "preview-commodity",
      name: name.trim() || "Single-Origin Colombian Arabica Coffee Beans (Excelso EP)",
      image: mainImg,
      gallery: extraImages.length > 0 ? [mainImg, ...extraImages] : [mainImg],
      price: Number(price) || 0,
      unit: unit.trim() || "kg",
      originCountry: originCountry.trim() || "Origin Country",
      rating: Number(rating) || 4.9,
      availableQuantity: Number(availableQuantity) || 0,
      minOrderQty: Number(minOrderQty) || 1,
      category: category || "Agricultural",
      createdAt: new Date().toISOString(),
      description: description.trim(),
      hsCode: hsCode.trim() || undefined,
      portOfLoading: portOfLoading.trim() || undefined,
      leadTime: leadTime.trim() || undefined,
      packaging: packaging.trim() || undefined,
      shelfLife: shelfLife.trim() || undefined,
      certifications: certifications.length > 0 ? certifications : undefined,
      specs: specs.filter((s) => s.label.trim() && s.value.trim()),
    };
  }, [
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!session?.user) {
      toast.error({
        title: "Please log in to add an export",
        description: "You must be signed in to create and manage export commodities.",
      });
      setAuthOpen(true);
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
      addProduct({
        name: name.trim(),
        image: image.trim(),
        gallery: fullGallery.length > 1 ? fullGallery : undefined,
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
        description:
          description.trim() ||
          "High quality export commodity produced under certified agricultural protocols, packed in export-ready seaworthy standards, and fully eligible for international trade and escrow.",
        category,
        exporterName: "My Export Enterprise",
        exporterRating: 4.95,
        exporterVerified: true,
        exporterShipments: 14,
      });

      toast.success({
        title: "Export Listing Created Successfully",
      });

      setTimeout(() => {
        router.push("/dashboard/products");
      }, 800);
    } catch {
      toast.error({
        title: "Failed to Add Export",
      });
      setError("Failed to add product. Please try again.");
      setLoading(false);
    }
  }

  // Demo presets for fast testing
  function handleFillSample(sampleType: "coffee" | "jute" | "spices") {
    if (sampleType === "coffee") {
      setName("Single-Origin Colombian Arabica Coffee Beans (Excelso EP)");
      setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Roasted_coffee_beans.jpg/1280px-Roasted_coffee_beans.jpg");
      setGalleryInput("https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80\nhttps://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80");
      setPrice("2950");
      setUnit("kg");
      setOriginCountry("Colombia");
      setRating("4.9");
      setAvailableQuantity("4500");
      setMinOrderQty("50");
      setHsCode("0901.11.00");
      setPortOfLoading("Port of Buenaventura");
      setLeadTime("7 - 12 business days");
      setPackaging("GrainPro hermetic liners in 60kg jute export bags");
      setShelfLife("24 Months");
      setCategory("Agricultural");
      setCertifications([
        "ISO 22000 Food Safety Standard",
        "USDA Organic Certified",
        "Phytosanitary Ministry Release",
        "Fair Trade International",
      ]);
      setSpecs([
        { label: "Grade", value: "Excelso European Preparation (EP)" },
        { label: "Screen Size", value: "15/16 Strictly Hard Bean" },
        { label: "Moisture Content", value: "11.2% Max" },
        { label: "Processing Method", value: "Fully Washed & Sun Dried" },
        { label: "Defect Count", value: "< 0.5% (SCAA Standard)" },
      ]);
      setDescription("Hand-picked high-altitude Arabica beans from the volcanic soil of Huila, Colombia. Features balanced acidity, silky body, and distinct aromatic cupping notes of dark cocoa, orange blossom, and wild honey.");
    } else if (sampleType === "jute") {
      setName("Eco-Friendly Raw Hessian Jute Fabric (Grade A)");
      setImage("https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80");
      setGalleryInput("https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80");
      setPrice("180");
      setUnit("meters");
      setOriginCountry("Bangladesh");
      setRating("4.8");
      setAvailableQuantity("15000");
      setMinOrderQty("100");
      setHsCode("5303.10.10");
      setPortOfLoading("Chittagong Seaport");
      setLeadTime("3 - 5 business days");
      setPackaging("High density hydraulic pressed export bales");
      setShelfLife("36 Months");
      setCategory("Textile");
      setCertifications([
        "OEKO-TEX Standard 100",
        "Global Organic Textile Standard (GOTS)",
        "ISO 9001 Quality Management",
      ]);
      setSpecs([
        { label: "Weave Structure", value: "Plain Weave 10x10 porter/shots" },
        { label: "GSM Density", value: "320 GSM" },
        { label: "Tensile Strength", value: "> 95 lbs warp / 85 lbs weft" },
        { label: "Biodegradability", value: "100% Organic Natural Jute" },
      ]);
      setDescription("Export-grade heavy duty hessian rolls for industrial packaging, eco geotextiles, and global agro-industrial transport.");
    } else if (sampleType === "spices") {
      setName("High-Curcumin Alleppey Finger Turmeric");
      setImage("https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80");
      setGalleryInput("https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80");
      setPrice("420");
      setUnit("kg");
      setOriginCountry("India");
      setRating("4.9");
      setAvailableQuantity("3500");
      setMinOrderQty("50");
      setHsCode("0910.30.00");
      setPortOfLoading("Cochin Port");
      setLeadTime("5 - 8 business days");
      setPackaging("Vacuum-sealed double poly-lined woven sacks");
      setShelfLife("24 Months");
      setCategory("Food");
      setCertifications([
        "FSSAI Export Clearance",
        "USDA Organic Certified",
        "Spices Board Quality Seal",
      ]);
      setSpecs([
        { label: "Curcumin Content", value: "5.2% Certified" },
        { label: "Moisture Content", value: "< 9.5%" },
        { label: "Total Ash", value: "< 7.0%" },
        { label: "Extraneous Matter", value: "< 0.2%" },
      ]);
      setDescription("Sun-dried whole turmeric fingers with certified 5.2% natural curcumin content. Sourced directly from Kerala organic farmer collectives.");
    }
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
            </div>

            {/* Section 3: Trade, Customs & Logistics */}
            <div className="flex flex-col gap-4 pt-2">
              <h3 className={`${pinkAverage.className} text-lg text-foreground border-b border-foreground/10 pb-2`}>
                3. Trade & Logistics Specifications
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

            {/* Section 4: Certifications & Standards */}
            <div className="flex flex-col gap-4 pt-2">
              <h3 className={`${pinkAverage.className} text-lg text-foreground border-b border-foreground/10 pb-2`}>
                4. Quality Certifications & Accreditations
              </h3>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Add certification (e.g. ISO 22000, USDA Organic, Fair Trade)"
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
                  <span>Add</span>
                </button>
              </div>

              {certifications.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {certifications.map((c, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 rounded-xl border border-foreground/15 bg-background/80 px-3 py-1.5 text-xs font-semibold text-foreground"
                    >
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>{c}</span>
                      <button
                        type="button"
                        onClick={() => removeCert(c)}
                        className="text-foreground/40 hover:text-red-500 ml-1 cursor-pointer"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Section 5: Technical Specifications (Key-Value) */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-center justify-between border-b border-foreground/10 pb-2">
                <h3 className={`${pinkAverage.className} text-lg text-foreground`}>
                  5. Technical Specifications Matrix
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
                href="/dashboard/products"
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
                <span>{loading ? "Publishing Listing..." : "Publish Export Listing"}</span>
              </Button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
