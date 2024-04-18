const bcrypt = require('bcryptjs');
const saltRounds = 10;
async function hashPassword(password){
    const hashPass = await bcrypt.hash(password, saltRounds);
    return hashPass;
}
async function checkPassword(password,hash){
    const compare = await bcrypt.compare(password,hash)
    .then(function(result) {
        return result;
    });
    return compare;
}

module.exports={
    hashPassword,
    checkPassword
}