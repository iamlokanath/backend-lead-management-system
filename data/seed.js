const mongoose = require("mongoose");
const Lead = require("../models/Lead");
const fs = require("fs");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const leads = JSON.parse(fs.readFileSync("./data/leads.json", "utf-8"));

Lead.insertMany(leads)
  .then(() => {
    console.log("Sample leads inserted!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(err);
    mongoose.connection.close();
  });
