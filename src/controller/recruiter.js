const { modelRecruiter } = require("../models/recruiter");
const common = require("../helper/common");

const recruiterController = {
  getRecruiter: (req, res, next) => {
    modelRecruiter
      .select()
      .then((result) => {
        common.response(
          res,
          result,
          "Ambil seluruh data recruiter sukses!",
          200
        );
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getRecruiterByWork: (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    modelRecruiter
      .recruiterByWorker(id)
      .then((result) => {
        common.response(
          res,
          result.rows,
          "Ambil data recruiter by worker sukses!",
          200
        );
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getRecruiterByFilter: async (req, res, next) => {
    try {
      const sort = req.query.sort;
      const type = req.query.type;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const search = req.query.search || "";
      console.log(search);
      console.log(type);
      const result = await modelRecruiter.filterRecruiter({
        search,
        sort,
        type,
        limit,
        offset,
      });
      console.log(result);
      const {
        rows: [count],
      } = await modelRecruiter.countRecruiter();
      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };
      if (result.length === 0) {
        res.json({
          msg: "Data recruiter tidak ditemukan!",
        });
      }
      common.response(
        res,
        result.rows,
        "Ambil data recruiter terfilter sukses",
        200,
        pagination
      );
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = {
  recruiterController,
};
