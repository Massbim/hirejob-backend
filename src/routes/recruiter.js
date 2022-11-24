const express = require("express");
const { recruiterController } = require("../controller/recruiter");
const Router = express.Router();

Router.get("/", recruiterController.getRecruiter)
  .get("/filter", recruiterController.getRecruiterByFilter)
  .get("/:id", recruiterController.getRecruiterByWork);

module.exports = Router;
