const express = require("express");
const router = express.Router();

const { getWorker, getDetailsWorker } = require("../controller/worker");

router.get("/", getWorker).get("/:id", getDetailsWorker);

module.exports = router;
