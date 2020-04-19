import { FastifyInstance, FastifyError } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { healthcheck } from "./handlers";

export default function router(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts,
  next: (err?: FastifyError) => void
) {
  fastify.get("/.healthcheck", healthcheck);
  next();
}