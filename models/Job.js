const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  pay: String
});

module.exports = mongoose.model("Job", jobSchema);
