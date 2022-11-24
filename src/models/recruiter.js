const db = require('../config/db')

const modelRecruiter = {
    select: () =>{
        return new Promise((resolve, reject) =>{
            db.query('SELECT * FROM recruiter', (err, result) =>{
                if(!err){
                    resolve(result.rows)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    filterRecruiter: ({
        search,
        sort = 'fullname',
        type = 'ASC',
        limit,
        offset
    }) =>{
        return db.query(
            `SELECT * FROM recruiter WHERE fullname ILIKE $1 ORDER BY ${sort} ${type} LIMIT $2 OFFSET $3`,
            ['%' + search + '%', limit, offset]
        )
    },
    countRecruiter: () =>{
        return db.query(
            'SELECT COUNT(*) AS total FROM recruiter'
        )
    },
    recruiterByWorker: (id) =>{
        return db.query(
            `SELECT * FROM recruiter WHERE id ='${id}'`
            // 'SELECT * FROM recruiter INNER JOIN recruiter ON recruiter.id = worker.id'
        )
    }
}

module.exports = {
    modelRecruiter 
}