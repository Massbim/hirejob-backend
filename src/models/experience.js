const db = require("../config/db");

exports.experienceModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM experience`, (err, result) => {
        if (!err) {
          resolve(result.rows);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  create: ({
    position,
    name_company,
    month_year,
    image,
    job_description,
    id_worker,
    id,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT into experience(position, name_company, month_year, image, job_description, id_worker, id) VALUES($1, $2, $3,$4,$5, $6, $7)`,
        [
          position,
          name_company,
          month_year,
          image,
          job_description,
          id_worker,
          id,
        ],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  update: (data, id) => {
    const {
      position,
      name_company,
      month_year,
      image,
      job_description,
      id_worker,
    } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE experience SET position = COALESCE($1, position), name_company = COALESCE($2, name_company), month_year = COALESCE($3, month_year), image = COALESCE(4$, image),
                job_description = COALESCE($5, job_description),
                id_worker = COALESCE($6, id_worker) WHERE id = $7
                `,
        [
          position,
          name_company,
          month_year,
          image,
          job_description,
          id_worker,
          id,
        ],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  deleteExperience: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM experience WHERE id = $1`, [id], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  search: ({ sortby, search }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM experience WHERE ${sortby} ILIKE '%${search}%'`,
        (err, result) => {
          if (!err) {
            resolve(result.rows);
            console.log(result.rows);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  countData: () => {
    return db.query("SELECT COUNT(*) AS total FROM experience");
  },
  getByID: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM experience WHERE id_worker=$1`,
        [id],
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
};
