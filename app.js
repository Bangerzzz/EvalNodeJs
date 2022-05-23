const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
require('dotenv/config');

const Collection = require("../Collection");
const Accounts = new Collection("Accounts");

app.use(bodyParser.json());
//Import Routes
const postsRoute = require('./routes/posts')
app.use('/posts',postsRoute);

app.get('/',(req,res) => {
	res.send('Home page');
});
 
app.post("/signup", async (req, res) => {
    const payload = req.body;
    const schema = Joi.object({
      email:Joi.string().min(3).max(50).required(),
      username: Joi.string().min(3).max(50).required(),
      password: Joi.string().min(3).max(50).required(),
    });
    const { value, error } = schema.validate(payload);

    if (error) res.status(400).send({ erreur: error.details[0].message });
    else {
      const account = value;
      // WE NEED TO HASH THE PASSWORDW
      const salt = await bcrypt.genSalt(10);
      const passwordHashed = await bcrypt.hash(account.password, salt);
      account.password = passwordHashed;
  
      Accounts.insertOne(account);
      res.status(201).json({
        name: account.name,
      });
    }
  });

mongoose.connect(process.env.DB_CONNECTION, () => console.log('connected to DB!'));

app.listen(3000)

module.exports = { app, Accounts };
