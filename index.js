const express = require('express');
const connectDB = require('./db-connection.js');
const dbController = require('./controllers/db-controller.js');
const app = express();
const router = require('./routers/db-router.js');
const cors = require('cors');


async function startServer() {
    const db = await connectDB();

    app.use(express.json());
    app.use(cors());
    app.use('/', router);

    app.listen('3000');

    //await dbController.insertContact();
    //await dbController.updateContactWorkPhone();
    //await dbController.deleteContactsOlderThanFiveYears();
    //await dbController.findAllContactsStartingWithJ();
    //await dbController.deleteCollectionContacts();
    //console.log(await dbController.countCollectionContacts());
}

startServer();