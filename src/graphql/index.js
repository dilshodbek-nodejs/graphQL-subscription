const { WebSocketServer } = require("ws");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { useServer } = require("graphql-ws/lib/use/ws");
const schema = require("./schema");
const { ApolloServer } = require("@apollo/server");

const buildGraphqlServer = (httpServer) => {
  let wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  let serverCleanup = useServer({ schema }, wsServer);

  return new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
};

module.exports = buildGraphqlServer;
