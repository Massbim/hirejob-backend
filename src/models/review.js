const db = require("../config/db");

const modelReview = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `select testimoni.id, testimoni.opini, worker.image, worker.jobs, worker.fullname FROM testimoni INNER JOIN worker ON testimoni.id_worker = worker.id`,
        (err, result) => {
          if (!err) {
            resolve(result.rows);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  insert: (data) => {
    const { id, opini, id_worker } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO testimoni (id, opini, id_worker) values($1, $2, $3)`,
        [id, opini, id_worker],
        (err, result) => {
          if (!err) {
            resolve(result.rows);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  countData: () => {
    return db.query("SELECT COUNT(*) AS total FROM testimoni");
  },
};

module.exports = { modelReview };
