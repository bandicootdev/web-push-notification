require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//routes
app.use(require('./routes/index'));

//statics
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT, () => console.log(`server on ${process.env.PORT}`))
