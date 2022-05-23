const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());
//Import Routes
const postsRoute = require('./routes/posts')
app.use('/posts',postsRoute);

app.get('/',(req,res) => {
	res.send('Home page');
});

mongoose.connect(process.env.DB_CONNECTION, () => console.log('connected to DB!'));

app.listen(3000)