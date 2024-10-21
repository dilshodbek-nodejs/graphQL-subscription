const mongoose = require("mongoose");

const mongo = async () => {
  return mongoose.connect("mongodb://localhost:27017/FixMobile");
};

module.exports = mongo;
