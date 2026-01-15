const connectDB = require('../db-connection.js');
const { ObjectId }= require('mongodb');

const contact = require('../json-objects/contact.json');

async function insertContact(){
    const db = await connectDB();

    await db.collection('contacts').insertOne(contact);

    // This will make the Date into the correct format and not just a string.
    await db.collection('contacts').updateMany(
        { created_at: { $type: "string" } },
        [
            { $set: { created_at: { $toDate: "$created_at" } } }
        ]
    )

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

async function deleteContactsOlderThanFiveYears() {
    const db = await connectDB();

    const fiveYearsAgo = new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000);

    await db.collection('contacts').deleteMany({
        created_at: { "$lt": fiveYearsAgo }
    });

    console.log("Successfully deleted old contacts!");
}

async function findAllContactsStartingWithJ(){
    const db = await connectDB();

    const contacts = await db.collection('contacts')
                            .find({first_name: {"$regex": /^J./, "$options": "i"}})
                            .toArray();

    console.log("Successfully find all contacts!");
    console.log(contacts);

}

async function deleteCollectionContacts(){
    const db = await connectDB();
    await db.dropCollection("contacts");

    console.log("Successfully droped contacts!");
}

async function countCollectionContacts(){
    const db = await connectDB();

    //const contacts = await db.collection('contacts').countDocuments();

    const result = await db.collection('contacts')
                        .aggregate([ { $count: "Total contacts" } ])
                        .toArray();

    console.log("Successfully counted contacts!");

    return result;
}


module.exports = {
    insertContact,
    updateContactWorkPhone,
    deleteContactsOlderThanFiveYears,
    findAllContactsStartingWithJ,
    deleteCollectionContacts,
    countCollectionContacts
};
