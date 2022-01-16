const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
dotenv.config()

// middleware
app.use(express.json())
app.use(cors())

// connect with mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aghhg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri)

async function run() {

    try {
        await client.connect()
        const database = client.db('bloodBank')
        const usersCollection = database.collection('users')
        const donorsCollection = database.collection('donors')


        // add donor to database
        app.post('/donors', async (req, res) => {
            const donor = req.body;
            // const result=await donorsCollection.insertOne(donor)
            // res.send(result)
            console.log(donor)
        })
    }
    finally {
        // await client.close()
    }
}
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('Hello from Blood Bank Server')
})
app.listen(port, () => {
    console.log('listening at the port', port)
})