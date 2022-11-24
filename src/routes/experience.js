const express = require("express");
const Router = express.Router();
const upload = require("../middlewares/uploadfile");
const { experienceController } = require("../controller/experience");
const protect = require("../middlewares/auth");

Router.post("/", protect, upload, experienceController.createExperience)
  .put("/:id", protect, upload, experienceController.updateExperience)
  .delete("/:id", experienceController.deleteExperience)
  .get("/:id", experienceController.getExperienceBy)
  .get("/", experienceController.selecAllExperience)
  .get("/search", experienceController.searchExperience);

module.exports = Router;
