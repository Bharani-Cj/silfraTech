const express = require("express");
const userController = require("./../Controllers/userController");
const router = express.Router();

router.get("/api/getalluser", userController.getAllUsers);
router.get("/api/getuser/:id", userController.getUser);
router.post("/api/createUser", userController.createUser);
router.delete("/api/deleteUser/:id", userController.deleteUser);
router.put("/api/updateUser/:id", userController.updateUser);

module.exports = router;
