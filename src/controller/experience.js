const commonHelper = require("../helper/common");
const { experienceModel } = require("../models/experience");
const { uploadGDExperience } = require("../utils/uploadGoogleDrive");
const createError = require("http-errors");

exports.experienceController = {
  selecAllExperience: async (req, res, next) => {
    experienceModel
      .getAll()
      .then((result) => {
        commonHelper.response(
          res,
          result,
          "Ambil semua data pengalaman sukses!",
          200
        );
      })
      .catch((err) => console.log(err));
  },
  createExperience: async (req, res, next) => {
    try {
      const { position, name_company, month_year, job_description } = req.body;
      const id_worker = req.decoded.id;
      const file = req.files.image[0];
      const {
        rows: [count],
      } = await experienceModel.countData();
      console.log(count.total);
      const id = Number(count.total) + 1;
      console.log(id_worker);
      console.log(file);

      let image = await uploadGDExperience(file);
      console.log(image);
      const data = {
        position,
        name_company,
        month_year,
        job_description,
        image: `https://drive.google.com/thumbnail?id=${image.id}&sz=s1080`,
        id,
        id_worker,
      };
      experienceModel.create(data);
      commonHelper.response(res, data, "Pengalaman Ditambahkan!", 201);
    } catch (error) {
      console.log(error);
    }
  },
  updateExperience: async (req, res, next) => {
    try {
      const id = req.params.id;
      console.log(id);
      const { position, name_company, month_year, job_description } = req.body;
      const id_worker = req.decoded.id;

      let image = req.files.image;
      console.log(image);
      if (req.files) {
        if (req.files.image) {
          // menghapus image sebelumnya di gd jika sebelumnya sudah pernah upload
          console.log(req.files.image);
          if (image) {
            await deleteGoogleDrive(image);
          }
          // upload photo baru ke gd
          console.log("ini image", req.files.image[0].path);
          image = await uploadGDExperience(req.files.image[0]);
        }
      }
      console.log(image);

      const data = {
        position,
        name_company,
        month_year,
        image: image
          ? i`https://drive.google.com/thumbnail?id=${image.id}&sz=s1080`
          : null,
        job_description,
        id_worker,
      };
      experienceModel.update(data, id);
      commonHelper.response(res, data, "pengalaman diperbaharui!", 200);
    } catch (error) {
      console.log(error);
    }
  },
  deleteExperience: async (req, res, next) => {
    try {
      const id = req.params.id;
      experienceModel.deleteExperience(id);
      commonHelper.response(res, id, "Hapus data berhasil!", 200);
    } catch (error) {}
  },
  getExperienceBy: (req, res, next) => {
    const id = req.params.id;
    experienceModel
      .getByID(id)
      .then((result) => {
        commonHelper.response(
          res,
          result,
          "Ambil data pengalaman sukses!",
          200
        );
      })
      .catch((error) => {
        console.log(error);
        next(createError);
      });
  },
  searchExperience: async (req, res, next) => {
    try {
      const sortby = req.query.sortby || "name_company";
      const search = req.query.search || "";
      const result = await experienceModel.search({ sortby, search });

      commonHelper.response(res, result, "Ambil data sukses!", 200);
    } catch (error) {
      console.log(error);
    }
  },
};
