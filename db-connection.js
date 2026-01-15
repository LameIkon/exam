const { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb://localhost:27017/examtestdb");


async function connectDB(){
    await client.connect();
    return client.db();
}

module.exports = connectDB;