const portfolioModel = require("../models/portfolio");
const createError = require("http-errors");
const commonHelper = require("../helper/common");
const jwt = require("jsonwebtoken");
const { uploadGDPortfolio } = require("../utils/uploadGoogleDrive");
const deleteGoogleDrive = require("../utils/deleteGoogleDrive");
const {
  getPortfolio,
  insert,
  update,
  deletePortfolio,
  countPortfolio,
  getPortfolioByID,
  getIDportfolio,
} = portfolioModel;

const portfolioController = {
  getPortfolio: (req, res, next) => {
    getPortfolio()
      .then((result, err) => {
        console.log(result);
        commonHelper.response(
          res,
          result,
          "Ambil seluruh data portfolio sukses!",
          200
        );
      })
      .catch((err) => {
        console.log(err);
        // next(createError)
      });
  },
  getPortfolioBy: (req, res, next) => {
    const id_worker = req.params.id;
    getPortfolioByID(id_worker)
      .then((result) => {
        commonHelper.response(res, result, "Ambil data portfolio sukses!", 200);
      })
      .catch((error) => {
        console.log(error);
        // next(createError)
      });
  },
  getID: (req, res, next) => {
    const id = req.params.id || "";
    getIDportfolio(id)
      .then((result) => {
        commonHelper.response(
          res,
          result,
          "Ambil data portfolio by ID sukses!",
          200
        );
      })
      .catch((err) => console.log(err));
  },
  createPortofolio: async (req, res, next) => {
    try {
      const urls = [];
      const files = req.files.image;
      console.log(files);
      for (let file of files) {
        const portfolioImg = await uploadGDPortfolio(file);
        urls.push(
          `https://drive.google.com/thumbnail?id=${portfolioImg.id}&sz=s1080`
        );
      }
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const id_worker = decoded.id;
      console.log("ini decoded", decoded);
      const {
        rows: [count],
      } = await countPortfolio();
      const id = Number(count.total) + 1;
      const { name_app, repository, type } = req.body;
      const data = {
        name_app,
        repository,
        type,
        image: urls.map((url) => url),
        id_worker,
      };
      insert(data, id_worker, id).then(() => {
        commonHelper.response(
          res,
          data,
          "Portfolio berhasil ditambahkan!",
          200
        );
      });
      delete files.path;
    } catch (error) {
      console.log(error);
    }
  },

  updatePortfolio: async (req, res, next) => {
    try {
      const id = req.params.id;
      const urls = [];
      const files = req.files.image;
      console.log(files);
      for (let file of files) {
        const portfolioImg = await uploadGDPortfolio(file);
        urls.push(
          `https://drive.google.com/thumbnail?id=${portfolioImg.id}&sz=s1080`
        );
      }

      const { name_app, repository, type } = req.body;
      console.log(req.decoded);
      const id_worker = req.decoded.id;
      console.log(urls);
      const data = {
        name_app,
        repository,
        type,
        image: urls.map((url) => url),
        id_worker,
      };
      update(data, id)
        .then(() => {
          commonHelper.response(
            res,
            data,
            "Portfolio berhasil diperbaharui!",
            200
          );
        })
        .catch((error) => {
          console.log("hallo", error.message);
          if (error && error.name === "JsonWebTokenError") {
            next(new createError(400, "Token Auth Invalid"));
          } else if (error && error.name === "TokenExpiredError") {
            next(new createError(400, "Token Auth Expired"));
          } else {
            next(new createError(400, "Token Auth Not Active"));
          }
        });
    } catch (error) {
      console.log(error);
    }
  },
  deletePortfolio: async (req, res, next) => {
    try {
      const id = req.params.id;
      const portfolios = await getIDportfolio(id);
      console.log(portfolios);
      if (portfolios[0].image) {
        for (let portfolio of portfolios[0].image) {
          let portfolioID = portfolio.split("id=")[1].split("&sz")[0];
          await deleteGoogleDrive(portfolioID);
        }
      }
      deletePortfolio(id);
      commonHelper.response(res, id, "Hapus portfolio sukses!", 200);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = portfolioController;
