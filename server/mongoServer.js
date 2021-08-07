const mongoose = require('mongoose')
const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser')
const cors = require('cors')
const Bike = require('./schemas/bikeList')
const BikeType = require('./schemas/bikeType')
const types = ['Road bike','Mountain bike','Hybrid Bike','Cross Bike','Electric bike','Touring bike','Kids bike']
const initialBikes = [
    {name:'Specialized Turbo Creo SL',type:'Road bike',price:15,status:'available',rentDate:0},
    {name:'Giant Talon 3 2021',type:'Mountain bike',price:12,status:'rented',rentDate:new Date(2021,7,5).getTime()}]

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

mongoose.connect("mongodb://localhost/bikerent", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function(err){
    if(err) return console.log(err);
    app.listen(port, function(){
        console.log(`App listening on port: ${port}!`);
    });
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

initialBikes.map(async bike => {
    let bikeElement  = await Bike.find({name:bike.name})
    if (bikeElement.length === 0) await new Bike(
        {
            name:bike.name,
            type:bike.type,
            price:bike.price,
            status:bike.status,
            rentDate:bike.rentDate
        }).save()
})

types.map(async type => {
    let typeElement  = await BikeType.find({title:type})
    if (typeElement.length === 0) await new BikeType({title:type}).save()
})

app.get('/bikes/types', async function (req, res) {
    
    await BikeType.find({}, (error,types) => 
    {
        if(error) return console.log(error);
        res.send(types)
    });
});

app.get('/bikes', async function (req, res) {
    await Bike.find({}, (error,bikes) => 
    {
        if(error) return console.log(error);
        res.send(bikes)
    });
});

app.post('/bikes', async function(req,res) {

    if(!req.body) return res.sendStatus(400);
    
    let newBike = new Bike({
       name:req.body.name,
       type:req.body.type,
       price:req.body.price,
       status:'available'
    })
    await newBike.save((error) => {
        if(error) return console.log(error);
        res.status(201).send(newBike)
    }); 
});

app.put("/bikes", async function(req, res){
         
    if(!req.body) return res.sendStatus(400);

    const id = req.body.id;
    let updated;

    if (req.body.action === 'RENT') {
        updated = {status:'rented',rentDate:new Date().getTime()}
    }
    else if (req.body.action === 'UNRENT') {
        updated = {status:'available',rentDate:0}
    }

    await Bike.findOneAndUpdate({_id: id}, updated, {new: true}, function(error, bike){
        if(error) return console.log(error); 
        res.status(200).send(bike);
    });
});

app.delete("/bikes", async function(req, res){
         
    const id = req.body.id;
    await Bike.findByIdAndDelete(id, function(error, bike){
        if(error) return console.log(error);
        res.status(200).send(bike);
    });
});