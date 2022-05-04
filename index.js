const express = require('express');
const cors = require('cors');
const app = express();
const port =process.env.PORT || 5000;
// middle ware
app.use(cors ());
app.use(express.json());


const laptops =[
    {id: 1, name: 'HP Pro', processor: 'Cor i5', price: '$3200'},
    {id: 2, name: 'ASUS Pro', processor: 'Cor i3', price: '$2200'},
    {id: 3, name: 'ACEAR Pro', processor: 'Cor i5', price: '$2000'},
    {id: 4, name: 'DELL Pro', processor: 'Cor i7', price: '$4000'},
    {id: 5, name: 'DELL Pro', processor: 'Cor i7', price: '$4000'}
]





//  show on browser
app.get('/', (req, res)  =>{
    res.send('hello server is running')
})

app.get('/laptop', (req, res) =>{
    res.send(laptops);
})

app.get('/laptop/:id', (req, res) =>{
    console.log(req.params);
    const id = parseInt(req.params.id);
    const laptop = laptops.find(lap => lap.id === id);
    res.send(laptop);
})
//Req to  data from UI
app.post('/laptop', (req, res) =>{
    console.log('request', req.body);
    const laptop = req.body;
    laptop.id = laptops.length + 1;
    laptops.push(laptop);
    res.send(laptop);
})


// show on terminal
app.listen(port, () =>{
    console.log('listen to port', port)
})