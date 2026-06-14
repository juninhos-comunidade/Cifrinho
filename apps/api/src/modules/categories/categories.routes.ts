import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";

const categorySchema = z.object({
  name: z.string().min(1),
  icon: z.string().optional(),
  color: z.string().optional(),
  accountType: z.enum(["PERSONAL", "BUSINESS"]).default("PERSONAL"),
});

export async function categoryRoutes(app: FastifyInstance) {
  const authenticate = { onRequest: [app.authenticate] };

  app.get("/categories", authenticate, async (request) => {
    const userId = (request.user as any).sub;
    return prisma.category.findMany({
      where: { userId },
      orderBy: { name: "asc" },
    });
  });

  app.post("/categories", authenticate, async (request, reply) => {
    const userId = (request.user as any).sub;
    const data = categorySchema.parse(request.body);

    const category = await prisma.category.create({
      data: { ...data, userId },
    });
    return reply.status(201).send(category);
  });
}
