import * as fastify from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import router from "./router";

const serverOptions: fastify.ServerOptionsAsHttp2 = {
  // Logger only for production
  logger: !!(process.env.NODE_ENV !== "development"),
  http2: true
};

const app: fastify.FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify(serverOptions);

app.register(router);

export default app;
