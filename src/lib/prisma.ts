import { PrismaClient } from "@/generated/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function getClient(): PrismaClient {
  if (!globalForPrisma.prisma || !(globalForPrisma.prisma as any).product) {
    globalForPrisma.prisma = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  }
  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getClient();
    const value = (client as any)[prop];
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});

