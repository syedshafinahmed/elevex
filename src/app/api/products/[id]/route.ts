import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findFirst({
      where: {
        OR: [{ slug: id }, { id: id }],
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const existingProduct = await prisma.product.findFirst({
      where: {
        OR: [{ slug: id }, { id: id }],
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // If name changed, update slug if needed
    let newSlug = existingProduct.slug;
    if (body.name && body.name.trim() !== existingProduct.name) {
      const generatedSlug = slugify(body.name.trim());
      if (generatedSlug !== existingProduct.slug) {
        const slugExists = await prisma.product.findUnique({
          where: { slug: generatedSlug },
        });
        if (!slugExists || slugExists.id === existingProduct.id) {
          newSlug = generatedSlug;
        }
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id: existingProduct.id },
      data: {
        slug: newSlug,
        name: body.name !== undefined ? body.name.trim() : undefined,
        image: body.image !== undefined ? body.image.trim() : undefined,
        gallery: Array.isArray(body.gallery) ? body.gallery : undefined,
        price: body.price !== undefined ? Number(body.price) : undefined,
        unit: body.unit !== undefined ? body.unit.trim() : undefined,
        originCountry: body.originCountry !== undefined ? body.originCountry.trim() : undefined,
        rating: body.rating !== undefined ? Number(body.rating) : undefined,
        availableQuantity: body.availableQuantity !== undefined ? Number(body.availableQuantity) : undefined,
        minOrderQty: body.minOrderQty !== undefined ? Number(body.minOrderQty) : undefined,
        description: body.description !== undefined ? body.description.trim() : undefined,
        category: body.category !== undefined ? body.category.trim() : undefined,
        exporterName: body.exporterName !== undefined ? body.exporterName.trim() : undefined,
        exporterRating: body.exporterRating !== undefined ? Number(body.exporterRating) : undefined,
        exporterShipments: body.exporterShipments !== undefined ? Number(body.exporterShipments) : undefined,
        portOfLoading: body.portOfLoading !== undefined ? body.portOfLoading.trim() : undefined,
        leadTime: body.leadTime !== undefined ? body.leadTime.trim() : undefined,
        hsCode: body.hsCode !== undefined ? body.hsCode.trim() : undefined,
        packaging: body.packaging !== undefined ? body.packaging.trim() : undefined,
        certifications: Array.isArray(body.certifications) ? body.certifications : undefined,
        shelfLife: body.shelfLife !== undefined ? body.shelfLife.trim() : undefined,
        specs: body.specs !== undefined ? body.specs : undefined,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

function minOrderQty(val: unknown) {
  const n = Number(val);
  return isNaN(n) || n < 1 ? 1 : n;
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existingProduct = await prisma.product.findFirst({
      where: {
        OR: [{ slug: id }, { id: id }],
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: { id: existingProduct.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
