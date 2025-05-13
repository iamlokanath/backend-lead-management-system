const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  date: String,
  leadId: Number,
  objectId: Number,
  type: String,
  company: String,
  name: String,
  act: String,
  broker: String,
  status: String,
  subscription: String,
});

module.exports = mongoose.model("Lead", LeadSchema);
