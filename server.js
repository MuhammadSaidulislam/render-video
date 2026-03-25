console.log("Server started file loaded");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ root
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// ✅ ping test (IMPORTANT)
app.get("/ping", (req, res) => {
  res.status(200).json({
    message: "Railway is working ✅",
    time: new Date().toISOString(),
  });
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on port", PORT);
});