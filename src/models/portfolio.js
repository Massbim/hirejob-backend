const { resolve } = require('path')
const db = require('../config/db')


const portfolioModel = {
    getPortfolio: () =>{
        return new Promise((resolve, reject) =>{
            db.query(`SELECT * FROM portfolio`, (err, result) =>{
                if(!err){
                    resolve(result.rows)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    insert: (body, id_worker, id) =>{
        const { name_app, repository, type, image = [] } = body;
        return new Promise((resolve, reject) =>{
            db.query(
                `INSERT INTO portfolio (name_app, repository, type, image, id_worker ,id) VALUES($1,$2,$3,$4,$5,$6)`, [name_app, repository, type, image, id_worker, id],
                (err, result) =>{
                    if(!err){
                        resolve(result.rows)
                    }else{
                        reject(err)
                    }
                }
            )
        })
    }, 
    countPortfolio: () =>{
        return db.query(
            'SELECT COUNT(*) AS total FROM portfolio'
        )
    },
    update:(body, id) =>{
        const { name_app, repository, type, image = [], id_worker } = body;
        return new Promise((resolve, reject) =>{
            db.query(
                `UPDATE portfolio SET name_app = $1, repository = $2, type = $3, image = $4, id_worker = $5  WHERE id = $6`, [name_app, repository, type, image, id_worker,  id], (err, result) =>{
                    if(!err){
                        resolve(result)
                    }else{
                        reject(new Error(err))
                    }
                }
            )
        })
    },
    deletePortfolio: (id) =>{
        return new Promise((resolve, reject) =>{
            db.query(`DELETE FROM portfolio WHERE id = $1`, [id], (err, result) =>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },
    getPortfolioByID: (id_worker) =>{
        return new Promise((resolve, reject) =>{
            db.query(`SELECT * FROM portfolio WHERE id_worker = $1`, [id_worker], (err, result) =>{
                if(!err){
                    resolve(result.rows)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    getIDportfolio: (id_worker) =>{
        return new Promise((resolve, reject) =>{
            db.query(`SELECT * FROM portfolio WHERE id = $1`, [id_worker], (err, result) =>{
                if(!err){
                    resolve(result.rows)
                }else{
                    reject(new Error(err))
                }
            })
        })
    }
}

module.exports = portfolioModel