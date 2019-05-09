const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'))
}

app.use(routes);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/googlebooks';
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

app.listen(PORT, () => {
    console.log(`API Server on port: ${PORT}`)
});