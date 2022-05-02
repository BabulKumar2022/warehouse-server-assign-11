const express = require('express');
const app = express();
const port =process.env.PORT || 5000;

//  show on browser
app.get('/', (req, res)  =>{
    res.send('hello server is running')
})

// show on terminal
app.listen(port, () =>{
    console.log('listen to port', port)
})