import { FastifyRequest, FastifyReply } from "fastify";
import { ServerResponse } from "http";

export async function healthcheck(req: FastifyRequest, res: FastifyReply<ServerResponse>) {
  res.code(204);
}
