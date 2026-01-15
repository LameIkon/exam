const connectDB = require('../db-connection.js');
const { ObjectId }= require('mongodb');

const contact = require('../json-objects/contact.json');

async function insertContact(){
    const db = await connectDB();

    await db.collection('contacts').insertOne(contact);
    console.log("Successfully inserted!");
}

async function updateContactWorkPhone()
{
    const db = await connectDB();

    await db.collection('contacts').updateOne(
        { _id: new ObjectId("6968d924161306503a5cb6d2"), "phones.type": "work"  },
        {$set: {"phones.$.number": "+45 76 41 37 09" }}
    );
    console.log("Successfully updated contact!");
}

module.exports = {insertContact, updateContactWorkPhone};
