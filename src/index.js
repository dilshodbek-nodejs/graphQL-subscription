const http = require("http");
const express = require("express");
const { expressMiddleware } = require("@apollo/server/express4");
const buildGraphqlServer = require("./graphql");
const mongo = require("./config/mongo");

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());

mongo()
  .then(() => {
    console.log("mongoDB connected successfully");
  })
  .catch((err) => console.log(err));

let serverStart = async () => {
  let server = buildGraphqlServer(httpServer);
  await server.start();
  app.use(expressMiddleware(server));
};

serverStart();

httpServer.listen(9000, () => {
  console.log(9000);
});
