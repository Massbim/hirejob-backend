const pool = require('../config/db')
// const selectWorker = ({limit,offset,sort,sortby, querySearch}) => {
//     return pool.query(`SELECT * FROM worker ${querySearch} ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
//   }
const selectWorker = ({sortby, limit, offset, search, sort, searchby}, id) =>{
    return new Promise((resolve, reject) =>{
        pool.query(
            // `SELECT worker.id, worker.fullname, worker.email, worker.skill, worker.address, worker.
            // description,worker.jobs, worker.image, portfolio.name_app, portfolio.repository, portfolio.type, experience.
            // job_description, experience.month_year, experience.name_company, experience.
            // position FROM worker LEFT JOIN experience ON worker.id = experience.id_worker LEFT JOIN portfolio ON worker.id_portfolio = portfolio.id_worker `,

            `SELECT * FROM worker WHERE ${searchby} ILIKE'%${search}%' ORDER BY  ${sortby} ${sort} LIMIT $1 OFFSET $2`, [limit, offset],
            (err, result) =>{
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            }
        )
    })
}

const detailWorker = (id) =>{
    return new Promise((resolve, reject) =>{
        pool.query(`SELECT * FROM worker WHERE id = $1`, [id], (err, result) =>{
            if(!err){
                resolve(result.rows)
            }else{
                reject(new Error(err))
            }
        })
    })
}

const countWorker = () =>{
    return new Promise ((resolve, reject) =>{
        pool.query(`SELECT COUNT(*) AS total FROM worker`, (err, result) =>{
            if(!err){
                resolve(result)
            }else{
                reject(new Error(err))
            }
        })
    })
}
module.exports = {
    selectWorker,
    countWorker,
    detailWorker
}