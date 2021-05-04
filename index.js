const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zqlov.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()
 
app.use(bodyParser.json())
app.use(cors())

const port = 5000

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productsCollection = client.db("ema-jhon-store").collection("products");
  console.log('DataBase connected');
 
app.post('/addProduct',(req, res) => {
    const products = req.body;
    
    productsCollection.insertMany(products)
    .then(result=>{
        console.log(result.insertedCount);
        res.send(result.insertedCount);
    })
})

app.get('/products',(req, res)=>{
  productsCollection.find({})
  .toArray((err,documents)=>{
    res.send(documents)
  })
})
 
});


app.listen(port)