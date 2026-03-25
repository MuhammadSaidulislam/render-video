const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ health check
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// ✅ test route
app.get("/test", (req, res) => {
  res.json({ ok: true });
});



// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on port", PORT);
});