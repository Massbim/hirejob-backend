const workerModel = require("../models/worker");
const commonHelper = require("../helper/common");

exports.getWorker = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;
    const sortby = req.query.sortby || "fullname";
    const sort = req.query.sort || "asc";
    const search = req.query.search || "";
    const searchby = req.query.searchby || "fullname";
    console.log(offset);
    const { rows: worker } = await workerModel.selectWorker({
      limit,
      offset,
      sortby,
      search,
      sort,
      searchby,
    });

    const {
      rows: [count],
    } = await workerModel.countWorker();
    const totalData = parseInt(count.total);
    const totalPage = Math.ceil(totalData / limit);
    const pagination = {
      currentPage: page,
      limit,
      totalData,
      totalPage,
    };

    commonHelper.response(
      res,
      worker,
      "Ambil data semua worker sukses!",
      200,
      pagination
    );
  } catch (error) {
    console.log(error);
  }
};

exports.getDetailsWorker = async (req, res, next) => {
  try {
    const id = req.params.id;
    const worker = await workerModel.detailWorker(id);
    console.log(worker);
    const data = {
      worker,
    };

    commonHelper.response(res, data, "Ambil data detil worker sukses!", 200);
  } catch (error) {
    console.log(error);
  }
};
