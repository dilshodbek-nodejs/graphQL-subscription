const pubsub = require("../../graphql/pubsub");
const categoryModel = require("./model");

let resolvers = {
  Query: {
    categories: async () => {
      const categories = await categoryModel.find();
      return categories.map(category => ({
        id: category._id.toString(),
        name: category.name,
      }));
    },
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

    deleteCategory: async (_, { id }) => {
      const deleted = await categoryModel.deleteOne({ _id: id });

      if (deleted.deletedCount === 0) {
        throw new Error("Kategoriya topilmadi yoki o‘chirib bo‘lmadi!");
      }

      const categories = await categoryModel.find();
      pubsub.publish("delete_category", { categories });

      return categories;
    },
  },

  Subscription: {
    categories: {
      subscribe: () =>
        pubsub.asyncIterator(["category_create", "update_category", "delete_category"]),
    },
  },
};

module.exports = resolvers;