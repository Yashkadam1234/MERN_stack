const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors({
  origin: "https://mern-stack-blush-two.vercel.app",
  credentials: true
}));

app.use(express.json());

// ================= HEALTH CHECK ROUTE =================
// THIS IS FOR UPTIME ROBOT + TESTING
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Backend is running"
  });
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// ================= ROUTES =================
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// ================= DB CONNECTION =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// ================= SERVER START =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});