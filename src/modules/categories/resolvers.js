const pubsub = require("../../graphql/pubsub");
const categoryModel = require("./model");

let resolvers = {
  Query: {
    categories: async () => await categoryModel.find(),
  },

  Mutation: {
    createCategory: async (_, { name }) => {
      let category = await categoryModel.create({ name });
      await category.save();

      let categories = await categoryModel.find();
      pubsub.publish("category_create", { categories });

      return categories;
    },

    updateCategory: async (_, { id, name }) => {
      let categories = await categoryModel.find();

      categories = categories.map((category) => {
        if (category._id == id) {
          return {
            id,
            name,
          };
        } else {
          return category;
        }
      });

      pubsub.publish("update_category", { categories });

      return categories;
    },
  },

  Subscription: {
    categories: {
      subscribe: () =>
        pubsub.asyncIterator(["category_create", "update_category"]),
    },
  },
};

module.exports = resolvers;
