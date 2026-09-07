import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    const imports = await prisma.importedProduct.findMany({
      where: session?.user?.id ? { userId: session.user.id } : undefined,
      orderBy: { importedAt: "desc" },
    });
    return NextResponse.json(imports);
  } catch (error) {
    console.error("GET /api/imports error:", error);
    return NextResponse.json(
      { error: "Failed to fetch imports" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();

    const { productId, quantity } = body;
    if (!productId || !quantity || quantity <= 0) {
      return NextResponse.json(
        { error: "Valid productId and positive quantity are required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id: productId }, { slug: productId }],
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Commodity product not found" },
        { status: 404 }
      );
    }

    if (quantity > product.availableQuantity) {
      return NextResponse.json(
        { error: `Requested quantity exceeds available stock (${product.availableQuantity} ${product.unit})` },
        { status: 400 }
      );
    }

    // Deduct quantity from product stock
    await prisma.product.update({
      where: { id: product.id },
      data: {
        availableQuantity: product.availableQuantity - Number(quantity),
      },
    });

    // Create import record
    const createdImport = await prisma.importedProduct.create({
      data: {
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        unit: product.unit,
        rating: product.rating,
        originCountry: product.originCountry,
        importedQuantity: Number(quantity),
        userId: session?.user?.id ?? null,
      },
    });

    return NextResponse.json(createdImport, { status: 201 });
  } catch (error) {
    console.error("POST /api/imports error:", error);
    return NextResponse.json(
      { error: "Failed to allocate import consignment" },
      { status: 500 }
    );
  }
}
