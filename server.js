const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const Application = require("./models/Application");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // ✅ FIXED

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API routes
app.post("/apply", async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.json({ message: "Application submitted successfully!" });
  } catch {
    res.status(500).json({ message: "Error submitting application" });
  }
});

app.get("/applications", async (req, res) => {
  res.json(await Application.find());
});

app.put("/applications/:id", async (req, res) => {
  try {
    await Application.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    });
    res.json({ message: "Status updated" });
  } catch {
    res.status(500).json({ message: "Error updating status" });
  }
});

app.delete("/applications/:id", async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: "Application deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting application" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
