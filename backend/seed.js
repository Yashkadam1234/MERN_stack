const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");
};

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create admin
    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
      status: "active",
    });

    console.log("Admin user created successfully");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedAdmin();