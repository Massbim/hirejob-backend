const bcrypt = require('bcrypt')
const db = require('../config/db')


const authModel = {
    findEmail: (email) =>{
        return new Promise((resolve, reject) =>{
            db.query(
                'SELECT * FROM recruiter WHERE email = $1', [email],
                (err, result) =>{
                    if(!err){
                        resolve(result)
                    }else{
                        reject(err)
                    }
                }
            )
        })
    },
    create: ({
        id,
        fullname,
        password,
        email,
        company,
        phonenumber,
        position,
        role
    }) =>{
        return new Promise ((resolve, reject) =>{
            db.query(
                `INSERT INTO recruiter (id, fullname, password, email, company, phonenumber, position, role) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
                [
                    id,
                    fullname,
                    password,
                    email,
                    company,
                    phonenumber,
                    position,
                    role
                ],
                (err, result) =>{
                    if(!err){
                        resolve(result)
                    }else{
                        reject(new Error('data error disini'))
                    }
                }
            )
        })
    },
    updateProfile: ({
        fullname,
        company,
        phonenumber,
        position,
        email,
        company_field,
        address,
        company_description,
        image,
        instagram,
        linkedin,
        id,
    })=>{
        return new Promise((resolve, reject) =>{
            db.query(
                `UPDATE recruiter SET fullname = COALESCE($1, fullname),
                company = COALESCE($2, company),
                phonenumber = COALESCE($3, phonenumber),
                position= COALESCE($4, position),
                email= COALESCE($5, email),
                company_field = COALESCE($6, company_field),
                address = COALESCE($7, address),
                company_description = COALESCE($8, company_description),
                image = COALESCE($9, image),
                instagram = COALESCE($10, instagram),
                linkedin = COALESCE($11, linkedin)
                WHERE id = $12
                `,
                [
                    fullname,
                    company,
                    phonenumber,
                    position,
                    email,
                    company_field,
                    address,
                    company_description,
                    image,
                    instagram,
                    linkedin,
                    id,
                ],
                (err, result) =>{
                    if(!err){
                        resolve(result.rows)
                    }else{
                        reject(new Error(err))
                    }
                }
            )
        })
    },
    changePassword: (body) =>{
        return new Promise((resolve, reject) =>{
            const qs = `SELECT email FROM recruiter WHERE id = $1`
            db.query(qs, [body.id], (_err, data) =>{
                // console.log(data)
                if(!data.rows[0]){
                    bcrypt.genSalt(10, (_err, salt) =>{
                        if(_err){
                            reject(_err)
                        }
                        const {password, email} = body
                        bcrypt.hash(password, salt, (err, hashedPassword) =>{
                            if(err){
                                reject(err)
                            }
                            const queryString = 'UPDATE recruiter SET password = $1 WHERE email= $2'
                            db.query(queryString, [hashedPassword, email], (err, data) =>{
                                if(!err){
                                    resolve({
                                        msg: "change Password success"
                                    })
                                }else{
                                    reject(err)
                                }
                            })
                        })
                    } )
                }else{
                    reject(_err)
                }
            })
        })
    }
}

module.exports = {
    authModel
}