import "dotenv/config";
import HapiPostgresConnection from "hapi-postgres-connection";
import hello from "./controllers/hello.js";
import Hapi from "@hapi/hapi";

const init = async () => {
  const server = Hapi.server({
    port: 3007,
    host: "localhost",
  });

  await server.register({
    plugin: HapiPostgresConnection,
  });

  await server.start();
  console.log(`Server running on ${server.info.uri}`);

  server.route({
    method: "GET",
    path: "/",
    handler: () => {
      return "Bienvenue sur /";
    },
  });

  server.route({
    method: "GET",
    path: "/todos",
    handler: hello.getTodos,
  });
};

init();
