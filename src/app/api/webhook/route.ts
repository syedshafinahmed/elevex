import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  // If no webhook secret configured, skip signature verification (dev mode)
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } else {
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.userId || null;
    const itemsRaw = session.metadata?.items;

    if (!itemsRaw) {
      return NextResponse.json({ received: true });
    }

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
      // Deduct stock
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
    }
  }

  return NextResponse.json({ received: true });
}
