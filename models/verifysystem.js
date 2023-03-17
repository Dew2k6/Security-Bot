const mongoose = require("mongoose");
const schm = new mongoose.Schema({
  Guild: String,
  Channel: String,
  Role: String,
});

module.exports = mongoose.model("verifysystem", schm);