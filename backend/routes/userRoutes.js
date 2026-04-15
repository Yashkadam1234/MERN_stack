const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getUsers,
  getUserById,
  getProfile,
  updateProfile,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");


// USER PROFILE  

// 🔥 MUST BE BEFORE "/:id"
router.get("/me", auth, getProfile);
router.put("/me", auth, updateProfile);


//  ADMIN +  MANAGER 

router.get("/", auth, role("admin", "manager"), getUsers);
router.get("/:id", auth, role("admin", "manager"), getUserById);
router.put("/:id", auth, role("admin", "manager"), updateUser);


//   ADMIN ONLY  

router.post("/", auth, role("admin"), createUser);
router.delete("/:id", auth, role("admin"), deleteUser);


module.exports = router;