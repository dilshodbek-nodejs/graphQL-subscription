const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: String,
  },
  {
    collection: "categories",
  }
);

module.exports = model("Category", categorySchema);
