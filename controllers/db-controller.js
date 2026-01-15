const connectDB = require('../db-connection.js');

const contact = require('../json-objects/contact.json');

async function insertContact(){
    const db = await connectDB();

    await db.collection('contacts').insertOne(contact);
    console.log("Successfully inserted!");
}

async function updateContactWorkPhone()
{
    const db = await connectDB();

    await db.collection('contacts').updateOne({ id: '6968d924161306503a5cb6d2'}, {$set: {first_name: "Goodbye"}});
    console.log("Successfully updated contact!");
}

module.exports = {insertContact, updateContactWorkPhone};
