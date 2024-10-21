const { makeExecutableSchema } = require("@graphql-tools/schema");
const categories = require("../modules/categories");
const phones = require("../modules/phones");

let schema = makeExecutableSchema({
  typeDefs: [categories.typeDefs, phones.typeDefs],
  resolvers: [categories.resolvers, phones.resolvers],
});

module.exports = schema;
