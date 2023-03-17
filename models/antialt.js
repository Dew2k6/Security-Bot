const mongoose = require("mongoose");
const schm = new mongoose.Schema({
  Guild: String,
  Days: Number,
});

module.exports = mongoose.model("antialt", schm);