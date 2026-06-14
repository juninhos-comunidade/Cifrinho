import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";

const transactionSchema = z.object({
  description: z.string().min(1),
  amount: z.number().positive(),
  type: z.enum(["INCOME", "EXPENSE"]),
  accountType: z.enum(["PERSONAL", "BUSINESS"]).default("PERSONAL"),
  date: z.string().datetime(),
  categoryId: z.string().optional(),
});

export async function transactionRoutes(app: FastifyInstance) {
  const authenticate = { onRequest: [app.authenticate] };

  app.get("/transactions", authenticate, async (request) => {
    const userId = (request.user as any).sub;
    return prisma.transaction.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { date: "desc" },
    });
  });

  app.post("/transactions", authenticate, async (request, reply) => {
    const userId = (request.user as any).sub;
    const data = transactionSchema.parse(request.body);

    const transaction = await prisma.transaction.create({
      data: { ...data, userId, date: new Date(data.date) },
      include: { category: true },
    });

    return reply.status(201).send(transaction);
  });

  app.put("/transactions/:id", authenticate, async (request, reply) => {
    const userId = (request.user as any).sub;
    const { id } = request.params as { id: string };
    const data = transactionSchema.partial().parse(request.body);

    const transaction = await prisma.transaction.findUnique({ where: { id } });
    if (!transaction || transaction.userId !== userId) {
      return reply.status(404).send({ message: "Transação não encontrada." });
    }

    const updated = await prisma.transaction.update({
      where: { id },
      data: { ...data, ...(data.date ? { date: new Date(data.date) } : {}) },
      include: { category: true },
    });

    return reply.send(updated);
  });

  app.delete("/transactions/:id", authenticate, async (request, reply) => {
    const userId = (request.user as any).sub;
    const { id } = request.params as { id: string };

    const transaction = await prisma.transaction.findUnique({ where: { id } });
    if (!transaction || transaction.userId !== userId) {
      return reply.status(404).send({ message: "Transação não encontrada." });
    }

    await prisma.transaction.delete({ where: { id } });
    return reply.status(204).send();
  });
}
