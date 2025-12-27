// 1️⃣ Imports
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Application = require("./models/Application");

// 2️⃣ App setup
const app = express();
app.use(express.json());
app.use(express.static("public"));

// 3️⃣ Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// 4️⃣ Routes
app.post("/apply", async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.json({ message: "Application submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting application" });
  }
});

app.get("/applications", async (req, res) => {
  const applications = await Application.find();
  res.json(applications);
});

// 5️⃣ 🚨 THIS MUST BE LAST 🚨
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

app.put("/applications/:id", async (req, res) => {
  try {
    await Application.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    });
    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
});

app.delete("/applications/:id", async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: "Application deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting application" });
  }
});
