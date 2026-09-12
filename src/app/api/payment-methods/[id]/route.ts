import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.paymentMethod.deleteMany({ where: { id, userId: session.user.id } });
  return NextResponse.json({ ok: true });
}

export async function PATCH(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.paymentMethod.updateMany({
    where: { userId: session.user.id },
    data: { isDefault: false },
  });
  const updated = await prisma.paymentMethod.updateMany({
    where: { id, userId: session.user.id },
    data: { isDefault: true },
  });
  if (updated.count === 0) {
    return NextResponse.json({ error: "Payment method not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
