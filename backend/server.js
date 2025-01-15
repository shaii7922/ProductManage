const express = require('express');
const { PORT } = require('./config');
const { connectDb } = require('./config/database');
const productRoutes = require('./routes/product.route')
const cors = require('cors');

// Connecting database with server.
connectDb()

const app = express()


// Middleware
app.use(cors());
app.use(express.json()) 


// For routing handling
app.use('/api/products',productRoutes)



// Creating Server 
app.listen(PORT,(err)=>{
    if(err) console.log(err);
    console.log("server running at the PORT",PORT);
})