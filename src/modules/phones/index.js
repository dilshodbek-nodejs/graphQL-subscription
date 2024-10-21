const fs = require("fs")

const resolvers = require("./resolvers")
const typeDefs = fs.readFileSync(__dirname + "/typeDefs.gql", "utf-8")

module.exports = {
    resolvers,
    typeDefs
}