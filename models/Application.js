const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  status: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model("Application", applicationSchema);
