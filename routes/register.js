const express = require("express");
const router = express.Router();
const registerController = require("../controller/registerController");

router.post("/register", registerController.add);      
// router.post("/register", registerController.register); 

module.exports = router;
