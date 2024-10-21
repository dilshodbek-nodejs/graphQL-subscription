const { Schema, model, Types } = require("mongoose");

const phoneSchema = new Schema({
    name: String,
    price: Number,
    category_id: {
        type: Types.ObjectId,
        ref: "Category"
    }
},
{
    collection: "phones"
})

module.exports = model("Phone", phoneSchema)