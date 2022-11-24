const express = require("express");
const Router = express.Router();
const { authRecruiter } = require("../controller/authRecruiter");
const upload = require("../middlewares/uploadfile");
const protect = require("../middlewares/auth");

Router.post("/login", authRecruiter.loginRecruiter)
  .post("/register", authRecruiter.registerRecruiter)
  .get("/profile", protect, authRecruiter.profil)
  .post("/refreshToken", authRecruiter.refreshToken)
  .post("/changePassword", authRecruiter.changePassword)
  .put("/update-profile", protect, upload, authRecruiter.updateProfile);

module.exports = Router;
