const fs = require('fs')

module.exports = (path) =>{
    if(fs.existsSync(path)){
        //delete 
        fs.unlinkSync(path)
    }
}