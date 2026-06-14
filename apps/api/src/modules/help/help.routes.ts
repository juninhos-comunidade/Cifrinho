import type { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma.js";

export async function helpRoutes(app: FastifyInstance) {
  // retorna categorias com suas FAQs ordenadas — rota pública, sem autenticação
  app.get("/help/faqs", async () => {
    return prisma.helpCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        faqs: {
          orderBy: { order: "asc" },
          select: { id: true, question: true, answer: true, order: true },
        },
      },
    });
  });
}
