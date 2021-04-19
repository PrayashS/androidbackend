const mongoose = require('mongoose');//Third party
const express = require('express');//Third party
const bodyParser = require('body-parser')// core modules

const db = require('./database/db');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const book=require('./routes/bookingRoute')

const path = require("path");

const app = express();
app.use("/images", express.static(path.join(__dirname, "images")))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json());
app.use(userRoute);
app.use(book)

app.use(productRoute);

app.listen(90);