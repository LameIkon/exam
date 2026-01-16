const express = require('express');
const connectDB = require('../db-connection');
const { ObjectId }= require('mongodb');

const router = express.Router();

router.get('/api/contacts', async (req, res) => {
    try{
        const db = await connectDB();
        const contacts = await db.collection('contacts').find({}).sort({first_name: 1, last_name: 1}).toArray();
        res.status(200).json(contacts);
    }
    catch(err)
    {
        console.log(err);
    }
})

router.post('/api/contacts', async (req, res) => {
    try{
        const db = await connectDB();
        const reqBody = req.body;

        const newContact = {
            first_name: reqBody.first_name,
            last_name: reqBody.last_name,
            email: reqBody.email,
            phones: reqBody.phones,
            created_at: new Date(Date.now())
        }

        await db.collection('contacts').insertOne(newContact);

        res.status(200).json(newContact);
    }
    catch(err){
        console.log(err);
    }
})

router.put('/api/contacts/:id', async (req, res) => {
    try{
        const db = await connectDB();

        const reqBody = req.body;
        //console.log(req.params.id);
        const id = new ObjectId(req.params.id);

        await db.collection('contacts').updateOne({_id: id},
            {$set: {last_name: reqBody.last_name,
                    email: reqBody.email,
                    phones: reqBody.phones
                    }
            });

        res.status(200).json(await db.collection('contacts').find({_id:id}).toArray());
    }
    catch(err){
        console.log(err);
    }
})

router.delete('/api/contacts/:id', async (req, res) => {
    try{
        const db = await connectDB();
        const id = new ObjectId(req.params.id);
        const contact = await db.collection('contacts').findOneAndDelete({_id: id});

        if(!contact){
            res.status(404).json({error: 'Could not find contact'});
        }
        else{
            const contactObj = {
                message: `The contact ${contact.first_name} ${contact.last_name} has been deleted`
            }
            res.status(200).json(contactObj);
        }

    }
    catch(err){
        console.log(err);
    }
})

router.get('/api/contacts/search/:type.:work', async (req, res) => {
    try{
        const db = await connectDB();

        console.log(req.params.type);

        res.status(200).json("hello world");
    }
    catch(err){
        console.log(err);
    }
})


module.exports = router;