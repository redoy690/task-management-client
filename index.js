const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;


// middelware

app.use(cors());
app.use(express.json());




// groups
// imQq6vaJycmD6kMQ

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gfjtqgg.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {


        const assignmentCollection = client.db('taskdb').collection('alltask')
       
       


        // ----------------all task (1) ------------

        // send data to the db
        app.post('/task', async (req, res) => {
            const newtask = req.body;
            console.log(newtask)
            const result = await assignmentCollection.insertOne(newtask)
            res.send(result)
        })


        //  get all assignment db to ui
        app.get('/task', async (req, res) => {
            const cursor = assignmentCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })

        //  get one assignment
        // app.get('/task/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: new ObjectId(id) }
        //     const result = await assignmentCollection.findOne(query);
        //     res.send(result)
        // })


        app.put('/task/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updatemarks = req.body
            const marks = {
                $set: {
                    status: updatemarks.status,
             
                }
            }
            const result = await assignmentCollection.updateOne(filter, marks, options)
            res.send(result);
        })


        app.put('/tasker/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updatemarks = req.body
            const marks = {
                $set: {
                    title: updatemarks.title,
                    deadline: updatemarks.deadline,
                    category: updatemarks.category,
                    description: updatemarks.description,
             
                }
            }
            const result = await assignmentCollection.updateOne(filter, marks, options)
            res.send(result);
        })


        // app.get('/tasks', async (req, res) => {
        //     console.log(req.query.useremail)
        //     let query = {};
        //     if (req.query?.useremail) {
        //         query = { email: req.query.useremail }
        //     }
        //     const result = await assignmentCollection.find(query).toArray()
        //     res.send(result)
        // })

        //--------------------------------------------







        // Send a ping to confirm a successful connection

        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);







app.get('/', (req, res) => {
    res.send('group study server is running')
})

app.listen(port, () => {
    console.log(`cgroup study server is running on port :${port}`)
})


