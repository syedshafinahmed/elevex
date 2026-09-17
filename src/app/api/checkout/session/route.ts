import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing session id" }, { status: 400 });

  try {
    const session = await stripe.checkout.sessions.retrieve(id);

    // Fulfill order directly if paid and not yet fulfilled (no webhook needed)
    if (session.payment_status === "paid" && session.metadata?.fulfilled !== "true") {
      // Mark as fulfilled first to prevent duplicate runs
      await stripe.checkout.sessions.update(id, {
        metadata: { ...session.metadata, fulfilled: "true" },
      });

      const userId = session.metadata?.userId || null;
      const itemsRaw = session.metadata?.items;

      if (itemsRaw) {
        const items = JSON.parse(itemsRaw) as {
          productId: string;
          name: string;
          price: number;
          unit: string;
          image: string;
          originCountry: string;
          rating: number;
          quantity: number;
        }[];

        for (const item of items) {
          // Deduct product stock
          await prisma.product.updateMany({
            where: { id: item.productId },
            data: { availableQuantity: { decrement: item.quantity } },
          });

          // Record import
          await prisma.importedProduct.create({
            data: {
              productId: item.productId,
              name: item.name,
              image: item.image,
              price: item.price,
              unit: item.unit,
              rating: item.rating,
              originCountry: item.originCountry,
              importedQuantity: item.quantity,
              userId: userId || null,
            },
          });

          const itemTotal = item.price * item.quantity;

          // 1. Debit buyer (money deducted)
          if (userId) {
            await prisma.transaction.create({
              data: {
                userId,
                type: "DEBIT",
                amount: itemTotal,
                currency: "BDT",
                description: `Import Purchase: ${item.name} (${item.quantity} ${item.unit || "units"})`,
                status: "COMPLETED",
                referenceId: id,
              },
            });
          }

          // 2. Credit seller (money added when someone buys their stuff)
          let sellerId = (item as { sellerId?: string | null }).sellerId;
          if (!sellerId) {
            const prod = await prisma.product.findUnique({
              where: { id: item.productId },
              select: { userId: true },
            });
            sellerId = prod?.userId ?? null;
          }

          if (sellerId) {
            await prisma.transaction.create({
              data: {
                userId: sellerId,
                type: "CREDIT",
                amount: itemTotal,
                currency: "BDT",
                description: `Export Settlement: ${item.name} (${item.quantity} ${item.unit || "units"})`,
                status: "COMPLETED",
                referenceId: id,
              },
            });
          }
        }
      }

      // Clear the user's cart after successful payment
      if (userId) {
        await prisma.cartItem.deleteMany({ where: { userId } });
      }
    }

    return NextResponse.json({
      paymentMethodLabel: session.metadata?.paymentMethodLabel || "",
      status: session.payment_status,
      fulfilled: true,
    });
  } catch (error) {
    console.error("GET /api/checkout/session error:", error);
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
}
