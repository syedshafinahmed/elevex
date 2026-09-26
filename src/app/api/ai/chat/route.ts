import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const SYSTEM_INSTRUCTION = `You are Elev, the AI assistant for Elevex — a B2B cross-border trade platform connecting verified commodity producers from South Asia directly with global buyers. Zero broker fees. Guaranteed trade settlement.

Your role:
- Help buyers find the right commodities (agricultural, textiles, minerals, etc.)
- Guide exporters on listing products and navigating the platform
- Answer trade-related questions: HS codes, packaging, certifications, lead times, payment methods
- Explain Elevex's features: direct trade, Stripe-backed payments, verified exporters, import/export dashboard
- Be concise, professional, and helpful. Use bullet points for lists.
- If asked about something unrelated to trade or Elevex, politely redirect to trade topics.

Keep responses focused and under 200 words unless detailed explanation is needed.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json() as {
      messages: { role: "user" | "model"; text: string }[];
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages are required" }, { status: 400 });
    }

    const chat = ai.chats.create({
      model: "gemini-3.8-flash",
      config: { systemInstruction: SYSTEM_INSTRUCTION },
      history: messages.slice(0, -1).map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      })),
    });

    const lastMessage = messages[messages.length - 1];
    const response = await chat.sendMessage({ message: lastMessage.text });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("POST /api/ai/chat error:", error);
    return NextResponse.json({ error: "AI request failed" }, { status: 500 });
  }
}
