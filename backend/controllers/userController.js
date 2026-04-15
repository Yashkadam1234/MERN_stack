const User = require("../models/User");
const bcrypt = require("bcryptjs");

//  ADMIN +   MANAGER → VIEW USERS (with search + pagination)
const getUsers = async (req, res) => {
  try {
    const { search = "", page = 1 } = req.query;

    const limit = 10;
    const skip = (page - 1) * limit;

    const users = await User.find({
      name: { $regex: search, $options: "i" },
    })
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
  .skip(skip)
  .limit(limit);

    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};



//   GET USER BY ID (MISSING → CAUSED CRASH)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
};


//   GET OWN PROFILE
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};


//  UPDATE OWN PROFILE ONLY
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.name = req.body.name || user.name;

    if (req.body.password && req.body.password !== "") {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    await user.save();

    res.json({
      message: "Profile updated",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
};


//   ADMIN ONLY CREATE USER
const createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password || "123456", salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      status,
     createdBy: req.user.id,  

    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
  }
};


// ADMIN +   MANAGER UPDATE USER
const updateUser = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const targetUser = await User.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    //   Manager cannot modify admin
    if (
      loggedInUser.role === "manager" &&
      targetUser.role === "admin"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    //   Prevent self role change
    if (req.user.id === req.params.id && req.body.role) {
      return res.status(403).json({
        message: "Cannot change your own role",
      });
    }

    //  PASSWORD FIX
    if (req.body.password && req.body.password !== "") {
      const bcrypt = require("bcryptjs");
      const salt = await bcrypt.genSalt(10);
      targetUser.password = await bcrypt.hash(
        req.body.password,
        salt
      );
    }

    targetUser.name = req.body.name || targetUser.name;
    targetUser.email = req.body.email || targetUser.email;
    targetUser.status = req.body.status || targetUser.status;

    if (loggedInUser.role === "admin") {
      targetUser.role = req.body.role || targetUser.role;
    }

    targetUser.updatedBy = req.user.id;

    // SAVE
    await targetUser.save();

    res.json({
      message: "User updated successfully",
      user: targetUser,
    });

  } catch (err) {
    res.status(500).json({ message: "Error updating user" });
  }
};


//   ADMIN ONLY DELETE (SOFT DELETE)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = "inactive";
    await user.save();

    res.json({ message: "User deactivated" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
};


//  EXPORT EVERYTHING (FIXED)
module.exports = {
  getUsers,
  getUserById,    
  getProfile,
  updateProfile,
  createUser,
  updateUser,
  deleteUser,
};