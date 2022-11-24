const express = require("express");
const Router = express.Router();
const portfolioController = require("../controller/portfolio");
const uploadImg = require("../middlewares/uploadfile");
const protect = require("../middlewares/auth");

Router.get("/", portfolioController.getPortfolio)
  .get("/id/:id", portfolioController.getID)
  .get("/:id", portfolioController.getPortfolioBy)
  .post("/", protect, uploadImg, portfolioController.createPortofolio)
  .put("/:id", protect, uploadImg, portfolioController.updatePortfolio)
  .delete("/:id", portfolioController.deletePortfolio);

module.exports = Router;
