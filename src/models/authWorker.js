const pool = require('../config/db')
const bcrypt = require('bcryptjs')


const findByEmail = (email) =>{
    return new Promise((resolve, reject) =>{
        pool.query(
            `SELECT * FROM worker WHERE email = $1`, [email], 
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

const findByToken = (by, token) =>{
    return new Promise((resolve, reject) =>{
        pool.query(
            `SELECT * FROM worker WHERE ${by}= $1`, [token], 
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

const activateEmail = (id) =>{
    return new Promise((resolve, reject) =>{
        pool.query(
            `UPDATE worker SET token_verify=true WHERE id=$1`,[id], (err, result) =>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            }
        )
    })
}

const create = ({id, fullname, email, phonenumber, password, role, token }) =>{
    return new Promise((resolve, reject) =>{
        pool.query(
            `INSERT INTO worker (id, fullname, email, phonenumber, password, role, token_verify) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [   
                id, 
                fullname, 
                email, 
                phonenumber, 
                password, 
                role,
                token
            ], 
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

const getProfile = (id) =>{
    return new Promise((resolve, reject) =>{
        pool.query(
            `SELECT worker.id, worker.fullname, worker.email, worker.skill, worker.address, worker.
            description,worker.image, worker.jobs, portfolio.name_app, portfolio.repository, portfolio.type, experience.
            job_description, experience.month_year, experience.name_company, experience.
            position FROM worker FULL JOIN experience ON worker.id = experience.id_worker FULL JOIN portfolio ON worker.id = portfolio.id_worker WHERE worker.id = $1`,
            // `select * from worker where id=$1`,
            [id],
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

const updatePicture = (id, file) =>{
    return new Promise((resolve, reject) =>{
        pool.query(`UPDATE worker SET image = $1 WHERE id=$2`,[file, id], (err, result) =>{
            if(!err){
                resolve(result)
            }else{
                reject(new Error(err))
            }
        })
    })
}

const updateProfile = ({
    fullname,
    email,
    phonenumber,
    jobs,
    worker,
    address,
    description,
    skill,
    active,
    role,
    id_portfolio,
    id_experience,
    instagram,github,
    id
}) => {
    return new Promise((resolve, reject) =>{
        pool.query(
            'UPDATE worker SET fullname = COALESCE($1, fullname), email=COALESCE($2, email), phonenumber= COALESCE($3, phonenumber), jobs=COALESCE($4, jobs), worker= COALESCE($5, worker), address = COALESCE($6, address), description=COALESCE($7, description), skill = COALESCE($8, skill), active = COALESCE($9, active), role = COALESCE($10, role), id_portfolio = COALESCE($11, id_portfolio), id_experience = COALESCE($12, id_experience),instagram = COALESCE($13, instagram),github = COALESCE($14, github) WHERE id = $15',
            [
                fullname,
                email,
                phonenumber,
                jobs,
                worker,
                address,
                description,
                skill,
                active,
                role,
                id_portfolio,
                id_experience,
                instagram,
                github,
                id,
            ],
            (err, result) =>{
                if(!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            }
        )
    })
}

const changePassword = (body) =>{
    return new Promise((resolve, reject) =>{
        pool.query('SELECT email FROM worker WHERE id = $1', [body.id], (err, result) =>{
            if(!result.rows[0]){
                bcrypt.genSalt(10, (err, salt) =>{
                    if(!err){
                        reject(err)
                    }
                    const {password, email} = body
                    bcrypt.hash(password, salt, (_err, hashedPassword) =>{
                        if(_err){
                            reject(_err)
                        }
                        pool.query('UPDATE worker SET password=$1 WHERE email = $2', [hashedPassword, email], (_err, result) =>{
                            if(!_err, result){
                                resolve({msg: 'change password'})
                            }else{
                                reject(_err)
                            }
                        })
                    })
                })
            }else{
                reject(err)
            }
        })
    })
}

module.exports = {
    findByEmail,
    findByToken,
    activateEmail,
    create,
    updateProfile,
    changePassword,
    getProfile,
    updatePicture
}