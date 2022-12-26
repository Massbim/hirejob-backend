require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Router = require("./src/routes/index");
const morgan = require("morgan");
const createError = require("http-errors");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://hirejob-snowy.vercel.app",
  })
);
app.use(morgan("dev"));

app.use("/", Router);
app.use("/img", express.static(path.join(__dirname, "./images")));

app.all("*", (req, res, next) => {
  next(createError());
});

app.use((err, req, res, next) => {
  const statusCode = err.status;
  if (res.status(statusCode)) {
    res.send(createError(statusCode, err));
  }
  next();
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
