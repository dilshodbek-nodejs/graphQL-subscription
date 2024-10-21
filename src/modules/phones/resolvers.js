const pubsub = require("../../graphql/pubsub");
const phoneModel = require("./model");
const categoryModel = require("../categories/model");

let resolvers = {
  Query: {
    phones: async () => await phoneModel.find(),
    categories: async () => await categoryModel.find(),
  },

  Phone: {
    category: async (phone) => {
      const category = await categoryModel.findById({ _id: phone.category_id });

      return [category];
    },
  },

  Mutation: {
    createPhone: async (_, { name, price, category_id }) => {
      let phone = await phoneModel.create({ name, price, category_id });
      await phone.save();

      let phones = await phoneModel.find();
      pubsub.publish("create_phone", { phones });
      return phones;
    },

    updatePhone: async (_, { id, name, price, category_id }) => {
      await phoneModel.findByIdAndUpdate(
        { _id: id },
        { name, price, category_id }
      );

      let phones = await phoneModel.find();

      pubsub.publish("update_phone", { phones });
      return phones;
    },
  },

  Subscription: {
    phones: {
      subscribe: () => pubsub.asyncIterator(["create_phone", "update_phone"]),
    },
  },
};

module.exports = resolvers;
