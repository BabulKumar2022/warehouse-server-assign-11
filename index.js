const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const res = require('express/lib/response');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8000;

// middle ware
app.use(cors ());
app.use(express.json());


app.get('/laptop', (req, res) =>{
    res.send(laptops);
})



//--------------------------------------------------------------------
// user=john67
//pass =WcsjTy6PHL4Dgj2g




var uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.vhhpf.mongodb.net:27017,cluster0-shard-00-01.vhhpf.mongodb.net:27017,cluster0-shard-00-02.vhhpf.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-rxrbhl-shard-0&authSource=admin&retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    
try{
  await client.connect();
  const productCollection = client.db('newass11db').collection('laptops');

  //----- data receive from Ui to server----------------
  app.post('/user',  async(req, res) =>{
      const newUser = req.body;
      console.log('adding new user', newUser);
      const result = await productCollection.insertOne(newUser);
      res.send(result)
  });



  //-------------data get from mongodb via server
  app.get('/laptops', async(req, res) =>{
    const query ={};
    const cursor = productCollection.find(query);
    const laptops =await cursor.toArray();
    res.send(laptops);
  })
  // data insert from UI
  app.get('/laptops/:id', async(req, res) =>{
      const id = req.params.id;
      const query= {_id: ObjectId(id)};
      const laptop = await productCollection.findOne(query);
      res.send(laptop);

  })
// data update
app.put('/laptops/:id', async(req, res) =>{
    const id = req.params.id;
    const updatedUser = req.body;
    const filter = {_id: ObjectId(id)};
    const options = {upsert: true};
    const updatedDoc = {
        $set:{
            name: updatedUser.name,
            price: updatedUser.email
        }
    };
    const result =await productCollection.updateOne(filter, updatedDoc,options);
    res.send(result)
})



// delete data 

app.delete('/laptops/:id', async(req, res) =>{
    const id=req.params.id;
    const query = {_id: ObjectId(id)};
    const result = await productCollection.deleteOne(query);
    res.send(result);
})




}
finally{}
}
run().catch(console.dir);

app.get('/', (req, res) =>{
    res.send('ass11 server is running and heroku is  some time working ');
})
app.listen(port, () =>{
    console.log('ass11 running  on port', port);
})
