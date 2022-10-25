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
    routes: {
      cors: true,
    },
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

  // CRUD sur les todos

  // Recuperer tous les todos stockées en BDD
  server.route({
    method: "GET",
    path: "/todos",
    handler: mainController.getTodos,
  });

  // Ajout d'un nouveau todo en BDD
  server.route({
    method: "POST",
    path: "/addTodo",
    handler: mainController.addTodo,
  });

  // Supression d'un todo avec son id
  server.route({
    method: "DELETE",
    path: "/todos/{id}",
    handler: mainController.deleteTodo,
  });

  // Mise a jour de l'état fait/non fait
  server.route({
    method: "PATCH",
    path: "/todos/{id}",
    handler: mainController.updateTodo,
  });
};

init();
