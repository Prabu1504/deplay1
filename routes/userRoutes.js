const express = require("express");
const router = express.Router();
const {CreateFolder,GetPatient}= require("../controllers/userController");

router.post("/post", CreateFolder);
router.get("/get/:id", GetPatient);
module.exports = router;
