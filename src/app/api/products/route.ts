import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();

    const {
      name,
      image,
      gallery,
      price,
      unit,
      originCountry,
      rating,
      availableQuantity,
      minOrderQty,
      description,
      category,
      exporterName,
      exporterRating,
      exporterShipments,
      portOfLoading,
      leadTime,
      hsCode,
      packaging,
      certifications,
      shelfLife,
      specs,
    } = body;

    if (!name || !image || price === undefined || !originCountry || availableQuantity === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: name, image, price, originCountry, availableQuantity" },
        { status: 400 }
      );
    }

    // Generate unique slug
    let baseSlug = slugify(name);
    if (!baseSlug) {
      baseSlug = `product-${Date.now()}`;
    }

    let uniqueSlug = baseSlug;
    let count = 1;
    while (await prisma.product.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${baseSlug}-${count}`;
      count++;
    }

    const createdProduct = await prisma.product.create({
      data: {
        slug: uniqueSlug,
        name: name.trim(),
        image: image.trim(),
        gallery: Array.isArray(gallery) ? gallery : [image.trim()],
        price: Number(price),
        unit: unit?.trim() || "kg",
        originCountry: originCountry.trim(),
        rating: rating !== undefined ? Number(rating) : 5.0,
        availableQuantity: Number(availableQuantity),
        minOrderQty: minOrderQty !== undefined ? Number(minOrderQty) : 1,
        description: description?.trim() || "",
        category: category?.trim() || "Agricultural",
        exporterName: exporterName?.trim() || session?.user?.name || "Global Exporter",
        exporterRating: exporterRating !== undefined ? Number(exporterRating) : 4.9,
        exporterShipments: exporterShipments !== undefined ? Number(exporterShipments) : 10,
        portOfLoading: portOfLoading?.trim() || "",
        leadTime: leadTime?.trim() || "",
        hsCode: hsCode?.trim() || "",
        packaging: packaging?.trim() || "",
        certifications: Array.isArray(certifications) ? certifications : [],
        shelfLife: shelfLife?.trim() || "",
        specs: specs ?? null,
        userId: session?.user?.id ?? null,
      },
    });

    return NextResponse.json(createdProduct, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
