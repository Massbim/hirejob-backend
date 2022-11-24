const express = require("express");
const router = express.Router();
const { controllerReview } = require("../controller/review");
const protect = require("../middlewares/auth");

router
  .get("/", controllerReview.getAllData)
  .post("/", protect, controllerReview.createData);

module.exports = router;
