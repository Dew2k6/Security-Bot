const mongoose = require("mongoose");
const schm = new mongoose.Schema({
  Guild: String,
  Channel: String,
});

module.exports = mongoose.model("logging", schm);