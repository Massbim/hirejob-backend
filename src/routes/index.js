const express = require("express");
const Router = express.Router();

const worker = require("./worker");
const authRecruiter = require("./authRecruiter");
const authWorker = require("./authWorker");
const recruiter = require("./recruiter");
const portfolio = require("./portfolio");
const experience = require("./experience");
const review = require("./review");

Router.use("/worker", worker)
  .use("/authRecruiter", authRecruiter)
  .use("/authWorker", authWorker)
  .use("/recruiter", recruiter)
  .use("/portfolio", portfolio)
  .use("/experience", experience)
  .use("/review", review);
module.exports = Router;
