const db = require('../database/mongodb');

async function getCollection(){
    return await db.getCollection("users");
}
module.exports = {
    getCollection
}