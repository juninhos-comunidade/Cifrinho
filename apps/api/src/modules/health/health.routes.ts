import type { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma.js";

export async function healthRoutes(app: FastifyInstance) {
  // liveness — processo está vivo
  app.get("/health", async () => {
    return { status: "ok", timestamp: new Date().toISOString() };
  });

  // readiness — DB acessível
  app.get("/health/ready", async (_req, reply) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return {
        status: "ready",
        database: "ok",
        timestamp: new Date().toISOString(),
      };
    } catch (err) {
      app.log.error(err);
      return reply.status(503).send({
        status: "unavailable",
        database: "unreachable",
        timestamp: new Date().toISOString(),
      });
    }
  });
}
