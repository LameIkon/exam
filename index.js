const express = require('express');
const connectDB = require('./db-connection.js');
const dbController = require('./controllers/db-controller.js');
const app = express();


async function startServer() {
    const db = await connectDB();

    app.use(express.json());

    //await dbController.insertContact();
    //await dbController.updateContactWorkPhone();
    //await dbController.deleteContactsOlderThanFiveYears();
    //await dbController.findAllContactsStartingWithJ();
    //await dbController.deleteCollectionContacts();
    console.log(await dbController.countCollectionContacts());
}

startServer();