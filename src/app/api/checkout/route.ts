import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();

    // items: [{ productId: string, quantity: number }]
    const { items } = body as { items: { productId: string; quantity: number }[] };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // Resolve each product from DB
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const resolvedItems: { productId: string; sellerId?: string | null; name: string; price: number; unit: string; image: string; originCountry: string; rating: number; quantity: number }[] = [];

    for (const item of items) {
      const product = await prisma.product.findFirst({
        where: { OR: [{ id: item.productId }, { slug: item.productId }] },
      });

      if (!product) {
        return NextResponse.json({ error: `Product not found: ${item.productId}` }, { status: 404 });
      }

      if (item.quantity > product.availableQuantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name} (available: ${product.availableQuantity} ${product.unit})` },
          { status: 400 }
        );
      }

      resolvedItems.push({
        productId: product.id,
        sellerId: product.userId || null,
        name: product.name,
        price: product.price,
        unit: product.unit,
        image: product.image,
        originCountry: product.originCountry,
        rating: product.rating,
        quantity: item.quantity,
      });

      // Stripe requires price in smallest currency unit (cents). We treat price as USD cents equivalent.
      const unitAmountInCents = Math.round(product.price * 100);

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: `${product.name} (${item.quantity} ${product.unit})`,
            description: `Origin: ${product.originCountry} | Min Order: ${product.minOrderQty} ${product.unit}`,
            images: product.image.startsWith("http") ? [product.image] : [],
          },
          unit_amount: unitAmountInCents,
        },
        quantity: item.quantity,
      });
    }

    const baseUrl = process.env.AUTH_URL || "http://localhost:3000";

    let paymentMethodLabel = "";
    if (session?.user?.id) {
      const primary = await prisma.paymentMethod.findFirst({
        where: { userId: session.user.id, isDefault: true },
      });
      if (primary) {
        if (primary.type === "mfs") {
          paymentMethodLabel = `${primary.providerName || primary.brand.toUpperCase()} ${primary.accountType || "Wallet"} •••• ${primary.last4}`;
        } else if (primary.type === "card") {
          paymentMethodLabel = `${primary.brand === "visa" ? "Visa" : primary.brand === "mastercard" ? "Mastercard" : "Card"} •••• ${primary.last4}`;
        } else {
          paymentMethodLabel = `${primary.bankName || "Bank"} •••• ${primary.last4}`;
        }
      }
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      metadata: {
        userId: session?.user?.id ?? "",
        items: JSON.stringify(resolvedItems),
        paymentMethodLabel,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("POST /api/checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
