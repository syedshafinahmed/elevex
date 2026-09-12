import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json([], { status: 200 });
  }
  const methods = await prisma.paymentMethod.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(methods);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { type, brand, name, last4, accountNumber, providerName, accountType, expDate, bankName, swiftCode, isDefault } = body;

  if (!type || !brand || !name || !last4) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (isDefault) {
    await prisma.paymentMethod.updateMany({
      where: { userId: session.user.id },
      data: { isDefault: false },
    });
  }

  const method = await prisma.paymentMethod.create({
    data: {
      userId: session.user.id,
      type,
      brand,
      name,
      last4,
      accountNumber: accountNumber ?? null,
      providerName: providerName ?? null,
      accountType: accountType ?? null,
      expDate: expDate ?? null,
      bankName: bankName ?? null,
      swiftCode: swiftCode ?? null,
      isDefault: isDefault ?? false,
    },
  });

  return NextResponse.json(method, { status: 201 });
}
