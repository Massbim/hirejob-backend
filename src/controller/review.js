const { modelReview } = require("../models/review");
const common = require("../helper/common");

const controllerReview = {
  getAllData: (req, res, next) => {
    modelReview
      .getAll()
      .then((result) => {
        common.response(res, result, "Ambil data semua review sukses!", 200);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  createData: async (req, res, next) => {
    const { opini } = req.body;
    console.log(req.decoded);
    const id_worker = req.decoded.id;
    const {
      rows: [count],
    } = await modelReview.countData();
    console.log(count.total);
    const id = Number(count.total) + 1;
    const data = {
      opini,
      id_worker,
      id,
    };
    modelReview
      .insert(data)
      .then(() => {
        common.response(res, data, "Data review berhasil ditambahkan!", 200);
      })
      .catch((err) => console.log(err));
  },
};

module.exports = { controllerReview };
