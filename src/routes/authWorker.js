const express = require("express");
const Router = express.Router();
const authWorker = require("../controller/authWorker");
const upload = require("../middlewares/uploadfile");
const protect = require("../middlewares/auth");

Router.post("/login", authWorker.login)
  .get("/profile", protect, authWorker.getProfil)
  .get("/activation/:token", authWorker.ActivateAccount)
  .post("/register", authWorker.register)
  .post("/refreshToken", authWorker.refreshToken)
  .post("changePassword", authWorker.changePasswordEmployee)
  .put("/update-profile", protect, authWorker.updateProfileEmployee)
  .put("/update-profile/img", protect, upload, authWorker.updaterImgProfile);

module.exports = Router;
