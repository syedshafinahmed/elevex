import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.importedProduct.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Import record not found" },
        { status: 404 }
      );
    }

    await prisma.importedProduct.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/imports/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to remove import consignment" },
      { status: 500 }
    );
  }
}
