
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 8001;

require('dotenv').config();


const bowlingRouter = require('./routes/bowling');




app.use(express.json());
app.use('/api/bowling', bowlingRouter);



mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection;



database.on('error', (error)=> {
    console.log(error);
});


database.once('connected', ()=>{
    console.log('Connected to database successfully');
});




app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})


module.exports = database;