const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
    res.sendFile(path.join('./public/index.html'))
})

const jsonParser = bodyParser.json();
//private data. create private.json with only mongo:// string 
const uri = proccess.env.mongoUrl;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect( err => {
    const products = client.db('test').collection('products'); 
app.use((req, res, next) => {
    if(err) throw err
    else next()
})
const mongo = require('mongodb');

    app.get('/products', (req, res) => {
        products.find({}).toArray((err, result) => {
            if (err) throw err;
            res.json(result);
        })
    })

    app.post('/products/create', jsonParser, (req, res) => {
        products.insertOne({
            'name': req.body.name,
            'description': req.body.description,
            'price': req.body.price
        }).then(() => {
            res.send('Created product')
        }).catch((err) => {throw err;})
    })

    app.get('/products/id/:id', (req, res) => {
        console.log(typeof req.params.id)
        const id = new mongo.ObjectID(req.params.id);
        products.findOne({_id: id}).then((result) => {res.json(result)}).catch((err) => {throw err})
    })

    app.delete('/products/:id/delete', (req, res) => {
        const id = new mongo.ObjectID(req.params.id);
        products.deleteOne({_id: id}).then(() => {res.send('deleted!')}).catch((err) => {throw err})
    })

})

app.listen(process.env.PORT || 5000, () => {
    console.log('We are live on 5000/3000');
  });
