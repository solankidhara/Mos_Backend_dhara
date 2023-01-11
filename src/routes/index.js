require("../DB/connection");
const express = require("express");

const userRouter = require("./user");
const adminRouter = require("./admin");

const router = express.Router();

router.use("/users", userRouter);
router.use("/admin", adminRouter);

module.exports = router;
