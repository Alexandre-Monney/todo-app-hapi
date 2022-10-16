import "dotenv/config";
// Module pour connection pg avec hapi
import HapiPostgresConnection from "hapi-postgres-connection";
import Hapi from "@hapi/hapi";
import mainController from "./controllers/mainController.js";

const port = process.env.PORT || 3000;

const init = async () => {
  // Creation du serveur avec hapi
  const server = Hapi.server({
    port,
    host: "localhost",
  });
  // Connection a la db pgsql
  await server.register({
    plugin: HapiPostgresConnection,
  });
  // Demarrage du serveur hapi
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
  // Creation de la route "/"
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
    handler: mainController.getTodos,
  });
};

init();
