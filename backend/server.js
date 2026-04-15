const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");  

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());


// ================= ROUTES =================
app.use("/api/users", userRoutes);    
app.use("/api/auth", authRoutes);    

// ================= DB =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


// ================= SERVER =================
app.listen(5000, () => {
  console.log("Server running on port 5000");
});