// const hello = require("./controllers/hello.js");
import hello from "./controllers/hello.js";
// const Hapi = require("@hapi/hapi");
import Hapi from "@hapi/hapi";

const init = async () => {
  const server = Hapi.server({
    port: 3007,
    host: "localhost",
  });

  await server.start();
  console.log(`Server running on ${server.info.uri}`);

  server.route({
    method: "GET",
    path: "/",
    handler: hello.test,
  });

  server.route({
    method: "GET",
    path: "/oo",
    handler: hello.testi,
  });
};

init();
